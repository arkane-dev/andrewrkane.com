---
title: "Markdown style guide (draft)"
date: 2026-10-01
summary: "Every Markdown element, for checking post styling. Draft: shows in dev only."
tags: [meta]
draft: true
---

Body text with **bold**, *italic*, `inline code`, a [link](/about) and ~~strikethrough~~.

## Heading 2

### Heading 3

#### Heading 4

- Unordered item
- Another item
  - Nested item

1. Ordered item
2. Second item

> A blockquote. It can run over several lines and should still read well.

```python
def tokens_to_cost(tokens_in: int, tokens_out: int, price_in: float, price_out: float) -> float:
    """Cost in dollars; prices are per million tokens."""
    return tokens_in / 1e6 * price_in + tokens_out / 1e6 * price_out  # comment
```

```go
func (a *App) Ping(msg string) string {
	return fmt.Sprintf("> ACK %q", msg)
}
```

```bash
templates/new-project.sh genai-calculator site
```

| Column | Number | Note |
|---|---|---|
| Alpha | 1,024 | left |
| Beta | 42 | right |

---

A horizontal rule sits above this line. 中文段落也应该可以正常显示：霓虹都市，不夜城。
