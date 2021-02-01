<template>
  <div class="main home">
    <a-row :gutter="16">
      <a-col :md="8" :xl="6" :xxl="4" v-for="(item,index) in minData" :key="index">
        <Animated :delay="`${index / 10}s`" name="fadeInUp">
          <MinCard :data="item" :state="index" />
        </Animated>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :md="24" :xl="18" :xxl="12">
        <div style="height: 616px; margin-bottom: 16px">
          <Map />
        </div>
      </a-col>
      <a-col v-for="(item, index) in checkedList" :key="index" :md="6" :xxl="4">
        <Animated name="fadeInDown">
          <ChartCard :data="item" />
        </Animated>
      </a-col>
    </a-row>
    <a-button class="setting" @click="visible = true">
      <a-icon type="setting" />
    </a-button>
    <a-drawer title="图表配置" :visible="visible" width="30%" @close="visible = false">
      <a-checkbox-group :value="checked">
        <div v-for="(d, i) of options" :key="i">
          <a-checkbox :checked="d.checked" :value="d.value" @change="onChange">{{d.title}}</a-checkbox>
        </div>
      </a-checkbox-group>
      <div :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          textAlign: 'center',
          zIndex: 1,
          background: '#fff'
        }">
        <a-space>
          <a-button @click="visible = false">取消</a-button>
          <a-button type="primary" @click="onSave">保存</a-button>
        </a-space>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { getWarningOverviewCharts } from '@/api/home'
export default {
  components: {
    MinCard: () => import('./components/MinCard'),
    Map: () => import('./components/Map'),
    ChartCard: () => import('./components/ChartCard')
  },
  data () {
    return {
      minData: [{
        id: 0,
        title: '监测指标个数',
        total: 47
      }, {
        id: 1,
        title: '正常状态（个）',
        total: 47,
        yesterday: 2
      }, {
        id: 2,
        title: '临界预警（个）',
        total: 47,
        yesterday: -1
      }, {
        id: 3,
        title: '重度预警（个）',
        total: 47,
        yesterday: -2
      }, {
        id: 4,
        title: '管控边界预警（个）',
        total: 47,
        yesterday: -3
      }, {
        id: 5,
        title: '约束性指标预警（个）',
        total: 47,
        yesterday: 1
      }],
      visible: false,
      checkedList: [],
      checked: [],
      options: []
    };
  },
  created () {
    getWarningOverviewCharts().then(res => {
      const { code, data, msg } = res
      if (code === 200) {
        this.options = data
        this.checkedList = data.filter(item => item.checked)
        this.checked = this.checkedList.map(item => item.value)
      } else {
        this.$message.error(msg)
      }
    })
  },
  methods: {
    onChange ({ target: { checked, value } }) {
      const max = 12
      let index = 0
      if (this.checked.length >= max && checked) {
        this.$message.info(`最多${max}个`)
        index = this.options.findIndex(item => item.value === value)
        this.options[index].checked = false
      } else {
        this.options.forEach(item => {
          if (item.value === value) item.checked = checked
        })
      }
      this.checked = this.options.filter(item => item.checked).map(item => item.value)
    },
    onSave () {
      this.checkedList = []
      this.visible = false
      this.$nextTick(() => {
        this.checkedList = this.options.filter(item => item.checked)
      })
    }
  },
  mounted () {
  },
}
</script>

<style lang="less" scoped>
.home {
  background: linear-gradient(180deg, #384069 0%, #202242 100%);
  &::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("../../assets/home-bg.png") center bottom no-repeat;
    pointer-events: none;
    opacity: 0.2;
  }
  .setting {
    position: fixed;
    right: 0;
    top: 50%;
  }
  .ant-checkbox-group-item {
    display: block;
  }
}
</style>
