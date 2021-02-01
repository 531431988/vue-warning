<template>
  <div class="olMap">
    <div :id="`${id ? id : 'olMap-'+uid}`" style="height: 100%;">
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, onMounted, watch, } from '@vue/composition-api'
import 'ol/ol.css'
import { Map, View } from 'ol'
import { Tile } from 'ol/layer'
import { XYZ } from 'ol/source'
import { transform } from 'ol/proj'
// import { toLonLat } from 'ol/proj'
// import { defaults } from 'ol/interaction'
// import { toStringHDMS } from 'ol/coordinate'
export default {
  props: {
    id: String,
    layers: {
      type: Array,
      default: () => ([
        /* new Tile({
            source: new OSM()
          }), */
        new Tile({
          preload: Infinity,
          source: new XYZ({
            url: `http://t${Math.round(Math.random() * 7)}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=bb3520316e04a385a5b070fcec721046`,
            wrapx: true
          })
        }),
        new Tile({
          preload: Infinity,
          source: new XYZ({
            url: `http://t${Math.round(Math.random() * 7)}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=bb3520316e04a385a5b070fcec721046`,
            wrapx: true
          })
        })
      ])
    },
    center: {
      type: Array,
      default: () => ([114.30658798250894, 30.585486974363526])
    },
    zoom: {
      type: Number,
      default: 10
    },
    minZoom: {
      type: Number,
      default: 1
    },
    maxZoom: {
      type: Number,
      default: 20
    },
    focus: Boolean
  },
  setup (props, { attrs, emit }) {
    const state = reactive({
      olMap: null
    })
    const uid = getCurrentInstance().uid
    const initMap = () => {
      const { id = `olMap-${uid}`, layers, center, zoom, minZoom, maxZoom } = props
      state.olMap = new Map({
        layers,
        /* 可禁用相关事件，详情查API
      interaction: defaults({
        onFocusOnly: focus // true: 只有在地图有焦点时才进行互动, 默认值: false
      }),
      */
        target: id,
        view: new View({
          /*
            * EPSG:3857坐标系（投影坐标）
            * EPSG:4326 坐标系（地理坐标）  WGS84 
              projection: 'EPSG:3857'  默认值
              center: fromLonLat([105.90942, 33.17749]),
            */
          projection: 'EPSG:4326',
          center,
          zoom,
          maxResolution: 1.406250000000001,
          minZoom,
          maxZoom,
          ...attrs

        })
      })
      const view = state.olMap.getView()
      view.animate({
        center,
        zoom
      })

      watch(() => props.zoom, (newVal) => {
        view.setZoom(newVal)
      })
      emit('init', state.olMap)
    }
    onMounted(() => {
      initMap()
      state.olMap.on('click', e => {
        // 如果是EPSG:3857获取的坐标就需要转换成经纬度坐标
        // var hdms = toStringHDMS(toLonLat(e.coordinate))
        emit('click', e)
        console.log(e.coordinate)

      })
    })
    return {
      uid,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.olMap {
  position: relative;
  height: 100%;
  /deep/ .ol-zoom {
    display: none;
  }
}
</style>
