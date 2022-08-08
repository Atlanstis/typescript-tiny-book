// 函数

// 函数声明
function foo(name: string): number {
  return name.length
}

// 函数表达式
const foo2 = function (name: string): number {
  return name.length
}
const foo3: (name: string) => number = function (name) {
  return name.length
}

// foo3 类型声明优化
type FuncFoo = (name: string) => number
const foo4: FuncFoo = (name) => {
  return name.length
}

// Callable Interface，通过使用 interface 进行声明
interface FuncFooStruct {
  (name: string, age: number): number
}
const foo5: FuncFooStruct = (name, age) => {
  return name.length + age
}

// void
// 没有调用 return 语句
function bar1(): void {}
// 调用了 return 语句，但没有返回值
function bar2(): void {
  return
}
// bar2 更推荐用 undefined 方式
function bar3(): undefined {
  return
}

// 可选参数
// 在函数逻辑中注入可选参数默认值
function baz1(name: string, age?: number): number {
  const inputAge = age || 18 // 或使用 age ?? 18
  return name.length + inputAge
}
// 直接为可选参数声明默认值
function baz2(name: string, age: number = 18): number {
  const inputAge = age
  return name.length + inputAge
}

// rest 参数
function baz3(arg1: string, ...rest: any[]) {}
function baz4(arg1: string, ...rest: [number, boolean]) {} // 使用元组

// 重载前
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo)
  } else {
    return foo * 599
  }
}

// 重载后
function func1(foo: number, bar: true): string
function func1(foo: number, bar?: false): number
function func1(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo)
  } else {
    return foo * 599
  }
}
const res1 = func1(599) // number
const res2 = func1(599, true) // string
const res3 = func1(599, false) // number

// 异步函数、Generator 函数等类型签名
async function asyncFunc(): Promise<void> {}
function* genFunc(): Iterable<void> {}
async function* asyncGenFunc(): AsyncIterable<void> {}

// --------------------------------- //

// 类
class Foo {
  prop: string

  constructor(inputProp: string) {
    this.prop = inputProp
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }

  get propA(): string {
    return `${this.prop}+A`
  }

  set propA(value: string) {
    this.prop = `${value}+A`
  }
}

// 修饰符
class Foo2 {
  private prop: string

  constructor(inputProp: string) {
    this.prop = inputProp
  }

  protected print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }

  public get propA(): string {
    return `${this.prop}+A`
  }

  public set propA(value: string) {
    this.propA = `${value}+A`
  }
}

// 省略在构造函数为类成员赋值
class Foo3 {
  constructor(public arg1: string, private arg2: boolean) {}
}

// priavte 修饰 构造函数
class Utils {
  public static identifier = 'linbudu'

  private constructor() {}

  public static makeUHappy() {}
}

// 静态成员
class Foo4 {
  static staticHandler() {}

  public instanceHandler() {}
}

// 继承
class Base {}
class Derived extends Base {}

// 派生类 访问 基类 方法
class Base1 {
  print() {}
}
class Derived1 extends Base1 {
  print() {
    super.print()
  }
}

// override 关键字
class Base2 {
  printWithLove() {}
}

class Derived2 extends Base {
  override print() {
    // 报错，此成员不能有 "override" 修饰符，因为它未在基类 "Base" 中声明。
  }
}

// 抽象类
abstract class AbsFoo {
  abstract absProp: string
  abstract get absGetter(): string
  abstract absMethod(name: string): string
}

// 实现
class Foo5 implements AbsFoo {
  absProp: string = 'linbudu'
  get absGetter() {
    return 'linbudu'
  }
  absMethod(name: string) {
    return name
  }
}

export {}
