
<template>
  <div class="time-line">

    <swiper class="swiper" ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in 10" :key="item">
        <div class="item" @click="onClick(index)">
          199{{item}}
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev" @click="onSlidePrev"></div>
      <div class="swiper-button-next" slot="button-next" @click="onSlideNext"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.min.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        initialSlide: 4,
        slidesPerView: 5,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    onClick (i) {
      this.swiper.slideTo(i)
    },
    onSlidePrev () {
      this.swiper.slidePrev()
    },
    onSlideNext () {
      this.swiper.slideNext()

    }
  }
}
</script>

<style lang="scss" scoped>
.time-line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.31));
  padding: 24px 32px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 150px;
    z-index: 0;
    pointer-events: none;
  }

  .swiper {
    width: 100%;
    &::after {
      content: "";
      position: absolute;
      left: 50px;
      right: 50px;
      bottom: 0;
      height: 4px;
      pointer-events: none;
      background: #fff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      z-index: 0;
    }
    .swiper-button-prev,
    .swiper-button-next {
      top: inherit;
      bottom: 0;
      color: rgba(255, 255, 255, 0.5);
      &::after {
        font-size: 16px;
        font-weight: 700;
      }
    }
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: bold;
      font-size: 14;
      margin-bottom: 40px;
      color: #fff;
      .item {
        cursor: pointer;
        margin-bottom: 5px;
      }
      &.swiper-slide-active {
        position: relative;
        .item {
          font-size: 16px;
        }
        &::before {
          content: "";
          position: absolute;
          width: 20px;
          height: 32px;
          left: 50%;
          transform: translateX(-50%);
          bottom: -6px;
          z-index: 99;
          background: url("../../../assets/timeline-active.png") no-repeat
            center;
        }
      }
    }
  }
}
</style>