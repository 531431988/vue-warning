<template>
  <div>
    <div class="tr">
      <a-radio-group size="small" v-model="type">
        <a-radio-button value="table">
          <i class="icon-ic-biaodan"></i>
        </a-radio-button>
        <a-radio-button value="chart">
          <i class="icon-ic-zhuzhuangtu"></i>
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="t-grey" v-font="'12'">单位：平方公里</div>
    <a-table :dataSource="tableData" row-key="id" :pagination="false" :loading="tableLoading" v-if="type === 'table'">
      <a-table-column title="序号">
        <template #default="text, params, index">{{index+1}}</template>
      </a-table-column>
      <a-table-column title="监测时点" data-index="region" />
      <a-table-column-group align="center">
        <span slot="title">生态保护红线面积</span>
        <a-table-column title="监测值" data-index="actual" align="center">
        </a-table-column>
      </a-table-column-group>
    </a-table>
    <EChart v-show="type === 'chart'" autoresize ref="chart" :options="chartOpt" style="width: 100%;" />
  </div>
</template>

<script>
import echartConfig from '@/plugins/echarts/config'
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markLine'
import { getWarningTrend } from '@/api/warning'
export default {
  data () {
    return {
      type: 'table',
      tableLoading: false,
      tableData: [],
      chartOpt: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['监测值'],
          bottom: 'bottom',
          icon: 'path://M1024 127.937531v767.625183c0 70.665495-57.272035 127.937531-127.937531 127.93753h-767.625183c-70.665495 0-127.937531-57.272035-127.93753-127.93753v-767.625183c0-70.665495 57.272035-127.937531 127.93753-127.937531h767.625183c70.665495 0 127.937531 57.272035 127.937531 127.937531z',
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: 'rgba(0, 0, 0, 0.45)'
          }
        },
        grid: {
          top: '5%',
          left: '3%',
          right: '4%',
          bottom: 30,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['2018', '2019', '2020', '2035'],
          axisTick: null,
          axisLine: {
            lineStyle: {
              color: '#F0F0F0'
            }
          },
          axisLabel: {
            color: '#999999'
          },
        },
        yAxis: {
          type: 'value',
          axisTick: null,
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#999999'
          },
          splitLine: {
            lineStyle: {
              color: '#F0F0F0'
            }
          }
        },
        series: [{
          name: ['监测值'],
          type: 'line',
          data: [100, 10, 99, 300],
          itemStyle: {
            color: 'rgba(42, 136, 240, 1)'
          },
          areaStyle: {
            ...echartConfig.gradient({
              x: 0,
              y: 0,
              x2: 0,
              y2: 1
            }, 'rgba(42, 136, 240, 0.15)', 'rgba(42, 136, 240, 0)')
          },
          markLine: {
            symbol: 'none',
            label: {
              show: false
            },
            lineStyle: {
              color: '#F7B500'
            },
            data: [{
              yAxis: 150
            }, {
              xAxis: '2035'
            }]
          }
        }]
      }
    }
  },
  created () {
    this.tableLoading = true
    getWarningTrend().then(res => {
      const total = {
        id: res.data.length,
        region: '合计',
        actual: 0,
        target: 0
      }
      this.tableData = res.data.concat([total])
      this.tableLoading = false
    })
  },
  watch: {
    type (newValue) {
      if (newValue === 'chart') { }
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
