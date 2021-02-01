<template>
  <div class="map-tab-panel">
    <slot></slot>
    <a-card class="vui-flex-item" :bordered="false" :tab-list="tabs" :active-tab-key="view" @tabChange="onTabChange" :bodyStyle="{
      padding: '16px', overflow: 'hidden'}">
      <template v-if="show">
        <transition name="fadeRight" mode="out-in">
          <component :is="view" />
        </transition>
      </template>
      <a-icon class="up" @click="show = !show" slot="tabBarExtraContent" type="up"></a-icon>
    </a-card>
  </div>
</template>

<script>
export default {
  components: {
    WarningEvent: () => import('./WarningEvent'),
    Regional: () => import('./Regional'),
    Trend: () => import('./Trend'),
  },
  data () {
    return {
      tabs: [
        {
          key: 'WarningEvent',
          tab: '预警事件',
        }, {
          key: 'Regional',
          tab: '区域分布',
        }, {
          key: 'Trend',
          tab: '趋势分析',
        }
      ],
      show: true,
      view: 'WarningEvent'
    }
  },
  methods: {
    onTabChange (key) {
      this.view = key;
    },
  }
}
</script>

<style lang="less" scoped>
.map-tab-panel {
  position: absolute;
  display: flex;
  right: 10px;
  top: 10px;
  .ant-card {
    min-width: 400px;
  }
  /deep/ .ant-card-head {
    padding-right: 16px;
    .anticon {
      font-size: 12px;
      color: #666666;
    }
  }
  /deep/ .ant-tabs-tab {
    font-size: 14px;
    padding-left: 0;
    padding-right: 0;
  }
  .up {
    width: 18px;
    height: 18px;
    line-height: 18px;
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid #dddddd;
    display: inline-block;
  }
}
</style>
