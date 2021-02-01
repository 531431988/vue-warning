import {
  axios
} from '@/libs/request'
// 管控边界监测预警
export const getBoundaryList = data => {
  return axios({
    url: '/boundary-list',
    method: 'post',
    data
  })
}
// 指标监测预警
export const getNormList = data => {
  return axios({
    url: '/norm-list',
    method: 'post',
    data
  })
}
//监测预警-详情-预警树	
export const getWarningTree = data => {
  return axios({
    url: '/warning/detail/warning-tree',
    method: 'post',
    data
  })
}

// 监测预警-详情-地图区域
export const getWarningMapArea = () => {
  return axios({
    url: `http://192.168.3.235:32080/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3Adltb_0&maxFeatures=50&outputFormat=application%2Fjson&SRSNAME=EPSG:4490&CQL_FILTER=bsm%20=%20%27420682211000058804%27%20or%20bsm%20=%20%27420682211005313587%27`,
    method: 'get'
  })
}

//监测预警-详情-地图统计	
export const getWarningMapStatistics = data => {
  return axios({
    url: '/warning/detail/warning-map-statistics',
    method: 'post',
    data
  })
}

//监测预警-详情-区域分布-图表		
export const getWarningRegionalBar = data => {
  return axios({
    url: '/warning-detail/regional-bar',
    method: 'post',
    data
  })
}

//监测预警-详情-区域分布-图表		
export const getWarningRegional = data => {
  return axios({
    url: '/warning-detail/regional',
    method: 'post',
    data
  })
}

//监测预警-详情-趋势分析	
export const getWarningTrend = data => {
  return axios({
    url: '/warning-detail/trend',
    method: 'post',
    data
  })
}

// 天地图-地名搜索
export const tdSearch = ({keyWord, }) => {
  return axios({
    url: `http://api.tianditu.gov.cn/search?postStr={"keyWord":"${keyWord}","level":"15","mapBound":"-180,-90,180,90","queryType":"7","count":"1","start":"0","queryTerminal":"10000"}&type=query&tk=93a5f950625e10e69f714fe05a41dab1`,
    method: 'get'
  })
}