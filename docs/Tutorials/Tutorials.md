---
hide:
  - toc
---

# Complete Raster Analysis with Rasterio

A comprehensive guide to Geospatial Raster Analysis using `rasterio` and `numpy`.

---

## 1. Core Concepts & Architecture

Rasterio reads and writes geospatial raster files (like GeoTIFFs) and leverages `numpy` N-dimensional arrays for data manipulation.

### The Raster Grid Structure
* **Bands:** A raster can have one or more bands (e.g., Red, Green, Blue, NIR).
* **Coordinate Reference System (CRS):** Defines how the raster's grid maps to the Earth's surface (e.g., EPSG:4326, EPSG:3857).
* **Transform (Affine):** A matrix mapping pixel coordinates `(row, col)` to geographic coordinates `(x, y)`.
* **NoData:** A sentinel value representing missing or invalid pixels.
* **Data Types:** `uint8`, `uint16`, `float32`, `float64`, etc. — chosen based on the value range.

---

## 2. Basic Operations

### Opening and Inspecting Metadata

```python
import rasterio

# Open a dataset (read-only by default)
with rasterio.open('satellite_image.tif') as src:
    print(f"Driver:      {src.driver}")
    print(f"Width:       {src.width}, Height: {src.height}")
    print(f"Band Count:  {src.count}")
    print(f"CRS:         {src.crs}")
    print(f"Bounds:      {src.bounds}")
    print(f"NoData:      {src.nodata}")
    print(f"Data Types:  {src.dtypes}")          # tuple per band
    print(f"Transform:\n{src.transform}")

    # Full metadata dict
    meta = src.meta
    print(meta)
```

### Reading Band Data

```python
with rasterio.open('satellite_image.tif') as src:
    # Read a single band (1-indexed) → 2-D array
    band1 = src.read(1)

    # Read multiple specific bands → 3-D array (bands, rows, cols)
    rgb = src.read([1, 2, 3])

    # Read all bands → 3-D array
    all_bands = src.read()

    # Read with masked array (NoData → masked)
    masked = src.read(1, masked=True)

    # Read at reduced resolution (overview / decimated)
    small = src.read(out_shape=(src.count, src.height // 4, src.width // 4),
                     resampling=rasterio.enums.Resampling.average)
```

### Writing a New Raster

```python
import numpy as np
import rasterio
from rasterio.transform import from_bounds

data = np.random.rand(1, 512, 512).astype('float32')

transform = from_bounds(
    west=10.0, south=50.0, east=11.0, north=51.0,
    width=512, height=512
)

profile = {
    'driver':    'GTiff',
    'dtype':     'float32',
    'width':     512,
    'height':    512,
    'count':     1,
    'crs':       'EPSG:4326',
    'transform': transform,
    'nodata':    -9999,
    'compress':  'lzw',
    'tiled':     True,
    'blockxsize': 256,
    'blockysize': 256,
}

with rasterio.open('output.tif', 'w', **profile) as dst:
    dst.write(data)
```

### Copying Metadata from an Existing File

```python
with rasterio.open('input.tif') as src:
    meta = src.meta.copy()
    meta.update(dtype='float32', count=1, nodata=-9999)
    data = src.read(1).astype('float32')

with rasterio.open('output.tif', 'w', **meta) as dst:
    dst.write(data, 1)
```

---

## 3. Coordinate & Transform Operations

### Affine Transform Basics

```python
from rasterio.transform import from_origin, from_bounds, from_gcps, AffineTransformer

# From top-left origin + pixel size
transform = from_origin(west=10.0, north=51.0, xsize=0.001, ysize=0.001)

# From bounding box
transform = from_bounds(10.0, 50.0, 11.0, 51.0, width=1000, height=1000)

# Pixel (row, col) → geographic (x, y)
x, y = rasterio.transform.xy(transform, rows=100, cols=200)

# Geographic (x, y) → pixel (row, col)
row, col = rasterio.transform.rowcol(transform, xs=10.5, ys=50.5)
```

### AffineTransformer (batch conversions)

