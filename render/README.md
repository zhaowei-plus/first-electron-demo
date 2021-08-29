# 项目模板

## 目录结构

```
.
├── build                            # webpack配置文件目录
│   ├── webpack.base.js              # webpack基础配置文件
│   ├── webpack.dev.js               # webpack开发环境配置文件
│   └── webpack.prod.js              # webpack生产环境配置文件
├── public                           # 项目入口
│    └── index.html                  # 入口文件
├── src                              # 项目源码
│   ├── api                          # http库配置目录
│   │  ├── index.js                  # http库初始化文件
│   │  ├── urlMap.js                 # http url地址映射
│   ├── assets                       # 静态资源文件
│   │  ├── images                    # 图片资源目录，文件比较多时分模块存放
│   │  ├── constant.js               # 全局常量
│   ├── components                   # 全局公用组件目录
│   │  ├── BreadCrumb                # 面包屑组件
│   │  ├── Layout                    # 页面布局组件
│   │  ├── Search                    # 搜索组件
│   ├── hooks                        # 公用hook目录
│   │  ├── useList                   # table列表搜索hook
│   │  ├── useVisible                # 条件显示 hook，通常和modal一起使用
│   ├── layout                       # 项目布局组件
│   ├── routes                       # 全局路由
│   ├── store                        # 全局状态目录
│   ├── utils                        # 工具类函数目录
│   ├── views                        # 页面目录 - 目录和路由一一对应
│   │  ├── database                  # 数据仓库模块
│   │  │  ├── data-sheet             # 数据仓库 - 数据表模块
├── babel.config.js
├── postcss.config.js
├── package.json
└── README.md
```

JS + Redux + Formily

## 运行和发布

```
npm run dev
npm run build
```

发布(测试/线上环境）需走 Jenkins，地址：http://10.0.10.207:8080/，发布流程请查看：

## 涉及技术栈

- [x] [React](https://reactjs.org/)
- [x] [React-router](https://reacttraining.com/react-router/)
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [antd](https://ant.design/index-cn)
- [x] [Webpack](https://webpack.github.io)
- [x] [Babel](https://babeljs.io/)
- [x] [Autoprefixer](https://github.com/postcss/autoprefixer)
- [x] [PostCSS](https://github.com/postcss/postcss)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [Formily](https://formilyjs.org/#/0yTeT0/8MsesjHa)
- [x] [ahook](https://github.com/akun/ahook)
- [x] [http](https://esc-ui.netlify.app/#/http)
- [ ] 还有哪些你认为有价值的优化点？随时联系@赵伟

## 参考文章

[使用Jest进行React单元测试](https://juejin.im/post/5b6c39bde51d45195c079d62)

[单元测试](https://www.yuque.com/ant-design/course/unittest)

