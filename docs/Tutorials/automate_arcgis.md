---
hide:
  - toc
  - navigation
---

# Complete ArcPy Methods Reference

## 1. Core concepts

ArcPy is the Python site package for ArcGIS Pro and ArcGIS workflows. It is used for geoprocessing, data management, map automation, cartography, raster analysis, and script tools.

### 1.1 Main ideas

- **Geoprocessing tools**: ArcGIS functions exposed through Python.
- **Environment settings**: control workspace, output coordinate system, overwrite behavior, and more.
- **Data access**: fast row and cursor-based reading and editing.
- **Map automation**: manage maps, layers, layouts, and exports.
- **Modules**: specialized parts of ArcPy such as `arcpy.da`, `arcpy.mp`, and `arcpy.sa`.

### 1.2 Common imports

```python
import arcpy
from arcpy.sa import *
```

### 1.3 Basic example

```python
import arcpy

arcpy.env.workspace = r"C:\data\gis.gdb"
print(arcpy.GetCount_management("roads"))
```

---

## 2. ArcPy environment

Environment settings control where tools read and write data and how outputs are created.

### 2.1 Common settings

- **`arcpy.env.workspace`** - Set current workspace.
- **`arcpy.env.scratchWorkspace`** - Set scratch workspace.
- **`arcpy.env.overwriteOutput`** - Allow overwrite of outputs.
- **`arcpy.env.outputCoordinateSystem`** - Set output CRS.
- **`arcpy.env.extent`** - Set processing extent.
- **`arcpy.env.cellSize`** - Set raster cell size.
- **`arcpy.env.snapRaster`** - Snap outputs to raster grid.

### 2.2 Use case

- Control where results are stored.
- Make processing repeatable.
- Match coordinate system and raster settings across tools.

### 2.3 Example

```python
import arcpy

arcpy.env.workspace = r"C:\data\project.gdb"
arcpy.env.overwriteOutput = True
```

---

## 3. Geoprocessing tools

ArcPy exposes ArcGIS geoprocessing tools as Python functions.

### 3.1 Common management tools

- **`CopyFeatures_management()`** - Copy features.
- **`Delete_management()`** - Delete datasets.
- **`Rename_management()`** - Rename datasets.
- **`CreateFileGDB_management()`** - Create file geodatabase.
- **`CreateFeatureclass_management()`** - Create feature class.
- **`AddField_management()`** - Add a field.
- **`CalculateField_management()`** - Calculate field values.
- **`DeleteField_management()`** - Delete fields.
- **`MakeFeatureLayer_management()`** - Create a feature layer.
- **`SelectLayerByAttribute_management()`** - Select by attribute.
- **`SelectLayerByLocation_management()`** - Select by spatial relation.

### 3.2 Common analysis tools

- **`Buffer_analysis()`** - Create buffer zones.
- **`Clip_analysis()`** - Clip one dataset with another.
- **`Intersect_analysis()`** - Intersect datasets.
- **`Union_analysis()`** - Combine features from layers.
- **`Dissolve_management()`** - Dissolve boundaries.
- **`Merge_management()`** - Merge datasets.
- **`SpatialJoin_analysis()`** - Join attributes spatially.
- **`Near_analysis()`** - Compute nearest features.
- **`Erase_analysis()`** - Remove overlapping areas.

### 3.3 Use case

- Build repeatable GIS workflows.
- Replace manual analysis in the GUI.
- Prepare outputs for cartography or modeling.

### 3.4 Example

```python
import arcpy

arcpy.analysis.Buffer("roads", "roads_buffer", "100 Meters")
```

---

## 4. Data access and cursors

Cursors are one of the most important parts of ArcPy for reading and writing rows efficiently.

### 4.1 Common cursor types

- **`arcpy.da.SearchCursor()`** - Read rows.
- **`arcpy.da.UpdateCursor()`** - Update rows.
- **`arcpy.da.InsertCursor()`** - Insert rows.

