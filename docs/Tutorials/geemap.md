---
hide:
  - toc
  - navigation
---

# Complete geemap Methods Reference

## 1. Core concepts

geemap is a Python package for interactive geospatial analysis and visualization, built mainly around Google Earth Engine and interactive mapping backends such as ipyleaflet and folium. It is especially useful for creating web maps, exploring Earth Engine datasets, and working with local or cloud geospatial data in notebooks.

### 1.1 Main ideas

- **Map**: the interactive map object used to display data.
- **Earth Engine integration**: access and visualize EE images, image collections, and feature collections.
- **Backends**: geemap supports multiple interactive mapping backends.
- **Local data support**: use GeoJSON, shapefiles, GeoTIFF, and other geospatial files.
- **Export tools**: save maps, images, vector data, and animations.

### 1.2 Common imports

```python
import geemap
import ee
```

### 1.3 Basic map example

```python
import geemap

m = geemap.Map(center=[40, -100], zoom=4)
m
```

---

## 2. Mapping backends

geemap provides several mapping backends, and the default import uses the ipyleaflet backend. Other backends are available when you need folium, plotly, pydeck, kepler.gl, or heremap.

### 2.1 Common backend imports

- **`import geemap`** - Default ipyleaflet backend.
- **`import geemap.foliumap as geemap`** - Folium backend.
- **`import geemap.geemap as geemap`** - ipyleaflet backend explicitly.
- **`import geemap.plotlymap as geemap`** - Plotly backend.
- **`import geemap.deck as geemap`** - Pydeck backend.
- **`import geemap.kepler as geemap`** - Kepler.gl backend.
- **`import geemap.heremap as geemap`** - Here maps backend.

### 2.2 Use case

- Use **ipyleaflet** for the richest notebook interactivity.
- Use **folium** for simple HTML web maps.
- Use **plotly** for interactive chart-map workflows.

### 2.3 Example

```python
import geemap
m = geemap.Map()
m
```

---

## 3. Map creation

geemap map objects are used to display data, control the view, and add interactive tools.

### 3.1 Common methods

- **`geemap.Map()`** - Create an interactive map.
- **`Map.add_basemap()`** - Add a basemap layer.
- **`Map.set_center()`** - Set map center and zoom.
- **`Map.centerObject()`** - Center the map on an object.
- **`Map.zoom_to_bounds()`** - Zoom to bounds.
- **`Map.add_minimap()`** - Add an overview minimap.
- **`Map.add_layer_control()`** - Add layer control.
- **`Map.add_legend()`** - Add a legend.
- **`Map.add_colorbar()`** - Add a colorbar.
- **`Map.add_html()`** - Add arbitrary HTML to the map.

### 3.2 Example

```python
import geemap

m = geemap.Map(center=[52.52, 13.405], zoom=10)
m.add_basemap("OpenTopoMap")
m.add_layer_control()
m
```

---

## 4. Earth Engine data layers

geemap makes it easy to display Earth Engine images, image collections, and feature collections on interactive maps.

### 4.1 Common methods

- **`Map.addLayer()`** - Add an Earth Engine layer to the map.
- **`Map.add_ee_layer()`** - Add Earth Engine data in some workflows.
- **`Map.centerObject()`** - Center on an EE object.
- **`Map.setCenter()`** - Set map center manually.
- **`Map.setOptions()`** - Set basemap or map options.

### 4.2 Use case

- Visualize DEM, land cover, satellite imagery, boundaries, and derived products from Earth Engine.
- Compare multiple datasets with different visualization parameters.

### 4.3 Example

```python
import geemap
import ee

ee.Initialize()

m = geemap.Map(center=[40, -100], zoom=4)
dem = ee.Image("USGS/SRTMGL1_003")
vis = {"min": 0, "max": 4000, "palette": ["006633", "E5FFCC", "662A00", "D8D8D8", "F5F5F5"]}
m.addLayer(dem, vis, "SRTM DEM")
m
```

---

## 5. Local geospatial data

geemap can read and display local geospatial data such as shapefiles, GeoJSON, KML, and GeoTIFF.

### 5.1 Common methods

- **`geojson_to_ee()`** - Convert GeoJSON to Earth Engine.
- **`shp_to_ee()`** - Convert shapefile to Earth Engine.
- **`kml_to_ee()`** - Convert KML to Earth Engine.
- **`csv_to_ee()`** - Convert CSV to Earth Engine.
- **`xyz_to_ee()`** - Convert XYZ text data to Earth Engine.
- **`gdf_to_ee()`** - Convert GeoDataFrame to Earth Engine.
- **`vector_to_geojson()`** - Convert vector data to GeoJSON.
- **`raster_to_ee()`** - Convert local raster to Earth Engine when supported.

