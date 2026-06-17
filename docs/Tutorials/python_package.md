---
hide:
  - toc
---

# Creating a Python Package — Complete Guide

A comprehensive, end-to-end guide to building, testing, documenting, and publishing a professional Python package — from an empty folder to a live PyPI release.

---

## Table of Contents

1. [Concepts & Terminology](#concepts--terminology)
2. [Project Structure](#project-structure)
3. [Package Metadata — `pyproject.toml`](#package-metadata--pyprojecttoml)
4. [Writing the Package Code](#writing-the-package-code)
5. [The `__init__.py` File](#the-__init__py-file)
6. [Subpackages & Modules](#subpackages--modules)
7. [Managing Dependencies](#managing-dependencies)
8. [Virtual Environments](#virtual-environments)
9. [Testing with pytest](#testing-with-pytest)
10. [Code Quality — Linting & Formatting](#code-quality--linting--formatting)
11. [Type Hints & mypy](#type-hints--mypy)
12. [Documentation](#documentation)
13. [Versioning](#versioning)
14. [Building the Distribution](#building-the-distribution)
15. [Publishing to PyPI](#publishing-to-pypi)
16. [CI/CD with GitHub Actions](#cicd-with-github-actions)
17. [Command-Line Scripts](#command-line-scripts)
18. [Packaging Data Files](#packaging-data-files)
19. [Namespace Packages](#namespace-packages)
20. [Complete Example — `textkit`](#complete-example--textkit)

---

## Concepts & Terminology

| Term | Meaning |
|---|---|
| **Module** | A single `.py` file |
| **Package** | A directory with `__init__.py`; a collection of modules |
| **Distribution package** | The archive (`.whl`, `.tar.gz`) uploaded to PyPI |
| **Import package** | What users `import` in their code |
| **PyPI** | Python Package Index — the public package registry |
| **TestPyPI** | Sandbox version of PyPI for testing uploads |
| **sdist** | Source distribution — raw Python source |
| **wheel** | Binary distribution (`.whl`) — faster to install |
| **build backend** | Tool that creates the distribution (e.g. `hatchling`, `setuptools`) |
| **build frontend** | Tool that drives the build (e.g. `build`, `pip`) |

---

## Project Structure

A modern Python package follows this layout:

```
textkit/                        ← repository root
├── src/
│   └── textkit/                ← import package (src-layout)
│       ├── __init__.py
│       ├── core.py
│       ├── utils.py
│       └── cli.py
├── tests/
│   ├── __init__.py
│   ├── test_core.py
│   └── test_utils.py
├── docs/
│   ├── index.md
│   └── api.md
├── pyproject.toml              ← single source of truth for metadata + build
├── README.md
├── LICENSE
├── CHANGELOG.md
└── .github/
    └── workflows/
        └── ci.yml
```

!!! tip "Why `src/` layout?"
    Placing your package under `src/` prevents accidentally importing your local, uninstalled
    code during tests. It forces you to `pip install -e .` first, matching how real users
    install your package — catching import errors before release.

---

## Package Metadata — `pyproject.toml`

`pyproject.toml` is the modern, unified config file (PEP 517/518/621). It replaces `setup.py`, `setup.cfg`, and `MANIFEST.in`.

### Minimal example

```toml
[build-system]
requires      = ["hatchling"]
build-backend = "hatchling.build"

[project]
name            = "textkit"
version         = "0.1.0"
description     = "A toolkit for text processing"
readme          = "README.md"
license         = { file = "LICENSE" }
authors         = [{ name = "Alice Smith", email = "alice@example.com" }]
requires-python = ">=3.9"

dependencies = [
    "requests>=2.28",
]

[project.urls]
Homepage      = "https://github.com/alice/textkit"
Documentation = "https://textkit.readthedocs.io"
"Bug Tracker" = "https://github.com/alice/textkit/issues"
```

---

### Full example with all fields

```toml
[build-system]
requires      = ["hatchling>=1.21"]
build-backend = "hatchling.build"

# ── Project metadata ───────────────────────────────────────────
[project]
name            = "textkit"
version         = "1.2.0"
description     = "A toolkit for text processing utilities"
readme          = "README.md"
license         = { file = "LICENSE" }
authors         = [
    { name = "Alice Smith", email = "alice@example.com" },
]
maintainers     = [
    { name = "Bob Jones",  email = "bob@example.com" },
]
keywords        = ["text", "nlp", "utilities"]
requires-python = ">=3.9"

classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Operating System :: OS Independent",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
    "Topic :: Text Processing",
]

# Runtime dependencies
dependencies = [
    "requests>=2.28,<3.0",
    "click>=8.0",
]

# ── Optional dependency groups ────────────────────────────────
[project.optional-dependencies]
dev = [
    "pytest>=7.4",
    "pytest-cov",
    "ruff",
    "mypy",
    "pre-commit",
]
docs = [
    "mkdocs>=1.5",
    "mkdocstrings[python]",
]

# ── Entry points (CLI scripts) ────────────────────────────────
[project.scripts]
textkit = "textkit.cli:main"

# ── URLs ──────────────────────────────────────────────────────
[project.urls]
Homepage      = "https://github.com/alice/textkit"
Documentation = "https://textkit.readthedocs.io"
Changelog     = "https://github.com/alice/textkit/blob/main/CHANGELOG.md"
"Bug Tracker" = "https://github.com/alice/textkit/issues"

# ── Build config (hatchling) ──────────────────────────────────
[tool.hatch.build.targets.wheel]
packages = ["src/textkit"]

# ── Tool configs ──────────────────────────────────────────────
[tool.pytest.ini_options]
testpaths    = ["tests"]
addopts      = "--cov=textkit --cov-report=term-missing"

[tool.ruff]
line-length = 88
target-version = "py39"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "W", "UP"]

[tool.mypy]
python_version = "3.9"
strict         = true
```

---

### Classifiers

Classifiers are standardised PyPI metadata tags. Key ones:

```toml
classifiers = [
    # Maturity
    "Development Status :: 1 - Planning",
    "Development Status :: 3 - Alpha",
    "Development Status :: 4 - Beta",
    "Development Status :: 5 - Production/Stable",

    # Audience
    "Intended Audience :: Developers",
    "Intended Audience :: Science/Research",

    # License
    "License :: OSI Approved :: MIT License",
    "License :: OSI Approved :: Apache Software License",

    # Topic
    "Topic :: Software Development :: Libraries",
    "Topic :: Scientific/Engineering :: Artificial Intelligence",
]
```

Full list: [pypi.org/classifiers](https://pypi.org/classifiers/)

---

## Writing the Package Code

### `src/textkit/core.py`

```python
"""Core text-processing functions."""

from __future__ import annotations

import re
import unicodedata
from collections import Counter
from typing import Iterator


def word_count(text: str) -> int:
    """Return the number of words in *text*.

    Args:
        text: Input string.

    Returns:
        Number of whitespace-separated tokens.

    Example:
        >>> word_count("Hello world")
        2
    """
    return len(text.split())


def sentence_count(text: str) -> int:
    """Return the number of sentences detected in *text*.

    Splits on `.`, `!`, and `?` followed by whitespace or end-of-string.
    """
    sentences = re.split(r"[.!?]+(?:\s|$)", text.strip())
    return sum(1 for s in sentences if s.strip())


def most_common_words(text: str, n: int = 10) -> list[tuple[str, int]]:
    """Return the *n* most common words and their frequencies.

    Args:
        text: Input string.
        n:    Number of results to return (default 10).

    Returns:
        List of ``(word, count)`` tuples sorted by frequency descending.
    """
    words = re.findall(r"\b\w+\b", text.lower())
    return Counter(words).most_common(n)


def normalize(text: str) -> str:
    """Normalize Unicode, collapse whitespace, and strip leading/trailing space."""
    text = unicodedata.normalize("NFKC", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def ngrams(text: str, n: int) -> Iterator[tuple[str, ...]]:
    """Yield all *n*-grams of words from *text*.

    Args:
        text: Input string.
        n:    Gram size.

    Yields:
        Tuples of *n* consecutive words.

    Example:
        >>> list(ngrams("one two three", 2))
        [('one', 'two'), ('two', 'three')]
    """
    words = text.split()
    for i in range(len(words) - n + 1):
        yield tuple(words[i : i + n])
```

---

### `src/textkit/utils.py`

```python
"""Utility helpers for textkit."""

from __future__ import annotations

import hashlib
import os
import re
from pathlib import Path


def slugify(text: str) -> str:
    """Convert *text* to a URL-safe slug.

    Example:
        >>> slugify("Hello, World!")
        'hello-world'
    """
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    text = re.sub(r"^-+|-+$", "", text)
    return text


def truncate(text: str, max_length: int, suffix: str = "…") -> str:
    """Truncate *text* to *max_length* characters, appending *suffix* if cut.

    Example:
        >>> truncate("Hello world", 8)
        'Hello wo…'
    """
    if len(text) <= max_length:
        return text
    return text[: max_length - len(suffix)] + suffix


def read_text_file(path: str | Path, encoding: str = "utf-8") -> str:
    """Read and return the contents of a text file."""
    return Path(path).read_text(encoding=encoding)


def file_checksum(path: str | Path, algorithm: str = "sha256") -> str:
    """Compute the hex checksum of a file.

    Args:
        path:      Path to the file.
        algorithm: Hash algorithm name (default ``sha256``).

    Returns:
        Lowercase hex digest string.
    """
    h = hashlib.new(algorithm)
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()
```

---

## The `__init__.py` File

`__init__.py` controls what is exposed at the top-level `import textkit` level.

```python
# src/textkit/__init__.py
"""textkit — a toolkit for text processing.

Quickstart::

    from textkit import word_count, slugify

    print(word_count("Hello world"))   # 2
    print(slugify("Hello, World!"))    # hello-world
"""

from importlib.metadata import version, PackageNotFoundError

try:
    __version__ = version("textkit")
except PackageNotFoundError:          # package not installed
    __version__ = "unknown"

# Public API — what `from textkit import *` exposes
from .core import (
    most_common_words,
    ngrams,
    normalize,
    sentence_count,
    word_count,
)
from .utils import (
    file_checksum,
    read_text_file,
    slugify,
    truncate,
)

__all__ = [
    # core
    "word_count",
    "sentence_count",
    "most_common_words",
    "normalize",
    "ngrams",
    # utils
    "slugify",
    "truncate",
    "read_text_file",
    "file_checksum",
]
```

!!! tip "`__all__`"
    Defining `__all__` makes your public API explicit. It controls `from package import *`
    and helps IDEs and documentation generators know what to surface.

---

## Subpackages & Modules

For larger packages, split functionality into subpackages:

```
src/textkit/
├── __init__.py
├── analysis/
│   ├── __init__.py
│   ├── sentiment.py
│   └── readability.py
├── io/
│   ├── __init__.py
│   ├── readers.py
│   └── writers.py
└── cli.py
```

`src/textkit/analysis/__init__.py`:

```python
from .sentiment   import SentimentAnalyzer
from .readability import flesch_score

__all__ = ["SentimentAnalyzer", "flesch_score"]
```

Users can then import from either level:

```python
from textkit.analysis import SentimentAnalyzer    # subpackage
from textkit.analysis.readability import flesch_score  # module
```

---

### Relative vs absolute imports

Inside a package, prefer **relative imports** — they are explicit and refactor-safe:

```python
# Inside src/textkit/analysis/sentiment.py

# Relative (preferred within a package)
from ..utils import normalize          # go up one level to textkit, then utils
from .readability import flesch_score  # sibling module in same subpackage

# Absolute (also valid, required in scripts and tests)
from textkit.utils import normalize
```

---

## Managing Dependencies

### Runtime vs. development

```toml
# pyproject.toml

# Installed when a user runs: pip install textkit
dependencies = [
    "requests>=2.28",
    "click>=8.0",
]

# Installed when a developer runs: pip install -e ".[dev]"
[project.optional-dependencies]
dev = [
    "pytest>=7.4",
    "pytest-cov",
    "ruff",
    "mypy",
    "pre-commit",
]
docs = [
    "mkdocs>=1.5",
    "mkdocstrings[python]",
    "mkdocs-material",
]
```

---

### Version pinning strategy

| Specifier | Meaning | When to use |
|---|---|---|
| `>=2.28` | Any version ≥ 2.28 | Minimum feature requirement |
| `>=2.28,<3.0` | Compatible minor versions | Avoid breaking major changes |
| `~=2.28` | `>=2.28, ==2.*` | Same as above, shorthand |
| `==2.28.1` | Exact version | Almost never for libraries |
| `!=2.29.0` | Exclude a bad release | Known broken version |

!!! warning "Library vs. application pinning"
    Libraries (packages others `import`) should use **loose** constraints (`>=`) to avoid
    dependency conflicts. Applications (deployed services) should use **exact pins** via a
    `requirements.txt` or lock file (`pip-tools`, `uv`, `poetry.lock`).

---

### `requirements.txt` from `pyproject.toml`

```bash
# Install all dev extras
pip install -e ".[dev,docs]"

# Or generate a pinned lockfile with pip-tools
pip install pip-tools
pip-compile pyproject.toml --extra dev -o requirements-dev.txt
```

---

## Virtual Environments

Always develop inside a virtual environment to isolate dependencies.

### venv (built-in)

```bash
python -m venv .venv
source .venv/bin/activate        # macOS / Linux
.venv\Scripts\activate           # Windows

pip install -e ".[dev]"          # install package in editable mode + dev deps
```

---

### uv (fast modern alternative)

```bash
pip install uv

uv venv
source .venv/bin/activate

uv pip install -e ".[dev]"
```

---

### Editable install

The `-e` flag installs your package in **editable** (development) mode: changes to source files take effect immediately without reinstalling.

```bash
pip install -e .           # editable, no extras
pip install -e ".[dev]"    # editable + dev deps
```

Verify:

```bash
python -c "import textkit; print(textkit.__version__)"
```

---

## Testing with pytest

```bash
pip install pytest pytest-cov
```

### `tests/test_core.py`

```python
import pytest
from textkit.core import (
    most_common_words,
    ngrams,
    normalize,
    sentence_count,
    word_count,
)


class TestWordCount:
    def test_simple(self):
        assert word_count("Hello world") == 2

    def test_empty(self):
        assert word_count("") == 0

    def test_extra_spaces(self):
        assert word_count("  one  two  three  ") == 3


class TestSentenceCount:
    def test_periods(self):
        assert sentence_count("Hello. World.") == 2

    def test_mixed_punctuation(self):
        assert sentence_count("Really? Yes! Okay.") == 3

    def test_single(self):
        assert sentence_count("No punctuation") == 1


class TestMostCommonWords:
    def test_returns_n_items(self):
        text   = "the cat sat on the mat the cat"
        result = most_common_words(text, n=2)
        assert len(result) == 2
        assert result[0] == ("the", 3)

    def test_case_insensitive(self):
        result = most_common_words("The the THE", n=1)
        assert result[0][0] == "the"
        assert result[0][1] == 3


class TestNgrams:
    def test_bigrams(self):
        result = list(ngrams("one two three", 2))
        assert result == [("one", "two"), ("two", "three")]

    def test_trigrams(self):
        result = list(ngrams("a b c d", 3))
        assert result == [("a", "b", "c"), ("b", "c", "d")]

    def test_too_short(self):
        result = list(ngrams("one", 3))
        assert result == []


class TestNormalize:
    def test_collapses_whitespace(self):
        assert normalize("hello   world") == "hello world"

    def test_strips(self):
        assert normalize("  hi  ") == "hi"
```

---

### `tests/test_utils.py`

```python
import pytest
from pathlib import Path
import tempfile

from textkit.utils import file_checksum, slugify, truncate


class TestSlugify:
    def test_basic(self):
        assert slugify("Hello, World!") == "hello-world"

    def test_spaces_to_dashes(self):
        assert slugify("foo bar baz") == "foo-bar-baz"

    def test_multiple_specials(self):
        assert slugify("  --Hello-- ") == "hello"


class TestTruncate:
    def test_short_text(self):
        assert truncate("Hi", 10) == "Hi"

    def test_exact_length(self):
        assert truncate("Hello", 5) == "Hello"

    def test_truncated(self):
        result = truncate("Hello world", 8)
        assert len(result) == 8
        assert result.endswith("…")

    def test_custom_suffix(self):
        result = truncate("Hello world", 7, suffix="...")
        assert result.endswith("...")


class TestFileChecksum:
    def test_sha256(self, tmp_path):
        f = tmp_path / "test.txt"
        f.write_bytes(b"hello")
        digest = file_checksum(f)
        assert len(digest) == 64           # SHA-256 hex length

    def test_md5(self, tmp_path):
        f = tmp_path / "test.txt"
        f.write_bytes(b"hello")
        digest = file_checksum(f, algorithm="md5")
        assert digest == "5d41402abc4b2a76b9719d911017c592"
```

---

### Running tests

```bash
pytest                          # run all tests
pytest -v                       # verbose output
pytest tests/test_core.py       # single file
pytest -k "TestSlugify"         # by test class or name
pytest --cov=textkit            # with coverage
pytest --cov=textkit --cov-report=html   # HTML coverage report
```

---

### Fixtures

```python
# tests/conftest.py
import pytest

@pytest.fixture
def sample_text():
    return "The quick brown fox jumps over the lazy dog. " * 3

@pytest.fixture
def tmp_text_file(tmp_path):
    f = tmp_path / "sample.txt"
    f.write_text("Hello from a file!", encoding="utf-8")
    return f
```

Use in tests:

```python
def test_word_count_fixture(sample_text):
    assert word_count(sample_text) > 0

def test_read_file(tmp_text_file):
    from textkit.utils import read_text_file
    content = read_text_file(tmp_text_file)
    assert "Hello" in content
```

---

### Parametrize

```python
@pytest.mark.parametrize("text,expected", [
    ("Hello world",    2),
    ("one two three",  3),
    ("",               0),
    ("single",         1),
])
def test_word_count_parametrized(text, expected):
    assert word_count(text) == expected
```

---

## Code Quality — Linting & Formatting

### Ruff (fast all-in-one linter + formatter)

```bash
pip install ruff
```

`pyproject.toml`:

```toml
[tool.ruff]
line-length    = 88
target-version = "py39"

[tool.ruff.lint]
select = [
    "E",   # pycodestyle errors
    "F",   # pyflakes
    "I",   # isort
    "N",   # pep8-naming
    "UP",  # pyupgrade
    "B",   # flake8-bugbear
    "SIM", # flake8-simplify
]
ignore = ["E501"]  # line length handled by formatter

[tool.ruff.format]
quote-style = "double"
```

```bash
ruff check .             # lint
ruff check --fix .       # lint + auto-fix
ruff format .            # format (replaces black)
```

---

### pre-commit hooks

```bash
pip install pre-commit
```

`.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.4
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-toml
      - id: debug-statements
```

```bash
pre-commit install       # install git hooks
pre-commit run --all-files   # run manually
```

---

## Type Hints & mypy

Type hints make your package easier to use and catch bugs early.

```python
# src/textkit/core.py
from __future__ import annotations
from typing import Iterator

def ngrams(text: str, n: int) -> Iterator[tuple[str, ...]]:
    ...
```

`pyproject.toml`:

```toml
[tool.mypy]
python_version        = "3.9"
strict                = true
ignore_missing_imports = true
```

```bash
mypy src/textkit
```

**Common type annotations:**

```python
from __future__ import annotations
from typing import Any, Optional, Union
from collections.abc import Sequence, Iterator, Callable
from pathlib import Path

def process(
    text: str,
    n: int = 5,
    path: str | Path | None = None,
    callback: Callable[[str], str] | None = None,
) -> list[str]:
    ...
```

---

## Documentation

### `README.md`

````markdown
# textkit

[![PyPI version](https://badge.fury.io/py/textkit.svg)](https://pypi.org/project/textkit/)
[![Python](https://img.shields.io/pypi/pyversions/textkit.svg)](https://pypi.org/project/textkit/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://github.com/alice/textkit/actions/workflows/ci.yml/badge.svg)](https://github.com/alice/textkit/actions)

A toolkit for text processing utilities.

## Installation

```bash
pip install textkit
```

## Quickstart

```python
from textkit import word_count, slugify, most_common_words

text = "The quick brown fox jumps over the lazy dog"

print(word_count(text))           # 9
print(slugify("Hello, World!"))   # hello-world
print(most_common_words(text, 3)) # [('the', 2), ('quick', 1), ('brown', 1)]
```

## Features

- Word and sentence counting
- N-gram extraction
- Unicode normalization
- URL slug generation
- File checksums
- Command-line interface

## License

MIT
````

---

### MkDocs site

```bash
pip install mkdocs mkdocs-material mkdocstrings[python]
mkdocs new .
```

`mkdocs.yml`:

```yaml
site_name:    textkit
site_url:     https://textkit.readthedocs.io
repo_url:     https://github.com/alice/textkit
repo_name:    alice/textkit
edit_uri:     edit/main/docs/

theme:
  name: material
  palette:
    - scheme: default
      primary: indigo

plugins:
  - search
  - mkdocstrings:
      handlers:
        python:
          paths: [src]

nav:
  - Home:        index.md
  - User Guide:
      - Installation:  guide/installation.md
      - Quickstart:    guide/quickstart.md
  - API Reference:
      - Core:   api/core.md
      - Utils:  api/utils.md
      - CLI:    api/cli.md
  - Changelog:   changelog.md
```

`docs/api/core.md`:

```markdown
# Core

::: textkit.core
```

```bash
mkdocs serve        # local preview at http://localhost:8000
mkdocs build        # build static site to site/
mkdocs gh-deploy    # deploy to GitHub Pages
```

---

### Docstring style (Google)

```python
def most_common_words(text: str, n: int = 10) -> list[tuple[str, int]]:
    """Return the *n* most common words and their frequencies.

    Args:
        text: Input string to analyze.
        n:    Maximum number of results to return.

    Returns:
        A list of ``(word, count)`` tuples sorted by frequency descending.

    Raises:
        ValueError: If *n* is less than 1.

    Example:
        >>> most_common_words("the cat sat on the mat", 2)
        [('the', 2), ('cat', 1)]
    """
```

---

## Versioning

Follow **Semantic Versioning** (SemVer): `MAJOR.MINOR.PATCH`

| Bump | When |
|---|---|
| `PATCH` (0.1.**1**) | Bug fix, no API change |
| `MINOR` (0.**2**.0) | New feature, backward compatible |
| `MAJOR` (**1**.0.0) | Breaking change |

### Single source of truth with `importlib.metadata`

```python
# src/textkit/__init__.py
from importlib.metadata import version, PackageNotFoundError

try:
    __version__ = version("textkit")
except PackageNotFoundError:
    __version__ = "unknown"
```

The version is defined **only** in `pyproject.toml`:

```toml
[project]
version = "1.2.0"
```

---

### Dynamic versioning from git tags

```bash
pip install hatch-vcs
```

```toml
[project]
dynamic = ["version"]

[build-system]
requires      = ["hatchling", "hatch-vcs"]
build-backend = "hatchling.build"

[tool.hatch.version]
source = "vcs"
```

```bash
git tag v1.2.0
git push origin v1.2.0   # triggers version bump
```

---

### `CHANGELOG.md` (Keep a Changelog format)

```markdown
# Changelog

All notable changes to this project will be documented here.

## [Unreleased]

## [1.2.0] — 2025-04-01
### Added
- `ngrams()` function for n-gram extraction
- CLI `--json` output flag

### Changed
- `normalize()` now handles all Unicode categories

### Fixed
- `truncate()` off-by-one error with multi-byte suffix

## [1.1.0] — 2025-01-15
### Added
- `file_checksum()` utility with configurable algorithm

## [1.0.0] — 2024-11-01
### Added
- Initial stable release
```

---

## Building the Distribution

```bash
pip install build
```

```bash
python -m build
```

This creates two files in `dist/`:

```
dist/
├── textkit-1.2.0-py3-none-any.whl   ← wheel (fast install)
└── textkit-1.2.0.tar.gz             ← source distribution
```

Inspect the wheel contents:

```bash
pip install wheel
wheel unpack dist/textkit-1.2.0-py3-none-any.whl --dest /tmp/whl
ls /tmp/whl/textkit-1.2.0/
```

Check the sdist:

```bash
tar tzf dist/textkit-1.2.0.tar.gz
```

---

### Check the package with `twine`

```bash
pip install twine
twine check dist/*
```

---

## Publishing to PyPI

### One-time setup

1. Create an account at [pypi.org](https://pypi.org) and [test.pypi.org](https://test.pypi.org)
2. Enable two-factor authentication
3. Create an API token under Account Settings → API tokens

---

### Upload to TestPyPI first

```bash
twine upload --repository testpypi dist/*
```

Verify the install from TestPyPI:

```bash
pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ textkit
```

---

### Upload to PyPI

```bash
twine upload dist/*
```

Enter your API token when prompted, or configure it in `~/.pypirc`:

```ini
[pypi]
username = __token__
password = pypi-xxxxxxxxxxxxxxxxxxxx
```

Or set as an environment variable:

```bash
export TWINE_USERNAME=__token__
export TWINE_PASSWORD=pypi-xxxxxxxxxxxxxxxxxxxx
twine upload dist/*
```

---

### Using `uv publish` (modern alternative)

```bash
uv publish --token pypi-xxxxx
```

---

## CI/CD with GitHub Actions

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.9", "3.10", "3.11", "3.12"]

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}

      - name: Install dependencies
        run: pip install -e ".[dev]"

      - name: Lint with ruff
        run: ruff check .

      - name: Format check
        run: ruff format --check .

      - name: Type check with mypy
        run: mypy src/textkit

      - name: Run tests
        run: pytest --cov=textkit --cov-report=xml

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage.xml
```

---

### `.github/workflows/publish.yml`

Triggered automatically when you push a version tag (`v*`):

```yaml
name: Publish to PyPI

on:
  push:
    tags:
      - "v*"

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    environment: pypi
    permissions:
      id-token: write     # required for OIDC trusted publishing

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install build
        run: pip install build

      - name: Build distributions
        run: python -m build

      - name: Publish to PyPI
        uses: pypa/gh-action-pypi-publish@release/v1
        # No API token needed — uses OIDC trusted publishing
```

!!! tip "Trusted publishing"
    PyPI's [trusted publishing](https://docs.pypi.org/trusted-publishers/) uses OIDC tokens
    from GitHub Actions — no API tokens to rotate or accidentally leak.

Release workflow:

```bash
git tag v1.2.0
git push origin v1.2.0   # triggers publish workflow
```

---

## Command-Line Scripts

### `src/textkit/cli.py`

```python
"""Command-line interface for textkit."""

from __future__ import annotations

import json
import sys

import click

from . import __version__
from .core import most_common_words, normalize, sentence_count, word_count
from .utils import slugify


@click.group()
@click.version_option(__version__)
def main() -> None:
    """textkit — text processing utilities."""


@main.command()
@click.argument("text", default="-", required=False)
@click.option("--sentences", "-s", is_flag=True, help="Also count sentences.")
def count(text: str, sentences: bool) -> None:
    """Count words (and optionally sentences) in TEXT.

    Pass TEXT as an argument, or pipe via stdin:

        echo "Hello world" | textkit count

        textkit count "Hello world"
    """
    if text == "-":
        text = sys.stdin.read()

    words = word_count(text)
    click.echo(f"Words: {words}")

    if sentences:
        sents = sentence_count(text)
        click.echo(f"Sentences: {sents}")


@main.command()
@click.argument("text")
@click.option("--top", "-n", default=10, show_default=True, help="Number of results.")
@click.option("--json", "as_json", is_flag=True, help="Output as JSON.")
def top(text: str, top: int, as_json: bool) -> None:
    """Show the most common words in TEXT."""
    results = most_common_words(text, n=top)
    if as_json:
        click.echo(json.dumps([{"word": w, "count": c} for w, c in results]))
    else:
        for word, count in results:
            click.echo(f"{word:20s} {count}")


@main.command()
@click.argument("text")
def slug(text: str) -> None:
    """Convert TEXT to a URL-safe slug."""
    click.echo(slugify(text))


@main.command()
@click.argument("text")
def norm(text: str) -> None:
    """Normalize whitespace and Unicode in TEXT."""
    click.echo(normalize(text))
```

Register in `pyproject.toml`:

```toml
[project.scripts]
textkit = "textkit.cli:main"
```

After `pip install -e .`:

```bash
textkit --version
textkit count "Hello world"               # Words: 2
textkit count --sentences "Hi. How are you?"
textkit top "the cat sat on the mat" --top 3
textkit slug "Hello, World!"              # hello-world
echo "foo bar foo" | textkit count
```

---

## Packaging Data Files

Sometimes a package needs to ship non-Python files (JSON data, templates, ML models).

### Include files in the package

Place data inside the package directory:

```
src/textkit/
├── __init__.py
├── core.py
└── data/
    ├── stopwords_en.txt
    └── config.json
```

`pyproject.toml` (hatchling includes everything by default; for setuptools, add):

```toml
[tool.hatch.build.targets.wheel]
packages = ["src/textkit"]
# hatchling includes all files inside the package directory
```

For setuptools:

```toml
[tool.setuptools.package-data]
textkit = ["data/*.txt", "data/*.json"]
```

---

### Access data files at runtime with `importlib.resources`

```python
# src/textkit/core.py
from importlib.resources import files

def load_stopwords() -> set[str]:
    """Load the bundled English stopwords list."""
    data = files("textkit.data").joinpath("stopwords_en.txt").read_text(encoding="utf-8")
    return {line.strip() for line in data.splitlines() if line.strip()}
```

!!! warning "Never use `__file__` for package data"
    `__file__` breaks when packages are zipped or installed as namespace packages.
    Always use `importlib.resources` (Python 3.9+) instead.

---

## Namespace Packages

Namespace packages (PEP 420) let multiple distributions share the same top-level package name — common in large organizations.

```
# Two separate repos/distributions:
acme-core/src/acme/core/__init__.py
acme-web/src/acme/web/__init__.py

# Users install both and import:
from acme.core import something
from acme.web  import something_else
```

The `acme/` directory has **no** `__init__.py` — that's what makes it a namespace package.

`pyproject.toml` for `acme-core`:

```toml
[project]
name = "acme-core"

[tool.hatch.build.targets.wheel]
packages = ["src/acme/core"]
```

---

## Complete Example — `textkit`

### Bootstrap the project from scratch

```bash
# 1. Create project layout
mkdir -p textkit/src/textkit textkit/tests textkit/docs
cd textkit

# 2. Create all files
touch src/textkit/__init__.py \
      src/textkit/core.py \
      src/textkit/utils.py \
      src/textkit/cli.py \
      tests/__init__.py \
      tests/test_core.py \
      tests/test_utils.py \
      README.md \
      LICENSE \
      CHANGELOG.md \
      pyproject.toml \
      .pre-commit-config.yaml

# 3. Set up virtual environment
python -m venv .venv
source .venv/bin/activate

# 4. Install in editable mode with all dev deps
pip install -e ".[dev]"

# 5. Install pre-commit hooks
pre-commit install

# 6. Run tests
pytest -v

# 7. Lint & format
ruff check .
ruff format .

# 8. Build
python -m build

# 9. Check
twine check dist/*

# 10. Publish to TestPyPI
twine upload --repository testpypi dist/*
```

---

### Final `pyproject.toml`

```toml
[build-system]
requires      = ["hatchling>=1.21"]
build-backend = "hatchling.build"

[project]
name            = "textkit"
version         = "1.0.0"
description     = "A toolkit for text processing utilities"
readme          = "README.md"
license         = { file = "LICENSE" }
authors         = [{ name = "Alice Smith", email = "alice@example.com" }]
requires-python = ">=3.9"
keywords        = ["text", "nlp", "utilities", "cli"]
classifiers     = [
    "Development Status :: 5 - Production/Stable",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Topic :: Text Processing",
]
dependencies    = ["click>=8.0"]

[project.optional-dependencies]
dev = ["pytest>=7.4", "pytest-cov", "ruff", "mypy", "pre-commit"]
docs = ["mkdocs-material", "mkdocstrings[python]"]

[project.scripts]
textkit = "textkit.cli:main"

[project.urls]
Homepage      = "https://github.com/alice/textkit"
Documentation = "https://textkit.readthedocs.io"
"Bug Tracker" = "https://github.com/alice/textkit/issues"

[tool.hatch.build.targets.wheel]
packages = ["src/textkit"]

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts   = "-v --cov=textkit --cov-report=term-missing"

[tool.ruff]
line-length    = 88
target-version = "py39"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "UP", "B"]

[tool.mypy]
python_version        = "3.9"
strict                = true
ignore_missing_imports = true
```

---

## Quick Reference Card

| Task | Command |
|---|---|
| Create virtual env | `python -m venv .venv` |
| Activate venv | `source .venv/bin/activate` |
| Install editable | `pip install -e ".[dev]"` |
| Run tests | `pytest -v` |
| Run tests + coverage | `pytest --cov=textkit` |
| Lint | `ruff check .` |
| Format | `ruff format .` |
| Type check | `mypy src/textkit` |
| Build distributions | `python -m build` |
| Check distributions | `twine check dist/*` |
| Upload to TestPyPI | `twine upload --repository testpypi dist/*` |
| Upload to PyPI | `twine upload dist/*` |
| Tag a release | `git tag v1.0.0 && git push origin v1.0.0` |
| Serve docs locally | `mkdocs serve` |
| Deploy docs | `mkdocs gh-deploy` |

---

## Useful Links

- [Python Packaging User Guide](https://packaging.python.org)
- [pyproject.toml spec (PEP 621)](https://peps.python.org/pep-0621/)
- [Hatchling build backend](https://hatch.pypa.io/latest/)
- [Setuptools docs](https://setuptools.pypa.io)
- [PyPI classifiers](https://pypi.org/classifiers/)
- [Trusted publishing (OIDC)](https://docs.pypi.org/trusted-publishers/)
- [SemVer](https://semver.org)
- [Keep a Changelog](https://keepachangelog.com)
- [pytest docs](https://docs.pytest.org)
- [Ruff linter](https://docs.astral.sh/ruff/)
- [mypy docs](https://mypy.readthedocs.io)
- [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)
