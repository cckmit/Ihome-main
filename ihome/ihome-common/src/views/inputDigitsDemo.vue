<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-13 14:00:00
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-13 14:20:06
-->
<template>
  <div style="text-align: left">
    <el-form label-width="80px">
      <el-form-item label="小数位数:">
        限制输入的小数为：
        <el-input
          v-model="inputDigits"
          clearable
          @change="changeDigits"
          style="width: 80px"></el-input>
        位
      </el-form-item>
      <el-form-item label="示例结果:">
        <el-input
          v-if="isShow"
          clearable
          v-digits="inputDigits"
          v-model="inputValue"
          style="width: 500px"></el-input>
      </el-form-item>
    </el-form>
    <div>使用描述：在Input或者InputNumber组件中直接用自定义指令：v-digits="x"(x表示需要限制的小数位数，eg:v-digits="2"表示只能输入2位小数)即可。</div>
    <div>注意事项：只能在Input或者InputNumber组件中使用。</div>
    <div>
      <el-input type="text" v-number-input.float="3" v-model="testValue"></el-input>
    </div>
    <div>绑定值:{{testValue}}</div>
  </div>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  function onInput(el: any, ele: any, binding: any, vnode: any) {
    function handle() {
      // 只保留数字
      let val: any = ele.value
      // modifiers为修饰符对象，传入了float，则其float属性为true
      // debugger
      if (binding.modifiers.float) {
        // 清除"数字"和"."以外的字符
        val = val.replace(/[^\d.]/g, '');
        // 只保留第一个, 清除多余的
        val = val.replace(/\.{2,}/g, '.');
        // 第一个字符如果是.号，则补充前缀0
        val = val.replace(/^\./g, '0.');
        if (typeof binding.value !== 'undefined') {
          // 期望保留的最大小数位数
          let pointKeep = 0
          if (typeof binding.value === 'string'
            || typeof binding.value === 'number') {
            pointKeep = parseInt(binding.value);
          }
          if (!isNaN(pointKeep)) {
            if (!Number.isInteger(pointKeep)
              || pointKeep < 0) {
              pointKeep = 0;
            }
            // const str: any = '^(\\d+)\\.(\\d\{' + pointKeep + '}).*$';
            // let regDigits = new RegExp("^(\\d+)\\.(\\d{" + pointKeep + "}).*$");
            // const reg: any = new RegExp(str);
            const reg: any = new RegExp("^(\\d+)\\.(\\d{" + pointKeep + "}).*$");
            if (pointKeep === 0) {
              // 不需要小数点
              val = val.replace(reg, '$1');
            } else {
              // 通过正则保留小数点后指定的位数
              val = val.replace(reg, '$1.$2');
            }
          }
        }
        if(Number(val) > 10000000) val = 10000000;
        ele.value = val + '';
      } else {
        ele.value = ele.value.replace(/[\D]/g, '');
      }
      // 当输入汉字时会导致vue model 数据不同步，因此在回调函数添加上以下代码，手动触发数据的双向绑定。
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit('input', ele.value);
      } else {
        // 移动端可能不支持 CustomEvent. 下面是兼容方法
        // function CustomEvent(event, params) {
        //   params = params || { bubbles: false, cancelable: false, detail: undefined };
        //   var evt = document.createEvent('CustomEvent');
        //   evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        //   return evt;
        // };
        // CustomEvent.prototype = window.Event.prototype;
        vnode.elm.dispatchEvent(new CustomEvent('input', ele.value));
      }
    }
    return handle;
  }
  const numberInput = {
    bind(el: any, binding: any, vnode: any) {
      const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
      ele.addEventListener('keyup', onInput(el, ele, binding, vnode), false);
    }
  }
  Vue.directive('number-input', numberInput)

  Vue.directive('ddd', {
    bind(el: any, binding: any, vnode: any) {
      const El = el.querySelector('.el-input__inner');
      el.inputListen = function () {
        // debugger
        if ([null, undefined, 0, ""].includes(binding.value)) {
          // 只能输入数字
          El.value = El.value.replace(/[^\d]/g, ""); // 清除"数字"和以外的字符
        } else if (binding.value > 0) {
          // 只能输入规定小数位数的数字
          // /^(\-)*(\d+)\.(\d{2}).*$/
          El.value = El.value.replace(/[^\d.]/g, ""); // 清除"数字"和以外的字符
          El.value = El.value.replace(/^\./g, ""); // 验证第一个字符是不是数字
          El.value = El.value.replace(/\.{2,}/g, "."); // 只保留第一个"."
          El.value = El.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); // 只保留第一个"."
          let regDigits = new RegExp("^(\\-)*(\\d+)\\.(\\d{" + binding.value + "}).*$");
          El.value = El.value.replace(regDigits, '$1$2.$3');
        }
        // 重新赋值
        El.dispatchEvent(new Event('input'));
      }
      el.addEventListener('input', el.inputListen);
      // function inputBlur() {
      //   El.value = El.value.replace(/\.$/g, ""); // 失焦后去除最后一个是"."的情况
      //   // 重新赋值
      //   El.dispatchEvent(new Event('input'));
      // }
      // El.addEventListener('blur', inputBlur);
      // 当输入汉字时会导致vue model 数据不同步，因此在回调函数添加上以下代码，手动触发数据的双向绑定。
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit('input', El.value);
      } else {
        // 移动端可能不支持 CustomEvent. 下面是兼容方法
        // function CustomEvent(event, params) {
        //   params = params || { bubbles: false, cancelable: false, detail: undefined };
        //   var evt = document.createEvent('CustomEvent');
        //   evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        //   return evt;
        // };
        // CustomEvent.prototype = window.Event.prototype;
        vnode.elm.dispatchEvent(new CustomEvent('input', El.value));
      }
    },
    unbind(el: any) {
      el.removeEventListener('input', el.inputListen);
    }
  });

  @Component({})
  export default class InputDigits extends Vue {
    private inputDigits: any = null;
    private inputValue: any = null;
    private testValue: any = null;
    private isShow: any = true;

    changeDigits() {
      this.inputValue = "";
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      })
    }

    created() {
      this.inputDigits = 2
    }
  }
</script>
<style lang="scss" scoped>
</style>