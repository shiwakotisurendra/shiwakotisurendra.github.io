---
hide:
  - toc
  - navigation
---

# Complete NumPy Methods Reference

## 1. Core concepts

NumPy is the foundation of numerical computing in Python. It provides fast multi-dimensional arrays and a large collection of functions for mathematical, logical, and linear algebra operations.

### 1.1 Main objects

- **`ndarray`**: the core NumPy array type.
- **`dtype`**: the data type of array elements.
- **`shape`**: the size of each dimension.
- **`ndim`**: the number of dimensions.
- **`size`**: total number of elements.

### 1.2 Common imports

```python
import numpy as np
```

### 1.3 Basic array example

```python
import numpy as np

arr = np.array()[11][12][13][14]
print(arr)
print(arr.shape)
print(arr.dtype)
```

---

## 2. Array creation

NumPy offers many ways to create arrays from lists, ranges, and generated values.

### 2.1 Common creation functions

- **`np.array()`** - Create an array from a list or tuple.
- **`np.asarray()`** - Convert input to an array if needed.
- **`np.arange()`** - Create values in a range.
- **`np.linspace()`** - Create evenly spaced values.
- **`np.logspace()`** - Create values spaced on a log scale.
- **`np.zeros()`** - Create an array filled with zeros.
- **`np.ones()`** - Create an array filled with ones.
- **`np.empty()`** - Create an uninitialized array.
- **`np.full()`** - Create an array filled with a constant value.
- **`np.eye()`** - Create an identity matrix.
- **`np.identity()`** - Create an identity matrix.
- **`np.diag()`** - Create or extract a diagonal.

### 2.2 Example

```python
import numpy as np

a = np.array()[12][13][11]
b = np.zeros((2, 3))
c = np.ones((3, 3))
d = np.eye(4)
e = np.arange(0, 10, 2)
f = np.linspace(0, 1, 5)
```

---

## 3. Array attributes

Array attributes describe structure, type, and memory layout.

### 3.1 Common attributes

- **`arr.shape`** - Dimensions of the array.
- **`arr.ndim`** - Number of dimensions.
- **`arr.size`** - Total number of elements.
- **`arr.dtype`** - Element data type.
- **`arr.itemsize`** - Size of one element in bytes.
- **`arr.nbytes`** - Total bytes consumed.
- **`arr.T`** - Transpose of the array.
- **`arr.real`** - Real part of complex values.
- **`arr.imag`** - Imaginary part of complex values.
- **`arr.flat`** - 1D iterator over elements.

### 3.2 Example

```python
import numpy as np

arr = np.array([, ], dtype=np.int32)[13][14][11][12]
print(arr.shape)
print(arr.ndim)
print(arr.size)
print(arr.dtype)
print(arr.T)
```

---

## 4. Indexing and slicing

NumPy supports fast indexing, slicing, boolean masking, and fancy indexing.

### 4.1 Basic methods and patterns

- **`arr[0]`** - Access first element.
- **`arr[start:stop:step]`** - Slice values.
- **`arr[:, 0]`** - Select first column.
- **`arr[mask]`** - Select values using boolean mask.
- **`arr[[0, 2, 4]]`** - Fancy indexing.
- **`np.where()`** - Return positions or conditional values.
- **`np.take()`** - Select elements by indices.
- **`np.put()`** - Assign values at indices.

### 4.2 Example

```python
import numpy as np

arr = np.array()[15][16][17]
print(arr[1:4])
print(arr[])[14][12]
print(arr[arr > 25])
```

---

## 5. Reshaping arrays

Reshaping changes the array shape without changing the underlying data when possible.

### 5.1 Common methods

- **`arr.reshape()`** - Change array shape.
- **`arr.resize()`** - Resize the array in place.
- **`arr.ravel()`** - Return flattened view when possible.
- **`arr.flatten()`** - Return flattened copy.
- **`arr.squeeze()`** - Remove size-1 dimensions.
- **`np.expand_dims()`** - Add a new axis.
- **`np.newaxis`** - Add axis by indexing.

### 5.2 Example

```python
import numpy as np

arr = np.arange(12)
mat = arr.reshape(3, 4)
flat = mat.ravel()
```

---

## 6. Joining and splitting

NumPy provides functions to combine arrays or split them into pieces.

