<template>
  <a-card :title="title" :bordered="false" :loading="loading" :bodyStyle="{padding: loading ? '24px' : '24px 24px 0'}">
    <template #extra>
      <a-row :gutter="24" type="flex" align="middle">
        <a-col>
          <a-radio-group v-model="value" @change="onLoadData">
            <a-radio-button value="a">
              约束性指标监测预警(20/40)
            </a-radio-button>
            <a-radio-button value="b">
              预期性指标监测预警(20/40)
            </a-radio-button>
            <a-radio-button value="c">
              建议性指标监测预警(20/40)
            </a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col>
          <a-input-search placeholder="请输入指标名称" allowClear enter-button @search="onSearch" />
        </a-col>
      </a-row>
    </template>
    <a-row :gutter="24">
      <Empty v-if="!list.length" />
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" :xxl="6" v-for="(item, index) in list" :key="index">
        <Animated :delay="`${index / 20}s`" name="fadeInDown">
          <router-link :to="`/warning/detail?id=${item.id}`">
            <a-card size="small" :hoverable="true" :title="item.title" style="margin-bottom: 24px;">
              <span slot="extra">
                <WarningState :text="true" :state="item.state" />
              </span>
              <div class="mb10">
                <countTo class="vue-count-to" :startVal="0" :endVal="item.value" :decimals="2" />
                <span class="t-grey">监测值</span>
              </div>
              <a-space direction="vertical" :size="5" style="width: 100%">
                <div v-for="(v, i) of item.data" :key="`v-${i}`">
                  <span class="t-grey">{{v.label}}：</span>
                  <b>{{v.value}}</b>
                </div>
              </a-space>
            </a-card>
          </router-link>
        </Animated>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { getNormList } from '@/api/warning'
export default {
  components: {
    countTo: () => import('vue-count-to'),
  },
  data () {
    return {
      value: 'a',
      loading: true,
      list: [],
      title: '指标监测预警'
    }
  },
  created () {
    this.onLoadData()
  },
  methods: {
    onLoadData () {
      this.loading = true
      getNormList().then(res => {
        const { code, data, msg } = res
        if (code === 200) {
          this.list = data
          const warning = data.filter(item => item.state !== '正常').length
          this.title = `指标监测预警（${warning}/${data.length}）`
          this.loading = false
        } else {
          this.$message.error(msg)
        }
      })
    },
    onSearch () {
      this.onLoadData()
    }
  }
}
</script>

<style lang="less" scoped>
.vue-count-to {
  font-size: 24px;
}
</style>
