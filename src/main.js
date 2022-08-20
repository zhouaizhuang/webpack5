import { sum } from './js/count.js'
import './css/index.css'
import './css/index.scss'
import './css/index.less'
console.log(sum(1, 2))
export const sum1 = [1, 2, 3, 4, 5].reduce((p, c) => p + c, 0)


new Promise((resolve)=> {
  setTimeout(() => {
    alert('123')
    resolve('123')
  }, 1000)
})
// if (module.hot) {
//   // 判断是否支持热模块替换功能
//   module.hot.accept('./js/count', function (count) {
//     console.log('触发热更新了')
//     console.log(count)
//   })
// }