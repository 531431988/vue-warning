<template>
  <AConfigProvider :locale="locale">
    <div id="app">
      <v-app>
        <router-view></router-view>
      </v-app>
    </div>
  </AConfigProvider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'App',
  data () {
    return {
      locale: zhCN,
    }
  },
  methods: {
  },

}
</script>

<style lang="less">
// 重写ocv大佬的nbb框架样式
#app {
  width: 100vw;
  height: 100%;
  .v-system-bar {
    &,
    .topmenu,
    .hmenu-menu-item {
      height: 60px !important;
      min-height: initial !important;
    }
    .topmenu {
      justify-content: flex-end;
    }
    .v-sheet--tile {
      background: url("./assets/head-bg.png") center 20% no-repeat #303666 !important;
    }
    .hmenu-menu-item,
    .el-submenu__title {
      padding: 0;
      margin-right: 8px;
    }
    .submenutitle {
      align-items: center;
      flex-direction: row !important;
      padding: 19px 16px;
      .icon {
        padding: 0;
        margin-right: 4px;
      }
      .menutext {
        padding: 0;
      }
    }
    .header-app {
      .headline {
        font-size: 20px !important;
      }
      .el-popover__reference {
        padding: 0 0 0 16px !important;
      }
      .v-avatar {
        background: transparent !important;
        min-width: 24px !important;
        width: 24px !important;
        height: 24px !important;
        margin-top: 4px;
        i {
          font-size: 18px !important;
          line-height: 1 !important;
          color: @primary-color;
        }
      }
    }
  }
}
</style>
