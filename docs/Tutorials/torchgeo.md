---
hide:
  - toc
  - navigation
---

# Complete TorchGeo Methods Reference

## 1. Core concepts

TorchGeo is a PyTorch domain library for geospatial deep learning. It provides datasets, samplers, transforms, and pretrained models for working with remote sensing imagery and other spatial data in machine learning workflows.

### 1.1 Main ideas

- **GeoDataset**: dataset abstraction for geospatial inputs.
- **Samplers**: choose spatial patches or bounding boxes.
- **Transforms**: augment and preprocess geospatial samples.
- **Models**: pretrained or task-specific architectures.
- **Data loading**: integrates with PyTorch `DataLoader`.

### 1.2 Common imports

```python
import torch
from torch.utils.data import DataLoader
import torchgeo
```

### 1.3 Basic example

```python
from torchgeo.datasets import RasterDataset

dataset = RasterDataset(paths="path/to/data", crs="EPSG:4326", res=10)
print(dataset)
```

---

## 2. Dataset types

TorchGeo includes many ready-made datasets for satellite, aerial, and geographic data.

### 2.1 Common dataset classes

- **`RasterDataset`** - Base raster geospatial dataset.
- **`VectorDataset`** - Vector geospatial dataset.
- **`GeoDataset`** - Base geospatial dataset.
- **`IntersectionDataset`** - Intersect multiple datasets.
- **`UnionDataset`** - Combine multiple datasets.
- **`Landsat7`** - Landsat 7 imagery.
- **`Landsat8`** - Landsat 8 imagery.
- **`Sentinel2`** - Sentinel-2 imagery.
- **`NAIP`** - NAIP aerial imagery.
- **`CDL`** - Cropland Data Layer.
- **`stack_samples()`** - Collate dictionary samples into batches.

### 2.2 Use case

- Read remote sensing imagery.
- Combine imagery with labels.
- Work with benchmark geospatial datasets.

### 2.3 Example

```python
from torchgeo.datasets import RasterDataset

image = RasterDataset(paths="image", crs="EPSG:32647", res=10)
mask = RasterDataset(paths="mask", crs="EPSG:32647", res=10)
mask.is_image = False
dataset = image & mask
```

---

## 3. Dataset composition

TorchGeo makes it easy to combine geospatial datasets with operators.

### 3.1 Common operators and methods

- **`&`** - Intersect datasets.
- **`|`** - Union datasets.
- **`stack_samples()`** - Stack dictionary samples.
- **`random_bbox_assignment()`** - Split bounding boxes for datasets.
- **`subset`** workflows - Create train/validation partitions.

### 3.2 Use case

- Combine imagery with labels.
- Use multiple sensors as one dataset.
- Merge complementary datasets spatially.

### 3.3 Example

```python
landsat = landsat7 | landsat8
dataset = landsat & cdl
```

---

## 4. Geospatial samplers

Samplers are one of TorchGeo’s most important abstractions because geospatial data is sampled by location rather than integer index.

### 4.1 Common samplers

- **`RandomGeoSampler`** - Randomly sample geospatial patches.
- **`GridGeoSampler`** - Sample patches on a grid.
- **`GeoSampler`** - Base class for geospatial samplers.
- **`BBox`**-based sampling - Spatial bounding boxes for chips.

### 4.2 Use case

- Training models on random patches.
- Predicting over a study area using grid chips.
- Sampling large rasters without loading them all at once.

### 4.3 Example

```python
from torchgeo.samplers import RandomGeoSampler

sampler = RandomGeoSampler(dataset, size=256, length=1000)
```

---

## 5. Data loaders and batching

TorchGeo integrates with PyTorch `DataLoader` for efficient training and evaluation.

### 5.1 Common methods

- **`DataLoader()`** - Batch samples.
- **`stack_samples()`** - Collate geospatial sample dictionaries.
- **`collate_fn`** - Custom batch assembly.
- **`shuffle`** - Randomize order for training.

### 5.2 Use case

- Batch image chips and masks.
- Strip unnecessary metadata from batches.
- Improve training throughput.

### 5.3 Example

