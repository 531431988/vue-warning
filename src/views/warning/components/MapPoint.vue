<template>
  <div class="map-point">
    <svg width="25px" height="28px" viewBox="0 0 25 28" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path d="M11.5,7.10542736e-15 C17.8512746,7.10542736e-15 23,5.14872538 23,11.5 C23,17.0315605 19.0945303,21.6509496 13.8905654,22.7511929 L11.5,26.819228 L9.10943461,22.7511929 C3.9054697,21.6509496 0,17.0315605 0,11.5 C0,5.14872538 5.14872538,7.10542736e-15 11.5,7.10542736e-15 Z"></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#07ACFF'
    }
  }
}
</script>

<style lang="less" scoped>
.map-point {
  color: inherit;
  cursor: pointer;
  line-height: 1;
}
</style>
