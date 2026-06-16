---
hide:
  - toc
---

# Complete OpenCV Methods Reference

## 1. Core concepts

OpenCV is a computer vision library built around images as NumPy arrays and provides modules for image processing, video I/O, and GUI display. The most common Python entry point is `cv2`.

### 1.1 Main modules

- **core**: basic data structures and operations.
- **imgproc**: image processing functions.
- **highgui**: display windows and simple UI.
- **videoio**: camera and video file input/output.

### 1.2 Common imports

```python
import cv2 as cv
import numpy as np
```

### 1.3 Basic image read-display example

```python
import cv2 as cv

img = cv.imread("image.jpg")
cv.imshow("Image", img)
cv.waitKey(0)
cv.destroyAllWindows()
```

---

## 2. Image I/O

OpenCV provides simple methods to read, write, and inspect images in many formats.

### 2.1 Common methods

- **`cv.imread()`** - Read an image from disk.
- **`cv.imwrite()`** - Save an image to disk.
- **`cv.haveImageReader()`** - Check if OpenCV can read a given file.
- **`cv.haveImageWriter()`** - Check if OpenCV can write a given file.
- **`cv.imdecode()`** - Decode image from a memory buffer.
- **`cv.imencode()`** - Encode image to memory buffer.

### 2.2 Read flags

- **`cv.IMREAD_COLOR`** - Read as BGR color.
- **`cv.IMREAD_GRAYSCALE`** - Read as grayscale.
- **`cv.IMREAD_UNCHANGED`** - Preserve alpha channel and original format.

### 2.3 Example

```python
img = cv.imread("photo.jpg", cv.IMREAD_COLOR)
gray = cv.imread("photo.jpg", cv.IMREAD_GRAYSCALE)
cv.imwrite("gray_output.png", gray)
```

---

## 3. Display and GUI

HighGUI handles simple windows, keyboard input, mouse interaction, and image display.

### 3.1 Common GUI methods

- **`cv.imshow()`** - Show an image in a window.
- **`cv.waitKey()`** - Wait for key press.
- **`cv.destroyAllWindows()`** - Close all windows.
- **`cv.destroyWindow()`** - Close one window.
- **`cv.namedWindow()`** - Create a named window.
- **`cv.resizeWindow()`** - Resize a window.
- **`cv.setMouseCallback()`** - Register mouse event handler.
- **`cv.createTrackbar()`** - Create a trackbar.
- **`cv.getTrackbarPos()`** - Read trackbar value.

### 3.2 Example

```python
import cv2 as cv

img = cv.imread("image.jpg")
cv.namedWindow("Viewer", cv.WINDOW_NORMAL)
cv.imshow("Viewer", img)
cv.waitKey(0)
cv.destroyAllWindows()
```

---

## 4. Basic image operations

Images are usually stored as NumPy arrays, so slicing, indexing, and arithmetic operations are very common.

### 4.1 Basic operations

- **`cv.add()`** - Saturated addition.
- **`cv.subtract()`** - Saturated subtraction.
- **`cv.multiply()`** - Multiply arrays.
- **`cv.divide()`** - Divide arrays.
- **`cv.bitwise_and()`** - Bitwise AND.
- **`cv.bitwise_or()`** - Bitwise OR.
- **`cv.bitwise_xor()`** - Bitwise XOR.
- **`cv.bitwise_not()`** - Bitwise NOT.
- **`cv.addWeighted()`** - Weighted image blending.
- **`cv.copyMakeBorder()`** - Add border around an image.

### 4.2 Example

```python
img1 = cv.imread("a.jpg")
img2 = cv.imread("b.jpg")
blend = cv.addWeighted(img1, 0.7, img2, 0.3, 0)
cv.imwrite("blend.png", blend)
```

---

## 5. Color spaces

OpenCV supports many color conversions, which are essential for preprocessing and segmentation.

### 5.1 Common methods

- **`cv.cvtColor()`** - Convert between color spaces.
- **`cv.split()`** - Split channels.
- **`cv.merge()`** - Merge channels.

### 5.2 Common conversion codes

- **`cv.COLOR_BGR2GRAY`**
- **`cv.COLOR_BGR2RGB`**
- **`cv.COLOR_RGB2BGR`**
- **`cv.COLOR_BGR2HSV`**
- **`cv.COLOR_BGR2LAB`**
- **`cv.COLOR_BGR2YCrCb`**

