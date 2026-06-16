---
hide:
  - toc
  - navigation
---

# Complete Folium Methods Reference

## 1. Core concepts

Folium builds interactive web maps in Python using the Leaflet.js mapping library. The main idea is to create a `Map` object and then add layers, markers, GeoJSON, and other features to it.

### 1.1 Main ideas

- **Map**: the main container for the interactive map.
- **Layer**: a base layer or overlay that can be turned on and off.
- **Feature**: map content such as markers, polygons, lines, popups, and GeoJSON.
- **Tile layer**: the basemap imagery or street map tiles.
- **Control**: interactive UI components like layer toggles and zoom controls.

### 1.2 Common imports

```python
import folium
```

### 1.3 Basic map example

```python
import folium

m = folium.Map(location=[52.52, 13.405], zoom_start=10)
m
```

---

## 2. Map creation

The `folium.Map` class is the starting point for nearly all Folium visualizations. It lets you define map size, tiles, zoom level, CRS, and display settings.

### 2.1 Map methods and options

- **`folium.Map()`** - Create a base interactive map.
- **`Map.fit_bounds()`** - Zoom and pan to a bounding box.
- **`Map.keep_in_front()`** - Keep selected layers above others.
- **`Map.show_in_browser()`** - Open the map in the browser.
- **`Map.add_child()`** - Add a child element to the map.
- **`Map.save()`** - Save the map as HTML.

### 2.2 Common parameters

- `location` - Initial map center as `[lat, lon]`.
- `zoom_start` - Initial zoom level.
- `tiles` - Basemap tiles such as OpenStreetMap or custom XYZ tiles.
- `width`, `height` - Map dimensions.
- `crs` - Coordinate reference system used by the map.
- `control_scale` - Add scale control to the map.

### 2.3 Example

```python
m = folium.Map(
    location=[51.5074, -0.1278],
    zoom_start=11,
    tiles="OpenStreetMap",
    control_scale=True
)
```

---

## 3. Tile layers

Tile layers define the basemap or background imagery used by Folium maps. You can use built-in providers, custom tile URLs, WMS services, or raster overlays.

### 3.1 Tile methods

- **`folium.TileLayer()`** - Add a tile layer to a map.
- **`folium.raster_layers.TileLayer()`** - Raster tile layer class.
- **`folium.raster_layers.WmsTileLayer()`** - Add a WMS layer.
- **`folium.raster_layers.ImageOverlay()`** - Place a single image on the map.
- **`folium.raster_layers.VideoOverlay()`** - Place a video over map bounds.

### 3.2 Tile layer parameters

- `tiles` - Provider name or custom URL.
- `attr` - Attribution for custom tiles.
- `name` - Layer name shown in controls.
- `overlay` - Whether the layer is a base layer or overlay.
- `control` - Whether to include it in layer controls.
- `show` - Whether it is visible by default.
- `opacity` - Transparency of the layer.

### 3.3 Example

```python
m = folium.Map(location=[52.52, 13.405], zoom_start=10, tiles=None)
folium.TileLayer("CartoDB Positron", name="Light").add_to(m)
folium.TileLayer("OpenStreetMap", name="Street").add_to(m)
folium.LayerControl().add_to(m)
```

---

## 4. Markers and icons

Markers are used to place points of interest on the map. Folium supports simple markers, draggable markers, custom icons, popups, and tooltips.

### 4.1 Marker methods

- **`folium.Marker()`** - Add a standard marker.
- **`folium.map.Marker()`** - Marker class reference.
- **`Marker.add_to()`** - Add the marker to a map or layer.
- **`Marker.set_icon()`** - Change the marker icon.
- **`Marker.add_child()`** - Add child elements to the marker.

### 4.2 Icon methods

- **`folium.Icon()`** - Create a colored icon.
- **`folium.map.Icon()`** - Icon class reference.

### 4.3 Popup and tooltip methods

- **`folium.Popup()`** - Create popup content.
- **`folium.Tooltip()`** - Create hover text.

### 4.4 Example

```python
m = folium.Map(location=[52.52, 13.405], zoom_start=12)

folium.Marker(
    location=[52.52, 13.405],
    popup="Berlin",
    tooltip="Click for details",
    icon=folium.Icon(color="red", icon="info-sign")
).add_to(m)
```

