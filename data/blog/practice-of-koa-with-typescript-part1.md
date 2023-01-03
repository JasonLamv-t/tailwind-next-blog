---
title: Practice of Koa with Typescript - Part 1
date: '2022-12-23'
tags: ['koa', 'typescript', 'backend', 'nodejs', 'starter', 'eslint', 'mongodb']
draft: false
summary: 最近闲来无事，于是决定对 Koa 框架进行简单的熟悉，并了解和使用一些包。本文介绍了一个基于 TS 的 Koa 项目如何从0开始搭建。
images: []
layout: PostLayout
canonicalUrl:
---

本文是第一部分，主要是项目的起手搭建并逐步引入一些基础的功能。简单介绍一下我用到的工具，包和框架

- pnpm & koa & typescript & eslint
- dotenv & cross-env
- pino
- mongo & mongoose & mongo-express

## Steps

### §1-创建项目并初始化

1. 初始化项目：`pnpm init`

2. 为 koa 和 ts 安装依赖：`pnpm add -D koa ts-node ts-node-dev typescript @types/{koa,node}`

3. 生成 tsconfig：`node_modules/typescript/bin/tsc --init`

4. 修改 tsconfig.json，当然你可以根据你的实际需要进行修改，这里只是我的范例：

   ```json
   {
     "compilerOptions": {
       "target": "ESNext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
       "experimentalDecorators": true /* Enable experimental support for TC39 stage 2 draft decorators. */,
       "emitDecoratorMetadata": true /* Emit design-type metadata for decorated declarations in source files. */,
       "module": "CommonJS" /* Specify what module code is generated. */,
       "rootDir": "./src" /* Specify the root folder within your source files. */,
       "sourceMap": true /* Create source map files for emitted JavaScript files. */,
       "outDir": "./dist" /* Specify an output folder for all emitted files. */,
       "allowSyntheticDefaultImports": true /* Allow 'import x from y' when a module doesn't have a default export. */,
       "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
       "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,
       "strict": true /* Enable all strict type-checking options. */,
       "skipDefaultLibCheck": true /* Skip type checking .d.ts files that are included with TypeScript. */,
       "skipLibCheck": true /* Skip type checking all .d.ts files. */
     },
     "include": ["src"],
     "exclude": ["node_modules", "dist", "public"]
   }
   ```

5. 初始化 eslint：`npx eslint --init`，按提示进行操作，我的选择如下：

   ```bash
   ➜  koa-example npx eslint --init
   Need to install the following packages:
     eslint
   Ok to proceed? (y)
   You can also run this command directly using 'npm init @eslint/config'.
   Need to install the following packages:
     @eslint/create-config
   Ok to proceed? (y)
   ✔ How would you like to use ESLint? · style
   ✔ What type of modules does your project use? · esm
   ✔ Which framework does your project use? · none
   ✔ Does your project use TypeScript? · No / Yes
   ✔ Where does your code run? · node
   ✔ How would you like to define a style for your project? · guide
   ✔ Which style guide do you want to follow? · standard-with-typescript
   ✔ What format do you want your config file to be in? · YAML
   Checking peerDependencies of eslint-config-standard-with-typescript@latest
   Local ESLint installation not found.
   The config that you've selected requires the following dependencies:

   eslint-config-standard-with-typescript@latest @typescript-eslint/eslint-plugin@^5.0.0 eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 typescript@*
   ✔ Would you like to install them now? · No / Yes
   ✔ Which package manager do you want to use? · pnpm
   ```

6. 修改 eslint.yml ：

   ```yaml
   env:
     es2021: true
     node: true
   extends: standard-with-typescript
   overrides: []
   parserOptions:
     ecmaVersion: latest
     sourceType: module
   rules: { semi: always }
   ```

7. 初始化 git：`git init`

