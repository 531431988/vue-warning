import {
  axios
} from '@/libs/request'
//参数设置-预警树	
export const getWarningTree = data => {
  return axios({
    url: '/setting/warning-tree',
    method: 'post',
    data
  })
}

//参数设置-监测预警标准设置-管制边界表格
export const getWarningBoundaryTable = data => {
  return axios({
    url: '/setting/warning-boundary-table',
    method: 'post',
    data
  })
}
//参数设置-监测预警标准设置-指标表格
export const getWarningNormTable = data => {
  return axios({
    url: '/setting/warning-norm-table',
    method: 'post',
    data
  })
}