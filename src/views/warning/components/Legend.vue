<template>
  <div class="map-legend">
    <template v-if="type === 'detail'">
      <div class="tit">完成率分级图例</div>
      <div class="item">
        <span class="tag t-success">■</span>
        <span><span class="mr5">优秀</span> 100%及以上</span>
      </div>
      <div class="item">
        <span class="tag t-primary">■</span>
        <span><span class="mr5">良好</span> 80%(含)～100%</span>
      </div>
      <div class="item">
        <span class="tag t-warning">■</span>
        <span><span class="mr5">一般</span> 60%(含)～80%</span>
      </div>
      <div class="item">
        <span class="tag t-error">■</span>
        <span><span class="mr5">较差</span> 60%以下</span>
      </div>
    </template>
    <template v-else>
      <div class="tit">图例</div>
      <div class="item">
        <span class="tag t-error">■</span>
        <span>核心区</span>
      </div>
      <div class="item">
        <span class="tag t-warning">■</span>
        <span>一般保护区</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    type: String
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
.map-legend {
  position: absolute;
  left: 20px;
  bottom: 100px;
  background: #ffffff;
  border-radius: 2px;
  padding: 16px;
  .tit {
    font-weight: 600;
    color: #333333;
  }
  .item {
    margin-top: 5px;
    color: #666666;
    line-height: 1;
    > span {
      display: inline-block;
      vertical-align: -2px;
    }
    .tag {
      font-size: 22px;
      margin-right: 5px;
    }
  }
}
</style>
