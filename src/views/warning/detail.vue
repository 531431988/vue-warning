<template>
  <div>
    <VueTitle>
      生态保护红线
      <a-button type="" slot="extra" size="small" @click="$router.go(-1)">返回</a-button>
    </VueTitle>
    <a-row type="flex" align="middle" class="multi-column-contour">
      <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" :xxl="4">
        <WarningTree :data="treeData" />
      </a-col>
      <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" :xxl="20">
        <Map />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getWarningTree } from '@/api/warning'

export default {
  components: {
    WarningTree: () => import('@/components/WarningTree'),
    Map: () => import('./components/Map')
  },
  data () {
    return {
      treeData: []
    }
  },
  created () {
    getWarningTree().then(res => {
      this.treeData = res.data
    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
