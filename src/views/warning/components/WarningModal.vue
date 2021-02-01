<template>
  <a-modal v-bind="$attrs" v-on="$listeners" width="340px" title="边界预警" :destroyOnClose="true" :mask="false" cancelText="解除警情" okText="发送警情">
    <a-form-model class="form-item-sm" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <a-form-model-item label="数据来源"></a-form-model-item>
      <a-form-model-item label="项目名称"></a-form-model-item>
      <a-form-model-item label="所在区"></a-form-model-item>
      <a-form-model-item label="建设地点"></a-form-model-item>
      <a-form-model-item label="项目规模"></a-form-model-item>
      <a-form-model-item label="预警来源"></a-form-model-item>
      <a-form-model-item label="压占面积"></a-form-model-item>
      <a-form-model-item label="警情类型"></a-form-model-item>
      <a-form-model-item label="警情处理部门">
        <a-select>
          <a-select-option key="1" value="1">执法监察大队</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="警情处理建议">
        <a-textarea></a-textarea>
      </a-form-model-item>
      <a-form-model-item label="预警通知方式">
        <a-select>
          <a-select-option key="1" value="1">短信</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
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
</style>