```python
from rasterio.transform import AffineTransformer

with rasterio.open('image.tif') as src:
    transformer = AffineTransformer(src.transform)

# Many pixels at once
rows = [0, 100, 200]
cols = [0, 100, 200]
xs, ys = transformer.xy(rows, cols)

row_arr, col_arr = transformer.rowcol(xs, ys)
```

### Reprojecting Coordinates

```python
from pyproj import Transformer

# Transform a point from WGS84 to UTM zone 32N
t = Transformer.from_crs("EPSG:4326", "EPSG:32632", always_xy=True)
x_utm, y_utm = t.transform(10.5, 50.5)   # lon, lat → easting, northing
```

---

## 4. Reprojection & Warping

### Reproject a Raster to a New CRS

```python
import rasterio
from rasterio.warp import calculate_default_transform, reproject, Resampling

src_path  = 'input_wgs84.tif'
dst_path  = 'output_utm32.tif'
dst_crs   = 'EPSG:32632'

with rasterio.open(src_path) as src:
    transform, width, height = calculate_default_transform(
        src.crs, dst_crs, src.width, src.height, *src.bounds
    )
    meta = src.meta.copy()
    meta.update(crs=dst_crs, transform=transform,
                width=width, height=height)

    with rasterio.open(dst_path, 'w', **meta) as dst:
        for band_idx in range(1, src.count + 1):
            reproject(
                source=rasterio.band(src, band_idx),
                destination=rasterio.band(dst, band_idx),
                src_transform=src.transform,
                src_crs=src.crs,
                dst_transform=transform,
                dst_crs=dst_crs,
                resampling=Resampling.bilinear,
            )
```

### Available Resampling Methods

| Method | Use Case |
|---|---|
| `Resampling.nearest` | Categorical / classified data |
| `Resampling.bilinear` | Continuous data (default choice) |
| `Resampling.cubic` | Smooth continuous surfaces |
| `Resampling.cubic_spline` | High-quality upsampling |
| `Resampling.lanczos` | High-quality downsampling |
| `Resampling.average` | Downsampling, overview creation |
| `Resampling.mode` | Categorical downsampling |
| `Resampling.max` / `min` | Feature extraction |

### Resample to a Target Resolution

```python
from rasterio.enums import Resampling

target_res = 10.0   # metres

with rasterio.open('input.tif') as src:
    scale = src.res[0] / target_res          # current_res / target_res
    new_h = int(src.height * scale)
    new_w = int(src.width  * scale)

    data = src.read(
        out_shape=(src.count, new_h, new_w),
        resampling=Resampling.bilinear
    )

    new_transform = src.transform * src.transform.scale(
        src.width  / new_w,
        src.height / new_h
    )
```

---

## 5. Clipping & Masking

### Clip by Bounding Box (Window)

```python
from rasterio.windows import from_bounds

with rasterio.open('large_image.tif') as src:
    window = from_bounds(
        left=10.2, bottom=50.3, right=10.8, top=50.9,
        transform=src.transform
    )
    data      = src.read(window=window)
    win_transform = src.window_transform(window)
    print(win_transform)
```

### Clip by Vector Geometry (rasterio.mask)

```python
import fiona
from rasterio.mask import mask

# Load polygon geometries from a shapefile
with fiona.open('study_area.shp') as shp:
    geoms = [feature['geometry'] for feature in shp]

with rasterio.open('image.tif') as src:
    out_image, out_transform = mask(
        src, geoms,
        crop=True,          # trim to geometry extent
        invert=False,       # True → mask inside geometry
        nodata=-9999,
        filled=True,
    )
    out_meta = src.meta.copy()
    out_meta.update({
        'height':    out_image.shape[1],
        'width':     out_image.shape[2],
        'transform': out_transform,
        'nodata':    -9999,
    })

with rasterio.open('clipped.tif', 'w', **out_meta) as dst:
    dst.write(out_image)
```

### Apply a NumPy Boolean Mask

```python
import numpy as np

with rasterio.open('image.tif') as src:
    data   = src.read(1).astype('float32')
    nodata = src.nodata

# Mask NoData values
valid = np.where(data != nodata, data, np.nan)

# Threshold mask (e.g., keep only values > 0.3)
thresholded = np.where(data > 0.3, data, np.nan)
```

