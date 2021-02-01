<template>
  <u-animate-container>
    <u-animate :name="name" :delay="delay" :duration="duration" :iteration="iteration" :offset="offset" animateClass="animated" :begin="begin">
      <slot></slot>
    </u-animate>
  </u-animate-container>
</template>

<script>
import { UAnimateContainer, UAnimate } from 'vue-wow'
export default {
  name: 'Animated',
  props: {
    name: {
      type: String,
      default: ''
    },
    delay: {
      type: String,
      default: '0s'
    },
    duration: {
      type: String,
      default: '1s'
    },
    iteration: {
      type: Number,
      default: 1
    },
    offset: {
      type: Number,
      default: 100
    },
    begin: {
      type: Boolean,
      default: true
    },
    el: String
  },
  components: {
    UAnimateContainer, UAnimate
  }
}
</script>

<style lang="less" scoped>
</style>
