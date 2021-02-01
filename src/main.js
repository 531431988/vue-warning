// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 受某大佬的OCV“框架”，宇宙无敌NBB的COPY大杂烩“框架”启发，直接全量引入antd（在其他4个UI面前只是冰山一脚），后来的人可以改成按需引用！
import Animated from '@/components/Animated';
import BackTop from '@/components/BackTop';
import Empty from '@/components/Empty';
import VueTitle from '@/components/VueTitle';
import WarningState from '@/components/WarningState';
import {
  VueAxios
} from '@/libs/request';
import theme from '@/plugins/echarts/theme.json';
import router from '@/router';
import Antd from 'ant-design-vue';
import Vue from 'vue';
import EChart from 'vue-echarts';
import App from './App';
import config from './config';
import ocv from './index';
import './less/WMlib.less';
import store from './store';
Vue.component(Animated.name, Animated)
Vue.component(WarningState.name, WarningState)
Vue.component(Empty.name, Empty)
Vue.component(BackTop.name, BackTop)
Vue.component(VueTitle.name, VueTitle)
Vue.component('EChart', EChart)
EChart.registerTheme('theme', theme)

Vue.use(Antd);
Vue.use(VueAxios);
// 配置首页
// ocv.opts.RouterConfig.opt.routes.unshift({path: '/', redirect: '/demo'})
// 取消认证不拦截
// ocv.opts.RouterConfig.authRequired = false;
// 设置离线认证
// 离线认证离线权限
console.log(config)
ocv.opts.setDevUserAndFuncs({
  user: config.userinfo,
  funcs: config.funcs
})
// 在线用户离线权限
//ocv.opts.setDevUserAndFuncs({funcs: config.funcs})

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  ...ocv.opts,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
window.vue = vue;