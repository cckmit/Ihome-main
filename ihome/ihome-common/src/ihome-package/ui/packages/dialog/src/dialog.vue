<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-01 15:38:40
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-06 17:19:29
--> 
<template>
  <div class="ih-dialog" v-if="dialogVisible">
    <slot />
  </div>
</template>

<script>
export default {
  name: "IhDialog",
  props: ["show"],
  data() {
    return {
      dialogVisible: false
    };
  },
  created() {
    this.dialogVisible = this.show;
  },
  watch: {
    show(newVal) {
      this.dialogVisible = newVal;
    }
  }
};
</script>

<style lang="scss">
.ih-dialog {
  .el-form-item__content {
    margin-right: 40px;
  }
  .el-input,
  .el-select {
    width: 100%;
  }
}
</style>