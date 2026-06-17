---
hide:
  - toc
---

# Machine Learning in Geospatial Python

## Overview

Machine learning in GIS uses algorithms to learn patterns from spatial data and make predictions or discover hidden structure. In geospatial work, it is commonly used for land cover mapping, climate analysis, urban studies, ecology, hazard mapping, and remote sensing image classification.

This page focuses on the major machine learning methods used in geospatial Python workflows, especially supervised regression, supervised classification, and unsupervised learning.

---

## Supervised Learning

Supervised learning uses labeled data. The model learns a relationship between input features and a known target value or class.

### Regression methods

Regression predicts a continuous numeric value.

#### Linear Regression
Linear Regression fits a straight-line relationship between input features and a continuous target.

**Idea:**  
The model assumes the target changes proportionally with the predictors.

**Use cases:**
- Predicting land surface temperature.
- Estimating rainfall.
- Modeling biomass.
- Predicting soil moisture.

**Best for:** simple, approximately linear relationships.

#### Multiple Linear Regression
Multiple Linear Regression is the same idea as Linear Regression, but it uses more than one input feature.

**Idea:**  
The model predicts one continuous variable from several predictors, such as elevation, slope, NDVI, and distance to roads.

**Use cases:**
- Predicting urban heat from land cover, elevation, and vegetation.
- Estimating air pollution using traffic and environmental variables.

**Best for:** continuous prediction with multiple explanatory variables.

#### Ridge Regression
Ridge Regression is linear regression with L2 regularization.

**Idea:**  
It adds a penalty to large coefficients, which helps reduce overfitting when predictors are correlated.

**Use cases:**
- Climate prediction with correlated environmental variables.
- Remote sensing problems with many similar bands or indices.

**Best for:** multicollinear data.

#### Lasso Regression
Lasso Regression is linear regression with L1 regularization.

**Idea:**  
It shrinks some coefficients to exactly zero, which performs feature selection.

**Use cases:**
- Selecting the most important predictors from many raster layers.
- Simplifying models with many correlated spatial variables.

**Best for:** feature selection and sparse models.

#### Elastic Net Regression
Elastic Net Regression combines Ridge and Lasso regularization.

**Idea:**  
It balances coefficient shrinkage and feature selection.

**Use cases:**
- Geospatial datasets with many correlated features.
- High-dimensional remote sensing problems.

**Best for:** a mix of correlated predictors and feature selection needs.

#### Decision Tree Regressor
A Decision Tree Regressor splits data into branches based on feature thresholds and predicts a numeric value at the final leaf.

**Idea:**  
It learns rules such as: if NDVI is high and elevation is low, predict higher biomass.

**Use cases:**
- Estimating biomass.
- Predicting surface temperature.
- Modeling environmental variables with nonlinear behavior.

**Best for:** nonlinear relationships and interpretable rule-based modeling.

#### Random Forest Regressor
Random Forest Regressor builds many decision trees and averages their predictions.

**Idea:**  
Each tree sees a random subset of data and features, which improves robustness and reduces overfitting.

**Use cases:**
- Biomass estimation.
- Soil property prediction.
- Urban heat modeling.
- Climate-related spatial prediction.

**Best for:** strong general-purpose geospatial regression.

#### Gradient Boosting Regressor
Gradient Boosting Regressor builds trees sequentially, where each new tree corrects errors made by previous trees.

**Idea:**  
The model improves step by step by focusing on residual errors.

**Use cases:**
- Predicting environmental variables from complex predictors.
- High-accuracy regression from remote sensing features.

**Best for:** high predictive performance on structured data.

#### Support Vector Regression
Support Vector Regression tries to fit a function within a tolerance margin while keeping the model as smooth as possible.

**Idea:**  
Instead of minimizing all errors equally, it finds a flexible boundary that allows small prediction errors.

**Use cases:**
- Predicting climate variables.
- Modeling smooth environmental gradients.

**Best for:** nonlinear prediction with kernel functions.

#### K-Nearest Neighbors Regressor
K-Nearest Neighbors Regressor predicts the target value from the average of the nearest observations in feature space.

**Idea:**  
A new point gets its value from similar nearby training samples.

**Use cases:**
- Local interpolation-like prediction.
- Small geospatial datasets.
- Simple baseline models.

**Best for:** local similarity problems.

#### Neural Network Regressor
A Neural Network Regressor learns complex nonlinear relationships using layers of connected neurons.

**Idea:**  
The model transforms the input features through hidden layers to estimate the target value.

**Use cases:**
- Large remote sensing datasets.
- Complex climate or urban prediction problems.
- Deep feature learning when many observations exist.

**Best for:** large datasets with nonlinear relationships.

---

## Classification methods

Classification predicts a category or class.

### Image classification meaning

In geospatial image classification, each pixel or object is assigned to a class such as forest, water, urban, agriculture, or bare soil.

### Logistic Regression
Logistic Regression is a classification method that predicts class probabilities.

**Idea:**  
It uses a sigmoid function to estimate the probability of class membership.