---

## 6. Windowed Reading & Tile Processing

Windowed I/O is essential for processing large rasters that do not fit in memory.

### Manual Window

```python
from rasterio.windows import Window

with rasterio.open('large.tif') as src:
    # Window(col_offset, row_offset, width, height)
    win  = Window(0, 0, 512, 512)
    data = src.read(1, window=win)
    t    = src.window_transform(win)
```

### Block-by-Block Processing

```python
with rasterio.open('large.tif') as src:
    meta = src.meta.copy()

with rasterio.open('large.tif') as src, \
     rasterio.open('result.tif', 'w', **meta) as dst:

    for ji, window in src.block_windows(1):
        data = src.read(window=window)         # all bands
        # … process data …
        dst.write(data, window=window)
```

### Tile Iterator (custom tile size)

```python
from rasterio.windows import Window

def iter_tiles(src, tile_size=1024):
    """Yield (window, transform) pairs for every tile."""
    for row_off in range(0, src.height, tile_size):
        for col_off in range(0, src.width, tile_size):
            w = min(tile_size, src.width  - col_off)
            h = min(tile_size, src.height - row_off)
            win = Window(col_off, row_off, w, h)
            yield win, src.window_transform(win)

with rasterio.open('image.tif') as src:
    for win, t in iter_tiles(src, tile_size=512):
        data = src.read(window=win)
        # process tile …
```

---

## 7. Band Math & Spectral Indices

### NDVI (Normalized Difference Vegetation Index)

```python
import numpy as np

with rasterio.open('multispectral.tif') as src:
    # Sentinel-2: Band 4 = Red, Band 8 = NIR
    red = src.read(4).astype('float32')
    nir = src.read(8).astype('float32')
    meta = src.meta.copy()

# Suppress divide-by-zero warnings
np.seterr(divide='ignore', invalid='ignore')

ndvi = (nir - red) / (nir + red)
ndvi = np.nan_to_num(ndvi, nan=-9999)

meta.update(dtype='float32', count=1, nodata=-9999)
with rasterio.open('ndvi.tif', 'w', **meta) as dst:
    dst.write(ndvi.astype('float32'), 1)
```

### Common Spectral Indices

```python
# EVI — Enhanced Vegetation Index
evi = 2.5 * (nir - red) / (nir + 6*red - 7.5*blue + 1)

# NDWI — Normalized Difference Water Index (McFeeters)
ndwi = (green - nir) / (green + nir)

# SAVI — Soil-Adjusted Vegetation Index (L=0.5)
L = 0.5
savi = ((nir - red) / (nir + red + L)) * (1 + L)

# NDSI — Normalized Difference Snow Index
ndsi = (green - swir) / (green + swir)

# NBR — Normalized Burn Ratio
nbr = (nir - swir2) / (nir + swir2)
```

### General Band Arithmetic

```python
with rasterio.open('image.tif') as src:
    b1, b2, b3 = src.read(1), src.read(2), src.read(3)

# Stack bands into a single array
stack = np.stack([b1, b2, b3], axis=0)  # (3, rows, cols)

# Per-pixel mean across bands
mean_band = np.mean(stack, axis=0)

# Brightness normalisation
brightness = np.sqrt(b1**2 + b2**2 + b3**2)
```

---

## 8. Raster Statistics

### Global & Per-Band Statistics

```python
import numpy as np

with rasterio.open('image.tif') as src:
    for band_idx in range(1, src.count + 1):
        data   = src.read(band_idx).astype('float64')
        nodata = src.nodata
        valid  = data[data != nodata] if nodata is not None else data.ravel()

        print(f"Band {band_idx}:")
        print(f"  Min:    {valid.min():.4f}")
        print(f"  Max:    {valid.max():.4f}")
        print(f"  Mean:   {valid.mean():.4f}")
        print(f"  Std:    {valid.std():.4f}")
        print(f"  Median: {np.median(valid):.4f}")
        print(f"  P2/P98: {np.percentile(valid, 2):.4f} / {np.percentile(valid, 98):.4f}")
```

