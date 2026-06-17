---

hide:

* toc

---

# Complete Seaborn Methods Reference

## 1. Core concepts

Seaborn is a high-level data visualization library built on top of Matplotlib. It integrates deeply with Pandas DataFrames and automates complex statistical aggregations, mapping, and layout configurations.

### 1.1 Main objects and structural concepts

* **Figure-level functions**: Functions (like `relplot`, `displot`, `catplot`, `lmplot`) that manage their own Matplotlib figure, typically creating a `FacetGrid`. They are ideal for creating multi-plot grids split by categorical variables.
* **Axes-level functions**: Functions (like `scatterplot`, `barplot`, `kdeplot`) that draw data directly onto an active or explicitly passed Matplotlib `Axes` object. They behave like standard Matplotlib plotting functions.
* **FacetGrid / PairGrid / JointGrid**: Special Seaborn objects that manage complex multi-plot layouts and handle internal coordinate mapping.

### 1.2 Common import patterns

```python
import seaborn as sns
import matplotlib.pyplot as plt

```

### 1.3 Recommended DataFrame-driven pattern

```python
import seaborn as sns
import plt from matplotlib.pyplot

# Load a built-in dataset
tips = sns.load_dataset("tips")

# Object-oriented/Axes-level setup
fig, ax = plt.subplots(figsize=(8, 5))
sns.scatterplot(data=tips, x="total_bill", y="tip", hue="smoker", style="time", ax=ax)

ax.set_title("Tips Analysis by Smoker Status")
plt.show()

```

---

## 2. Figure-level vs. Axes-level architecture

Understanding the distinction between Figure-level and Axes-level functions is critical for controlling layouts, multi-panels, and figure sizes.

### 2.1 Interface comparison

* **Axes-level (`ax=`)**: Accepts an existing Matplotlib axis. Modifies figure sizes via standard `plt.subplots(figsize=(...))`.
* **Figure-level**: Creates a brand new figure. Modifies size using `height` and `aspect` parameters directly inside the function call.

### 2.2 Core structural wrappers

* **`sns.FacetGrid()`** - Multi-plot grid for mapping datasets onto shared subplots.
* **`sns.PairGrid()`** - Subplot grid for plotting pairwise relationships in a dataset.
* **`sns.JointGrid()`** - Grid for drawing a bivariate plot with marginal univariate plots.

### 2.3 Common signatures

```python
# Axes-level plotting on predefined subplots
fig, axs = plt.subplots(1, 2, figsize=(10, 4))
sns.histplot(data=df, x="age", ax=axs[0])
sns.kdeplot(data=df, x="age", ax=axs[1])

# Figure-level plotting managing its own grid
g = sns.relplot(data=df, x="weight", y="height", col="gender", row="diet", height=4, aspect=1.2)

```

---

## 3. Relational plots

Used to visualize statistical relationships between quantitative variables.

### 3.1 Plotting functions

* **`sns.relplot()`** - Figure-level interface for relational visualizations (defaults to `kind="scatter"`).
* **`sns.scatterplot()`** - Axes-level scatter plot with semantic mapping options (`hue`, `size`, `style`).
* **`sns.lineplot()`** - Axes-level line plot with automated bootstrap confidence interval estimations for repeated measurements.

### 3.2 Common semantic parameters

* `data`: Pandas DataFrame or wide-form array structure.
* `x`, `y`: Variable names corresponding to columns in `data`.
* `hue`: Grouping variable that produces elements with different colors.
* `size`: Grouping variable that produces elements with different sizes.
* `style`: Grouping variable that produces elements with different markers/linestyles.

---

## 4. Distribution plots

Used to assess and evaluate univariate or bivariate distributions of data.

### 4.1 Plotting functions

* **`sns.displot()`** - Figure-level interface for distribution visualizations (defaults to `kind="hist"`).
* **`sns.histplot()`** - Axes-level histogram with options for binwidth, count/density metrics, and stacking.
* **`sns.kdeplot()`** - Axes-level Kernel Density Estimate plot for smoothing observations.
* **`sns.ecdfplot()`** - Axes-level Empirical Cumulative Distribution Function plot.
* **`sns.rugplot()`** - Draws marginal ticks along axes to show individual data points.

---

## 5. Categorical plots

Used to analyze relationships containing non-numeric data types or discrete groups.

### 5.1 Plotting functions

* **`sns.catplot()`** - Figure-level interface for categorical plots (defaults to `kind="strip"`).
* **Categorical scatter plots:**
* **`sns.stripplot()`** - Draws a scatter plot where one variable is categorical.
* **`sns.swarmplot()`** - Similar to a strip plot, but positions points automatically to avoid overlap.


* **Categorical distribution plots:**
* **`sns.boxplot()`** - Displays box-and-whisker plots to show quartiles and outliers.
* **`sns.violinplot()`** - Combines a box plot with a kernel density estimation wrapper.
* **`sns.boxenplot()`** - Optimized box plot design for larger datasets (Letter-value plot).


