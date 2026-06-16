---
hide:
  - toc
---

# Complete xarray and rioxarray Methods Reference

## 1. Core concepts

xarray is designed for labeled, N-dimensional data, while rioxarray extends xarray with geospatial raster I/O and CRS-aware spatial operations. Together, they are especially useful for working with raster datasets such as GeoTIFF and netCDF.

### 1.1 Main objects

- **`DataArray`**: labeled N-dimensional array, often one raster band or variable.
- **`Dataset`**: collection of one or more `DataArray` objects.
- **`rio accessor`**: geospatial extension available after importing rioxarray.
- **`coords`**: coordinate labels such as `x`, `y`, `time`, or `band`.
- **`dims`**: named dimensions.

### 1.2 Common imports

```python
import xarray as xr
import rioxarray
import numpy as np
```

### 1.3 Basic example

```python
import xarray as xr

ds = xr.open_dataset("data.nc", decode_coords="all")
print(ds)
```

---

## 2. Creating xarray objects

xarray objects can be created from NumPy arrays, pandas objects, or dictionaries of arrays.

### 2.1 Common constructors

- **`xr.DataArray()`** - Create a labeled array.
- **`xr.Dataset()`** - Create a labeled dataset.
- **`xr.Variable()`** - Create a core xarray variable.
- **`xr.DataTree()`** - Hierarchical structure in newer xarray workflows.

### 2.2 Example

```python
import xarray as xr
import numpy as np

arr = xr.DataArray(
    np.random.rand(3, 4),
    dims=("y", "x"),
    coords={"y":, "x": },[1][2][3][4][5]
    name="temperature"
)
```

---

## 3. Loading data

xarray supports multiple data sources, and rioxarray adds raster-aware reading.

### 3.1 xarray open methods

- **`xr.open_dataset()`** - Open netCDF, GRIB, and other datasets.
- **`xr.open_mfdataset()`** - Open multiple files as one dataset.
- **`xr.open_dataarray()`** - Open a single DataArray.
- **`xr.load_dataset()`** - Load dataset fully into memory.
- **`xr.load_dataarray()`** - Load DataArray fully into memory.

### 3.2 rioxarray open methods

- **`rioxarray.open_rasterio()`** - Open raster files such as GeoTIFF.
- **`xr.open_dataset(..., engine="rasterio")`** - Open raster with xarray engine support.
- **`xr.open_mfdataset(..., engine="rasterio")`** - Open multiple raster files when supported.

### 3.3 Example

```python
import xarray as xr
import rioxarray

ds = xr.open_dataset("data.nc", decode_coords="all")
raster = rioxarray.open_rasterio("image.tif")
```

---

## 4. Inspecting data

Inspection methods help understand dimensions, coordinates, metadata, and variable structure.

### 4.1 Common methods and attributes

- **`obj.dims`** - Dimension names and lengths.
- **`obj.shape`** - Shape of the array.
- **`obj.coords`** - Coordinate values.
- **`obj.data_vars`** - Variables in a Dataset.
- **`obj.variables`** - All variables.
- **`obj.attrs`** - Metadata attributes.
- **`obj.name`** - Name of a DataArray.
- **`obj.dtype`** - Data type.
- **`obj.sizes`** - Mapping of dimension sizes.
- **`obj.nbytes`** - Memory use.
- **`obj.rio.crs`** - Coordinate reference system.
- **`obj.rio.bounds()`** - Bounding box.
- **`obj.rio.transform()`** - Affine transform.

### 4.2 Example

```python
print(raster.dims)
print(raster.coords)
print(raster.rio.crs)
print(raster.rio.bounds())
```

---

## 5. Indexing and selection

xarray uses label-based and position-based selection with named dimensions.

### 5.1 Common methods

- **`sel()`** - Select by coordinate labels.
- **`isel()`** - Select by integer position.
- **`loc`** - Label-based indexing for datasets and data arrays.
- **`where()`** - Mask based on a condition.
- **`reindex()`** - Reindex along one or more dimensions.
- **`reindex_like()`** - Reindex to match another object.

### 5.2 Example

```python
subset = ds.sel(time="2024-01-01")
pixel = raster.sel(x=500000, y=5700000, method="nearest")
```

---

## 6. Mathematical operations

xarray supports arithmetic that preserves labels and coordinates.

### 6.1 Common methods

- **`+`, `-`, `*`, `/`** - Element-wise operations.
- **`sum()`** - Sum along dimensions.
- **`mean()`** - Mean along dimensions.
- **`median()`** - Median along dimensions.
- **`min()`** - Minimum.
- **`max()`** - Maximum.
- **`std()`** - Standard deviation.
- **`var()`** - Variance.
- **`cumsum()`** - Cumulative sum.
- **`diff()`** - Difference along a dimension.
- **`clip()`** - Clip values.

