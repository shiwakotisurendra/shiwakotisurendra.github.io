---
hide:
  - toc
---

# Complete Matplotlib Methods Reference

## 1. Core concepts

Matplotlib provides both a state-based `pyplot` interface and an object-oriented interface built around `Figure` and `Axes` objects. The object-oriented approach is the recommended pattern when more control and customization are needed.

### 1.1 Main objects

- **Figure**: the top-level container for everything drawn in a plot.
- **Axes**: the plotting area where most data, labels, scales, and annotations are added.
- **Artist**: everything visible on a figure, including lines, text, axes, legends, and patches.
- **Canvas**: the rendering target where artists are drawn.

### 1.2 Common import patterns

```python
import matplotlib.pyplot as plt
import matplotlib as mpl
```

### 1.3 Recommended object-oriented pattern

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 200)
y = np.sin(x)

fig, ax = plt.subplots()
ax.plot(x, y)
ax.set_title("Sine wave")
ax.set_xlabel("x")
ax.set_ylabel("sin(x)")
plt.show()
```

---

## 2. Figure creation

Figures can be created directly with `plt.figure()` or more commonly with `plt.subplots()`, which returns both the `Figure` and one or more `Axes` objects.

### 2.1 Core figure methods

- **`plt.figure()`** - Create a new empty figure.
- **`plt.subplots()`** - Create a figure and a grid of subplots in one call.
- **`fig.add_axes()`** - Add axes at an explicit position in figure coordinates.
- **`fig.add_subplot()`** - Add a subplot by grid position.
- **`fig.subplots()`** - Create subplots from an existing figure.
- **`fig.suptitle()`** - Add a figure-level title.
- **`fig.text()`** - Add text in figure coordinates.
- **`fig.legend()`** - Add a figure-level legend.
- **`fig.colorbar()`** - Add a colorbar linked to a mappable artist.
- **`fig.savefig()`** - Save the figure to a file.
- **`fig.set_facecolor()`** - Set figure background color.
- **`plt.close()`** - Close a figure and release memory.

### 2.2 Common signatures

```python
plt.figure(figsize=(8, 5), dpi=100)
fig, ax = plt.subplots(nrows=2, ncols=2, figsize=(10, 6), layout="constrained")
fig.add_axes([0.1, 0.1, 0.8, 0.8])
```

---

## 3. Axes basics

The `Axes` object is the main gateway to plotting methods, axis labels, titles, limits, scales, and styling. Most plotting work happens through methods called on `ax`.

### 3.1 Core axes methods

- **`ax.plot()`** - Plot lines or markers.
- **`ax.scatter()`** - Plot point markers.
- **`ax.bar()`** - Plot vertical bars.
- **`ax.barh()`** - Plot horizontal bars.
- **`ax.hist()`** - Plot histograms.
- **`ax.imshow()`** - Display image or raster-like arrays.
- **`ax.contour()`** - Draw contour lines.
- **`ax.contourf()`** - Draw filled contours.
- **`ax.boxplot()`** - Draw boxplots.
- **`ax.violinplot()`** - Draw violin plots.
- **`ax.errorbar()`** - Plot data with error bars.
- **`ax.fill_between()`** - Fill area between curves.
- **`ax.stem()`** - Plot stem charts.
- **`ax.step()`** - Plot step lines.
- **`ax.stackplot()`** - Plot stacked area charts.
- **`ax.pie()`** - Plot a pie chart.

### 3.2 Titles and labels

- **`ax.set_title()`** - Set axes title.
- **`ax.set_xlabel()`** - Set x-axis label.
- **`ax.set_ylabel()`** - Set y-axis label.
- **`ax.set()`** - Set multiple properties in one call.

### 3.3 Limits and scales

- **`ax.set_xlim()`** - Set x limits.
- **`ax.set_ylim()`** - Set y limits.
- **`ax.set_xscale()`** - Set x scale, such as `linear` or `log`.
- **`ax.set_yscale()`** - Set y scale.
- **`ax.invert_xaxis()`** - Reverse x direction.
- **`ax.invert_yaxis()`** - Reverse y direction.

### 3.4 Ticks and grids

- **`ax.set_xticks()`** - Set x tick positions.
- **`ax.set_yticks()`** - Set y tick positions.
- **`ax.set_xticklabels()`** - Set x tick labels.
- **`ax.set_yticklabels()`** - Set y tick labels.
- **`ax.tick_params()`** - Style ticks and tick labels.
- **`ax.grid()`** - Toggle or style grid lines.
- **`ax.minorticks_on()`** - Enable minor ticks.
- **`ax.minorticks_off()`** - Disable minor ticks.

---

## 4. Pyplot interface

`matplotlib.pyplot` is a state-based interface that changes the current figure and axes implicitly, which makes it convenient for interactive work and simple scripts.

### 4.1 Frequently used pyplot methods

- **`plt.plot()`** - Plot on the current axes.
- **`plt.scatter()`** - Scatter plot on the current axes.
- **`plt.bar()`** - Bar chart on the current axes.
- **`plt.hist()`** - Histogram on the current axes.
- **`plt.imshow()`** - Show an image.
- **`plt.title()`** - Set title on current axes.
- **`plt.xlabel()`** - Set x label.
- **`plt.ylabel()`** - Set y label.
- **`plt.legend()`** - Add legend.
- **`plt.grid()`** - Add or style grid.
- **`plt.xlim()`** - Set x limits.
- **`plt.ylim()`** - Set y limits.
- **`plt.tight_layout()`** - Improve subplot spacing.
- **`plt.show()`** - Display the figure.
- **`plt.savefig()`** - Save the current figure.

### 4.2 When pyplot works well

- Quick exploratory plots.
- Interactive sessions and notebooks.
- Small scripts with a single figure or simple layouts.

---

## 5. Artists

Everything visible in Matplotlib is an `Artist`, and artists are usually attached to an `Axes` or a `Figure`. Helper methods such as `ax.plot()` or `ax.text()` create artist objects for you automatically.

### 5.1 Common artist categories

- **Line2D** - created by `ax.plot()`.
- **Text** - created by titles, labels, and `ax.text()`.
- **Patch** - rectangles, circles, polygons, and similar shapes.
- **Collection** - groups of objects such as scatter points.
- **Image** - created by `ax.imshow()`.
- **Legend** - created by `ax.legend()`.

### 5.2 Artist methods

- **`artist.set_visible()`** - Show or hide an artist.
- **`artist.remove()`** - Remove the artist from the axes or figure.
- **`ax.add_artist()`** - Add an artist manually to an axes.
- **`fig.add_artist()`** - Add an artist directly to a figure.

### 5.3 Example with patch artist

```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots()
circle = mpatches.Circle((0.5, 0.5), 0.25, color="steelblue")
ax.add_artist(circle)
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
plt.show()
```

---

## 6. Layout management

Matplotlib supports multiple ways to arrange axes, from simple subplot grids to more manual placement.

### 6.1 Layout methods

- **`plt.subplots()`** - Create a regular grid of axes.
- **`fig.add_subplot()`** - Add axes by subplot index.
- **`fig.add_axes()`** - Add axes at exact figure coordinates.
- **`plt.tight_layout()`** - Automatically adjust spacing.
- **`layout="constrained"`** - Use constrained layout for better spacing.
- **`fig.subplots_adjust()`** - Manually adjust subplot margins and spacing.
- **`ax.inset_axes()`** - Create inset axes.

### 6.2 Example grid layout

```python
fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(8, 5), layout="constrained")
axs.plot(, )[1][2][3][4][5]
axs.scatter(, )[2][3][1]
axs.bar(["A", "B", "C"], )[4][6][7][1]
axs.hist()[3][1][2]
```

---

## 7. Styling and appearance

Matplotlib includes style sheets and property-based customization for lines, markers, text, patches, and figure appearance.

### 7.1 Global styling

- **`plt.style.use()`** - Apply a style sheet.
- **`mpl.rcParams[...]`** - Set global defaults.
- **`mpl.rc()`** - Configure groups of rc parameters.

### 7.2 Common plot styling arguments

- `color`
- `linewidth`
- `linestyle`
- `marker`
- `markersize`
- `alpha`
- `label`
- `facecolor`
- `edgecolor`

### 7.3 Example style usage

```python
plt.style.use("ggplot")
fig, ax = plt.subplots()
ax.plot(,, color="darkred", linewidth=2, marker="o")[1][2][3][4]
```

---

## 8. Text and annotation

Text elements are artists, and annotations can be placed in data, axes, or figure coordinate systems depending on the transform used.

### 8.1 Text methods

- **`ax.text()`** - Add text at data coordinates by default.
- **`fig.text()`** - Add text in figure coordinates by default.
- **`ax.annotate()`** - Add annotation with optional arrow.
- **`ax.set_title()`** - Add title.
- **`ax.set_xlabel()`** - Add x-axis label.
- **`ax.set_ylabel()`** - Add y-axis label.

### 8.2 Annotation example

```python
fig, ax = plt.subplots()
ax.plot(, )[2][3][1]
ax.annotate("Peak", xy=(1, 3), xytext=(1.3, 3.5),
            arrowprops={"arrowstyle": "->"})
