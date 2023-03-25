import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'

// 自己写的封装的插件
import toast from 'components/common/toast/Toast'

Vue.config.productionTip = false

// 新增的原型链 把vue实例赋值给$bus
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

// 使用懒加载的插件,并且添加参数[对应的图片，没加载之前]
Vue.use(VueLazyload,{
  loading:require('./assets/images/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
