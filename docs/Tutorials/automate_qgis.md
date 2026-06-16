---
hide:
  - toc
  - navigation
---

# Complete PyQGIS Methods Reference

## 1. Core concepts

PyQGIS is the Python API for QGIS. It lets you automate GIS workflows, build plugins, manage layers, edit vector data, run geoprocessing operations, and integrate machine learning into spatial analysis.

### 1.1 Main ideas

- **QGIS project**: the current workspace, layers, and map canvas.
- **Vector layer**: points, lines, and polygons.
- **Raster layer**: gridded data such as GeoTIFF.
- **Feature**: one record in a vector layer.
- **Geometry**: shape of a feature.
- **Processing framework**: geoprocessing and analysis tools.
- **Plugins**: extend QGIS with custom tools.

### 1.2 Common imports

```python
from qgis.core import *
from qgis.gui import *
from qgis.PyQt.QtCore import *
```

### 1.3 Typical environment

PyQGIS code usually runs inside the QGIS Python console, a QGIS plugin, or a standalone script configured with QGIS paths.

---

## 2. Project and layer management

The project object manages loaded layers and map settings.

### 2.1 Common methods

- **`QgsProject.instance()`** - Access the current project.
- **`addMapLayer()`** - Add a single layer.
- **`addMapLayers()`** - Add multiple layers.
- **`mapLayers()`** - Return all layers.
- **`mapLayersByName()`** - Find layers by name.
- **`removeMapLayer()`** - Remove a layer.
- **`clear()`** - Clear the project.
- **`read()`** - Load a project file.
- **`write()`** - Save a project file.
- **`layerTreeRoot()`** - Access the legend/layer tree.

### 2.2 Use case

- Load and organize GIS layers.
- Manage map themes and project state.
- Build custom QGIS automation scripts.

### 2.3 Example

```python
layer = QgsProject.instance().mapLayersByName("countries")
print(layer.name())
```

---

## 3. Loading layers

PyQGIS supports loading vector, raster, and delimited text layers from many sources.

### 3.1 Common classes

- **`QgsVectorLayer()`** - Load vector data.
- **`QgsRasterLayer()`** - Load raster data.
- **`QgsPointXY`** - Point coordinate object.
- **`QgsCoordinateReferenceSystem()`** - CRS object.

### 3.2 Common data providers

- **`ogr`** - Shapefile, GeoPackage, and many vector formats.
- **`delimitedtext`** - CSV or text files.
- **`gdal`** - Raster layers.

### 3.3 Use case

- Load data from disk.
- Connect a CSV to coordinates.
- Access file-based GIS formats.

### 3.4 Example

```python
layer = QgsVectorLayer("/path/to/data.gpkg|layername=roads", "roads", "ogr")
if layer.isValid():
    QgsProject.instance().addMapLayer(layer)
```

---

## 4. Inspecting layers

PyQGIS provides rich metadata access for layers, fields, geometries, and CRS.

### 4.1 Common methods and attributes

- **`isValid()`** - Check if layer loaded correctly.
- **`name()`** - Get layer name.
- **`id()`** - Get layer ID.
- **`crs()`** - Get layer CRS.
- **`fields()`** - Get fields.
- **`featureCount()`** - Count features.
- **`getFeatures()`** - Iterate over features.
- **`geometryType()`** - Get geometry type.
- **`wkbType()`** - Get geometry storage type.
- **`extent()`** - Get layer bounds.

### 4.2 Use case

- Explore schema and geometry type.
- Verify layer integrity.
- Prepare data for analysis.

### 4.3 Example

```python
print(layer.name())
print(layer.featureCount())
print(layer.fields().names())
```

---

## 5. Vector features and attributes

Features store geometry and attribute values. You can read, edit, add, and delete them.

### 5.1 Common methods