**Use cases:**
- Binary land cover classification.
- Flood/no flood mapping.
- Urban/non-urban mapping.

**Best for:** simple and interpretable classification.

### Decision Tree Classifier
A Decision Tree Classifier splits data using if-then rules and assigns a class at the leaf node.

**Idea:**  
It learns feature thresholds that separate classes.

**Use cases:**
- Land cover mapping.
- Crop type classification.
- Habitat class prediction.

**Best for:** rule-based interpretable classification.

### Random Forest Classifier
Random Forest Classifier combines many decision trees and uses majority vote.

**Idea:**  
It reduces overfitting by averaging multiple trees.

**Use cases:**
- Satellite image classification.
- Forest cover mapping.
- Urban growth detection.

**Best for:** strong baseline for geospatial classification.

### Support Vector Machine
Support Vector Machine finds a separating boundary that maximizes the margin between classes.

**Idea:**  
It tries to place the boundary as far as possible from the closest training points.

**Use cases:**
- Land cover classification.
- High-dimensional remote sensing classification.
- Small to medium training datasets.

**Best for:** high-dimensional feature spaces.

### K-Nearest Neighbors Classifier
K-Nearest Neighbors Classifier assigns a class based on the majority class among the nearest neighbors.

**Idea:**  
If most nearby training samples belong to forest, the new sample becomes forest.

**Use cases:**
- Simple land cover classification.
- Baseline classification for small datasets.

**Best for:** simple and intuitive classification.

### Naive Bayes
Naive Bayes uses probability and assumes predictors are conditionally independent.

**Idea:**  
It estimates the class with the highest posterior probability.

**Use cases:**
- Fast image classification.
- Text and metadata classification.
- Simple raster classification.

**Best for:** fast probabilistic modeling.

### Gradient Boosting Classifier
Gradient Boosting Classifier builds trees sequentially to improve classification performance.

**Idea:**  
Each new tree reduces the errors of the previous ensemble.

**Use cases:**
- Land cover mapping.
- Complex class prediction from remote sensing features.

**Best for:** high-accuracy classification.

### Neural Network Classifier
A Neural Network Classifier learns nonlinear class boundaries using multiple layers.

**Idea:**  
It transforms input features through hidden layers and outputs class probabilities.

**Use cases:**
- Large-scale image classification.
- Deep remote sensing models.
- Complex multi-class land cover problems.

**Best for:** large datasets and nonlinear classification.

---

## Unsupervised Learning

Unsupervised learning uses data without labels to discover patterns.

### Clustering

Clustering groups similar pixels, polygons, or observations.

#### K-Means
Partitions data into K groups by minimizing distance to cluster centers.

**Use cases:** land cover segmentation, hotspot detection.

#### DBSCAN
Groups dense clusters and marks sparse points as noise.

**Use cases:** urban hotspot detection, unusual spatial pattern detection.

#### Hierarchical clustering
Builds clusters step by step in a tree structure.

**Use cases:** ecological region grouping, climate zone analysis.

### Dimensionality reduction

#### PCA
Principal Component Analysis compresses many correlated variables into fewer components.

**Use cases:** multispectral image compression, feature reduction.

#### t-SNE
t-SNE visualizes high-dimensional data in 2D or 3D.

**Use cases:** exploratory analysis of remote sensing features.

#### UMAP
UMAP preserves local structure while reducing dimensions.

**Use cases:** fast visualization of high-dimensional geospatial data.

### Anomaly detection

#### Isolation Forest
Detects outliers by isolating unusual observations.

#### Local Outlier Factor
Detects samples that are locally unusual compared with neighbors.

#### One-Class SVM
Learns a boundary around normal data and flags points outside it.

**Use cases:** sensor anomaly detection, unusual land change, rare event detection.

---

## Geospatial Python examples

### Regression example
```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

df = pd.DataFrame({
    "ndvi": [0.2, 0.3, 0.6, 0.7, 0.8, 0.4, 0.5, 0.9],
    "elevation": ,
    "slope":,[^1][^2][^3][^4][^5][^6][^7][^8]
    "biomass":[^9][^10][^8][^11][^12][^13][^14][^15]
})

X = df[["ndvi", "elevation", "slope"]]
y = df["biomass"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)

mae = mean_absolute_error(y_test, pred)
r2 = r2_score(y_test, pred)

print("MAE:", mae)
print("R2:", r2)
```


### Image classification example

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

df = pd.DataFrame({
    "band1": ,
    "band2":,[^13][^15][^16][^17][^18]
    "band3": ,
    "class": ["forest", "forest", "forest", "urban", "urban", "urban", "water", "water"]
})

X = df[["band1", "band2", "band3"]]
y = df["class"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)

