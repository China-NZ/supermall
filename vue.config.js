const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// 项目路径别名命名
module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        "assets":"@/assets",
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  },
}