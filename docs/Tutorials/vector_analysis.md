---
hide:
  - toc
---

# Complete GeoPandas Methods for Geoprocessing

## 1. Data Structures

### GeoDataFrame
- **`geopandas.GeoDataFrame`** - Main data structure for spatial data with geometry column
- **`GeoDataFrame.geometry`** - Access the active geometry column
- **`GeoDataFrame.crs`** - Access or set the Coordinate Reference System
- **`GeoDataFrame.set_geometry()`** - Set a different column as the active geometry
- **`GeoDataFrame.rename_geometry()`** - Rename the active geometry column

### GeoSeries
- **`geopandas.GeoSeries`** - Series with geometry values
- **`GeoSeries.crs`** - Access or set the CRS for the series
- **`GeoSeries.set_crs()`** - Set CRS without transforming geometries
- **`GeoSeries.to_crs()`** - Transform geometries to a new CRS

---

## 2. Reading and Writing Files

### Input Methods
- **`geopandas.read_file()`** - Read vector data from file (shapefile, GeoJSON, GeoPackage, etc.)
- **`geopandas.GeoDataFrame.from_file()`** - Alternative syntax for read_file

### Output Methods
- **`GeoDataFrame.to_file()`** - Write to file (supports shapefile, GeoJSON, GPKG, PostGIS)
- **`GeoDataFrame.to_postgis()`** - Write to PostGIS database (requires SQLAlchemy)
- **`GeoSeries.to_wkb()`** - Export to Well-Known Binary
- **`GeoSeries.to_wkt()`** - Export to Well-Known Text
- **`GeoSeries.to_geojson()`** - Export to GeoJSON string

### File Parameters
```python
read_file(path, driver=None, layer=None, crs=None, ignore_fields=None, 
          ignore_geometry=False, bbox=None, mask=None, rows=None)
to_file(path, driver=None, index=True, mode='w', encoding=None)
```

---

## 3. Indexing and Selecting Data

- **`GeoDataFrame.loc[]`** - Label-based indexing
- **`GeoDataFrame.iloc[]`** - Position-based indexing
- **`GeoDataFrame.query()`** - Query with boolean expressions
- **`GeoDataFrame.filter()`** - Filter rows/columns
- **`GeoSeries.contains()`** - Test geometric containment
- **`GeoSeries.intersects()`** - Test geometric intersection
- **`GeoSeries.disjoint()`** - Test geometric disjointness
- **`GeoSeries.crosses()`** - Test geometric crossing
- **`GeoSeries.overlaps()`** - Test geometric overlap
- **`GeoSeries.touches()`** - Test geometric touching
- **`GeoSeries.within()`** - Test if within another geometry
- **`GeoSeries.covers()`** - Test if covers another geometry
- **`GeoSeries.covered_by()`** - Test if covered by another geometry
- **`GeoDataFrame.sindex`** - Access spatial index for spatial queries
- **`GeoSeries.nearest()`** - Find nearest geometries

---

## 4. Geometric Manipulations (Constructive Methods)

### Buffer and Boundary
- **`GeoSeries.buffer(distance, resolution=16, cap_style='round', join_style='round')`** - Create buffer around geometries
- **`GeoSeries.boundary`** - Get boundary of geometries
- **`GeoSeries.exterior`** - Get exterior ring of polygons

### Centroid and Hull
- **`GeoSeries.centroid`** - Calculate geometric centroid
- **`GeoSeries.convex_hull`** - Calculate convex hull
- **`GeoSeries.concave_hull(ratio=0.0, tolerance=0.0)`** - Calculate concave hull
- **`GeoSeries.envelope`** - Get minimum bounding rectangle

### Simplification and Triangulation
- **`GeoSeries.simplify(tolerance, preserve_topology=True)`** - Simplify geometries
- **`GeoSeries.segmentize(max_segment_length)`** - Add vertices to segments
- **`GeoSeries.remove_repeated_points()`** - Remove duplicate points
- **`GeoSeries.delaunay_triangles(tolerance, preserve_topology=True)`** - Create Delaunay triangulation
- **`GeoSeries.constrained_delaunay_triangles()`** - Create constrained Delaunay triangulation
- **`GeoSeries.extract_unique_points()`** - Extract unique vertices

### Advanced Operations
- **`GeoSeries.union_all()`** - Union all geometries in series
- **`GeoSeries.offset_curve(distance, quad_segs=8, join_style='round', mitre_limit=5.0)`** - Create offset curve
- **`GeoSeries.minimum_rotated_rectangle`** - Get minimum rotated rectangle

---

## 5. Affine Transformations