---

## 5. Vector layers

Vector layers are used for lines, polygons, circles, and rectangles. They are useful for boundaries, routes, buffers, and spatial highlights.

### 5.1 Vector methods

- **`folium.PolyLine()`** - Draw a line.
- **`folium.Polygon()`** - Draw a polygon.
- **`folium.Circle()`** - Draw a circle with radius in meters.
- **`folium.CircleMarker()`** - Draw a circle with radius in pixels.
- **`folium.Rectangle()`** - Draw a rectangular extent.

### 5.2 Styling options

- `color` - Stroke color.
- `weight` - Stroke width.
- `opacity` - Stroke opacity.
- `fill` - Whether to fill the shape.
- `fill_color` - Fill color.
- `fill_opacity` - Fill transparency.
- `dash_array` - Dashed line style.

### 5.3 Example

```python
m = folium.Map(location=[52.52, 13.405], zoom_start=11)

folium.PolyLine(
    locations=[[52.50, 13.30], [52.51, 13.40], [52.53, 13.50]],
    color="blue",
    weight=4
).add_to(m)

folium.Circle(
    location=[52.52, 13.405],
    radius=1000,
    color="green",
    fill=True,
    fill_opacity=0.3
).add_to(m)
```

---

## 6. GeoJSON and choropleth

Folium supports GeoJSON overlays and choropleth maps for thematic mapping. This is one of the most common workflows when combining Folium with GeoPandas or Pandas data.

### 6.1 GeoJSON methods

- **`folium.GeoJson()`** - Add GeoJSON to the map.
- **`folium.features.Choropleth()`** - Create a choropleth map.
- **`GeoJson.add_to()`** - Add a GeoJSON layer to a map.
- **`GeoJsonPopup`** - Show popup fields from GeoJSON properties.
- **`GeoJsonTooltip`** - Show tooltip fields from GeoJSON properties.

### 6.2 Choropleth parameters

- `geo_data` - GeoJSON, file path, URL, or GeoDataFrame.
- `data` - DataFrame or Series with values.
- `columns` - Key and value columns.
- `key_on` - GeoJSON property to join on.
- `fill_color` - Color palette.
- `bins` - Classification bins.
- `highlight` - Enable hover highlighting.
- `legend_name` - Legend title.

### 6.3 Example: GeoJSON

```python
m = folium.Map(location=[52.52, 13.405], zoom_start=10)

folium.GeoJson(
    data="data/boundaries.geojson",
    name="Boundaries",
    tooltip=folium.GeoJsonTooltip(fields=["name"])
).add_to(m)
```

### 6.4 Example: Choropleth

```python
import pandas as pd
import folium

df = pd.DataFrame({
    "region": ["A", "B", "C"],
    "value":[1][2]
})

m = folium.Map(location=[52.52, 13.405], zoom_start=6)

folium.Choropleth(
    geo_data="data/regions.geojson",
    data=df,
    columns=["region", "value"],
    key_on="feature.properties.region",
    fill_color="YlOrRd",
    legend_name="Value"
).add_to(m)
```

---

## 7. Feature groups and layer control

Feature groups are useful for organizing multiple map elements into togglable layers. Layer control lets the user turn layers on and off interactively.

### 7.1 Feature group methods

- **`folium.FeatureGroup()`** - Group several features into one layer.
- **`FeatureGroup.add_to()`** - Add the group to the map.
- **`FeatureGroup.add_child()`** - Add child objects to the group.

### 7.2 Layer control methods

- **`folium.LayerControl()`** - Add a layer switcher.
- **`LayerControl.add_to()`** - Attach the control to the map.

### 7.3 Example

```python
m = folium.Map(location=[52.52, 13.405], zoom_start=10)

cities = folium.FeatureGroup(name="Cities")
folium.Marker([52.52, 13.405], popup="Berlin").add_to(cities)
cities.add_to(m)

folium.LayerControl().add_to(m)
```

---

## 8. Map utilities

Folium includes several utility features for interactivity and display behavior. These tools make the map easier to use and more flexible.

### 8.1 Utility methods

