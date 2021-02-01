<template>
  <div class="main">
    <Animated name="fadeInDown">
      <a-row type="flex" justify="end">
        <a-col>
          <a-space>
            <router-link to="/warning/report">
              <a-button type=""><i class="icon-ic-scbg mr5"></i>生成预警报告</a-button>
            </router-link>
            <a-button type="primary">指标动态监测</a-button>
          </a-space>
        </a-col>
      </a-row>
    </Animated>
    <a-row :gutter="16">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <Animated name="fadeInLeft">
          <CardPieChart title="管控边界监测预警" :chart="boundaryChart" />
        </Animated>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <Animated name="fadeInRight">
          <CardPieChart title="指标监测预警" :chart="normChart" icon />
        </Animated>
      </a-col>
    </a-row>
    <a-space direction="vertical" size="middle" style="width: 100%">
      <Animated name="fadeInUp">
        <BoundaryCard />
      </Animated>
      <Animated name="fadeInUp">
        <NormCard />
      </Animated>
    </a-space>
  </div>
</template>

<script>
export default {
  components: {
    CardPieChart: () => import('./components/CardPieChart'),
    BoundaryCard: () => import('./components/BoundaryCard'),
    NormCard: () => import('./components/NormCard'),
  },
  data () {
    return {
      boundaryChart: {
        title: '监测个数',
        data: [{
          name: '正常个数',
          value: 1
        }, {
          name: '预警个数',
          value: 6
        }]
      },
      normChart: {
        title: '监测指标个数',
        data: [{
          name: '正常指标个数',
          value: 20
        }, {
          name: '预警指标个数',
          value: 20
        }]
      },

    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.main {
  /deep/ .ant-card-head-title {
    font-weight: 600;
  }
  /deep/ .ant-card-body {
    overflow: hidden;
  }
}
</style>
