import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text
} from 'ol/style'

/* 
 定位
*/
export const getLocation = () => {
  let msg = ''
  if (navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;
        resolve([lng, lat], position)
      }, error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = '用户拒绝对获取地理位置的请求'
            break;
          case error.POSITION_UNAVAILABLE:
            msg = '位置信息是不可用的'
            break;
          case error.TIMEOUT:
            msg = '请求用户地理位置超时'
            break;
          case error.UNKNOWN_ERROR:
            msg = '未知错误'
            break;
        }
        reject(msg)
      })
    })
  } else {
    alert('该浏览器不支持获取地理位置')
  }
}

/*  设置WFS图层样式 */
export const setStyleByFeature = (feature, {
  strokeColor = '#52999B',
  strokeWidth = 1,
  fillColor = 'rgba(0, 0, 0, 0.2)',
  imageFillColor = '#52999B',
  imageRadius = 5,
  name,
  textFillColor = 'rgba(242, 242, 242, 0.8)'
}) => {
  var style = new Style({
    // 边线样式
    stroke: new Stroke({
      color: strokeColor,
      width: strokeWidth
    }),
    // 填充样式
    fill: new Fill({
      color: fillColor
    }),
    // 点样式
    image: new CircleStyle({
      fill: new Fill({
        color: imageFillColor
      }),
      radius: imageRadius
    }),
    // 文字标注样式
    text: new Text({
      font: '14px Calibri,sans-serif',
      text: name,
      fill: new Fill({
        color: textFillColor
      })
    })
  })
  feature.setStyle(style)
}