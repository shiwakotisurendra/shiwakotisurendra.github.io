---
hide:
  - toc
---

# Complete Leafmap Methods Reference

## 1. Core concepts

Leafmap is a Python package for interactive mapping and geospatial analysis in Jupyter environments. It supports multiple plotting backends, with `ipyleaflet` as the default backend in standard notebook workflows and `folium` in some environments.

### 1.1 Main ideas

- **Map**: the main interactive map object.
- **Backends**: different rendering engines such as ipyleaflet, folium, plotly, pydeck, kepler.gl, and heremap.
- **Local data support**: vector, raster, and tabular geospatial files.
- **Interactive tools**: drawing, splitting, querying, and editing data.
- **Export tools**: save maps, images, animations, and vector outputs.

### 1.2 Common imports

```python
import leafmap
```

### 1.3 Basic map example

```python
import leafmap

m = leafmap.Map(center=(40, -100), zoom=4)
m
```

---

## 2. Mapping backends

Leafmap supports several backends, and each offers a different balance of interactivity and portability.

### 2.1 Common backend imports

- **`import leafmap`** - Default backend, usually `ipyleaflet`.
- **`import leafmap.leafmap as leafmap`** - Explicit ipyleaflet backend.
- **`import leafmap.foliumap as leafmap`** - Folium backend.
- **`import leafmap.plotlymap as leafmap`** - Plotly backend.
- **`import leafmap.deck as leafmap`** - Pydeck backend.
- **`import leafmap.kepler as leafmap`** - Kepler.gl backend.
- **`import leafmap.heremap as leafmap`** - Here map backend.

### 2.2 Use case

- Use **ipyleaflet** for the richest interactive notebook experience.
- Use **folium** for lightweight HTML map sharing.
- Use **plotly** for combined chart and map analysis.
- Use **kepler.gl** or **pydeck** for advanced large-data visualization.

### 2.3 Example

```python
import leafmap.leafmap as leafmap

m = leafmap.Map(center=(40, -100), zoom=4)
m
```

---

## 3. Map creation

Leafmap map objects allow you to create interactive maps, set the view, and control toolbar and widget behavior.

### 3.1 Common methods

- **`leafmap.Map()`** - Create an interactive map.
- **`Map.set_center()`** - Set center and zoom level.
- **`Map.center_object()`** - Center the map on a geometry or dataset.
- **`Map.add_basemap()`** - Add a basemap.
- **`Map.add_layer_control()`** - Add a layer control widget.
- **`Map.add_legend()`** - Add a categorical legend.
- **`Map.add_colorbar()`** - Add a colorbar.
- **`Map.add_html()`** - Add custom HTML content.
- **`Map.add_widget()`** - Add widgets to the map.
- **`Map.clear_controls()`** - Clear controls from the map.

### 3.2 Use case

- Create a base map for spatial exploration.
- Set the view to an AOI or study region.
- Add legends and controls for communication.

### 3.3 Example

```python
import leafmap

m = leafmap.Map(center=(52.52, 13.405), zoom=10)
m.add_basemap("OpenStreetMap")
m.add_layer_control()
m
```

---

## 4. Basemaps and tiles

Leafmap includes many built-in basemaps and supports custom tile services.

### 4.1 Common methods

- **`Map.add_basemap()`** - Add a named basemap.
- **`Map.add_xyz_service()`** - Add XYZ tile service.
- **`Map.add_wms_layer()`** - Add WMS layers.
- **`Map.add_cog_layer()`** - Add a Cloud Optimized GeoTIFF layer.
- **`Map.add_raster()`** - Add raster data.
- **`Map.add_tile_layer()`** - Add custom tile layers.

### 4.2 Use case

- Add satellite imagery or terrain backgrounds.
- Overlay external map services.
- Display remote sensing rasters.

### 4.3 Example

```python
import leafmap

m = leafmap.Map()
m.add_basemap("Esri.WorldImagery")
m.add_basemap("OpenTopoMap")
m
```

---

## 5. Vector data

Leafmap supports reading, displaying, styling, and exporting vector data in many formats.

### 5.1 Common methods

