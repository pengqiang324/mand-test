const path = require('path')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')

const resolve = file => path.resolve(__dirname, file)
module.exports = {
  css: {
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
          resolve('./src/assets/theme.custom')
        ]
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5,
            propList: [],
            minPixelValue: 2
          }),
          require('autoprefixer')()
        ]
      },
      less: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          'hack': `true; @import "${path.join(__dirname, 'src/assets/styles/resetLess.less')}";`
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
}
