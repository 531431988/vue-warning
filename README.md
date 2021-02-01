# 国土空间规划监测评估预警系统

被强烈要求基于某总监的“OCV 框架”开发，记录一下第一次使用 openlayers，因为 OCV 就是宇宙全家桶，所以很多需要优化的地方我也没有做处理，其他也没必要做按需或各种优化了
用户名密码： admin 888888

### 使用说明

:point_right: 安装：npm i 或 cnpm i 或 yarn add

:point_right: 运行：npm start 或 yarn start

:point_right: 测试环境打包：npm run build --test 或 yarn build:test

:point_right: 正式环境打包：npm run build 或 yarn build

### 文件结构

```shell
├── public     打包所需静态资源
└── src
  ├── api        axios请求
  ├── assets     项目静态资源
  ├── components 全局组件
  ├── directive  自定义指令
  ├── less       全局less预编译类库
  ├── plugins    插件
  ├── store      状态管理（vuex）
  ├── views      页面文件
```