- **`getFeatures()`** - Iterate over features.
- **`QgsFeature()`** - Create a feature.
- **`setGeometry()`** - Assign geometry.
- **`setAttributes()`** - Assign all attributes.
- **`setAttribute()`** - Set a single attribute.
- **`attribute()`** - Read one attribute.
- **`attributes()`** - Read all attributes.
- **`addFeature()`** - Add one feature.
- **`addFeatures()`** - Add multiple features.
- **`deleteFeature()`** - Delete a feature.
- **`updateFeature()`** - Update a feature.

### 5.2 Use case

- Create survey points.
- Update attribute tables.
- Build output layers from analysis.

### 5.3 Example

```python
for f in layer.getFeatures():
    print(f.id(), f.attributes())
```

---

## 6. Editing layers

Editing is required for many data management tasks.

### 6.1 Common methods

- **`startEditing()`** - Begin edit session.
- **`commitChanges()`** - Save edits.
- **`rollBack()`** - Cancel edits.
- **`addAttribute()`** - Add a new field.
- **`deleteAttribute()`** - Remove a field.
- **`changeAttributeValue()`** - Update one value.
- **`changeGeometry()`** - Update geometry.
- **`updateFields()`** - Refresh field definitions.
- **`updateExtents()`** - Refresh layer extent.

### 6.2 Use case

- Add new fields.
- Fix attributes.
- Modify geometries safely.

### 6.3 Example

```python
layer.startEditing()
layer.changeAttributeValue(1, 0, "new_value")
layer.commitChanges()
```

---

## 7. Geometries and spatial operations

PyQGIS has many geometry tools for construction, measurement, and transformation.

### 7.1 Common classes and methods

- **`QgsGeometry`** - Geometry container.
- **`fromPointXY()`** - Create point geometry.
- **`fromPolygonXY()`** - Create polygon geometry.
- **`fromPolylineXY()`** - Create line geometry.
- **`asPoint()`** - Read as point.
- **`asPolygon()`** - Read as polygon.
- **`buffer()`** - Create buffer.
- **`intersection()`** - Compute intersection.
- **`difference()`** - Compute difference.
- **`unaryUnion()`** - Merge geometries.
- **`area()`** - Compute area.
- **`length()`** - Compute length.
- **`centroid()`** - Compute centroid.
- **`isEmpty()`** - Check emptiness.

### 7.2 Use case

- Build AOIs.
- Compute distances and areas.
- Perform spatial overlays.

### 7.3 Example

```python
geom = QgsGeometry.fromPointXY(QgsPointXY(14.38811, 50.10412))
print(geom.asPoint())
```

---

## 8. Coordinate reference systems

CRS handling is essential for accurate GIS analysis.

### 8.1 Common classes

- **`QgsCoordinateReferenceSystem()`** - Define a CRS.
- **`QgsCoordinateTransform()`** - Transform geometries between CRSs.
- **`QgsProject.instance()`** - Provides project context for transforms.

### 8.2 Use case

- Reproject geometries.
- Match layer coordinate systems.
- Safely combine datasets from different sources.

### 8.3 Example

```python
src = QgsCoordinateReferenceSystem("EPSG:4326")
dst = layer.crs()
transform = QgsCoordinateTransform(src, dst, QgsProject.instance())
```

---

## 9. Selecting and querying data

Selection tools help isolate features based on location or attributes.

### 9.1 Common methods

- **`selectByRect()`** - Select features in a bounding box.
- **`selectByExpression()`** - Select by attribute expression.
- **`invertSelection()`** - Invert selection.
- **`removeSelection()`** - Clear selection.
- **`selectedFeatures()`** - Return selected features.
- **`selectedFeatureCount()`** - Count selected features.

### 9.2 Use case

- Filter features by condition.
- Select features in a study area.
- Build interactive editing workflows.

### 9.3 Example

```python
layer.selectByExpression('"population" > 100000')
print(layer.selectedFeatureCount())
```

---

## 10. Processing tools

The QGIS Processing framework provides many geoprocessing algorithms.

### 10.1 Common functions