### Zonal Statistics (rasterstats)

```python
from rasterstats import zonal_stats
import geopandas as gpd

zones = gpd.read_file('polygons.shp')

stats = zonal_stats(
    zones,
    'raster.tif',
    stats=['min', 'max', 'mean', 'std', 'count', 'sum',
           'median', 'majority', 'minority', 'unique',
           'range', 'nodata', 'percentile_25', 'percentile_75'],
    nodata=-9999,
    geojson_out=False,
    band=1,
)

zones_df = zones.copy()
zones_df['mean_value'] = [s['mean'] for s in stats]
```

### Histogram

```python
import numpy as np

with rasterio.open('image.tif') as src:
    data   = src.read(1).astype('float32')
    nodata = src.nodata
    valid  = data[data != nodata].ravel()

counts, bin_edges = np.histogram(valid, bins=256)
bin_centers = (bin_edges[:-1] + bin_edges[1:]) / 2
```

---

## 9. Vectorization & Rasterization

### Raster → Vector (Polygonize)

```python
from rasterio.features import shapes
import geopandas as gpd
from shapely.geometry import shape

with rasterio.open('classified.tif') as src:
    image    = src.read(1).astype('uint8')
    transform = src.transform
    crs       = src.crs

# Generator of (geometry, value) tuples
results = list(shapes(image, transform=transform))

geometries = [shape(geom)  for geom, val in results]
values     = [val          for geom, val in results]

gdf = gpd.GeoDataFrame({'value': values, 'geometry': geometries},
                        crs=crs)
gdf.to_file('polygons.gpkg', driver='GPKG')
```

### Vector → Raster (Rasterize)

```python
import fiona
from rasterio.features import rasterize
from rasterio.transform import from_bounds

# Reference extent & resolution
bounds    = (10.0, 50.0, 11.0, 51.0)
res       = 0.001
width     = int((bounds[2] - bounds[0]) / res)
height    = int((bounds[3] - bounds[1]) / res)
transform = from_bounds(*bounds, width=width, height=height)

with fiona.open('polygons.shp') as shp:
    burn_pairs = [(feature['geometry'], feature['properties']['value'])
                  for feature in shp]

rasterized = rasterize(
    burn_pairs,
    out_shape=(height, width),
    transform=transform,
    fill=0,          # background value
    dtype='float32',
    all_touched=False,
)

profile = dict(driver='GTiff', dtype='float32', width=width,
               height=height, count=1, crs='EPSG:4326',
               transform=transform)
with rasterio.open('rasterized.tif', 'w', **profile) as dst:
    dst.write(rasterized, 1)
```

---

## 10. Contours & Surface Analysis

### Extract Contour Lines

```python
import numpy as np
from rasterio.features import shapes
from shapely.geometry import shape
import geopandas as gpd

with rasterio.open('dem.tif') as src:
    dem       = src.read(1).astype('float32')
    transform = src.transform
    crs       = src.crs

intervals  = np.arange(0, dem.max(), 100)   # every 100 m
all_lines  = []
all_elevs  = []

for elev in intervals:
    binary = (dem >= elev).astype('uint8')
    for geom, val in shapes(binary, transform=transform):
        if val == 1:
            all_lines.append(shape(geom).boundary)
            all_elevs.append(elev)

contours = gpd.GeoDataFrame({'elevation': all_elevs,
                              'geometry':  all_lines}, crs=crs)
contours.to_file('contours.gpkg', driver='GPKG')
```

### Slope & Aspect from a DEM

