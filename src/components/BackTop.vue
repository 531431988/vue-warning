<template>
  <a-back-top :target="target" />
</template>

<script>
export default {
  name: 'BackTop',
  props: {
    ele: {
      type: String,
      default: 'main'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    target () {
      return document.querySelector(`.${this.ele}`)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-back-top {
  right: 24px;
  bottom: 24px;
}
</style>