- **`GeoSeries.affine_transform(matrix)`** - Transform using affine matrix
- **`GeoSeries.rotate(angle, origin='center', use_radians=False)`** - Rotate geometries
- **`GeoSeries.scale(xfact=1.0, yfact=1.0, zfact=1.0, origin='center')`** - Scale geometries
- **`GeoSeries.skew(angle, origin='center', use_radians=False)`** - Skew/shear geometries
- **`GeoSeries.translate(xoff=0.0, yoff=0.0, zoff=0.0)`** - Translate geometries

---

## 6. Projections and CRS Operations

### Setting CRS
- **`GeoDataFrame.set_crs(crs, allow_override=False)`** - Set CRS without transformation
- **`GeoSeries.set_crs(crs, allow_override=False)`** - Set CRS for series

### Reprojecting
- **`GeoDataFrame.to_crs(crs=None, epsg=None, inplace=False)`** - Reproject to new CRS
- **`GeoSeries.to_crs(crs=None, epsg=None, inplace=False)`** - Reproject series

### CRS Information
- **`GeoDataFrame.crs`** - Get current CRS
- **`GeoSeries.crs`** - Get series CRS
- **`GeoDataFrame.estimate_utm_crs()`** - Estimate UTM CRS for data

---

## 7. Set Operations with Overlay

### GeoDataFrame.overlay()
```python
GeoDataFrame.overlay(other, how='intersection', keep_geom_type=True, 
                     make_valid=True, sort=True)
```

**Overlay Methods:**
- **`how='intersection'`** - Return geometries in both datasets
- **`how='union'`** - Return all geometries from both datasets
- **`how='difference'`** - Return geometries in left but not right
- **`how='symmetric_difference'`** - Return geometries in either but not both
- **`how='identity'`** - Return left geometries with right overlay

### Set Operation Methods (GeoSeries)
- **`GeoSeries.intersection(other)`** - Set intersection
- **`GeoSeries.union(other)`** - Set union
- **`GeoSeries.difference(other)`** - Set difference
- **`GeoSeries.symmetric_difference(other)`** - Symmetric difference

### Operators
- **`geometry & other`** - Intersection (shorthand)
- **`geometry | other`** - Union (shorthand)
- **`geometry - other`** - Difference (shorthand)

---

## 8. Aggregation with Dissolve

- **`GeoDataFrame.dissolve(by=None, aggfunc='first', dropna=True, 
                          suffixes=('old', 'new'), force_multi=False)`**

**Parameters:**
- `by` - Column name for grouping
- `aggfunc` - Aggregation function ('first', 'sum', 'mean', 'min', 'max', 'median', 'count')
- `dropna` - Drop NaN values in groupby
- `aggfunc` can be dict or list: `{'population': 'sum', 'name': 'count'}`

---

## 9. Merging Data

- **`GeoDataFrame.merge()`** - Standard pandas merge (preserves geometry)
- **`GeoDataFrame.join()`** - Standard pandas join (preserves geometry)
- **`GeoDataFrame.concat()`** - Concatenate multiple GeoDataFrames
- **`geopandas.array.concatenate(arrays)`** - Concatenate geometry arrays

---

## 10. Spatial Joins

- **`geopandas.sjoin(left, right, how='left', predicate='intersects', 
                     use_arrow=False)`** - Spatial join between GeoDataFrames

**Predicate Options:**
- `'intersects'` - Geometries intersect
- `'contains'` - Left contains right
- `'within'` - Left within right
- `'covers'` - Left covers right
- `'covered_by'` - Left covered by right
- `'overlaps'` - Geometries overlap
- `'crosses'` - Geometries cross
- `'touches'` - Geometries touch
- `'nearest'` - Nearest geometry

---

## 11. Spatial Index Operations

- **`GeoSeries.sindex`** - Access spatial index (STRtree)
- **`sindex.query(geometry, predicate='intersects')`** - Query spatial index
- **`sindex.query_nearest(geometry, max_distance=None, k=1)`** - Find nearest
- **`sindex.contains(geometry)`** - Test containment via index
- **`sindex.intersects(geometry)`** - Test intersection via index

---

## 12. Measurement Properties

### Length and Area
- **`GeoSeries.length`** - Get length of geometries
- **`GeoSeries.area`** - Get area of geometries
- **`GeoSeries.distance(other)`** - Distance to another geometry
- **`GeoSeries.perimeter`** - Get perimeter of polygons

### Geometry Properties
- **`GeoSeries.is_empty`** - Test if geometries are empty
- **`GeoSeries.is_valid`** - Test if geometries are valid
- **`GeoSeries.is_simple`** - Test if geometries are simple
- **`GeoSeries.has_z`** - Test for 3D geometries
- **`GeoSeries.is_ccw`** - Test if ring is counter-clockwise
- **`GeoSeries.geom_type`** - Get geometry type string
- **`GeoSeries.type`** - Get geometry type