### 6.1 Common methods

- **`np.concatenate()`** - Join arrays along an axis.
- **`np.stack()`** - Join arrays along a new axis.
- **`np.vstack()`** - Stack arrays vertically.
- **`np.hstack()`** - Stack arrays horizontally.
- **`np.dstack()`** - Stack arrays depth-wise.
- **`np.column_stack()`** - Stack arrays as columns.
- **`np.row_stack()`** - Stack arrays as rows.
- **`np.split()`** - Split arrays into equal parts.
- **`np.array_split()`** - Split arrays into uneven parts.
- **`np.hsplit()`** - Split horizontally.
- **`np.vsplit()`** - Split vertically.

### 6.2 Example

```python
import numpy as np

a = np.array()[11][12]
b = np.array()[13][14]
c = np.concatenate([a, b])
d = np.stack([a, b])
```

---

## 7. Mathematical operations

NumPy supports element-wise arithmetic and many mathematical functions.

### 7.1 Common operations

- **`+`** - Addition.
- **`-`** - Subtraction.
- **`*`** - Multiplication.
- **`/`** - Division.
- **`//`** - Floor division.
- **`%`** - Modulo.
- **`**`** - Power.
- **`np.add()`** - Add arrays.
- **`np.subtract()`** - Subtract arrays.
- **`np.multiply()`** - Multiply arrays.
- **`np.divide()`** - Divide arrays.
- **`np.power()`** - Raise to a power.
- **`np.sqrt()`** - Square root.
- **`np.abs()`** - Absolute value.
- **`np.exp()`** - Exponential.
- **`np.log()`** - Natural logarithm.
- **`np.log10()`** - Base-10 logarithm.
- **`np.sin()`** - Sine.
- **`np.cos()`** - Cosine.
- **`np.tan()`** - Tangent.

### 7.2 Example

```python
import numpy as np

a = np.array()[12][11][13]
b = np.array()[18][19][14]

print(a + b)
print(a * b)
print(np.sqrt(b))
```

---

## 8. Aggregation and statistics

NumPy includes many functions for summary statistics.

### 8.1 Common functions

- **`np.sum()`** - Sum values.
- **`np.mean()`** - Average.
- **`np.median()`** - Median value.
- **`np.min()`** - Minimum value.
- **`np.max()`** - Maximum value.
- **`np.argmax()`** - Index of maximum.
- **`np.argmin()`** - Index of minimum.
- **`np.std()`** - Standard deviation.
- **`np.var()`** - Variance.
- **`np.percentile()`** - Percentile value.
- **`np.quantile()`** - Quantile value.
- **`np.ptp()`** - Peak-to-peak range.
- **`np.cumsum()`** - Cumulative sum.
- **`np.cumprod()`** - Cumulative product.
- **`np.diff()`** - Differences between values.

### 8.2 Example

```python
import numpy as np

arr = np.array()[14][18][11][12][13]
print(np.mean(arr))
print(np.std(arr))
print(np.cumsum(arr))
```

---

## 9. Comparison and logic

Logical and comparison operations are useful for filtering and conditional processing.

### 9.1 Common functions

- **`np.equal()`** - Element-wise equality.
- **`np.not_equal()`** - Element-wise inequality.
- **`np.greater()`** - Greater than.
- **`np.greater_equal()`** - Greater than or equal.
- **`np.less()`** - Less than.
- **`np.less_equal()`** - Less than or equal.
- **`np.logical_and()`** - Logical AND.
- **`np.logical_or()`** - Logical OR.
- **`np.logical_not()`** - Logical NOT.
- **`np.logical_xor()`** - Logical XOR.
- **`np.any()`** - Check if any values are True.
- **`np.all()`** - Check if all values are True.

### 9.2 Example

```python
import numpy as np

arr = np.array()[18][11][12][13][14]
mask = arr > 3
print(arr[mask])
```

---

## 10. Random sampling

NumPy provides the `random` module for generating random numbers and sampling.

### 10.1 Common functions

- **`np.random.rand()`** - Uniform random values in [0, 1).
- **`np.random.randn()`** - Standard normal random values.
- **`np.random.randint()`** - Random integers.
- **`np.random.random()`** - Random floats in [0, 1).
- **`np.random.choice()`** - Random sample from a sequence.
- **`np.random.shuffle()`** - Shuffle an array in place.
- **`np.random.permutation()`** - Return a shuffled permutation.
- **`np.random.seed()`** - Set random seed.

