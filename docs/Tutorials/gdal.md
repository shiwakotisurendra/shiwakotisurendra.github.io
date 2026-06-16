---
hide:
  - toc
  - navigation
---

# Complete GDAL Guide: Methods, Use Cases, and Examples

The Geospatial Data Abstraction Library (GDAL/OGR) is the foundational library for reading, writing, and manipulating raster and vector geospatial data. This comprehensive guide covers essential Python binding methods, end-to-end use cases, and fully functional code examples.

---

## 1. Core Raster Architecture & Methods (`gdal`)

### Opening and Inspecting Datasets
To interact with raster data, you must open the dataset, extract metadata, geotransform matrices, and spatial reference systems (SRS).

```python
from osgeo import gdal, osr

# Open a raster dataset in read-only mode
dataset = gdal.Open("elevation.tif", gdal.GA_ReadOnly)
if not dataset:
    raise IOError("Failed to open raster dataset.")

# Get raster dimensions
width = dataset.RasterXSize
height = dataset.RasterYSize
band_count = dataset.RasterCount
print(f"Dimensions: {width}x{height} | Bands: {band_count}")

# Get the GeoTransform matrix
# [0] = Top-left X, [1] = W-E pixel resolution, [2] = Rotation (0 if North up)
# [3] = Top-left Y, [4] = Rotation (0 if North up), [5] = N-S pixel resolution (negative)
geotransform = dataset.GetGeoTransform()
if geotransform:
    print(f"Origin: ({geotransform[0]}, {geotransform[3]})")
    print(f"Pixel Size: ({geotransform[1]}, {geotransform[5]})")

# Get Projection Reference
projection_wkt = dataset.GetProjection()
srs = osr.SpatialReference(wkt=projection_wkt)
print(f"Spatial Reference: {srs.GetAttrValue('AUTHORITY', 0)}:{srs.GetAttrValue('AUTHORITY', 1)}")
```

### Band-Level Data Extraction
Raster bands contain the actual structural pixel grids. GDAL structures these as `gdal.Band` objects.

```python
# Fetch the first band (1-indexed)
band = dataset.GetRasterBand(1)

# Read pixel data as a NumPy array directly
import numpy as np
pixel_data = band.ReadAsArray(xoff=0, yoff=0, win_xsize=width, win_ysize=height)

# Retrieve metadata attributes
nodata_val = band.GetNoDataValue()
min_val, max_val, mean_val, std_dev = band.GetStatistics(True, True)

print(f"NoData Value: {nodata_val}")
print(f"Value Range: {min_val} to {max_val}")
```

### Writing and Creating New Raster Data
To build a new raster from scratch, instantiate a driver and allocate memory spaces.

```python
# Get driver by short name
driver = gdal.GetDriverByName("GTiff")

# Create a new 1-band floating-point geotiff dataset
out_dataset = driver.Create("output_surface.tif", width, height, 1, gdal.GDT_Float32)

# Apply spatial contexts
out_dataset.SetGeoTransform(geotransform)
out_dataset.SetProjection(projection_wkt)

# Write modified numpy matrices back to the band grid
out_band = out_dataset.GetRasterBand(1)
modified_data = pixel_data * 2.5  # Example matrix manipulation
out_band.WriteArray(modified_data)

# Explicitly set NoData flag and build structural overviews (pyramids)
out_band.SetNoDataValue(-9999.0)
out_dataset.BuildOverviews("NEAREST", [2, 4, 8, 16])

# Flush cache to disk and close datasets
out_band.FlushCache()
out_dataset = None
dataset = None
```

---

## 2. Core Vector Architecture & Methods (`ogr`)

### Reading Structural Vector Data
Vector layers are accessed through the OGR abstraction layer. Vector files contain data organized into `Layers`, `Features`, and `Geometries`.

```python
from osgeo import ogr

# Open vector data
vec_datasource = ogr.Open("boundaries.geojson", 0) # 0 = Read-only, 1 = Write
if not vec_datasource:
    raise IOError("Failed to open vector dataset.")

# Fetch layer framework
layer = vec_datasource.GetLayer(0)
layer_name = layer.GetName()
feature_count = layer.GetFeatureCount()
print(f"Layer: {layer_name} | Total Features: {feature_count}")

# Extents and Spatial References
extent = layer.GetExtent() # (MinX, MaxX, MinY, MaxY)
spatial_ref = layer.GetSpatialRef()
print(f"Bounding Box Extent: {extent}")

# Schema Definitions
layer_defn = layer.GetLayerDefn()
field_names = [layer_defn.GetFieldDefn(i).GetName() for i in range(layer_defn.GetFieldCount())]
print(f"Attribute Schema: {field_names}")
```

