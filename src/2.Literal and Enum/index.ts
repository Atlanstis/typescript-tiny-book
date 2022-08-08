// 字面量类型与联合类型

// 字面量类型
const str: 'linbudu' = 'linbudu'
const num: 599 = 599
const bool: true = true

const str1: 'linbudu' = 'linbudu599' // 报错

// 联合类型
interface Tmp {
  bool: true | false
  num: 1 | 2 | 3
  str: 'lin' | 'bu' | 'du'
}
// 成员类型无限制
interface Tmp {
  mixed: true | string | 599 | {} | (() => {}) | (1 | 2)
}

// 属性互斥
interface Tmp {
  user:
    | {
        vip: true
        expires: string
      }
    | {
        vip: false
        promotion: string
      }
}

// --------------------------------- //

// 枚举
enum Items {
  Foo, // 0
  Bar, // 1
  Baz // 2
}

enum Items1 {
  Foo, // 0
  Bar = 599,
  Baz // 600
}

const returnNum = () => 100 + 499

enum Items3 {
  Foo = returnNum(),
  Bar = 599,
  Baz // 600
}

enum Items4 {
  Baz, // 0
  Foo = returnNum(),
  Bar = 599
}

enum Items5 {
  Foo,
  Bar = 'BarValue',
  Baz = 'BazValue'
}
const fooValue = Items5.Foo // 0
const fooKey = Items5[0] // "Foo"

// 常量枚举
const enum Item5 {
  Foo, // 0
  Bar, // 1
  Baz // 2
}

export {}
