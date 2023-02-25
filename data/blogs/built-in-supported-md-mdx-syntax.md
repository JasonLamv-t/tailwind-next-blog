---
title: Built-in supported MD/MDX syntax
date: '2023-02-25'
tags:
  [
    'NextJS',
    'Tailwindcss',
    'blog',
    'framework',
    'starter',
    'Tailwind-next-blog',
  ]
draft: false
summary: Built-in supported MD/MDX syntax of the Tailwind-Next-Blog.
images: []
canonicalUrl: ''
---

### Basic inline syntax

This Blog was based on **Tailwind Next Blog**, a blog template open source project at [Github](https://github.com/jasonlamv-t/tailwind-next-blog). You can use this template via run `npx degit https://github.com/JasonLamv-t/tailwind-next-blog` in a empty directory to initialize for your own blog.

### Code block

```ts
const hint = 'Basic usage example';
```

#### With title

````md:Code blocks with title
```ts:Code blocks with title
const codeType = 'ts';
const title = 'Code blocks with title';
```
````

#### Show line numbers

````md:Show-line-numbers showLineNumbers
```ts:Show-line-numbers showLineNumbers
const title = 'Code blocks with title';
```
````

#### Show line numbers

````md:Highlight showLineNumbers {2, 4-6}
```ts:Highlight showLineNumbers {2, 4-6}
const navigation = [
  ['Blogs', '/blogs'],
  ['Projects', '/projects'],
  ['About', '/about'],
];
```
````

### math

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

### quote

> quote: note about that...

### note

<Note>
  Before you can make requests to the Protocol API, you will need to grab your
  API key from your dashboard. You find it under [Settings &raquo; API](#).
</Note>

### wide table

|                              | E1-512M | E1-2048M  | E1-3072M  | C1-2048M  |
| ---------------------------- | ------- | --------- | --------- | --------- |
| CPU(only) maximum usage      | 32%/45% | 100%/110% | 200%/202% | 100%/105% |
| CPU(with RAM) maximum usage  | 32%/45% | 136%/140% | 200%/400% | 80%/300%  |
| CPU Blowfish(less is better) | 24.643  | 6.055     | 4.016     | 8.323     |

### link

This is a [link](/) in line.
