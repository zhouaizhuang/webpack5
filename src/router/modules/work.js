export default [
  {
    path: '/index',
    name: 'index',
    meta: {title: '工作台', token: true, isShow: true },
    component: () => import(/* webpackChunkName: "dashboard" */'../../views/index/index.vue')
  },
]