<template>
  <a-spin :spinning="spinning" v-if="data">
    <div class="chart-card">
      <div class="chart-card-title">{{data.title}}</div>
      <div v-padding="'16'">
        <template v-if="data.type === 1">
          <a-row type="flex" align="middle" justify="space-between">
            <countTo class="number" :startVal="0" :endVal="data.actual" :decimals="2" />
            <a-col>
              <WarningState type="linear" :text="true" :state="data.state" />
            </a-col>
          </a-row>
          <div class="mt5" v-color="'#C2C4D9'">{{data.label}}：{{data.target}}</div>
          <EChart autoresize ref="chart" :options="chartOpt" style="width: 100%; height: 180px" />
        </template>
        <template v-if="data.type === 0">
          <div v-padding="'24'">
            <a-row class="chart-card-item" v-for="(d, i) of data.list" :key="i" type="flex" justify="space-between">
              <a-col>{{d.title}}</a-col>
              <a-col>
                <WarningState type="linear" :text="true" :state="d.state" />
              </a-col>
            </a-row>
          </div>
        </template>
      </div>
    </div>
  </a-spin>
</template>

<script>
import echartConfig from '@/plugins/echarts/config'
import 'echarts/lib/chart/line';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/tooltip';
import { warningStateList } from '@/libs/common'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  components: {
    countTo: () => import('vue-count-to')
  },
  data () {
    return {
      spinning: false,
      chartOpt: {
        grid: {
          top: 40,
          left: 10,
          right: 10,
          bottom: 20,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [],
          axisTick: null,
          axisLine: {
            lineStyle: {
              color: '#373E74'
            }
          },
          axisLabel: {
            color: '#696E9B'
          },
        },
        yAxis: {
          type: "value",
          axisTick: null,
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#696E9B'
          },
          splitLine: {
            lineStyle: {
              color: '#373E74'
            }
          }
        },
        series: [
        ]
      }
    }
  },
  created () {
    this.setChart(this.data.chart)
  },
  methods: {
    setChart (data = []) {
      if (this.data.type === 0) return false
      this.spinning = true
      const { chartOpt } = this
      const state = warningStateList[this.data.state]
      let color = ''
      let startColor = ''
      let endColor = 'transparent'
      if (state === 'normal') {
        color = '#4EB6F8'
        startColor = 'rgba(42, 136, 240, 0.17)'
      }
      if (state === 'warning') {
        color = '#FFB53A'
        startColor = 'rgba(255, 181, 58, 0.17)'
      }
      if (state === 'sever-warning') {
        color = '#FA6E6B'
        startColor = 'rgba(250, 110, 107, 0.2)'
      }
      chartOpt.xAxis.data = data.map(item => item.name)
      chartOpt.series = [{
        type: 'line',
        data: data,
        itemStyle: {
          color
        },
        areaStyle: {
          ...echartConfig.gradient({
            x: 0,
            y: 0.5,
            x2: 0,
            y2: 1
          }, startColor, endColor)
        },
        markLine: {
          data: [{
            yAxis: this.data.actual
          }]
        }
      }]
      this.chartOpt = chartOpt
      this.spinning = false
      // this.$refs.chart.hideLoading()
    }
  },
}
</script>

<style lang="less" scoped>
.chart-card {
  height: 300px;
  margin-bottom: 16px;
  background: linear-gradient(180deg, #47508a 0%, #20254b 100%);
  border-radius: 4px;
  &-title {
    padding: 8px 16px;
    color: #fff;
    border-bottom: 1px solid #515995;
  }
  &-item {
    color: #fff;
    padding: 16px 8px;
    &:not(:last-child) {
      border-bottom: 1px solid #414774;
    }
  }
  .number {
    font-size: 24px;
    color: #fff;
  }
}
</style>