### 6.2 Example

```python
da = xr.DataArray(np.arange(6).reshape(2, 3), dims=("y", "x"))
print(da.mean(dim="x"))
```

---

## 7. Missing data handling

Missing values are commonly handled with masking and filling methods.

### 7.1 Common methods

- **`isnull()`** - Detect missing values.
- **`notnull()`** - Detect non-missing values.
- **`fillna()`** - Fill missing values.
- **`dropna()`** - Drop missing values.
- **`interpolate_na()`** - Interpolate missing values.
- **`ffill()`** - Forward fill.
- **`bfill()`** - Backward fill.

### 7.2 Example

```python
da = xr.DataArray([1, np.nan, 3], dims="time")
filled = da.fillna(0)
```

---

## 8. Reshaping and combining

xarray provides several ways to reshape labeled data and combine objects.

### 8.1 Common methods

- **`transpose()`** - Reorder dimensions.
- **`stack()`** - Stack dimensions into one.
- **`unstack()`** - Reverse stacking.
- **`expand_dims()`** - Add dimensions.
- **`squeeze()`** - Remove length-1 dimensions.
- **`broadcast_like()`** - Broadcast to another object.
- **`combine_first()`** - Combine with missing values filled.
- **`concat()`** - Concatenate objects.
- **`merge()`** - Merge datasets.
- **`assign()`** - Add variables.
- **`assign_coords()`** - Add coordinates.
- **`rename()`** - Rename dims, coords, or variables.
- **`swap_dims()`** - Replace dimensions with coordinates.
- **`drop_vars()`** - Drop variables.
- **`drop_sel()`** - Drop selected labels.

### 8.2 Example

```python
da2 = da.expand_dims("band")
da3 = da.transpose("x", "y")
```

---

## 9. Grouping and time series

xarray supports grouped operations, rolling windows, and resampling.

### 9.1 Common methods

- **`groupby()`** - Group by coordinate.
- **`groupby_bins()`** - Group into bins.
- **`resample()`** - Resample time-indexed data.
- **`rolling()`** - Rolling window.
- **`coarsen()`** - Aggregate by blocks.
- **`expanding()`** - Expanding window.

### 9.2 Example

```python
monthly = ds.resample(time="1M").mean()
rolling_mean = ds.rolling(time=3).mean()
```

---

## 10. Plotting

xarray integrates with Matplotlib for quick visual exploration.

### 10.1 Common methods

- **`plot()`** - General plotting interface.
- **`plot.line()`** - Line plot.
- **`plot.imshow()`** - Image plot.
- **`plot.pcolormesh()`** - Pseudocolor plot.
- **`plot.hist()`** - Histogram.
- **`plot.scatter()`** - Scatter plot.
- **`plot.contour()`** - Contour plot.

### 10.2 Example

```python
da = xr.DataArray(np.random.rand(10, 10), dims=("y", "x"))
da.plot()
```

---

## 11. Datasets and variables

Datasets contain multiple named variables and coordinate systems.

### 11.1 Common methods

- **`Dataset.variables`** - All variables.
- **`Dataset.data_vars`** - Data variables.
- **`Dataset.coords`** - Coordinates.
- **`Dataset.to_array()`** - Convert variables to a DataArray.
- **`Dataset.to_dataframe()`** - Convert to pandas DataFrame.
- **`Dataset.to_netcdf()`** - Write to netCDF.
- **`Dataset.to_zarr()`** - Write to Zarr.
- **`Dataset.assign()`** - Add new variables.
- **`Dataset.drop_vars()`** - Remove variables.

### 11.2 Example

```python
arr = ds.to_array()
df = ds.to_dataframe()
```

---

## 12. Geo-specific rioxarray methods

The `rio` accessor adds raster geospatial functionality to xarray objects.

### 12.1 CRS and spatial metadata

- **`rio.write_crs()`** - Write CRS metadata.
- **`rio.set_crs()`** - Set CRS metadata.
- **`rio.crs`** - Return current CRS.
- **`rio.transform()`** - Return affine transform.
- **`rio.bounds()`** - Return spatial bounds.
- **`rio.resolution()`** - Return pixel resolution.
- **`rio.nodata()`** - Return nodata value.
- **`rio.write_transform()`** - Write transform metadata.
- **`rio.write_nodata()`** - Write nodata metadata.
- **`rio.update_attrs()`** - Update attributes.
- **`rio.update_encoding()`** - Update encoding.

### 12.2 Spatial operations

