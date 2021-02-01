<template>
  <a-card :title="title" :bordered="false" :loading="loading" :bodyStyle="{padding: loading ? '24px' : '24px 24px 0'}">
    <a-row :gutter="24">
      <Empty v-if="!list.length" />
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" :xxl="6" v-for="(item, index) in list" :key="index">
        <Animated :delay="`${index / 20}s`" name="fadeInDown">
          <router-link :to="`/warning/detail?id=${item.id}`">
            <a-card size="small" :hoverable="true" :title="item.title" style="margin-bottom: 24px;">
              <span slot="extra">
                <WarningState :text="true" :state="item.state" />
              </span>
              <div :style="`padding: ${item.state === '正常' ? '10px 10px 11px' : 0}`">
                <template v-if="item.state !== '正常' ">
                  <span class="t-grey mr10">警情项目：</span><b>{{item.project}} 个</b>
                  <span class="t-grey">警情项目规模：</span><b>{{item.scale}} 公顷</b>
                </template>
              </div>
            </a-card>
          </router-link>
        </Animated>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { getBoundaryList } from '@/api/warning'
export default {
  components: {

  },
  data () {
    return {
      list: [],
      title: '管控边界监测预警',
      loading: true
    }
  },
  created () {
    this.loading = true
    getBoundaryList().then(res => {
      const { code, data, msg } = res
      if (code === 200) {
        this.list = data
        const warning = data.filter(item => item.state !== '正常').length
        this.title = `管控边界监测预警（${warning}/${data.length}）`
        this.loading = false
      } else {
        this.$message.error(msg)
      }
    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
