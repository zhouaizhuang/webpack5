import { createRouter, createWebHistory} from "vue-router"
const r = require.context('./modules', true, /\.js/)
export const localRouteList = r.keys().reduce((prev, item) => {
  const routeItem = r(item).default
  return Array.isArray(routeItem) ? [...prev, ...routeItem] : [...prev, routeItem]
}, [])
const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/index',
    meta: { title: '首页', token: true, isShow: false }, // isShow代表前端控制的是否显示在前台UI菜单上
  },
  {
    path: '/login',
    name: 'login',
    meta: {title: '登录', token: false, isShow: false },
    component: () => import('../views/login/index.vue')
  },
  ...localRouteList
]



export default createRouter({
  history: createWebHistory(),
  routes
})
