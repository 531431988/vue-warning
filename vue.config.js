const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const env = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, dir)
// 在某大佬的OCV“框架”，宇宙无敌NBB的COPY大杂烩“框架”基础上修改了原来LB的配置方式，引用的东西还是保持原来的没做修改，后来的人可以将UI框架实现按需引用等优化办法，我懒！几行CSS就能解决的问题非要全量引入一个UI框架，大佬操作小弟看不懂抱歉
const assetsCDN = {
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    // 某大佬的OCV“框架”，宇宙无敌NBB的COPY大杂烩“框架”（不懂一个PC端为什么要引入vant小弟不才，后来的大佬有兴趣可以改一下，我懒）
    'element-ui': 'ELEMENT',
    'vuetify': 'Vuetify',
    'iview': 'iview',
    'vant': 'vant'
  },
  css: [
    './static/cdn/element-ui/index.css',
    './static/cdn/iview/iview.css',
    './static/cdn/vant/index.css',
    './static/cdn/vuetify/vuetify.min.css',
    // 某大佬的OCV“框架”，宇宙无敌NBB的COPY大杂烩“框架”（引用一堆辣鸡图标，管你用不用我就是要引怎么不服吗？）
    './static/cdn/ocv-icon/iconfont.css',
    './static/cdn/ocv-icon/font-awesome.min.css',
    './static/cdn/ocv-icon/material-design-icons.css',
  ],
  js: [
    env ? './static/cdn/vue/prod/vue.min.js' : './static/cdn/vue/dev/vue.js',
    './static/cdn/vue-router/vue-router.js',
    './static/cdn/vuex/vuex.min.js',
    './static/cdn/axios/axios.min.js',
    // 某大佬的OCV“框架”，宇宙无敌NBB的COPY大杂烩“框架”（2021年了我还是很爱JQ）
    './static/cdn/jquery/jquery.min.js',
    './static/cdn/element-ui/index.js',
    './static/cdn/iview/iview.min.js',
    './static/cdn/vant/vant.min.js',
    './static/cdn/vuetify/vuetify.min.js',
  ]
}
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: env ? false : true,
  /*   pages: {
      index: {
        // page 的入口
        entry: './src/main.js',
        // 模板来源
        template: 'public/index.html',
        // 输出文件名
        filename: 'index.html'
      }
    }, */

  transpileDependencies: [],
  configureWebpack: config => {
    config.externals = assetsCDN.externals
    if (env) {
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      const plugins = []
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        }),
        new FileManagerPlugin({
          events: {
            onEnd: {
              delete: [
                `./${process.env.VUE_APP_OUTPUTDIR}.zip`
              ],
              archive: [{
                source: `./${process.env.VUE_APP_OUTPUTDIR}`,
                destination: `./${process.env.VUE_APP_OUTPUTDIR}.zip`
              }]
            }
          }
        })
      )
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@ant-design/icons/lib/dist$', resolve('./icons.js'))
    if (env) {
      // 解决低版本浏览器 es567错误问题
      // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
      // 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来

      config.module.rule('compile')
        .test(/\.js$/)
        .include
        .add(resolve('src'))
        .add(resolve('node_modules'))
        .end()
        .use('babel')
        .loader('babel-loader')
        .options({
          presets: [
            ['@babel/preset-env', {
              modules: false
            }]
          ]
        });
    }
    config.plugin('html').tap(args => {
      args[0].cdn = assetsCDN
      return args
    })

    return config
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    },
    extract: false
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('./src/less/theme.less')]
    }
  },
  devServer: {
    proxy: {
      'anymock/': {
        target: 'https://anymock.alipay.com/direct-mock/http/125700065',
        changOrigin: true,
        pathRewrite: {
          '^/anymock': ''
        }
      }
    }
  }
}