- **`processing.run()`** - Run an algorithm.
- **`processing.algorithmHelp()`** - Show algorithm details.
- **`processing.execAlgorithmDialog()`** - Run from dialog in GUI contexts.
- **`processing.createAlgorithmDialog()`** - Create algorithm dialog.

### 10.2 Common algorithm groups

- Buffering.
- Dissolve and merge.
- Clip and intersect.
- Raster clipping and resampling.
- Raster statistics.
- Table joins.

### 10.3 Use case

- Automate GIS workflows.
- Chain multiple operations.
- Replace repetitive manual processing.

### 10.4 Example

```python
import processing

result = processing.run("native:buffer", {
    "INPUT": layer,
    "DISTANCE": 1000,
    "SEGMENTS": 8,
    "END_CAP_STYLE": 0,
    "JOIN_STYLE": 0,
    "MITER_LIMIT": 2,
    "DISSOLVE": False,
    "OUTPUT": "memory:"
})
```

---

## 11. Common geoprocessing use cases

### 11.1 Buffer

- Expand features by distance.
- Create service areas or protection zones.

```python
buffered = processing.run("native:buffer", {"INPUT": layer, "DISTANCE": 1000, "OUTPUT": "memory:"})
```

### 11.2 Clip

- Cut one layer using another layer.
- Restrict analysis to AOI.

### 11.3 Intersect

- Keep only overlapping areas.
- Combine attributes from overlapping layers.

### 11.4 Dissolve

- Merge features by shared attribute.
- Summarize administrative regions.

### 11.5 Raster calculations

- Reclassify values.
- Derive indexes and masks.

---

## 12. Layer styling

Styling controls how data appears in the map canvas and layouts.

### 12.1 Common classes and methods

- **`QgsSymbol`** - Base style symbol.
- **`QgsRenderer`** - Controls symbol rendering.
- **`QgsSingleSymbolRenderer`** - One symbol for all features.
- **`QgsCategorizedSymbolRenderer`** - Categories by field values.
- **`QgsGraduatedSymbolRenderer`** - Ranged styles.
- **`setRenderer()`** - Apply renderer.
- **`triggerRepaint()`** - Refresh display.

### 12.2 Use case

- Build choropleth maps.
- Style points by category.
- Improve map readability.

### 12.3 Example

```python
layer.triggerRepaint()
```

---

## 13. Labels and map canvas

PyQGIS can control labels, map canvas, and user interaction inside QGIS.

### 13.1 Common components

- **`QgsPalLayerSettings`** - Label settings.
- **`QgsVectorLayerSimpleLabeling`** - Label renderer.
- **`iface.mapCanvas()`** - Access map canvas in QGIS GUI.
- **`canvas.refresh()`** - Refresh display.
- **`canvas.zoomToSelected()`** - Zoom to selected features.

### 13.2 Use case

- Show feature names.
- Update GUI after changes.
- Focus on selected data.

---

## 14. Layouts and map export

Print layouts let you prepare final maps for export.

### 14.1 Common classes and methods

- **`QgsPrintLayout`** - Layout container.
- **`QgsLayoutItemMap`** - Map frame in layout.
- **`QgsLayoutItemLabel`** - Text label.
- **`QgsLayoutExporter`** - Export layout.
- **`exportToPdf()`** - Export PDF.
- **`exportToImage()`** - Export image.

### 14.2 Use case

- Create atlas maps.
- Export printable reports.
- Generate map figures for publications.

### 14.3 Example

```python
# layout export depends on QGIS application context
```

---

## 15. Machine learning in PyQGIS

PyQGIS is often used with ML workflows for classification, prediction, and spatial feature engineering. In many cases, scikit-learn is combined with PyQGIS to train models from extracted GIS features.

### 15.1 Use cases

- Land cover classification.
- Urban growth prediction.
- Suitability mapping.
- Feature extraction from vector and raster data.
- Spatial clustering and anomaly detection.

### 15.2 Common workflow steps

1. Load raster and vector training data.
2. Extract sample features from geometry or pixel values.
3. Convert GIS data to tabular form.
4. Train a machine learning model.
5. Classify, predict, or cluster spatial features.
6. Write outputs back to GIS layers.