### 5.3 Example

```python
img = cv.imread("image.jpg")
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
hsv = cv.cvtColor(img, cv.COLOR_BGR2HSV)
```

---

## 6. Filtering and smoothing

Filtering is used to remove noise, smooth images, and enhance features.

### 6.1 Common methods

- **`cv.blur()`** - Mean blur.
- **`cv.GaussianBlur()`** - Gaussian smoothing.
- **`cv.medianBlur()`** - Median filter.
- **`cv.bilateralFilter()`** - Edge-preserving smoothing.
- **`cv.filter2D()`** - Apply a custom kernel.
- **`cv.boxFilter()`** - Normalize or unnormalized box filter.

### 6.2 Example

```python
img = cv.imread("image.jpg")
blur = cv.GaussianBlur(img, (5, 5), 0)
median = cv.medianBlur(img, 5)
```

---

## 7. Thresholding and masking

Thresholding separates pixels into classes and is often used before contour extraction or segmentation.

### 7.1 Common methods

- **`cv.threshold()`** - Apply global threshold.
- **`cv.adaptiveThreshold()`** - Adaptive thresholding.
- **`cv.inRange()`** - Create binary mask for a value range.
- **`cv.compare()`** - Compare arrays.
- **`cv.normalize()`** - Scale values into a range.

### 7.2 Example

```python
img = cv.imread("image.jpg", cv.IMREAD_GRAYSCALE)
_, thresh = cv.threshold(img, 127, 255, cv.THRESH_BINARY)
```

---

## 8. Morphological operations

Morphology is useful for cleaning masks, connecting regions, and removing noise.

### 8.1 Common methods

- **`cv.erode()`** - Erode foreground.
- **`cv.dilate()`** - Dilate foreground.
- **`cv.morphologyEx()`** - Apply advanced morphology.
- **`cv.getStructuringElement()`** - Create a kernel.

### 8.2 Morphology operations

- **`cv.MORPH_OPEN`** - Erosion followed by dilation.
- **`cv.MORPH_CLOSE`** - Dilation followed by erosion.
- **`cv.MORPH_GRADIENT`** - Difference between dilation and erosion.
- **`cv.MORPH_TOPHAT`** - Difference between input and opening.
- **`cv.MORPH_BLACKHAT`** - Difference between closing and input.

### 8.3 Example

```python
kernel = cv.getStructuringElement(cv.MORPH_RECT, (3, 3))
opened = cv.morphologyEx(thresh, cv.MORPH_OPEN, kernel)
```

---

## 9. Geometric transforms

Geometric operations are used for resizing, rotating, warping, and perspective correction.

### 9.1 Common methods

- **`cv.resize()`** - Resize image.
- **`cv.rotate()`** - Rotate by fixed angles.
- **`cv.warpAffine()`** - Apply affine transform.
- **`cv.warpPerspective()`** - Apply perspective transform.
- **`cv.getRotationMatrix2D()`** - Create rotation matrix.
- **`cv.getAffineTransform()`** - Create affine transform matrix.
- **`cv.getPerspectiveTransform()`** - Create perspective transform matrix.
- **`cv.remap()`** - Apply arbitrary mapping.
- **`cv.flip()`** - Flip image.
- **`cv.transpose()`** - Transpose image.

### 9.2 Example

```python
img = cv.imread("image.jpg")
resized = cv.resize(img, (800, 600))
rot_mat = cv.getRotationMatrix2D((400, 300), 30, 1.0)
rotated = cv.warpAffine(resized, rot_mat, (800, 600))
```

---

## 10. Edge detection

Edge detection helps identify boundaries and structural changes in an image.

### 10.1 Common methods

- **`cv.Canny()`** - Canny edge detector.
- **`cv.Sobel()`** - Sobel derivative.
- **`cv.Scharr()`** - Scharr derivative.
- **`cv.Laplacian()`** - Laplacian edge detection.

### 10.2 Example

```python
img = cv.imread("image.jpg", cv.IMREAD_GRAYSCALE)
edges = cv.Canny(img, 100, 200)
```

---

## 11. Contours and shape analysis

Contours are curves joining boundary points of objects in binary images. They are useful for object detection, shape analysis, and measurement.

### 11.1 Common methods