### 10.2 Example

```python
import numpy as np

np.random.seed(42)
x = np.random.randint(0, 10, size=5)
print(x)
```

---

## 11. Linear algebra

The `numpy.linalg` submodule supports matrix operations and linear systems.

### 11.1 Common functions

- **`np.linalg.inv()`** - Matrix inverse.
- **`np.linalg.det()`** - Determinant.
- **`np.linalg.solve()`** - Solve linear system.
- **`np.linalg.eig()`** - Eigenvalues and eigenvectors.
- **`np.linalg.svd()`** - Singular value decomposition.
- **`np.linalg.norm()`** - Vector or matrix norm.
- **`np.linalg.matrix_rank()`** - Matrix rank.
- **`np.dot()`** - Dot product or matrix multiplication.
- **`np.matmul()`** - Matrix multiplication.
- **`@`** - Matrix multiplication operator.
- **`np.trace()`** - Trace of matrix.

### 11.2 Example

```python
import numpy as np

A = np.array([, ])[11][12][13]
b = np.array()[12][11]

x = np.linalg.solve(A, b)
print(x)
```

---

## 12. Polynomial functions

NumPy includes polynomial utilities for fitting and evaluation.

### 12.1 Common functions

- **`np.poly1d()`** - Polynomial object.
- **`np.polyfit()`** - Fit polynomial coefficients.
- **`np.polyval()`** - Evaluate polynomial.
- **`np.roots()`** - Find polynomial roots.

### 12.2 Example

```python
import numpy as np

x = np.array()[13][11][12]
y = np.array()[20][18][11][13]

coef = np.polyfit(x, y, 1)
print(coef)
```

---

## 13. Sorting and searching

NumPy provides efficient tools for ordering arrays and finding values.

### 13.1 Common functions

- **`np.sort()`** - Sort array values.
- **`np.argsort()`** - Indices that sort the array.
- **`np.partition()`** - Partial sorting.
- **`np.argpartition()`** - Indices for partial sorting.
- **`np.searchsorted()`** - Find insertion position.
- **`np.unique()`** - Return unique values.
- **`np.bincount()`** - Count occurrences of integers.
- **`np.histogram()`** - Compute histogram.

### 13.2 Example

```python
import numpy as np

arr = np.array()[14][18][11][13]
print(np.sort(arr))
print(np.unique(arr))
```

---

## 14. NaN and finite values

NumPy has dedicated functions for handling missing or invalid numeric values.

### 14.1 Common functions

- **`np.isnan()`** - Check for NaN.
- **`np.isfinite()`** - Check for finite values.
- **`np.isinf()`** - Check for infinity.
- **`np.nanmean()`** - Mean ignoring NaN.
- **`np.nanmin()`** - Minimum ignoring NaN.
- **`np.nanmax()`** - Maximum ignoring NaN.
- **`np.nanstd()`** - Standard deviation ignoring NaN.
- **`np.nan_to_num()`** - Replace NaN and infinity.
- **`np.ma.masked_array()`** - Create masked arrays.

### 14.2 Example

```python
import numpy as np

arr = np.array([1, np.nan, 3])
print(np.nanmean(arr))
```

---

## 15. File input and output

NumPy can save and load arrays in binary and text formats.

### 15.1 Common functions

- **`np.save()`** - Save array in `.npy` format.
- **`np.load()`** - Load `.npy` files.
- **`np.savez()`** - Save multiple arrays in one file.
- **`np.savez_compressed()`** - Save compressed multiple arrays.
- **`np.savetxt()`** - Save array to text file.
- **`np.loadtxt()`** - Load text file.
- **`np.genfromtxt()`** - Load text with missing values.

### 15.2 Example

```python
import numpy as np

arr = np.array()[11][12][13]
np.save("array.npy", arr)
loaded = np.load("array.npy")
```

---

## 16. Iteration and vectorization

Vectorized operations are one of NumPy’s biggest strengths and usually outperform Python loops.

### 16.1 Common methods

