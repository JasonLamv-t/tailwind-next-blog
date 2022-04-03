---
title: Git-How to manage your code workflow better
date: '2022-04-04'
tags: ['Git', 'GitHub', 'workflow']
draft: true
summary: 在经历过几个项目的协同开发后，我决定写下这篇文章，以记录我对于 Git 的使用方式的一些思考。
images: []
layout: PostLayout
canonicalUrl:
---

## Outline

- before all
-

在阅读本篇文章之前，我已经假设了你已经了解了 Git 的使用方式，并且已经熟悉了 Git 的一些基本命令如「push」、「pull」、「commit」等。
在以仓库为单位的项目的开发过程中，我们可以根据开发人数规模分为「个人」「小团队」和「大团队」这几种组织方式。其中，团队的「大/小」区分取决于团队内是否根据模块/功能划分小组，而非人员数量。由此，Git 在不同开发方式下的使用方式和原则存在一定的继承关系，本文也将由小到大逐步介绍如何组织和管理代码。

![组织方式层级](/static/images/blog/git-workflow/team-architecture.drawio.svg)

## 个人开发
