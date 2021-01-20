<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-18 14:14:34
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-18 14:44:55
-->
<template>
  <el-tooltip
    class="item"
    effect="light"
    :content="item.fileName"
    placement="top"
  >
    <el-image
      style="width: 100px"
      :src="item.src"
      fit="fit"
      @click="pre(item)"
    ></el-image>
  </el-tooltip>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class IhFilePreview extends Vue {
  @Prop({
    default: {},
  })
  data: any;
  item: any = {};
  created() {
    this.item = this.data;
    switch (this.item.suffix) {
      case "gif":
      case "jpg":
      case "png":
      case "jpeg":
        this.item.src = (this as any).$tool.getLongFileUrl(this.item.fileId);
        break;
      case "doc":
      case "docx":
      case "docm":
        this.item.src = require("../../../img/word.jpg");
        break;
      case "xls":
      case "xlsx":
        this.item.src = require("../../../img/excel.png");
        break;
      case "pdf":
        this.item.src = require("../../../img/pdf.jpg");
        break;
      case "ppt":
      case "potx":
      case "pptx":
        this.item.src = require("../../../img/ppt.png");
        break;
      default:
        this.item.src = require("../../../img/file.jpg");
    }
  }
  pre(item: any) {
    let url = (this as any).$tool.getLongFileUrl(item.fileId);
    window.open(url);
  }
}
</script>
<style lang="scss" scoped>
</style>