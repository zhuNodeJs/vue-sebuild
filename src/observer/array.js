// push shift unshift pop reverse sort splice 改变数组
// slice 不改变原数组

let oldArrayMethods = Array.prototype;
// value.__proto__ = arrayMethods
// arrayMethods.__proto__ = oldArrayMethods

export const arrayMethods = Object.create(oldArrayMethods); 

const methods = [
  'push',
  'shift',
  'unshift',
  'pop',
  'sort',
  'splice',
  'reverse'
]

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    console.log('用户调用了Push方法') // AOP 切片编程
    // this 需要重点关注
    const result = oldArrayMethods[method].apply(this, args); // 调用了原生的数组的方法
    // push, unshift,添加的元素还是一个对象
    let inserted;
    let ob = this.__ob__;
    switch(method) {
      case 'push':
      case 'unshift':
          inserted = args;
          break;
      case 'splice': // 3个 新增的属性， splice 有删除，新增的功能 arr.splice(0, 1, {name: 1});
        inserted = args.slice(2);
        break;
      default:
        break;
    }

    if (inserted) {
      ob.observerArray(inserted);
    }

    return result;
  }
})


