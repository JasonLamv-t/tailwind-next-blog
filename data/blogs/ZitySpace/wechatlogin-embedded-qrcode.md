---
title: 微信扫码登陆-提取二维码
date: '2021-10-02'
tags: ['frontend', 'Wechat']
draft: false
summary: 本文是提出了一种微信扫码登陆时避免打开新窗口，并获取二维码的实现方案
images: []
layout: PostLayout
canonicalUrl:
---

## 写在前面

本文不是一篇保姆级教程，如果你对微信登陆的调用流程还不熟悉甚至没有在 Postman 等测试环境下跑通过，请先阅读 [微信官方文档](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html) 。

## 整体思路

1. 原有登陆逻辑：根据微信官方文档，用户点击「微信登陆」后，在 Web 端打开: [微信登陆示例](https://passport.yhd.com/wechat/login.do)，可以看到，最终是携带参数重定向到微信提供的网址上，用户使用微信扫码确认后，即可拉起重定向到指定页面。
2. 在原有登陆逻辑中，我们需要使用原窗口或者新开一个窗口来打开微信指定的调用地址，如果对于整体美观有要求的话，这样的方案显然是不能令人满意的。因此我们的目的是：将二维码从微信页面中提取出来，同时保持其扫码后自动跳转的能力。
3. 提取二维码：提取二维码并不是一件难事，我们可以直接请求微信提供的页面并直接通过正则等方式直接将图片地址从页面数据中截取出来。然而只有二维码并不能完成整个流程，还需要借助页面中的 js 等资源，因此需要保持微信页面在浏览器中正常运行。
4. 提供微信 JS 资源运行环境：起初的想法是提取微信页面中的资源，但是无法正常运行。最终的解决方案是在 iframe 中加载微信页面并将 iframe 隐藏，以获得与微信认证服务器通信确认的能力。

![流程图](https://tva1.sinaimg.cn/large/e6c9d24egy1h0vxj2glqvj20rm0peq4r.jpg)

## Update

微信官方已经提供了内嵌二维码的功能，思路大概一致，进行了封装，详情请参考 [开放平台文档](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html) 。
