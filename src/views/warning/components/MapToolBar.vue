<template>
  <div class="ol-map-toolbar">
    <a-button type="link" ref="btn" id="fullScreen" @click="onClick">
      <i :class="isfull ? 'icon-ic-close' : 'icon-ic-quanping'"></i>{{isfull ? '关闭' : '全屏'}}
    </a-button>
    <a-button type="link" @click="onSetCenter"><i class="icon-ic-dingwei1"></i> 定位</a-button>
    <Measure ref="measure" />
    <!-- <a-button type="link"><i class="icon-ic-diantuchaxun"></i>点图查询</a-button> -->
    <a-button type="link" @click="onClear"><i class="icon-ic-delete"></i> 清除</a-button>
    <a-cascader :options="options" @change="onCascaderChange">
      <a-button type="link"><i class="icon-ic-chengshi"></i> 老河口市</a-button>
    </a-cascader>
  </div>
</template>

<script>
import { FullScreen } from 'ol/control'
export default {
  inject: ['getContext'],
  components: {
    Measure: () => import('@/components/OlMap/Measure')
  },
  data () {
    return {
      isfull: false,
      options: [{
        value: '420682007',
        label: '袁冲乡'
      }, {
        value: '420682005',
        label: '孟楼镇',
      }, {
        value: '420682003',
        label: '张集镇',
      }],
    }

  },
  computed: {
    olMap () {
      return this.getContext()
    }
  },
  methods: {
    onClear () {
      this.$refs.measure.clear()
    },
    onSetCenter () {

      this.$emit('location')
    },
    onClick () {
      this.$nextTick(() => {
        let classname = this.$refs.btn.$el.querySelector('button').className.split('-')
        classname = classname[classname.length - 1]
        this.isfull = classname === 'false'
      })
    },
    onCascaderChange () {

    }
  },
  mounted () {
    const f = new FullScreen({
      target: document.querySelector('#fullScreen'),
      source: this.$parent.$el
    })
    this.olMap.addControl(f)
  },
}
</script>

<style lang="less">
.ol-map-toolbar {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #fff;
  [class^="icon-ic-"],
  [class*=" icon-ic-"] {
    margin-right: 4px;
  }
  /deep/ button {
    padding: 0 8px;
  }
  /deep/ .ol-full-screen {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    button {
      width: 100%;
    }
  }
}
</style>