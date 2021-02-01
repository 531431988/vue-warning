<template>
  <span :class="`warning-state-${type} warning-state-${size}`">
    <i class="icon-ic-yujing warning-state-icon" :class="`state-${warningStateList[state]}`"></i>
    <span v-if="text" :class="`state-text-${warningStateList[state]}`">{{state}}</span>
  </span>
</template>

<script>
import { warningStateList } from '@/libs/common'
export default {
  name: 'WarningState',
  props: {
    state: String,
    type: String,
    text: Boolean,
    size: String
  },
  data () {
    return {
      warningStateList
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.warning-state-large {
  .warning-state-icon {
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
  }
}
.warning-state-icon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  margin-right: 8px;
  line-height: 20px;
}
.state-normal {
  background: #e9edff;
}
.state-normal,
.state-text-normal {
  color: @primary-color;
}
.state-warning {
  background: #ffedd8;
}
.state-warning,
.state-text-warning {
  color: @warning-color;
}
.state-sever-warning {
  background: #ffe5e5;
}
.state-sever-warning,
.state-text-sever-warning {
  color: @error-color;
}
.warning-state-linear {
  .warning-state-icon {
    color: #fff;
  }
  .state-normal {
    background: linear-gradient(180deg, #54bdf9 0%, #2a88f0 100%);
  }
  .state-warning {
    background: linear-gradient(180deg, #ffce79 0%, #ffb53a 100%);
  }
  .state-sever-warning {
    background: linear-gradient(180deg, #fd9695 0%, #fa6e6b 100%);
  }
  .state-text-normal {
    color: #4eb6f8;
  }
  .state-text-warning {
    color: #ffb53a;
  }
  .state-text-sever-warning {
    color: #fa6e6b;
  }
}
</style>
