---
hide:
  - toc
---

# Complete Pandas Methods Reference

## 1. Core concepts

Pandas is a Python library for working with tabular, time series, and labeled data. The main data structures are `Series` for 1D data and `DataFrame` for 2D tabular data.

### 1.1 Main objects

- **Series**: one-dimensional labeled data.
- **DataFrame**: two-dimensional labeled table.
- **Index**: row labels.
- **Columns**: column labels.

### 1.2 Common imports

```python
import pandas as pd
import numpy as np
```

### 1.3 Basic DataFrame example

```python
import pandas as pd

df = pd.DataFrame({
    "city": ["Berlin", "Köln", "Munich"],
    "population": [3.7, 1.1, 1.5]
})
df
```

---

## 2. Creating data

Pandas can create data structures from dictionaries, lists, arrays, CSV files, Excel files, SQL tables, and more.

### 2.1 Common constructors

- **`pd.DataFrame()`** - Create a DataFrame.
- **`pd.Series()`** - Create a Series.
- **`pd.Index()`** - Create an Index.
- **`pd.array()`** - Create a pandas array.
- **`pd.Categorical()`** - Create categorical data.

### 2.2 File reading methods

- **`pd.read_csv()`** - Read CSV files.
- **`pd.read_excel()`** - Read Excel files.
- **`pd.read_json()`** - Read JSON files.
- **`pd.read_html()`** - Read tables from HTML.
- **`pd.read_sql()`** - Read SQL query results.
- **`pd.read_parquet()`** - Read Parquet files.
- **`pd.read_feather()`** - Read Feather files.
- **`pd.read_pickle()`** - Read pickle files.
- **`pd.read_clipboard()`** - Read tabular clipboard data.

### 2.3 Example

```python
df = pd.read_csv("data.csv")
```

---

## 3. Inspecting data

Inspection methods help you understand structure, columns, data types, and missing values quickly.

### 3.1 Common methods and attributes

- **`df.head()`** - Show first rows.
- **`df.tail()`** - Show last rows.
- **`df.sample()`** - Random sample of rows.
- **`df.shape`** - Number of rows and columns.
- **`df.columns`** - Column labels.
- **`df.index`** - Index labels.
- **`df.dtypes`** - Data types of columns.
- **`df.info()`** - Concise summary.
- **`df.describe()`** - Descriptive statistics.
- **`df.memory_usage()`** - Memory usage of columns.

### 3.2 Example

```python
df.head(5)
df.info()
df.describe()
```

---

## 4. Selecting data

Pandas provides several ways to select rows, columns, and subsets.

### 4.1 Column selection

- **`df["col"]`** - Select a single column.
- **`df[["col1", "col2"]]`** - Select multiple columns.
- **`df.filter()`** - Filter columns by name or pattern.

### 4.2 Row selection

- **`df.loc[]`** - Label-based selection.
- **`df.iloc[]`** - Position-based selection.
- **`df.at[]`** - Fast scalar access by label.
- **`df.iat[]`** - Fast scalar access by position.

### 4.3 Example

```python
df["population"]
df[["city", "population"]]
df.loc[0:2, ["city", "population"]]
df.iloc[0:2, 0:2]
```

---

## 5. Filtering data

Filtering is used to keep rows that satisfy logical conditions.

### 5.1 Common methods

- **`df.query()`** - Filter with expressions.
- **`df.isin()`** - Test membership.
- **`df.where()`** - Replace values that do not meet condition.
- **`df.mask()`** - Mask values that meet condition.

### 5.2 Example

```python
df[df["population"] > 2]
df.query("population > 2")
df[df["city"].isin(["Berlin", "Munich"])]
```

---

## 6. Sorting and ranking

Sorting methods help organize data by values or by index.

### 6.1 Common methods

