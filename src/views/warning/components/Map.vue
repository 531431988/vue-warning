<template>
  <Map :center="center" :zoom="11" @init="map => olMap = map">
    <MapToolBar @location="onLocation" />
    <!-- 预警 -->
    <olMarker v-for="(item, index) in warningList" :key="index" :position="item.center" :stopEvent="false" @click="onWarnClick(item)">
      <div :class="`point ${activeId === item.id ? 't-error' : 't-primary'}`" :data-index="index+1">
        <MapPoint />
      </div>
    </olMarker>
    <!-- 统计点 -->
    <olMarker :position="item.center" positioning="bottom-center" v-for="(item, index) in statisticsData" :key="`statistics-${index}`" :stopEvent="false">
      <div class="ol-marker-tooltip" v-if="visible">
        <span class="num" :style="`background: ${item.color}`">{{index+1}}</span>
        {{item.value}}
      </div>
    </olMarker>
    <!-- 图例 -->
    <Legend :type="legendType" />
    <MapTabPanel>
      <div class="pr15">
        <a-button type="primary" @click="showDetail">{{visible ? '隐藏' : '显示'}}统计</a-button>
      </div>
    </MapTabPanel>
    <TimeLine />
    <WarningModal :visible="warnModal" @cancel="warnModal = false" />
  </Map>
</template>

