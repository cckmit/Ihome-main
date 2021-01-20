<!--
 * @Description: 银行网点批量导入
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-28 15:05:47
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-28 16:21:52
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
    return await post_bankBranch_importData(fd);
  }
  successHandler() {
    this.$emit("finish");
    this.$message.success("导入成功");
  }
  cancel() {
    this.$emit("cancel", false);
  }
}
</script>
