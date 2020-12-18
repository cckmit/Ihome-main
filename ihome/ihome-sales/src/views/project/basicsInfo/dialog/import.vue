<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 17:00:29
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-18 12:04:26
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    :before-close="cancel"
    width="500px"
    class="dialog text-left"
    title="快捷导入房号"
  >
    <el-upload
      class="upload-demo"
      action=""
      multiple
      :limit="1"
      :file-list="fileList"
      accept="*"
      :http-request="httpRequest"
      :on-success="successHandler"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >导入房号</el-button>
      <el-button
        class="margin-left-20"
        size="small"
        type="primary"
        @click="download()"
      >下载模板</el-button>
    </el-upload>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_room_importExcel } from "@/api/project/index";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
@Component({
  components: {},
})
export default class ImportDialog extends Vue {
  dialogVisible = true;
  fileList: any = [];
  private get proId(): any {
    return this.$route.query.id;
  }
  download() {
    const token: any = getToken();
    axios({
      method: "GET",
      url: `/sales-api/project/room/getExcelTemplate`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "导入房号模版.xlsx";
      $a.click();
      $a.remove();
    });
  }
  async httpRequest(req: any) {
    const id: any = this.proId;
    const fd = new FormData();
    fd.append("file", req.file);
    fd.append("proId", id);
    return await post_room_importExcel(fd);
  }
  successHandler() {
    this.$emit("cancel");
    this.$message.success("导入成功");
  }
  cancel() {
    this.$emit("cancel");
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  /deep/ .el-upload-list,
  .el-upload-list--text {
    display: none;
  }
}
</style>