```

---

## 9. Legends and colorbars

Legends explain plotted artists, while colorbars communicate the mapping between data values and colors for images, scatter plots, and other mappables.

### 9.1 Legend methods

- **`ax.legend()`** - Add an axes-level legend.
- **`fig.legend()`** - Add a figure-level legend.
- **`ax.get_legend_handles_labels()`** - Retrieve handles and labels.

### 9.2 Colorbar methods

- **`fig.colorbar()`** - Add a colorbar to a figure.
- **`plt.colorbar()`** - Add a colorbar using pyplot state.

---

## 10. Transforms and coordinates

Matplotlib uses built-in transforms such as data coordinates, axes coordinates, and figure coordinates to position artists precisely. `ax.transData` uses data space, `ax.transAxes` maps the axes from 0 to 1, and `fig.transFigure` maps the figure from 0 to 1.

### 10.1 Important transforms

- **`ax.transData`** - Data coordinate system.
- **`ax.transAxes`** - Axes coordinate system from `(0, 0)` to `(1, 1)`.
- **`fig.transFigure`** - Figure coordinate system from `(0, 0)` to `(1, 1)`.
- **`matplotlib.transforms`** - Utilities for custom transforms.

### 10.2 Example with axes coordinates

```python
fig, ax = plt.subplots()
ax.plot(, )[3][4][1][2]
ax.text(0.95, 0.95, "Top right", transform=ax.transAxes,
        ha="right", va="top")
