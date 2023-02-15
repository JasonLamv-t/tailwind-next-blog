---
title: Serverless-Devs实践-基于 Node 的前端 CICD
date: '2021-07-04'
tags: ['NodeJS', 'Serverless', 'Serverless-Devs', 'Aliyun', 'CI/CD']
draft: false
summary: Serverless Devs是一个开源开放的 Serverless 开发者平台，致力于为开发者提供强大的工具链体系。通过该平台，开发者可以一键体验多云 Serverless 产品，极速部署 Serverless 项目。本文介绍通过Serverless-Devs部署一个前端CICD系统。
layout: PostLayout
canonicalUrl:
---

[Serverless Devs](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/readme_zh.md) 是一个开源开放的 Serverless 开发者平台，致力于为开发者提供强大的工具链体系。通过该平台，开发者可以一键体验多云 Serverless 产品，极速部署 Serverless 项目。本文介绍通过 Serverless-Devs 部署一个前端 CICD 系统。

## 基本信息

自动将前端项目托管至阿里云对象存储平台，无需服务器及额外运维操作，并实现 CDN 访问加速。

方案架构：

![1 (1)](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/008i3skNgy1gsnk6k0ynqj30ik0cddgi.jpg)

## 开始之前

### Serverless Devs

如果您的开发环境没有 Serverless Devs，请参考[Serverless Devs Install-tutorial](https://github.com/devsapp/fc/blob/main/docs/Getting-started/Install-tutorial.md)进行安装。

### Docker

本文档涉及本地调试，因此需要开发环境具有 Docker，您可根据您开发平台的不同安装不同版本，可参考[Serverless Devs Install-tutorial](https://github.com/devsapp/fc/blob/main/docs/Getting-started/Install-tutorial.md)可选部分。

### Github

- 本文档基于 Github 进行实践，因此不保证在其他代码托管平台的可用性，您可以根据您具体使用的代码平台的 webhook 参数对本文代码进行修改。**您需要准备一个前端项目以便进行下一步**，本文准备了[serverless-cicd-example-vue](https://github.com/JasonLamv-t/serverless-cicd-example-vue)便于实践
- 创建密钥对并绑定到 github，可参考[使用 SSH 连接到 GitHub - GitHub Docs](https://docs.github.com/cn/github/authenticating-to-github/connecting-to-github-with-ssh)

## 配置

### RAM 账号

前往[RAM 访问控制](https://ram.console.aliyun.com/users)创建一个子用户，赋予其对象存储服务权限「AliyunOSSFullAccess」及管理函数计算(FC)服务权限「AliyunFCFullAccess」并创建 AccessKey。

![image-20210720133222847](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/008i3skNgy1gsncse20oij30s30823z3.jpg)

### 对象存储服务(OSS)

前往[OSS 管理控制台](https://oss.console.aliyun.com/overview)开通对象存储服务，并创建一个 Bucket，Bucket 名称为 serverless-cicd，存储地域为华南 1(深圳)，其他参数为默认值。**您可以选择不同的地域及 Bucket 名称，但需要对代码进行相应修改**

### 函数计算服务(FC)

前往[函数计算控制台](https://fc.console.aliyun.com/fc/overview/cn-shenzhen)开通函数计算服务，请注意，函数计算服务分服务地域进行管理，您可能需要切换地域才能查看相应的服务及函数。

### 日志服务(SLS)

前往[日志服务](https://sls.console.aliyun.com/lognext/profile)开通日志服务，并创建一个名为 serverless-cicd-log 的 Project，创建成功后会提示是否创建 logStore，我们选择确认。

![image-20210720135617456](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/008i3skNgy1gsndh8gt29j30ap0bwwev.jpg)

![image-20210720135627586](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/008i3skNgy1gsndhen30aj308d05dt8n.jpg)

logStore 我们填写名称，其他保持默认。

![image-20210720135804507](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/008i3skNgy1gsndj2z7npj30es0iyt9v.jpg)

创建成功后会提示是否立即接入数据，我们选择取消。

![image-20210720152752200](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/008i3skNgy1gsng4itwpij30aw04ut8n.jpg)

### Serverless-Devs 密钥配置

参考[配置阿里云密钥](https://github.com/devsapp/fc/blob/main/docs/Getting-started/Setting-up-credentials.md)及[S config](http://www.serverless-devs.com/docs/command#config指令)，将前文添加的子用户 AccessKey 配置到 S 中。

## Serverless-Devs 实践-基于 Node 的前端 CICD

### 初始化项目

执行`s init`来创建项目，我们选择*Alibaba Cloud Serverless ➡️ HTTP Function-Node.js 12 Example ➡️ 输入文件夹名称*。

### 修改 s.yaml

注意`双##`注释内容与项目生成配置文件的差异，主要有增加日志配置，修改超时时长以及修改 http 触发器合法请求方式：

```yaml:s.yaml
services:
  fc-deploy-test: #  服务名称
    component: devsapp/fc # 组件名称
    props: #  组件的属性值
      region: cn-shenzhen ## 此处可不修改
      service:
        name: fc-deploy-cicd
        description: 'demo for fc-node-cicd component'
        internetAccess: true
        ## 增加日志配置
        logConfig:
          enableRequestMetrics: true
          logstore: serverless-cicd-log
          project: serverless-cicd-log
      function:
        name: http-trigger-function
        description: this is a test
        runtime: nodejs12
        codeUri: ./
        handler: index.handler
        memorySize: 128
        timeout: 180 ## 增加时长，避免因为网络问题超时
      triggers:
        - name: httpTrigger
          type: http
          config:
            authType: anonymous
            methods:
              - GET
              - POST ## Github Webhook为POST方式
      customDomains:
        - domainName: auto
          protocol: HTTP
          routeConfigs:
            - path: /*
              methods:
                - GET
```

### 安装依赖

通过执行`yarn add ali-oss`或`npm install -s ali-oss `安装阿里云 OSS SDK

### 上传密钥及脚本

上传名「id_rsa」的私钥文件(绑定到 Github 的 SSH 密钥)及名为「my_ssh_executable.sh」的脚本文件到对象存储桶根目录下

```shell:my_ssh_executable.sh
#! /bin/sh
ID_RSA=/tmp/id_rsa
exec /usr/bin/ssh -o StrictHostKeyChecking=no -i $ID_RSA "$@"
```

![image-20210720170214542](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/008i3skNgy1gsniupvuk3j30xf05sdgd.jpg)

### 修改代码

```javascript:index.js
const getRawBody = require('raw-body')
const getFormBody = require('body/form')
const body = require('body')
const execSync = require('child_process').execSync
const oss = require('ali-oss')
const fs = require('fs')
const path = require('path')

exports.handler = async (req, resp, context) => {
  // 设置响应类型
  resp.setHeader('Content-type', 'application/json')

  const client = new oss({
    region: 'oss-cn-shenzhen', // 根据实际设置填写
    accessKeyId: '<Your accessKeyId>',
    accessKeySecret: '<Your accessKeySecret>',
    bucket: 'serverless-cicd',
  })

  async function get(filename, localpath, cmd) {
    try {
      let res = await client.get(filename, localpath)
      if (res.res.status == 200) execSync(`${cmd} ${localpath}`)
    } catch (e) {
      console.error(e)
    }
  }
  // 下载密钥及脚本
  get('id_rsa', '/tmp/id_rsa', 'chmod 0600')
  get('my_ssh_executable.sh', '/tmp/my_ssh_executable.sh', 'chmod +x')

  console.log('下载密钥和脚本完成')

  // 获取webhook提交的推送信息
  getRawBody(req, async function (err, body) {
    body = body.toString().replace('undefined', '",')
    body = JSON.parse(body)
    const ref = body.ref
    const ref_type = body.ref_type
    const repository_name = body.repository.name
    const clone_url = body.repository.clone_url

    if (ref_type != 'tag') {
      resp.send('No tag event')
      return 0
    }

    // 删除可能存在的代码，并重新克隆
    if (fs.existsSync(`/tmp/${repository_name}/`)) execSync(`rm -rf /tmp/${repository_name}`)
    gitclone = `GIT_SSH="/tmp/my_ssh_executable.sh" git clone -b ${ref} ${clone_url} /tmp/${repository_name}`
    try {
      execSync(gitclone)
      console.log('克隆完成')
    } catch (e) {
      resp.send('git clone fail')
    }

    // 执行自定义的打包脚本
    // execSync(`cd /tmp/${repository_name} && sh build.sh`)

    function getFilesList(dir) {
      let res = []
      let files = fs.readdirSync(dir)
      files.forEach((filename) => {
        if (filename[0] == '.') return
        let filepath = path.join(dir, filename)
        let info = fs.statSync(filepath)
        if (info.isFile()) res.push({ filename, filepath })
        else res = res.concat(getFilesList(filepath))
      })
      return res
    }

    // 获取文件列表
    const files = getFilesList(`/tmp/${repository_name}/`)
    // 遍历上传文件
    Promise.all(
      files.map((file) => {
        return new Promise(async (resolve) => {
          let res = await client.put(file.filepath.replace(`/tmp`, ``), file.filepath)
          resolve(`${file.filename} uploading: ${res.res.status == 200}`)
        })
      })
    ).then((r) => {
      console.log(r)
      resp.send(
        JSON.stringify({
          ref,
          ref_type,
          repository_name,
          clone_url,
        })
      )
    })
  })
}
```

### 部署

执行`s deploy`一键部署，通过控制台可以查看到部署结果

![image-20210720172223703](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/008i3skNgy1gsnjfonhokj30s00a10tr.jpg)

### 配置 GitHub

进入 GitHub 前端仓库 ➡️ Settings ➡️ Webhooks：

- payload：触发器路径，可复制命令行输出或到控制台查看
- Content type：application/json
- events：仅勾选 ☑️ Branch or tag creation

### 触发测试

```bash
cd frontend-project-dir
git tag v1.0 -m 'new version'
git push origin tag v1.0
```

### 输出

![image-20210720181402727](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/008i3skNgy1gsnkxfcz71j30n50ebabh.jpg)

![image-20210720181415414](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/008i3skNgy1gsnkxn8w92j30h606rdg2.jpg)

## 附录与参考

[本文代码](https://github.com/JasonLamv-t/serverless-devs-node-based-cicd)

[Function Compute 搭建前端 CICD 系统-最佳实践-阿里云 (aliyun.com)](https://bp.aliyun.com/detail/73?spm=a2c4g.11186623.2.8.2e8962b39fPYAm)

[前端项目示例](https://github.com/JasonLamv-t/serverless-cicd-example-vue)