### 4.2 Common tokens

- **`OID@`** - ObjectID.
- **`SHAPE@`** - Geometry object.
- **`SHAPE@X`** - X coordinate.
- **`SHAPE@Y`** - Y coordinate.
- **`SHAPE@XY`** - X/Y tuple.
- **`SHAPE@AREA`** - Feature area.
- **`SHAPE@LENGTH`** - Feature length.
- **`SHAPE@WKT`** - WKT geometry.

### 4.3 Use case

- Read attribute tables.
- Update values in bulk.
- Insert new survey points or features.

### 4.4 Example

```python
import arcpy

fc = r"C:\data\project.gdb\roads"
with arcpy.da.SearchCursor(fc, ["OID@", "NAME"]) as cursor:
    for row in cursor:
        print(row)
```

---

## 5. Editing and updating data

ArcPy can modify field values and geometries through update cursors or field calculation tools.

### 5.1 Common methods

- **`startEditing()`** - Start edit session in GUI contexts.
- **`UpdateCursor()`** - Modify rows.
- **`CalculateField_management()`** - Calculate field values.
- **`AddField_management()`** - Add new fields.
- **`DeleteField_management()`** - Remove fields.

### 5.2 Use case

- Standardize field values.
- Apply formulas to attributes.
- Update geometry-dependent fields.

### 5.3 Example

```python
import arcpy

fc = r"C:\data\project.gdb\parcels"
with arcpy.da.UpdateCursor(fc, ["AREA_SQKM"]) as cursor:
    for row in cursor:
        row = row / 1_000_000
        cursor.updateRow(row)
```

---

## 6. Geometry and spatial reference

ArcPy includes geometry objects and spatial reference tools for accurate spatial analysis.

### 6.1 Common classes

- **`arcpy.Point()`** - Point object.
- **`arcpy.Array()`** - Sequence of points.
- **`arcpy.Polygon()`** - Polygon geometry.
- **`arcpy.Polyline()`** - Line geometry.
- **`arcpy.PointGeometry()`** - Point geometry.
- **`arcpy.SpatialReference()`** - Spatial reference object.

### 6.2 Common methods and properties

- **`area`** - Geometry area.
- **`length`** - Geometry length.
- **`centroid`** - Geometry centroid.
- **`buffer()`** - Buffer geometry.
- **`projectAs()`** - Reproject geometry.
- **`distanceTo()`** - Distance to another geometry.
- **`contains()`** - Spatial containment.
- **`intersects()`** - Spatial intersection test.

### 6.3 Use case

- Create synthetic geometries.
- Measure area or distance.
- Reproject geometries for analysis.

### 6.4 Example

```python
import arcpy

pt = arcpy.Point(14.4, 50.1)
geom = arcpy.PointGeometry(pt, arcpy.SpatialReference(4326))
print(geom.centroid)
```

---

## 7. Mapping and layout automation

ArcPy can automate ArcGIS Pro maps, layers, legends, and layouts through `arcpy.mp`.

### 7.1 Common classes

- **`ArcGISProject()`** - Open a project.
- **`Map()`** - Map object.
- **`Layout()`** - Layout object.
- **`Layer()`** - Layer object.
- **`MapFrame()`** - Map frame in a layout.
- **`TextElement()`** - Text element.
- **`LegendElement()`** - Legend element.

### 7.2 Common methods

- **`listMaps()`** - List maps.
- **`listLayouts()`** - List layouts.
- **`listLayers()`** - List layers.
- **`listElements()`** - List map or layout elements.
- **`exportToPDF()`** - Export to PDF.
- **`exportToPNG()`** - Export to PNG.
- **`saveACopy()`** - Save project copy.

### 7.3 Use case

- Automate map exports.
- Batch update map layers.
- Generate layout products for reporting.

### 7.4 Example

```python
import arcpy

aprx = arcpy.mp.ArcGISProject(r"C:\projects\demo.aprx")
print(aprx.listMaps())
```

