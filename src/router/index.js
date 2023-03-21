import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载子组件 路由懒加载实现
const Home = ()=> import('@/views/home/Home')
const Category = ()=>import('@/views/category/Category')
const Profile = ()=>import('@/views/profile/Profile')
const Cart = ()=>import('@/views/cart/Cart')
const Detail = ()=>import('views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

//抽取routes  
const routes =[ // 配置路由映射
  {
    path: '',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    // 方法一 动态路由传递参数
    // path:'/detail/:id',
    // 方法二： 
    path:'/detail',
    component:Detail
  }
]

// 2.创建router实例对象
const router =new VueRouter({
  routes,
  mode:'history' //默认模式是hash
})

// 3.导出router
export default router