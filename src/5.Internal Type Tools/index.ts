// 类型别名
type A = string
// 类型别名-联合类型
type StatusCode = 200 | 301 | 400 | 500 | 502
const status: StatusCode = 502
// 类型别名-函数
type Handler = (e: Event) => void
const clickHandler: Handler = (e) => {}
// 类型别名-对象类型
type ObjType = {
  name: string
  age: number
}
// 工具类型
type Factory<T> = T | number | string
// 工具类型拓展
type FactoryWithBool = Factory<boolean> // => type FactoryWithBool = string | number | boolean
const foo: FactoryWithBool = true

// 联合类型
type UnionType = string | number
const unionVal = 1
const unionVal2 = '1'

// 交叉类型
interface NameStruct {
  name: string
}
interface AgeStruct {
  age: number
}
type ProfileStruct = NameStruct & AgeStruct
const profile: ProfileStruct = {
  name: 'linbudu',
  age: 18
}
// 原始类型的交叉
type StrAndNum = string & number // never
// 对象类型交叉后同名属性合并
type Struct1 = {
  primitiveProp: string
  objectProp: {
    name: string
  }
}
type Struct2 = {
  primitiveProp: number
  objectProp: {
    age: number
  }
}
type Composed = Struct1 & Struct2
type PrimitivePropType = Composed['primitiveProp'] // never
type ObjectPropType = Composed['objectProp'] // { name: string; } & { age: number; }
// 联合类型的交叉
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2) // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string // string

// --------------------------------- //

// 索引签名类型
interface AllStringTypes {
  [key: string]: string
}
type PropType1 = AllStringTypes['linbudu'] // string
const foo2: AllStringTypes = {
  linbudu: '599',
  599: 'linbudu',
  [Symbol('ddd')]: 'symbol'
}
interface AllStringTypes2 {
  propA: number // 报错，类型“number”的属性“propA”不能赋给“string”索引类型“boolean”
  [key: string]: boolean
}
// 常见场景
interface AnyTypeHere {
  [key: string]: any
}
const foo3: AnyTypeHere['linbudu'] = 'any value'

// 索引类型查询
interface Foo {
  linbudu: 1
  599: 2
}
type FooKeys = keyof Foo // "linbudu" | 599

type keysAny = keyof any // string | number | symbol

// 索引类型访问
interface NumberRecord {
  [key: string]: number
}
type PropType = NumberRecord[string] // number
// 字面量
interface Foo2 {
  propA: number
  propB: boolean
}
type PropAType = Foo2['propA'] // number
type PropBType = Foo2['propB'] // boolean
// keyof 联用
interface Foo3 {
  propA: number
  propB: boolean
  propC: string
}
type PropTypeUnion = Foo3[keyof Foo3] // string | number | boolean

interface Foo4 {
  propA: number
}

type PropAType2 = Foo4[string] // 报错：类型“Foo4”没有匹配的类型“string”的索引签名

// 映射类型
type Stringify<T> = {
  [K in keyof T]: string
}

interface Foo5 {
  prop1: string
  prop2: number
  prop3: boolean
  prop4: () => void
}

type StringifiedFoo = Stringify<Foo5>

// 等价于
interface StringifiedFoo2 {
  prop1: string
  prop2: string
  prop3: string
  prop4: string
}

// 拿到键值类型
type Clone<T> = {
  [K in keyof T]: T[K]
}

// --------------------------------- //

// typeof
const str = 'linbudu'
const obj = { name: 'linbudu' }
const nullVar = null
const undefinedVar = undefined
const func = (input: string) => {
  return input.length > 10
}
type Str = typeof str // "linbudu"
type Obj = typeof obj // { name: string; }
type Null = typeof nullVar // null
type Undefined = typeof undefined // undefined
type Func = typeof func // (input: string) => boolean

// 工具类型中使用 typeof
const func2: typeof func = (name: string) => {
  return name === 'linbudu'
}

// 与 ReturnType 一起使用
type FuncReturnType = ReturnType<typeof func> // boolean

// --------------------------------- //

// 类型守卫
function handle(strOrNumOrBool: string | boolean | number) {
  if (typeof strOrNumOrBool === 'string') {
    // 一定是字符串！
    strOrNumOrBool.charAt(1)
  } else if (typeof strOrNumOrBool === 'number') {
    // 一定是数字！
    strOrNumOrBool.toFixed()
  } else if (typeof strOrNumOrBool === 'boolean') {
    // 一定是布尔值！
    strOrNumOrBool === true
  } else {
    // 要是走到这里就说明有问题！
    const _exhaustiveCheck: never = strOrNumOrBool
    throw new Error(`Unknown input type: ${_exhaustiveCheck}`)
  }
}

// 提取判断函数
function isString(input: unknown): boolean {
  return typeof input === 'string'
}
function foo4(input: string | number) {
  if (isString(input)) {
    input.replace('linbudu', 'linbudu599') // 报错，类型“string | number”上不存在属性“replace”。
  }
  if (typeof input === 'number') {
  }
}

// 提取的判断函数使用类型守卫
function isString2(input: unknown): input is string {
  return typeof input === 'string'
}
function foo5(input: string | number) {
  if (isString2(input)) {
    input.replace('linbudu', 'linbudu599')
  }
  if (typeof input === 'number') {
  }
}

// 类型守卫 示例
export type Falsy = false | '' | 0 | null | undefined
export const isFalsy = (val: unknown): val is Falsy => !val

// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined
export const isPrimitive = (val: unknown): val is Primitive =>
  ['string', 'number', 'boolean', 'undefined'].includes(typeof val)

// 基于 in 与 instanceof 的类型保护
interface Foo {
  foo: string
  fooOnly: boolean
  shared: number
}
interface Bar {
  bar: string
  barOnly: boolean
  shared: number
}
function handle2(input: Foo | Bar) {
  if ('foo' in input) {
    input.fooOnly
  } else {
    input.barOnly
  }
}

// 错误
function handle3(input: Foo | Bar) {
  if ('shared' in input) {
    input.fooOnly // 类型“Foo | Bar”上不存在属性“fooOnly”。类型“Bar”上不存在属性“fooOnly”。
  } else {
    input.barOnly //类型“never”上不存在属性“barOnly”。
  }
}

// 字面量类型作为可辨识属性
interface Fooo {
  kind: 'foo'
  diffType: string
  fooOnly: boolean
  shared: number
}
interface Barr {
  kind: 'bar'
  diffType: number
  barOnly: boolean
  shared: number
}
function handle1(input: Fooo | Barr) {
  if (input.kind === 'foo') {
    input.fooOnly
  } else {
    input.barOnly
  }
}

// instanceof
class FooBase {}
class BarBase {}
class Fooz extends FooBase {
  fooOnly() {}
}
class Barz extends BarBase {
  barOnly() {}
}
function handlez(input: Fooz | Barz) {
  if (input instanceof FooBase) {
    input.fooOnly()
  } else {
    input.barOnly()
  }
}

export {}