- **`df.sort_values()`** - Sort by one or more columns.
- **`df.sort_index()`** - Sort by index.
- **`df.rank()`** - Assign ranks to values.
- **`df.nlargest()`** - Return top rows by largest values.
- **`df.nsmallest()`** - Return top rows by smallest values.

### 6.2 Example

```python
df.sort_values("population", ascending=False)
df.sort_index()
```

---

## 7. Missing data

Pandas has many tools for detecting, removing, and filling missing values.

### 7.1 Common methods

- **`df.isna()`** - Detect missing values.
- **`df.isnull()`** - Same as `isna()`.
- **`df.notna()`** - Detect non-missing values.
- **`df.dropna()`** - Remove missing values.
- **`df.fillna()`** - Fill missing values.
- **`df.interpolate()`** - Fill missing values by interpolation.
- **`df.ffill()`** - Forward fill.
- **`df.bfill()`** - Backward fill.

### 7.2 Example

```python
df.isna()
df.dropna()
df.fillna(0)
```

---

## 8. Data cleaning

Cleaning methods help rename, reindex, replace, and deduplicate data.

### 8.1 Common methods

- **`df.rename()`** - Rename columns or index labels.
- **`df.replace()`** - Replace values.
- **`df.drop()`** - Drop rows or columns.
- **`df.drop_duplicates()`** - Remove duplicate rows.
- **`df.duplicated()`** - Detect duplicates.
- **`df.set_index()`** - Set a column as the index.
- **`df.reset_index()`** - Reset the index.
- **`df.astype()`** - Convert data types.
- **`df.convert_dtypes()`** - Infer better dtypes.

### 8.2 Example

```python
df = df.rename(columns={"population": "pop"})
df = df.drop_duplicates()
df = df.set_index("city")
```

---

## 9. Column operations

Pandas makes it easy to create, modify, transform, and combine columns.

### 9.1 Common methods

- **`df.assign()`** - Create new columns.
- **`df.pop()`** - Remove and return a column.
- **`df.insert()`** - Insert a column at a position.
- **`df.apply()`** - Apply a function along an axis.
- **`df.map()`** - Map values in a Series.
- **`df.transform()`** - Transform values and keep shape.
- **`df.clip()`** - Limit values to bounds.
- **`df.round()`** - Round numeric values.
- **`df.abs()`** - Absolute values.
- **`df.cumsum()`** - Cumulative sum.
- **`df.cumprod()`** - Cumulative product.
- **`df.diff()`** - Difference between rows.

### 9.2 Example

```python
df["density"] = df["population"] / df["area"]
df = df.assign(pop_km2=df["population"] / df["area"])
```

---

## 10. Statistics and aggregation

Pandas includes many methods for descriptive statistics and summary calculations.

### 10.1 Common methods

- **`df.sum()`** - Sum values.
- **`df.mean()`** - Mean value.
- **`df.median()`** - Median value.
- **`df.min()`** - Minimum value.
- **`df.max()`** - Maximum value.
- **`df.count()`** - Count non-missing values.
- **`df.std()`** - Standard deviation.
- **`df.var()`** - Variance.
- **`df.quantile()`** - Quantile values.
- **`df.corr()`** - Correlation matrix.
- **`df.cov()`** - Covariance matrix.
- **`df.agg()`** - Aggregate with one or more functions.

### 10.2 Example

```python
df["population"].mean()
df[["population", "area"]].corr()
df.agg({"population": ["sum", "mean"], "area": "mean"})
```

---

## 11. Grouping data

Grouping is one of the most powerful pandas features for summarizing data by category.

### 11.1 Common methods

- **`df.groupby()`** - Group by one or more keys.
- **`grouped.sum()`** - Sum within groups.
- **`grouped.mean()`** - Mean within groups.
- **`grouped.agg()`** - Multiple aggregations.
- **`grouped.size()`** - Size of each group.
- **`grouped.count()`** - Count non-missing values.
- **`grouped.transform()`** - Transform within groups.
- **`grouped.apply()`** - Apply custom function to each group.
- **`grouped.filter()`** - Filter groups by condition.

