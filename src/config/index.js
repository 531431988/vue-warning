/**
 * 项目默认配置项
 * primaryColor - 默认主题色
 * api - 接口地址
 *
 */
export default {
  api: process.env.VUE_APP_BASE_API,
  upload: process.env.VUE_APP_BASE_API,
  funcs: [{
      "funcid": "DWH000000",
      "funcpath": "",
      "funccode": "jcyj",
      "funcname": "国土空间规划监测评估预警系统",
      "functype": "application",
      // "description": "Demo management system",
      "icon": "ic-logo"
    }, {
      "funcid": "DWH010000",
      "funcpid": "DWH000000",
      "funccode": "jczl",
      "funcpath": "",
      "funcname": "监测总览",
      "functype": "vue",
      "url": "OcvJcyjViewJczl",
      "icon": "ic-yujing"
    },
    {
      "funcid": "DWH010001",
      "funcpid": "DWH000000",
      "funccode": "warning",
      "funcpath": "",
      "funcname": "监测预警",
      "functype": "vue",
      "url": "OcvJcyjViewJcyj",
      "icon": "ic-jcyj"
    },
    {
      "funcid": "DWH010002",
      "funcpid": "DWH000000",
      "funccode": "tjpg",
      "funcpath": "",
      "funcname": "体检评估总览",
      "functype": "vue",
      "url": "OcvJcyjViewTjpg",
      "icon": "ic-tjzl"
    },
    {
      "funcid": "DWH010003",
      "funcpid": "DWH000000",
      "funccode": "dtjc",
      "funcpath": "",
      "funcname": "体检评估填报",
      "functype": "vue",
      "url": "OcvJcyjViewTjtb",
      "icon": "ic-tjpgtb"
    },
    {
      "funcid": "DWH010004",
      "funcpid": "DWH000000",
      "funccode": "cssz",
      "funcpath": "",
      "funcname": "参数设置",
      "functype": "vue",
      "url": "OcvJcyjViewCssz",
      "icon": "ic-cssz"
    },
  ],
  userinfo: {
    "userid": "USER0000000",
    "username": "admin",
    "password": "888888",
    "personname": "研发中心",
    "mobile": "17786140000",
    "phone": "027-8888888",
    "icon": "",
    "description": "***信息技术股份有限公司",
    "ctime": "2020-07-20 16:59:19",
    "seqno": 99999.0,
    "enable": "1",
    "credential": "000000b6d05d3710efea1b61b4aa6a8d",
    "session": "00000088-875b-4ccc-97bf-2fb0af698057",
    "info": {
      "org": {
        "orgid": "1163736161039556610",
        "orgcode": "org",
        "orgname": "组织机构"
      },
      "xzq": {
        "xzqid": "1163737222676619266",
        "xzqcode": "420000",
        "xzqname": "湖北省"
      },
      "admin": {
        "adminid": "1163740041206964226",
        "admincode": "admin",
        "adminname": "系统管理员"
      }
    }
  }
}