```python
from torch.utils.data import DataLoader
from torchgeo.datasets import stack_samples

dataloader = DataLoader(dataset, batch_size=8, sampler=sampler, collate_fn=stack_samples)
```

---

## 6. Raster and patch workflows

TorchGeo is designed to handle very large geospatial rasters by sampling smaller patches.

### 6.1 Common ideas

- Large rasters are too big to load into a model directly.
- Patches or chips are sampled from geographic bounds.
- Each sample can include `image`, `mask`, `bbox`, and `crs`.

### 6.2 Use case

- Semantic segmentation on satellite chips.
- Patch-based classification.
- Regional inference from tiling.

### 6.3 Example

```python
# A sampler returns geospatial chips instead of integer row indices.
# Each chip is a spatial patch ready for model training.
```

---

## 7. Transforms

TorchGeo includes image transforms tailored for multispectral and geospatial data.

### 7.1 Common transform ideas

- Spatial augmentation.
- Band selection.
- Normalization.
- Random cropping and flipping.
- Type conversion.
- Standard PyTorch transforms when compatible.

### 7.2 Use case

- Improve model robustness.
- Standardize multispectral inputs.
- Prepare patches for training.

### 7.3 Example

```python
# Example pattern:
# transform = SomeGeoTransform(...)
# dataset = RasterDataset(..., transforms=transform)
```

---

## 8. Pretrained models

TorchGeo includes model architectures and pretrained backbones for geospatial tasks.

### 8.1 Common model families

- **Classification models**.
- **Segmentation models**.
- **Backbones** for multispectral imagery.
- **Pretrained geospatial encoders**.

### 8.2 Use case

- Transfer learning on satellite imagery.
- Fine-tune a model on limited labeled data.
- Start from geospatial pretrained weights.

### 8.3 Example

```python
# Example pattern:
# model = torchgeo.models.resnet50(...)
# output = model(image)
```

---

## 9. Training workflows

TorchGeo usually fits into a standard PyTorch or PyTorch Lightning training loop.

### 9.1 Common steps

1. Build dataset.
2. Choose sampler.
3. Create dataloader.
4. Build model.
5. Compute loss.
6. Backpropagate.
7. Evaluate predictions.

### 9.2 Use case

- Train a segmentation model on satellite chips.
- Train a classifier for land cover.
- Evaluate predictions over a region.

### 9.3 Example

```python
for batch in dataloader:
    image = batch["image"]
    mask = batch["mask"]
    pred = model(image)
    loss = criterion(pred, mask)
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
```

---

## 10. Semantic segmentation use case

Semantic segmentation is one of the most common TorchGeo workflows.

### 10.1 Use case

- Land cover mapping.
- Flood extent detection.
- Water body segmentation.
- Urban footprint extraction.

### 10.2 Typical components

- Multispectral imagery as input.
- Pixel-wise label masks.
- U-Net, DeepLabV3, or similar segmentation models.
- Patch sampling with `RandomGeoSampler`.

### 10.3 Example

```python
from torchgeo.samplers import RandomGeoSampler
from torch.utils.data import DataLoader

train_sampler = RandomGeoSampler(dataset, size=256, length=500)
train_loader = DataLoader(dataset, sampler=train_sampler, batch_size=8, collate_fn=stack_samples)
```

---

## 11. Classification use case

TorchGeo can also support scene-level or patch-level classification.

### 11.1 Use case

- Crop type classification.
- Road or building presence classification.
- Biome or land cover class prediction.

### 11.2 Example

```python
# image -> model -> class logits -> loss -> optimizer
```

---

## 12. Inference workflows

After training, TorchGeo models can be used to predict over new spatial imagery.

### 12.1 Common ideas

- Use a grid sampler for full-area prediction.
- Merge chip predictions into a raster.
- Save outputs for GIS analysis.

### 12.2 Use case

- Predict land cover on new satellite scenes.
- Map flood or burn severity.
- Generate geospatial layers for downstream use.

### 12.3 Example

```python
# Use a grid sampler to iterate across a region,
# run predictions on each chip, and stitch outputs together.
```

---

## 13. Common TorchGeo methods and patterns

### 13.1 Datasets

