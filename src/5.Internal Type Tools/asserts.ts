// 类型断言守卫
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg)
  }
}
let name: any = 'linbudu'

assert(typeof name === 'string', '类型错误')
console.log(name)
// deadCode
console.log('error')

export {}
