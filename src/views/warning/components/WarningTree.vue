<template>
  <div class="warning-tree">
    <div v-padding="'16'">
      <a-input-search v-model="searchValue" placeholder="请输入指标名称" @change="onChange" />
    </div>
    <div class="scroll">
      <a-tree :expanded-keys="expandedKeys" :auto-expand-parent="autoExpandParent" :tree-data="treeData" @expand="onExpand">
        <a-icon slot="switcherIcon" type="caret-down" />
        <template #title="{ title, type = null, state = '', project, scale, value, data = [], children }">
          <template v-if="children && children.length">
            <i class="icon-ic-wenjian"></i>
            <TreeNode :state="state" :title="title" :value="searchValue" :children="children" />
          </template>
          <template v-else>
            <a-popover placement="topLeft" trigger="click" v-if="state !== ''">
              <a-row type="flex" align="middle" justify="space-between" slot="title">
                <span class="mr20">{{ title }}</span>
                <WarningState :text="true" :state="state" />
              </a-row>
              <template slot="content">
                <!-- type: 0 管控边界  1 指标  -->
                <div v-if="type === 0">
                  <div><span class="t-grey">警情项目：</span><b>{{project}} 个</b></div>
                  <div><span class="t-grey">警情项目规模：</span><b>{{scale}} 公顷</b></div>
                </div>
                <div v-if="type === 1">
                  <div class="mb10">
                    <countTo class="vue-count-to" v-font="24" :startVal="0" :endVal="value" :decimals="2" />
                    <span class="t-grey">监测值</span>
                  </div>
                  <a-space direction="vertical" :size="5" style="width: 100%">
                    <div v-for="(v, i) of data" :key="`v-${i}`">
                      <span class="t-grey">{{v.label}}：</span>
                      <b>{{v.value}}</b>
                    </div>
                  </a-space>
                </div>
              </template>
              <a-tooltip placement="bottomLeft">
                <template slot="title">
                  {{ title }}
                </template>
                <TreeNode :state="state" :title="title" :value="searchValue" :children="children" />
              </a-tooltip>
            </a-popover>
            <template v-else>
              <a-tooltip placement="bottomLeft">
                <template slot="title">
                  {{ title }}
                </template>
                <TreeNode :state="state" :title="title" :value="searchValue" :children="children" />
              </a-tooltip>
            </template>
          </template>
        </template>
      </a-tree>
    </div>
  </div>
</template>
<script>
const TreeNode = {
  props: {
    state: String,
    title: String,
    value: String,
    children: Array
  },
  render () {
    const { state, title, value, } = this
    /* let stateClass = `${!(children && children.length) ? 'tree-node-title' : ''}`
    if (state === '临界预警') stateClass += ' state-text-warning'
    if (state === '重度预警') stateClass += ' state-text-sever-warning' */
    let color = ''
    if (state === '临界预警') color = 'color: #FFAA47'
    if (state === '重度预警') color = 'color: #FF5B5B'
    else color = 'color: rgba(0, 0, 0, 0.65)'
    return (
      <span>
        {title.indexOf(value) > -1 ? (
          <span>
            <span> {title.substr(0, title.indexOf(value))}</span>
            <span style="color: #f50">{value}</span>
            <span style={color}>{title.substr(title.indexOf(value) + value.length)}</span>
          </span>
        ) : (<span style={color} > {title} </span>)}
      </span >
    )
  }
}
import { getWarningTree } from '@/api/warning'
export default {
  name: 'WarningTree',
  components: {
    TreeNode,
    countTo: () => import('vue-count-to'),
  },
  data () {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      treeData: [],
      oldTree: []
    };
  },
  created () {
    getWarningTree().then(res => {
      this.treeData = this.generateData(res.data)
      this.getValKeyList(res.data)
    })
  },
  methods: {
    // 递归添加插槽
    generateData (data) {
      data.forEach(item => {
        item.scopedSlots = { title: 'title' }
        if (item.children && item.children.length) this.generateData(item.children)
      })
      return data
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange (e) {
      const value = e.target.value;
      const expandedKeys = this.oldTree
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return this.getParentKey(item.key, this.treeData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      });
    },
    // 获取节点中含有value的所有key集合
    getValKeyList (data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        const title = node.title;
        this.oldTree.push({ key, title });
        if (node.children) {
          this.getValKeyList(node.children);
        }
      }
    },
    // 该递归主要用于获取key的父亲节点的key值
    getParentKey (key, tree) {
      let parentKey;
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key;
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children);
          }
        }
      }
      return parentKey;
    }
  },
};
</script>

<style lang="less" scoped>
.warning-tree {
  .ant-input-search {
    /deep/ .ant-input {
      background: #f7f7f7;
    }
  }
  /deep/ .icon-ic-wenjian {
    color: #f7b500;
  }
  .scroll {
    padding: 0 16px;
    height: calc(100vh - 44px - 60px - 64px);
    overflow-y: auto;
    overflow-x: hidden;
  }
  /* /deep/ .ant-tree-child-tree {
    .ant-tree-node-content-wrapper {
      width: 90%;
    }

    .tree-node-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
  } */
}
</style>