### 11.2 Example

```python
grouped = df.groupby("region")
grouped["population"].sum()
grouped.agg({"population": "mean", "area": "sum"})
```

---

## 12. Reshaping data

Reshaping changes the structure of data without changing the underlying information.

### 12.1 Common methods

- **`df.pivot()`** - Reshape from long to wide.
- **`df.pivot_table()`** - Create pivot table with aggregation.
- **`pd.melt()`** - Unpivot wide to long.
- **`df.stack()`** - Pivot columns into rows.
- **`df.unstack()`** - Pivot index levels into columns.
- **`df.explode()`** - Expand list-like values into rows.
- **`df.swaplevel()`** - Swap index levels.
- **`df.reorder_levels()`** - Reorder MultiIndex levels.

### 12.2 Example

```python
wide = df.pivot(index="city", columns="year", values="population")
long = pd.melt(df, id_vars=["city"], value_vars=["2020", "2021"])
```

---

## 13. Combining datasets

Pandas supports joins, merges, concatenation, and alignment of multiple tables.

### 13.1 Common methods

- **`pd.concat()`** - Concatenate objects along an axis.
- **`df.merge()`** - Database-style join.
- **`df.join()`** - Join on index or keys.
- **`df.combine_first()`** - Update missing values from another object.
- **`df.update()`** - Modify in place with non-missing values.
- **`df.align()`** - Align two objects on labels.

### 13.2 Example

```python
result = df1.merge(df2, on="id", how="left")
combined = pd.concat([df1, df2], axis=0)
```

---

## 14. Time series

Pandas has strong support for datetime, period, and timedelta data.

### 14.1 Common functions

- **`pd.to_datetime()`** - Convert to datetime.
- **`pd.to_timedelta()`** - Convert to timedelta.
- **`pd.date_range()`** - Create date index.
- **`pd.period_range()`** - Create period index.
- **`pd.timedelta_range()`** - Create timedelta range.
- **`df.resample()`** - Resample time series data.
- **`df.rolling()`** - Rolling window calculations.
- **`df.expanding()`** - Expanding window calculations.
- **`df.shift()`** - Shift values by periods.
- **`df.asfreq()`** - Convert to a different frequency.
- **`df.tz_localize()`** - Localize timezone.
- **`df.tz_convert()`** - Convert timezone.

### 14.2 Example

```python
df["date"] = pd.to_datetime(df["date"])
df = df.set_index("date")
monthly = df.resample("M").mean()
```

---

## 15. Strings and text

String methods are accessed through `Series.str` and are useful for cleaning and parsing text.

### 15.1 Common methods

- **`str.lower()`**
- **`str.upper()`**
- **`str.strip()`**
- **`str.contains()`**
- **`str.replace()`**
- **`str.split()`**
- **`str.extract()`**
- **`str.startswith()`**
- **`str.endswith()`**
- **`str.len()`**
- **`str.cat()`**

### 15.2 Example

```python
df["city"] = df["city"].str.strip().str.title()
```

---

## 16. Categoricals

Categorical data is efficient for repeated labels and ordered categories.

### 16.1 Common methods

- **`df.astype("category")`** - Convert to categorical.
- **`pd.Categorical()`** - Create categorical arrays.
- **`cat.categories`** - Category labels.
- **`cat.codes`** - Integer codes.
- **`cat.add_categories()`** - Add categories.
- **`cat.remove_categories()`** - Remove categories.
- **`cat.reorder_categories()`** - Reorder categories.
- **`cat.as_ordered()`** - Set ordered categorical.

### 16.2 Example

```python
df["landuse"] = df["landuse"].astype("category")
```

---

## 17. Input and output

Pandas can write data to many file formats.

### 17.1 Common output methods

