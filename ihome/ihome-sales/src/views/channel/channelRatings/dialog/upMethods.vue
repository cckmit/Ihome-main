<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-09 09:35:09
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-23 10:53:39
-->

<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="upDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="600px"
    class="dialog text-left"
    title="供应商管理办法上传"
  >
    <el-upload
      ref="upload"
      class="upload-demo"
      action="/sales-document-cover-local/file/upload"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :file-list="fileList"
      name="files"
      :headers="{
        Authorization: `bearer ${tooken}`,
      }"
      :on-preview="previewHandler"
    >
      <el-button size="small" slot="trigger" type="primary"
        >点击上传文件</el-button
      >
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="finish()">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  get_channelGradeStandard_getSupplierManagementAttachments,
  post_channelGradeStandard_addManagementAttachment,
} from "../../../../api/channel/index";
// import { get_file_browse__fid } from "../../../../api/sales-document-cover/index";
import { getToken } from "ihome-common/util/cookies";

@Component({
  components: {},
})
export default class Edit extends Vue {
  @Prop() data: any;
  private fileList: any = [];
  private tooken: any;
  fileName: any = "";

  async created() {
    this.tooken = getToken();
    const data = await get_channelGradeStandard_getSupplierManagementAttachments().then(
      (res: any) => {
        return res.map((v: any) => ({
          name: v.fileName,
          fileName: v.fileName,
          url: `/sales-document-cover-local/file/browse/${v.fileId}`,
          fileId: v.fileId,
          type: v.type,
        }));
      }
    );
    this.fileList = data;
  }
  upDialogVisible = true;

  handleSuccess(response: any, file: any) {
    this.fileList.push({
      name: file.name,
      fileName: file.name,
      url: `/sales-document-cover-local/file/browse/${file.response.data[0].fileId}`,
      fileId: file.response.data[0].fileId,
      type: file.response.data[0].generateFileType,
    });
  }

  handleRemove(file: any, fileList: any) {
    this.fileList = fileList;
  }

  previewHandler(file: any) {
    window.open(`/sales-document-cover-local/file/download/${file.fileId}`);
  }

  async finish() {
    console.log(this.fileList);
    await post_channelGradeStandard_addManagementAttachment(this.fileList);
    this.$message.success("保存成功!");
    this.$emit("finish");
  }

  cancel() {
    this.$emit("cancel", false);
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  /deep/ .el-dialog__body {
    padding: 0 20px 0 20px !important;
  }
}
</style>