- **`folium.ClickForLatLng()`** - Copy clicked coordinates.
- **`folium.ClickForMarker()`** - Add a marker by clicking the map.
- **`folium.CustomPane()`** - Create a custom rendering pane.
- **`folium.FitBounds()`** - Fit the map to bounds.
- **`folium.FitOverlays()`** - Fit the map to enabled overlays.
- **`folium.GlobalSwitches()`** - Disable touch or 3D behavior.

### 8.2 Example

```python
m = folium.Map(location=[52.52, 13.405], zoom_start=10)
m.fit_bounds([[52.3, 13.0], [52.7, 13.8]])
```

---

## 9. Advanced overlays

Folium supports more advanced rendering types such as image overlays, video overlays, WMS layers, and color-coded lines. These are useful for remote sensing, raster visualization, and thematic spatial analysis.

### 9.1 Advanced overlay methods

- **`folium.raster_layers.ImageOverlay()`** - Display a raster image.
- **`folium.raster_layers.VideoOverlay()`** - Display a video.
- **`folium.raster_layers.WmsTileLayer()`** - Connect to a WMS service.
- **`folium.features.ColorLine()`** - Draw a line with varying colors.
- **`folium.features.DivIcon()`** - Create HTML-based marker icons.

### 9.2 Example: image overlay

```python
m = folium.Map(location=[52.52, 13.405], zoom_start=10)

folium.raster_layers.ImageOverlay(
    image="overlay.png",
    bounds=[[52.4, 13.2], [52.6, 13.6]],
    opacity=0.6
).add_to(m)
```

---

## 10. HTML and export

Folium maps are rendered as HTML objects, which makes them easy to save and share as web maps. Most workflows end with saving the map to an HTML file.

### 10.1 Export methods

- **`Map.save()`** - Save the map as HTML.
- **`Map._repr_html_()`** - Render in notebooks.
- **`Element.render()`** - Render a folium element to HTML.

### 10.2 Example

```python
m.save("map.html")
```

---

## 11. Common workflows

### 11.1 Basic point map

```python
m = folium.Map(location=[52.52, 13.405], zoom_start=10)

folium.Marker([52.52, 13.405], popup="Center").add_to(m)
folium.Marker([52.50, 13.39], popup="Point 2").add_to(m)
```

### 11.2 Choropleth with GeoPandas

```python
import geopandas as gpd
import folium

gdf = gpd.read_file("regions.geojson").to_crs(epsg=4326)
m = folium.Map(location=[52.52, 13.405], zoom_start=6)

folium.GeoJson(
    gdf,
    name="Regions",
    tooltip=folium.GeoJsonTooltip(fields=["name"])
).add_to(m)

folium.LayerControl().add_to(m)
```

### 11.3 Route visualization

```python
route = [
    [52.52, 13.405],
    [52.51, 13.45],
    [52.49, 13.5]
]

m = folium.Map(location=[52.52, 13.405], zoom_start=12)
folium.PolyLine(route, color="blue", weight=5).add_to(m)
```

---

## 12. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Map creation | `folium.Map()` | Create the base map. |
| Tiles | `folium.TileLayer()`, `WmsTileLayer()` | Add basemap or service layers. |
| Markers | `folium.Marker()`, `folium.Icon()` | Add point features. |
| Vector shapes | `PolyLine`, `Polygon`, `Circle`, `Rectangle` | Draw spatial geometries. |
| GeoJSON | `folium.GeoJson()` | Add structured vector layers. |
| Choropleth | `folium.Choropleth()` | Create thematic maps. |
| Layer organization | `FeatureGroup`, `LayerControl` | Group and toggle layers. |
| Utilities | `ClickForLatLng`, `FitBounds` | Improve map interaction. |
| Advanced overlays | `ImageOverlay`, `VideoOverlay`, `ColorLine` | Handle special overlay types. |
| Export | `Map.save()` | Save interactive HTML maps. |

---

## 13. Documentation links

- [Folium API reference](https://python-visualization.github.io/folium/latest/reference.html)
- [GeoJSON and choropleth guide](https://python-visualization.github.io/folium/latest/user_guide/geojson.html)
- [Folium home](https://python-visualization.github.io/folium/)