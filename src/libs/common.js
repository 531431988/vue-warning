// 预警状态
export const warningStateList = {
  '正常': 'normal',
  '预警': 'warning',
  '临界预警': 'warning',
  '重度预警': 'sever-warning',
}

/*  根据编码初始化数据中心点坐标
* target 目录数组
* source 源数据
* key    字段名称
* return 带坐标的新数据
*/
export const setCenter = (target, source, key = 'code') => {
  let arr = []
  target.forEach(item => {
    const [data] = source.filter(node => node[key] === item[key])
    arr.push({
      center: data.center,
      ...item,
    })
  })
  return arr
}