- **`rio.clip()`** - Clip raster by geometry.
- **`rio.clip_box()`** - Clip by bounding box.
- **`rio.reproject()`** - Reproject raster to another CRS.
- **`rio.reproject_match()`** - Reproject to match another raster.
- **`rio.pad_box()`** - Pad raster to a bounding box.
- **`rio.pad_xy()`** - Pad raster by x/y values.
- **`rio.slice_xy()`** - Slice by spatial coordinates.
- **`rio.interpolate_na()`** - Interpolate nodata values.

### 12.3 Writing raster output

- **`rio.to_raster()`** - Write to a raster file.
- **`rio.write_coordinate_system()`** - Write coordinate system metadata.
- **`rio.write_gcps()`** - Write ground control points when needed.

### 12.4 Example

```python
import rioxarray

raster = rioxarray.open_rasterio("image.tif")
clipped = raster.rio.clip(geometries, crs="EPSG:4326")
reprojected = raster.rio.reproject("EPSG:3857")
raster.rio.to_raster("output.tif")
```

---

## 13. Raster sampling and coordinate queries

xarray and rioxarray support selecting raster values by coordinate or nearest point.

### 13.1 Common methods

- **`sel(method="nearest")`** - Query nearest value by coordinates.
- **`isel()`** - Query by pixel index.
- **`rio.clip()`** - Extract by polygon.
- **`rio.clip_box()`** - Extract by extent.

### 13.2 Example

```python
value = raster.sel(x=500000, y=5700000, method="nearest").values
```

---

## 14. Advanced data operations

These methods are useful for analysis workflows and geospatial preprocessing.

### 14.1 Common methods

- **`differentiate()`** - Numerical derivative.
- **`integrate()`** - Numerical integral.
- **`polyfit()`** - Polynomial fitting along a dimension.
- **`interp()`** - Interpolation.
- **`interp_like()`** - Interpolate like another object.
- **`pad()`** - Pad values.
- **`roll()`** - Circular shift.
- **`shift()`** - Shift values with missing fill.
- **`expand_dims()`** - Add axes for broadcasting or stacking.
- **`astype()`** - Convert data type.

### 14.2 Example

```python
trend = da.polyfit(dim="time", deg=1)
interp_da = da.interp(x=np.linspace(0, 100, 200))
```

---

## 15. Writing and export

xarray and rioxarray support efficient export to scientific and raster file formats.

### 15.1 Common methods

- **`to_netcdf()`** - Save to netCDF.
- **`to_zarr()`** - Save to Zarr.
- **`to_dataframe()`** - Convert to DataFrame.
- **`rio.to_raster()`** - Save to GeoTIFF or other raster format.

### 15.2 Example

```python
ds.to_netcdf("output.nc")
raster.rio.to_raster("output.tif")
```

---

## 16. Useful workflow examples

### 16.1 Open and plot raster

```python
import rioxarray

raster = rioxarray.open_rasterio("image.tif")
raster.plot()
```

### 16.2 Reproject and clip

```python
import rioxarray

raster = rioxarray.open_rasterio("image.tif")
reproj = raster.rio.reproject("EPSG:3857")
clipped = reproj.rio.clip(geometries, crs="EPSG:4326")
```

### 16.3 Time series analysis

```python
import xarray as xr

ds = xr.open_dataset("data.nc", decode_coords="all")
monthly_mean = ds.resample(time="1M").mean()
```

### 16.4 Raster value extraction

```python
value = raster.sel(x=500000, y=5700000, method="nearest").values
```

---

## 17. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Creation | `DataArray()`, `Dataset()` | Build labeled arrays and datasets. |
| Loading | `open_dataset()`, `open_rasterio()` | Read scientific and raster data. |
| Selection | `sel()`, `isel()` | Select by label or position. |
| Math | `mean()`, `sum()`, `clip()` | Compute statistics and transforms. |
| Missing data | `fillna()`, `dropna()` | Handle gaps. |
| Reshaping | `transpose()`, `stack()`, `unstack()` | Reorganize dimensions. |
| Grouping | `groupby()`, `resample()`, `rolling()` | Summarize by groups or time. |
| Geo operations | `rio.clip()`, `rio.reproject()` | Spatial raster processing. |
| Export | `to_netcdf()`, `rio.to_raster()` | Save outputs. |

---

## 18. Example full workflow

```python
import xarray as xr
import rioxarray

ds = xr.open_dataset("data.nc", decode_coords="all")
var = ds[list(ds.data_vars)]

monthly = var.resample(time="1M").mean()
reprojected = var.rio.write_crs("EPSG:4326").rio.reproject("EPSG:3857")
reprojected.rio.to_raster("reprojected.tif")
```