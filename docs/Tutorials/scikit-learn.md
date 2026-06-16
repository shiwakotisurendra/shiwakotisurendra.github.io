---
hide:
  - toc
  - navigation
---

# Complete Scikit-learn Methods Reference

## 1. Core concepts

Scikit-learn is a Python library for machine learning built around a consistent estimator API. Most workflows follow the same pattern: prepare data, fit a model, transform or predict, then evaluate performance.

### 1.1 Main ideas

- **Estimator**: any object that can learn from data.
- **Transformer**: an estimator that implements `transform()`.
- **Predictor**: an estimator that implements `predict()`.
- **Pipeline**: a sequence of preprocessing and modeling steps.
- **Model selection**: tools for tuning and evaluating models.

### 1.2 Common imports

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
```

### 1.3 Basic workflow example

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)

model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
print(model.score(X_test, y_test))
```

---

## 2. Estimator API

Scikit-learn estimators follow a small number of common methods, which makes the library consistent across models and preprocessing tools.

### 2.1 Core methods

- **`fit(X, y=None)`** - Learn from data.
- **`predict(X)`** - Predict target values.
- **`transform(X)`** - Transform input data.
- **`fit_transform(X, y=None)`** - Fit and transform in one step.
- **`fit_predict(X, y=None)`** - Fit and return predictions or clusters.
- **`score(X, y)`** - Evaluate model performance.
- **`partial_fit(X, y=None)`** - Incremental learning on batches.

### 2.2 Use case

- Use **`fit()`** to train.
- Use **`transform()`** for scalers, encoders, and feature extractors.
- Use **`predict()`** for classifiers and regressors.
- Use **`score()`** for a quick evaluation.

### 2.3 Example

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform([,, ])[1][2][3][4][5][6]
print(X_scaled)
```

---

## 3. Datasets

Scikit-learn includes built-in toy datasets for learning and testing.

### 3.1 Common dataset loaders

- **`load_iris()`** - Iris classification dataset.
- **`load_digits()`** - Handwritten digits dataset.
- **`load_wine()`** - Wine classification dataset.
- **`load_breast_cancer()`** - Breast cancer dataset.
- **`fetch_california_housing()`** - California housing dataset.
- **`fetch_openml()`** - Download datasets from OpenML.
- **`make_classification()`** - Create synthetic classification data.
- **`make_regression()`** - Create synthetic regression data.
- **`make_blobs()`** - Create clustered data.
- **`make_moons()`** - Create two-moons classification data.

### 3.2 Example

```python
from sklearn.datasets import load_iris

iris = load_iris()
X = iris.data
y = iris.target
print(iris.feature_names)
```

---

## 4. Train-test split

Splitting data helps evaluate models on unseen samples.

### 4.1 Common method

- **`train_test_split()`** - Split data into training and testing sets.

### 4.2 Important parameters

- `test_size`
- `train_size`
- `random_state`
- `stratify`

### 4.3 Example

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

---

## 5. Preprocessing

Preprocessing prepares features for machine learning.

### 5.1 Common transformers

- **`StandardScaler()`** - Standardize features.
- **`MinMaxScaler()`** - Scale to a range.
- **`RobustScaler()`** - Scale using median and IQR.
- **`Normalizer()`** - Normalize rows.
- **`OneHotEncoder()`** - Encode categories as binary vectors.
- **`OrdinalEncoder()`** - Encode categories as ordered integers.
- **`LabelEncoder()`** - Encode target labels.
- **`PolynomialFeatures()`** - Generate polynomial and interaction features.
- **`KBinsDiscretizer()`** - Bin continuous values.
- **`Binarizer()`** - Binarize values.
- **`PowerTransformer()`** - Apply power transforms.
- **`QuantileTransformer()`** - Transform distributions to uniform/normal.

### 5.2 Use case

- Scale numeric data.
- Encode categorical variables.
- Create interaction terms.
- Normalize text or image features.

### 5.3 Example

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

---

## 6. Imputation

Imputation fills missing values before modeling.

### 6.1 Common methods

- **`SimpleImputer()`** - Fill missing values with mean, median, most frequent, or constant.
- **`KNNImputer()`** - Impute using nearest neighbors.
- **`IterativeImputer()`** - Multivariate imputation.
- **`MissingIndicator()`** - Add missing-value indicators.

### 6.2 Use case

- Fill missing numeric data with median.
- Fill categorical data with mode.
- Add missingness indicators for models.

### 6.3 Example

```python
from sklearn.impute import SimpleImputer