```python
import numpy as np

def compute_slope_aspect(dem, cell_size):
    """Return slope (degrees) and aspect (degrees) arrays."""
    # Sobel-style 3×3 neighbourhood gradients
    dz_dx = np.gradient(dem, axis=1) / cell_size
    dz_dy = np.gradient(dem, axis=0) / cell_size

    slope  = np.degrees(np.arctan(np.sqrt(dz_dx**2 + dz_dy**2)))
    aspect = np.degrees(np.arctan2(-dz_dy, dz_dx)) % 360
    return slope, aspect

with rasterio.open('dem.tif') as src:
    dem       = src.read(1).astype('float64')
    cell_size = src.res[0]             # assumes square pixels
    meta      = src.meta.copy()

slope, aspect = compute_slope_aspect(dem, cell_size)

meta.update(dtype='float32', count=1, nodata=-9999)
with rasterio.open('slope.tif', 'w', **meta) as dst:
    dst.write(slope.astype('float32'), 1)
with rasterio.open('aspect.tif', 'w', **meta) as dst:
    dst.write(aspect.astype('float32'), 1)
```

### Hillshade

```python
import numpy as np

def hillshade(dem, cell_size, azimuth=315, altitude=45):
    az  = np.radians(360 - azimuth + 90)
    alt = np.radians(altitude)

    dz_dx = np.gradient(dem, axis=1) / cell_size
    dz_dy = np.gradient(dem, axis=0) / cell_size

    slope  = np.arctan(np.sqrt(dz_dx**2 + dz_dy**2))
    aspect = np.arctan2(-dz_dy, dz_dx)

    hs = (np.cos(alt) * np.cos(slope) +
          np.sin(alt) * np.sin(slope) * np.cos(az - aspect))
    return np.clip(hs * 255, 0, 255).astype('uint8')

with rasterio.open('dem.tif') as src:
    dem  = src.read(1).astype('float64')
    meta = src.meta.copy()

hs = hillshade(dem, src.res[0])

meta.update(dtype='uint8', count=1, nodata=None)
with rasterio.open('hillshade.tif', 'w', **meta) as dst:
    dst.write(hs, 1)
```

---

## 11. Merging & Mosaicking

### Merge Multiple Rasters

```python
from rasterio.merge import merge

paths   = ['tile_1.tif', 'tile_2.tif', 'tile_3.tif']
sources = [rasterio.open(p) for p in paths]

mosaic, out_transform = merge(
    sources,
    method='first',     # first | last | min | max | sum | count | mean
    nodata=-9999,
    resampling=rasterio.enums.Resampling.nearest,
)

out_meta = sources[0].meta.copy()
out_meta.update({
    'height':    mosaic.shape[1],
    'width':     mosaic.shape[2],
    'transform': out_transform,
})

for src in sources:
    src.close()

with rasterio.open('mosaic.tif', 'w', **out_meta) as dst:
    dst.write(mosaic)
```

### Virtual Raster (VRT) via GDAL

```python
import subprocess

tiles = ['tile_1.tif', 'tile_2.tif', 'tile_3.tif']
subprocess.run(['gdalbuildvrt', 'mosaic.vrt'] + tiles, check=True)
subprocess.run(['gdal_translate', '-of', 'GTiff',
                'mosaic.vrt', 'mosaic.tif'], check=True)
```

---

## 12. Cloud-Optimised GeoTIFF (COG)

### Write a COG

```python
import rasterio
from rasterio.shutil import copy as rio_copy

# Write the intermediate file first, then convert to COG
with rasterio.open('input.tif') as src:
    meta = src.meta.copy()

# Step 1 – write normal GeoTIFF
with rasterio.open('temp.tif', 'w', **meta) as dst:
    dst.write(src.read())

# Step 2 – convert to COG
rio_copy(
    'temp.tif', 'output_cog.tif',
    driver='GTiff',
    copy_src_overviews=True,
    tiled=True,
    blockxsize=512, blockysize=512,
    compress='deflate',
    predictor=2,
)
```

### Add Overviews (Pyramids)

```python
import rasterio
from rasterio.enums import Resampling

with rasterio.open('image.tif', 'r+') as dst:
    overview_levels = [2, 4, 8, 16, 32, 64]
    dst.build_overviews(overview_levels, Resampling.average)
    dst.update_tags(ns='rio_overview', resampling='average')
```

---

## 13. Point Sampling & Extraction

### Sample Raster at Point Coordinates

