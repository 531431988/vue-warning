<template>
  <a-dropdown>
    <a-menu slot="overlay">
      <a-menu-item key="1">
        <a-button type="link" block @click="onMeasure('LineString')">测距离</a-button>
      </a-menu-item>
      <a-menu-item key="2">
        <a-button type="link" block @click="onMeasure('Polygon')">测面积</a-button>
      </a-menu-item>
    </a-menu>
    <a-button type="link"><i class="icon-ic-celiang"></i>测量距离和面积</a-button>
  </a-dropdown>
</template>

<script>
import { Feature, Overlay } from 'ol'
import { LineString, Polygon } from 'ol/geom'
import { Draw } from 'ol/interaction'
import { Vector as VectorLayer } from 'ol/layer'
import { unByKey } from 'ol/Observable'
import { Vector as VectorSource } from 'ol/source'
import { getArea, getLength } from 'ol/sphere'
import {
  Fill,
  Circle,
  Stroke,
  Style
} from 'ol/style'
export default {
  inject: ['getContext'],
  props: {
    stroke: {
      type: String,
      default: '#4469F0'
    },
    fill: {
      type: String,
      default: 'rgba(255,255,255,.5)'
    }
  },
  data () {
    return {
      layer: null,
      source: null,
      draw: null,
      Overlay: [],
      style: new Style({
        fill: new Fill({
          color: this.fill,

        }),
        stroke: new Stroke({
          color: this.stroke,
          width: 3
        }),
        image: new Circle({
          radius: 0,
          fill: new Fill({
            color: 'rgba(255, 215, 0, 1)'
          })
        })
      })
    }
  },
  computed: {
    olMap () {
      return this.getContext()
    }
  },
  methods: {
    // 测距
    onMeasure (type) {
      this.measure(this.olMap, type)
    },
    //清除
    clear (map = this.olMap) {
      if (this.source) {//清除所有绘制
        this.source.clear();
        this.source = null;
      }
      for (var key in this.Overlay) {
        map.removeOverlay(this.Overlay[key])
      }
      this.Overlay = [];
      return;
    },
    measure (map, type) {
      //创建一个帮助提示框对象
      var helpTooltipElement;
      //创建一个帮助提示信息对象
      var helpTooltip;
      //创建一个测量提示框对象
      var measureTooltipElement;
      //创建一个测量提示信息对象
      var measureTooltip;
      //继续绘制多边形的提示信息
      var continuePolygonMsg = '单击开始, 双击结束绘制面';
      //继续绘制线段的提示信息
      var continueLineMsg = '单击开始, 双击结束绘制线';
      //定义一个交互式绘图对象
      if (!map) { return }
      if (this.draw) {
        map.removeInteraction(this.draw);
        this.draw = null;
      }
      if (!this.source) {
        //定义矢量数据源
        this.source = new VectorSource({ wrapX: false });
        //定义矢量图层
        var vectorLayer = new VectorLayer({
          source: this.source,
          zIndex: 999,
          style: this.style
        });
        //将矢量图层添加到地图中
        map.addLayer(vectorLayer);
      }
      //创建一个当前要绘制的对象
      var sketch = new Feature();
      //鼠标移动触发的函数
      var pointerMoveHandler = evt => {
        //如果是平移地图则直接结束
        if (evt.dragging) { return; }
        //帮助提示信息
        var helpMsg = '单击开始绘制';
        if (sketch) {
          //获取绘图对象的几何要素
          var geom = sketch.getGeometry();
          //如果当前绘制的几何要素是多边形，则将绘制提示信息设置为多边形绘制提示信息
          //如果当前绘制的几何要素是多线段，则将绘制提示信息设置为多线段绘制提示信息
          if (geom instanceof Polygon) {
            helpMsg = continuePolygonMsg;
          } else if (geom instanceof LineString) {
            helpMsg = continueLineMsg;
          }
        }
        //设置帮助提示要素的内标签为帮助提示信息
        helpTooltipElement.innerHTML = helpMsg;
        //设置帮助提示信息的位置
        helpTooltip.setPosition(evt.coordinate);
        //移除帮助提示要素的隐藏样式
        helpTooltipElement.classList.remove('ol-tooltip-hidden');
      };
      //触发pointermove事件
      map.on('pointermove', pointerMoveHandler);
      //当鼠标移除地图视图的时为帮助提示要素添加隐藏样式
      map.getViewport().addEventListener('mouseout', () => {
        helpTooltipElement.classList.add('ol-tooltip-hidden');
      });
      //添加交互式绘图对象的函数
      const addInteraction = () => {
        // 获取当前选择的绘制类型
        // var type = typeSelect == 'Area' ? 'Polygon' : 'LineString';
        //创建一个交互式绘图对象
        this.draw = new Draw({
          //绘制的数据源
          source: this.source,
          //绘制类型
          type,
          //样式
          style: this.style
        });
        //将交互绘图对象添加到地图中
        map.addInteraction(this.draw);
        //创建测量提示框
        createMeasureTooltip();
        //创建帮助提示框
        createHelpTooltip();
        //定义一个事件监听
        var listener;
        //定义一个控制鼠标点击次数的变量
        //绘制开始事件
        this.draw.on('drawstart', evt => {
          //The feature being drawn.
          sketch = evt.feature;
          //提示框的坐标
          var tooltipCoord = evt.coordinate;
          //监听几何要素的change事件
          listener = sketch.getGeometry().on('change', evt => {
            //The event target.
            //获取绘制的几何对象
            var geom = evt.target;
            //定义一个输出对象，用于记录面积和长度
            var output;
            if (geom instanceof Polygon) {
              map.removeEventListener('singleclick');
              map.removeEventListener('dblclick');
              //输出多边形的面积
              output = formatData('Polygon', geom);
              if (output > 10000) {
                output = (Math.round(output / 1000000 * 100) / 100) + ' ' + '平方公里';
              } else {
                output = (Math.round(output * 100) / 100) + ' ' + '平方米';
              }
              //获取多变形内部点的坐标
              tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof LineString) {
              //输出多线段的长度
              output = formatData('LineString', geom);
              if (output > 1000) {
                output = (Math.round(output / 1000 * 100) / 100) +
                  ' ' + '公里';
              } else {
                output = (Math.round(output * 100) / 100) +
                  ' ' + '米';
              }
              //Return the last coordinate of the geometry.
              //获取多线段的最后一个点的坐标
              tooltipCoord = geom.getLastCoordinate();
            }
            //设置测量提示框的内标签为最终输出结果
            measureTooltipElement.innerHTML = output;
            //设置测量提示信息的位置坐标
            measureTooltip.setPosition(tooltipCoord);
          });
        });
        //绘制结束事件
        this.draw.on('drawend', evt => {
          //设置测量提示框的样式
          measureTooltipElement.className = 'ol-tooltip ol-tooltip-end';
          //Set the offset for this overlay.
          //设置偏移量
          measureTooltip.setOffset([0, -7]);
          //清空绘制要素
          sketch = null;
          //清空测量提示要素
          measureTooltipElement = null;
          //创建测量提示框
          createMeasureTooltip(evt.coordinate);
          //移除事件监听
          unByKey(listener);
          //移除地图单击事件
          map.removeEventListener('singleclick');
          map.removeInteraction(this.draw);//移除绘制
          map.removeOverlay(helpTooltip);//移除帮助弹窗

          // 'Polygon' : 'LineString'
          // if(type == 'Polygon'){//测面
          //     var output = formatArea(evt.feature.getGeometry());//总面积 平方米
          // }else if(type == 'LineString'){//测距
          //     var output = formatLength(evt.feature.getGeometry());//总长度 米
          //     var distance = turf.distance(turf.point(evt.feature.getGeometry().getFirstCoordinate()),
          //     turf.point(evt.feature.getGeometry().getLastCoordinate())) * 1000;//两点直接直线 米
          //     console.log(distance);
          // }
        });
      }
      //创建帮助提示框
      const createHelpTooltip = () => {
        //如果已经存在帮助提示框则移除
        if (helpTooltipElement) {
          helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        //创建帮助提示要素的div
        helpTooltipElement = document.createElement('div');
        //设置帮助提示要素的样式
        helpTooltipElement.className = 'ol-tooltip ol-tooltip-hidden';
        //创建一个帮助提示的覆盖标注
        helpTooltip = new Overlay({
          element: helpTooltipElement,
          offset: [15, 0],
          positioning: 'center-left'
        });
        this.Overlay.push(helpTooltip);
        //将帮助提示的覆盖标注添加到地图中
        map.addOverlay(helpTooltip);
      }
      //创建测量提示框
      const createMeasureTooltip = () => {
        if (measureTooltipElement) {
          measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        //创建测量提示框的div
        measureTooltipElement = document.createElement('div');
        // measureTooltipElement.setAttribute('id', 'lengthLabel');
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-start';
        //创建一个测量提示的覆盖标注
        measureTooltip = new Overlay({
          element: measureTooltipElement,
          offset: [0, -15],
          positioning: 'bottom-center'
        });
        this.Overlay.push(measureTooltip);
        //将测量提示的覆盖标注添加到地图中
        map.addOverlay(measureTooltip);
      }
      //格式化测量数据
      const formatData = (type, data) => {
        const view = map.getView();
        let length
        if (view.getProjection().getUnits() == 'degrees') {
          //球面坐标系
          length = type === 'LineString' ? getLength(data, { projection: view.getProjection() }) : getArea(data, { projection: view.getProjection() })
        } else {
          //平面坐标系
          length = type === 'LineString' ? data.getLength() : data.getArea()
        }
        return length;
      }
      //添加交互绘图对象
      addInteraction();
    },
  }
}
</script>


<style lang="less">
.ol-tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: #fff;
  padding: 4px 8px;
  white-space: nowrap;
  font-size: 12px;
  &-start {
    &::before {
      border-color: fade(#000, 50%) transparent transparent;
    }
  }
  &-start:before,
  &-end:before {
    border-style: solid;
    border-width: 6px;
    content: "";
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
  }
  &-end {
    background-color: fade(@primary-color, 80%);
    color: #fff;
    border: 2px solid #fff;
    &::before {
      border-color: fade(@primary-color, 80%) transparent transparent;
    }
  }
}
</style>