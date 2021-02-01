<template>
  <a-spin :spinning="loading">
    <div class="map-wrap">
      <a-row type="flex" justify="space-between">
        <a-col>
          <div class="tit"><i class="icon-ic-dingwei"></i> 老河口市</div>
        </a-col>
        <a-radio-group v-model="radio" button-style="solid">
          <a-radio-button :value="1">预警状态专题图</a-radio-button>
          <a-radio-button :value="2">预警类型专题图</a-radio-button>
        </a-radio-group>
      </a-row>

      <Map style="height: 546px" :center="center" :layers="[]" :zoom="1" :minZoom="0" :maxZoom="5" :maxResolution="1.406250000000001 / 1000" @init="map => olMap = map">
        <olMarker :position="item.center" positioning="bottom-center" v-for="(item, index) in chartData" :key="index" :stopEvent="false">
          <BarChart ref="bar" :data="item.chart" v-if="radio === 1" />
          <PieChart ref="pie" :data="item.chart" v-if="radio === 2" />
        </olMarker>
      </Map>
      <Legend :type="radio === 1 ? 'bar' : 'pie'" />
    </div>
  </a-spin>
</template>

<script>
import Map, { olMarker } from '@/components/OlMap'
import { setStyleByFeature } from '@/components/OlMap/common'
import { Vector as VectorLayer } from 'ol/layer'
import { GeoJSON } from 'ol/format'
import VectorSource from 'ol/source/Vector'
import { Style, Fill } from 'ol/style'
import center_turf from '@turf/center'
import transformTranslate from '@turf/transform-translate'
import { getMapWFS, getWarningOverviewMapBarCharts, getWarningOverviewMapPieCharts } from '@/api/home'
export default {
  components: {
    Map,
    olMarker,
    BarChart: () => import('./BarChart'),
    PieChart: () => import('./PieChart'),
    Legend: () => import('./Legend'),
  },
  data () {
    return {
      loading: true,
      radio: -1,
      center: [111.76211989666697, 32.37630922014074],
      layer: null,
      olMap: null,
      chartData: []
    }
  },
  watch: {
    radio (newVal) {
      this.chartData = []
      if (newVal === 1) {
        this.chartData = this.barData
      } else {
        this.chartData = this.pieData
      }
    }
  },
  methods: {
    // 地图初始化完成
    async initMap () {
      try {
        const data = await getMapWFS()
        this.coordinates = []
        // 获取中心点坐标
        data.features.forEach(item => {
          this.coordinates.push({
            name: item.properties.xzqmc,
            code: item.properties.xzqdm,
            center: center_turf(item).geometry.coordinates
          })
        })
        this.layer = new VectorLayer({
          source: new VectorSource(),
          zIndex: 1
        })
        var features = new GeoJSON().readFeatures(data)
        this.layer.getSource().addFeatures(features)
        this.olMap.addLayer(this.layer)

        this.layer.getSource().getFeatures().forEach(item => {
          var style = {
            strokeColor: '#343A68',
            strokeWidth: 1,
            fillColor: '#4A5386',
            name: item.getProperties().xzqmc,
            textFillColor: '#B0B8E7'
          }
          setStyleByFeature(item, style)
        })
        // 添加偏移
        this.mapSideLine(data, { distance: 2, direction: 145 })
      } catch (error) {
        console.log(error)
      }
      getWarningOverviewMapBarCharts().then(res => {
        this.loading = false
        this.barData = this.setCenter(res.data, this.coordinates)
        this.chartData = this.barData
      })
      getWarningOverviewMapPieCharts().then(res => {
        this.loading = false
        this.pieData = this.setCenter(res.data, this.coordinates)
      })
    },
    setCenter (target, source) {
      let arr = []
      target.forEach(item => {
        const [data] = source.filter(node => node.code === item.code)
        arr.push({
          center: data.center,
          ...item,
        })
      })
      return arr
    },
    // 地图偏移效果
    mapSideLine (geoJson, translate) {
      const { distance = 5, direction = 90 } = translate
      var vectorLayerTranslate = new VectorLayer({
        source: new VectorSource(),
        zIndex: 0
      })
      this.olMap.addLayer(vectorLayerTranslate)
      // distance 偏移距离 direction 角度
      var featureTranslate = new GeoJSON().readFeatures(transformTranslate(geoJson,
        distance, direction))
      featureTranslate.forEach(feature => {
        var featureId = feature.getId()
        feature.setId(featureId += '_Translate')
        feature.setStyle(new Style({
          fill: new Fill({
            color: '#111637'
          }),
        }))
      })
      vectorLayerTranslate.getSource().clear()
      vectorLayerTranslate.getSource().addFeatures(featureTranslate)
    }
  },
  mounted () {

    this.radio = 1
    //this.zoom = 0
    this.initMap()
    /* const view = this.olMap.getView()
    view.setMaxResolution(1.406250000000001 / 1000)
    view.setMinZoom(0)
    view.setMaxZoom(5) */
  },
}
</script>

<style lang="less" scoped>
.map-wrap {
  background: linear-gradient(180deg, #47508a 0%, #20254b 100%);
  border-radius: 4px;
  height: 100%;
  padding: 16px;
  position: relative;
  .tit {
    font-size: 24px;
    color: #fff;
  }
  .ant-radio-group {
    /deep/ .ant-radio-button-wrapper {
      background: transparent;
      border-color: #6e78b3;
      color: #ffffff;
      &.ant-radio-button-wrapper-checked {
        background: #5f7cde;
        border-color: #5f7cde;
      }
    }
  }
}
</style>