### 15.3 Example with scikit-learn

```python
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

X = np.array([,,,,, ])[1][2][3][4][5][6]
y = np.array()[2][1]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)
pred = clf.predict(X_test)
print(classification_report(y_test, pred))
```

### 15.4 Example spatial classification pattern

```python
# 1. Read training features from a vector layer.
# 2. Extract coordinates or raster values.
# 3. Build X and y arrays.
# 4. Train a model with scikit-learn.
# 5. Predict labels for new features.
# 6. Save predictions to a new layer or raster.
```

### 15.5 Typical ML methods used with PyQGIS

- **`RandomForestClassifier()`** - Strong baseline for spatial classification.
- **`SVC()`** - Margin-based classification.
- **`KNeighborsClassifier()`** - Local similarity classification.
- **`LogisticRegression()`** - Simple classification baseline.
- **`RandomForestRegressor()`** - Predict continuous values.
- **`PCA()`** - Reduce feature dimensions.
- **`KMeans()`** - Cluster spatial features.

---

## 16. Common automation workflows

### 16.1 Load and inspect a layer

```python
layer = QgsVectorLayer("/path/to/file.shp", "roads", "ogr")
print(layer.isValid())
print(layer.fields().names())
```

### 16.2 Select features and buffer them

```python
layer.selectByExpression('"type" = \'primary\'')
result = processing.run("native:buffer", {"INPUT": layer, "DISTANCE": 500, "OUTPUT": "memory:"})
```

### 16.3 Transform coordinates

```python
src = QgsCoordinateReferenceSystem("EPSG:4326")
dst = QgsCoordinateReferenceSystem("EPSG:3857")
transform = QgsCoordinateTransform(src, dst, QgsProject.instance())
```

### 16.4 Create a point geometry

```python
geom = QgsGeometry.fromPointXY(QgsPointXY(14.38811, 50.10412))
```

---

## 17. Good practices

- Use **`QgsProject.instance()`** for project-wide operations.
- Check **`isValid()`** before using a layer.
- Reproject data before distance or area calculations.
- Wrap edits with **`startEditing()`** and **`commitChanges()`**.
- Use the Processing framework instead of manual loops when possible.
- Prefer memory layers for temporary results.
- Keep machine learning data in tabular form before training.

---

## 18. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Project | `QgsProject.instance()`, `addMapLayer()`, `mapLayersByName()` | Manage layers and project state. |
| Loading | `QgsVectorLayer()`, `QgsRasterLayer()` | Load GIS data. |
| Features | `getFeatures()`, `addFeature()`, `updateFeature()` | Read and edit records. |
| Geometry | `QgsGeometry`, `buffer()`, `intersection()` | Spatial operations. |
| CRS | `QgsCoordinateReferenceSystem()`, `QgsCoordinateTransform()` | Reproject data safely. |
| Selection | `selectByExpression()`, `selectByRect()` | Filter features. |
| Processing | `processing.run()` | Run geoprocessing algorithms. |
| Styling | `setRenderer()`, `triggerRepaint()` | Control map appearance. |
| Export | `QgsLayoutExporter` | Produce final maps. |
| ML | `RandomForestClassifier()`, `KMeans()` | Train predictive spatial models. |

---

## 19. Example full workflow

```python
import processing
from qgis.core import QgsVectorLayer, QgsProject

layer = QgsVectorLayer("/path/to/data.gpkg|layername=parcels", "parcels", "ogr")
if layer.isValid():
    QgsProject.instance().addMapLayer(layer)
    layer.selectByExpression('"landuse" = \'residential\'')
    result = processing.run("native:buffer", {
        "INPUT": layer,
        "DISTANCE": 100,
        "SEGMENTS": 8,
        "END_CAP_STYLE": 0,
        "JOIN_STYLE": 0,
        "MITER_LIMIT": 2,
        "DISSOLVE": False,
        "OUTPUT": "memory:"
    })
```