- **`np.nditer()`** - Efficient iterator over array elements.
- **`arr.flat`** - Flat iterator.
- **`np.vectorize()`** - Wrap a Python function for array-like use.
- **`np.fromiter()`** - Build array from iterator.

### 16.2 Example

```python
import numpy as np

arr = np.array([, ])[12][13][14][11]
for x in np.nditer(arr):
    print(x)
```

---

## 17. Broadcasting

Broadcasting lets NumPy operate on arrays with different shapes when rules allow it.

### 17.1 Common patterns

- **Array + scalar** - Apply scalar to every element.
- **Array + vector** - Broadcast along matching dimensions.
- **`np.broadcast_to()`** - Expand array logically without copying.

### 17.2 Example

```python
import numpy as np

arr = np.array([, ])[19][18][13][14][11][12]
vec = np.array()[15]
print(arr + vec)
```

---

## 18. Set operations

NumPy provides set-like functions for arrays.

### 18.1 Common functions

- **`np.intersect1d()`** - Intersection of unique values.
- **`np.union1d()`** - Union of unique values.
- **`np.setdiff1d()`** - Set difference.
- **`np.setxor1d()`** - Symmetric difference.
- **`np.in1d()`** - Membership test for 1D arrays.

### 18.2 Example

```python
import numpy as np

a = np.array()[13][11][12]
b = np.array()[14][12][13]
print(np.intersect1d(a, b))
```

---

## 19. Common utility functions

These helpers support array conversion, shape inspection, and working with values.

### 19.1 Common functions

- **`np.asarray()`** - Convert to array without copying when possible.
- **`np.asanyarray()`** - Convert while preserving subclasses.
- **`np.atleast_1d()`** - Ensure at least 1D.
- **`np.atleast_2d()`** - Ensure at least 2D.
- **`np.atleast_3d()`** - Ensure at least 3D.
- **`np.squeeze()`** - Remove size-1 dimensions.
- **`np.repeat()`** - Repeat elements.
- **`np.tile()`** - Construct an array by repeating input.
- **`np.clip()`** - Clip values to a range.
- **`np.round()`** - Round values.
- **`np.floor()`** - Floor values.
- **`np.ceil()`** - Ceil values.
- **`np.trunc()`** - Truncate values.

### 19.2 Example

```python
import numpy as np

arr = np.array([1.2, 2.7, 3.5])
print(np.round(arr))
print(np.clip(arr, 1.5, 3.0))
```

---

## 20. Useful workflow examples

### 20.1 Basic numeric workflow

```python
import numpy as np

arr = np.array()[18][11][12][13][14]
print(arr.mean())
print(arr.std())
print(arr[arr > 2])
```

### 20.2 2D matrix workflow

```python
import numpy as np

A = np.array([, ])[11][12][13][14]
B = np.array([, ])[21][19][20][18]

C = A + B
D = A @ B
print(C)
print(D)
```

### 20.3 Random data analysis

```python
import numpy as np

np.random.seed(0)
data = np.random.normal(loc=0, scale=1, size=1000)
print(np.mean(data))
print(np.percentile(data, ))[17][22]
```

---

## 21. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Creation | `array()`, `zeros()`, `ones()`, `arange()` | Build arrays. |
| Attributes | `shape`, `ndim`, `dtype`, `size` | Inspect structure. |
| Indexing | slicing, boolean masks, fancy indexing | Select elements. |
| Reshaping | `reshape()`, `ravel()`, `flatten()` | Change array layout. |
| Math | `add()`, `multiply()`, `sqrt()`, `log()` | Perform numeric operations. |
| Stats | `sum()`, `mean()`, `std()`, `percentile()` | Summarize data. |
| Linear algebra | `inv()`, `solve()`, `eig()`, `svd()` | Matrix computations. |
| Random | `randint()`, `random()`, `choice()` | Generate random values. |
| Sorting | `sort()`, `argsort()`, `unique()` | Order and search data. |
| I/O | `save()`, `load()`, `savetxt()` | Store and retrieve arrays. |

---

## 22. Example full workflow

```python
import numpy as np

np.random.seed(42)
data = np.random.randint(0, 100, size=(5, 4))
row_mean = data.mean(axis=1)
col_sum = data.sum(axis=0)
normalized = (data - data.min()) / (data.max() - data.min())

print(data)
print(row_mean)
print(col_sum)
print(normalized)
```