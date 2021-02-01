<template>
  <a-modal v-bind="$attrs" title="编辑指标监测周期" v-on="$listeners" :maskClosable="false" :destroyOnClose="true" :forceRender="true">
    <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" class="form-item-sm">
      <a-form-model-item label="指标编号">{{data.id}}</a-form-model-item>
      <a-form-model-item label="指标名称">{{data.name}}</a-form-model-item>
      <a-form-model-item label="设置周期">
        <a-row type="flex" :gutter="16">
          <a-col :span="24" class="mb10">
            <a-select v-model="cycle" :options="options" @change="onChange">
            </a-select>
          </a-col>
          <a-col :span="24" v-if="cycle === 1" class="mb10">
            <a-checkbox-group v-model="week" @change="onChange">
              <a-checkbox value="一">一</a-checkbox>
              <a-checkbox value="二">二</a-checkbox>
              <a-checkbox value="三">三</a-checkbox>
              <a-checkbox value="四">四</a-checkbox>
              <a-checkbox value="五">五</a-checkbox>
              <a-checkbox value="六">六</a-checkbox>
              <a-checkbox value="日">日</a-checkbox>
            </a-checkbox-group>
          </a-col>
          <a-col flex="1" v-if="cycle === 2">
            第
            <a-input-number v-model="day" :min="0" :max="31" @change="onChange" /> 天
          </a-col>
          <template v-if="cycle === 3">
            <a-col class="mb10">
              每年的第
              <a-input-number v-model="month" :min="0" :max="31" @change="onChange" /> 月
            </a-col>
            <a-col class="mb10">
              第
              <a-input-number v-model="day" :min="0" :max="31" @change="onChange" /> 天
            </a-col>
          </template>
          <a-col v-if="cycle < 4">
            <a-time-picker v-model="time" @change="onChange" />
          </a-col>
          <a-col v-else>
            <a-date-picker v-model="date" :disabled-date="disabledDate" show-time @change="onChange" />
          </a-col>
        </a-row>
      </a-form-model-item>
      <a-form-model-item label="监测周期">
        {{value || data.cycle }}
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>

import moment from 'moment';
export default {
  props: {
    data: Object
  },
  data () {
    return {
      options: [{
        label: '每天',
        value: 0
      }, {
        label: '每周',
        value: 1
      }, {
        label: '每月',
        value: 2
      }, {
        label: '每年',
        value: 3
      }, {
        label: '一次性',
        value: 4
      }],
      cycle: 0,
      day: 1,
      month: 1,
      time: moment(new Date(), 'HH:mm:ss'),
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      week: [],
      value: ''
    }
  },
  methods: {
    moment,
    disabledDate (current) {
      return current && current < moment().endOf('day');
    },
    onChange () {
      this.time = moment(new Date(), 'HH:mm:ss')
      const { cycle } = this
      if (cycle === 0) this.value = `每天 ${moment(this.time).format('HH:mm:ss')}`
      else if (cycle === 1) this.value = `每周 ${this.week.join()} ${moment(this.time).format('HH:mm:ss')}`
      else if (cycle === 2) this.value = `每月第${this.day}天 ${moment(this.time).format('HH:mm:ss')}`
      else if (cycle === 3) this.value = `每年第${this.month}月 第${this.day}天 ${moment(this.time).format('HH:mm:ss')}`
      else this.value = `一次性 ${moment(this.date).format('YYYY-MM-DD HH:mm:ss')}`
    }
  }
}
</script>

<style lang="less" scoped>
</style>