imp = SimpleImputer(strategy="median")
X_filled = imp.fit_transform(X_train)
```

---

## 7. Feature selection

Feature selection helps reduce dimensionality and improve interpretability.

### 7.1 Common methods

- **`SelectKBest()`** - Select top k features.
- **`SelectPercentile()`** - Select top percentile of features.
- **`RFE()`** - Recursive feature elimination.
- **`RFECV()`** - Recursive feature elimination with cross-validation.
- **`SelectFromModel()`** - Select features based on model importance.
- **`VarianceThreshold()`** - Remove low-variance features.
- **`chi2`** - Chi-square score function.
- **`f_classif`** - ANOVA F-value for classification.
- **`mutual_info_classif()`** - Mutual information for classification.
- **`mutual_info_regression()`** - Mutual information for regression.

### 7.2 Use case

- Keep the most informative features.
- Remove noisy or redundant variables.
- Reduce overfitting and training time.

### 7.3 Example

```python
from sklearn.feature_selection import SelectKBest, f_classif

selector = SelectKBest(score_func=f_classif, k=2)
X_new = selector.fit_transform(X_train, y_train)
```

---

## 8. Linear models

Linear models are simple, fast, and often strong baselines.

### 8.1 Common estimators

- **`LinearRegression()`** - Ordinary least squares regression.
- **`Ridge()`** - L2-regularized regression.
- **`Lasso()`** - L1-regularized regression.
- **`ElasticNet()`** - Combined L1 and L2 regularization.
- **`LogisticRegression()`** - Linear classifier.
- **`SGDClassifier()`** - Linear classifier trained with SGD.
- **`SGDRegressor()`** - Linear regressor trained with SGD.

### 8.2 Use case

- Predict continuous values.
- Build interpretable classification models.
- Use fast models for large datasets.

### 8.3 Example

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
pred = model.predict(X_test)
```

---

## 9. Tree-based models

Tree-based methods are useful for nonlinear relationships and feature interactions.

### 9.1 Common estimators

- **`DecisionTreeClassifier()`**
- **`DecisionTreeRegressor()`**
- **`RandomForestClassifier()`**
- **`RandomForestRegressor()`**
- **`ExtraTreesClassifier()`**
- **`ExtraTreesRegressor()`**
- **`GradientBoostingClassifier()`**
- **`GradientBoostingRegressor()`**
- **`HistGradientBoostingClassifier()`**
- **`HistGradientBoostingRegressor()`**

### 9.2 Use case

- Handle mixed feature patterns.
- Work well on tabular data.
- Capture nonlinear relationships.

### 9.3 Example

```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)
print(clf.score(X_test, y_test))
```

---

## 10. Support vector machines

SVMs are effective for classification and regression with clear margins.

### 10.1 Common estimators

- **`SVC()`** - Support vector classifier.
- **`SVR()`** - Support vector regressor.
- **`LinearSVC()`** - Linear SVM classifier.
- **`LinearSVR()`** - Linear SVM regressor.

### 10.2 Use case

- High-dimensional classification.
- Nonlinear classification with kernels.
- Small to medium datasets.

### 10.3 Example

```python
from sklearn.svm import SVC

clf = SVC(kernel="rbf")
clf.fit(X_train, y_train)
```

---

## 11. Neighbors-based methods

Nearest-neighbor methods are intuitive and useful for local decision rules.

### 11.1 Common estimators

- **`KNeighborsClassifier()`**
- **`KNeighborsRegressor()`**
- **`NearestNeighbors()`**
- **`RadiusNeighborsClassifier()`**
- **`RadiusNeighborsRegressor()`**

### 11.2 Use case

- Local similarity-based prediction.
- Recommendation-like logic.
- Simple baseline models.

### 11.3 Example

```python
from sklearn.neighbors import KNeighborsClassifier

knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)
```

---

## 12. Clustering

Clustering groups similar samples without labels.

### 12.1 Common estimators

