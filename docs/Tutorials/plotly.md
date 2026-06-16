---
hide:
  - toc
  - navigation
---

# Complete Plotly and Plotly Express Reference

## 1. Core concepts

Plotly is an interactive visualization library for Python. Plotly Express provides a high-level interface for quickly creating charts, while Graph Objects gives you deeper control over traces, layout, and customization.

### 1.1 Main ideas

- **Plotly Express**: fast, concise plotting with DataFrames.
- **Graph Objects**: lower-level figure construction and customization.
- **Figure**: the main container for traces and layout.
- **Trace**: a plot element such as scatter, bar, or heatmap.
- **Layout**: titles, axes, legend, template, and styling.

### 1.2 Common imports

```python
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np
```

### 1.3 Basic example

```python
import plotly.express as px

fig = px.scatter(x=, y=, title="Simple scatter")[1][2][3][4][5]
fig.show()
```

---

## 2. Plotly Express workflow

Plotly Express is designed for DataFrame-first plotting. You pass data directly into a plotting function and customize the figure afterward.

### 2.1 Common pattern

- Create figure with `px.hart_type>()`.
- Customize with `update_traces()`, `update_layout()`, `update_xaxes()`, `update_yaxes()`.
- Display with `show()`.
- Export with `write_html()` or `write_image()`.

### 2.2 Example

```python
fig = px.bar(df, x="city", y="population", color="region", title="Population by City")
fig.update_layout(template="plotly_white")
fig.show()
```

---

## 3. Plotly Express chart types

Plotly Express includes a large set of ready-to-use charts.

### 3.1 Core chart functions

- **`px.scatter()`** - Scatter plots.
- **`px.line()`** - Line charts.
- **`px.area()`** - Area charts.
- **`px.bar()`** - Bar charts.
- **`px.histogram()`** - Histograms.
- **`px.box()`** - Box plots.
- **`px.violin()`** - Violin plots.
- **`px.strip()`** - Strip plots.
- **`px.ecdf()`** - Empirical cumulative distribution plots.
- **`px.pie()`** - Pie charts.

### 3.2 Density and distribution charts

- **`px.density_heatmap()`** - 2D density heatmap.
- **`px.density_contour()`** - Density contour plot.

### 3.3 Hierarchical charts

- **`px.treemap()`** - Treemap.
- **`px.sunburst()`** - Sunburst.
- **`px.icicle()`** - Icicle chart.
- **`px.funnel()`** - Funnel chart.
- **`px.funnel_area()`** - Funnel area chart.

### 3.4 3D and polar charts

- **`px.scatter_3d()`** - 3D scatter.
- **`px.line_3d()`** - 3D line.
- **`px.scatter_polar()`** - Polar scatter.
- **`px.line_polar()`** - Polar line.
- **`px.scatter_ternary()`** - Ternary scatter.
- **`px.line_ternary()`** - Ternary line.

### 3.5 Map charts

- **`px.scatter_mapbox()`** - Mapbox scatter map.
- **`px.line_mapbox()`** - Mapbox line map.
- **`px.choropleth()`** - Choropleth map.
- **`px.choropleth_mapbox()`** - Choropleth map with Mapbox.
- **`px.scatter_geo()`** - Geographic scatter plot.
- **`px.line_geo()`** - Geographic line plot.
- **`px.line_map()`** - Geographic line plot on map projections.

### 3.6 Example use

```python
df = px.data.iris()
fig = px.scatter(df, x="sepal_width", y="sepal_length", color="species", title="Iris scatter")
fig.show()
```

---

## 4. Common Plotly Express parameters

Most Plotly Express functions support a shared set of useful parameters.

### 4.1 Important parameters

