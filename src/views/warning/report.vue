<template>
  <div>
    <VueTitle>
      年度体检报告
      <a-button type="" slot="extra" size="small" @click="$router.go(-1)">返回</a-button>
    </VueTitle>
    <div class="pdf-toolbar">
      <a-row type="flex" align="middle">
        <a-button type="primary" icon="left" @click="prePage">上一页</a-button>
        <div class="pl10 pr10">{{ pageNum }} / {{ pageTotalNum }}</div>
        <a-button type="primary" @click="nextPage">下一页
          <a-icon type="right" />
        </a-button>
      </a-row>
    </div>
    <div class="main">
      <div class="pd10 pd50">

        <pdf :page="pageNum" :src="url" @progress="loadedRatio = $event" @num-pages="pageTotalNum=$event"></pdf>
      </div>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  data () {
    return {
      url: "http://image.cache.timepack.cn/nodejs.pdf",
      pageNum: 1,
      pageTotalNum: 1, // 总页数
      loadedRatio: 0, // 当前页面的加载进度，范围是0-1 ，等于1的时候代表当前页已经完全加载完成了
    }
  },
  mounted () {
  },
  methods: {
    // 上一页
    prePage () {
      let page = this.pageNum
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.pageNum = page
    },

    // 下一页
    nextPage () {
      let page = this.pageNum
      page = page < this.pageTotalNum ? page + 1 : 1
      this.pageNum = page
    }
  }
}

</script>

<style lang="less" scoped>
.main {
  background: #515558;
  padding: 0;
  height: calc(100vh - 44px - 60px);
  // 定义滑块
  &::-webkit-scrollbar-thumb {
    box-shadow: none;
    background: rgba(255, 255, 255, 0.2);
  }
  // 滚动条里面轨道
  &::-webkit-scrollbar-track {
    box-shadow: none;
  }
}
.pdf-toolbar {
  position: fixed;
  z-index: 9;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
