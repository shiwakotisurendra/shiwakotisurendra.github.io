---
hide:
  - toc
---

# Python Beginner Tutorial

## 1. Getting started

Python is a beginner-friendly programming language used for automation, data analysis, web development, geospatial work, and more. It is known for readable syntax and a large standard library.

### 1.1 Common concepts

- **Interpreter**: runs Python code line by line.
- **Script**: a `.py` file containing Python code.
- **Module**: a file with reusable code.
- **Package**: a collection of modules.

### 1.2 First program

```python
print("Hello, world!")
```

### 1.3 Example use

```python
name = "Surendra"
print(f"Hello, {name}!")
```

---

## 2. Variables and data types

Variables store values, and Python lets you work with numbers, text, booleans, and more without declaring types manually.

### 2.1 Common data types

- **`int`** - whole numbers.
- **`float`** - decimal numbers.
- **`str`** - text.
- **`bool`** - `True` or `False`.
- **`list`** - ordered, mutable collection.
- **`tuple`** - ordered, immutable collection.
- **`dict`** - key-value pairs.
- **`set`** - unordered unique values.

### 2.2 Example

```python
age = 30
height = 1.75
city = "Köln"
is_student = True
```

### 2.3 Useful methods and functions

- **`type()`** - check data type.
- **`int()`** - convert to integer.
- **`float()`** - convert to float.
- **`str()`** - convert to string.
- **`bool()`** - convert to boolean.

### 2.4 Example use

```python
x = "42"
y = int(x)
print(y + 8)
```

---

## 3. Basic operators

Operators let you perform arithmetic, comparisons, and logical checks.

### 3.1 Arithmetic operators

- **`+`** - add.
- **`-`** - subtract.
- **`*`** - multiply.
- **`/`** - true division.
- **`//`** - floor division.
- **`%`** - remainder.
- **`**`** - power.

### 3.2 Comparison operators

- **`==`** - equal.
- **`!=`** - not equal.
- **`>`** - greater than.
- **`<`** - less than.
- **`>=`** - greater than or equal.
- **`<=`** - less than or equal.

### 3.3 Logical operators

- **`and`** - both conditions true.
- **`or`** - at least one condition true.
- **`not`** - invert a condition.

### 3.4 Example use

```python
a = 10
b = 3

print(a + b)
print(a // b)
print(a > b and b > 0)
```

---

## 4. Strings

Strings are sequences of characters. Python provides many string methods for cleaning, searching, and formatting text.

### 4.1 Common string methods

- **`lower()`** - convert to lowercase.
- **`upper()`** - convert to uppercase.
- **`strip()`** - remove whitespace.
- **`replace()`** - replace text.
- **`split()`** - split into a list.
- **`join()`** - combine strings.
- **`find()`** - find position of substring.
- **`startswith()`** - check prefix.
- **`endswith()`** - check suffix.
- **`count()`** - count occurrences.
- **`format()`** - format string values.
- **`f-strings`** - format values directly in string literals.

### 4.2 Example

```python
text = "  Python is fun  "
clean = text.strip().lower()
print(clean)
```

### 4.3 Example use

```python
name = "Surendra"
country = "Germany"
print(f"{name} lives in {country}.")
```

---

## 5. Lists and tuples

Lists and tuples store multiple values. Lists can change, while tuples are fixed after creation.

### 5.1 Common list methods

- **`append()`** - add one item.
- **`extend()`** - add multiple items.
- **`insert()`** - insert at a position.
- **`remove()`** - remove first matching value.
- **`pop()`** - remove and return item.
- **`clear()`** - remove all items.
- **`index()`** - find position of item.
- **`count()`** - count occurrences.
- **`sort()`** - sort in place.
- **`reverse()`** - reverse in place.
- **`copy()`** - create a shallow copy.

### 5.2 Common tuple methods

- **`count()`** - count occurrences.
- **`index()`** - find position of item.

### 5.3 Example

```python
numbers =[1][2][3]
numbers.append(4)
numbers.sort()
print(numbers)
```

---

## 6. Dictionaries and sets

Dictionaries store key-value pairs, and sets store unique unordered values.

### 6.1 Common dictionary methods

