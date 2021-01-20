<!--
 * @Description: 银行网点批量导入
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-28 15:05:47
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-20 16:21:50
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
    class="text-left"
    title="银行网点导入"
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
      :on-error="errorHandler"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >导入银行网点</el-button>
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
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import { post_bankBranch_importData } from "../../../../api/finance/index";
import { post_fileTemplate_list } from "../../../../api/sales-document-cover/index";

@Component({})
export default class BankImport extends Vue {
  dialogVisible = true;
  fileList: any = [];
  loading: any = null;

  private async download() {
    const token: any = getToken();
    let { list } = await post_fileTemplate_list({
      moduleName: "Finance",
      pageNum: 1,
      pageSize: 10,
      templateName: "全国开户网点.xlsx",
    });
    const fileId = list[0].fileId;
    axios({
      method: "GET",
      url: `/sales-api/sales-document-cover/file/download/${fileId}`,
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
      $a.download = "全国开户网点 (导入模板).xlsx";
      $a.click();
      $a.remove();
    });
  }
  async httpRequest(req: any) {
    const fd = new FormData();
    fd.append("file", req.file);
    this.loading = this.$loading({
      lock: true,
      text: "上传中, 请耐心等待...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.6)",
      customClass: "ih-loading-spinner",
    });
    return await post_bankBranch_importData(fd);
  }
  successHandler(response: any) {
    this.$emit("finish");
    this.loading.close();
    this.$message.success(`成功导入${response}条开户行信息`);
  }
  errorHandler() {
    console.log("导入失败");
    this.loading.close();
    // this.$message.warning('导入失败')
  }
  cancel() {
    this.$emit("cancel", false);
  }
}
</script>

<style lang="scss">
.ih-loading-spinner {
  .el-icon-loading,
  .el-loading-text {
    color: #fff;
  }
}
</style>