<script>
import Map, { olMarker } from '@/components/OlMap'
import { setStyleByFeature } from '@/components/OlMap/common'
import { Vector as VectorLayer } from 'ol/layer'
import { GeoJSON } from 'ol/format'
import VectorSource from 'ol/source/Vector'
import { getMapWFS } from '@/api/home'
import center_turf from '@turf/center'
import { getWarningMapArea, getWarningMapStatistics } from '@/api/warning'
import { setCenter } from '@/libs/common'
export default {
  components: {
    Map,
    MapToolBar: () => import('./MapToolBar'),
    Legend: () => import('./Legend'),
    olMarker,
    MapTabPanel: () => import('./MapTabPanel'),
    TimeLine: () => import('./TimeLine'),
    MapPoint: () => import('./MapPoint'),
    WarningModal: () => import('./WarningModal'),
  },
  provide () {
    return {
      getContext: () => (this.olMap)
    }
  },
  data () {
    return {
      olMap: null,
      center: [111.66899670800599, 32.39005667661574],
      visible: false,
      legendType: '',
      warningList: [{
        id: 1,
        center: [112.33283928694895, 31.899865785796983],
        name: '张三农民建房',
        area: '枣阳市XX村'
      }, {
        id: 2,
        center: [111.85356072249583, 31.946557680328233],
        name: '王五农民建房',
        area: '枣阳市XX村'
      }],
      warnModal: false,
      statisticsData: [],
      activeId: null
    }
  },
  methods: {
    onWarnClick (item) {
      this.activeId = item.id
      this.warnModal = true
    },
    loadMapArea () {
      const coordinates = []
      getWarningMapArea().then(res => {
        this.mapAreaLayer = new VectorLayer({
          source: new VectorSource(),
          zIndex: 1
        })
        // 获取中心点坐标
        res.features.forEach(item => {
          coordinates.push({
            name: item.properties.xzqmc,
            code: item.properties.xzqdm,
            center: center_turf(item).geometry.coordinates
          })
        })
        const features = new GeoJSON().readFeatures(res)
        this.mapAreaLayer.getSource().addFeatures(features)
        this.olMap.removeLayer(this.mapAreaLayer)
        this.olMap.addLayer(this.mapAreaLayer)
        this.mapAreaLayer.getSource().getFeatures().forEach(feature => {
          console.log(feature)
          const { tbbh, dlmc } = feature.getProperties()
          const style = {
            strokeColor: '#343A68',
            strokeWidth: 1,
            fillColor: '#4A5386',
            name: dlmc,
            textFillColor: '#fff'
          }
          // 设置每场颜色
          if (tbbh < 100) {
            style.strokeColor = '#FFAA47'
            style.fillColor = 'rgba(250, 170, 71, 0.45)'
          } else if (tbbh < 500) {
            style.strokeColor = '#FF5B5B'
            style.fillColor = 'rgba(255, 91, 91, 0.45)'
          }
          setStyleByFeature(feature, style)
        })
      })
    },
    // 加载统计图层及数据
    loadStatisticsWfs () {
      const coordinates = []
      getMapWFS().then(res => {
        this.statisticsLayer = new VectorLayer({
          source: new VectorSource(),
          zIndex: 1,
          visible: false
        })
        // 获取中心点坐标
        res.features.forEach(item => {
          coordinates.push({
            name: item.properties.xzqmc,
            code: item.properties.xzqdm,
            center: center_turf(item).geometry.coordinates
          })
        })
        const features = new GeoJSON().readFeatures(res)
        this.statisticsLayer.getSource().addFeatures(features)
        this.olMap.removeLayer(this.statisticsLayer)
        this.olMap.addLayer(this.statisticsLayer)
        getWarningMapStatistics().then(res => {
          // 根据code为数据添加中心坐标点 并根据数据设置颜色
          this.statisticsData = setCenter(res.data, coordinates).map(item => {
            let color = '#FA6E6B'
            if (item.value < 60) {
              color = '#FA6E6B'
            } else if (item.value <= 60 || item.value < 80) {
              color = '#FFAA47'
            } else if (item.value <= 80 || item.value < 100) {
              color = '#4469F0'
            } else if (item.value > 100) {
              color = '#1CCEA6'
            }
            return {
              ...item,
              color
            }
          })
          this.statisticsLayer.getSource().getFeatures().forEach(feature => {
            const { xzqdm } = feature.getProperties()
            const { value } = res.data.filter(item => item.code === xzqdm)[0]
            const style = {
              strokeColor: '#343A68',
              strokeWidth: 1,
              fillColor: '#4A5386',
              name: '',
              textFillColor: '#B0B8E7'
            }
            // 设置每场颜色
            if (value < 60) {
              style.strokeColor = '#FA6E6B'
              style.fillColor = 'rgba(250, 110, 107, 0.45)'
            } else if (value <= 60 || value < 80) {
              style.strokeColor = '#FFAA47'
              style.fillColor = 'rgba(255, 170, 71, .45)'
            } else if (value <= 80 || value < 100) {
              style.strokeColor = '#4469F0'
              style.fillColor = 'rgba(116, 146, 255, 0.45)'
            } else if (value > 100) {
              style.strokeColor = '#1CCEA6'
              style.fillColor = 'rgba(28, 206, 166, 0.45)'
            }
            setStyleByFeature(feature, style)
          })
        })
      })
    },
    showDetail () {
      this.visible = !this.visible
      this.statisticsLayer.setVisible(this.visible)
      this.mapAreaLayer.setVisible(!this.visible)
      this.legendType = this.visible ? 'detail' : ''
    },
    onLocation () {
      this.olMap.getView().animate({
        center: this.center,
        zoom: 11
      })
    }
  },
  mounted () {
    this.loadStatisticsWfs()
    this.loadMapArea()
  },
}
</script>

<style lang="less" scoped>
.olMap {
  height: calc(100vh - 104px);
  /deep/ .avatar {
    background: #fff;
    border: 5px white solid;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
    animation: float 6s ease-in-out infinite;
  }
  .point {
    position: relative;
    line-height: 1;
    cursor: pointer;
    &::after {
      content: attr(data-index);
      position: absolute;
      color: #fff;
      top: 5px;
      left: 8px;
    }
  }

  .ol-marker-tooltip {
    position: relative;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    color: rgba(102, 102, 102, 1);
    padding: 4px 16px 4px 32px;
    white-space: nowrap;
    &::before {
      content: "";
      position: absolute;
      border-color: #fff transparent transparent;
      border-style: solid;
      border-width: 6px;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
    }
    .num {
      position: absolute;
      left: 6px;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      background: #7492ff;
      border-radius: 3px;
      text-align: center;
      color: #fff;
      line-height: 18px;
    }
  }
}
</style>
