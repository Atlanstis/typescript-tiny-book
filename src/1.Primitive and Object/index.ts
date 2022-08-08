// 原始类型的类型标注
const name: string = 'linbudu'
const age: number = 24
const male: boolean = false
const undef: undefined = undefined
const nul: null = null
const obj: object = { name, age, male }
const bigintVar1: bigint = 9007199254740991n
const bigintVar2: bigint = BigInt(9007199254740991)
const symbolVar: symbol = Symbol('unique')

// null 与 undefined
const tmp1: null = null
const tmp2: undefined = undefined
const tmp3: string = null // 仅在关闭 strictNullChecks 时成立
const tmp4: string = undefined // 仅在关闭 strictNullChecks 时成立

// void
function func1() {} // 推断为 void
function func2() {
  return
} // 推断为 void
function func3() {
  return undefined
} // 推断为 undefined

// --------------------------------- //

// 数组的类型标注
const arr1: string[] = []
const arr2: Array<string> = []

const arr3: string[] = ['lin', 'bu', 'du']
console.log(arr3[599]) // 此时无报错

// 元组（Tuple）
const arr4: [string, string, string] = ['lin', 'bu', 'du']
console.log(arr4[599]) // 越界访问时给出类型报错
const arr5: [string, number, boolean] = ['linbudu', 599, true] // 类型可不同
const arr6: [string, number?, boolean?] = ['linbudu'] // 可选成员
// 具名元组
const arr7: [name: string, age: number, male: boolean] = ['linbudu', 599, true]
const arr8: [name: string, age: number, male?: boolean] = ['linbudu', 599, true] // 可选成员

// --------------------------------- //

// 对象的类型标注
interface IDescription {
  name: string
  age: number
  male: boolean
}
const obj1: IDescription = {
  name: 'linbudu',
  age: 599,
  male: true
}

// 修饰接口属性：可选
interface IDescription2 {
  name: string
  age: number
  male?: boolean
  func?: Function
}
const obj2: IDescription2 = {
  name: 'linbudu',
  age: 599,
  male: true
  // 无需实现 func 也是合法的
}

// 修饰接口属性：只读
interface IDescription3 {
  readonly name: string
  age: number
}
const obj3: IDescription3 = {
  name: 'linbudu',
  age: 599
}
// 无法分配到 "name" ，因为它是只读属性
obj3.name = '林不渡'
export {}
