# Tailwind Next Blog

[![Repo stars](https://img.shields.io/github/stars/jasonlamv-t/tailwind-next-blog?style=social)](https://GitHub.com/jasonlamv-t/tailwind-next-blog/stargazers/) ![Commit activity](https://img.shields.io/github/commit-activity/m/jasonlamv-t/tailwind-next-blog?logo=github&style=social) ![Last commit](https://img.shields.io/github/last-commit/jasonlamv-t/tailwind-next-blog?logo=github&style=social)

> Refactoring for v3, please check [master](https://github.com/JasonLamv-t/tailwind-next-blog/tree/master) branch for v1.

This is a personal blog project template modeled after [Tailwind-Nextjs-Starter-Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) based on [NextJS](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com), which can be used out of the box and has a high degree of custom freedom. Here is the [DEMO](https://tailwind-next-blog.vercel.app)

If you have any questions in use, please ask the issue, and I will reply and deal with it as soon as possible.

## Features / Roadmap

![NextJS version](https://img.shields.io/badge/NextJS-14-yellow) ![TailwindCSS version](https://img.shields.io/badge/TailwindCSS-3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-blue) ![pnpm](https://img.shields.io/badge/pnpm-red)

- Out of box

  - [x] All your need to set only the `data` directory
  - [x] Mobile-friendly view
  - [x] Light and dark theme
  - [x] Support for nested routing of blog posts
  - [x] Pinned Article
  - [x] Additional build-in markdown syntax support via mdx, can also customize
  - [x] Preconfigured security headers, which is SEO friendly
  - [ ] Support RSS and Sitemap

- Markdown

  - [x] GFM support
  - [x] Math display supported via [KaTeX](https://katex.org/) & [remark-math](https://github.com/remarkjs/remark-math)
  - [x] Syntax & line highlighting in VSCode style, and display line numbers in code blocks via [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus)

- Advanced development

  - [x] MDX support via [contentlayer](https://www.contentlayer.dev/) and [mdx-bundler](https://github.com/kentcdodds/mdx-bundler)
  - [ ] Support search everything in the blog via [Algolia](https://algolia.com/).[Docsearch](https://docsearch.algolia.com/)
  - [ ] Support full-text search locally via @TBD

- TODO

  - [x] Configurate all in one
  - [ ] Pagination for the list page and the post page
  - [ ] Chinese documentation
  - [x] Demo via GitHub and Vercel
  - [ ] Infinity scrolling of the homepage

- Need Fix

  - [ ] The resouces url error under the data directory caused by the base path configuration
  - [ ] Refacotor the header component to replace deprecated API

## Get Started

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/JasonLamv-t/tailwind-next-blog)
