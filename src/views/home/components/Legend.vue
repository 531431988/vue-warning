<template>
  <div class="legend">
    <transition-group name="fadeRight">
      <template v-if="type === 'bar'">
        <BarSvgIcon key="1" title="重度预警" fill="#FA6E6B" startColor="#FD9695" endColor="#FA6E6B" />
        <BarSvgIcon key="2" title="临界预警" fill="#FFB53A" startColor="#FFCE79" endColor="#FFB53A" />
        <BarSvgIcon key="3" title="正常状态" fill="#2A88F0" startColor="#54BDF9" endColor="#2A88F0" />
      </template>
      <template v-if="type === 'pie'">
        <PieSvgIcon key="4" title="管控边界预警" />
        <PieSvgIcon key="5" fill="#D7B61B" startColor="#F3E292" endColor="#EDC91F" title="约束性指标预警" />
      </template>
    </transition-group>
  </div>
</template>

<script>
const BarSvgIcon = {
  props: {
    title: String,
    fill: {
      type: String,
      default: '#DA7540'
    },
    startColor: {
      type: String,
      default: '#FFB993'
    },
    endColor: {
      type: String,
      default: '#FF8748'
    },
  },
  render () {
    return (
      <div class="svg-icon">
        <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="64.9794786%" y1="97.1048886%" x2="64.9794786%" y2="5.42379414%" id={`linearGradient-bar-${this._uid}`}>
              <stop stop-color={this.startColor} offset="0%"></stop>
              <stop stop-color={this.endColor} offset="100%"></stop>
            </linearGradient>
          </defs>
          <polygon fill={`url(#linearGradient-bar-${this._uid})`} points="0.0710678119 3.07106781 7.07106781 6.02576539 7.07106781 18.0257654 0.0710678119 15.0710678"></polygon>
          <polygon fill={`url(#linearGradient-bar-${this._uid})`} transform="translate(10.571068, 10.548417) scale(-1, 1) translate(-10.571068, -10.548417) " points="7.07106781 3.07106781 14.0710678 6.02576539 14.0710678 18.0257654 7.07106781 15.0710678"></polygon>
          <polygon fill={this.fill} points="7.07106781 -6.21434907e-14 14.1421356 3.07106781 7.07106781 6.14213562 0 3.07106781"></polygon>
        </svg>
        <span class="legend-title">{this.title}</span>
      </div>
    )
  }
}
const PieSvgIcon = {
  props: {
    title: String,
    fill: {
      type: String,
      default: '#DA7540'
    },
    startColor: {
      type: String,
      default: '#FFB993'
    },
    endColor: {
      type: String,
      default: '#FF8748'
    },
  },
  render () {
    return (
      <div class="svg-icon">
        <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="0%" y1="11.3943797%" x2="100%" y2="50%" id={`linearGradient-pie-${this._uid}`}>
              <stop stop-color={this.startColor} offset="0%"></stop>
              <stop stop-color={this.endColor} offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            d="M17.5909096,5.02597416 L17.5909096,12.1043657 L17.5901917,12.1168305 C17.5293984,14.8626974 13.6151459,17.0779225 8.79545478,17.0779225 C4.26830792,17.0779225 0.540019427,15.1234543 0.0537195763,12.6105924 L0,12.6103899 L0,5.02597416 L17.5909096,5.02597416 Z"
            fill={this.fill}></path>
          <path
            d="M0.474088154,3.39394701 L16.7532472,7.16741297 C15.3330676,8.85240889 12.287426,10.0519483 8.79545478,10.0519483 C8.24030101,10.0519483 7.69716011,10.0225579 7.17053729,9.96635141 L6.7787377,9.91920876 C6.32541576,9.85843686 5.88560279,9.77762668 5.46231691,9.67850286 L5.10361828,9.58909484 C2.09027998,8.79168822 0,7.04832006 0,5.02597416 C0,4.52519904 0.154967016,3.99604021 0.398453179,3.53133284 L0.474088154,3.39394701 Z M8.79545478,0 C10.1833392,0 11.4961432,0.183690227 12.663473,0.510845802 L13.0092374,0.61325621 C15.7393121,1.46632756 17.5909096,3.12258979 17.5909096,5.02597416 C17.5909096,5.7408171 17.3297446,6.42080385 16.8589636,7.03647792 L16.7548924,7.16741297 L0.474088154,3.39394701 C1.6598641,1.41928747 4.93760363,0 8.79545478,0 Z"
            fill={`url(#linearGradient-pie-${this._uid})`}></path>
        </svg>
        <span class="legend-title">{this.title}</span>
      </div>
    )
  }
}
export default {
  props: {
    type: {
      type: String,
      default: 'bar'
    }
  },
  components: {
    PieSvgIcon,
    BarSvgIcon
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
.legend {
  position: absolute;
  right: 20px;
  bottom: 20px;
  /deep/ .svg-icon {
    margin-top: 10px;
  }
  /deep/ .legend-title {
    color: rgba(255, 255, 255, 0.64);
    margin: -2px 0 0 4px;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
