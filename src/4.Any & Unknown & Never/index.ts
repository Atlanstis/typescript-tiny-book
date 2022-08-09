// any
function log(message?: any, ...optionalParams: any[]): void

// any
let foo
// foo、bar 均为 any
function func(foo, bar) {}

// 被标记为 any 类型的变量可以拥有任意类型的值
let anyVar: any = 'linbudu'

anyVar = false
anyVar = 'linbudu'
anyVar = {
  site: 'juejin'
}
anyVar = () => {}

// 标记为具体类型的变量也可以接受任何 any 类型的值
const val1: string = anyVar
const val2: number = anyVar
const val3: () => {} = anyVar
const val4: {} = anyVar

// 对 any 的任何操作跳过检查
let anyVar1: any = null
anyVar1.foo.bar.baz()
anyVar1[0][1][2].prop1

// unknown
let unknownVar: unknown = 'linbudu'

unknownVar = false
unknownVar = 'linbudu'
unknownVar = {
  site: 'juejin'
}

unknownVar = () => {}
const val6: string = unknownVar // Error，不能将类型“unknown”分配给类型“string”
const val7: number = unknownVar // Error，不能将类型“unknown”分配给类型“string”
const val8: () => {} = unknownVar // Error，不能将类型“unknown”分配给类型“string”
const val9: {} = unknownVar // Error，不能将类型“unknown”分配给类型“string”

const val10: any = unknownVar
const val11: unknown = unknownVar

// 对 unknown 的操作不会跳过检查
let unknownVar2: unknown
unknownVar2.foo() // 报错：对象的类型为 "unknown"

// unknown 的方法调用
let unknownVar3: unknown
;(unknownVar3 as { foo: () => {} }).foo()

// never
function justThrow(): never {
  throw new Error()
}
function inUseNever(input: number) {
  if (input > 1) {
    justThrow()
    // 等同于 return 语句后的代码，即 Dead Code
    const name = 'linbudu'
  }
}

// never 用于代码分支检查
type NeverType = string | number

function neverTestFunc(param: NeverType) {
  if (typeof param === 'string') {
    console.log('string')
  } else {
    const _exhaustiveCheck: never = param // 报错：不能将类型“number”分配给类型“never”。
    throw new Error(`Unknown input type: ${_exhaustiveCheck}`)
  }
}

// as
let unknownVar4: unknown
;(unknownVar4 as { foo: () => {} }).foo()

const str: string = 'linbudu'
;(str as any).func().foo().prop

function foo2(union: string | number) {
  if ((union as string).includes('linbudu')) {
  }
  if ((union as number).toFixed() === '599') {
  }
}

// 双重断言
const str2: string = 'linbudu'
// 类型 "string" 到类型 "{ handler: () => {}; }" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。ts(2352)
;(str2 as { handler: () => {} }).handler()

// 正确处理
;(str2 as unknown as { handler: () => {} }).handler()

// 非空断言
declare const foo3: {
  func?: () => {
    prop?: number | null
  }
}
foo3.func().prop.toFixed() // 报错，对象可能为 "null" 或“未定义” && 不能调用可能是“未定义”的对象

foo3.func!().prop!.toFixed()
export {}