```python
import rasterio

coords = [(10.5, 50.5), (10.6, 50.6), (10.7, 50.7)]  # (lon, lat)

with rasterio.open('image.tif') as src:
    # sample() returns an iterator of band value arrays
    values = list(src.sample(coords))          # one array per point
    # [(band1, band2, …), …]

# Single-band convenience
with rasterio.open('dem.tif') as src:
    elevations = [v[0] for v in src.sample(coords)]
```

### Extract Values Along a Transect

```python
import numpy as np
from shapely.geometry import LineString

line  = LineString([(10.0, 50.5), (11.0, 50.5)])
n_pts = 500
pts   = [line.interpolate(i / n_pts, normalized=True)
         for i in range(n_pts + 1)]
coords = [(p.x, p.y) for p in pts]

with rasterio.open('dem.tif') as src:
    profile = [v[0] for v in src.sample(coords)]
distances = np.linspace(0, line.length, len(profile))
```

---

## 14. Reclassification & Thresholding

### Reclassify by Value Range

```python
import numpy as np

with rasterio.open('ndvi.tif') as src:
    data   = src.read(1).astype('float32')
    nodata = src.nodata
    meta   = src.meta.copy()

classified = np.zeros_like(data, dtype='uint8')
classified[(data >= -1.0) & (data <  0.0)] = 1   # Water / bare
classified[(data >=  0.0) & (data <  0.2)] = 2   # Sparse vegetation
classified[(data >=  0.2) & (data <  0.4)] = 3   # Moderate
classified[(data >=  0.4) & (data <= 1.0)] = 4   # Dense vegetation
if nodata is not None:
    classified[data == nodata] = 0

meta.update(dtype='uint8', nodata=0)
with rasterio.open('classified.tif', 'w', **meta) as dst:
    dst.write(classified, 1)
```

### Binary Threshold Mask

```python
import numpy as np

with rasterio.open('slope.tif') as src:
    slope = src.read(1).astype('float32')
    meta  = src.meta.copy()

# Areas steeper than 30° = 1, rest = 0
steep = (slope > 30).astype('uint8')

meta.update(dtype='uint8', nodata=255)
with rasterio.open('steep_areas.tif', 'w', **meta) as dst:
    dst.write(steep, 1)
```

---

## 15. Focal / Neighbourhood Operations

### 2-D Convolution with SciPy

```python
import numpy as np
from scipy.ndimage import uniform_filter, gaussian_filter, generic_filter

with rasterio.open('image.tif') as src:
    data = src.read(1).astype('float64')
    meta = src.meta.copy()

# Mean (box) filter — 5×5
smoothed = uniform_filter(data, size=5)

# Gaussian blur
blurred  = gaussian_filter(data, sigma=2)

# Custom focal function (e.g., focal range)
def focal_range(values):
    return values.max() - values.min()

focal_rng = generic_filter(data, focal_range, size=3)

meta.update(dtype='float64')
with rasterio.open('smoothed.tif', 'w', **meta) as dst:
    dst.write(smoothed, 1)
```

### Morphological Operations

```python
from scipy.ndimage import binary_dilation, binary_erosion, binary_closing

with rasterio.open('binary_mask.tif') as src:
    mask = src.read(1).astype(bool)
    meta = src.meta.copy()

# Expand mask by 3 pixels
dilated  = binary_dilation(mask, iterations=3)
# Shrink mask by 3 pixels
eroded   = binary_erosion(mask,  iterations=3)
# Close small holes
closed   = binary_closing(mask,  iterations=2)

meta.update(dtype='uint8')
with rasterio.open('dilated.tif', 'w', **meta) as dst:
    dst.write(dilated.astype('uint8'), 1)
```

---

## 16. Proximity & Distance Rasters

### Euclidean Distance via GDAL

```python
from osgeo import gdal, ogr

# Raster proximity (distance to nearest non-zero pixel)
src_ds  = gdal.Open('binary_mask.tif')
src_band = src_ds.GetRasterBand(1)

drv     = gdal.GetDriverByName('GTiff')
dst_ds  = drv.Create('proximity.tif',
                     src_ds.RasterXSize, src_ds.RasterYSize,
                     1, gdal.GDT_Float32)
dst_ds.SetGeoTransform(src_ds.GetGeoTransform())
dst_ds.SetProjection(src_ds.GetProjection())
dst_band = dst_ds.GetRasterBand(1)

gdal.ComputeProximity(src_band, dst_band,
                      ['DISTUNITS=GEO', 'MAXDIST=10000'])
dst_ds.FlushCache()
```