---

## 8. Raster analysis

ArcPy includes extensive raster tools through Spatial Analyst and Image Analyst extensions.

### 8.1 Common tools and functions

- **`Raster()`** - Raster object.
- **`Slope()`** - Compute slope.
- **`Aspect()`** - Compute aspect.
- **`Hillshade()`** - Create hillshade.
- **`Reclassify()`** - Reclassify values.
- **`Con()`** - Conditional raster operation.
- **`ExtractByMask()`** - Extract raster by mask.
- **`ZonalStatistics()`** - Zonal raster statistics.
- **`CellStatistics()`** - Cell-based statistics.
- **`Times()`** - Multiply raster values.

### 8.2 Use case

- Terrain analysis.
- Suitability modeling.
- Land cover reclassification.
- Raster masking and summarization.

### 8.3 Example

```python
import arcpy
from arcpy.sa import *

arcpy.CheckOutExtension("Spatial")
slope = Slope("dem.tif")
slope.save(r"C:\data\project.gdb\slope")
```

---

## 9. Table and field operations

ArcPy supports table handling and schema management.

### 9.1 Common methods

- **`ListFields()`** - List fields in a table.
- **`AddField_management()`** - Add a field.
- **`DeleteField_management()`** - Delete a field.
- **`JoinField_management()`** - Join fields from a table.
- **`TableToTable_conversion()`** - Convert tables.
- **`Statistics_analysis()`** - Summarize attributes.

### 9.2 Use case

- Prepare data for analysis.
- Join lookup tables.
- Build summary tables.

### 9.3 Example

```python
import arcpy

fields = arcpy.ListFields(r"C:\data\project.gdb\parcels")
print([f.name for f in fields])
```

---

## 10. Environment and messaging utilities

ArcPy includes helper methods for checking results, reporting messages, and reading metadata.

### 10.1 Common functions

- **`GetCount_management()`** - Count rows or features.
- **`Exists()`** - Check whether a dataset exists.
- **`Describe()`** - Get dataset properties.
- **`ListFeatureClasses()`** - List feature classes.
- **`ListRasters()`** - List rasters.
- **`ListTables()`** - List tables.
- **`AddMessage()`** - Send a message.
- **`AddWarning()`** - Send a warning.
- **`AddError()`** - Send an error.

### 10.2 Use case

- Validate inputs.
- Inspect dataset metadata.
- Provide feedback in script tools.

### 10.3 Example

```python
import arcpy

if arcpy.Exists(r"C:\data\project.gdb\roads"):
    print(arcpy.GetCount_management(r"C:\data\project.gdb\roads"))
```

---

## 11. Common GIS workflows

### 11.1 Buffer and clip

```python
import arcpy

arcpy.analysis.Buffer("roads", "roads_buffer", "500 Meters")
arcpy.analysis.Clip("parcels", "study_area", "parcels_clip")
```

### 11.2 Select and export

```python
import arcpy

lyr = arcpy.MakeFeatureLayer_management("parcels", "parcels_lyr")
arcpy.SelectLayerByAttribute_management(lyr, "NEW_SELECTION", '"zone" = \'A\'')
arcpy.CopyFeatures_management(lyr, "selected_parcels")
```

### 11.3 Join and summarize

```python
import arcpy

arcpy.JoinField_management("parcels", "parcel_id", "owners", "parcel_id")
arcpy.Statistics_analysis("parcels", "summary", [["AREA", "SUM"]], "zone")
```

---

## 12. Machine learning with ArcPy

ArcPy is often used to prepare training data for machine learning. The actual model training is usually done with scikit-learn, but ArcPy is excellent for feature extraction, spatial joins, raster sampling, and writing predictions back to GIS layers.

### 12.1 Use cases

- Land cover classification.
- Urban growth prediction.
- Suitability analysis.
- Raster-based supervised classification.
- Spatial clustering of features.
- Sampling points for training data.

### 12.2 Typical workflow