- **`data_frame`** - Input DataFrame.
- **`x`** - X-axis variable.
- **`y`** - Y-axis variable.
- **`color`** - Group by category or continuous value.
- **`size`** - Marker size.
- **`symbol`** - Marker symbol.
- **`facet_row`** - Create panels by rows.
- **`facet_col`** - Create panels by columns.
- **`hover_data`** - Extra hover fields.
- **`text`** - Text labels.
- **`animation_frame`** - Create animation frames.
- **`animation_group`** - Group animated objects.
- **`category_orders`** - Set category order.
- **`labels`** - Rename axis or legend labels.
- **`title`** - Figure title.
- **`template`** - Use a theme.
- **`log_x` / `log_y`** - Log-scale axes.
- **`range_x` / `range_y`** - Set axis ranges.

### 4.2 Example

```python
fig = px.scatter(
    df,
    x="gdpPercap",
    y="lifeExp",
    color="continent",
    size="pop",
    hover_data=["country"],
    template="plotly_white"
)
fig.show()
```

---

## 5. Figures and graph objects

Graph Objects gives full control over traces and layout. It is ideal when Plotly Express is not flexible enough.

### 5.1 Common figure methods

- **`go.Figure()`** - Create a figure.
- **`add_trace()`** - Add a trace.
- **`add_traces()`** - Add multiple traces.
- **`add_shape()`** - Add a shape.
- **`add_annotation()`** - Add annotation.
- **`add_vline()`** - Add vertical line.
- **`add_hline()`** - Add horizontal line.
- **`update_layout()`** - Update layout settings.
- **`update_traces()`** - Update trace settings.
- **`update_xaxes()`** - Update x-axis settings.
- **`update_yaxes()`** - Update y-axis settings.
- **`show()`** - Display figure.
- **`write_html()`** - Save as HTML.
- **`write_image()`** - Save as static image.

### 5.2 Example

```python
import plotly.graph_objects as go

fig = go.Figure()
fig.add_trace(go.Scatter(x=, y=, mode="lines+markers", name="Series A"))[2][3][5][1]
fig.update_layout(title="Line chart", xaxis_title="X", yaxis_title="Y")
fig.show()
```

---

## 6. Scatter and line charts

Scatter and line plots are among the most commonly used Plotly charts.

### 6.1 Use cases

- Explore relationships between two variables.
- Show trends over time.
- Compare groups with color and symbol.
- Add hover details for analysis.

### 6.2 Plotly Express example

```python
df = px.data.gapminder().query("year == 2007")
fig = px.scatter(
    df,
    x="gdpPercap",
    y="lifeExp",
    color="continent",
    size="pop",
    log_x=True,
    title="Gapminder 2007"
)
fig.show()
```

### 6.3 Graph Objects example

```python
fig = go.Figure()
fig.add_trace(go.Scatter(x=, y=, mode="lines+markers", name="Squared"))[3][4][6][1][2]
fig.add_trace(go.Scatter(x=, y=, mode="lines", name="Linear"))[1][2][3]
fig.show()
```

---

## 7. Bar and histogram charts

Bar charts are useful for categorical comparison, while histograms show distributions.

### 7.1 Use cases

- Compare categories.
- Show counts or totals.
- Visualize distributions and frequencies.

### 7.2 Example: bar chart

```python
df = pd.DataFrame({"city": ["Berlin", "Köln", "Munich"], "population": [3.7, 1.1, 1.5]})
fig = px.bar(df, x="city", y="population", title="Population")
fig.show()
```

### 7.3 Example: histogram

```python
df = px.data.tips()
fig = px.histogram(df, x="total_bill", nbins=20, title="Bill distribution")
fig.show()
```

---

## 8. Box, violin, and strip plots

These plots are useful for comparing distributions across groups.

### 8.1 Use cases

- Detect spread and outliers.
- Compare group distributions.
- Visualize medians and quartiles.

### 8.2 Example

```python
df = px.data.tips()
fig = px.box(df, x="day", y="total_bill", color="sex", title="Bills by day")
fig.show()
```

### 8.3 Example use

```python
fig = px.violin(df, x="day", y="tip", box=True, points="all")
fig.show()
```

---

## 9. Pie and funnel charts

