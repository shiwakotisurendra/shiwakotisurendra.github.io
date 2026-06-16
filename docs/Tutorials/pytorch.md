---
hide:
  - navigation
---

# Complete PyTorch Methods Reference

## 1. Core concepts

PyTorch is a deep learning framework used for tensor computation, automatic differentiation, neural network training, and GPU acceleration. It is widely used for research, prototyping, and production machine learning workflows.

### 1.1 Main ideas

- **Tensor**: the central data structure in PyTorch.
- **Autograd**: automatic differentiation for gradients.
- **Module**: a neural network layer or model component.
- **Optimizer**: updates model parameters.
- **Dataset and DataLoader**: tools for batching and loading data.

### 1.2 Common imports

```python
import torch
import torch.nn as nn
import torch.optim as optim
```

### 1.3 Basic example

```python
import torch

x = torch.tensor([1.0, 2.0, 3.0])
print(x)
```

---

## 2. Tensor creation

PyTorch tensors are similar to NumPy arrays but support GPU computation and gradients.

### 2.1 Common creation methods

- **`torch.tensor()`** - Create tensor from Python data.
- **`torch.zeros()`** - Create tensor filled with zeros.
- **`torch.ones()`** - Create tensor filled with ones.
- **`torch.empty()`** - Create uninitialized tensor.
- **`torch.rand()`** - Uniform random values.
- **`torch.randn()`** - Standard normal random values.
- **`torch.full()`** - Fill with a constant value.
- **`torch.arange()`** - Create evenly spaced values.
- **`torch.linspace()`** - Create linearly spaced values.
- **`torch.eye()`** - Create identity matrix.
- **`torch.zeros_like()`** - Same shape as input, filled with zeros.
- **`torch.ones_like()`** - Same shape as input, filled with ones.
- **`torch.rand_like()`** - Same shape as input, random uniform.
- **`torch.randn_like()`** - Same shape as input, random normal.

### 2.2 Use case

- Build inputs, labels, and weights.
- Create random test data.
- Initialize model parameters.

### 2.3 Example

```python
import torch

a = torch.zeros((2, 3))
b = torch.rand((2, 3))
c = torch.arange(0, 10, 2)
print(a, b, c)
```

---

## 3. Tensor properties

Tensor attributes describe shape, type, device, and gradient state.

### 3.1 Common attributes

- **`shape`** - Tensor dimensions.
- **`ndim`** - Number of dimensions.
- **`dtype`** - Data type.
- **`device`** - CPU or GPU device.
- **`requires_grad`** - Whether autograd tracks operations.
- **`numel()`** - Number of elements.
- **`size()`** - Tensor size.
- **`item()`** - Convert single-element tensor to Python scalar.
- **`tolist()`** - Convert tensor to nested Python list.

### 3.2 Example

```python
import torch

x = torch.tensor([, ], dtype=torch.float32)[1][2][3][4]
print(x.shape)
print(x.dtype)
print(x.numel())
```

---

## 4. Indexing and slicing

Tensor slicing works much like NumPy.

### 4.1 Common patterns

- **`x[0]`** - First row or first element.
- **`x[:, 0]`** - First column.
- **`x[1:3]`** - Slice rows or elements.
- **`x[x > 0]`** - Boolean mask.
- **`torch.where()`** - Conditional selection.
- **`index_select()`** - Select by index tensor.

### 4.2 Use case

- Access feature subsets.
- Select specific rows or columns.
- Filter values based on conditions.

### 4.3 Example

```python
import torch

x = torch.tensor([, ])[2][3][4][5][6][1]
print(x[:, 0])
print(x[x > 3])
```

---

## 5. Basic tensor operations

PyTorch supports element-wise arithmetic and many numeric operations.

### 5.1 Common methods and operators

