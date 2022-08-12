// 结构化类型系统
class Cat {
  eat() {}
}
class Dog {
  eat() {}
}
function feedCat(cat: Cat) {}
feedCat(new Dog())

class Cat2 {
  meow() {}
  eat() {}
}
class Dog2 {
  eat() {}
}
function feedCat2(cat: Cat2) {}
feedCat2(new Dog2()) // 报错，类型“Dog2”的参数不能赋给类型“Cat2”的参数。类型 "Dog2" 中缺少属性 "meow"，但类型 "Cat2" 中需要该属性。

class Cat3 {
  eat() {}
}
class Dog3 {
  bark() {}
  eat() {}
}
function feedCat3(cat: Cat3) {}
feedCat3(new Dog3())

class Cat4 {
  eat(): boolean {
    return true
  }
}
class Dog4 {
  eat(): number {
    return 599
  }
}
function feedCat4(cat: Cat4) {}
feedCat4(new Dog4()) // 报错，类型“Dog4”的参数不能赋给类型“Cat4”的参数。在这些类型中，"eat()" 返回的类型不兼容。不能将类型“number”分配给类型“boolean”。

export {}