* **Categorical estimate plots:**
* **`sns.barplot()`** - Computes point estimates (mean by default) and bootstrapped confidence intervals.
* **`sns.pointplot()`** - Estimates central tendency with points and connecting lines.
* **`sns.countplot()`** - Uses bars to show the frequency counts of categorical bins.



---

## 6. Regression plots

Used to draw linear regression models across scatter patterns.

### 6.1 Plotting functions

* **`sns.lmplot()`** - Figure-level regression wrapper combining `regplot()` and `FacetGrid`.
* **`sns.regplot()`** - Axes-level linear regression model fitter and scatter plotter.
* **`sns.residplot()`** - Plots the residuals of a linear regression model to check homoscedasticity.

### 6.2 Advanced parameters

* `order`: Integer specifying the polynomial regression order (e.g., `order=2` for quadratic).
* `logistic`: Boolean to fit a logistic regression model if the target is binary.
* `robust`: Uses `statsmodels` to calculate robust regressions downplaying outliers.

---

## 7. Matrix plots

Used to map two-dimensional data arrays using variations in color.

### 7.1 Plotting functions

* **`sns.heatmap()`** - Plots rectangular data matrices as a color-encoded grid.
* **`sns.clustermap()`** - Hierarchically clusters rows and columns and visualizes the resulting matrix dendrograms.

```python
# Typical correlation matrix usage
corr = tips.corr(numeric_only=True)
sns.heatmap(corr, annot=True, cmap="coolwarm", fmt=".2f")

```

---

## 8. Multi-plot grids

Advanced object wrappers for custom facet mapping.

### 8.1 Key grid structures

* **`sns.pairplot()`** - Quick high-level function to map pairwise relationships across all numerical dataframe columns.
* **`sns.jointplot()`** - Quick function that pairs a bivariate relationship with marginal univariate summary distributions.

### 8.2 Grid interaction methods

* **`g.map()`** - Apply a plotting function to every subplot within a grid.
* **`g.map_diag()`** / **`g.map_offdiag()`** - Apply distinct plotting functions exclusively to diagonal vs. non-diagonal axes.
* **`g.savefig()`** - Directly export the entire multi-panel grid figure.

---

## 9. Styling, themes, and palettes

Seaborn features an integrated global configuration system for quick look-and-feel adjustments.

### 9.1 Aesthetic configurations

* **`sns.set_theme()`** - Multi-parameter wrapper to change themes, palettes, and scales simultaneously.
* **`sns.set_style()`** - Modifies background styles. Options: `"white"`, `"dark"`, `"whitegrid"`, `"darkgrid"`, `"ticks"`.
* **`sns.set_context()`** - Scales plot text elements and lines for different settings. Options: `"paper"`, `"notebook"`, `"talk"`, `"poster"`.
* **`sns.despine()`** - Removes top and right spine boundaries from plots.

### 9.2 Color palettes

* **`sns.set_palette()`** - Assigns a default global color theme.
* **`sns.color_palette()`** - Returns or evaluates a collection of colors (e.g., `"viridis"`, `"rocket"`, `"crests"`, `"muted"`).

---

## 10. Useful workflow examples

### 10.1 Multi-facet categorical analysis

```python
import seaborn as sns
import matplotlib.pyplot as plt

df = sns.load_dataset("penguins")

# Figure-level generation
g = sns.catplot(
    data=df, 
    x="species", 
    y="body_mass_g", 
    hue="sex", 
    col="island", 
    kind="box", 
    height=4, 
    aspect=0.8
)
plt.show()

```

### 10.2 Structured Joint Plot with Density Contours

```python
import seaborn as sns
import matplotlib.pyplot as plt

df = sns.load_dataset("iris")

# Bivariate layout with marginal graphs
g = sns.jointplot(
    data=df, 
    x="sepal_length", 
    y="sepal_width", 
    hue="species", 
    kind="kde",
    alpha=0.7
)
plt.show()

```

---

## 11. Quick reference summary table

| Function Family | Figure-Level Wrapper | Axes-Level Functions | Common Use Cases |
| --- | --- | --- | --- |
| **Relational** | `sns.relplot()` | `scatterplot()`, `lineplot()` | Evaluating trends, correlations, and continuous patterns. |
| **Distribution** | `sns.displot()` | `histplot()`, `kdeplot()`, `ecdfplot()`, `rugplot()` | Verifying variance, frequency counts, probability spreads, and skewness. |
| **Categorical** | `sns.catplot()` | `stripplot()`, `swarmplot()`, `boxplot()`, `violinplot()`, `boxenplot()`, `barplot()`, `pointplot()`, `countplot()` | Comparing metrics, summaries, and frequencies across discrete groups. |
| **Regression** | `sns.lmplot()` | `regplot()`, `residplot()` | Modeling linear trend projections and testing residual assumptions. |
| **Matrix** | *N/A* | `heatmap()`, `clustermap()` | Visualizing correlation tables, confusion matrices, and pivot tables. |
| **Grids** | `pairplot()`, `jointplot()` | *N/A* | Broad EDA over entire multi-variable datasets. |