- **`+`** - Addition.
- **`-`** - Subtraction.
- **`*`** - Element-wise multiplication.
- **`/`** - Division.
- **`**`** - Power.
- **`torch.add()`** - Add tensors.
- **`torch.sub()`** - Subtract tensors.
- **`torch.mul()`** - Multiply tensors.
- **`torch.div()`** - Divide tensors.
- **`torch.matmul()`** - Matrix multiplication.
- **`@`** - Matrix multiplication operator.
- **`torch.sum()`** - Sum values.
- **`torch.mean()`** - Mean values.
- **`torch.max()`** - Max values.
- **`torch.min()`** - Min values.

### 5.2 Use case

- Perform mathematical transforms.
- Compute similarities and matrix products.
- Prepare tensors for neural networks.

### 5.3 Example

```python
import torch

a = torch.tensor([1.0, 2.0, 3.0])
b = torch.tensor([4.0, 5.0, 6.0])

print(a + b)
print(a * b)
print(torch.matmul(a, b))
```

---

## 6. Shape manipulation

Shape operations are critical for neural network inputs and outputs.

### 6.1 Common methods

- **`view()`** - Reshape tensor as a view.
- **`reshape()`** - Reshape tensor.
- **`flatten()`** - Flatten dimensions.
- **`unsqueeze()`** - Add a dimension.
- **`squeeze()`** - Remove size-1 dimensions.
- **`transpose()`** - Swap two dimensions.
- **`permute()`** - Reorder dimensions.
- **`repeat()`** - Repeat tensor.
- **`expand()`** - Broadcast without copying when possible.
- **`cat()`** - Concatenate tensors.
- **`stack()`** - Stack tensors along new dimension.

### 6.2 Use case

- Convert image tensors to model input shape.
- Flatten outputs for classification.
- Combine batches or feature vectors.

### 6.3 Example

```python
import torch

x = torch.arange(6)
y = x.view(2, 3)
z = y.unsqueeze(0)
print(y)
print(z.shape)
```

---

## 7. Device handling

PyTorch can run on CPU or GPU.

### 7.1 Common methods

- **`torch.device()`** - Define target device.
- **`tensor.to(device)`** - Move tensor.
- **`model.to(device)`** - Move model.
- **`cuda()`** - Move to CUDA device.
- **`cpu()`** - Move to CPU.

### 7.2 Use case

- Accelerate training on GPU.
- Keep model and data on the same device.
- Switch between CPU and GPU safely.

### 7.3 Example

```python
import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
x = torch.randn(3, 3).to(device)
print(x.device)
```

---

## 8. Autograd and gradients

Autograd computes gradients automatically for tensors and models.

### 8.1 Common methods and attributes

- **`requires_grad=True`** - Track gradients.
- **`backward()`** - Compute gradients.
- **`grad`** - Store gradients.
- **`detach()`** - Remove from computation graph.
- **`no_grad()`** - Disable gradient tracking.
- **`zero_grad()`** - Clear accumulated gradients.

### 8.2 Use case

- Train neural networks.
- Optimize parameters.
- Prevent gradient accumulation during inference.

### 8.3 Example

```python
import torch

x = torch.tensor(2.0, requires_grad=True)
y = x ** 2
y.backward()
print(x.grad)
```

---

## 9. Neural network modules

The `torch.nn` module provides layers, losses, and model building blocks.

### 9.1 Common classes

- **`nn.Module`** - Base class for models.
- **`nn.Linear()`** - Fully connected layer.
- **`nn.ReLU()`** - ReLU activation.
- **`nn.Sigmoid()`** - Sigmoid activation.
- **`nn.Tanh()`** - Tanh activation.
- **`nn.Softmax()`** - Softmax activation.
- **`nn.Sequential()`** - Stack layers in order.
- **`nn.Dropout()`** - Regularization layer.
- **`nn.Conv2d()`** - 2D convolution layer.
- **`nn.MaxPool2d()`** - 2D max pooling.
- **`nn.BatchNorm1d()`** - Batch normalization.
- **`nn.BatchNorm2d()`** - Batch normalization for images.

