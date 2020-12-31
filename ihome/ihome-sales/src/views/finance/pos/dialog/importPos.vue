<!--
 * @Description: POS机批量导入
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-31 17:15:45
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-31 17:41:01
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
        @click="download()"
      >下载模板</el-button>
    </el-upload>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import { post_posTerminal_importData } from "../../../../api/finance/index";

@Component({})
export default class BankImport extends Vue {
  dialogVisible = true;
  fileList: any = [];

  private async download() {
    const token: any = getToken();
    console.log(token);
  }
  async httpRequest(req: any) {
    const fd = new FormData();
    fd.append("file", req.file);
    return await post_posTerminal_importData(fd);
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
