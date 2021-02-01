<template>
  <div class="setting">
    <a-row type="flex" align="middle" justify="space-between" class="toolbar">
      <a-col>
        <a-radio-group v-model="radio">
          <a-radio-button value="0">监测预警标准设置</a-radio-button>
          <a-radio-button value="1">监测周期设置</a-radio-button>
          <a-radio-button value="2">体检评估标准设置</a-radio-button>
        </a-radio-group>
      </a-col>
      <a-col>
        <a-button type="primary" v-if="radio==='1' && type !== null" @click="visible = true">运行模型</a-button>
      </a-col>
    </a-row>
    <a-row type="flex" align="top" class="multi-column-contour">
      <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" :xxl="4">
        <WarningTree :data="treeData" @select="onTreeSelect">
          <a-dropdown slot="select" :trigger="['click']">
            <div class="tree-select" type="link">国土空间规划监测预警指标体系
              <a-icon type="caret-down" />
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="0">国土空间规划监测预警指标体系</a-menu-item>
            </a-menu>
          </a-dropdown>
        </WarningTree>
      </a-col>
      <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" :xxl="20">
        <!-- <a-form-model layout="inline" :model="form" class="search-form">
            <a-row>
              <a-col :xs="24" :md="8" :lg="6" :xxl="4">
                <a-form-model-item>
                  <a-input placeholder="请输入指标名称" />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model> -->
        <div class="warning-table-wrap">
          <WarningTable v-show="radio === '0'" ref="WarningTable" :type="type" />
          <CycleSet v-show="radio === '1'" ref="CycleSet" :type="type" />
        </div>
      </a-col>
    </a-row>
    <RunModal :visible="visible" @cancel="visible = false" ok-text="运算" />
  </div>
</template>

<script>
import { getWarningTree } from '@/api/setting'
export default {
  components: {
    WarningTree: () => import('@/components/WarningTree'),
    WarningTable: () => import('./components/WarningTable'),
    CycleSet: () => import('./components/CycleSet'),
    RunModal: () => import('./components/RunModal'),

  },
  data () {
    return {
      treeData: [],
      type: null,
      visible: false,
      radio: '0'
    }
  },
  created () {
    getWarningTree().then(res => {
      this.treeData = res.data
    })
  },
  watch: {
    radio () {
      this.onLoadTable()
    }
  },
  methods: {
    // 获取表格数据
    getTableData () {
      this.tableLoading = true
    },
    onTreeSelect ({ dataRef }) {
      this.type = dataRef.type
      this.onLoadTable()
    },
    onLoadTable () {
      this.$nextTick(() => {
        if (this.radio === '0') this.$refs.WarningTable.onLoadData()
        if (this.radio === '1') this.$refs.CycleSet.onLoadData()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.setting {
  overflow: hidden;
  background: #f4f7f9;
  .multi-column-contour {
    background: #fff;
  }
  .toolbar {
    padding: 16px;
  }
  /deep/ .warning-tree-scroll {
    height: calc(100vh - 230px);
  }
  .warning-table-wrap {
    padding: 16px;
    overflow-y: auto;
    height: calc(100vh - 140px);
  }
}
.tree-select {
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 5px;
}
/* .search-form {
  padding: 12px 16px;
  /deep/ .ant-form-item {
    display: flex;
    align-items: center;
    .ant-form-item-label {
      width: auto;
      padding: 0;
      margin-right: 5px;
    }
    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
} */
</style>
