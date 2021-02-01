<template>
  <a-table :dataSource="tableData" row-key="id" :pagination="false" :loading="tableLoading">
    <a-table-column title="序号">
      <template #default="text, params, index">{{index+1}}</template>
    </a-table-column>
    <a-table-column title="名称" data-index="name" />
    <a-table-column title="压占面积(公顷)" data-index="area" align="center" />
    <a-table-column title="操作" align="center">
      <template #default="text, params">
        <a-button type="link" @click="onClick(params)">定位</a-button>
      </template>
    </a-table-column>
  </a-table>
</template>

<script>
export default {
  inject: ['getContext'],
  data () {
    return {
      tableLoading: false,
      tableData: [{
        id: 1,
        name: '张三农民建房',
        center: [112.33283928694895, 31.899865785796983],
        area: 100
      }, {
        id: 2,
        name: '王王农民建房',
        center: [111.85356072249583, 31.946557680328233],
        area: 100
      }]
    }
  },
  computed: {
    olMap () {
      return this.getContext()
    }
  },
  methods: {
    onClick ({ center }) {
      this.olMap.getView().animate({
        center
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