### Bounds and Coordinates
- **`GeoSeries.bounds`** - Get bounding box (minx, miny, maxx, maxy)
- **`GeoSeries.total_bounds`** - Get total bounds for entire series
- **`GeoSeries.x`** - Get x coordinates (for points)
- **`GeoSeries.y`** - Get y coordinates (for points)
- **`GeoSeries.z`** - Get z coordinates (for 3D points)
- **`GeoSeries.radians`** - Convert to radians
- **`GeoSeries.degrees`** - Convert to degrees

---

## 13. Geometry Validation and Repair

- **`GeoSeries.make_valid()`** - Make invalid geometries valid
- **`GeoSeries.normalize()`** - Normalize geometry representation
- **`geopandas.check_geometry(gdf)`** - Check geometry validity

---

## 14. Sampling and Point Generation

- **`geopandas.points_from_xy(x, y, z=None, crs=None)`** - Create points from coordinates
- **`GeoSeries.sample_points(n, method='random')`** - Sample points within geometries
- **`geopandas.GeoSeries.from_shapely()`** - Create from Shapely objects

---

## 15. Geocoding

- **`geopandas.geocode(query, provider=None, **kwargs)`** - Geocode addresses to points
- **`geopandas.reverse_geocode(points, provider=None, **kwargs)`** - Reverse geocode

---

## 16. Mapping and Plotting

- **`GeoSeries.plot()`** - Plot geometries (uses matplotlib)
- **`GeoDataFrame.plot()`** - Plot GeoDataFrame
- **`plot(column=None, cmap=None, color=None, axis=True, 
        figsize=None, style=None, **kwargs)`** - Plot with styling options

**Plot Parameters:**
- `column` - Column for choropleth coloring
- `cmap` - Color map name
- `scheme` - Classification scheme ('equal_interval', 'quantiles', 'percentiles')
- `markersize` - Point marker size
- `edgecolor` - Edge color
- `linewidth` - Line width

---

## 17. Testing Utilities

- **`geopandas.testing.assert_geoseries_equal()`** - Test GeoSeries equality
- **`geopandas.testing.assert_geodataframe_equal()`** - Test GeoDataFrame equality
- **`geopandas.testing.assert_crs_equal()`** - Test CRS equality

---

## 18. Changelog and Version

- **`geopandas.__version__`** - Get GeoPandas version
- **`geopandas.show_versions()`** - Show all dependency versions

---

## 19. Common Geoprocessing Workflow Examples

### Example 1: Buffer and Overlay
```python
import geopandas as gpd

# Read data
areas = gpd.read_file('areas.shp')
points = gpd.read_file('points.shp')

# Create 1km buffer around points
buffered = points.buffer(1000)

# Overlay to find areas within buffer
result = areas.overlay(gpd.GeoDataFrame(geometry=buffered), 
                       how='intersection')
```

### Example 2: Dissolve and Aggregate
```python
# Dissolve districts to zones with population sum
zones = districts.dissolve(by='zone_name', 
                          aggfunc={'population': 'sum'})
```

### Example 3: Spatial Join
```python
# Join points to nearest polygon
joined = gpd.sjoin(points, polygons, how='left', 
                   predicate='within')
```

### Example 4: Reproject
```python
# Convert to UTM for accurate distance calculations
utm = gdf.to_crs(epsg=32633)  # UTM Zone 33N
```

---

## 20. Key Parameters Reference

### Common Parameters
| Parameter | Description | Typical Values |
|-----------|-------------|----------------|
| `crs` | Coordinate Reference System | `'EPSG:4326'`, `32633` |
| `distance` | Distance for buffer/measurement | meters, degrees |
| `predicate` | Spatial relationship test | `'intersects'`, `'contains'` |
| `how` | Overlay operation type | `'intersection'`, `'union'` |
| `aggfunc` | Aggregation function | `'sum'`, `'mean'`, `'first'` |
| `tolerance` | Simplification tolerance | map units |
| `preserve_topology` | Maintain topology | `True`, `False` |

---

## 21. Related Documentation

- [GeoPandas User Guide](https://geopandas.org/en/stable/docs/user_guide.html)
- [GeoPandas API Reference](https://geopandas.org/en/stable/docs/reference.html)
- [Shapely Documentation](https://shapely.readthedocs.io/)
- [PyGEOS Documentation](https://pygeos.readthedocs.io/)

---

*This document covers GeoPandas 1.1.3+ functionality for geoprocessing tasks.*