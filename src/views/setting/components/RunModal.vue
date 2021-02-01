<template>
  <a-modal v-bind="$attrs" title="模型运算" v-on="$listeners" :maskClosable="false">
    <a-select defaultValue="0" v-width="'100%'">
      <a-select-option key="" value="0">国土空间规划监测预警指标体系</a-select-option>
      <a-select-option key="" value="1">国土空间规划监测预警指标体系</a-select-option>
    </a-select>
    <WarningTree class="modal-warning-tree" :data="treeData" @select="onTreeSelect">
    </WarningTree>
  </a-modal>
</template>

<script>

import { getWarningTree } from '@/api/setting'
export default {
  components: {
    WarningTree: () => import('@/components/WarningTree'),
  },
  data () {
    return {
      treeData: []
    }
  },
  watch: {
    '$attrs.visible' () {
      getWarningTree().then(res => {
        this.treeData = res.data
      })
    }
  },
  methods: {
    onTreeSelect ({ dataRef }) {
    },
  }
}
</script>

<style lang="less">
.modal-warning-tree {
  margin-top: 10px;
  border: 1px solid #dedede;
  .warning-tree-scroll {
    height: 300px;
  }
}
</style>