### Iterating and Extracting Geometry
To query attribute values or read positional data coordinates, iterate over individual features.

```python
# Loop through features securely
layer.ResetReading()
for feature in layer:
    # Read properties by name
    fid = feature.GetFID()
    name_attr = feature.GetFieldAsString("region_name")
    
    # Extract structural Geometry objects
    geometry = feature.GetGeometryRef()
    geom_type = geometry.GetGeometryName() # e.g., POLYGON, POINT
    
    if geom_type == "POINT":
        x, y = geometry.GetX(), geometry.GetY()
        print(f"FID: {fid} | {name_attr} -> Location: ({x}, {y})")
    elif geom_type == "POLYGON" or geom_type == "MULTIPOLYGON":
        area = geometry.GetArea()
        centroid = geometry.Centroid()
        print(f"FID: {fid} | {name_attr} -> Spatial Area: {area:.2f}")
```

### Generating New Vector Sources
Creating vector layers requires creating attribute definitions before populating data elements.

```python
vec_driver = ogr.GetDriverByName("ESRI Shapefile")
out_datasource = vec_driver.CreateDataSource("output_regions.shp")

# Set coordinate reference space
srs_wgs84 = osr.SpatialReference()
srs_wgs84.ImportFromEPSG(4326)

# Instantiate the physical layer
out_layer = out_datasource.CreateLayer("regions", srs_wgs84, ogr.wkbPolygon)

# Construct attributes fields structure
field_id = ogr.FieldDefn("ID", ogr.OFTInteger)
out_layer.CreateField(field_id)

field_label = ogr.FieldDefn("Label", ogr.OFTString)
field_label.SetWidth(50)
out_layer.CreateField(field_label)

# Create feature transaction
feature_defn = out_layer.GetLayerDefn()
new_feature = ogr.Feature(feature_defn)

# Define geometry values using Well-Known Text (WKT)
wkt_poly = "POLYGON ((10 10, 20 10, 20 20, 10 20, 10 10))"
polygon_geom = ogr.CreateGeometryFromWkt(wkt_poly)

new_feature.SetGeometry(polygon_geom)
new_feature.SetField("ID", 101)
new_feature.SetField("Label", "Zone Alpha")

# Write feature to disk layout
out_layer.CreateFeature(new_feature)

# Cleanup resources
new_feature = None
out_datasource = None
```

---

## 3. High-Level Processing Operations (`gdal.Warp`, `gdal.Translate`)

GDAL includes high-level utilities that streamline complex spatial processing operations down to simple programmatic calls.

```python
# Reproject, Clip, and Resample inside a single execution block
warped_ds = gdal.Warp(
    "reprojected_output.tif",
    "elevation.tif",
    options=gdal.WarpOptions(
        dstSRS="EPSG:3857",            # Re-project to Web Mercator
        resampleAlg=gdal.GRIORA_Bilinear, # Use Bilinear resampling
        outputBounds=[minx, miny, maxx, maxy], # Clip to bounding limits
        srcNodata=-9999,
        dstNodata=-9999,
        format="GTiff"
    )
)
warped_ds = None # Close and flush

# Translate to convert formats or crop rasters using pixel boundaries
translated_ds = gdal.Translate(
    "compressed_image.jpg",
    "elevation.tif",
    options=gdal.TranslateOptions(
        format="JPEG",
        srcWin=[100, 100, 500, 500], # Window slice [xoffset, yoffset, width, height]
        outputType=gdal.GDT_Byte     # Compress data down to byte structures
    )
)
translated_ds = None
```

---

## 4. End-to-End Advanced Use Case: Zonal Statistics Pipeline

This script implements an end-to-end workflow. It imports a structural multi-band raster layout, extracts values using a spatial vector overlay boundary, and outputs descriptive spatial profiles.

