<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-17 09:47:28
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-17 08:42:31
--> 
<template>
  <div
    :style="{ 'min-height': minHeight }"
    class="ih-page"
  >
    <div class="ih-page-container">
      <slot name="container"></slot>
    </div>
    <div class="ih-page-form">
      <slot name="form"></slot>
    </div>
    <div
      class="ih-page-btn"
      :style="{ 'margin-left': labelWidth }"
    >
      <slot name="btn"></slot>
    </div>
    <div class="ih-page-table">
      <slot name="table"></slot>
    </div>
    <div class="ih-page-pagination">
      <slot name="pagination"></slot>
    </div>
    <div class="ih-page-info">
      <slot name="info"></slot>
    </div>
    <slot />
  </div>
</template>
<script >
export default {
  name: "IhPage",
  data() {
    return {};
  },
  props: ["labelWidth"],
  computed: {
    minHeight() {
      let h =
        (document.documentElement.clientHeight || document.body.clientHeight) -
        90 +
        "px";
      return h;
    },
  },

  // mounted() {
  //   window.addEventListener("resize", () => {});
  // }
};
</script>
<style  lang="scss">
.ih-page {
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.ih-page-form .el-form-item__content {
  margin-right: 40px;
}
.ih-page-btn {
  text-align: left;
  margin-left: 80px;
}
.ih-page-table {
  width: 100%;
}
.ih-page-pagination {
  text-align: right;
}
</style>