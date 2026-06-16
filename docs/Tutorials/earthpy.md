---
hide:
  - toc
---
# Complete EarthPy Methods Reference

## 1. Core concepts

EarthPy is a Python package for working with spatial raster and vector data, especially for remote sensing workflows. It builds on NumPy, Rasterio, GeoPandas, and Matplotlib to make common geospatial tasks easier.

### 1.1 Main modules

- **`earthpy.spatial`** - Raster stacking, clipping, masking, hillshade, and normalized difference.
- **`earthpy.plot`** - Plotting helpers for raster bands, RGB composites, histograms, and legends.
- **`earthpy.io`** - Data access and download utilities.
- **`earthpy.mask`** - Masking helpers for raster data.
- **`earthpy.clip`** - Clipping and cropping helpers.
- **`earthpy.data`** - Download example datasets.

### 1.2 Common imports

```python
import earthpy as et
import earthpy.spatial as es
import earthpy.plot as ep
import matplotlib.pyplot as plt
import numpy as np
```

### 1.3 Basic workflow example

```python
import earthpy as et
import earthpy.spatial as es
import earthpy.plot as ep
import matplotlib.pyplot as plt

arr = np.random.randint(0, 255, size=(3, 100, 100))
ep.plot_rgb(arr, rgb=(0, 1, 2))
plt.show()
```

---

## 2. Data access

EarthPy includes helper functions for downloading example datasets and managing local data paths.

### 2.1 Common methods

- **`et.data.get_data()`** - Download a sample dataset.
- **`et.io.HOME`** - Base directory used for EarthPy data storage.
- **`et.io.data_path`** - Data directory helper when available in your setup.

### 2.2 Example

```python
import earthpy as et

data = et.data.get_data("cold-springs-fire")
print(data)
```

---

## 3. Raster stacking

Stacking combines multiple single-band rasters into one multi-band array. This is one of the most useful EarthPy workflows for remote sensing.

### 3.1 Common methods

- **`es.stack()`** - Stack raster files into a multiband array.
- **`es.stack_raster_tifs()`** - Stack multiple raster TIFs into a single array.
- **`es.stack_raster()`** - Stack raster inputs when available in your version.
- **`es.copy_to()`** - Utility for copying files in some workflows.

### 3.2 Example

```python
import os
import earthpy as et
import earthpy.spatial as es

data = et.data.get_data("cold-springs-fire")
band_paths = [
    os.path.join(data, "landsat7_band1.tif"),
    os.path.join(data, "landsat7_band2.tif"),
    os.path.join(data, "landsat7_band3.tif")
]

stacked, meta = es.stack(band_paths)
```

---

## 4. Raster masking

Masking is used to set unwanted pixels to no data values, such as clouds, shadows, or background pixels.

### 4.1 Common methods

- **`es.mask_pixels()`** - Mask pixels based on a condition.
- **`es.create_binary_mask()`** - Create a binary mask.
- **`es.mask_image()`** - Apply a mask to an image.
- **`es.clip_array()`** - Clip array values in some workflows.

### 4.2 Example

```python
import numpy as np
import earthpy.spatial as es

arr = np.random.randint(0, 255, size=(3, 100, 100))
mask = arr < 50
masked = es.mask_pixels(arr, mask)
```

---

## 5. Raster clipping and cropping

EarthPy provides helpers to crop raster data to a polygon or other spatial extent.

### 5.1 Common methods

- **`es.crop_image()`** - Crop raster data to a polygon.
- **`es.crop()`** - Crop raster or array inputs when available.
- **`es.clip()`** - Clip raster data in some versions and workflows.

### 5.2 Example

```python
# Example conceptual pattern
cropped, cropped_meta = es.crop_image(raster_array, crop_extent)
```

---

## 6. Spectral analysis

EarthPy includes functions that are useful for remote sensing band math and vegetation analysis.

### 6.1 Common methods

- **`es.normalized_diff()`** - Compute a normalized difference index such as NDVI.
- **`es.hillshade()`** - Create hillshade from elevation data.
- **`es.bytescale()`** - Scale values to byte range for display.

### 6.2 Example

```python
import earthpy.spatial as es

ndvi = es.normalized_diff(nir_band, red_band)
```

### 6.3 NDVI example

```python
import numpy as np
import earthpy.spatial as es

red = np.random.rand(100, 100)
nir = np.random.rand(100, 100)
ndvi = es.normalized_diff(nir, red)
```

---

## 7. Plotting raster bands

EarthPy’s plotting module is designed to make raster visualization quick and readable.

### 7.1 Common methods

- **`ep.plot_bands()`** - Plot each band of a raster in a grid.
- **`ep.plot_rgb()`** - Plot RGB or false-color composites.
- **`ep.hist()`** - Plot histograms of raster values.
- **`ep.colorbar()`** - Add a correctly sized colorbar.
- **`ep.create_legend()`** - Create a discrete legend for classes.
- **`ep.clip()`** - Plot clipping helper in some workflows.
- **`ep.imshow()`** - Display array-style images where available.