8. 生成 .gitignore ：`gi visualstudiocode,node,macos >> .gitignore`，这里我是使用了 oh-my-zsh 的 gitignore 插件，你也可以访问 [gitignore](https://www.toptal.com/developers/gitignore)，根据你的开发环境生成自己的 gitignore 内容

9. 创建 [/src/app.ts] 和 [/src/server.ts] 两个文件，文件内容如下：

   ```typescript
   // app.ts
   import Koa, { Context, DefaultContext, DefaultState } from 'Koa'

   const app: Koa<DefaultState, DefaultContext> = new Koa()

   app.use(async (ctx: Context) => {
     ctx.body = 'hello koa'
   })

   export default app
   ```

   ```typescript
   // server.ts
   import app from './app'

   const SERVER_PORT = 3000

   app.listen(SERVER_PORT, () => {
     console.info('Server listening on port: ' + SERVER_PORT)
   })
   ```

10. 修改 package.json：

    ```json
    // package.json
    ...
    "scripts": {
        "dev": "tsnd --respawn src/server.ts",
      },
    ...
    ```

11. 执行 `pnpm dev` 并在浏览器打开「http://localhost:3000」

    ```bash
    > koa-example@1.0.0 dev /Users/jasonlam/VscodeProjects/koa-example
    > tsnd --respawn src/server.ts

    [INFO] 00:40:41 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 4.9.4)
    Server listening on port: 3000
    ```

    ![image-20230103004202388](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/image-20230103004202388.png)

    这样，一个基于 typescript 的 koa 项目已经可以跑起来了。接下来的章节我们将会逐步引入其他包并在这个项目的基础上进行改造

### §2-环境变量与项目配置的管理

环境变量是项目的重要组成部分，我们通常通过环境变量文件或即时修改环境变量来对项目涉及的密钥或一些细节进行配置和修改，或者由此改变项目运行的一些细节。通常情况下，通过 .env 文件配置的环境变量一般不会添加到代码管理并进行云同步，这是出于为项目和云资产的安全而考虑，但是这对于刚接手项目的同学来说不太友好，因此我们通过 dotenv 来对环境变量进行解析，并统一在同一个文件中提供；而对于不同的开发平台，cross-env 可以很好的帮我们处理不同系统环境下环境变量的即时修改细节。

1. 创建 .env 文件：

   ```
   SERVER_PORT = 3001
   ```

2. 安装 cross-env 和 dotenv：`pnpm add -D cross-env dotenv`

3. 创建 /src/config/index.ts:

   ```typescript
   import dotenv from 'dotenv'
   dotenv.config() // 将.env中配置的环境变量读取到process.env中，https://github.com/motdotla/dotenv

   const config = {
     server: {
       port: process.env.SERVER_PORT || 3000,
     },
     debug: process.env.DEBUG === 'true',
   }

   export default config
   ```

4. 修改 /src/server.ts：

   ```typescript
   import app from './app'
   import config from './config'

   const SERVER_PORT = config.server.port

   app.listen(SERVER_PORT, () => {
     if (DEBUG) console.log('Debug mode!')
     console.info('Server listening on port: ' + SERVER_PORT)
   })
   ```

5. 修改 package.json：

   ```json
   ...
     "scripts": {
       "dev": "cross-env DEBUG=true tsnd --respawn src/server.ts"
     },
   ...
   ```

6. 执行 `pnpm dev`：

   ```bash
   > koa-example@1.0.0 dev /Users/jasonlam/VscodeProjects/koa-example
   > cross-env DEBUG=true tsnd --respawn src/server.ts

   [INFO] 17:51:57 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 4.9.4)
   Debug mode!
   Server listening on port: 3001
   ```

   可以看到，server 监听端口已经改为了 3001，并且也能正确读取命令中通过 cross-env 携带的环境变量

### §3-日志中间件-pino

1. 安装 pino 的 koa 中间件：`pnpm add -D koa-pino-logger @types/koa-pino-logger`

2. 修改 /src/app.ts：

   ```typescript
   import Koa, { Context, DefaultContext, DefaultState } from 'Koa'
   import pino from 'koa-pino-logger'
   import config from './config'

   const app: Koa<DefaultState, DefaultContext> = new Koa()
   const pinoInstance = pino()
   const { logger } = pinoInstance

   // Middlewares
   app.use(pinoInstance)

   app.use(async (ctx: Context) => {
     ctx.body = 'hello koa'
     if (config.debug) logger.info('request!')
   })

   export default app
   ```

3. 执行 `pnpm dev` 并在浏览器打开「http://localhost:3000」，你将会在控制台看到类似的日志输出：

   ```bash
   {"level":30,"time":1672742486885,"pid":22200,"hostname":"MacBook-Air.lan","msg":"request!"}
   {"level":30,"time":1672742486895,"pid":22200,"hostname":"MacBook-Air.lan","req":{"id":1,"method":"GET","url":"/","headers":{"host":"localhost:3000","upgrade-insecure-requests":"1","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15","accept-language":"zh-CN,zh-Hans;q=0.9","accept-encoding":"gzip, deflate","connection":"keep-alive"},"remoteAddress":"::ffff:127.0.0.1","remotePort":51329},"res":{"statusCode":200,"headers":{"content-type":"text/plain; charset=utf-8","content-length":"9"}},"responseTime":13,"msg":"request completed"}
   ```

### §4-MongoDB 及相关环境的搭建

Mongo-Express 是 MongoDB 的网页管理面板项目，可以和 MongoDB 一样在 Docker 中运行，可以帮助我们快速管理 MongoDB。至于 ORM/ODM，对于 Typescript，typeorm 是一个通用性更强的选择，不过我这里的选择还是老牌的 Mongoose。

1. MongoDB 及 mongo-express 的搭建。这里我使用的是一台云服务器，并通过 docker-compose 进行容器编排和运行：

```yaml
version: '3.1'

services:
  mongo:
    image: mongo
    restart: always
    ports:
      - 7017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: jasonlam
      MONGO_INITDB_ROOT_PASSWORD: jasonlam

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 7018:8081
    environment:
      ME_CONFIG_BASICAUTH_USERNAME: jasonlam
      ME_CONFIG_BASICAUTH_PASSWORD: jasonlam
      ME_CONFIG_MONGODB_ADMINUSERNAME: jasonlam
      ME_CONFIG_MONGODB_ADMINPASSWORD: jasonlam
      ME_CONFIG_MONGODB_URL: mongodb://jasonlam:jasonlam@mongo:27017/
```

这里注意端口映射以及云服务器对应端口的放通。将文件保存为 mongodb.yml 后，通过执行 `docker-compose -f mongodb.yml up -d` 启动容器。

2. 通过执行 `pnpm add -D mongoose` 安装 mongoose

3. 配置环境变量：

   1. 修改 .env 文件，添加以下变量：

      ```
      DB_HOST = your host domain or IP
      MONGO_PORT = 7017
      MONGO_USER = jasonlam
      MONGO_PASSWORD = jasonlam
      MONGO_DB_NAME = koa-practice
      ```

   2. 修改 /config/index.ts：

      ```typescript
      ...
      const { DB_HOST, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, MONGO_DB_NAME } =
        process.env;

      const config = {
        db: {
          mongo: {
            url: `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${DB_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`,
            options: { authSource: 'admin' }
          }
        },
      	...
      };
      ...
      ```

4. 修改 /src/app.ts：

   ```typescript
   ...
   import mongoose from 'mongoose';

   const app: Koa<DefaultState, DefaultContext> = new Koa();
   const pinoInstance = pino();
   const { logger } = pinoInstance;

   // Init MongoDB
   const { url: mongoURL, options: mongoOptions } = config.db.mongo;
   mongoose.connect(mongoURL, mongoOptions);

   const db = mongoose.connection;
   db.on('error', (err) => {
     logger.error(err);
   });
   db.once('connected', () => {
     logger.info('Mongo connected');
     app.emit('ready');
   });
   db.on('reconnected', () => {
     logger.info('Mongo re-connected');
   });
   db.on('disconnected', () => {
     logger.info('Mongo disconnected');
   });

   // Middlewares
   ...
   ```

5. 执行 `pnpm dev`，此时可以在控制台看到以下的日志输出则说明成功连接上数据库：

   ```bash
   {"level":30,"time":1672761305962,"pid":96214,"hostname":"MacBook-Air.lan","msg":"Mongo connected"}
   ```

### §5-路由的配置

1. 安装依赖：`pnpm add -D koa-router @types/koa-router koa-combine-routers`

2. 创建文件 /src/routes/index.ts，/src/routes/auth/index.ts：

   ```typescript
   // /src/routes/auth/index.ts
   import Router from 'koa-router'
   import { Context } from 'koa'

   const router = new Router({
     prefix: '/auth',
   })

   // test
   router.get('/', async (ctx: Context) => {
     ctx.body = 'Here is auth.'
   })

   export default router
   ```

   ```typescript
   // /src/routes/index.ts
   import combineRouters from 'koa-combine-routers'
   import authRouter from './auth'

   const router = combineRouters(authRouter)

   export default router
   ```

3. 修改 app.ts：

   ```typescript
   ...
   import router from './routes';
   ...
   // Middleware
   app.use(pinoInstance);
   app.use(router());
   ...
   ```

4. 执行 `pnpm dev` 并在浏览器打开「http://localhost:3000/auth」：

   ![image-20230104002748694](https://image-lake.oss-cn-hangzhou.aliyuncs.com/uPic/image-20230104002748694.png)

到这里，一个基于 Typescript 的 Koa 项目基础部分已经基本搭建完成了。接下来我将会介绍实现基于 JWT 实现基本的登陆注册和拦截。
