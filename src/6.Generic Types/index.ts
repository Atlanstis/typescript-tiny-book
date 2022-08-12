// 泛型

// --------------------------------- //

// 类型别名中的泛型
type Factory<T> = T | number | string
// 工具函数的封装
type Stringify<T> = {
  [K in keyof T]: string
}
type Clone<T> = {
  [K in keyof T]: T[K]
}
// 条件类型
type IsEqual<T> = T extends true ? 1 : 2
type A = IsEqual<true> // 1
type B = IsEqual<false> // 2
type C = IsEqual<'linbudu'> // 2

// 泛型约束与默认值

// 泛型默认值
type Factory2<T = boolean> = T | number | string
let factoryVal: Factory2 = false
factoryVal = 1
factoryVal = ''
// 泛型约束
type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure'

type Res1 = ResStatus<10000> // "success"
type Res2 = ResStatus<20000> // "failure"
type Res3 = ResStatus<'10000'> // 报错，类型“string”不满足约束“number”。

// 泛型约束默认值写法
type ResStatusDefault<ResCode extends number = 10000> = ResCode extends
  | 10000
  | 10001
  | 10002
  ? 'success'
  : 'failure'

type Res4 = ResStatusDefault // "success"

// 多泛型关联
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult
type Result1 = Conditional<'linbudu', string, 'passed!', 'rejected!'> //  "passed!"
type Result2 = Conditional<'linbudu', boolean, 'passed!', 'rejected!'> // "rejected!"

// --------------------------------- //

// 对象类型中的泛型
interface IRes<TData = unknown> {
  code: number
  error?: string
  data: TData
}

// --------------------------------- //

// 函数中的泛型
function handle<T>(input: T): T {
  return input
}
const author = 'linbudu' // 使用 const 声明，被推导为 "linbudu"
let authorAge = 18 // 使用 let 声明，被推导为 number
handle(author) // 填充为字面量类型 "linbudu" => function handle<"linbudu">(input: "linbudu"): "linbudu"
handle(authorAge) // 填充为基础类型 number => function handle<number>(input: number): number

// 函数中的泛型约束
function handle2<T extends string | number>(input: T): T {
  return input
}

// 函数的泛型参数也会被内部的逻辑消费
function handle3<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload])
  })
}

// 箭头函数的泛型
const handle4 = <T>(input: T): T => input
const handle5 = <T extends any>(input: T): T => input

// --------------------------------- //

// class 中的泛型
class Queue<TElementType> {
  private _list: TElementType[]

  constructor(initial: TElementType[]) {
    this._list = initial
  }

  // 入队一个队列泛型子类型的元素
  enqueue<TType extends TElementType>(ele: TType): TElementType[] {
    this._list.push(ele)
    return this._list
  }

  // 入队一个任意类型元素（无需为队列泛型子类型）
  enqueueWithUnknownType<TType>(element: TType): (TElementType | TType)[] {
    return [...this._list, element]
  }

  // 出队
  dequeue(): TElementType[] {
    this._list.shift()
    return this._list
  }
}

const queue = new Queue<{ name: string }>([])
const queue1 = queue.enqueue({ name: '223' })
const queue2 = queue.enqueueWithUnknownType(3)
const item = queue.dequeue()
console.log(item)
export {}
