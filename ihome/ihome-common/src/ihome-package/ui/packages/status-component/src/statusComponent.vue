<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2021-05-12 08:35:11
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-13 14:34:22
-->
<template>
  <div class="ih-status-dot">
    <span class="dot" :class="getStatusClassName"></span>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class IhStatusComponent extends Vue {
  @Prop() status!: string; // 状态值
  @Prop({
    default: () => {
      return {
        warning: "",
        success: "",
        primary: "",
      };
    },
  })
  statusObj?: any; // 状态对象: key是样式名，value是状态值

  get getStatusClassName() {
    let className: any = '';
    if (this.status) {
      className = 'primary'; // 默认显示primary类名 - 主要是其他状态
      for (let key in this.statusObj) {
        if (this.statusObj[key] === this.status) {
          className = key;
        }
      }
    }
    return className;
  }
}
</script>
<style lang="scss" scoped>
</style>