### 9.2 Use case

- Build dense models.
- Build CNNs for images.
- Create reusable custom architectures.

### 9.3 Example

```python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(4, 8),
    nn.ReLU(),
    nn.Linear(8, 2)
)
```

---

## 10. Loss functions

Loss functions measure the difference between predictions and targets.

### 10.1 Common losses

- **`nn.MSELoss()`** - Mean squared error.
- **`nn.L1Loss()`** - Mean absolute error.
- **`nn.CrossEntropyLoss()`** - Multi-class classification loss.
- **`nn.BCELoss()`** - Binary classification loss.
- **`nn.BCEWithLogitsLoss()`** - Binary classification with logits.
- **`nn.NLLLoss()`** - Negative log-likelihood loss.

### 10.2 Use case

- Train regression models.
- Train classifiers.
- Compare predicted output to ground truth.

### 10.3 Example

```python
import torch.nn as nn

criterion = nn.MSELoss()
loss = criterion(torch.tensor([2.0]), torch.tensor([3.0]))
print(loss.item())
```

---

## 11. Optimizers

Optimizers update model parameters using gradients.

### 11.1 Common optimizers

- **`optim.SGD()`** - Stochastic gradient descent.
- **`optim.Adam()`** - Adaptive moment estimation.
- **`optim.RMSprop()`** - RMSProp optimizer.
- **`optim.Adagrad()`** - Adaptive gradient method.
- **`optim.AdamW()`** - Adam with decoupled weight decay.

### 11.2 Common methods

- **`zero_grad()`** - Reset gradients.
- **`step()`** - Update parameters.
- **`state_dict()`** - Get optimizer state.

### 11.3 Use case

- Train neural network weights.
- Fine-tune a pretrained model.
- Improve convergence speed.

### 11.4 Example

```python
import torch.optim as optim
import torch.nn as nn

model = nn.Linear(1, 1)
optimizer = optim.Adam(model.parameters(), lr=0.01)
```

---

## 12. Training loop

A typical training loop repeats forward pass, loss calculation, backward pass, and optimization.

### 12.1 Main steps

1. Compute predictions.
2. Compute loss.
3. Call `zero_grad()`.
4. Call `backward()`.
5. Call `step()`.

### 12.2 Use case

- Fit regression and classification models.
- Optimize model parameters over epochs.

### 12.3 Example

```python
import torch
import torch.nn as nn
import torch.optim as optim

x = torch.tensor([[1.0], [2.0], [3.0], [4.0]])
y = torch.tensor([[2.0], [4.0], [6.0], [8.0]])

model = nn.Linear(1, 1)
optimizer = optim.SGD(model.parameters(), lr=0.01)
criterion = nn.MSELoss()

for epoch in range(50):
    pred = model(x)
    loss = criterion(pred, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

---

## 13. Datasets and data loading

`torch.utils.data` helps build efficient datasets and loaders.

### 13.1 Common classes

- **`Dataset`** - Base dataset class.
- **`DataLoader`** - Batch and shuffle data.
- **`TensorDataset`** - Dataset from tensors.
- **`random_split()`** - Split dataset into subsets.

### 13.2 Use case

- Batch data for training.
- Shuffle samples every epoch.
- Load images, text, or tabular data efficiently.

### 13.3 Example

```python
from torch.utils.data import TensorDataset, DataLoader
import torch

ds = TensorDataset(torch.randn(100, 4), torch.randint(0, 2, (100,)))
loader = DataLoader(ds, batch_size=16, shuffle=True)
```

---

## 14. Saving and loading

PyTorch can save models, tensors, and training state.

### 14.1 Common methods

- **`torch.save()`** - Save objects.
- **`torch.load()`** - Load objects.
- **`state_dict()`** - Save model or optimizer parameters.
- **`load_state_dict()`** - Restore model or optimizer parameters.

### 14.2 Use case

- Save trained models.
- Resume training.
- Share checkpoints.

### 14.3 Example

```python
import torch

