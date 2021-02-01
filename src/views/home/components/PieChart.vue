<template>
  <EChart autoresize ref="chart" :options="chartOpt" style="width: 100px; height: 100px" v-if="data.length" />
</template>

<script>
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/custom';
import 'echarts/lib/component/tooltip';
import { graphic } from 'echarts/lib/export'
export default {
  props: {
    data: Array
  },
  data () {
    return {
      chartOpt: {
        color: ['rgba(255, 135, 72, 1)', 'rgba(237, 201, 31, 1)'],
        tooltip: {},
        series: []
      }
    }
  },
  methods: {
    clear () {
      this.$refs.chart.clear()
    }
  },
  mounted () {
    this.clear()
    const MyShape = graphic.extendShape({
      shape: {
        cx: 0,
        cy: 0,
        r: 0,
        startAngle: 0,
        endAngle: Math.PI * 2,
        clockwise: true,
        step: 0
      },
      style: {
        stroke: '#000',
        fill: null
      },
      buildPath: function (ctx, shape) {
        const x = shape.cx
        const y = shape.cy
        const r = Math.max(shape.r, 0)
        const startAngle = shape.startAngle
        const endAngle = shape.endAngle
        const clockwise = shape.clockwise
        const unitX = Math.cos(startAngle)
        const unitY = Math.sin(startAngle)
        const unitXE = Math.cos(endAngle)
        const unitYE = Math.sin(endAngle)
        ctx.moveTo(unitX * r + x, unitY * r + y)
        ctx.arc(x, y, r, startAngle, endAngle, !clockwise)
        ctx.lineTo(unitXE * r + x, unitYE * r + y + shape.step)
        ctx.arc(x, y + shape.step, r, endAngle, startAngle, clockwise)
        ctx.lineTo(unitX * r + x, unitY * r + y)
      }
    })
    graphic.registerShape('myCustomShape', MyShape)


    const { data } = this
    const valueList = []
    for (let i = 0; i < data.length; i++) {
      valueList.push(data[i].value)
    }
    const viewData = []
    let validDataCount = 0
    const colorList = ['rgba(255, 135, 72, 1)', 'rgba(237, 201, 31, 1)']
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      const percent = parseFloat((valueList[i] / (valueList.reduce((prev, next) => prev + next)) * 100).toFixed(1))
      validDataCount += percent
      viewData.push({
        name: item.name,
        value: item.value,
        percent: percent,
        validDataCount: validDataCount,
        __pieColor: colorList[i % colorList.length]
      })
    }
    this.chartOpt.series = [{
      data,
      type: 'custom',
      coordinateSystem: 'none',

      renderItem: (params, api) => {
        // 使用echarts自己等lib计算出百分比
        const PI2 = Math.PI * 2
        const index = params.dataIndex
        const d = viewData[index]
        const start = PI2 * (d.validDataCount - d.percent) / 100
        const end = PI2 * d.validDataCount / 100
        const center = [api.getWidth() / 2, api.getHeight() / 2]
        const scale = [1, 0.6]
        const origin = center
        return {
          type: 'group',
          children: [{
            type: 'sector',
            scale: scale,
            origin,
            silent: true,
            z2: 2,
            shape: {
              cx: center[0],
              cy: center[1] - 20,
              r0: 0,
              r: 20,
              startAngle: start,
              endAngle: end
            },
            style: api.style({
              fill: d.__pieColor
            })
          }, {
            type: 'myCustomShape',
            scale: scale,
            origin,
            silent: true,
            z2: 1,
            shape: {
              cx: center[0],
              cy: center[1] - 20,
              step: 10,
              r0: 0,
              r: 20,
              startAngle: start,
              endAngle: end
            },
            style: api.style({
              fill: 'rgba(218, 117, 64, 1)',
              stroke: d.__pieColor,
              lineWidth: 0
            })
          }]
        }
      }
    }, {
      type: 'pie',
      radius: 20,
      center: ['50%', '40%'],
      startAngle: 0,
      animation: false,
      label: {
        show: false
      },
      itemStyle: {
        color: 'transparent'
      },
      data
    }]
  }
}
</script>

<style lang="less" scoped>
</style>
