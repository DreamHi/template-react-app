# template-react-app
基于React的单页面应用模版。此模版和[template-nodejs-app](https://github.com/DreamHi/template-nodejs-app)配对使用。

React + Ant Design + Less + Axios + React intl
## 环境要求

nodejs > 10

## 运行

```shell
npm install
npm run start 开发模式
npm run build 打包模式
```

## 导入手顺

1. 拷贝工程  
2. 安装nodejs > 10
3. 各种改名  
3.1 给项目起名  
3.2 修改package.json中和项目相关的属性  
3.3 修改README.md内容  
3.4 修改util/fetch.js中的token名（x-token-template）
    ```js
    function setHeaderToken() {
      const token = storage.getToken();
      return { "x-token-template": `${token}` };
    }
    ```
3.5 修改src/static/html/template.html中的title  
3.6 置换src/static/img/favicon.ico  
4.可以开发功能了！  
    ```shell
    npm install
    ```
    
4.1 开发模式  
```shell
// 配置环境变量
// 默认值： 'http://127.0.0.1:5000'

// .env.development
PORT=5000
REACT_APP_API_URL=xxxxx

npm run start
```
    
4.2 打包模式  
```shell
// 配置环境变量
// 默认值： 'http://127.0.0.1:3000'
npm run build
``` 

5.测试  

## 用户指南

- [目录结构](#目录结构)
- [视图框架]()
  - [React]()
- [路由框架]()
  - [React-Router-Dom]()
- [UI框架]()
  - [Ant Design]()
- [请求]()
  - [axios]()
- [国际化]()
- [测试]()
  - [组件测试]()
  - [UI测试]()
- [工具库]()
  - [lodash]()
  - [uuid]()
  - [moment]()  
- [工程化]()
  - [babel]()
     - [babel-core]()
     - [babel-loader]()
     - [babel-preset-env]()
     - [babel-preset-react]()
  - [Webpack]()
     - [entry]()
     - [output]()
     - [loaders]()
     - [plugin]()
- [代码规范]()
  - [eslint]()
  - [Prettier]()

## 目录结构

```shell
template-react-app/
├── CHANGELOG.md
├── LICENSE
├── README.md
├── config-overrides.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── app.jsx
    ├── index.js
    ├── locales
    │   ├── en.js
    │   ├── ja.js
    │   └── zh.js
    ├── modules
    │   └── system
    │       ├── components
    │       │   ├── CDefaultLayout.jsx
    │       │   └── CNav.jsx
    │       └── scenes
    │           ├── SHome.jsx
    │           ├── SInternalServerError.jsx
    │           ├── SLogin.jsx
    │           └── SNotFound.jsx
    ├── setupTests.js
    ├── static
    │   ├── css
    │   │   ├── index.less
    │   │   ├── layout.less
    │   │   ├── login.less
    │   │   └── resetant.less
    │   └── img
    │       └── favicon.ico
    └── utils
        ├── constants.js
        ├── fetch.js
        ├── helper.js
        └── storage.js

```

主要由三个文件夹构成

* public 上线用的文件夹。因为是spa应用，打包后的index.html, bundle.js...都保存在此处。
* src 源代码文件夹。所有的源代码，都放在此处。
  * modules 功能模块文件夹，以功能为单位保存。每个功能下又分为组件(components)和页面(scenes)。
  * static css, 字体, 图片等都保存在此处。
  * util 工具库，常量定义，ajax请求等都保存在此处。