```python
import numpy as np
from osgeo import gdal, ogr

def calculate_zonal_statistics(raster_path, vector_path, zone_attribute):
    """
    Calculates summary metrics for a raster layer wrapped inside vector boundaries.
    """
    # Open target datasets
    raster_ds = gdal.Open(raster_path, gdal.GA_ReadOnly)
    vector_ds = ogr.Open(vector_path, 0)
    
    if not raster_ds or not vector_ds:
        raise FileNotFoundError("Unable to resolve matching file resources.")
        
    raster_layer_band = raster_ds.GetRasterBand(1)
    nodata_value = raster_layer_band.GetNoDataValue()
    
    geotransform = raster_ds.GetGeoTransform()
    projection = raster_ds.GetProjection()
    
    vector_layer = vector_ds.GetLayer()
    zonal_metrics = {}
    
    # Process features sequentially
    vector_layer.ResetReading()
    for feature in vector_layer:
        zone_id = feature.GetFieldAsString(zone_attribute)
        geom = feature.GetGeometryRef()
        
        # Determine coordinate bounding box bounds
        env = geom.GetEnvelope() # (MinX, MaxX, MinY, MaxY)
        
        # Transform map bounds directly into local pixel coordinates
        x_min = int((env[0] - geotransform[0]) / geotransform[1])
        x_max = int((env[1] - geotransform[0]) / geotransform[1]) + 1
        y_max = int((env[2] - geotransform[3]) / geotransform[5]) + 1
        y_min = int((env[4] - geotransform[3]) / geotransform[5])
        
        # Clean sorting across pixel arrays
        x_start, x_end = min(x_min, x_max), max(x_min, x_max)
        y_start, y_end = min(y_min, y_max), max(y_min, y_max)
        
        win_xsize = x_end - x_start
        win_ysize = y_end - y_start
        
        if win_xsize <= 0 or win_ysize <= 0:
            continue
            
        # Read the localized raster subarray chunk
        raster_chunk = raster_layer_band.ReadAsArray(
            xoff=x_start, yoff=y_start,
            win_xsize=win_xsize, win_ysize=win_ysize
        )
        
        # Build matching micro-memory footprint raster layer mask for boundaries
        mem_driver = gdal.GetDriverByName("MEM")
        mask_ds = mem_driver.Create("", win_xsize, win_ysize, 1, gdal.GDT_Byte)
        
        # Shift origin transformations locally relative to target sub-windows
        local_gt = (
            geotransform[0] + x_start * geotransform[1],
            geotransform[1], 0.0,
            geotransform[3] + y_start * geotransform[5],
            0.0, geotransform[5]
        )
        mask_ds.SetGeoTransform(local_gt)
        mask_ds.SetProjection(projection)
        
        # Spawn dedicated temporary layers to hold isolated vector footprints
        mem_vec_driver = ogr.GetDriverByName("Memory")
        mem_vec_ds = mem_vec_driver.CreateDataSource("mem_vec")
        mem_vec_layer = mem_vec_ds.CreateLayer("mask_geom", vector_layer.GetSpatialRef(), ogr.wkbPolygon)
        
        feat_tmp = ogr.Feature(mem_vec_layer.GetLayerDefn())
        feat_tmp.SetGeometry(geom.Clone())
        mem_vec_layer.CreateFeature(feat_tmp)
        
        # Rasterize vector layer limits directly down inside masking space
        gdal.RasterizeLayer(mask_ds, [1], mem_vec_layer, burn_values=[1])
        mask_array = mask_ds.GetRasterBand(1).ReadAsArray()
        
        # Filter array metrics via masking elements
        valid_pixels = raster_chunk[(mask_array == 1)]
        if nodata_value is not None:
            valid_pixels = valid_pixels[valid_pixels != nodata_value]
            
        if valid_pixels.size > 0:
            zonal_metrics[zone_id] = {
                "mean": float(np.mean(valid_pixels)),
                "min": float(np.min(valid_pixels)),
                "max": float(np.max(valid_pixels)),
                "count": int(valid_pixels.size)
            }
            
        # Release runtime allocations
        feat_tmp = None
        mem_vec_ds = None
        mask_ds = None
        
    raster_ds = None
    vector_ds = None
    return zonal_metrics

# Practical invocation template
# stats = calculate_zonal_statistics("dem.tif", "watersheds.shp", "HydroID")
# print(stats)
```

---

## 5. Summary Reference of Core Methods

| Abstraction | Target Method | Core Purpose / Action |
| :--- | :--- | :--- |
| **`gdal`** | `Open()` | Establishes a read/write data link to a raster file. |
| | `GetDriverByName()` | Fetches a target format driver engine (e.g., GeoTIFF, HDF5). |
| | `Warp()` | Executes re-projection, warping, mosaicking, and clipping pipelines. |
| | `Translate()` | Converts dataset structures, scales pixel depth, or slices dimensions. |
| **`gdal.Dataset`** | `GetRasterBand()` | Navigates down to specify structural data bands. |
| | `GetGeoTransform()` | Extract structural geographic bounds matrix elements. |
| **`gdal.Band`** | `ReadAsArray()` | Extracts raster cell grids directly into NumPy arrays. |
| | `WriteArray()` | Writes NumPy matrices back into file pixel channels. |
| **`ogr`** | `Open()` | Opens file system database connections to vector data. |
| **`ogr.DataSource`**| `GetLayer()` | Extracts vector geometric layers from data stores. |
| **`ogr.Layer`** | `GetNextFeature()` | Sequences forward sequentially across layout geometries. |
| | `SetSpatialFilter()` | Sets spatial geographic query constraints on target layers. |