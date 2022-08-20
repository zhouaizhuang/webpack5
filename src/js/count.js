// 求和
export const sum = function(...args){
  return args.reduce((prev, item) => {
    return prev + item + 1
  }, 0)
}