1. Extract labeled training samples from GIS layers.
2. Convert attributes or raster values to a tabular dataset.
3. Train a model with scikit-learn.
4. Predict classes or numeric values.
5. Save predictions back into ArcGIS layers or rasters.

### 12.3 Example with scikit-learn

```python
import numpy as np
from sklearn.ensemble import RandomForestClassifier

X = np.array([,,,,, ])[1][2][3][4][5][6]
y = np.array()[2][1]

model = RandomForestClassifier(random_state=42)
model.fit(X, y)
pred = model.predict([, ])[5][7][8]
print(pred)
```

### 12.4 Spatial ML pattern

```python
# 1. Use ArcPy to read features or sample raster values.
# 2. Create X and y arrays.
# 3. Train a model with scikit-learn.
# 4. Predict on new points or pixels.
# 5. Write results to a feature class or raster.
```

### 12.5 Common ML methods used with ArcPy

- **`RandomForestClassifier()`** - Strong default for spatial classification.
- **`RandomForestRegressor()`** - Predict continuous spatial targets.
- **`SVC()`** - Kernel-based classification.
- **`KNeighborsClassifier()`** - Local similarity classification.
- **`LogisticRegression()`** - Simple baseline classification.
- **`KMeans()`** - Unsupervised clustering.
- **`PCA()`** - Reduce dimensionality.

---

## 13. Script tools and parameters

ArcPy can power custom script tools in ArcGIS Pro.

### 13.1 Common functions

- **`GetParameterAsText()`** - Read input parameter.
- **`SetParameterAsText()`** - Write output parameter.
- **`AddMessage()`** - Display tool message.
- **`AddWarning()`** - Display warning.
- **`AddError()`** - Display error.

### 13.2 Use case

- Build reusable GIS tools.
- Package workflows for non-programmers.
- Create validated geoprocessing utilities.

### 13.3 Example

```python
import arcpy

in_fc = arcpy.GetParameterAsText(0)
out_fc = arcpy.GetParameterAsText(1)
arcpy.analysis.Buffer(in_fc, out_fc, "100 Meters")
```

---

## 14. Good practices

- Check dataset existence with **`Exists()`** before processing.
- Use **`arcpy.env.overwriteOutput = True`** when needed.
- Use `da` cursors for performance.
- Check out Spatial Analyst before raster tools.
- Reproject data before distance and area analysis.
- Use in-memory outputs for temporary results.
- Wrap long workflows with clear messages for script tools.

---

## 15. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Environment | `arcpy.env.workspace`, `overwriteOutput` | Control execution settings. |
| Geoprocessing | `Buffer_analysis()`, `Clip_analysis()` | Run GIS tools. |
| Data access | `SearchCursor()`, `UpdateCursor()`, `InsertCursor()` | Read and edit records. |
| Geometry | `PointGeometry()`, `Polygon()`, `buffer()` | Work with shapes. |
| CRS | `SpatialReference()`, `projectAs()` | Handle coordinates safely. |
| Raster | `Slope()`, `Reclassify()`, `ExtractByMask()` | Analyze raster data. |
| Metadata | `Describe()`, `ListFields()` | Inspect datasets. |
| Mapping | `arcpy.mp` methods | Automate maps and exports. |
| Script tools | `GetParameterAsText()`, `SetParameterAsText()` | Build custom tools. |
| ML prep | sampling, joins, exports | Prepare spatial training data. |

---

## 16. Example full workflow

```python
import arcpy
from arcpy.sa import *

arcpy.env.workspace = r"C:\data\project.gdb"
arcpy.env.overwriteOutput = True
arcpy.CheckOutExtension("Spatial")

roads = "roads"
study_area = "study_area"

arcpy.analysis.Buffer(roads, "roads_buffer", "500 Meters")
arcpy.analysis.Clip("roads_buffer", study_area, "roads_buffer_clip")

slope = Slope(r"C:\data\dem.tif")
slope.save("slope_raster")
```