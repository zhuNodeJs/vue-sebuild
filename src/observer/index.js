import { isObject, def } from '../util/index'
import {arrayMethods} from './array'

class Observer {
  constructor(value) {
    // value.__ob__ = this; // 给每一个监控过的对象新增加一个__ob__属性。这样会栈溢出
    // Object.defineProperty(value, '__ob__', {
    //   enumerable: false,
    //   configurable: false,
    //   value: this
    // })
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // 如果是数组的话并不会对索引进行观测，因为会导致性能的问题
      // 前端开发中很少很少 去操作索引 push shift unshift
      value.__proto__ = arrayMethods
      // 如果数组里放的是对象我们再监控, 需要监控数组中的每一项
      this.observerArray(value)
    } else {
      this.walk(value)
    }
  }

  observerArray(value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i]);
    }
  }

  walk(data) {
    let keys = Object.keys(data)
    keys.forEach((key) => {
      defineReactive(data, key, data[key])
    })    
  }
}

function defineReactive(data, key, value) {
  observe(value) // 递归来实现深度检测
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if(newValue === value) return;
      observe(newValue); // 继续劫持用户设置的值，因为有可能用户是直接赋值的是对象
      value = newValue;
    }
  })
}

export function observe (data) { // 把data中的数据都执行数据劫持，不能兼容ie8及以下
  let isObj = isObject(data);
  if (!isObj) {
    return;
  }

  return new Observer(data);
}