- **`KMeans()`** - Partition into k clusters.
- **`MiniBatchKMeans()`** - Faster KMeans for large datasets.
- **`DBSCAN()`** - Density-based clustering.
- **`AgglomerativeClustering()`** - Hierarchical clustering.
- **`Birch()`** - Cluster large datasets efficiently.
- **`SpectralClustering()`** - Graph-based clustering.
- **`MeanShift()`** - Mode-seeking clustering.

### 12.2 Use case

- Segment customers or spatial regions.
- Find hidden groups in data.
- Detect anomalous clusters.

### 12.3 Example

```python
from sklearn.cluster import KMeans

km = KMeans(n_clusters=3, random_state=42)
labels = km.fit_predict(X_train)
```

---

## 13. Dimensionality reduction

These methods reduce feature space while preserving structure as much as possible.

### 13.1 Common methods

- **`PCA()`** - Principal component analysis.
- **`IncrementalPCA()`** - PCA for large datasets.
- **`TruncatedSVD()`** - Dimensionality reduction for sparse data.
- **`KernelPCA()`** - Kernel-based PCA.
- **`NMF()`** - Non-negative matrix factorization.
- **`TSNE()`** - Nonlinear embedding.
- **`Isomap()`** - Manifold learning.
- **`UMAP`** - Not in core scikit-learn, but commonly used with it.

### 13.2 Use case

- Compress data.
- Visualize high-dimensional data.
- Remove redundancy.

### 13.3 Example

```python
from sklearn.decomposition import PCA

pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X_train)
```

---

## 14. Model selection

Model selection tools help evaluate and tune models.

### 14.1 Common functions

- **`cross_val_score()`** - Cross-validation scoring.
- **`cross_validate()`** - Multiple metrics with CV.
- **`GridSearchCV()`** - Exhaustive hyperparameter search.
- **`RandomizedSearchCV()`** - Random hyperparameter search.
- **`learning_curve()`** - Study performance vs training size.
- **`validation_curve()`** - Study performance vs one parameter.
- **`train_test_split()`** - Split data.
- **`cross_val_predict()`** - Cross-validated predictions.

### 14.2 Use case

- Compare models fairly.
- Tune hyperparameters.
- Estimate generalization performance.

### 14.3 Example

```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

param_grid = {"n_estimators":, "max_depth": [3, 5, None]}[7][8]
grid = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, cv=5)
grid.fit(X_train, y_train)
print(grid.best_params_)
```

---

## 15. Metrics and evaluation

Metrics quantify model quality.

### 15.1 Common classification metrics

- **`accuracy_score()`**
- **`precision_score()`**
- **`recall_score()`**
- **`f1_score()`**
- **`confusion_matrix()`**
- **`classification_report()`**
- **`roc_auc_score()`**
- **`roc_curve()`**
- **`log_loss()`**

### 15.2 Common regression metrics

- **`mean_squared_error()`**
- **`mean_absolute_error()`**
- **`r2_score()`**
- **`mean_absolute_percentage_error()`**

### 15.3 Use case

- Evaluate classification performance.
- Compare regressors.
- Analyze tradeoffs between false positives and false negatives.

### 15.4 Example

```python
from sklearn.metrics import classification_report, confusion_matrix

pred = clf.predict(X_test)
print(confusion_matrix(y_test, pred))
print(classification_report(y_test, pred))
```

---

## 16. Pipelines and composition

Pipelines combine preprocessing and modeling steps into one reproducible workflow.

### 16.1 Common tools

- **`Pipeline()`** - Sequential pipeline.
- **`make_pipeline()`** - Convenience pipeline creator.
- **`ColumnTransformer()`** - Apply different preprocessing to different columns.
- **`FeatureUnion()`** - Combine multiple transformers.
- **`TransformedTargetRegressor()`** - Transform target values in regression.

### 16.2 Use case

- Prevent data leakage.
- Keep preprocessing and modeling together.
- Simplify cross-validation and deployment.

### 16.3 Example

```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=200))
pipe.fit(X_train, y_train)
print(pipe.score(X_test, y_test))
```

---

## 17. Text processing

Scikit-learn includes useful text vectorization tools.

### 17.1 Common methods

- **`CountVectorizer()`** - Convert text to token counts.
- **`TfidfVectorizer()`** - Convert text to TF-IDF features.
- **`HashingVectorizer()`** - Feature hashing for text.
- **`CountVectorizer.fit_transform()`** - Learn vocabulary and transform text.