- **`get()`** - safe lookup.
- **`keys()`** - return keys.
- **`values()`** - return values.
- **`items()`** - return key-value pairs.
- **`update()`** - merge values.
- **`pop()`** - remove key.
- **`popitem()`** - remove last inserted item.
- **`setdefault()`** - get or create a default value.
- **`clear()`** - remove all items.
- **`copy()`** - copy dictionary.

### 6.2 Common set methods

- **`add()`** - add an element.
- **`update()`** - add multiple elements.
- **`remove()`** - remove an element and raise error if missing.
- **`discard()`** - remove safely.
- **`pop()`** - remove arbitrary item.
- **`union()`** - combine sets.
- **`intersection()`** - common elements.
- **`difference()`** - elements in one set but not the other.
- **`symmetric_difference()`** - elements in either set but not both.

### 6.3 Example

```python
person = {"name": "Surendra", "city": "Köln"}
print(person.get("city"))

cities = {"Köln", "Berlin"}
cities.add("Munich")
print(cities)
```

---

## 7. Conditions

Conditions let your program make decisions based on logic.

### 7.1 Keywords

- **`if`** - run code when condition is true.
- **`elif`** - check another condition.
- **`else`** - fallback branch.

### 7.2 Example

```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 70:
    grade = "B"
else:
    grade = "C"

print(grade)
```

---

## 8. Loops

Loops repeat code over a sequence or until a condition changes.

### 8.1 Common loop forms

- **`for`** - iterate over items.
- **`while`** - repeat while condition is true.
- **`break`** - exit loop.
- **`continue`** - skip to next iteration.
- **`range()`** - generate numeric sequence.
- **`enumerate()`** - get index and value together.
- **`zip()`** - iterate over multiple sequences together.

### 8.2 Example

```python
for i in range(3):
    print(i)
```

### 8.3 Example use

```python
names = ["A", "B", "C"]
for idx, name in enumerate(names, start=1):
    print(idx, name)
```

---

## 9. Functions

Functions let you package code into reusable blocks.

### 9.1 Common ideas

- **`def`** - define a function.
- **`return`** - send back a result.
- **parameters** - input values.
- **arguments** - values passed to a function.

### 9.2 Example

```python
def greet(name):
    return f"Hello, {name}"

print(greet("Surendra"))
```

### 9.3 Useful built-in functions

- **`print()`** - display output.
- **`input()`** - get user input.
- **`len()`** - get length.
- **`sum()`** - sum items.
- **`min()`** - smallest value.
- **`max()`** - largest value.
- **`sorted()`** - return sorted list.
- **`map()`** - apply function to items.
- **`filter()`** - keep matching items.
- **`any()`** - check if any item is true.
- **`all()`** - check if all items are true.
- **`abs()`** - absolute value.
- **`round()`** - round a number.

### 9.4 Example use

```python
values =[2][3][4][1]
print(sum(values))
print(len(values))
```

---

## 10. Errors and exceptions

Errors are normal in programming. Python allows you to handle them gracefully.

### 10.1 Common keywords

- **`try`** - start protected block.
- **`except`** - handle error.
- **`else`** - run if no exception.
- **`finally`** - always run.
- **`raise`** - trigger an exception manually.

### 10.2 Example

```python
try:
    x = int("abc")
except ValueError:
    x = 0
print(x)
```

---

## 11. Files

Python can read and write text files and other file types.

### 11.1 Common functions and methods

- **`open()`** - open a file.
- **`read()`** - read file content.
- **`readline()`** - read one line.
- **`readlines()`** - read all lines.
- **`write()`** - write text.
- **`writelines()`** - write multiple lines.
- **`close()`** - close file.
- **`with`** - context manager for safe file handling.

### 11.2 Example

```python
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("Hello Python")
```

### 11.3 Example use

```python
with open("notes.txt", "r", encoding="utf-8") as f:
    content = f.read()
print(content)
```

---

## 12. Modules and packages

Modules and packages help organize code into reusable parts.

### 12.1 Common ideas

- **`import`** - bring in a module.
- **`from ... import ...`** - import specific names.
- **`as`** - create an alias.

### 12.2 Example

```python
import math

print(math.sqrt(16))
```