```

---

## 11. Common plot types

The gallery and examples section shows a wide range of plot types, including line, scatter, bar, histogram, image, contour, and statistical graphics.

### 11.1 Basic statistical and scientific plots

- **`ax.plot()`** - Line plots.
- **`ax.scatter()`** - Scatter plots.
- **`ax.bar()` / `ax.barh()`** - Bar charts.
- **`ax.hist()`** - Histograms.
- **`ax.boxplot()`** - Boxplots.
- **`ax.violinplot()`** - Violin plots.
- **`ax.errorbar()`** - Error-bar plots.
- **`ax.fill_between()`** - Confidence or area fills.

### 11.2 Matrix and raster-like plots

- **`ax.imshow()`** - Render a 2D array as an image.
- **`ax.matshow()`** - Matrix display.
- **`ax.pcolormesh()`** - Pseudocolor mesh.
- **`ax.contour()`** - Contour lines.
- **`ax.contourf()`** - Filled contours.

---

## 12. Saving and exporting

Matplotlib figures can be saved to files with figure-level or pyplot-level save functions.

### 12.1 Export methods

- **`fig.savefig()`** - Save the current figure to a file.
- **`plt.savefig()`** - Save via pyplot.

### 12.2 Common export options

```python
fig.savefig("plot.png", dpi=300, bbox_inches="tight")
fig.savefig("plot.pdf")
fig.savefig("plot.svg")
```

---

## 13. Useful workflow examples

### 13.1 Simple line chart

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 2 * np.pi, 200)
y = np.sin(x)

fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(x, y, label="sin(x)")
ax.set_title("Sine function")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.grid(True)
ax.legend()
plt.show()
```

### 13.2 Scatter plot with color mapping

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.random.rand(100)
y = np.random.rand(100)
c = np.random.rand(100)

fig, ax = plt.subplots()
sc = ax.scatter(x, y, c=c, cmap="viridis")
fig.colorbar(sc, ax=ax)
ax.set_title("Colored scatter plot")
plt.show()
```

### 13.3 Multi-panel figure

```python
fig, axs = plt.subplots(2, 2, figsize=(10, 6), layout="constrained")
for ax in axs.flat:
    ax.plot(, )[4][1][2][3]
    ax.grid(True)
```

---

## 14. Quick reference table

| Area | Key objects or methods | Purpose |
|---|---|---|
| Figure creation | `plt.figure()`, `plt.subplots()`, `fig.add_axes()` | Create figure containers and axes. |
| Plotting | `ax.plot()`, `ax.scatter()`, `ax.bar()`, `ax.imshow()` | Draw data in different visual forms. |
| Labels | `ax.set_title()`, `ax.set_xlabel()`, `ax.set_ylabel()` | Add titles and axis labels. |
| Layout | `layout="constrained"`, `plt.tight_layout()`, `fig.subplots_adjust()` | Control spacing and arrangement. |
| Styling | `plt.style.use()`, `mpl.rcParams` | Apply visual themes and defaults. |
| Artists | `ax.add_artist()`, `artist.remove()` | Work directly with drawable objects. |
| Transforms | `ax.transData`, `ax.transAxes`, `fig.transFigure` | Position items in different coordinate systems. |
| Export | `fig.savefig()`, `plt.savefig()` | Save outputs to image or vector files. |