### 17.2 Use case

- Spam classification.
- Document classification.
- Text similarity analysis.

### 17.3 Example

```python
from sklearn.feature_extraction.text import TfidfVectorizer

texts = ["machine learning is fun", "python is useful"]
vec = TfidfVectorizer()
X_text = vec.fit_transform(texts)
```

---

## 18. Unsupervised anomaly detection

Scikit-learn offers several methods for outlier detection.

### 18.1 Common estimators

- **`IsolationForest()`**
- **`LocalOutlierFactor()`**
- **`OneClassSVM()`**
- **`EllipticEnvelope()`**

### 18.2 Use case

- Detect unusual records.
- Find suspicious transactions.
- Identify spatial or sensor anomalies.

### 18.3 Example

```python
from sklearn.ensemble import IsolationForest

iso = IsolationForest(random_state=42)
outliers = iso.fit_predict(X_train)
```

---

## 19. Multi-output and meta-estimators

Meta-estimators combine or extend other estimators.

### 19.1 Common methods and classes

- **`OneVsRestClassifier()`**
- **`OneVsOneClassifier()`**
- **`MultiOutputClassifier()`**
- **`MultiOutputRegressor()`**
- **`VotingClassifier()`**
- **`VotingRegressor()`**
- **`BaggingClassifier()`**
- **`BaggingRegressor()`**
- **`AdaBoostClassifier()`**
- **`AdaBoostRegressor()`**

### 19.2 Use case

- Handle multiclass or multilabel problems.
- Combine multiple models.
- Improve robustness with ensembles.

### 19.3 Example

```python
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier

vote = VotingClassifier(
    estimators=[
        ("lr", LogisticRegression(max_iter=200)),
        ("dt", DecisionTreeClassifier())
    ],
    voting="hard"
)
vote.fit(X_train, y_train)
```

---

## 20. Useful utility functions

These helpers are commonly used in day-to-day workflows.

### 20.1 Common functions

- **`check_array()`** - Validate array input.
- **`check_X_y()`** - Validate `X` and `y`.
- **`shuffle()`** - Shuffle arrays.
- **`resample()`** - Resample arrays.
- **`clone()`** - Clone an estimator.
- **`set_config()`** - Configure global scikit-learn settings.
- **`get_config()`** - Read configuration.
- **`all_estimators()`** - List available estimators.

### 20.2 Use case

- Build custom utilities.
- Validate inputs before training.
- Inspect supported estimators.

---

## 21. Common workflow examples

### 21.1 Classification workflow

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42, stratify=iris.target
)

clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)
pred = clf.predict(X_test)
print(accuracy_score(y_test, pred))
```

### 21.2 Regression workflow

```python
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

X, y = make_regression(n_samples=200, n_features=5, noise=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)

reg = LinearRegression()
reg.fit(X_train, y_train)
print(reg.score(X_test, y_test))
```

### 21.3 Clustering workflow

```python
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

X, _ = make_blobs(n_samples=300, centers=3, random_state=42)
km = KMeans(n_clusters=3, random_state=42)
labels = km.fit_predict(X)
```

---

## 22. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Core API | `fit()`, `predict()`, `transform()` | Standard estimator interface. |
| Data split | `train_test_split()` | Separate train and test data. |
| Preprocessing | `StandardScaler()`, `OneHotEncoder()` | Prepare features. |
| Missing values | `SimpleImputer()` | Fill gaps in data. |
| Feature selection | `SelectKBest()`, `RFE()` | Reduce features. |
| Models | `LogisticRegression()`, `RandomForestClassifier()` | Train predictive models. |
| Clustering | `KMeans()`, `DBSCAN()` | Group unlabeled data. |
| Reduction | `PCA()`, `TruncatedSVD()` | Lower dimensionality. |
| Evaluation | `accuracy_score()`, `r2_score()` | Measure performance. |
| Tuning | `GridSearchCV()`, `RandomizedSearchCV()` | Optimize hyperparameters. |
| Composition | `Pipeline()`, `ColumnTransformer()` | Build clean workflows. |

---

## 23. Example full workflow

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42, stratify=iris.target
)

pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=200))
pipe.fit(X_train, y_train)
print(pipe.score(X_test, y_test))
```