### 7.2 Example: plot all bands

```python
import numpy as np
import earthpy.plot as ep
import matplotlib.pyplot as plt

arr = np.random.randint(0, 255, size=(4, 100, 100))
ep.plot_bands(arr, titles=["Band 1", "Band 2", "Band 3", "Band 4"])
plt.show()
```

### 7.3 Example: RGB composite

```python
import numpy as np
import earthpy.plot as ep
import matplotlib.pyplot as plt

arr = np.random.randint(0, 255, size=(3, 100, 100))
ep.plot_rgb(arr, rgb=(0, 1, 2))
plt.show()
```

---

## 8. Histograms and distributions

Histograms help inspect band values, identify outliers, and compare distributions across bands.

### 8.1 Common methods

- **`ep.hist()`** - Plot histogram for one or more bands.
- **`plt.hist()`** - Standard Matplotlib histogram when needed.

### 8.2 Example

```python
import numpy as np
import earthpy.plot as ep
import matplotlib.pyplot as plt

arr = np.random.randint(0, 255, size=(3, 100, 100))
ep.hist(arr)
plt.show()
```

---

## 9. Legends and colorbars

EarthPy simplifies legends and colorbars for raster and categorical plots.

### 9.1 Common methods

- **`ep.create_legend()`** - Create a discrete legend.
- **`ep.colorbar()`** - Create a colorbar sized for plot layouts.

### 9.2 Example

```python
from matplotlib.colors import ListedColormap
import earthpy.plot as ep

classes = np.array([, ])[1][2][3]
cmap = ListedColormap(["red", "green", "blue"])
```

---

## 10. Raster and vector overlays

EarthPy is often used with GeoPandas and Matplotlib to overlay vector boundaries on raster maps.

### 10.1 Common pattern

- Plot raster with `ep.plot_bands()` or `ep.plot_rgb()`.
- Add vector boundary using GeoPandas `.plot()` on the same axes.
- Use Matplotlib for titles, labels, and legends.

### 10.2 Example

```python
import matplotlib.pyplot as plt
import earthpy.plot as ep

ep.plot_bands(arr, cmap="gray")
boundary.plot(ax=plt.gca(), edgecolor="red", linewidth=2)
plt.show()
```

---

## 11. Utility functions

EarthPy includes a few general helpers that support spatial workflows.

### 11.1 Common methods

- **`et.utils.url_to_path()`** - Convert URLs to local paths when available.
- **`et.utils.download()`** - Download remote files when available.
- **`et.utils.copy()`** - Copy files in supported workflows.

---

## 12. Common workflow examples

### 12.1 Stack and plot bands

```python
import os
import earthpy as et
import earthpy.spatial as es
import earthpy.plot as ep
import matplotlib.pyplot as plt

data = et.data.get_data("cold-springs-fire")
band_paths = [
    os.path.join(data, "landsat7_band1.tif"),
    os.path.join(data, "landsat7_band2.tif"),
    os.path.join(data, "landsat7_band3.tif")
]

stacked, meta = es.stack(band_paths)
ep.plot_bands(stacked, titles=["Band 1", "Band 2", "Band 3"])
plt.show()
```

### 12.2 Create NDVI

```python
import earthpy.spatial as es

ndvi = es.normalized_diff(nir_band, red_band)
```

### 12.3 Create hillshade

```python
import earthpy.spatial as es

shade = es.hillshade(dem_array, azimuth=225, altitude=45)
```

---

## 13. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Data access | `et.data.get_data()` | Download sample datasets. |
| Stacking | `es.stack()`, `es.stack_raster_tifs()` | Combine single-band rasters. |
| Masking | `es.mask_pixels()` | Mask unwanted pixels. |
| Cropping | `es.crop_image()` | Clip rasters to an extent. |
| Band math | `es.normalized_diff()` | Compute indices like NDVI. |
| Terrain | `es.hillshade()` | Create shaded relief. |
| Plotting | `ep.plot_bands()`, `ep.plot_rgb()` | Visualize raster data. |
| Histograms | `ep.hist()` | Inspect pixel distributions. |
| Legends | `ep.create_legend()` | Create categorical legends. |
| Colorbars | `ep.colorbar()` | Add properly sized colorbars. |

---

## 14. Example full workflow

```python
import numpy as np
import earthpy.spatial as es
import earthpy.plot as ep
import matplotlib.pyplot as plt

red = np.random.rand(100, 100)
nir = np.random.rand(100, 100)
ndvi = es.normalized_diff(nir, red)

fig, ax = plt.subplots(figsize=(6, 5))
im = ax.imshow(ndvi, cmap="RdYlGn")
fig.colorbar(im, ax=ax)
ax.set_title("NDVI")
ax.axis("off")
plt.show()
```