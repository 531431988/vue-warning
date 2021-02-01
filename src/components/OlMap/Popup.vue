<template>
  <div :id="`ol-popup-${uid}`" class="ol-popup">
    <div class="ol-popup-title" v-if="$slots.title || title">
      <slot name="title" v-if="$slots.title"></slot>
      <span v-else>{{title}}</span>
    </div>
    <slot name="close" v-if="$slots.close"></slot>
    <a-icon v-else type="close" class="ol-popup-close" @click="onClose"></a-icon>
    <div class="ol-popup-bd" v-if="$slots.default || $scopedSlots.default">
      <slot v-bind="params"></slot>
    </div>
  </div>
</template>

<script>
import { Overlay } from 'ol'
import { reactive, toRefs, onMounted, nextTick, getCurrentInstance } from '@vue/composition-api'
export default {
  props: {
    title: String,
    position: {
      type: Array,
      default: () => ([])
    }
  },
  setup (props, { parent }) {
    let popup = null
    const uid = getCurrentInstance().uid
    const state = reactive({
      params: null
    })
    const onClose = () => {
      popup.setPosition()
      return false
    }
    onMounted(() => {
      popup = new Overlay({
        element: document.querySelector(`#ol-popup-${uid}`),
        // 默认展示位置
        position: props.position,
        positioning: 'center-center',
        autoPan: true, // 弹窗在边缘时自动平移地图展示完整弹窗
        autoPanAnimation: { // 平移动画
          duration: 250
        }
      })
      nextTick(() => {
        const { olMap = null } = parent
        olMap.addOverlay(popup)
        olMap.on('click', e => {
          const coordinate = e.coordinate
          popup.setPosition(coordinate)
          state.params = e
        })
      })
    })
    return {
      uid,
      ...toRefs(state),
      onClose
    }
  }
}
</script>

<style lang="less" scoped>
.ol-popup {
  position: absolute;
  bottom: 12px;
  left: -50%;
  transform: translateX(-50%);
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  &:after {
    position: absolute;
    left: 50%;
    bottom: -4px;
    content: "";
    width: 8px;
    height: 8px;
    background: transparent;
    border-style: solid;
    border-width: 4px;
    transform: translateX(-50%) rotate(45deg);
    border-color: transparent #fff #fff transparent;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
  }
  &-title {
    min-height: 32px;
    padding: 5px 16px 4px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    border-bottom: 1px solid #e8e8e8;
  }
  &-close {
    position: absolute;
    right: 8px;
    top: 8px;
  }
  &-bd {
    padding: 16px;
  }
}
</style>
