<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-18 14:09:36
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-18 14:30:45
-->
<template>
  <div>
    <span v-for="(item, index) in list" :key="index">
      <FilePreview :data="item"> </FilePreview>
    </span>
  </div>
</template>
<script lang="ts">
import FilePreview from "../ihome-package/ui/packages/file-preview/src/file-preview.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: { FilePreview },
})
export default class FilePreviewPage extends Vue {
  list: any = [];
  created() {
    this.list = [
      {
        fileId: "5fd804b1990e9d0001a3907f",
        fileName: "2222.jpg",
        suffix: "jpg",
      },
      {
        fileId: "5fdc4c45990e9d0001ffeed4",
        fileName: "111.pdf",
        suffix: "pdf",
      },
    ];
  }
}
</script>
<style lang="scss" scoped>
</style>