<template>
  <a-empty v-bind="$attrs">
    <img src="@/assets/empty.png" slot="image" />
  </a-empty>
</template>

<script>

export default {
  name: 'Empty',
  components: {
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-empty-description {
  color: #999;
}
</style>