These charts are used for proportions and sequential stages.

### 9.1 Use cases

- Show part-to-whole relationships.
- Represent pipeline or process drop-off.

### 9.2 Example: pie chart

```python
df = pd.DataFrame({"label": ["A", "B", "C"], "value": })[7]
fig = px.pie(df, names="label", values="value", title="Share")
fig.show()
```

### 9.3 Example: funnel chart

```python
df = pd.DataFrame({"stage": ["Visit", "Signup", "Trial", "Paid"], "count": })[8][9]
fig = px.funnel(df, x="count", y="stage", title="Conversion Funnel")
fig.show()
```

---

## 10. Heatmaps and contour plots

These plots help visualize density, correlation, and spatial-like patterns.

### 10.1 Use cases

- Show 2D density.
- Explore bivariate concentration.
- Visualize matrices or regular grids.

### 10.2 Example: density heatmap

```python
df = px.data.iris()
fig = px.density_heatmap(df, x="sepal_width", y="sepal_length", title="Density heatmap")
fig.show()
```

### 10.3 Example: density contour

```python
fig = px.density_contour(df, x="sepal_width", y="sepal_length", title="Density contour")
fig.show()
```

---

## 11. 3D charts

Plotly supports 3D scatter, line, mesh, and surface plots.

### 11.1 Use cases

- Visualize three-dimensional relationships.
- Show surfaces or volumetric structure.
- Explore geospatial or scientific data.

### 11.2 Example: 3D scatter

```python
df = px.data.iris()
fig = px.scatter_3d(df, x="sepal_length", y="sepal_width", z="petal_length", color="species")
fig.show()
```

### 11.3 Example: surface plot

```python
x = np.linspace(-2, 2, 50)
y = np.linspace(-2, 2, 50)
X, Y = np.meshgrid(x, y)
Z = np.sin(X**2 + Y**2)

fig = go.Figure(data=[go.Surface(x=X, y=Y, z=Z)])
fig.show()
```

---

## 12. Geographic charts

Plotly includes several options for geographic data visualization.

### 12.1 Use cases

- Map point locations.
- Display thematic choropleth values.
- Show routes or spatial distributions.

### 12.2 Example: geographic scatter

```python
df = pd.DataFrame({
    "city": ["Berlin", "Köln", "Munich"],
    "lat": [52.52, 50.94, 48.14],
    "lon": [13.40, 6.96, 11.58],
    "value":[10]
})
fig = px.scatter_geo(df, lat="lat", lon="lon", color="value", text="city", title="Cities")
fig.show()
```

### 12.3 Example: choropleth

```python
df = pd.DataFrame({"country": ["DEU", "FRA", "NLD"], "value": })[11][10]
fig = px.choropleth(df, locations="country", color="value", locationmode="ISO-3", title="Country values")
fig.show()
```

---

## 13. Hierarchical charts

Hierarchy charts show nested relationships between categories.

### 13.1 Use cases

- Explore composition across levels.
- Show parent-child category structure.
- Summarize hierarchical data.

### 13.2 Common methods

- **`px.treemap()`** - Nested rectangles.
- **`px.sunburst()`** - Nested rings.
- **`px.icicle()`** - Nested vertical rectangles.

### 13.3 Example

```python
df = px.data.tips()
fig = px.treemap(df, path=["day", "sex"], values="total_bill", title="Treemap")
fig.show()
```

---

## 14. Animation and faceting

Facets split plots into multiple panels, while animations step through time or categories.

### 14.1 Use cases

- Compare multiple subgroups.
- Show trends across time.
- Create small-multiple visual analysis.

### 14.2 Example: facet plot

```python
df = px.data.tips()
fig = px.scatter(df, x="total_bill", y="tip", facet_col="sex", color="day")
fig.show()
```

### 14.3 Example: animation

```python
df = px.data.gapminder()
fig = px.scatter(df, x="gdpPercap", y="lifeExp", animation_frame="year", color="continent", size="pop")
fig.show()
```

