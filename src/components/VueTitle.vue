<template>
  <div class="vui-typography" v-bind="$attrs">
    <div class="vui-title">
      <slot name="icon" v-if="$slots.icon"></slot>
      <i v-else :class="`${$attrs.icon}`"></i>
      <slot></slot>
    </div>
    <div class="vui-title-extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueTitle',
  data () {
    return {

    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="less">
.vui-typography {
  padding: 10px;
  font-size: 14px;
  color: #333333;
  display: flex;
  align-items: center;
  background: #f2f3f9;
  .icon {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
  }
  .vui-title {
    font-size: 16px;
    font-weight: 600;
    flex: 1;
    align-content: center;
    &-extra {
    }
  }
}
</style>
