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

export {}