### 5.2 Use case

- Load local vector data into Earth Engine workflows.
- Visualize project boundaries, sampling points, and field data.
- Combine local data with Earth Engine imagery.

### 5.3 Example

```python
import geemap

m = geemap.Map()
# ee_object = geemap.shp_to_ee("boundary.shp")
# m.addLayer(ee_object, {}, "Boundary")
m
```

---

## 6. Layer styling

geemap provides easy styling for layers, especially when adding vector data or Earth Engine feature collections.

### 6.1 Common methods

- **`Map.add_styled_vector()`** - Add styled vector data.
- **`Map.add_labels()`** - Add labels to vector features.
- **`Map.add_outline()`** - Add outlines to geometries.
- **`Map.add_circle_markers()`** - Add circle markers from point data.
- **`Map.add_points_from_xy()`** - Add points from x/y coordinates.
- **`Map.add_marker_cluster()`** - Cluster markers.

### 6.2 Use case

- Show sample points.
- Visualize polygons with labels.
- Cluster dense point datasets.

### 6.3 Example

```python
import geemap

m = geemap.Map(center=[40, -100], zoom=4)
# m.add_points_from_xy(df, x="lon", y="lat", color="blue")
m
```

---

## 7. Drawing tools and interaction

The interactive drawing tools are useful for collecting user-drawn polygons, rectangles, points, and lines inside notebooks.

### 7.1 Common methods

- **`Map.add_draw_control()`** - Add drawing tools.
- **`Map.draw_control`** - Access the draw control.
- **`Map.get_drawn_features()`** - Retrieve drawn geometries.
- **`Map.clear_draw_control()`** - Clear drawings.
- **`Map.add_click_callbacks()`** - React to clicks in some backends.

### 7.2 Use case

- Digitize AOIs.
- Collect user-defined polygons for clipping and analysis.
- Create interactive sampling workflows.

### 7.3 Example

```python
import geemap

m = geemap.Map()
m.add_draw_control()
m
```

---

## 8. Analysis tools

geemap includes functions for Earth Engine-based spatial analysis and exploratory workflows.

### 8.1 Common methods

- **`Map.ee_search()`** - Search Earth Engine documentation or assets.
- **`Map.ts_inspector()`** - Inspect time series interactively.
- **`Map.extract_values_to_points()`** - Sample raster values at points.
- **`Map.zonal_statistics()`** - Compute zonal statistics.
- **`Map.zonal_statistics_by_group()`** - Group-based zonal statistics.
- **`Map.sample()`** - Sample pixels or features in workflows.
- **`Map.add_time_slider()`** - Add a time slider for layers.

### 8.2 Use case

- Analyze temporal change.
- Sample raster values for training data.
- Summarize imagery by polygon boundaries.

### 8.3 Example

```python
import geemap

m = geemap.Map()
# m.ts_inspector()
m
```

---

## 9. Export tools

geemap supports exporting maps, images, vectors, and animations.

### 9.1 Common methods

- **`Map.to_html()`** - Export map as HTML.
- **`Map.save()`** - Save map output.
- **`Map.to_image()`** - Export map image when supported.
- **`Map.screenshot()`** - Capture screenshot.
- **`Map.add_gif()`** - Add GIF overlays.
- **`Map.add_image()`** - Add image overlays.
- **`Map.add_video()`** - Add video overlays.
- **`Map.export_vector()`** - Export vector layers.
- **`Map.export_image()`** - Export EE images or raster outputs.
- **`Map.export_video()`** - Export video/timelapse products.

### 9.2 Use case

- Share notebooks as HTML maps.
- Export plots for reports.
- Generate timelapse animations for presentations.

### 9.3 Example

```python
import geemap

m = geemap.Map()
m.to_html("map.html")
```

---

## 10. Basemaps and tiles

geemap makes it easy to add basemaps and custom tile services.

### 10.1 Common methods

- **`Map.add_basemap()`** - Add a named basemap.
- **`Map.add_tile_layer()`** - Add a custom tile layer.
- **`Map.add_wms_layer()`** - Add a WMS layer.
- **`Map.add_cog_layer()`** - Add a Cloud Optimized GeoTIFF layer.
- **`Map.add_raster()`** - Add a raster layer.

### 10.2 Use case

- Add satellite imagery or terrain background.
- Overlay WMS products from external services.
- View local rasters without converting them manually.

### 10.3 Example

