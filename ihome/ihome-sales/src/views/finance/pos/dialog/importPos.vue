<!--
 * @Description: POS机批量导入
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-31 17:15:45
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-25 11:50:39
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
    title="POS机信息导入"
  >
    <el-upload
      class="upload-demo"
      action=""
      multiple
      :limit="1"
      :file-list="fileList"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      :http-request="httpRequest"
      :on-success="successHandler"
      :on-error="errorHandler"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >导入POS机信息</el-button>
      <el-button
        class="margin-left-20"
        size="small"
        type="primary"
        :loading="downLoad"
        @click="download()"
      >下载模板</el-button>
    </el-upload>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import { post_posTerminal_importData } from "../../../../api/finance/index";

@Component({})
export default class BankImport extends Vue {
  dialogVisible = true;
  fileList: any = [];
  loading: any = null;
  downLoad = false;

  private async download() {
    const token: any = getToken();
    this.downLoad = true;
    axios({
      method: "GET",
      url: `/sales-api/finance/posTerminal/getExcelTemplate`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    })
      .then((res: any) => {
        const href = window.URL.createObjectURL(res.data);
        const $a = document.createElement("a");
        $a.href = href;
        $a.download = "pos机终端信息 (导入模板).xlsx";
        $a.click();
        $a.remove();
        this.downLoad = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.downLoad = false;
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
    return await post_posTerminal_importData(fd);
  }
  successHandler() {
    this.$emit("finish");
    this.loading.close();
    this.$message.success("导入成功");
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
