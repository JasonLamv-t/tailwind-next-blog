---
title: 基于 GitHub Action 的 CI/CD 初体验-以本站为例
date: '2022-04-04'
tags: ['CI/CD', 'Github Actions', 'Docker']
draft: false
summary: 因为种种原因，我将博客迁移到以 Next·tailwind 为主的技术框架，因此想要重新搭建一套 CI/CD 的流程，正好借这个机会学习一下 Github action 并了解一下 ACR(Aliyun Container Registry)。
images: []
layout: PostLayout
canonicalUrl:
---

提起 CI/CD（Continues Integration/Continuous Delivery | Deployment），可能现在的大家都不陌生，我大概是在之前一个创业项目的时候开始接触和了解到 CI/CD 的，那时候绑定比较强的一个词是 DevOps，因此也粗略了解了一下相关的概念，奈何视野和能力有限，之前对于自动化的实践都相对比较小儿科；如今 Github Action 的功能已经相当强大，由于本站迁移后还是手动部署过于繁琐，因此拿来练手入门一下。

## **过去我使用的 CI/CD 方案**

由于过去接触的项目较为粗浅，基本都是在如下的架构下进行修改:

![image-20220406190726668](https://tva1.sinaimg.cn/large/e6c9d24ely1h107l41nilj20c106haa3.jpg)

由于业务场景什么的都比较简单（毕竟是学校里的一些项目），因此也能 handle 住。对于前后端的的自动化，主要是依赖于 IDE/shell script 的组合：

- 前端：
  - 方案 A：在`Package.json`中添加名为`deploy`的自定义脚本，将构建产物上传到 ECS/OSS
  - 方案 B：在 IDE（VSCode/WebStorm）中添加 SFTP 类插件并定义上传路径规则
- 后端：由于后端普遍使用的是 IDEA，我给出的方案是通过 Shell 脚本，在上传代码到 ECS 后触发 build/deploy

这些方案都是其实没有形成自动化流水线，也没有保存构建产物，而且需要开发手工进行触发，只能算持续部署，但仍然简化了部署需要的步骤。

## 目前的架构和方案

由于目前有一台 ECS，因此暂时托管在 ECS 上，架构比较简单：

![image-20220406190757170](https://tva1.sinaimg.cn/large/e6c9d24ely1h107lnawwlj20lp0lpabc.jpg)

在使用 actions 前需要跑通以下步骤：

1. ECS 搭建好 Nginx[^1] 和 Docker[^2] 环境
2. 开通好 ACR 环境，并测试将将镜像推送到 ACR 和拉取[^3]
3. 手工构建镜像并在 ECS 上成功启动一个容器并正确映射，可以正常访问

以上步骤并不难，如果你在以上步骤遇到问题，我也提供了相应的参考链接。

## Github Actions 工作流定义

开始之前，最好先阅读 [GitHub Actions 文档](https://docs.github.com/cn/actions)，主要参考的是 [语法部分](https://docs.github.com/cn/actions/using-workflows/workflow-syntax-for-github-actions) 当然，文档中可能有过多你不需要的细节，通常情况下一些教程对于新手可能更加友好，但是当你的需求超出教程提供的范围时，官方文档能为你减少在搜索引擎上耗费的时间。以下将按照实践的顺序行文，因为这些步骤在实际应用中是可以重复/替换顺序的，为了便于教程外场景的参考，我将不会注明顺序。

## 创建工作流定义文件

在项目的根目录下创建`.github/workflow`目录，并在其中创建`CICD.yml`文件，当然文件名是可以任意更改的，但是后缀需要为`.yml`/`.yaml`。此处附上省略的代码：

```YAML
name: ci
on:
  ...
env:
  ...
jobs:
  ...
```

可以看到，代码主要由四部分构成：name, on, jobs, env。`name`可以省略，当然加上并没有任何坏处；`on`用于描述工作流的何时触发；`jobs`用于定义具体的工作步骤；`env`则存放了非加密的环境变量。

### 触发条件的设置

可以触发工作流的事件有很多，[文档](https://docs.github.com/cn/actions/using-workflows/events-that-trigger-workflows) 提供了可用事件的说明。这里我设置的是在 `master` 和 `ci/cd`分支上的推送事件，需要注意的是，**PR 的合并行为可以视为推送事件**。

```YAML
on:
  push:
    branches:
      - master
      - ci/cd
```

### 上下文、环境变量的定义和使用

[上下文](https://docs.github.com/cn/actions/learn-github-actions/contexts) 包含了 [环境变量](https://docs.github.com/cn/actions/learn-github-actions/environment-variables)，可以通过`${{name.PROPERTY}}`的方式来进行调用，特别的，对于环境变量，可以直接通过`$ENV_NAME`的方式调用和拼接字符串，我这里定义了三个环境变量，

```YAML
env:
  IMG_REPO: registry.cn-shenzhen.aliyuncs.com/image-vt
  IMG_NAME: cc-my-next-blog
  IMG_TAG: ${{ github.sha }}
```

### 任务与步骤

以下是任务和步骤的定义（有省略），我们可以在定义多个不同的任务；不同任务之间可以通过`needs`定义依赖关系（执行有先后），例如我们定义`deploy`需要`bulid`任务完成后才执行。`runs-on`指定该任务运行的系统，目前可选的有 ubuntu、windows、和 macOS。通过`steps`来定义一个或多个执行步骤。

```YAML
jobs:
  build:
    name: Build Image and Push to ACR
    runs-on: ubuntu-latest
    steps:
      ...

  deploy:
    name: Deploy Image to Tencent ECS
    needs: build
    runs-on: ubuntu-latest
    steps:
      ...
```

在任务的执行过程中，我们可以使用由官方或第三方预先定义好的步骤，你可以在[官方仓库](https://github.com/actions)、[官方市场](https://github.com/marketplace?type=actions)或其他 GitHub 仓库中找到你想要的步骤。当然，你也可以自定义一套属于自己的 actions 步骤组件以便复用。通常，任务的第一步我们使用 actions/checkout@v2 来检出代码。以下是`build`任务的步骤：

```YAML
steps:
  - name: Checkout
    uses: actions/checkout@v2

  - name: Setup NodeJS
    uses: actions/setup-node@v2
    with:
      node-version: '16'

  - name: Install Dependencies
    run: yarn install

  - name: Login to ACR
    uses: aliyun/acr-login@v1
    with:
      login-server: https://registry.cn-shenzhen.aliyuncs.com
      region-id: cn-shenzhen
      username: '${{ secrets.ACR_USERNAME }}'
      password: '${{ secrets.ACR_PASSWORD }}'

  - name: Build and push image
    run: |
      docker build -t $IMG_REPO/$IMG_NAME:$IMG_TAG .
      docker push $IMG_REPO/$IMG_NAME:$IMG_TAG
```

通过`with`，我们可以指定步骤所需的参数。在`Login to ACR`步骤中，我们使用了`secrets`上下文，其主要用于存放敏感信息如登录凭据、密钥等。

完整配置代码如下：

```YAML
name: ci
on:
  push:
    branches:
      - master
      - ci/cd
env:
  IMG_REPO: registry.cn-shenzhen.aliyuncs.com/image-vt
  IMG_NAME: cc-my-next-blog
  IMG_TAG: ${{ github.sha }}

jobs:
  build:
    name: Build Image and Push to ACR
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup NodeJS
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install Dependencies
        run: yarn install

      - name: Lint
        run: yarn lint

      - name: Login to ACR
        uses: aliyun/acr-login@v1
        with:
          login-server: https://registry.cn-shenzhen.aliyuncs.com
          region-id: cn-shenzhen
          username: '${{ secrets.ACR_USERNAME }}'
          password: '${{ secrets.ACR_PASSWORD }}'

      - name: Build and push image
        run: |
          docker build -t $IMG_REPO/$IMG_NAME:$IMG_TAG .
          docker push $IMG_REPO/$IMG_NAME:$IMG_TAG
  deploy:
    name: Deploy Image to Tencent ECS
    needs: build
    runs-on: ubuntu-latest

    steps:
      - name: Login to Tencent ECS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.ECS_HOSTNAME }}
          username: ubuntu
          key: '${{ secrets.ECS_PRIVATE_KEY }}'
          envs: IMG_REPO, IMG_NAME, IMG_TAG
          script: docker rm -f $IMG_NAME &&
            docker run -d --restart=always -p 3000:3000 --name $IMG_NAME $IMG_REPO/$IMG_NAME:$IMG_TAG
```

## 运行与测试

将代码提交并按定义的方式触发后，你将可以通过 https://github.com/username/repository/actions 查看任务的是否触发以及运行情况和日志。

[^1]: [Install | NGINX](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
[^2]: [Install Docker Engine | Docker Documentation](https://docs.docker.com/engine/install/)
[^3]: [ACR 个人版 (aliyun.com)](https://help.aliyun.com/document_detail/205066.html)
