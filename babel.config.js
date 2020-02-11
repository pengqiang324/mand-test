module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'mand-mobile',
        libraryDirectory: 'components'
      },
    ],
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: name => `${name}/style/less`
      },
      'vant'
    ]
  ],
  env: {
    development: {
      plugins: ['dynamic-import-node']  // 开发环境热更新慢解决插件
    }
  }
}
