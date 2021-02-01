import {
  axios
} from '@/libs/request'
// 预警状态专题图
export const getWarningOverviewMapBarCharts = data => {
  return axios({
    url: '/overview-map-bar-charts',
    method: 'post',
    data
  })
}
// 监测预警-预警类型专题图
export const getWarningOverviewMapPieCharts = data => {
  return axios({
    url: '/overview-map-pie-charts',
    method: 'post',
    data
  })
}


// 获取图表数据
export const getWarningOverviewCharts = data => {
  return axios({
    url: '/overview-charts',
    method: 'post',
    data
  })
}

export const getMapWFS = () => {
  return axios({
    url: 'http://192.168.3.235:32080/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3Axzxzq_0&maxFeatures=50&outputFormat=application%2Fjson&SRSNAME=EPSG:4490',
    method: 'get'
  })
}