- **`Map.add_vector()`** - Add a vector layer.
- **`Map.add_gdf()`** - Add a GeoDataFrame.
- **`Map.add_geojson()`** - Add GeoJSON.
- **`Map.add_shp()`** - Add shapefile.
- **`Map.add_kml()`** - Add KML.
- **`Map.add_csv()`** - Add CSV data.
- **`Map.add_points_from_xy()`** - Add points from coordinates.
- **`Map.add_marker_cluster()`** - Add clustered markers.
- **`Map.add_circle_markers()`** - Add circle markers.
- **`Map.add_labels()`** - Add labels to vector data.

### 5.2 Use case

- Display boundaries, survey points, and study sites.
- Convert tabular coordinate data into a map layer.
- Cluster dense point datasets for readability.

### 5.3 Example

```python
import leafmap

m = leafmap.Map()
# m.add_geojson("boundary.geojson", layer_name="Boundary")
m
```

---

## 6. Raster data

Leafmap is useful for visualizing raster datasets such as GeoTIFF, COG, and multiband imagery.

### 6.1 Common methods

- **`Map.add_raster()`** - Add raster layers.
- **`Map.add_cog_layer()`** - Add Cloud Optimized GeoTIFF layers.
- **`Map.add_stac_layer()`** - Add STAC items.
- **`Map.add_tile_layer()`** - Add raster-like tiles.
- **`Map.add_image()`** - Add image overlays.
- **`Map.add_video()`** - Add video overlays.

### 6.2 Use case

- Display elevation, land cover, or remote sensing products.
- Compare rasters visually.
- Share web maps with raster overlays.

### 6.3 Example

```python
import leafmap

m = leafmap.Map()
# m.add_raster("dem.tif", layer_name="DEM")
m
```

---

## 7. Styling layers

Leafmap provides styling tools for vector and raster visualization.

### 7.1 Common methods

- **`Map.add_style()`** - Apply style settings to layers.
- **`Map.add_vector()`** - Add styled vectors.
- **`Map.add_legend()`** - Add legend for classes.
- **`Map.add_colorbar()`** - Add continuous colorbar.
- **`Map.set_plot_options()`** - Adjust plotting behavior in some workflows.
- **`Map.add_outline()`** - Add outlines to geometries.

### 7.2 Use case

- Apply symbology for thematic maps.
- Highlight polygons and labels.
- Create publication-ready visual design.

### 7.3 Example

```python
import leafmap

m = leafmap.Map()
m.add_legend(title="Land Cover", labels=["Forest", "Water"], colors=["green", "blue"])
m
```

---

## 8. Interactive tools

Leafmap includes interactive tools for drawing, measuring, splitting, and inspecting maps.

### 8.1 Common methods

- **`Map.add_draw_control()`** - Add drawing tools.
- **`Map.add_measure_control()`** - Add measurement tools.
- **`Map.add_toolbar()`** - Add a toolbar.
- **`Map.split_map()`** - Compare two basemaps or layers side by side.
- **`Map.add_search_control()`** - Add search functionality.
- **`Map.add_inspector()`** - Inspect map values or layers.
- **`Map.get_drawn_features()`** - Get drawn geometries.
- **`Map.clear_draw_control()`** - Clear drawings.

### 8.2 Use case

- Digitize polygons interactively.
- Measure distances and areas.
- Compare before/after imagery with split maps.

### 8.3 Example

```python
import leafmap

m = leafmap.Map()
m.add_draw_control()
m.add_measure_control()
m
```

---

## 9. Earth Engine support

Leafmap can also connect to Google Earth Engine for cloud-based geospatial data visualization and analysis.

### 9.1 Common methods

- **`Map.add_ee_layer()`** - Add Earth Engine layer.
- **`Map.center_object()`** - Center on an Earth Engine object.
- **`Map.ee_search()`** - Search EE assets or datasets.
- **`Map.add_time_slider()`** - Add time slider for imagery.
- **`Map.ts_inspector()`** - Time series inspection.
- **`Map.extract_values_to_points()`** - Sample values at points.
- **`Map.zonal_statistics()`** - Compute zonal statistics.

### 9.2 Use case

- Display Earth Engine imagery.
- Run time-based visual analysis.
- Summarize imagery by polygon zones.

### 9.3 Example

```python
import leafmap
import ee

ee.Initialize()

m = leafmap.Map(center=(40, -100), zoom=4)
image = ee.Image("USGS/SRTMGL1_003")
m.add_ee_layer(image, {"min": 0, "max": 4000}, "DEM")
m
```

---

## 10. Data conversion utilities