- **`df.to_csv()`** - Write CSV.
- **`df.to_excel()`** - Write Excel.
- **`df.to_json()`** - Write JSON.
- **`df.to_html()`** - Write HTML.
- **`df.to_sql()`** - Write to SQL table.
- **`df.to_parquet()`** - Write Parquet.
- **`df.to_feather()`** - Write Feather.
- **`df.to_pickle()`** - Write pickle.
- **`df.to_markdown()`** - Write markdown table.
- **`df.to_clipboard()`** - Copy to clipboard.

### 17.2 Example

```python
df.to_csv("output.csv", index=False)
df.to_markdown()
```

---

## 18. Window functions

Window functions support rolling, expanding, and exponentially weighted calculations.

### 18.1 Common methods

- **`df.rolling()`** - Rolling window.
- **`df.expanding()`** - Expanding window.
- **`df.ewm()`** - Exponential weighted window.

### 18.2 Example

```python
df["rolling_mean"] = df["value"].rolling(window=3).mean()
```

---

## 19. Plotting

Pandas integrates with Matplotlib for quick plotting.

### 19.1 Common methods

- **`df.plot()`** - General plotting interface.
- **`df.plot.line()`** - Line plot.
- **`df.plot.bar()`** - Bar plot.
- **`df.plot.hist()`** - Histogram.
- **`df.plot.box()`** - Box plot.
- **`df.plot.scatter()`** - Scatter plot.
- **`df.plot.area()`** - Area plot.
- **`df.plot.pie()`** - Pie chart.

### 19.2 Example

```python
df["population"].plot(kind="bar")
```

---

## 20. Utility methods

These methods help with checking structure, copying, and testing transformations.

### 20.1 Common methods

- **`df.copy()`** - Copy a DataFrame.
- **`df.equals()`** - Check equality.
- **`df.compare()`** - Compare two DataFrames.
- **`df.any()`** - Any true values.
- **`df.all()`** - All true values.
- **`df.empty`** - Check if empty.
- **`df.T`** - Transpose.
- **`df.squeeze()`** - Reduce dimensions when possible.
- **`df.pipe()`** - Chain operations cleanly.

### 20.2 Example

```python
result = (
    df.copy()
      .query("population > 1")
      .assign(density=lambda x: x["population"] / x["area"])
      .sort_values("density", ascending=False)
)
```

---

## 21. Useful workflow examples

### 21.1 Clean and summarize

```python
import pandas as pd

df = pd.read_csv("data.csv")
df = df.drop_duplicates()
df["date"] = pd.to_datetime(df["date"], errors="coerce")
summary = df.groupby("region").agg({"population": "sum", "area": "sum"})
```

### 21.2 Merge two tables

```python
merged = df1.merge(df2, on="id", how="left")
```

### 21.3 Reshape and plot

```python
pivot = df.pivot_table(index="year", columns="region", values="value", aggfunc="mean")
pivot.plot()
```

---

## 22. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Creation | `pd.DataFrame()`, `pd.Series()`, `pd.read_csv()` | Build or load data. |
| Inspection | `head()`, `info()`, `describe()` | Understand structure. |
| Selection | `loc[]`, `iloc[]`, `at[]`, `iat[]` | Access rows and columns. |
| Filtering | `query()`, `isin()`, `where()` | Keep rows that match conditions. |
| Cleaning | `dropna()`, `fillna()`, `replace()`, `drop_duplicates()` | Fix missing and inconsistent data. |
| Grouping | `groupby()`, `agg()`, `transform()` | Summarize by categories. |
| Reshaping | `pivot()`, `melt()`, `stack()`, `unstack()` | Change table layout. |
| Combining | `merge()`, `join()`, `concat()` | Combine multiple tables. |
| Time series | `to_datetime()`, `resample()`, `rolling()` | Work with dates and time windows. |
| Export | `to_csv()`, `to_excel()`, `to_parquet()` | Save results. |