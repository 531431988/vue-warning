<template>
  <EChart autoresize ref="chart" :options="chartOpt" style="width: 100px; height: 100px" v-if="data.length" />
</template>

<script>

import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/custom';
import 'echarts/lib/component/tooltip';
import { graphic } from 'echarts/lib/export'
export default {
  props: {
    data: Array
  },
  components: {
  },
  data () {
    return {
      chartOpt: {
        color: ['rgba(42, 136, 240, 1)', 'rgba(255, 192, 86, 1)', 'rgba(250, 110, 107, 1)'],
        tooltip: {},
        grid: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        },
        xAxis: {
          type: 'category',
          data: [],
          show: false
        },
        yAxis: {
          type: 'value',
          show: false,

        },
        series: []
      }
    }
  },
  methods: {
    clear () {
      this.$refs.chart.clear()
    },
    /* 海南项目COPY过来的图表，公司大力支持COPY */
    createShape () {
      const CubeLeft1 = graphic.extendShape({
        shape: { x: 0, y: 0 },
        buildPath: function (ctx, shape) {
          shape.x = 24
          shape.xAxisPoint[0] = 24
          const xAxisPoint = shape.xAxisPoint
          const c0 = [shape.x, shape.y]
          const c1 = [shape.x - 5.5, shape.y - 5.5]
          const c2 = [xAxisPoint[0] - 5.5, xAxisPoint[1] - 5.5]
          const c3 = [xAxisPoint[0], xAxisPoint[1]]
          ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
        }
      })
      const CubeRight1 = graphic.extendShape({
        shape: { x: 0, y: 0 },
        buildPath: function (ctx, shape) {
          shape.x = 24
          shape.xAxisPoint[0] = 24
          const xAxisPoint = shape.xAxisPoint
          const c1 = [shape.x, shape.y]
          const c2 = [xAxisPoint[0], xAxisPoint[1]]
          const c3 = [xAxisPoint[0] + 10.5, xAxisPoint[1] - 1.5]
          const c4 = [shape.x + 10.5, shape.y - 1.5]
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
      })
      const CubeTop1 = graphic.extendShape({
        shape: { x: 0, y: 0 },
        buildPath: function (ctx, shape) {
          shape.x = 24
          shape.xAxisPoint[0] = 24
          const c1 = [shape.x, shape.y]
          const c2 = [shape.x + 10.5, shape.y - 1.5]
          const c3 = [shape.x + 5, shape.y - 7]
          const c4 = [shape.x - 5.5, shape.y - 5.5]
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
      })
      const CubeLeft2 = graphic.extendShape({
        shape: { x: 0, y: 0 },
        buildPath: function (ctx, shape) {
          shape.x = 40
          shape.xAxisPoint[0] = 40
          const xAxisPoint = shape.xAxisPoint
          const c0 = [shape.x, shape.y]
          const c1 = [shape.x - 5.5, shape.y - 5.5]
          const c2 = [xAxisPoint[0] - 5.5, xAxisPoint[1] - 5.5]
          const c3 = [xAxisPoint[0], xAxisPoint[1]]
          ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
        }
      })
      const CubeRight2 = graphic.extendShape({
        shape: { x: 0, y: 0 },
        buildPath: function (ctx, shape) {
          shape.x = 40
          shape.xAxisPoint[0] = 40
          const xAxisPoint = shape.xAxisPoint
          const c1 = [shape.x, shape.y]
          const c2 = [xAxisPoint[0], xAxisPoint[1]]
          const c3 = [xAxisPoint[0] + 10.5, xAxisPoint[1] - 1.5]
          const c4 = [shape.x + 10.5, shape.y - 1.5]
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
      })
      const CubeTop2 = graphic.extendShape({
        shape: { x: 0, y: 0 },
        buildPath: function (ctx, shape) {
          shape.x = 40
          shape.xAxisPoint[0] = 40
          const c1 = [shape.x, shape.y]
          const c2 = [shape.x + 10.5, shape.y - 1.5]
          const c3 = [shape.x + 5, shape.y - 7]
          const c4 = [shape.x - 5.5, shape.y - 5.5]
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
      })
      const CubeLeft3 = graphic.extendShape({
        shape: { x: 0, y: 0 },
        buildPath: function (ctx, shape) {
          shape.x = 56
          shape.xAxisPoint[0] = 56
          const xAxisPoint = shape.xAxisPoint
          const c0 = [shape.x, shape.y]
          const c1 = [shape.x - 5.5, shape.y - 5.5]
          const c2 = [xAxisPoint[0] - 5.5, xAxisPoint[1] - 5.5]
          const c3 = [xAxisPoint[0], xAxisPoint[1]]
          ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
        }
      })
      const CubeRight3 = graphic.extendShape({
        shape: { x: 0, y: 0 },
        buildPath: function (ctx, shape) {
          shape.x = 56
          shape.xAxisPoint[0] = 56
          const xAxisPoint = shape.xAxisPoint
          const c1 = [shape.x, shape.y]
          const c2 = [xAxisPoint[0], xAxisPoint[1]]
          const c3 = [xAxisPoint[0] + 10.5, xAxisPoint[1] - 1.5]
          const c4 = [shape.x + 10.5, shape.y - 1.5]
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
      })
      const CubeTop3 = graphic.extendShape({
        shape: { x: 0, y: 0 },
        buildPath: function (ctx, shape) {
          shape.x = 56
          shape.xAxisPoint[0] = 56
          const c1 = [shape.x, shape.y]
          const c2 = [shape.x + 10.5, shape.y - 1.5]
          const c3 = [shape.x + 5, shape.y - 7]
          const c4 = [shape.x - 5.5, shape.y - 5.5]
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
      })

      graphic.registerShape('CubeLeft1', CubeLeft1)
      graphic.registerShape('CubeRight1', CubeRight1)
      graphic.registerShape('CubeTop1', CubeTop1)
      graphic.registerShape('CubeLeft2', CubeLeft2)
      graphic.registerShape('CubeRight2', CubeRight2)
      graphic.registerShape('CubeTop2', CubeTop2)
      graphic.registerShape('CubeLeft3', CubeLeft3)
      graphic.registerShape('CubeRight3', CubeRight3)
      graphic.registerShape('CubeTop3', CubeTop3)
    },
    // 创建自定义柱图
    renderShape (api, list = ['CubeLeft1', 'CubeRight1', 'CubeTop1'], startColor = 'rgba(42, 136, 240, 1)', endColor = 'rgba(84, 189, 249, 1)') {
      const location = api.coord([api.value(0), api.value(1)])
      let arr = []
      list.forEach(type => {
        arr.push({
          type,
          shape: {
            api,
            xValue: api.value(0),
            yValue: api.value(1),
            x: location[0],
            y: location[1],
            xAxisPoint: api.coord([api.value(0), 0])
          },
          style: {
            fill: new graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0.2,
              color: startColor
            },
            {
              offset: 0.8,
              color: endColor
            }
            ])
          }
        })
      })
      return arr
    }
  },
  created () {
    this.createShape()
  },
  mounted () {
    this.clear()
    /* const data = [{
      value: 1000,
      name: '正常状态'
    }, {
      value: 800,
      name: '临界预警'
    }, {
      value: 500,
      name: '重度预警'
    }] */

    const { chartOpt, data } = this
    const { xAxis, series } = chartOpt
    xAxis.data = data.map(item => item.name)
    data.forEach((item, index) => {
      series.push({
        type: 'custom',
        renderItem: (params, api) => {
          let children = []
          if (index === 0) children = this.renderShape(api)
          if (index === 1) children = this.renderShape(api, ['CubeLeft2', 'CubeRight2', 'CubeTop2'], 'rgba(255, 192, 86, 1)', 'rgba(255, 206, 121, 1)')
          if (index === 2) children = this.renderShape(api, ['CubeLeft3', 'CubeRight3', 'CubeTop3'], 'rgba(250, 110, 107, 1)', 'rgba(253, 150, 149, 1)')
          return {
            type: 'group',
            children
          }
        },
        data: [{
          name: item.name,
          value: item.value
        }]
      })
    })

  },
}
</script>

<style lang="less" scoped>
</style>