### 12.3 Example use

```python
from math import sqrt
print(sqrt(25))
```

---

## 13. Classes and objects

Classes let you create your own data structures and methods.

### 13.1 Common concepts

- **class** - blueprint for objects.
- **object** - an instance of a class.
- **method** - function inside a class.
- **`__init__()`** - constructor.

### 13.2 Example

```python
class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hi, I am {self.name}"

p = Person("Surendra")
print(p.greet())
```

---

## 14. Comprehensions

Comprehensions provide a concise way to build lists, dictionaries, and sets.

### 14.1 Common forms

- **List comprehension**
- **Dictionary comprehension**
- **Set comprehension**

### 14.2 Example

```python
squares = [x * x for x in range(5)]
print(squares)
```

### 14.3 Example use

```python
even_squares = {x: x * x for x in range(6) if x % 2 == 0}
print(even_squares)
```

---

## 15. Working with dates

Python includes tools for date and time handling.

### 15.1 Common module

- **`datetime`** - date and time support.
- **`date.today()`** - current date.
- **`datetime.now()`** - current date and time.
- **`strftime()`** - format date as string.
- **`strptime()`** - parse string into date.

### 15.2 Example

```python
from datetime import datetime

now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M"))
```

---

## 16. Useful standard library tools

The standard library includes modules that are useful for everyday programming.

### 16.1 Common modules

- **`os`** - operating system utilities.
- **`pathlib`** - object-oriented file paths.
- **`json`** - JSON read and write.
- **`csv`** - CSV handling.
- **`random`** - random numbers.
- **`statistics`** - basic stats.
- **`collections`** - specialized container types.
- **`itertools`** - iterator tools.

### 16.2 Example

```python
from pathlib import Path

path = Path("data.txt")
print(path.exists())
```

---

## 17. Beginner project patterns

These small patterns are useful for practice and daily work.

### 17.1 Read user input

```python
name = input("Enter your name: ")
print(f"Welcome, {name}")
```

### 17.2 Count items

```python
items = ["a", "b", "a", "c", "b", "a"]
counts = {}
for item in items:
    counts[item] = counts.get(item, 0) + 1
print(counts)
```

### 17.3 Clean text

```python
text = "  Hello Python  "
clean = text.strip().lower()
print(clean)
```

---

## 18. Practical mini examples

### 18.1 Average of numbers

```python
values =[5]
avg = sum(values) / len(values)
print(avg)
```

### 18.2 Find largest item

```python
numbers =[4][6][7][2]
print(max(numbers))
```

### 18.3 Filter even numbers

```python
nums =[3][8][9][1][2][4]
evens = [n for n in nums if n % 2 == 0]
print(evens)
```

---

## 19. Quick reference table

| Area | Key methods or features | Purpose |
|---|---|---|
| Output | `print()` | Show results. |
| Input | `input()` | Read user input. |
| Types | `int()`, `float()`, `str()` | Convert values. |
| Strings | `lower()`, `split()`, `replace()` | Work with text. |
| Lists | `append()`, `sort()`, `pop()` | Manage ordered collections. |
| Dictionaries | `get()`, `keys()`, `items()` | Store key-value data. |
| Sets | `add()`, `union()`, `intersection()` | Work with unique items. |
| Conditions | `if`, `elif`, `else` | Make decisions. |
| Loops | `for`, `while`, `range()` | Repeat actions. |
| Functions | `def`, `return` | Reuse logic. |
| Files | `open()`, `read()`, `write()` | Handle files. |
| Classes | `class`, `__init__()` | Create custom objects. |

---

## 20. Learning path

Start with variables, strings, lists, and conditions. Then move to loops, functions, dictionaries, files, and classes. After that, practice with small projects such as text cleaning, file processing, and data summaries.

### 20.1 Suggested practice order

1. Variables and data types.
2. String methods.
3. Lists, tuples, dictionaries, and sets.
4. Conditions and loops.
5. Functions and error handling.
6. File handling.
7. Classes and modules.
8. Mini projects.

### 20.2 Example practice task

```python
words = ["GIS", "Python", "python", "Data"]
cleaned = [w.lower() for w in words]
print(cleaned)
```