---

## 17. Terrain Analysis (richdem)

```python
import richdem as rd
import rasterio
import numpy as np

with rasterio.open('dem.tif') as src:
    dem_np    = src.read(1).astype('float64')
    nodata    = src.nodata
    transform = src.transform
    crs       = src.crs
    meta      = src.meta.copy()

# Convert to richdem array
dem_rd = rd.rdarray(dem_np, no_data=nodata)
dem_rd.geotransform = [transform.c, transform.a, transform.b,
                       transform.f, transform.d, transform.e]

# Fill depressions (Breach or Fill)
rd.FillDepressions(dem_rd, epsilon=True, in_place=True)

# Flow accumulation (D8)
accum = rd.FlowAccumulation(dem_rd, method='D8')

# Terrain attributes
slope    = rd.TerrainAttribute(dem_rd, attrib='slope_degrees')
aspect   = rd.TerrainAttribute(dem_rd, attrib='aspect')
curvature = rd.TerrainAttribute(dem_rd, attrib='curvature')
twi      = rd.TerrainAttribute(dem_rd, attrib='TWI')

meta.update(dtype='float32', count=1, nodata=-9999)
for name, arr in [('slope', slope), ('aspect', aspect), ('twi', twi)]:
    with rasterio.open(f'{name}.tif', 'w', **meta) as dst:
        dst.write(arr.astype('float32'), 1)
```

---

## 18. Change Detection

### Image Differencing

```python
import numpy as np

def read_band(path, band=1, nodata_fill=np.nan):
    with rasterio.open(path) as src:
        data   = src.read(band).astype('float32')
        nodata = src.nodata
        if nodata is not None:
            data[data == nodata] = nodata_fill
        return data, src.meta.copy()

b_before, meta = read_band('before.tif')
b_after,  _    = read_band('after.tif')

diff     = b_after - b_before
abs_diff = np.abs(diff)

# Flag pixels that changed by more than 2 std deviations
threshold = 2 * np.nanstd(diff)
changed   = (abs_diff > threshold).astype('uint8')

meta.update(dtype='uint8', nodata=255)
with rasterio.open('change_mask.tif', 'w', **meta) as dst:
    dst.write(changed, 1)
```

### NDVI Change Detection

```python
ndvi_t1 = compute_ndvi('image_t1.tif', red_band=3, nir_band=4)
ndvi_t2 = compute_ndvi('image_t2.tif', red_band=3, nir_band=4)

ndvi_diff = ndvi_t2 - ndvi_t1

# Vegetation loss  (ΔNDVI < −0.2)
loss_mask = (ndvi_diff < -0.2).astype('uint8')
# Vegetation gain  (ΔNDVI >  0.2)
gain_mask = (ndvi_diff >  0.2).astype('uint8')
```

---

## 19. Visualisation

### Quick Plot with Matplotlib

```python
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
from rasterio.plot import show, show_hist
import numpy as np

with rasterio.open('ndvi.tif') as src:
    ndvi = src.read(1)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Map
img = axes[0].imshow(ndvi, cmap='RdYlGn', vmin=-1, vmax=1)
plt.colorbar(img, ax=axes[0], label='NDVI')
axes[0].set_title('NDVI')
axes[0].axis('off')

# Histogram
axes[1].hist(ndvi[ndvi != -9999].ravel(), bins=256, color='green', alpha=0.7)
axes[1].set_xlabel('NDVI value')
axes[1].set_ylabel('Count')
axes[1].set_title('NDVI Distribution')

plt.tight_layout()
plt.savefig('ndvi_plot.png', dpi=150, bbox_inches='tight')
plt.show()
```

### RGB Composite (percent-clip stretch)