- **`cv.findContours()`** - Find contours in a binary image.
- **`cv.drawContours()`** - Draw contours on an image.
- **`cv.contourArea()`** - Compute contour area.
- **`cv.arcLength()`** - Compute contour perimeter.
- **`cv.approxPolyDP()`** - Approximate contour shape.
- **`cv.boundingRect()`** - Get axis-aligned bounding rectangle.
- **`cv.minAreaRect()`** - Get minimum rotated rectangle.
- **`cv.minEnclosingCircle()`** - Smallest enclosing circle.
- **`cv.convexHull()`** - Compute convex hull.
- **`cv.fitEllipse()`** - Fit ellipse to points.
- **`cv.moments()`** - Compute image moments.

### 11.2 Example

```python
img = cv.imread("shapes.png")
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
_, thresh = cv.threshold(gray, 127, 255, cv.THRESH_BINARY)

contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
cv.drawContours(img, contours, -1, (0, 255, 0), 2)
```

### 11.3 Contour feature example

```python
for cnt in contours:
    area = cv.contourArea(cnt)
    perimeter = cv.arcLength(cnt, True)
    approx = cv.approxPolyDP(cnt, 0.02 * perimeter, True)
```

---

## 12. Drawing functions

OpenCV includes functions for drawing geometric primitives and annotating images.

### 12.1 Common drawing methods

- **`cv.line()`** - Draw a line.
- **`cv.circle()`** - Draw a circle.
- **`cv.rectangle()`** - Draw a rectangle.
- **`cv.polylines()`** - Draw polyline.
- **`cv.fillPoly()`** - Fill polygons.
- **`cv.putText()`** - Draw text.
- **`cv.arrowedLine()`** - Draw an arrow line.

### 12.2 Example

```python
img = np.zeros((400, 400, 3), dtype=np.uint8)
cv.rectangle(img, (50, 50), (200, 200), (0, 255, 0), 2)
cv.circle(img, (300, 100), 40, (255, 0, 0), -1)
cv.putText(img, "OpenCV", (50, 350), cv.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
```

---

## 13. Video I/O

Video processing is handled by `videoio`, which supports cameras, video files, and frame-by-frame processing.

### 13.1 Common methods

- **`cv.VideoCapture()`** - Open a camera or video file.
- **`cv.VideoWriter()`** - Write video files.
- **`VideoCapture.read()`** - Read the next frame.
- **`VideoCapture.isOpened()`** - Check if capture is available.
- **`VideoCapture.get()`** - Read capture properties.
- **`VideoCapture.set()`** - Set capture properties.
- **`VideoWriter.write()`** - Write a video frame.
- **`VideoWriter.release()`** - Release the writer or capture.

### 13.2 Example

```python
cap = cv.VideoCapture(0)
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    cv.imshow("Camera", frame)
    if cv.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv.destroyAllWindows()
```

---

## 14. Feature detection and matching

OpenCV provides feature detectors and matchers for tracking, stitching, and recognition tasks.

### 14.1 Common methods

- **`cv.ORB_create()`** - ORB feature detector and descriptor.
- **`cv.SIFT_create()`** - SIFT feature detector.
- **`cv.AKAZE_create()`** - AKAZE feature detector.
- **`cv.BFMatcher()`** - Brute-force descriptor matcher.
- **`cv.FlannBasedMatcher()`** - FLANN matcher.
- **`cv.drawMatches()`** - Visualize feature matches.
- **`cv.cornerHarris()`** - Harris corner detection.
- **`cv.goodFeaturesToTrack()`** - Detect strong corners.

### 14.2 Example

```python
img1 = cv.imread("img1.jpg", cv.IMREAD_GRAYSCALE)
img2 = cv.imread("img2.jpg", cv.IMREAD_GRAYSCALE)

orb = cv.ORB_create()
kp1, des1 = orb.detectAndCompute(img1, None)
kp2, des2 = orb.detectAndCompute(img2, None)

bf = cv.BFMatcher(cv.NORM_HAMMING, crossCheck=True)
matches = bf.match(des1, des2)
matches = sorted(matches, key=lambda x: x.distance)
```

---

## 15. Object detection utilities

OpenCV includes many classic detection tools and pretrained cascade classifiers.

### 15.1 Common methods

