<template>
  <a-row class="min-card" type="flex" align="middle" justify="space-between">
    <a-col>
      <div>{{data.title}}</div>
      <countTo class="number" :startVal="0" :endVal="data.total" />
      <span class="t-success" v-if="data.yesterday">昨日 {{data.yesterday > 0 ? '+'+data.yesterday : data.yesterday}}</span>
    </a-col>
    <a-col>
      <WarningState :class="`warning warning-state-${state}`" size="large" />
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: {
    data: Object,
    state: [String, Number]
  },
  components: {
    countTo: () => import('vue-count-to'),
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
.min-card {
  background: rgba(45, 50, 90, 1);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  color: #fff;
  .number {
    font-size: 32px;
  }
  .warning {
    display: block;
    text-align: center;
    /deep/ .warning-state-icon {
      margin-right: 0;
      height: 40px;
      width: 40px;
      line-height: 40px;
    }
    border-radius: 4px;
    &-state-1 {
      background: linear-gradient(180deg, #54bdf9 0%, #2a88f0 100%);
    }
    &-state-2 {
      background: linear-gradient(180deg, #ffce79 0%, #ffb53a 100%);
    }
    &-state-3 {
      background: linear-gradient(180deg, #fd9695 0%, #fa6e6b 100%);
    }
    &-state-4 {
      background: linear-gradient(180deg, #ffb993 0%, #ff8748 100%);
    }
    &-state-5 {
      background: linear-gradient(180deg, #f3e292 0%, #edc91f 100%);
    }
  }
}
</style>