```python
import geemap

m = geemap.Map()
m.add_basemap("Esri.WorldImagery")
m.add_basemap("OpenTopoMap")
m
```

---

## 11. Legends and colorbars

Legends and colorbars help explain thematic layers and continuous values.

### 11.1 Common methods

- **`Map.add_legend()`** - Add categorical legend.
- **`Map.add_colorbar()`** - Add continuous colorbar.
- **`Map.add_html()`** - Add custom legend HTML.

### 11.2 Use case

- Display land cover classes.
- Explain elevation, temperature, or NDVI values.
- Add publication-style map annotations.

### 11.3 Example

```python
import geemap

m = geemap.Map()
m.add_legend(title="Land Cover", labels=["Forest", "Water"], colors=["green", "blue"])
m
```

---

## 12. Charts and profiling

geemap can create charts from Earth Engine data and support interactive analysis in notebooks.

### 12.1 Common methods

- **`Map.chart()`** - Create charts in some workflows.
- **`Map.add_chart()`** - Add chart widgets if supported.
- **`Map.plot()`** - Plot data in linked workflows.
- **`Map.histogram()`** - Show histogram of data values.

### 12.2 Use case

- Create time series charts from EE imagery.
- Explore data distributions.
- Link map clicks to plots.

### 12.3 Example

```python
import geemap

m = geemap.Map()
# m.chart()
m
```

---

## 13. Convenience utilities

geemap also includes helper utilities for working with files, URLs, and Earth Engine assets.

### 13.1 Common functions

- **`geemap.ee_initialize()`** - Initialize Earth Engine.
- **`geemap.ee_to_geojson()`** - Convert Earth Engine data to GeoJSON.
- **`geemap.ee_to_gdf()`** - Convert Earth Engine data to GeoDataFrame.
- **`geemap.ee_export_image()`** - Export Earth Engine image.
- **`geemap.ee_export_image_collection()`** - Export image collection.
- **`geemap.ee_export_vector()`** - Export vector data.
- **`geemap.download_gee_asset()`** - Download asset when available.
- **`geemap.download_file()`** - Download a file.
- **`geemap.search_ee_data()`** - Search Earth Engine data catalog.

### 13.2 Use case

- Move data between Earth Engine and local Python workflows.
- Export analysis results to common GIS formats.
- Automate map and dataset generation.

### 13.3 Example

```python
import geemap

ee_data = geemap.search_ee_data("SRTM")
print(ee_data)
```

---

## 14. Common workflows

### 14.1 Create an interactive map

```python
import geemap

m = geemap.Map(center=[40, -100], zoom=4)
m.add_basemap("OpenStreetMap")
m.add_layer_control()
m
```

### 14.2 Add Earth Engine data

```python
import geemap
import ee

ee.Initialize()
m = geemap.Map(center=[40, -100], zoom=4)
image = ee.Image("USGS/SRTMGL1_003")
m.addLayer(image, {"min": 0, "max": 4000}, "DEM")
m
```

### 14.3 Load local data

```python
import geemap

m = geemap.Map()
# m.add_geojson("boundary.geojson")
# m.add_shp("boundary.shp")
m
```

### 14.4 Export map to HTML

```python
m.to_html("geemap_output.html")
```

---

## 15. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Map creation | `Map()`, `set_center()`, `centerObject()` | Create and control interactive maps. |
| Basemaps | `add_basemap()`, `add_tile_layer()` | Add background layers. |
| Earth Engine | `addLayer()`, `ee_search()` | Visualize EE datasets and metadata. |
| Local data | `shp_to_ee()`, `geojson_to_ee()`, `gdf_to_ee()` | Convert local data for EE workflows. |
| Drawing | `add_draw_control()`, `get_drawn_features()` | Collect user-drawn geometries. |
| Analysis | `zonal_statistics()`, `extract_values_to_points()` | Run spatial analysis workflows. |
| Export | `to_html()`, `export_image()`, `export_vector()` | Save maps and outputs. |
| Legends | `add_legend()`, `add_colorbar()` | Explain visual encodings. |

---

## 16. Example full workflow

```python
import geemap
import ee

ee.Initialize()

m = geemap.Map(center=[40, -100], zoom=4)
image = ee.Image("USGS/SRTMGL1_003")
vis = {"min": 0, "max": 4000, "palette": ["blue", "cyan", "green", "yellow", "red"]}

m.addLayer(image, vis, "SRTM DEM")
m.add_basemap("Esri.WorldImagery")
m.add_legend(title="Elevation", labels=["Low", "High"], colors=["blue", "red"])
m.add_layer_control()
m.to_html("dem_map.html")
```