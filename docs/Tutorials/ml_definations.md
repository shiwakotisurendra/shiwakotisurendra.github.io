# Machine Learning Algorithms Cheat Sheet

Welcome to the Machine Learning Algorithms Cheat Sheet. This guide provides a comprehensive overview of popular supervised and unsupervised machine learning algorithms, including their descriptions, typical use cases, advantages, and disadvantages.

---

## Linear Models

### Linear Regression
* **Description**: A simple algorithm that models a linear relationship between inputs and a continuous numerical output variable.
* **Use Cases**:
    1. Stock price prediction
    2. Predicting housing prices
    3. Predicting customer lifetime value
* **Advantages**:
    1. Explainable method
    2. Interpretable results by its output coefficients
    3. Faster to train than other machine learning models
* **Disadvantages**:
    1. Assumes linearity between inputs and output
    2. Sensitive to outliers
    3. Can underfit with small, high-dimensional data

### Logistic Regression
* **Description**: A simple algorithm that models a linear relationship between inputs and a categorical output (1 or 0). It is applicable for multi-class predictions as well.
* **Use Cases**:
    1. Credit risk score prediction
    2. Customer churn prediction
* **Advantages**:
    1. Interpretable and explainable
    2. Less prone to overfitting when using regularization
    3. Applicable for multi-class predictions
* **Disadvantages**:
    1. Assumes linearity between inputs and outputs
    2. Can overfit with small, high-dimensional data

### Ridge Regression
* **Description**: Part of the regression family, it penalizes features that have low predictive outcomes by shrinking their coefficients closer to zero. Can be used for classification or regression.
* **Use Cases**:
    1. Predictive maintenance for automobiles
    2. Sales revenue prediction
* **Advantages**:
    1. Less prone to overfitting
    2. Best suited where data suffer from multicollinearity
    3. Explainable & interpretable
* **Disadvantages**:
    1. All the predictors are kept in the final model
    2. Doesn't perform feature selection

### Lasso Regression
* **Description**: Part of the regression family, it penalizes features that have low predictive outcomes by shrinking their coefficients to zero. Can be used for classification or regression.
* **Use Cases**:
    1. Predicting housing prices
    2. Predicting clinical outcomes based on health data
* **Advantages**:
    1. Less prone to overfitting
    2. Can handle high-dimensional data
    3. No need for feature selection
* **Disadvantages**:
    1. Can lead to poor interpretability as it can keep highly correlated variables

---

## Tree-Based Models & Ensembles

### Decision Tree
* **Description**: Decision Tree models make decision rules on the features to produce predictions. It can be used for classification or regression.
* **Use Cases**:
    1. Customer churn prediction
    2. Credit score modeling
    3. Disease prediction
* **Advantages**:
    1. Explainable and interpretable
    2. Can handle missing values
* **Disadvantages**:
    1. Prone to overfitting
    2. Sensitive to outliers

### Random Forests
* **Description**: An ensemble learning method that combines the output of multiple decision trees.
* **Use Cases**:
    1. Credit score modeling
    2. Predicting housing prices
* **Advantages**:
    1. Reduces overfitting
    2. Higher accuracy compared to other models
* **Disadvantages**:
    1. Training complexity can be high
    2. Not very interpretable

### Gradient Boosting Regression
* **Description**: Gradient Boosting Regression employs boosting to make predictive models from an ensemble of weak predictive learners.
* **Use Cases**:
    1. Predicting car emissions
    2. Predicting ride-hailing fare amount
* **Advantages**:
    1. Better accuracy compared to other regression models
    2. It can handle multicollinearity
    3. It can handle non-linear relationships
* **Disadvantages**:
    1. Sensitive to outliers and can therefore cause overfitting
    2. Computationally expensive and has high complexity

### XGBoost
* **Description**: A Gradient Boosting algorithm that is highly efficient & flexible. Can be used for both classification and regression tasks.
* **Use Cases**:
    1. Churn prediction
    2. Claims processing in insurance
* **Advantages**:
    1. Provides accurate results
    2. Captures non-linear relationships
* **Disadvantages**:
    1. Hyperparameter tuning can be complex
    2. Does not perform well on sparse datasets

### LightGBM Regressor
* **Description**: A gradient boosting framework that is designed to be more efficient than other implementations.
* **Use Cases**:
    1. Predicting flight time for airlines
    2. Predicting cholesterol levels based on health data
* **Advantages**:
    1. Can handle large amounts of data
    2. Computationally efficient & fast training speed
    3. Low memory usage
* **Disadvantages**:
    1. Can overfit due to leaf-wise splitting and high sensitivity
    2. Hyperparameter tuning can be complex

---

## Unsupervised Learning: Clustering

### K-Means
* **Description**: K-Means is the most widely used clustering approach—it determines K clusters based on Euclidean distances.
* **Use Cases**:
    1. Customer segmentation
    2. Recommendation systems
* **Advantages**:
    1. Scales to large datasets
    2. Simple to implement and interpret
    3. Results in tight clusters
* **Disadvantages**:
    1. Requires the expected number of clusters from the beginning
    2. Has troubles with varying cluster sizes and densities

### Hierarchical Clustering
* **Description**: A "bottom-up" approach where each data point is treated as its own cluster, and then the closest two clusters are merged together iteratively.
* **Use Cases**:
    1. Fraud detection
    2. Document clustering based on similarity
* **Advantages**:
    1. There is no need to specify the number of clusters
    2. The resulting dendrogram is informative
* **Disadvantages**:
    1. Doesn't always result in the best clustering
    2. Not suitable for large datasets due to high complexity

### Gaussian Mixture Models (GMM)
* **Description**: A probabilistic model for modeling normally distributed clusters within a dataset.
* **Use Cases**:
    1. Customer segmentation
    2. Recommendation systems
* **Advantages**:
    1. Computes a probability for an observation belonging to a cluster
    2. Can identify overlapping clusters
    3. More accurate results compared to K-means
* **Disadvantages**:
    1. Requires complex tuning
    2. Requires setting the number of expected mixture components or clusters

---

## Unsupervised Learning: Association

### Apriori Algorithm
* **Description**: A rule-based approach that identifies the most frequent itemset in a given dataset where prior knowledge of frequent itemset properties is used.
* **Use Cases**:
    1. Product placements
    2. Recommendation engines
    3. Promotion optimization
* **Advantages**:
    1. Results are intuitive and interpretable
    2. Exhaustive approach as it finds all rules based on confidence and support
* **Disadvantages**:
    1. Generates many uninteresting itemsets
    2. Computationally and memory intensive
    3. Results in many overlapping item sets
