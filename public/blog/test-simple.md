---
title: "Simple Test Article"
author: Chen Hao
date: 2025-01-07
tags:
  - test
excerpt: A simple test article to debug markdown rendering with table of contents.
featured: false
---

# Hello World

This is a **simple** test article demonstrating various markdown features and the table of contents functionality.

this is a pic ![](/blog/img/lora.png)

## Section One: Basic Text Elements

Here is some content with a [link](https://example.com).

This section demonstrates basic markdown elements:

- Item 1
- Item 2
- Item 3

### Subsection: Inline Code

This is inline code: `function`, `variable`, `const value = 42`.

## Section Two: Code Blocks

This section demonstrates syntax-highlighted code blocks.

### Python Example

Here's a Python code block with syntax highlighting:

```python
import numpy as np

def example_function(x):
    """Calculate x + 1"""
    return x + 1

# Call the function
result = example_function(10)
print(f"Result: {result}")
```

### JavaScript Example

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

const message = greet('World');
console.log(message);
```

## Section Three: Footnotes and Quotes

This section demonstrates footnotes[^1] and blockquotes.

### Blockquote Example

Here's a famous quote:

> this is from another book.
>                      --《booke》

You can have multiple paragraphs in blockquotes as well.

## Section Four: Advanced Features

This section covers more advanced markdown features.

### Mathematical Expressions

You can include inline math like \(E = mc^2\) or block equations:

\[
\int_{a}^{b} f(x) dx = F(b) - F(a)
\]

### Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | Yes | H1-H6 |
| Code | Yes | Inline and blocks |
| Images | Yes | With captions |
| Footnotes | Yes | Like this[^2] |

## Conclusion

That's it! This article demonstrates the TOC (Table of Contents) functionality, which appears on the left side of the page and highlights the current section as you scroll.

[^1]: This is the first footnote
[^2]: This is the second footnote with more details