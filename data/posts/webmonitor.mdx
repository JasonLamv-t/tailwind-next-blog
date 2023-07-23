---
title: WebMonitor-NodeJS based CLI tool 命令行工具实战
date: '2021-06-16'
tags: ['NodeJS', 'commander', 'inquirer', 'chalk']
draft: false
summary: 第一次开发基于NodeJS的命令行工具
images: []
layout: PostLayout
canonicalUrl: ''
---

开始之前，先放上
源码与使用说明：[JasonLamv-t/WebMonitor](https://github.com/JasonLamv-t/WebMonitor)

参考文档：
基础框架：[commander.js 中文文档](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)
交互式命令行工具：[inquirer](https://www.npmjs.com/package/inquirer)
控制台输出样式：[chalk](https://www.npmjs.com/package/chalk)
node Jquery 实现：[cheerio 中文文档](https://github.com/cheeriojs/cheerio/wiki/Chinese-README)

## 功能设计

- 本地运行
- ~~远程运行~~
- ~~每日自动运行~~
- ~~任务管理~~
- 微信推送消息
- ~~邮件提醒~~
- ~~短信提醒~~

## 开发

### 项目的初始化与目录结构

项目使用了 yarn 作为包和依赖管理器，当然，你可以根据喜好执行`yarn init`或`npm init`来初始化项目
以下是本项目的结构，你自己的项目当然可以不同，有条理即可:

```
WebMonitor
├── README.md
├── bin
│   ├── app.js        // 程序入口文件
│   ├── config.js     // 配置命令子文件
│   └── run.js        // 运行命令子文件
├── package.json
├── plugins
│   ├── notify.js     // 通知处理器
│   ├── theme.js      // 主题设置
│   └── validator.js  // 数据验证器和处理器
├── test.html
├── yarn.lock
└── node_modules
```

### 安装项目所需依赖

执行`yarn add commander inquirer chalk cheerio axios`，当然`npm`也行

### 程序入口

#### 定义程序的根命令和入口

创建一个 app.js 文件或者 index.js 文件，在根目录或其他定义的目录均可，以下示例均以本项目为参考：[/bin/app.js](https://github.com/JasonLamv-t/WebMonitor/blob/main/bin/app.js)

```javascript
#! /usr/bin/env node
// 指定脚本解析执行器，所有命令脚本文件都是必须的

const { Command } = require('commander');
const program = new Command();

program
  .version('1.1.0')
  .command('run', 'run a monitor process immediately', {
    executableFile: 'run',
  })
  .alias('r')
  .command('config', 'config', { executableFile: 'config' })
  .alias('c');
// .command('子命令', '命令描述', { executableFile: '子命令文件路径' }).alias('命令别称')

program.parse(process.argv); // 无论子命令还是根命令都需要执行program.parse方法，参数详见commander文档
```

```
$ node bin/app.js -V
1.1.0
```

#### 连接到本地依赖

package.json 中添加以下项

```json
...
"bin": {
    "webmonitor": "./bin/app.js",
    "wmcli": "./bin/app.js"
  },
...
```

执行`yarn link`

```
$ yarn link
yarn link v1.22.10
success Registered "webmonitor-cli".
info You can now run `yarn link "webmonitor-cli"` in the projects where you want to use this package and it will be used instead.
✨  Done in 0.05s.
$ webmonitor -V
1.1.0
$ wmcli --version
1.1.0
```

到这一步，就完成了一个根命令的入口定义并能在命令行中调用，这将方便我们后面的调试

### 特定输出主题定义

创建一个主题文件/plugins/theme.js，用于定义一些特定输出的主题，你可以根据自己喜好修改

```javascript
const chalk = require('chalk');
const error = chalk.bgRedBright.white;
const warning = chalk.keyword('orange');
const info = chalk.yellowBright;

console.log(error('error test'));
console.log(warning('warning test'));
console.log(info('info test'));

module.exports = {
  error,
  warning,
  info,
};
```

### 子命令

#### config 命令

[/bin/config.js](https://github.com/JasonLamv-t/WebMonitor/blob/main/bin/config.js)

```javascript
#! /usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const os = require('os');
const { Command } = require('commander');
const program = new Command(); // 同样适用new Command对象创建子命令实例
const { error, warning, info } = require('../plugins/theme');

program;
// .option('-p --path <absolue path>', 'config file path')

program.parse(process.argv); // 无论子命令还是根命令都需要执行program.parse方法，参数详见commander文档
const options = program.opts(); // 通过执行program.opts方法获取全部参数对象

// 定义提示列表，对应对象属性详见inquirer文档
const promptList = [
  {
    type: 'input', // 输入类型
    message: '请输入Server酱的SCKEY:', // 提示消息
    name: 'server_sckey', // 变量亩
  },
];

// 执行inquirer.prompt方法显示提示
// 需要注意的是，一旦执行此方法会按顺序显示传入列表的所有提示并获取输入
// 显然，这是一个异步操作，复杂的表单需要多次按照表单逻辑调用inquirer.prompt方法来实现
inquirer.prompt(promptList).then((answers) => {
  const configDirPath = os.homedir() + '/.webmonitor/'; // 获取用户目录绝对路径拼接配置文件夹路径
  let config = {};
  // 判断配置文件路径是否存在，不存在则创建路径
  if (fs.existsSync(configDirPath + 'config.json')) {
    const rawdata = fs.readFileSync(configDirPath + 'config.json');
    config = JSON.parse(rawdata);
  } else if (!fs.existsSync(configDirPath)) fs.mkdirSync(configDirPath);

  config.server_sckey = answers.server_sckey; // 读入输入

  // 保存到配置文件
  fs.writeFileSync(configDirPath + 'config.json', JSON.stringify(config), {
    flag: 'w+',
  });
  console.log(info(`Config file save as ${configDirPath}config.json`));
});
```

#### run 命令参数定义

[/bin/run.js](https://github.com/JasonLamv-t/WebMonitor/blob/main/bin/run.js)

```javascript
program
  .usage('-u <target url> [options]') // 输出：命令 + usage内容
  .requiredOption('-u --url <url>', 'monitoring target', validator.isUrl)
  // 必须参数，第三个参数为验证和处理函数，返回验证处理后的值，详见参数处理
  .option('-l, --log', 'log mode', false)
  // 此处第三个参数为默认值，无输入变量，即第一个参数无 <any> 的，检测到该参数则对应值为true，否则为undefined，所以设置了默认值为false
  .option(
    '-i, --interval <delay>',
    'the interval between initiating a web request in seconds',
    validator.isInt,
    60
  )
  // 此处第三个参数为验证函数，第四个参数为默认值
  .option('-D, --debug', 'debug mode', false)
  .option(
    '-d, --daemon',
    'monitor whether to continue after the change of the web page is detected',
    false
  )
  .addOption(
    new Option('-M, --mode <operation mode>', 'currently local only')
      .choices(['local'])
      .default('local')
  )
  // 自定义参数，使用new Option方法创建，choices要求输入值在枚举范围内，default设置默认值，其他方法commander.js文档并无说明，但是可以通过查看Option方法定义代码找到对应接口
  .addOption(
    new Option('-m, --method <request method>', 'current get only')
      .choices(['get'])
      .default('get')
  )
  .option('-r, --retry <retry time>', 'retry times limit', validator.isInt, 5)
  .option('-w, --wechat', 'enable Wechat push notification');

program.parse(process.argv);

const options = program.opts(); // 解析获取参数对象
if (options.debug) console.log('options: ', options); // 如果是调试模式则打印全部参数
```

#### 实现逻辑

获取网页内容，并进行比较
由于网页源码可能发生动态改变，因此我们使用 cheerio 对网页内容进行解析，获取网页的显示进行比较，同时方便后续对自定义监测内容的升级。

#### 获取网页内容

[/bin/run.js](https://github.com/JasonLamv-t/WebMonitor/blob/main/bin/run.js)

```javascript
const getRes = async () => {
  return new Promise((resolve, reject) => {
    axios[options.method](options.url)
      .then((r) => {
        const $ = cheerio.load(r.data);
        if (options.debug) console.log($.text());
        resolve($.text());
      })
      .catch((e) => {
        if (e.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(
            error('Error! Request error. StatusCode:', e.response.status)
          );
          if (options.debug || options.log) {
            console.log('Response Data:', e.response.data);
            console.log('Response Header:', e.response.headers);
          }
        } else if (e.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(
            error('The request was made but no response was received')
          );
          if (options.debug || options.log) console.log('Request:', e.request);
          else console.log(warning("add '-l' flag for more info"));
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', e.message);
        }
        if (options.debug) console.log(e.config);
        reject(e);
      });
  });
};
```

#### 主函数

```javascript
const main = async () => {
  // 如果配置了微信推送，读取配置并构建通知方法
  if (options.wechat) options.wechat = await notify.wechat();
  if (!options.wechat) return -1; // 检查是否构建通知方法成功

  let requestCount = 0,
    retryCount = 0;
  let origin = await getRes() // 获取初始页面
    .then((r) => {
      return r;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });

  console.log(origin);

  if (!origin)
    return {
      code: -1,
      message: 'Failed to request a web page for the first time.',
    };
  console.log('The request for the web page is successful. Start monitoring.');

  // 构建定时循环
  let pro = setInterval(async () => {
    // 获取新的页面内容
    let newWeb = await getRes()
      .then((r) => {
        requestCount++;
        retryCount = 0;
        return r;
      })
      .catch((e) => {
        retryCount++;
        return false;
      });

    // The web page has not changed and is in log mode
    if (newWeb && newWeb == origin && options.log)
      console.log(
        `Request ${requestCount} times. The web page remains unchanged.`
      );
    else if (newWeb && newWeb != origin) {
      console.log(info('The web page has changed!'));
      if (options.wechat) options.wechat(); // 调用微信通知
      if (!options.daemon) {
        // 非守护模式则退出
        console.log('process exit');
        clearInterval(pro);
      } else origin = newWeb;
    } else if (!newWeb && retryCount <= options.retry)
      console.log(warning(`Request fail, retry for ${retryCount} times`));
    else if (!newWeb && retryCount > options.retry) {
      console.log(
        error('The number of retries exceeds the limit! Process exit.')
      );
      clearInterval(pro);
    }
  }, 1000 * options.interval);
};

main();
```

### 其他

#### 微信通知

[/plugins/notify.js](https://github.com/JasonLamv-t/WebMonitor/blob/main/plugins/notify.js)

```javascript
const wechat = async () => {
  const configDirPath = os.homedir() + '/.webmonitor/';
  let config = {};
  if (fs.existsSync(configDirPath + 'config.json')) {
    const rawdata = fs.readFileSync(configDirPath + 'config.json');
    config = JSON.parse(rawdata);
  }

  if (!config.server_sckey) {
    console.log(error('Error: server酱 SCKEY no configured.'));
    console.log(info("please run 'wmcli config' to config SCKEY"));
    console.log('process exit.');
    return false;
  }

  const promptList = [
    {
      type: 'input',
      message: '请输入通知消息标题:',
      name: 'title',
    },
    {
      type: 'input',
      message: '请输入通知消息内容:',
      name: 'content',
    },
  ];

  return await inquirer.prompt(promptList).then((answers) => {
    return function () {
      axios.get(`https://sc.ftqq.com/${config.server_sckey}.send`, {
        params: {
          text: answers.title,
          desp: answers.content,
        },
      });
    };
  });
};
```

#### 参数处理验证器

[/plugins/validator.js](https://github.com/JasonLamv-t/WebMonitor/blob/main/plugins/validator.js)

```javascript
const { InvalidOptionArgumentError } = require('commander'); // commander自带的异常

function isUrl(url) {
  const r = new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'g'
  );
  if (!r.test(url))
    throw new InvalidOptionArgumentError('Not a legitimate URL.'); // 抛出异常
  return url;
}

function isInt(value, dummyPrevious) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) throw new InvalidOptionArgumentError('Not a number.');
  return parsedValue;
}
```

## 发布

1. 到[npm 官网](https://www.npmjs.com/)注册一个账户
2. 执行`npm login`并输入注册信息进行登陆
3. 修改`package.json`或重新执行`yarn init`或者`npm init`补全信息
4. 执行`npm publish`
