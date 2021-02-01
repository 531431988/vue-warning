<template>
  <div>

    <a-table :dataSource="tableData" row-key="id" :pagination="false" :loading="tableLoading">
      <!-- 管控边界 -->
      <template v-if="type === 0">
        <a-table-column title="管控边界名称" data-index="name" />
      </template>
      <!-- 指标 -->
      <template v-if="type === 1">
        <a-table-column title="指标名称" data-index="name" />
      </template>
      <template v-if="tableData.length">
        <a-table-column title="监测周期" data-index="cycle" align="center" />
        <a-table-column title="上次更新时间" data-index="time" align="center" />
        <a-table-column title="更新状态" data-index="state" align="center">
          <template #default="text">
            <span :class="{'t-error': text === 0}">{{text ? '更新完成' : '更新失败'}}</span>
          </template>
        </a-table-column>
        <a-table-column title="操作" width="100" align="center">
          <template #default="text, params">
            <a-button type="primary" size="small" @click="onSet(params)">设置监测周期</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <SetCycleModal :visible="visible" :data="modalData" @cancel="visible = false" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: null
    }
  },
  components: {
    SetCycleModal: () => import('./SetCycleModal')
  },
  data () {
    return {
      tableLoading: false,
      tableData: [],
      visible: false,
      modalData: {}
    }
  },
  methods: {
    onLoadData () {
      this.tableLoading = true
      if (this.type === 0) {
        this.tableLoading = false
        this.tableData = [{
          id: 0,
          name: '生态保护红线',
          cycle: '每月的第19天24：00',
          time: '11:10:10',
          state: 1
        }, {
          id: 1,
          name: '永久基本农田',
          cycle: '每年的第9月的第19天24：00',
          time: '12:10:10',
          state: 0
        }]
      }
      if (this.type === 1) {
        this.tableLoading = false
        this.tableData = [{
          id: 0,
          name: '生态保护红线面积（平方公里）',
          cycle: '每月的第19天24：00',
          time: '13:10:10',
          state: 1
        }, {
          id: 1,
          name: '生态保护红线内城乡建设用地面积（平方公里）',
          cycle: '每年的第9月的第19天24：00',
          time: '14:10:10',
          state: 0
        }]
      }
    },
    onSet (params) {
      this.visible = true
      this.modalData = params
    }
  }
}
</script>

<style lang="less" scoped>
</style>
