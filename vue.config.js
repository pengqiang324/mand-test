const path = require('path')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')
const UglifyPlugin = require('uglifyjs-webpack-plugin')  // 去除打印信息（console）
const CompressionPlugin = require("compression-webpack-plugin") // 开启gizp压缩
const resolve = file => path.resolve(__dirname, file)
let { version, openGzip } = require('./package.json')
version = version.replace(/\./g, '_')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'rongyi-test-v2.0',
  css: {
    extract: true,   // 样式抽离
    loaderOptions: {
      stylus: {
        use: [
          poststylus([
            pxtorem({
              rootValue: 100,
              propWhiteList: [],
              minPixelValue: 2
            }),
            'autoprefixer'
          ])
        ],
        import: [
          resolve('./src/assets/theme.custom'),
          resolve('./src/assets/styles/setting')  //引入stylus全局变量
        ]
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 50,
            propList: ['*'],
          }),
          require('autoprefixer')()
        ]
      },
      less: {
        modifyVars: {
          // 自定制vant主题
          'picker-action-text-color': '#ff6f00',
          'action-sheet-description-color': '#ff6f00',
          'action-sheet-description-font-size': '17px',
          'search-padding': '10px 0'
        }
      }
    }
  },
  transpileDependencies: [
    'mand-mobile'
  ],
  chainWebpack: config => {
    config.resolve.alias
      // key,value自行定义，比如.set('@assets', resolve('src/assets'))
      .set('svg', resolve('src/icons/svg'))  
      .set('components', resolve('src/components'))    
      config.plugins.delete('prefetch') // 为了首页加速，来源关网
      
     config.module.rules.delete("svg");
     config.module
      .rule("svg-smart")
      .test(/\.svg$/)
      .include.add(resolve("src/icons/svg")) //svg目录 
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "[name]"
      });
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      // 性能提示
      config.performance = {
        hints:'warning',
        //入口起点的最大体积 整数类型（以字节为单位）
        maxEntrypointSize: 50000000,
        //生成文件的最大体积 整数类型（以字节为单位 300k）
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js');
        }
      }

      // 将每个依赖包打包成单独的js文件 splitChunks 优化chunk-vendors.js文件体积过大
      let optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        },
        minimizer: [new UglifyPlugin({
          uglifyOptions: {
              warnings: false,
              compress: {
                // drop_console: true, // console
                // drop_debugger: false,
                // pure_funcs: ['console.log'] // 移除console
              }
          }
        })]
      }
      Object.assign(config, {
        optimization,
        output:{
          ...config.output,
          filename: `js/[name].[chunkhash].${version}.js`,
          chunkFilename: `js/[name].[chunkhash].${version}.js`
        },
      })

      // gizp压缩
      if(openGzip){
        config.plugins = [
          ...config.plugins,
          new CompressionPlugin({
            test:/\.js$|\.html$|.\css/, //匹配文件名
            threshold: 10240,//对超过10k的数据压缩
            deleteOriginalAssets: false //不删除源文件
          })
        ]
      }
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
  },
  productionSourceMap: false,
  devServer: {
    open: false,
    // disableHostCheck: true,  // 关闭主机检测
    // 跨域
    proxy: {
     [process.env.VUE_APP_BASE_API]: {
      target: process.env.VUE_APP_BASE_URL,
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/dev-api': '',
      },
     }
    }
   }
}