Leafmap includes helper functions for converting between local geospatial formats and Earth Engine-compatible objects.

### 10.1 Common methods

- **`geojson_to_ee()`** - Convert GeoJSON to Earth Engine.
- **`shp_to_ee()`** - Convert shapefile to Earth Engine.
- **`kml_to_ee()`** - Convert KML to Earth Engine.
- **`csv_to_ee()`** - Convert CSV to Earth Engine.
- **`gdf_to_ee()`** - Convert GeoDataFrame to Earth Engine.
- **`vector_to_geojson()`** - Convert vector to GeoJSON.
- **`points_from_xy()`** - Create points from x/y coordinates.

### 10.2 Use case

- Move local data into cloud workflows.
- Prepare survey data for mapping.
- Convert tabular spatial data to features.

### 10.3 Example

```python
import leafmap

# ee_object = leafmap.gdf_to_ee(gdf)
```

---

## 11. Export tools

Leafmap supports saving maps and exporting spatial outputs for sharing and reporting.

### 11.1 Common methods

- **`Map.to_html()`** - Export map to HTML.
- **`Map.save()`** - Save map output.
- **`Map.screenshot()`** - Capture a screenshot.
- **`Map.to_image()`** - Export a static image when supported.
- **`Map.export_vector()`** - Export vector data.
- **`Map.export_image()`** - Export raster or EE image outputs.
- **`Map.export_video()`** - Export animations.
- **`Map.add_gif()`** - Add GIF animations.

### 11.2 Use case

- Publish an interactive web map.
- Save a report figure.
- Export animations for presentations.

### 11.3 Example

```python
import leafmap

m = leafmap.Map()
m.to_html("leafmap.html")
```

---

## 12. Charts and plots

Leafmap can integrate plotting workflows with interactive spatial analysis.

### 12.1 Common methods

- **`Map.plot()`** - Plot data on the map or linked visualization.
- **`Map.chart()`** - Create charts in supported workflows.
- **`Map.histogram()`** - Show histograms.
- **`Map.add_plot()`** - Add a plot widget.
- **`Map.add_colorbar()`** - Add continuous scale.

### 12.2 Use case

- Explore data distributions.
- Build map-linked charts.
- Visualize attribute changes across regions.

### 12.3 Example

```python
import leafmap

m = leafmap.Map()
# m.histogram(data)
m
```

---

## 13. Common workflows

### 13.1 Create a basic map

```python
import leafmap

m = leafmap.Map(center=(40, -100), zoom=4)
m.add_basemap("OpenStreetMap")
m.add_layer_control()
m
```

### 13.2 Add vector and raster layers

```python
import leafmap

m = leafmap.Map()
# m.add_vector("boundary.geojson")
# m.add_raster("elevation.tif")
m
```

### 13.3 Split map comparison

```python
import leafmap

m = leafmap.Map()
m.split_map(left_layer="OpenStreetMap", right_layer="Esri.WorldImagery")
m
```

### 13.4 Export map

```python
m.to_html("output.html")
```

---

## 14. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Map creation | `Map()`, `set_center()`, `center_object()` | Create and control maps. |
| Basemaps | `add_basemap()`, `add_xyz_service()`, `add_wms_layer()` | Add background layers. |
| Vector data | `add_vector()`, `add_geojson()`, `add_gdf()` | Visualize vector data. |
| Raster data | `add_raster()`, `add_cog_layer()` | Visualize rasters. |
| Interactive tools | `add_draw_control()`, `add_measure_control()`, `split_map()` | Explore and compare. |
| Earth Engine | `add_ee_layer()`, `zonal_statistics()` | Use EE datasets and analysis. |
| Export | `to_html()`, `export_image()`, `export_vector()` | Save results. |
| Styling | `add_legend()`, `add_colorbar()` | Improve map readability. |

---

## 15. Example full workflow

```python
import leafmap
import ee

ee.Initialize()

m = leafmap.Map(center=(40, -100), zoom=4)
image = ee.Image("USGS/SRTMGL1_003")
m.add_ee_layer(image, {"min": 0, "max": 4000, "palette": ["blue", "cyan", "green", "yellow", "red"]}, "Elevation")
m.add_basemap("Esri.WorldImagery")
m.add_legend(title="Elevation", labels=["Low", "High"], colors=["blue", "red"])
m.add_layer_control()
m.to_html("leafmap_dem.html")
```