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
      <a-table-column title="行政区" data-index="region" />
      <a-table-column-group align="center">
        <span slot="title">生态保护红线面积</span>
        <a-table-column title="监测值" data-index="actual" align="center">
        </a-table-column>
        <a-table-column title="2035年规划目标值" data-index="target" align="center" />
      </a-table-column-group>
      <!-- <template #footer="currentPageData">
        合计 {{currentPageData}}
      </template> -->
    </a-table>
    <EChart v-if="type === 'chart'" autoresize ref="chart" :options="chartOpt" style="width: 100%;" />
  </div>
</template>

<script>
import echartConfig from '@/plugins/echarts/config'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import { getWarningRegional } from '@/api/warning'
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
          data: ['监测值', '2035年规划目标值'],
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
          type: 'value',
          boundaryGap: [0, 0.01],
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
          type: 'category',
          data: [],
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
        series: []
      }
    }
  },
  created () {
    this.tableLoading = true
    getWarningRegional().then(res => {
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
      if (newValue === 'chart') {
        let data = [...this.tableData]
        data.pop()
        const yAxis = data.map(item => item.region)
        const chartData = [data.map(item => item.actual), data.map(item => item.target)]
        const { chartOpt } = this
        chartOpt.series = []
        chartOpt.yAxis.data = yAxis
        chartData.forEach((item, index) => {
          chartOpt.series.push({
            name: chartOpt.legend.data[index],
            type: 'bar',
            barWidth: 8,
            data: item,
            itemStyle: {
              ...echartConfig.gradient({
                x: 0,
                y: 0,
                x2: 1,
                y2: 0
              }, index ? '#08CF80' : '#5C7FEB', index ? '#88E9C3' : '#8AB3FF')
            },
          })
        })
      }

    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
