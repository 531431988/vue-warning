<template>
  <div :id="`ol-marker-${uid}`" class="ol-marker" v-if="$attrs.position.length" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { Overlay } from 'ol'
import { onMounted, nextTick, getCurrentInstance, watch } from '@vue/composition-api'
export default {
  name: 'oMarker',
  props: {
    id: String
  },
  setup (props, { parent, attrs, emit }) {
    const uid = props.id || getCurrentInstance().uid
    const state = {
      overlay: null
    }
    const init = () => {
      nextTick(() => {
        state.overlay = new Overlay({
          element: document.querySelector(`#ol-marker-${uid}`),
          positioning: 'center-center',
          stopEvent: true,
          ...attrs
        })
        parent.olMap.addOverlay(state.overlay)
      })
    }
    watch(() => attrs.position, (newValue) => {
      state.overlay.setPosition(newValue)
    })
    onMounted(() => {
      init()
    })
    return {
      uid,
      onClick: () => {
        emit('click', parent.olMap)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ol-marker {
}
</style>