---

## 15. Layout and styling

Plotly figures are highly customizable through layout and theme settings.

### 15.1 Common layout methods

- **`update_layout()`** - Change title, margins, legend, template, and more.
- **`update_traces()`** - Change markers, lines, hover, and text.
- **`update_xaxes()`** - Customize x-axis.
- **`update_yaxes()`** - Customize y-axis.

### 15.2 Common styling options

- `template`
- `title`
- `width`
- `height`
- `margin`
- `font`
- `colorway`
- `showlegend`

### 15.3 Example

```python
fig = px.line(df, x="year", y="value", title="Trend")
fig.update_layout(template="plotly_dark", width=900, height=500)
fig.show()
```

---

## 16. Hover, labels, and text

Hover interactions are one of Plotly’s major strengths.

### 16.1 Common options

- **`hover_data`** - Add extra hover fields.
- **`hover_name`** - Bold label in hover tooltip.
- **`text`** - Display text on marks.
- **`labels`** - Rename displayed field names.
- **`hovertemplate`** - Fine control over hover content.

### 16.2 Example

```python
fig = px.scatter(
    df,
    x="gdpPercap",
    y="lifeExp",
    hover_data=["country", "pop"],
    labels={"gdpPercap": "GDP per Capita", "lifeExp": "Life Expectancy"}
)
fig.show()
```

---

## 17. Exporting figures

Plotly figures can be saved as interactive HTML or static files.

### 17.1 Common export methods

- **`write_html()`** - Save interactive HTML.
- **`write_image()`** - Save static image.
- **`to_html()`** - Return HTML string.
- **`show()`** - Display figure.

### 17.2 Example

```python
fig.write_html("plot.html")
fig.write_image("plot.png")
```

---

## 18. Use case guide

### 18.1 When to use Plotly Express

- Fast exploratory visualization.
- DataFrame-based analysis.
- Interactive dashboards.
- Small to medium complexity charts.

### 18.2 When to use Graph Objects

- Fine control over traces and layout.
- Multiple custom traces in one figure.
- Financial, scientific, or highly customized charts.
- Advanced annotation or subplot control.

---

## 19. Useful workflow examples

### 19.1 Scatter with trend and facets

```python
df = px.data.tips()
fig = px.scatter(df, x="total_bill", y="tip", color="smoker", facet_col="time", trendline="ols")
fig.show()
```

### 19.2 Grouped bar chart

```python
df = pd.DataFrame({
    "region": ["A", "A", "B", "B"],
    "type": ["X", "Y", "X", "Y"],
    "value":[12][13][14][10]
})
fig = px.bar(df, x="region", y="value", color="type", barmode="group")
fig.show()
```

### 19.3 Line chart with markers

```python
fig = px.line(df, x="year", y="value", markers=True)
fig.show()
```

---

## 20. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Plotly Express | `px.scatter()`, `px.line()`, `px.bar()` | Fast chart creation. |
| Distributions | `px.histogram()`, `px.box()`, `px.violin()` | Explore data spread. |
| Hierarchy | `px.treemap()`, `px.sunburst()` | Show nested structure. |
| Maps | `px.scatter_geo()`, `px.choropleth()` | Visualize spatial data. |
| 3D | `px.scatter_3d()`, `go.Surface()` | Show three-dimensional data. |
| Layout | `update_layout()` | Control figure appearance. |
| Trace edits | `update_traces()` | Refine markers, lines, and hover. |
| Export | `write_html()`, `write_image()` | Save interactive or static outputs. |

---

## 21. Example full workflow

```python
import plotly.express as px

df = px.data.gapminder().query("year == 2007")
fig = px.scatter(
    df,
    x="gdpPercap",
    y="lifeExp",
    color="continent",
    size="pop",
    hover_name="country",
    log_x=True,
    template="plotly_white",
    title="Gapminder 2007"
)
fig.update_traces(marker=dict(opacity=0.7))
fig.show()
```