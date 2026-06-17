---
hide:
  - toc
---

# Streamlit Complete Tutorial

A comprehensive guide to building data apps with Streamlit — covering every major method, use case, and working examples.

---

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Text & Markdown Display](#text--markdown-display)
3. [Data Display](#data-display)
4. [Charts & Visualization](#charts--visualization)
5. [Input Widgets](#input-widgets)
6. [Layout & Containers](#layout--containers)
7. [Media](#media)
8. [State Management](#state-management)
9. [Caching](#caching)
10. [Forms](#forms)
11. [Progress & Status](#progress--status)
12. [Sidebar](#sidebar)
13. [Pages & Navigation](#pages--navigation)
14. [Configuration](#configuration)
15. [Complete App Example](#complete-app-example)

---

## Installation & Setup

```bash
pip install streamlit
streamlit run app.py
```

Every Streamlit app is a plain Python script. Streamlit reruns the script top-to-bottom on every user interaction.

```python
import streamlit as st
import pandas as pd
import numpy as np
```

---

## Text & Markdown Display

### `st.title()`

Renders a large page title.

```python
st.title("My Streamlit App")
```

---

### `st.header()` / `st.subheader()`

Section and subsection headings.

```python
st.header("Section One")
st.subheader("A smaller heading")
```

---

### `st.text()`

Renders fixed-width plain text. Useful for logs or raw output.

```python
st.text("Hello, world!")
st.text("Fixed-width output:\n  key = value")
```

---

### `st.markdown()`

Renders GitHub-flavored Markdown including HTML (when `unsafe_allow_html=True`).

```python
st.markdown("**Bold**, _italic_, `code`")
st.markdown("## Dynamic heading")
st.markdown("<span style='color:red'>Red text</span>", unsafe_allow_html=True)
```

---

### `st.caption()`

Small grey caption text, typically used below charts or images.

```python
st.caption("Figure 1: Monthly revenue, 2024")
```

---

### `st.code()`

Renders a syntax-highlighted code block.

```python
st.code("""
def greet(name):
    return f"Hello, {name}!"
""", language="python")
```

---

### `st.latex()`

Renders LaTeX math expressions.

```python
st.latex(r"\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}")
```

---

### `st.divider()`

Draws a horizontal rule.

```python
st.divider()
```

---

### `st.write()`

Swiss-army-knife method. Accepts strings, DataFrames, dicts, Matplotlib figures, and more.

```python
st.write("Hello!")
st.write({"key": "value", "count": 42})
st.write(pd.DataFrame({"A": [1, 2], "B": [3, 4]}))
```

---

## Data Display

### `st.dataframe()`

Interactive, scrollable table with sorting and column resizing.

```python
df = pd.DataFrame(np.random.randn(10, 4), columns=["A", "B", "C", "D"])
st.dataframe(df, use_container_width=True)
```

**With column configuration:**

```python
st.dataframe(
    df,
    column_config={
        "A": st.column_config.NumberColumn("Column A", format="%.2f"),
        "B": st.column_config.ProgressColumn("Progress", min_value=0, max_value=5),
    },
    hide_index=True,
)
```

---

### `st.table()`

Static, non-interactive table. Renders the full DataFrame without scrolling.

```python
st.table(df.head(5))
```

---

### `st.metric()`

Displays a KPI metric with an optional delta indicator.

```python
st.metric(label="Revenue", value="$12,400", delta="+8.2%")
st.metric(label="Churn Rate", value="4.1%", delta="-0.3%", delta_color="inverse")
```

---

### `st.json()`

Renders a collapsible, interactive JSON tree.

```python
st.json({
    "name": "Alice",
    "scores": [98, 87, 95],
    "active": True
})
```

---

## Charts & Visualization

### `st.line_chart()`

```python
chart_data = pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"])
st.line_chart(chart_data)
```

---

### `st.bar_chart()`

```python
st.bar_chart(chart_data)
```

---

### `st.area_chart()`

```python
st.area_chart(chart_data)
```

---

### `st.scatter_chart()`

```python
df = pd.DataFrame({
    "x": np.random.randn(100),
    "y": np.random.randn(100),
    "size": np.random.randint(10, 100, 100),
})
st.scatter_chart(df, x="x", y="y", size="size")
```

---

### `st.map()`

Renders dots on a map using latitude/longitude columns.

```python
map_data = pd.DataFrame(
    np.random.randn(100, 2) / [50, 50] + [37.76, -122.4],
    columns=["lat", "lon"]
)
st.map(map_data)
```

---

### `st.pyplot()`

Renders a Matplotlib figure.

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.hist(np.random.randn(500), bins=30)
ax.set_title("Normal Distribution")
st.pyplot(fig)
```

---

### `st.plotly_chart()`

Renders an interactive Plotly figure.

```python
import plotly.express as px

fig = px.scatter(px.data.iris(), x="sepal_width", y="sepal_length", color="species")
st.plotly_chart(fig, use_container_width=True)
```

---

### `st.altair_chart()`

```python
import altair as alt

chart = alt.Chart(df).mark_circle().encode(x="x", y="y")
st.altair_chart(chart, use_container_width=True)
```

---

## Input Widgets

All widgets return their current value and trigger a rerun when changed.

### `st.button()`

```python
if st.button("Click me"):
    st.write("Button was clicked!")
```

---

### `st.checkbox()`

```python
show_data = st.checkbox("Show raw data", value=False)
if show_data:
    st.dataframe(df)
```

---

### `st.radio()`

```python
option = st.radio("Choose a color", ["Red", "Green", "Blue"])
st.write(f"You chose: {option}")
```

---

### `st.selectbox()`

```python
city = st.selectbox("Select a city", ["Berlin", "London", "Tokyo", "New York"])
st.write(f"Selected: {city}")
```

---

### `st.multiselect()`

```python
tags = st.multiselect("Pick tags", ["Python", "Data", "ML", "Web", "API"], default=["Python"])
st.write(f"Tags: {tags}")
```

---

### `st.slider()`

```python
age = st.slider("Select age", min_value=0, max_value=100, value=25)
st.write(f"Age: {age}")

# Range slider
price_range = st.slider("Price range", 0, 1000, (100, 500))
st.write(f"From {price_range[0]} to {price_range[1]}")
```

---

### `st.select_slider()`

```python
size = st.select_slider("T-shirt size", options=["XS", "S", "M", "L", "XL", "XXL"], value="M")
```

---

### `st.text_input()`

```python
name = st.text_input("Your name", placeholder="Enter full name")
st.write(f"Hello, {name}!")
```

---

### `st.text_area()`

```python
bio = st.text_area("Bio", height=150, placeholder="Tell us about yourself...")
st.write(bio)
```

---

### `st.number_input()`

```python
quantity = st.number_input("Quantity", min_value=1, max_value=100, value=1, step=1)
price = st.number_input("Unit price (€)", min_value=0.0, value=9.99, step=0.01)
st.write(f"Total: €{quantity * price:.2f}")
```

---

### `st.date_input()`

```python
import datetime

start = st.date_input("Start date", value=datetime.date.today())
st.write(f"Selected: {start}")
```

---

### `st.time_input()`

```python
meeting_time = st.time_input("Meeting time", value=datetime.time(9, 0))
st.write(f"Meeting at: {meeting_time}")
```

---

### `st.color_picker()`

```python
color = st.color_picker("Pick a color", value="#FF4B4B")
st.write(f"Chosen hex: {color}")
```

---

### `st.file_uploader()`

```python
uploaded = st.file_uploader("Upload a CSV", type=["csv"])
if uploaded:
    df = pd.read_csv(uploaded)
    st.dataframe(df)
```

---

### `st.camera_input()`

```python
photo = st.camera_input("Take a photo")
if photo:
    st.image(photo)
```

---

### `st.download_button()`

```python
csv = df.to_csv(index=False).encode("utf-8")
st.download_button("Download CSV", data=csv, file_name="data.csv", mime="text/csv")
```

---

## Layout & Containers

### `st.columns()`

Divides the page into side-by-side columns.

```python
col1, col2, col3 = st.columns(3)

with col1:
    st.metric("Users", 1_240, "+12%")

with col2:
    st.metric("Revenue", "$8,400", "+4%")

with col3:
    st.metric("Churn", "2.1%", "-0.3%", delta_color="inverse")
```

Weighted columns:

```python
left, right = st.columns([2, 1])  # left is twice as wide
```

---

### `st.tabs()`

```python
tab1, tab2, tab3 = st.tabs(["Overview", "Details", "Raw Data"])

with tab1:
    st.write("Summary statistics here")

with tab2:
    st.write("Detailed breakdown here")

with tab3:
    st.dataframe(df)
```

---

### `st.expander()`

Collapsible section.

```python
with st.expander("Show advanced options"):
    threshold = st.slider("Threshold", 0.0, 1.0, 0.5)
    normalize = st.checkbox("Normalize inputs")
```

---

### `st.container()`

Groups elements without visual separation.

```python
with st.container():
    st.write("This is inside a container")
    st.bar_chart(chart_data)
```

---

### `st.empty()`

Placeholder that can be overwritten later.

```python
placeholder = st.empty()

for i in range(5):
    placeholder.write(f"Step {i + 1} of 5...")
    import time; time.sleep(0.5)

placeholder.success("Done!")
```

---

## Media

### `st.image()`

```python
st.image("logo.png", caption="Company logo", width=200)
st.image("https://example.com/photo.jpg", use_container_width=True)
```

---

### `st.audio()`

```python
st.audio("podcast.mp3", format="audio/mp3")
```

---

### `st.video()`

```python
st.video("demo.mp4")
st.video("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
```

---

## State Management

Without session state, every rerun loses all local variables.

### `st.session_state`

```python
# Initialize
if "counter" not in st.session_state:
    st.session_state.counter = 0

# Increment
if st.button("Increment"):
    st.session_state.counter += 1

st.write(f"Count: {st.session_state.counter}")
```

**Using callbacks:**

```python
def reset():
    st.session_state.counter = 0

st.button("Reset", on_click=reset)
```

**Persisting form data:**

```python
if "username" not in st.session_state:
    st.session_state.username = ""

st.session_state.username = st.text_input("Username", value=st.session_state.username)
```

---

## Caching

### `@st.cache_data`

Caches the return value of a function. Use for data loading and transformations.

```python
@st.cache_data
def load_data(url: str) -> pd.DataFrame:
    return pd.read_csv(url)

df = load_data("https://example.com/data.csv")
```

Cache expires after a TTL:

```python
@st.cache_data(ttl=600)  # seconds
def fetch_live_prices():
    return requests.get("https://api.example.com/prices").json()
```

---

### `@st.cache_resource`

Caches a shared resource (e.g., a database connection or ML model). Not copied between sessions.

```python
@st.cache_resource
def load_model():
    import joblib
    return joblib.load("model.pkl")

model = load_model()
prediction = model.predict([[1.2, 0.8, 3.4]])
```

---

## Forms

Forms batch widget interactions — Streamlit only reruns when the submit button is pressed.

```python
with st.form("login_form"):
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    remember = st.checkbox("Remember me")
    submitted = st.form_submit_button("Log in")

if submitted:
    if username == "admin" and password == "secret":
        st.success(f"Welcome, {username}!")
    else:
        st.error("Invalid credentials.")
```

---

## Progress & Status

### `st.progress()`

```python
import time

bar = st.progress(0)
for i in range(101):
    bar.progress(i)
    time.sleep(0.02)
st.success("Complete!")
```

---

### `st.spinner()`

```python
with st.spinner("Loading data..."):
    time.sleep(2)
    df = pd.DataFrame(np.random.randn(100, 3))

st.success("Data loaded!")
```

---

### `st.toast()`

Non-blocking notification that fades out.

```python
st.toast("Saved successfully!", icon="✅")
```

---

### Status messages

```python
st.success("Operation succeeded.")
st.info("Informational message.")
st.warning("This action cannot be undone.")
st.error("Something went wrong.")
st.exception(ValueError("An example exception"))
```

---

### `st.status()`

Expandable status block for long-running tasks.

```python
with st.status("Running pipeline...", expanded=True) as status:
    st.write("Step 1: Loading data")
    time.sleep(1)
    st.write("Step 2: Processing")
    time.sleep(1)
    status.update(label="Pipeline complete!", state="complete", expanded=False)
```

---

## Sidebar

All Streamlit widgets can be placed in the sidebar using `st.sidebar`.

```python
st.sidebar.title("Controls")

dataset = st.sidebar.selectbox("Dataset", ["Iris", "Titanic", "Cars"])
n_rows  = st.sidebar.slider("Rows to display", 5, 100, 20)
show_chart = st.sidebar.checkbox("Show chart", True)

st.write(f"Showing {n_rows} rows from {dataset}")
```

Using `with` syntax:

```python
with st.sidebar:
    st.header("Filters")
    min_age = st.slider("Min age", 0, 100, 18)
    gender  = st.multiselect("Gender", ["M", "F", "Other"], default=["M", "F"])
```

---

## Pages & Navigation

### Multi-page apps (folder structure)

```
my_app/
├── app.py           # Main entry point
└── pages/
    ├── 1_Overview.py
    ├── 2_Analysis.py
    └── 3_Settings.py
```

Each file in `pages/` becomes a page in the sidebar navigation automatically.

---

### `st.navigation()` (Streamlit ≥ 1.36)

Programmatic navigation with full control over the sidebar.

```python
# app.py
import streamlit as st

pages = {
    "Main": [
        st.Page("pages/home.py", title="Home", icon="🏠"),
        st.Page("pages/dashboard.py", title="Dashboard", icon="📊"),
    ],
    "Settings": [
        st.Page("pages/config.py", title="Configuration", icon="⚙️"),
    ]
}

pg = st.navigation(pages)
pg.run()
```

---

### `st.switch_page()`

Navigate to another page programmatically.

```python
if st.button("Go to Dashboard"):
    st.switch_page("pages/dashboard.py")
```

---

## Configuration

`streamlit run app.py` accepts flags:

```bash
streamlit run app.py --server.port 8080 --server.headless true
```

Or use `.streamlit/config.toml`:

```toml
[theme]
primaryColor        = "#FF4B4B"
backgroundColor     = "#FFFFFF"
secondaryBackgroundColor = "#F0F2F6"
textColor           = "#31333F"
font                = "sans serif"

[server]
port        = 8501
headless    = true
maxUploadSize = 200  # MB
```

---

## Page config

```python
st.set_page_config(
    page_title="My App",
    page_icon="📊",
    layout="wide",            # "centered" (default) or "wide"
    initial_sidebar_state="expanded",  # "auto", "expanded", "collapsed"
    menu_items={
        "Get Help": "https://docs.streamlit.io",
        "Report a bug": "https://github.com/my/repo/issues",
        "About": "Built with Streamlit",
    }
)
```

!!! warning
    `st.set_page_config()` must be the **first** Streamlit command in your script.

---

## Complete App Example

A fully working data explorer app demonstrating most of the features above.

```python
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px

# ── Page config ──────────────────────────────────────────────
st.set_page_config(
    page_title="Sales Explorer",
    page_icon="📈",
    layout="wide",
)

# ── Data loading with caching ─────────────────────────────────
@st.cache_data
def generate_sales_data(n: int = 500) -> pd.DataFrame:
    np.random.seed(42)
    regions   = ["North", "South", "East", "West"]
    products  = ["Widget A", "Widget B", "Widget C"]
    return pd.DataFrame({
        "date":    pd.date_range("2024-01-01", periods=n, freq="D").repeat(1)[:n],
        "region":  np.random.choice(regions, n),
        "product": np.random.choice(products, n),
        "revenue": np.random.exponential(scale=1000, size=n).round(2),
        "units":   np.random.randint(1, 50, n),
    })

df = generate_sales_data()

# ── Sidebar filters ────────────────────────────────────────────
with st.sidebar:
    st.header("🔍 Filters")

    selected_regions = st.multiselect(
        "Region", df["region"].unique(), default=list(df["region"].unique())
    )
    selected_products = st.multiselect(
        "Product", df["product"].unique(), default=list(df["product"].unique())
    )
    min_rev, max_rev = st.slider(
        "Revenue range (€)",
        float(df["revenue"].min()), float(df["revenue"].max()),
        (float(df["revenue"].min()), float(df["revenue"].max())),
    )

# ── Filter data ────────────────────────────────────────────────
filtered = df[
    df["region"].isin(selected_regions) &
    df["product"].isin(selected_products) &
    df["revenue"].between(min_rev, max_rev)
]

# ── Header ─────────────────────────────────────────────────────
st.title("📈 Sales Explorer")
st.caption(f"Showing {len(filtered):,} of {len(df):,} records")

# ── KPI row ────────────────────────────────────────────────────
k1, k2, k3, k4 = st.columns(4)
k1.metric("Total Revenue", f"€{filtered['revenue'].sum():,.0f}")
k2.metric("Avg Revenue",   f"€{filtered['revenue'].mean():,.0f}")
k3.metric("Total Units",   f"{filtered['units'].sum():,}")
k4.metric("Records",       f"{len(filtered):,}")

st.divider()

# ── Charts ─────────────────────────────────────────────────────
tab1, tab2, tab3 = st.tabs(["Revenue Over Time", "By Region", "Raw Data"])

with tab1:
    daily = filtered.groupby("date")["revenue"].sum().reset_index()
    fig = px.line(daily, x="date", y="revenue", title="Daily Revenue")
    st.plotly_chart(fig, use_container_width=True)

with tab2:
    col_a, col_b = st.columns(2)
    with col_a:
        region_df = filtered.groupby("region")["revenue"].sum().reset_index()
        fig2 = px.bar(region_df, x="region", y="revenue", title="Revenue by Region",
                      color="region")
        st.plotly_chart(fig2, use_container_width=True)
    with col_b:
        prod_df = filtered.groupby("product")["revenue"].sum().reset_index()
        fig3 = px.pie(prod_df, names="product", values="revenue", title="Revenue by Product")
        st.plotly_chart(fig3, use_container_width=True)

with tab3:
    st.dataframe(
        filtered.sort_values("revenue", ascending=False),
        use_container_width=True,
        hide_index=True,
    )
    csv = filtered.to_csv(index=False).encode("utf-8")
    st.download_button("⬇️ Download filtered data", csv, "sales_filtered.csv", "text/csv")

# ── Footer ──────────────────────────────────────────────────────
st.divider()
st.caption("Built with Streamlit · Data is randomly generated for demo purposes")
```

---

## Quick Reference Card

| Method | Category | Returns |
|---|---|---|
| `st.write()` | Display | — |
| `st.markdown()` | Text | — |
| `st.dataframe()` | Data | — |
| `st.metric()` | Data | — |
| `st.line_chart()` | Chart | — |
| `st.plotly_chart()` | Chart | — |
| `st.button()` | Widget | `bool` |
| `st.slider()` | Widget | `int / float / tuple` |
| `st.selectbox()` | Widget | `Any` |
| `st.text_input()` | Widget | `str` |
| `st.file_uploader()` | Widget | `UploadedFile` |
| `st.columns()` | Layout | `list[DeltaGenerator]` |
| `st.tabs()` | Layout | `list[DeltaGenerator]` |
| `st.expander()` | Layout | `DeltaGenerator` |
| `st.form()` | Form | context manager |
| `st.session_state` | State | dict-like |
| `@st.cache_data` | Cache | decorator |
| `@st.cache_resource` | Cache | decorator |
| `st.spinner()` | Status | context manager |
| `st.progress()` | Status | `ProgressMixin` |

---

## Useful Links

- [Official docs](https://docs.streamlit.io)
- [API reference](https://docs.streamlit.io/develop/api-reference)
- [Component gallery](https://streamlit.io/components)
- [Streamlit Cloud deployment](https://streamlit.io/cloud)
- [Community forum](https://discuss.streamlit.io)
