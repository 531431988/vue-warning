<template>
  <a-space direction="vertical" size="middle" style="width: 100%">
    <a-card v-bind="$attrs" :bordered="false" :loading="loading" :bodyStyle="{padding: loading ? '24px' : 0}">
      <a-row type="flex" align="middle">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="16" :xxl="12">
          <EChart autoresize ref="chart" :options="chartOpt" style="width: 100%; height: 150px;margin: 24px auto" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8" :xxl="12" class="item">
          <a-row>
            <a-col :sm="24" :md="12" :lg="12" :xl="24" class="border-bottom">
              <a-row type="flex" align="middle">
                <a-col flex="1">
                  <countTo class="number" :startVal="0" :endVal="2" />
                  <p class="t-grey" v-if="!icon">警情项目（个）</p>
                  <p class="t-grey" v-else>临界预警（个）</p>
                </a-col>
                <a-col v-if="icon">
                  <WarningState state="临界预警" size="large" />
                </a-col>
              </a-row>
            </a-col>
            <a-col :sm="24" :md="12" :lg="12" :xl="24" class="border-bottom">
              <a-row type="flex" align="middle">
                <a-col flex="1">
                  <countTo class="number" :startVal="0" :endVal="20" :decimals="2" />
                  <p class="t-grey" v-if="!icon">警情项目规模（公顷）</p>
                  <p class="t-grey" v-else>严重预警（个）</p>
                </a-col>
                <a-col v-if="icon">
                  <WarningState state="重度预警" size="large" />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
  </a-space>
</template>

<script>
import echartConfig from '@/plugins/echarts/config'
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
export default {
  props: {
    chart: Object,
    icon: Boolean
  },
  components: {
    countTo: () => import('vue-count-to'),
  },
  data () {
    return {
      loading: true,
      chartOpt: {
        title: {
          top: 'center',
          left: 40,
          text: '',
          textStyle: {
            rich: {
              total: {
                fontSize: 36,
                width: 120,
                align: 'center',
              },
              title: {
                width: 120,
                fontSize: 12,
                align: 'center',
                color: 'rgba(153, 153, 153, 1)'
              }
            }
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 40,
          top: 'middle',
          icon: 'path://M112,-1.5 C108.962434,-1.5 106.5,0.962433876 106.5,4 C106.5,7.03756612 108.962434,9.5 112,9.5 C115.037566,9.5 117.5,7.03756612 117.5,4 C117.5,0.962433876 115.037566,-1.5 112,-1.5 Z M112,1.5 C113.380712,1.5 114.5,2.61928813 114.5,4 C114.5,5.38071187 113.380712,6.5 112,6.5 C110.619288,6.5 109.5,5.38071187 109.5,4 C109.5,2.61928813 110.619288,1.5 112,1.5 Z',
          data: [],
          textStyle: {
            rich: {
              val: {
                fontSize: 14,
                fontWeight: 700,
                padding: [0, 0, 0, 10]
              }
            }
          }
        },
        series: [{
          name: this.$attrs.title,
          type: 'pie',
          radius: ['70%', '82%'],
          center: [100, '50%'],
          label: null,
          labelLine: null,
          data: []
        }]
      }
    }
  },
  created () {
    this.loading = true
    const { chartOpt, chart } = this
    const { title, legend } = chartOpt
    legend.data = chart.data.map(item => item.name)
    legend.formatter = name => {
      const val = chart.data.filter(item => item.name === name)[0]
      return `${name} {val|${val.value}}`
    }
    const total = chart.data.map(item => item.value).reduce((prev, next) => prev + next)
    title.text = `{total|${total}}\n{title|${chart.title}}`
    chart.data.forEach((item, index) => {
      chartOpt.series[0].data.push({
        value: item.value,
        name: item.name,
        itemStyle: {
          ...echartConfig.gradient({
            x: 0,
            y: index,
            x2: 0,
            y2: .5
          }, index ? 'rgba(138, 179, 255, 1)' : 'rgba(255, 176, 189, 1)', index ? 'rgba(82, 124, 255, 1)' : 'rgba(255, 92, 111, 1)')
        },
      })
    })
    this.loading = false
  },
}
</script>

<style lang="less" scoped>
.number {
  font-size: 30px;
  color: #333;
}
@media (min-width: 1200px) {
  .item {
    border-left: 1px solid @border-color-split;
  }
  .border-bottom {
    border-top: none !important;
    &:not(:last-child) {
      border-bottom: 1px solid @border-color-split;
    }
    border-right: none !important;
  }
}
.border-bottom {
  border-top: 1px solid @border-color-split;
  &:not(:last-child) {
    border-right: 1px solid @border-color-split;
  }
  padding: 24px;
}
</style>
