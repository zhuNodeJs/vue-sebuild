import {initState} from './state';

import {compileToFunction} from './compiler/index'

export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this;
    vm.$options = options;

    initState(vm);

    // 若果用户传了el，就要实现挂载, 编译模板
    if(vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
    
  }

  Vue.prototype.$mount = function(el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);

    // 默认先会查找有没有render方法，没有render会采用template template也没有的话就用el中的内容
    if (!options.render) {
      // 对模板进行编译
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML; // 有些兼容问题
      }
      
      const render = compileToFunction(template);
      options.render = render;
      // 我们需要将template转化为render方法， vdom ast语法数
      

    }
    // options.render
    


  }


}