- **`cv.CascadeClassifier()`** - Load Haar cascade classifier.
- **`CascadeClassifier.detectMultiScale()`** - Detect objects at multiple scales.
- **`cv.HOGDescriptor()`** - HOG-based detector.
- **`HOGDescriptor.detectMultiScale()`** - Detect objects with HOG.
- **`cv.dnn.readNet()`** - Load deep learning model.
- **`cv.dnn.blobFromImage()`** - Create input blob for DNN.
- **`net.forward()`** - Run inference.

### 15.2 Example

```python
face_cascade = cv.CascadeClassifier(cv.data.haarcascades + "haarcascade_frontalface_default.xml")
img = cv.imread("people.jpg")
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
for (x, y, w, h) in faces:
    cv.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
```

---

## 16. Image pyramids and filtering

These methods are used for multiscale analysis and image enhancement.

### 16.1 Common methods

- **`cv.pyrUp()`** - Upsample image.
- **`cv.pyrDown()`** - Downsample image.
- **`cv.Laplacian()`** - Laplacian pyramid step.
- **`cv.filter2D()`** - Apply custom convolution kernel.

### 16.2 Example

```python
img = cv.imread("image.jpg")
down = cv.pyrDown(img)
up = cv.pyrUp(down)
```

---

## 17. File storage and parameters

OpenCV also supports structured storage, configuration, and parameter handling.

### 17.1 Common methods

- **`cv.FileStorage()`** - Read or write XML/YAML files.
- **`cv.getBuildInformation()`** - Show build configuration.
- **`cv.setNumThreads()`** - Set OpenCV thread count.
- **`cv.getNumThreads()`** - Get thread count.

---

## 18. Useful example workflows

### 18.1 Edge detection pipeline

```python
import cv2 as cv

img = cv.imread("image.jpg")
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
blur = cv.GaussianBlur(gray, (5, 5), 0)
edges = cv.Canny(blur, 100, 200)
cv.imwrite("edges.png", edges)
```

### 18.2 Contour extraction pipeline

```python
import cv2 as cv

img = cv.imread("shapes.png")
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
_, thresh = cv.threshold(gray, 127, 255, cv.THRESH_BINARY)
contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

output = img.copy()
cv.drawContours(output, contours, -1, (0, 255, 0), 2)
cv.imwrite("contours.png", output)
```

### 18.3 Face detection pipeline

```python
import cv2 as cv

face_cascade = cv.CascadeClassifier(cv.data.haarcascades + "haarcascade_frontalface_default.xml")
img = cv.imread("people.jpg")
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, 1.1, 5)

for (x, y, w, h) in faces:
    cv.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

cv.imwrite("faces_detected.png", img)
```

---

## 19. Quick reference table

| Area | Key methods | Purpose |
|---|---|---|
| Image I/O | `cv.imread()`, `cv.imwrite()` | Read and save images. |
| Display | `cv.imshow()`, `cv.waitKey()` | Show images in windows. |
| Color conversion | `cv.cvtColor()` | Convert between color spaces. |
| Filtering | `cv.GaussianBlur()`, `cv.medianBlur()`, `cv.filter2D()` | Smooth or enhance images. |
| Thresholding | `cv.threshold()`, `cv.adaptiveThreshold()` | Create binary masks. |
| Morphology | `cv.erode()`, `cv.dilate()`, `cv.morphologyEx()` | Clean and refine masks. |
| Geometry | `cv.resize()`, `cv.warpAffine()`, `cv.warpPerspective()` | Transform images. |
| Edges | `cv.Canny()`, `cv.Sobel()` | Detect boundaries. |
| Contours | `cv.findContours()`, `cv.drawContours()` | Extract and visualize shapes. |
| Video | `cv.VideoCapture()`, `cv.VideoWriter()` | Process camera and video files. |
| Features | `cv.ORB_create()`, `cv.BFMatcher()` | Detect and match image features. |
| Detection | `cv.CascadeClassifier()`, `cv.dnn.readNet()` | Detect objects or run deep models. |

---

## 20. Example full workflow

```python
import cv2 as cv

img = cv.imread("input.jpg")
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
blur = cv.GaussianBlur(gray, (5, 5), 0)
edges = cv.Canny(blur, 50, 150)

contours, hierarchy = cv.findContours(edges, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
result = img.copy()
cv.drawContours(result, contours, -1, (0, 255, 0), 2)

cv.imwrite("opencv_result.png", result)
```