---
title: How I set-up my Mac and the useful terminal tools I use
date: '2023-02-26'
tags: [tools, terminal, mac]
draft: false
summary: 作为开发人员，尽管我们已经有了现代的 IDE 和系统 UI 界面，但是终端和命令行仍然是我们在日常中最熟悉的计算机交互手段，在这里我列举我在自己的 Mac 中实际用到的一些配置和包。
images: []
layout: PostLayout
canonicalUrl:
---

作为开发人员，尽管我们已经有了现代的 IDE 和系统 UI 界面，但是终端和命令行仍然是我们在日常中最熟悉的计算机交互手段，在这里我列举我在自己的 Mac 中实际用到的一些配置和包。

## 推荐的环境配置和工具

### [Homebrew](https://brew.sh/)

Homebrew 或者说 brew 是 Mac 上最具盛名的包管理工具，目前在 GitHub 上已经有 35k Star。通过以下命令你可以快速安装：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

如果你遇到一些难以解决的网络问题，你可以考虑使用国内脚本：

```bash:安装
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

```bash:卸载
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

### [oh-my-zsh](https://ohmyz.sh/)

目前 Mac 已经默认自带了 zsh，通过 oh-my-zsh，我们可以通过使用不同的「[主题](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)」得到更好的命令行界面，并用上各种 [oh-my-zsh 插件](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins-Overview)来提高我们的工作效率。我使用的是默认的主题「robbyrussell」，使用的插件如下：

- [git](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)：提供了额外的 git 命令缩写和脚本
- [gitignore](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/gitignore)：通过请求 gitignore 快速生成对应的 gitignore 内容
- [z](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/z) / [autojump](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/autojump)：快速跳转路径，两者选一即可
- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/)：语法高亮
- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)：命令提示和补全

### [iTerm2](https://iterm2.com/)

一个用于 Mac 终端的替代品，可以提供更多的功能和配置。

## 可选的包或者工具

以下包基本都可以通过 brew 安装

- tldr：显示 tldr-pages 项目中命令行工具的简单帮助页面，提供命令行的常用例子和提示，比如`tldr tldr`
- nvm：安装、卸载或切换 Node.js 版本
- pyenv：用于管理和切换 python 虚拟环境
- bat：更好的 cat，有语法高亮和 Git 集成
- htop：更好的 top，命令行资源监控工具
- prettyping：更好看的 ping
- macos-trash：用移动到废纸篓替代 rm
- gh：GitHub 官方命令行工具

## 实用的软件推荐

- [PD-Runner](https://github.com/lihaoyun6/PD-Runner)： Parallel Desktop 启动器
- [Mos](https://github.com/Caldis/Mos)：macOS 上平滑鼠标滚动的工具
- [Bob](https://github.com/ripperhe/Bob)：翻译插件，支持 OCR 等多种功能和多个平台
- [MonitorControl](https://github.com/MonitorControl/MonitorControl)：支持通过快捷键控制第三方外置显示器的亮度和音量
- [noTunes](https://github.com/tombonez/noTunes)：完美屏蔽 iTunes，在没有打开任何音乐软件的情况下按播放键可以打开指定的软件