- **`RasterDataset()`** - Read raster sources.
- **`VectorDataset()`** - Read vector sources.
- **`GeoDataset`** - Base class for geospatial sampling.

### 13.2 Sampling

- **`RandomGeoSampler()`** - Random patches.
- **`GridGeoSampler()`** - Regular tiling.
- **`GeoSampler`** - Base sampler.

### 13.3 Batching

- **`DataLoader()`** - Load batches.
- **`stack_samples()`** - Stack dict samples.

### 13.4 Composition

- **`&`** - Intersect datasets.
- **`|`** - Union datasets.

### 13.5 Example

```python
from torchgeo.datasets import CDL, Landsat7, Landsat8, stack_samples
from torchgeo.samplers import RandomGeoSampler
from torch.utils.data import DataLoader

landsat = Landsat7(paths="path/to/landsat7") | Landsat8(paths="path/to/landsat8")
cdl = CDL(paths="path/to/cdl")
dataset = landsat & cdl
sampler = RandomGeoSampler(dataset, size=256, length=10000)
loader = DataLoader(dataset, batch_size=8, sampler=sampler, collate_fn=stack_samples)
```

---

## 14. Integrating with PyTorch

TorchGeo is built on top of PyTorch, so all standard PyTorch tools still apply.

### 14.1 Common PyTorch methods used with TorchGeo

- **`nn.Module`** - Build neural networks.
- **`optim.Adam()`** - Optimize model parameters.
- **`CrossEntropyLoss()`** - Common segmentation/classification loss.
- **`to(device)`** - Move data and model to GPU.
- **`backward()`** - Compute gradients.

### 14.2 Use case

- Full geospatial deep learning pipeline.
- GPU-accelerated training.
- Reproducible experiments.

### 14.3 Example

```python
import torch.nn as nn
import torch.optim as optim

model = nn.Sequential(nn.Conv2d(3, 16, 3), nn.ReLU(), nn.Conv2d(16, 2, 1))
optimizer = optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()
```

---

## 15. Common geospatial machine learning tasks

### 15.1 Tasks

- Land cover classification.
- Crop type prediction.
- Water segmentation.
- Change detection.
- Urban mapping.
- Disaster response mapping.

### 15.2 Use case

- Convert remote sensing data into actionable map products.
- Train models on spatial chips.
- Reuse pretrained geospatial representations.

### 15.3 Example

```text
Satellite imagery + labels + geospatial samplers + deep learning model = geospatial prediction pipeline
```

---

## 16. Good practices

- Use `RandomGeoSampler` for training and `GridGeoSampler` for inference.
- Match CRS and resolution before combining datasets.
- Use patch-based loading instead of full-raster loading.
- Keep image and mask datasets aligned spatially.
- Use GPU when training large multispectral models.
- Prefer `stack_samples()` or a custom collate function for batch dictionaries.

---

## 17. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Datasets | `RasterDataset()`, `VectorDataset()` | Read geospatial data. |
| Composition | `&`, `|` | Intersect or combine datasets. |
| Samplers | `RandomGeoSampler()`, `GridGeoSampler()` | Sample spatial patches. |
| Batching | `DataLoader()`, `stack_samples()` | Build training batches. |
| Training | `backward()`, `optimizer.step()` | Fit models. |
| Inference | grid sampling, patch stitching | Predict over large areas. |
| ML tasks | classification, segmentation | Solve geospatial problems. |

---

## 18. Example full workflow

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchgeo.datasets import RasterDataset, stack_samples
from torchgeo.samplers import RandomGeoSampler

image = RasterDataset(paths="image", crs="EPSG:32647", res=10)
mask = RasterDataset(paths="mask", crs="EPSG:32647", res=10)
mask.is_image = False
dataset = image & mask

sampler = RandomGeoSampler(dataset, size=256, length=500)
loader = DataLoader(dataset, batch_size=8, sampler=sampler, collate_fn=stack_samples)

model = nn.Sequential(
    nn.Conv2d(3, 16, 3, padding=1),
    nn.ReLU(),
    nn.Conv2d(16, 2, 1)
)

optimizer = optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

for batch in loader:
    x = batch["image"]
    y = batch["mask"]
    pred = model(x)
    loss = criterion(pred, y.long())
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```