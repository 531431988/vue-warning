import Vue from 'vue';
import Vuex from 'vuex';
import ocv from '../index';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 某大佬的OCV“框架”，宇宙无敌NBB的COPY大杂烩“框架”
    // 解构原框架中的 vuex modules，虽然不知道有什么用，其他的按正常操作
    ...ocv.opts.StoreConfig.opt.modules,
  },
  state: {
    wkt: ''
  },
  mutations: {
    SET_WKT(state, wkt) {
      state.wkt = wkt
    }
  },
  actions: {

  },
  getters: {}
})