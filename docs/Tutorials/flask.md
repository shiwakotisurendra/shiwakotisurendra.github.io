---
hide:
  - toc
---

# Flask Complete Tutorial

A comprehensive guide to building web applications with Flask — covering every major method, use case, and working examples.

---

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Application Factory](#application-factory)
3. [Routing](#routing)
4. [Request Object](#request-object)
5. [Response Object](#response-object)
6. [Templates (Jinja2)](#templates-jinja2)
7. [Static Files](#static-files)
8. [Blueprints](#blueprints)
9. [Configuration](#configuration)
10. [Database with Flask-SQLAlchemy](#database-with-flask-sqlalchemy)
11. [Forms with Flask-WTF](#forms-with-flask-wtf)
12. [Authentication with Flask-Login](#authentication-with-flask-login)
13. [REST APIs & JSON](#rest-apis--json)
14. [Error Handling](#error-handling)
15. [Middleware & Hooks](#middleware--hooks)
16. [Sessions & Cookies](#sessions--cookies)
17. [File Uploads](#file-uploads)
18. [Testing](#testing)
19. [Deployment](#deployment)
20. [Complete App Example](#complete-app-example)

---

## Installation & Setup

```bash
pip install flask
```

Minimal app (`app.py`):

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello, Flask!"

if __name__ == "__main__":
    app.run(debug=True)
```

Run it:

```bash
flask --app app run --debug
# or
python app.py
```

Visit `http://127.0.0.1:5000`.

---

## Application Factory

The factory pattern allows multiple app instances (useful for testing) and avoids circular imports.

```python
# app/__init__.py
from flask import Flask
from .extensions import db, login_manager

def create_app(config_name="default"):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Init extensions
    db.init_app(app)
    login_manager.init_app(app)

    # Register blueprints
    from .main   import main   as main_bp
    from .auth   import auth   as auth_bp
    from .api    import api    as api_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp,  url_prefix="/auth")
    app.register_blueprint(api_bp,   url_prefix="/api/v1")

    return app
```

```python
# wsgi.py
from app import create_app
app = create_app()
```

---

## Routing

### Basic routes

```python
@app.route("/")
def index():
    return "Home page"

@app.route("/about")
def about():
    return "About page"
```

---

### Variable rules

```python
@app.route("/user/<username>")
def profile(username):
    return f"Profile: {username}"

@app.route("/post/<int:post_id>")
def post(post_id):
    return f"Post #{post_id}"

@app.route("/path/<path:subpath>")
def show_path(subpath):
    return f"Subpath: {subpath}"
```

**Converter types:**

| Converter | Type | Example |
|---|---|---|
| `string` | str (default) | `<name>` |
| `int` | integer | `<int:id>` |
| `float` | floating point | `<float:value>` |
| `path` | string with slashes | `<path:filepath>` |
| `uuid` | UUID string | `<uuid:token>` |

---

### HTTP methods

```python
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        return "Logging in..."
    return "Show login form"
```

---

### `url_for()`

Always use `url_for()` to build URLs — it handles changes automatically.

```python
from flask import url_for

with app.test_request_context():
    print(url_for("index"))                    # /
    print(url_for("profile", username="bob"))  # /user/bob
    print(url_for("static", filename="style.css"))
```

---

### Redirects

```python
from flask import redirect, url_for

@app.route("/old-page")
def old_page():
    return redirect(url_for("new_page"), code=301)

@app.route("/new-page")
def new_page():
    return "Welcome to the new page!"
```

---

## Request Object

`flask.request` is a thread-local proxy to the current HTTP request.

```python
from flask import request
```

### Query string

```python
@app.route("/search")
def search():
    query = request.args.get("q", "")       # ?q=flask
    page  = request.args.get("page", 1, type=int)
    return f"Search: {query}, page {page}"
```

---

### Form data

```python
@app.route("/submit", methods=["POST"])
def submit():
    username = request.form["username"]
    password = request.form.get("password", "")
    return f"Received: {username}"
```

---

### JSON body

```python
@app.route("/api/data", methods=["POST"])
def receive_json():
    data = request.get_json()               # dict or None
    name = data.get("name") if data else ""
    return {"received": name}
```

---

### Files

```python
@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["photo"]           # FileStorage object
    return f"Got file: {file.filename}"
```

---

### Headers & cookies

```python
token   = request.headers.get("Authorization")
lang    = request.headers.get("Accept-Language", "en")
session_id = request.cookies.get("session_id")
```

---

### Common `request` attributes

| Attribute | Description |
|---|---|
| `request.method` | `"GET"`, `"POST"`, etc. |
| `request.args` | Query string (`ImmutableMultiDict`) |
| `request.form` | POST form data |
| `request.json` | Parsed JSON body |
| `request.files` | Uploaded files |
| `request.headers` | HTTP headers |
| `request.cookies` | Request cookies |
| `request.url` | Full URL |
| `request.path` | URL path only |
| `request.host` | Hostname |
| `request.remote_addr` | Client IP |
| `request.is_json` | `True` if `Content-Type: application/json` |

---

## Response Object

### Returning strings & tuples

```python
@app.route("/simple")
def simple():
    return "Hello"                          # 200 OK, text/html

@app.route("/created")
def created():
    return "Resource created", 201

@app.route("/custom-headers")
def custom_headers():
    return "OK", 200, {"X-Custom": "value"}
```

---

### `make_response()`

Use when you need to set cookies or headers on a response object.

```python
from flask import make_response

@app.route("/set-cookie")
def set_cookie():
    resp = make_response("Cookie set!")
    resp.set_cookie("user_id", "42", max_age=3600, httponly=True, samesite="Lax")
    resp.headers["X-Frame-Options"] = "DENY"
    return resp
```

---

### `jsonify()`

Creates a `application/json` response.

```python
from flask import jsonify

@app.route("/api/user/<int:uid>")
def get_user(uid):
    return jsonify(id=uid, name="Alice", active=True)
```

---

### `send_file()` / `send_from_directory()`

```python
from flask import send_file, send_from_directory

@app.route("/download/report")
def download_report():
    return send_file("reports/q3.pdf", as_attachment=True, download_name="Q3_Report.pdf")

@app.route("/files/<filename>")
def serve_file(filename):
    return send_from_directory("/var/uploads", filename)
```

---

## Templates (Jinja2)

Flask uses Jinja2 by default. Templates live in the `templates/` folder.

### `render_template()`

```python
from flask import render_template

@app.route("/hello/<name>")
def hello(name):
    return render_template("hello.html", name=name, items=[1, 2, 3])
```

`templates/hello.html`:

```html
<!DOCTYPE html>
<html>
<head><title>Hello</title></head>
<body>
  <h1>Hello, {{ name }}!</h1>

  {% if items %}
    <ul>
      {% for item in items %}
        <li>{{ item }}</li>
      {% endfor %}
    </ul>
  {% else %}
    <p>No items.</p>
  {% endif %}
</body>
</html>
```

---

### Template inheritance

`templates/base.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>{% block title %}My App{% endblock %}</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
  <nav>
    <a href="{{ url_for('index') }}">Home</a>
    <a href="{{ url_for('about') }}">About</a>
  </nav>

  <main>{% block content %}{% endblock %}</main>

  <footer>{% block footer %}&copy; 2025{% endblock %}</footer>
</body>
</html>
```

`templates/index.html`:

```html
{% extends "base.html" %}

{% block title %}Home — My App{% endblock %}

{% block content %}
  <h1>Welcome!</h1>
  <p>This is the homepage.</p>
{% endblock %}
```

---

### Jinja2 filters & globals

```html
{{ name | upper }}
{{ price | round(2) }}
{{ description | truncate(100) }}
{{ timestamp | strftime('%Y-%m-%d') }}

{# Custom filter registered in Python #}
{{ email | mask_email }}
```

Register a custom filter:

```python
@app.template_filter("mask_email")
def mask_email_filter(email):
    user, domain = email.split("@")
    return f"{user[:2]}***@{domain}"
```

---

### Flash messages

```python
from flask import flash, get_flashed_messages

@app.route("/save", methods=["POST"])
def save():
    flash("Record saved successfully!", "success")
    flash("Email is already taken.", "error")
    return redirect(url_for("index"))
```

In template:

```html
{% with messages = get_flashed_messages(with_categories=True) %}
  {% for category, message in messages %}
    <div class="alert alert-{{ category }}">{{ message }}</div>
  {% endfor %}
{% endwith %}
```

---

## Static Files

Place files in the `static/` folder. Reference them with `url_for("static", filename=...)`.

```html
<link rel="stylesheet" href="{{ url_for('static', filename='css/main.css') }}">
<script src="{{ url_for('static', filename='js/app.js') }}"></script>
<img src="{{ url_for('static', filename='images/logo.png') }}" alt="Logo">
```

Recommended structure:

```
static/
├── css/
│   └── main.css
├── js/
│   └── app.js
└── images/
    └── logo.png
```

---

## Blueprints

Blueprints modularize a large app into reusable components.

```python
# app/auth/__init__.py
from flask import Blueprint

auth = Blueprint("auth", __name__, template_folder="templates", url_prefix="/auth")

from . import routes   # noqa: import at bottom avoids circular imports
```

```python
# app/auth/routes.py
from flask import render_template, redirect, url_for
from . import auth

@auth.route("/login", methods=["GET", "POST"])
def login():
    return render_template("auth/login.html")

@auth.route("/logout")
def logout():
    return redirect(url_for("main.index"))
```

Register in factory:

```python
from app.auth import auth as auth_bp
app.register_blueprint(auth_bp)
```

URL for a blueprint route:

```python
url_for("auth.login")   # blueprint_name.function_name
```

---

## Configuration

### Config object

```python
# config.py
import os

class Config:
    SECRET_KEY         = os.environ.get("SECRET_KEY", "dev-secret-key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG              = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///dev.db"

class ProductionConfig(Config):
    DEBUG              = False
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]

config = {
    "development": DevelopmentConfig,
    "production":  ProductionConfig,
    "default":     DevelopmentConfig,
}
```

Load in factory:

```python
app.config.from_object(config["production"])
```

---

### Environment variables with `.env`

```bash
pip install python-dotenv
```

`.env`:

```
SECRET_KEY=supersecretkey
DATABASE_URL=postgresql://user:pass@localhost/mydb
FLASK_ENV=production
```

```python
from dotenv import load_dotenv
load_dotenv()
```

---

### Common config keys

| Key | Purpose |
|---|---|
| `SECRET_KEY` | Signs sessions and cookies |
| `DEBUG` | Enable debug mode |
| `TESTING` | Enable test mode |
| `SQLALCHEMY_DATABASE_URI` | DB connection string |
| `SQLALCHEMY_TRACK_MODIFICATIONS` | Disable signals (set `False`) |
| `UPLOAD_FOLDER` | Path for file uploads |
| `MAX_CONTENT_LENGTH` | Max upload size in bytes |
| `SESSION_COOKIE_SECURE` | HTTPS-only cookies |
| `WTF_CSRF_ENABLED` | CSRF protection toggle |

---

## Database with Flask-SQLAlchemy

```bash
pip install flask-sqlalchemy flask-migrate
```

### Model definition

```python
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id         = db.Column(db.Integer, primary_key=True)
    username   = db.Column(db.String(80), unique=True, nullable=False)
    email      = db.Column(db.String(120), unique=True, nullable=False)
    password   = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    active     = db.Column(db.Boolean, default=True)

    posts      = db.relationship("Post", backref="author", lazy="dynamic")

    def __repr__(self):
        return f"<User {self.username}>"

class Post(db.Model):
    __tablename__ = "posts"

    id         = db.Column(db.Integer, primary_key=True)
    title      = db.Column(db.String(200), nullable=False)
    body       = db.Column(db.Text)
    user_id    = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
```

---

### Migrations

```bash
pip install flask-migrate
```

```python
from flask_migrate import Migrate
migrate = Migrate(app, db)
```

```bash
flask db init        # once
flask db migrate -m "add users table"
flask db upgrade
```

---

### CRUD operations

```python
# Create
user = User(username="alice", email="alice@example.com", password=hashed)
db.session.add(user)
db.session.commit()

# Read
user  = User.query.get(1)                             # by primary key
user  = User.query.filter_by(username="alice").first()
users = User.query.filter(User.active == True).all()
users = User.query.order_by(User.created_at.desc()).limit(10).all()

# Update
user.email = "newalice@example.com"
db.session.commit()

# Delete
db.session.delete(user)
db.session.commit()

# Bulk operations
User.query.filter_by(active=False).delete()
db.session.commit()
```

---

### Query helpers

```python
count   = User.query.count()
exists  = User.query.filter_by(email="x@x.com").first() is not None
page    = User.query.paginate(page=2, per_page=20)

for user in page.items:
    print(user.username)

print(page.total, page.pages, page.has_next, page.has_prev)
```

---

## Forms with Flask-WTF

```bash
pip install flask-wtf
```

### Define a form

```python
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, Length, EqualTo, Optional

class RegistrationForm(FlaskForm):
    username  = StringField("Username",  validators=[DataRequired(), Length(3, 64)])
    email     = StringField("Email",     validators=[DataRequired(), Email()])
    password  = PasswordField("Password", validators=[DataRequired(), Length(8)])
    confirm   = PasswordField("Confirm", validators=[EqualTo("password")])
    submit    = SubmitField("Register")
```

---

### Use in a route

```python
@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(
            username=form.username.data,
            email=form.email.data,
            password=generate_password_hash(form.password.data),
        )
        db.session.add(user)
        db.session.commit()
        flash("Account created!", "success")
        return redirect(url_for("auth.login"))
    return render_template("register.html", form=form)
```

---

### Render in template

```html
<form method="POST" novalidate>
  {{ form.hidden_tag() }}   {# CSRF token #}

  <div>
    {{ form.username.label }}
    {{ form.username(class="form-control", placeholder="alice") }}
    {% for error in form.username.errors %}
      <span class="error">{{ error }}</span>
    {% endfor %}
  </div>

  <div>
    {{ form.email.label }}
    {{ form.email(class="form-control") }}
  </div>

  <div>
    {{ form.password.label }}
    {{ form.password(class="form-control") }}
  </div>

  {{ form.submit(class="btn btn-primary") }}
</form>
```

---

## Authentication with Flask-Login

```bash
pip install flask-login
```

### Setup

```python
from flask_login import LoginManager, UserMixin, login_user, logout_user, \
                        login_required, current_user

login_manager = LoginManager()
login_manager.login_view = "auth.login"      # redirect for @login_required

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
```

Add `UserMixin` to your model for default implementations of `is_authenticated`, `is_active`, etc.:

```python
class User(UserMixin, db.Model):
    ...
```

---

### Login / Logout

```python
@auth.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get("next")
            return redirect(next_page or url_for("main.dashboard"))
        flash("Invalid credentials.", "error")
    return render_template("auth/login.html", form=form)

@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("main.index"))
```

---

### Protecting routes

```python
@app.route("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html", user=current_user)
```

In templates:

```html
{% if current_user.is_authenticated %}
  <p>Hello, {{ current_user.username }}!</p>
  <a href="{{ url_for('auth.logout') }}">Log out</a>
{% else %}
  <a href="{{ url_for('auth.login') }}">Log in</a>
{% endif %}
```

---

## REST APIs & JSON

### Basic JSON endpoint

```python
from flask import jsonify, request, abort

@app.route("/api/v1/users", methods=["GET"])
def list_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "username": u.username} for u in users])

@app.route("/api/v1/users/<int:uid>", methods=["GET"])
def get_user(uid):
    user = User.query.get_or_404(uid)
    return jsonify(id=user.id, username=user.username, email=user.email)

@app.route("/api/v1/users", methods=["POST"])
def create_user():
    data = request.get_json() or abort(400)
    user = User(username=data["username"], email=data["email"], password="hashed")
    db.session.add(user)
    db.session.commit()
    return jsonify(id=user.id), 201

@app.route("/api/v1/users/<int:uid>", methods=["PUT"])
def update_user(uid):
    user = User.query.get_or_404(uid)
    data = request.get_json() or {}
    user.username = data.get("username", user.username)
    user.email    = data.get("email", user.email)
    db.session.commit()
    return jsonify(id=user.id, username=user.username)

@app.route("/api/v1/users/<int:uid>", methods=["DELETE"])
def delete_user(uid):
    user = User.query.get_or_404(uid)
    db.session.delete(user)
    db.session.commit()
    return "", 204
```

---

### Flask-RESTful (optional)

```bash
pip install flask-restful
```

```python
from flask_restful import Api, Resource, reqparse

api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument("username", required=True, help="Username is required")
parser.add_argument("email",    required=True)

class UserResource(Resource):
    def get(self, uid):
        user = User.query.get_or_404(uid)
        return {"id": user.id, "username": user.username}

    def put(self, uid):
        args = parser.parse_args()
        user = User.query.get_or_404(uid)
        user.username = args["username"]
        db.session.commit()
        return {"id": user.id}, 200

    def delete(self, uid):
        user = User.query.get_or_404(uid)
        db.session.delete(user)
        db.session.commit()
        return "", 204

api.add_resource(UserResource, "/api/v1/users/<int:uid>")
```

---

### Token authentication

```python
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token or not validate_token(token):
            return jsonify(error="Unauthorized"), 401
        return f(*args, **kwargs)
    return decorated

@app.route("/api/v1/protected")
@token_required
def protected():
    return jsonify(message="Access granted")
```

---

## Error Handling

### `abort()`

Raises an HTTP error immediately.

```python
from flask import abort

@app.route("/admin")
def admin():
    if not current_user.is_admin:
        abort(403)
    return "Admin panel"
```

---

### Custom error handlers

```python
@app.errorhandler(404)
def not_found(e):
    return render_template("errors/404.html"), 404

@app.errorhandler(403)
def forbidden(e):
    return render_template("errors/403.html"), 403

@app.errorhandler(500)
def internal_error(e):
    db.session.rollback()
    return render_template("errors/500.html"), 500
```

For APIs, return JSON errors:

```python
@app.errorhandler(404)
def not_found_json(e):
    return jsonify(error="Not found", status=404), 404

@app.errorhandler(422)
def unprocessable(e):
    return jsonify(error=str(e)), 422
```

---

### Custom exception classes

```python
class APIError(Exception):
    def __init__(self, message, status_code=400):
        super().__init__(message)
        self.status_code = status_code
        self.message = message

@app.errorhandler(APIError)
def handle_api_error(e):
    return jsonify(error=e.message), e.status_code

# Usage in route:
raise APIError("Invalid input data", 422)
```

---

## Middleware & Hooks

### `@app.before_request`

Runs before every request. Returning a value short-circuits the request.

```python
@app.before_request
def check_maintenance():
    if app.config.get("MAINTENANCE_MODE"):
        return jsonify(error="Under maintenance"), 503

@app.before_request
def log_request():
    app.logger.info(f"{request.method} {request.path}")
```

---

### `@app.after_request`

Runs after every request; receives and must return the response object.

```python
@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"]        = "DENY"
    response.headers["Referrer-Policy"]        = "strict-origin"
    return response
```

---

### `@app.teardown_request`

Runs after the request context is popped, even if an exception occurred.

```python
@app.teardown_request
def teardown_db(exception):
    if exception:
        db.session.rollback()
    db.session.remove()
```

---

### `@app.context_processor`

Injects variables into all templates.

```python
@app.context_processor
def inject_globals():
    return {
        "app_name": "My Flask App",
        "current_year": datetime.utcnow().year,
    }
```

---

## Sessions & Cookies

### Server-side sessions (default)

```python
from flask import session

@app.route("/cart/add/<int:item_id>", methods=["POST"])
def add_to_cart(item_id):
    cart = session.get("cart", [])
    cart.append(item_id)
    session["cart"] = cart
    session.permanent = True              # respects PERMANENT_SESSION_LIFETIME
    return redirect(url_for("cart"))

@app.route("/cart/clear")
def clear_cart():
    session.pop("cart", None)
    return redirect(url_for("cart"))
```

---

### Cookies

```python
@app.route("/set-pref")
def set_pref():
    resp = make_response(redirect(url_for("index")))
    resp.set_cookie(
        "theme",
        "dark",
        max_age=60 * 60 * 24 * 30,   # 30 days
        httponly=True,
        secure=True,
        samesite="Lax",
    )
    return resp

@app.route("/get-pref")
def get_pref():
    theme = request.cookies.get("theme", "light")
    return f"Theme: {theme}"
```

---

## File Uploads

```python
import os
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "pdf"}
app.config["UPLOAD_FOLDER"]     = "uploads"
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024   # 16 MB

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=["GET", "POST"])
def upload_file():
    if request.method == "POST":
        file = request.files.get("file")
        if not file or file.filename == "":
            flash("No file selected.", "error")
            return redirect(request.url)
        if not allowed_file(file.filename):
            flash("File type not allowed.", "error")
            return redirect(request.url)

        filename = secure_filename(file.filename)
        save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(save_path)
        flash(f"Uploaded: {filename}", "success")
        return redirect(url_for("index"))

    return render_template("upload.html")
```

---

## Testing

### Setup

```python
# tests/conftest.py
import pytest
from app import create_app, db as _db

@pytest.fixture
def app():
    app = create_app("testing")
    with app.app_context():
        _db.create_all()
        yield app
        _db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def runner(app):
    return app.test_cli_runner()
```

---

### Writing tests

```python
# tests/test_routes.py
def test_index(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"Welcome" in response.data

def test_login_valid(client):
    response = client.post("/auth/login", data={
        "email": "alice@example.com",
        "password": "password123",
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b"Dashboard" in response.data

def test_login_invalid(client):
    response = client.post("/auth/login", data={
        "email": "wrong@example.com",
        "password": "wrongpass",
    })
    assert b"Invalid credentials" in response.data

def test_api_get_user(client):
    response = client.get("/api/v1/users/1")
    data = response.get_json()
    assert response.status_code == 200
    assert "username" in data

def test_api_create_user(client):
    response = client.post("/api/v1/users", json={
        "username": "bob",
        "email": "bob@example.com",
    })
    assert response.status_code == 201
    assert response.get_json()["id"] is not None
```

Run:

```bash
pytest -v
pytest --cov=app tests/
```

---

## Deployment

### Gunicorn (production WSGI server)

```bash
pip install gunicorn
gunicorn "app:create_app()" --workers 4 --bind 0.0.0.0:8000
```

---

### Docker

`Dockerfile`:

```dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_ENV=production

EXPOSE 8000
CMD ["gunicorn", "wsgi:app", "--workers", "4", "--bind", "0.0.0.0:8000"]
```

```bash
docker build -t myflaskapp .
docker run -p 8000:8000 --env-file .env myflaskapp
```

---

### Nginx reverse proxy

`/etc/nginx/sites-available/myapp`:

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass         http://127.0.0.1:8000;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /var/www/myapp/static/;
        expires 1y;
    }
}
```

---

### Environment checklist for production

```python
app.config.update(
    DEBUG=False,
    TESTING=False,
    SECRET_KEY=os.environ["SECRET_KEY"],       # Never hardcode
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SQLALCHEMY_DATABASE_URI=os.environ["DATABASE_URL"],
)
```

---

## Complete App Example

A full blog application with authentication, a database, forms, and a REST API.

### Project structure

```
blog/
├── app/
│   ├── __init__.py          # Factory
│   ├── extensions.py        # db, login_manager
│   ├── models.py            # User, Post
│   ├── auth/
│   │   ├── __init__.py
│   │   ├── forms.py
│   │   └── routes.py
│   ├── main/
│   │   ├── __init__.py
│   │   └── routes.py
│   └── api/
│       ├── __init__.py
│       └── routes.py
├── templates/
│   ├── base.html
│   ├── index.html
│   └── auth/
│       ├── login.html
│       └── register.html
├── static/
│   └── css/main.css
├── config.py
├── wsgi.py
└── tests/
    └── test_app.py
```

---

### `app/__init__.py`

```python
from flask import Flask
from .extensions import db, login_manager, migrate
from config import config

def create_app(config_name="default"):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)

    from .auth import auth as auth_bp
    from .main import main as main_bp
    from .api  import api  as api_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(main_bp)
    app.register_blueprint(api_bp,  url_prefix="/api/v1")

    return app
```

---

### `app/models.py`

```python
from .extensions import db, login_manager
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(UserMixin, db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email    = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    posts    = db.relationship("Post", backref="author", lazy="dynamic")

    def set_password(self, raw):
        self.password = generate_password_hash(raw)

    def check_password(self, raw):
        return check_password_hash(self.password, raw)

class Post(db.Model):
    id         = db.Column(db.Integer, primary_key=True)
    title      = db.Column(db.String(200), nullable=False)
    body       = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id    = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

@login_manager.user_loader
def load_user(uid):
    return User.query.get(int(uid))
```

---

### `app/main/routes.py`

```python
from flask import render_template, redirect, url_for, request, flash, abort
from flask_login import login_required, current_user
from ..models import Post
from ..extensions import db
from . import main

@main.route("/")
def index():
    page  = request.args.get("page", 1, type=int)
    posts = Post.query.order_by(Post.created_at.desc()).paginate(page=page, per_page=10)
    return render_template("index.html", posts=posts)

@main.route("/post/new", methods=["GET", "POST"])
@login_required
def new_post():
    if request.method == "POST":
        title = request.form["title"].strip()
        body  = request.form["body"].strip()
        if not title or not body:
            flash("Title and body are required.", "error")
        else:
            post = Post(title=title, body=body, author=current_user)
            db.session.add(post)
            db.session.commit()
            flash("Post published!", "success")
            return redirect(url_for("main.index"))
    return render_template("new_post.html")

@main.route("/post/<int:pid>/delete", methods=["POST"])
@login_required
def delete_post(pid):
    post = Post.query.get_or_404(pid)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash("Post deleted.", "info")
    return redirect(url_for("main.index"))
```

---

### `app/api/routes.py`

```python
from flask import jsonify, request, abort
from flask_login import login_required, current_user
from ..models import Post
from ..extensions import db
from . import api

@api.route("/posts")
def list_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([
        {"id": p.id, "title": p.title, "author": p.author.username}
        for p in posts
    ])

@api.route("/posts/<int:pid>")
def get_post(pid):
    p = Post.query.get_or_404(pid)
    return jsonify(id=p.id, title=p.title, body=p.body,
                   author=p.author.username, created_at=p.created_at.isoformat())

@api.route("/posts", methods=["POST"])
@login_required
def create_post():
    data  = request.get_json() or abort(400)
    title = data.get("title", "").strip()
    body  = data.get("body", "").strip()
    if not title or not body:
        abort(422)
    post = Post(title=title, body=body, author=current_user)
    db.session.add(post)
    db.session.commit()
    return jsonify(id=post.id, title=post.title), 201
```

---

## Quick Reference Card

| Method / Object | Category | Purpose |
|---|---|---|
| `@app.route()` | Routing | Map URL to function |
| `url_for()` | Routing | Build URLs by endpoint name |
| `redirect()` | Response | Return 301/302 redirect |
| `abort()` | Response | Raise HTTP error |
| `request.args` | Request | Query string params |
| `request.form` | Request | POST form data |
| `request.get_json()` | Request | Parsed JSON body |
| `request.files` | Request | Uploaded files |
| `jsonify()` | Response | JSON response |
| `make_response()` | Response | Custom response object |
| `send_file()` | Response | File download |
| `render_template()` | Templates | Render Jinja2 template |
| `flash()` | Templates | One-time messages |
| `session` | State | Server-side session dict |
| `Blueprint` | Structure | Modular route groups |
| `@login_required` | Auth | Protect routes |
| `current_user` | Auth | Logged-in user proxy |
| `db.session.add()` | Database | Stage new record |
| `db.session.commit()` | Database | Persist changes |
| `Model.query.get_or_404()` | Database | Fetch or 404 |
| `@app.before_request` | Hooks | Pre-request middleware |
| `@app.after_request` | Hooks | Post-request middleware |
| `@app.errorhandler()` | Errors | Custom error pages |
| `@app.context_processor` | Templates | Inject template globals |
| `secure_filename()` | Uploads | Sanitize filenames |
| `app.test_client()` | Testing | In-process HTTP client |

---

## Useful Links

- [Official documentation](https://flask.palletsprojects.com)
- [Flask API reference](https://flask.palletsprojects.com/en/latest/api/)
- [Jinja2 template docs](https://jinja.palletsprojects.com)
- [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com)
- [Flask-Login](https://flask-login.readthedocs.io)
- [Flask-WTF](https://flask-wtf.readthedocs.io)
- [Flask-Migrate](https://flask-migrate.readthedocs.io)
- [Werkzeug utilities](https://werkzeug.palletsprojects.com)
- [Awesome Flask](https://github.com/mjhea0/awesome-flask)
