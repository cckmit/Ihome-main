import { expect } from 'chai'
import Vue from 'vue'
// import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'
describe('Counter.vue', () => {
  it('count http异步更新, count的值应该为3440', (done) => {
    ///获取组件实例
    const Constructor = Vue.extend(Counter);
    //挂载组件
    const vm: any = new Constructor().$mount();
    //获取button
    const button: any = vm.$el.querySelectorAll('#btn')[0];
    //新建点击事件
    const clickEvent: any = new window.Event('click');

    //触发点击事件
    button.dispatchEvent(clickEvent);
    //监听点击事件
    vm._watcher.run();
    console.log('监听点击事件');

    setTimeout(() => {
      //1s后进行断言
      console.log('num:' + Number(vm.$el.querySelector('.num').textContent))
      expect(Number(vm.$el.querySelector('.num').textContent)).to.equal(3440);
      done();
    }, 1000);

  })


})