export const add = (a, b) => a + b
export const primiseA = function (){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok')
    }, 2e3)
  })
}