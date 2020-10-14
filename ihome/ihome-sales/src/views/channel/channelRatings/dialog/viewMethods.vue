<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-09 09:35:09
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-14 18:04:33
-->

<template>
  <el-dialog
    v-dialogDrag
    class="dialog text-left"
    :visible.sync="viewDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="600px"
    title="供应商管理办法查询"
  >
    <el-upload
      ref="upload"
      class="upload-demo"
      action="#"
      :file-list="fileList"
      :on-preview="previewHandler"
      :before-remove="beforeRemove"
    >
    </el-upload>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { get_channelGradeStandard_getSupplierManagementAttachments } from "../../../../api/channel/index";
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
          url: `/sales-document-cover-local/file/browse/${v.fileId}`,
          fileId: v.fileId,
          type: v.type,
        }));
      }
    );
    this.fileList = data;
  }
  viewDialogVisible = true;

  previewHandler(file: any) {
    window.open(`/sales-document-cover-local/file/download/${file.fileId}`);
  }

  beforeRemove() {
    return false;
  }

  cancel() {
    this.$emit("cancel", false);
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  /deep/ .el-dialog__body {
    padding: 0 20px 30px 20px !important;
  }
}
</style>