```python
import numpy as np
import matplotlib.pyplot as plt

def percentile_stretch(band, pmin=2, pmax=98):
    lo, hi = np.percentile(band[band > 0], [pmin, pmax])
    return np.clip((band - lo) / (hi - lo), 0, 1)

with rasterio.open('sentinel2.tif') as src:
    r = percentile_stretch(src.read(3).astype('float32'))
    g = percentile_stretch(src.read(2).astype('float32'))
    b = percentile_stretch(src.read(1).astype('float32'))

rgb = np.dstack([r, g, b])
plt.figure(figsize=(10, 10))
plt.imshow(rgb)
plt.axis('off')
plt.tight_layout()
plt.savefig('rgb_composite.png', dpi=150, bbox_inches='tight')
```

### Interactive Map with Folium

```python
import folium
import numpy as np
import rasterio
from rasterio.warp import transform_bounds

with rasterio.open('ndvi.tif') as src:
    bounds_wgs84 = transform_bounds(src.crs, 'EPSG:4326', *src.bounds)

west, south, east, north = bounds_wgs84
center = [(south + north) / 2, (west + east) / 2]

m = folium.Map(location=center, zoom_start=10, tiles='CartoDB positron')
folium.raster_layers.ImageOverlay(
    image='ndvi_rgb.png',          # pre-rendered PNG
    bounds=[[south, west], [north, east]],
    opacity=0.7,
    name='NDVI'
).add_to(m)
folium.LayerControl().add_to(m)
m.save('ndvi_map.html')
```

---

## 20. Performance Tips

| Technique | Benefit |
|---|---|
| Use `with` context managers | Auto-closes file handles |
| Read only needed bands | Reduces memory & I/O |
| Windowed / tiled I/O | Process files larger than RAM |
| `compress='lzw'` or `'deflate'` | Smaller output files |
| `tiled=True` + `blockxsize/blockysize` | Fast spatial access |
| Build overviews (pyramids) | Fast zoom-level rendering |
| COG format | Efficient cloud streaming |
| `out_shape` decimated reads | Fast low-res previews |
| `dtype='float32'` over `float64` | Halves memory use |
| `dask` + `rioxarray` | Parallel chunk processing |

### Dask + rioxarray for Large Rasters

```python
import rioxarray as rxr
import dask

# Open lazily — no data loaded yet
da = rxr.open_rasterio('large_image.tif', chunks={'x': 1024, 'y': 1024})

# Computation is deferred
result = (da.sel(band=4) - da.sel(band=3)) / (da.sel(band=4) + da.sel(band=3))

# Trigger execution in parallel
ndvi_computed = result.compute()
ndvi_computed.rio.to_raster('ndvi_dask.tif', compress='lzw')
```

---

## Quick Reference: Common Patterns

```python
# Pattern 1 — Read → process → write (preserving georef)
with rasterio.open('input.tif') as src:
    data, meta = src.read(1).astype('float32'), src.meta.copy()
meta.update(dtype='float32', nodata=-9999)
result = data * 2                            # ← your operation here
with rasterio.open('output.tif', 'w', **meta) as dst:
    dst.write(result, 1)

# Pattern 2 — Safe NoData handling
with rasterio.open('input.tif') as src:
    raw    = src.read(1, masked=True)        # numpy MaskedArray
    data   = raw.filled(np.nan)              # fill mask with NaN

# Pattern 3 — Reproject on read
from rasterio.vrt import WarpedVRT
with rasterio.open('input.tif') as src:
    with WarpedVRT(src, crs='EPSG:32632',
                   resampling=rasterio.enums.Resampling.bilinear) as vrt:
        data = vrt.read()

# Pattern 4 — Check and set CRS
with rasterio.open('image.tif', 'r+') as dst:
    if dst.crs is None:
        dst.crs = rasterio.CRS.from_epsg(4326)

# Pattern 5 — Update tags / metadata
with rasterio.open('output.tif', 'r+') as dst:
    dst.update_tags(created_by='rasterio', source='sentinel2')
    dst.update_tags(1, band_name='NDVI', description='Vegetation index')
```