acc = accuracy_score(y_test, pred)
print("Accuracy:", acc)
print(confusion_matrix(y_test, pred))
print(classification_report(y_test, pred))
```


---

## Geospatial use cases

### Remote sensing

- Land cover classification.
- Crop mapping.
- Forest change detection.
- Water body extraction.


### Climate science

- Rainfall prediction.
- Drought assessment.
- Heat stress mapping.
- Vulnerability analysis.


### Urban analysis

- Urban growth mapping.
- Heat island modeling.
- Land suitability analysis.
- Infrastructure risk assessment.


### Ecology

- Habitat classification.
- Species distribution prediction.
- Forest condition mapping.
- Biodiversity hotspot detection.

---

## Model selection guide

| Problem | Good methods |
| :-- | :-- |
| Continuous prediction | Linear Regression, Multiple Linear Regression, Ridge, Lasso, Elastic Net, Random Forest Regressor, Gradient Boosting Regressor, SVR |
| Image classification | Logistic Regression, Decision Tree, Random Forest, SVM, KNN, Naive Bayes, Gradient Boosting, Neural Network |
| No labels, grouping | K-Means, DBSCAN, Hierarchical clustering |
| Many correlated variables | Ridge, Elastic Net, PCA |
| Outlier detection | Isolation Forest, LOF, One-Class SVM |


---

## Best practices

- Use projected CRS for spatial distances.
- Standardize features for SVM, KNN, and neural networks.
- Use spatial cross-validation when possible.
- Handle class imbalance in classification.
- Remove or combine highly correlated predictors when needed.
- Interpret outputs with feature importance or explainability methods.

---

## Conclusion

Regression methods estimate continuous geospatial values, classification methods assign classes, and unsupervised methods reveal hidden structure. In Python, scikit-learn provides a practical toolkit for building these models on spatial data.

```
<span style="display:none">[^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30][^31]</span>

<div align="center">⁂</div>

[^1]: https://static1.squarespace.com/static/58c95854c534a56689231265/t/64c2dc9cb9692a57bce3e1a5/1690492061250/Diploma+in+geospatial+analysis,+land+cover+evaluation,+geomachine+learning+and+surface+modeling+with+Python.pdf
[^2]: https://geography.wisc.edu/geods/wp-content/uploads/sites/28/2022/05/2020_BoK_MachineLearning.pdf
[^3]: https://scikit-learn.org/stable/auto_examples/neighbors/plot_species_kde.html
[^4]: https://github.com/stevenpawley/Pyspatialml
[^5]: https://developers.google.com/earth-engine/guides/machine-learning
[^6]: https://www.python-gis.org/geospatial-machine-learning-ai/
[^7]: https://www.suaspress.org/ojs/index.php/JCTAM/article/download/v2n1a05/v2n1a05/401
[^8]: https://atlas.co/glossary/machine-learning-in-gis/
[^9]: https://stackoverflow.com/questions/77655518/scikit-learn-models-for-binary-classification
[^10]: https://scikit-learn.org/stable/supervised_learning.html
[^11]: https://www.reddit.com/r/gis/comments/cg6usc/example_of_gis_and_machine_learning_applications/
[^12]: https://www.oreilly.com/library/view/scikit-learn-cookbook/9781787286382/069d3ed3-471b-420d-be08-930320b8675d.xhtml
[^13]: https://www.linkedin.com/advice/1/what-advantages-disadvantages-supervised-unsupervised-1c
[^14]: https://ufind.univie.ac.at/de/course.html?lv=290226&semester=2025S
[^15]: https://pygis.io/docs/f_rs_ml_predict.html
[^16]: https://www.codecademy.com/resources/docs/sklearn
[^17]: https://pdfs.semanticscholar.org/1b7c/53d639b3d284369fb01a661be7f703fabceb.pdf
[^18]: https://skillsforafrica.org/course/machine-learning-for-geospatial-data-analysis-training-course
[^19]: https://www.dataquest.io/blog/machine-learning-algorithms/
[^20]: https://dhruv-panchal.medium.com/mastering-classification-with-scikit-learn-an-in-depth-guide-f37ad7bbba06
[^21]: https://hatarilabs.com/ih-en/land-cover-classification-using-a-naives-bayes-algorithm-with-python
[^22]: https://www.scribd.com/document/941223201/Unit-4-Classification-and-Regression
[^23]: https://ceholden.github.io/open-geo-tutorial/python/chapter_5_classification.html
[^24]: https://machinelearningmastery.com/spot-check-regression-machine-learning-algorithms-python-scikit-learn/
[^25]: https://stackabuse.com/overview-of-classification-methods-in-python-with-scikit-learn/
[^26]: https://baumamat.pages.cms.hu-berlin.de/geopybook/chapters/ml/geopy_ml.html
[^27]: https://medium.com/@mccaigjake/introduction-to-classification-in-scikit-learn-logistic-regression-decision-trees-and-random-f172574be931
[^28]: https://tierrainsights.buzz/python-scikit-learn-for-geospatial-machine-learning-88fb5259d66d
[^29]: https://scikit-learn.org/stable/modules/linear_model.html
[^30]: https://www.geeksforgeeks.org/machine-learning/machine-learning-algorithms/
[^31]: https://subornaa.github.io/Python-Programming-for-Geospatial-Data-Analysis/week12-13_ML.html```

