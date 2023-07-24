---
title: Serverless-Devs实践-基于 GhostScript 的 PDF 转 JPG
date: '2021-7-16'
tags: ['NodeJS', 'Serverless', 'Serverless-Devs', 'Aliyun', 'PDF2IMG']
draft: false
summary: 该项目是基于GhostScript的PDF转JPG工具，借助Serverless-Devs工具进行依赖安装并部署到阿里云函数计算，是一个serverless的简单示例。
images: []
layout: PostLayout
canonicalUrl: ''
---

该项目是基于 GhostScript 的 PDF 转 JPG 工具，借助[Serverless-Devs](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/readme_zh.md)工具进行依赖安装并部署到阿里云函数计算，是一个 serverless 的简单示例。

## 开始之前

### Serverless-Devs

如果您的开发环境没有 Serverless-Devs，如果您的开发环境具备[npm](https://www.npmjs.com/)，可执行以下命令进行安装：

```bash
npm install  @serverless-devs/s -g
```

或者 通过 [yarn](https://yarnpkg.com/) 进行安装

```bash
yarn global add  @serverless-devs/s
```

更多内容请参考[Serverless Devs Install-tutorial](https://github.com/devsapp/fc/blob/main/docs/Getting-started/Install-tutorial.md)。

### Docker

本文档涉及本地调试，因此需要开发环境具有[Docker](https://www.docker.com/)，您可根据您开发平台的不同安装不同版本，可参考[Serverless Devs Install-tutorial](https://github.com/devsapp/fc/blob/main/docs/Getting-started/Install-tutorial.md)可选部分。

### Aliyun RAM 账号

前往[RAM 访问控制](https://ram.console.aliyun.com/users)创建一个子用户，赋予其管理函数计算(FC)服务权限「AliyunFCFullAccess」并创建 AccessKey。

### Serverless-Devs 密钥配置

参考[配置阿里云密钥](https://github.com/devsapp/fc/blob/main/docs/Getting-started/Setting-up-credentials.md)及[S config](http://www.serverless-devs.com/docs/command#config指令)，将上一步创建的子用户 AccessKey 配置到 S 中。

## 开发

### 初始化项目

执行`s init`来创建项目，我们选择*Alibaba Cloud Serverless ➡️ HTTP Function-Node.js 12 Example ➡️ 输入文件夹名称*。

### 自定义 Runtime

创建 Funfile 文件：

```dockerfile
RUNTIME nodejs12	# 指定基础运行环境
RUN fun-install apt-get install ghostscript
```

更多关于 Funfile 信息请参考[Funfile 功能介绍](https://developer.aliyun.com/article/719100)及[Custom Runtime-函数计算](https://help.aliyun.com/document_detail/132044.html?spm=a2c4g.11186623.6.601.2cd369ac18G1R7)。

### 修改 index.js

```javascript
// index.js
const { exec } = require('child_process')

exports.handler = (event, context, callback) => {
  const cmd = 'gs -sDEVICE=jpeg -dTextAlphaBits=4 -r144 -o /tmp/test.jpg test.pdf'
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log('stdout =================== START')
      console.log(stdout)
      console.log('stdout =================== END')
      console.log('stderr =================== START')
      console.log(stderr)
      console.log('stderr =================== END')
      callback(err, 'convert fail.\n')
    } else {
      console.log('stdout =================== START')
      console.log(stdout)
      console.log('stdout =================== END')
      callback(null, 'convert success.\nJPG file save to /tmp/test.jpg\n')
    }
  })
}
```

### 修改 s.yaml

在 function 字段下添加环境变量

```yaml
# s.yaml
...
services:
  ghostscript_example: #  服务名称
    component: devsapp/fc  # 组件名称

    props: #  组件的属性值
      service:
        name: ghostscript
      ...
      function:
        ...
        name: pdf2jpg-test
        environmentVariables:
          GS_LIB: >-
        .s/root/usr/share/ghostscript/9.26/Resource/Init:.s/root/usr/share/ghostscript/9.26/lib:.s/root/usr/share/ghostscript/9.26/Resource/Font:.s/root/usr/share/ghostscript/fonts:.s/root/var/lib/ghostscript/fonts:.s/root/usr/share/ghostscript/fonts:.s/root/usr/share/fonts
```

### 添加测试文件

在项目目录下添加一个名为「test.pdf」的测试文件。

### 构建 Runtime 并安装依赖

执行`s build`，S 检测到项目中存在「Funfile」时将会以 Custom Container 模式构建并安装依赖，得到`Build artifact successfully`时说明构建成功。

```shell
$ s build
[2021-07-27T08:31:31.428] [INFO ] [S-CLI] - Start ...
[2021-07-27T08:31:33.142] [INFO ] [FC-BUILD] - Build artifact start...
Funfile exist, Fun will use container to build forcely
Step 1/2 : FROM registry.cn-beijing.aliyuncs.com/aliyunfc/runtime-nodejs12:build-1.9.17 as nodejs12
 ---> 231f0fd07c07
Step 2/2 : RUN fun-install apt-get install ghostscript
 ---> Using cache
 ---> f1fd050510fe
sha256:f1fd050510fedf0cbcb673d327c84a153d824357f77fe0f0f76e730b4bbe0a3c
Successfully built f1fd050510fe
Successfully tagged fun-cache-4c2c48e0-2395-45c8-a29d-2c9668b985eb:latest
copying function artifact to /Users/linjiaxiang/ServerlessDevs/ghostscript_example/.s/build/artifacts/ghostscript/pdf2jpg-test
[2021-07-27T08:31:37.020] [INFO ] [FC-BUILD] - Build function using image: fun-cache-4c2c48e0-2395-45c8-a29d-2c9668b985eb
[2021-07-27T08:31:37.033] [INFO ] [FC-BUILD] - skip pulling image fun-cache-4c2c48e0-2395-45c8-a29d-2c9668b985eb...
[2021-07-27T08:31:38.245] [INFO ] [FC-BUILD] - Build artifact successfully.

Tips for next step
======================
* Invoke Event Function: s local invoke
* Invoke Http Function: s local start
* Deploy Resources: s deploy
End of method: build
```

### 本地调用

```shell
$ s local invoke
FC Invoke Start RequestId: f6d78602-c84d-41f5-a8be-345825effcd7
load code for handler:index.handler
2021-07-27T00:33:12.019Z f6d78602-c84d-41f5-a8be-345825effcd7 [verbose] stdout =================== START
2021-07-27T00:33:12.019Z f6d78602-c84d-41f5-a8be-345825effcd7 [verbose] GPL Ghostscript 9.26 (2018-11-20)
Copyright (C) 2018 Artifex Software, Inc.  All rights reserved.
This software comes with NO WARRANTY: see the file PUBLIC for details.
Warning: the map file cidfmap was not found.
Processing pages 1 through 1.
Page 1

2021-07-27T00:33:12.020Z f6d78602-c84d-41f5-a8be-345825effcd7 [verbose] stdout =================== END
FC Invoke End RequestId: f6d78602-c84d-41f5-a8be-345825effcd7
convert success.
JPG file save to /tmp/test.jpg
```

可以查看文件`.s/build/artifacts/ghostscript/pdf2jpg-test/test.jpg`查看效果

### 部署

```shell
$ s deploy
[2021-07-27T08:52:03.419] [INFO ] [S-CLI] - Start ...
[2021-07-27T08:52:05.745] [INFO ] [FC-DEPLOY] - Using region: cn-shenzhen
[2021-07-27T08:52:05.746] [INFO ] [FC-DEPLOY] - Using access alias: ali-main
[2021-07-27T08:52:05.746] [INFO ] [FC-DEPLOY] - Using accessKeyID: ***********1257
[2021-07-27T08:52:05.746] [INFO ] [FC-DEPLOY] - Using accessKeySecret: ***********eMkg
[2021-07-27T08:52:06.188] [INFO ] [FC-DEPLOY] - Checking Service ghostscript exists
[2021-07-27T08:52:06.695] [INFO ] [FC-DEPLOY] - Checking Function pdf2jpg-test exists
📎 Using fc deploy type: sdk, If you want to deploy with pulumi, you can [s cli fc-default set deploy-type pulumi] to switch.
[2021-07-27T08:52:07.710] [INFO ] [FC-DEPLOY] - Fc detects that you have run build command for function: pdf2jpg-test.
...
[2021-07-27T08:52:14.454] [INFO ] [FC-DEPLOY] - Creating service: ghostscript
[2021-07-27T08:52:14.454] [INFO ] [FC-DEPLOY] - Creating function: pdf2jpg-test
✔ Make service ghostscript success.
✔ Make function ghostscript/pdf2jpg-test success.
[2021-07-27T08:52:29.186] [INFO ] [FC-DEPLOY] - Checking Service ghostscript exists
[2021-07-27T08:52:29.499] [INFO ] [FC-DEPLOY] - Checking Function pdf2jpg-test exists
...
```

### 调用

```shell
$ s invoke
[2021-07-27T08:52:46.610] [INFO ] [S-CLI] - Start ...
========= FC invoke Logs begin =========
FC Invoke Start RequestId: 8b072a2e-0233-4218-b5f8-9c6385c50933
load code for handler:index.handler
2021-07-27T00:52:49.652Z 8b072a2e-0233-4218-b5f8-9c6385c50933 [verbose] stdout =================== START
2021-07-27T00:52:49.652Z 8b072a2e-0233-4218-b5f8-9c6385c50933 [verbose] GPL Ghostscript 9.26 (2018-11-20)
Copyright (C) 2018 Artifex Software, Inc.  All rights reserved.
This software comes with NO WARRANTY: see the file PUBLIC for details.
Warning: the map file cidfmap was not found.
Processing pages 1 through 1.
Page 1

2021-07-27T00:52:49.652Z 8b072a2e-0233-4218-b5f8-9c6385c50933 [verbose] stdout =================== END
FC Invoke End RequestId: 8b072a2e-0233-4218-b5f8-9c6385c50933

Duration: 669.58 ms, Billed Duration: 670 ms, Memory Size: 128 MB, Max Memory Used: 97.57 MB
========= FC invoke Logs end =========

FC Invoke Result:
convert success.
JPG file save to /tmp/test.jpg

End of method: invoke
```

## 附录与参考

- [本文代码](https://github.com/JasonLamv-t/serverless-devs-ghostscript_example)
- [awesome-fc/ghostscript_example: 基于 GhostScript 的 PDF 转 JPG ](https://github.com/awesome-fc/ghostscript_example)
