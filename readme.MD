1.**项目结构**

```
├── README.md                   // help
├── src                         // Ract Native
│   ├── commons                 //共享基础模块
│   ├── config                  // 主题和个性化配置
│   ├── img                     // 静态图片资源
│   ├── language                // 国际化
│   ├── routers                 // 路由部分
│   │    ├── index.js           // page模块聚合页
│   │    └── app.js             // 导航注册
│   ├──  scene                  // 闪屏页面
│   ├── store                   //store
│   ├── themes                  // 个性化主题配色
│   ├── utils                   // 工具库
│   ├── views                   // Ract Native 组件
│   ├── AppNavigationState.js   // Nvigation state 入口
│   ├── config.js               // 导航通用配置
│   └── root.js                 // Ract Native 入口页
│
├── ios                         // ios原生部分
├── index.js                    // 项目注册入口文件
├── android                     // android原生部分
├── node_modules                // 项目依赖包
├── __test__                    // 自动化测试
├── package.json                // 项目配置信息
├── pre-commit                  // 提交代码时按照.eslint的配置进行校验
├── .editorconfig               // 统一不同编辑器配置
├── .babelrc                    // 设置转码的规则,插件,文件地址映射
├── .eslintrc                   // 代码校验规则配置
└── yarn.lock                   // 依赖的版本信息管理
  ```


2. **项目启动**

   1. **启动**
          **命令行启动**
          第一步. yarn
          第二步  yarn stat
          第三步  react-native run-ios or run android start
          ** xcode **
          找到项目文件夹启动即可




3. **项目报错处理**
   1. #### vector字体包依赖出错
         rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json
   2. ### 缺少crypto报错
         ./node_modules/.bin/rn-nodeify --install --hack



4. **外部库**
    1. ### react-native-swiper  滑动
    2. ### react-native-device-info  轮播
    3. ### react-native-vector-icons/Ionicons Icon组件
    4. ### react-native-render-html html组件
    5. ### react-native-wkwebview-reborn webView 组件

