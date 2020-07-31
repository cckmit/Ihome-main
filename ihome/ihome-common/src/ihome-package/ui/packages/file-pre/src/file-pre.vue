<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-30 09:36:38
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-30 10:07:41
--> 
<template>
  <div>
    <el-image v-if="!isPDF" style="width: 100px; height: 100px" :src="key" :preview-src-list="arr"></el-image>
    <object v-if="isPDF" :data="key" type="application/pdf" width="100%" height="100%">浏览器不支持预览</object>
  </div>
</template>
<script>
export default {
  name: "IhFilePre",
  props: {
    src: {
      type: String,
      default: null,
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    console.log("FilePre");
    this.arr = this.list;
    this.key = this.src;
     
    if (this.key.endsWith(".pdf")) {
      this.isPDF = true;
    } else {
      this.isPDF = false;
    }
  },
  data() {
    return {
      key: null,
      arr: [],
      isPDF: false,
    };
  },
  watch: {
    key(val) {
      this.key = val;
      console.log(val)
      if (this.key.endsWith(".pdf")) {
        this.isPDF = true;
      } else {
        this.isPDF = false;
      }
    },
    arr(val) {
      this.arr = val;
    },
  },
};
</script>

<style>
</style>