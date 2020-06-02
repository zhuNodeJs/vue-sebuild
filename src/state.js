import {observe} from './observer/index'

export function initState(vm) {
  const opts = vm.$options;
  // vue的数据来源
  if(opts.props) {
    initProps(vm);
  }
  if (opts.methods) {
    initMethod(vm)
  }
  if(opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initProps() {}
function initMethod() {}
function initData(vm) {
  console.log(vm.$options.data)
  // 数据的初始化
  let data = vm.$options.data; // 此处的获取的是配置的参数的data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data;
  // 对象的数据劫持
  observe(data); // 响应式原理
}
function initComputed() {}
function initWatch() {}