export default {
  loading: {
    text: '加载中',
    color: '#4179B3',
    textColor: '#4179B3',
    maskColor: 'rgba(255, 255, 255, 0.1)'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  gradient(dir, start = '', end = '', type = 'linear') {
    return {
      color: {
        type,
        ...dir,
        colorStops: [{
          offset: 0,
          color: start // 0% 处的颜色
        }, {
          offset: 1,
          color: end // 100% 处的颜色
        }]
      }
    }
  }
}