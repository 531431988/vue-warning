<template>
  <a-table :dataSource="tableData" row-key="id" :pagination="false" :loading="tableLoading">
    <!-- 管控边界 -->
    <template v-if="type === 0">
      <a-table-column title="管控边界名称" data-index="name" />
      <a-table-column title="正常（绿色）" data-index="normal" align="center">
        <template #default="text">
          <a-select :value="text" v-width="'100%'">
            <a-select-option value="0">不突破边界</a-select-option>
            <a-select-option value="1">不违法侵占</a-select-option>
          </a-select>
        </template>
      </a-table-column>
      <a-table-column title="预警（红色）" data-index="warning" align="center">
        <template #default="text">
          <a-select :value="text" v-width="'100%'">
            <a-select-option value="0">突破边界</a-select-option>
            <a-select-option value="1">违法侵占</a-select-option>
          </a-select>
        </template>
      </a-table-column>
      <a-table-column title="警情类型" data-index="warningType" />
    </template>
    <!-- 指标 -->
    <template v-if="type === 1">
      <a-table-column title="指标名称" data-index="name" />
      <a-table-column title="指标类型" data-index="normType" align="center" />
      <a-table-column title="较目标值" data-index="targetVal" align="center">
        <template #default="text, {targetOptions}">
          <a-select :value="text" v-width="'100%'">
            <a-select-option :value="item.value" v-for="item in targetOptions" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </template>
      </a-table-column>
      <a-table-column title="正常（绿色）" data-index="normal" align="center">
        <template #default="text">
          较目标
          <a-input-number :value="text" :min="0" :max="999" v-width="'60'" /> % 及以上
        </template>
      </a-table-column>
      <a-table-column title="临界预警（黄色）" data-index="minWarning" align="center">
        <template #default="text, {minWarning, maxWarning}">
          较目标
          <a-input-number :value="minWarning" :min="0" :max="999" v-width="'60'" /> %（含）
          <a-input-number :value="maxWarning" :min="0" :max="999" v-width="'60'" /> %
        </template>
      </a-table-column>
      <a-table-column title="重度预警（红色）" data-index="severWarning" align="center">
        <template #default="text">
          较目标
          <a-input-number :value="text" :min="0" :max="999" v-width="'60'" /> % 以下
        </template>
      </a-table-column>
      <a-table-column title="警情类型" data-index="warningType" align="center" />
    </template>
    <a-table-column v-if="tableData.length" title="操作" width="100" align="center">
      <template #default="text">
        <a-button type="primary" size="small">保存</a-button>
      </template>
    </a-table-column>
  </a-table>
</template>

<script>
import { getWarningBoundaryTable, getWarningNormTable } from '@/api/setting'
export default {
  props: {
    type: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      tableLoading: false,
      tableData: []
    }
  },
  methods: {
    onLoadData () {
      this.tableLoading = true
      if (this.type === 0) {
        getWarningBoundaryTable().then(res => {
          const { code, data, msg } = res
          if (code === 200) {
            this.tableData = []
            this.tableData = data
            this.tableLoading = false
          } else {
            this.$message.error(msg)
          }
        })
      }
      if (this.type === 1) {
        getWarningNormTable().then(res => {
          const { code, data, msg } = res
          if (code === 200) {
            this.tableData = []
            this.tableData = data
            this.tableLoading = false
          } else {
            this.$message.error(msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