torch.save(model.state_dict(), "model.pt")
model.load_state_dict(torch.load("model.pt"))
```

---

## 15. Common tensor utilities

PyTorch includes many utilities for building and transforming tensors.

### 15.1 Common functions

- **`torch.abs()`** - Absolute value.
- **`torch.sqrt()`** - Square root.
- **`torch.exp()`** - Exponential.
- **`torch.log()`** - Natural logarithm.
- **`torch.clamp()`** - Clamp values.
- **`torch.round()`** - Round values.
- **`torch.argmax()`** - Index of max value.
- **`torch.argmin()`** - Index of min value.
- **`torch.nonzero()`** - Indices of nonzero values.
- **`torch.unique()`** - Unique values.
- **`torch.isnan()`** - Detect NaN.
- **`torch.isfinite()`** - Detect finite values.

### 15.2 Use case

- Clean numerical outputs.
- Find class predictions.
- Inspect special values in tensors.

### 15.3 Example

```python
import torch

x = torch.tensor([1.0, -2.0, 3.5])
print(torch.abs(x))
print(torch.argmax(x))
```

---

## 16. Common workflow examples

### 16.1 Basic tensor math

```python
import torch

x = torch.tensor([1.0, 2.0, 3.0])
y = torch.tensor([4.0, 5.0, 6.0])
z = x + y
print(z)
```

### 16.2 Linear regression model

```python
import torch
import torch.nn as nn

model = nn.Linear(1, 1)
x = torch.tensor([[1.0], [2.0], [3.0]])
y = torch.tensor([[2.0], [4.0], [6.0]])
pred = model(x)
print(pred)
```

### 16.3 Simple classifier

```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(4, 16),
    nn.ReLU(),
    nn.Linear(16, 3)
)
x = torch.randn(2, 4)
logits = model(x)
print(logits.shape)
```

---

## 17. Machine learning use cases

PyTorch is widely used for supervised learning, deep learning, and representation learning.

### 17.1 Common use cases

- Image classification.
- Object detection.
- Semantic segmentation.
- Natural language processing.
- Time series forecasting.
- Recommendation systems.
- Regression and tabular modeling.

### 17.2 Example

### Example idea:
inputs -> model -> loss -> backward -> optimizer.step()
text

---

## 18. Good practices

- Move model and tensors to the same device.
- Use `model.train()` during training and `model.eval()` during inference.
- Wrap inference in `torch.no_grad()`.
- Clear gradients each iteration with `zero_grad()`.
- Save checkpoints with `state_dict()`.
- Use `DataLoader` for batch training.

---

## 19. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Tensor creation | `tensor()`, `zeros()`, `randn()` | Build tensors. |
| Tensor ops | `add()`, `mul()`, `matmul()` | Compute values. |
| Shape | `view()`, `reshape()`, `unsqueeze()` | Adjust dimensions. |
| Gradients | `backward()`, `detach()` | Autograd support. |
| Layers | `nn.Linear()`, `nn.ReLU()` | Build networks. |
| Loss | `MSELoss()`, `CrossEntropyLoss()` | Measure error. |
| Optimizers | `SGD()`, `Adam()` | Update weights. |
| Data | `Dataset`, `DataLoader` | Batch and load data. |
| Save/load | `torch.save()`, `torch.load()` | Persist models. |

---

## 20. Example full workflow

```python
import torch
import torch.nn as nn
import torch.optim as optim

x = torch.tensor([[1.0], [2.0], [3.0], [4.0]])
y = torch.tensor([[2.0], [4.0], [6.0], [8.0]])

model = nn.Sequential(
    nn.Linear(1, 8),
    nn.ReLU(),
    nn.Linear(8, 1)
)

criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

for epoch in range(100):
    pred = model(x)
    loss = criterion(pred, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

print(model(torch.tensor([[5.0]])))
```