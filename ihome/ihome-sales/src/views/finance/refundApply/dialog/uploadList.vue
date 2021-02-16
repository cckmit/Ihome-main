<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-02-16 14:57:31
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-16 18:10:06
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    class="uploadDialog text-left"
    title="退款附件"
  >
    <el-table
      class="ih-table"
      :data="fileListType"
      style="width: 100%"
      :max-height="maxHeight"
    >
      <el-table-column
        prop="type"
        width="180"
        label="类型"
        align="center"
      >
        <template v-slot="{ row }">
          <div><span
              style="color: red"
              v-if="row.subType"
            >*</span>{{row.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="附件"
        v-if="uploadType === 'edit'"
      >
        <template v-slot="{ row }">
          <IhUpload
            :file-list.sync="row.fileList"
            :file-size="10"
            :file-type="row.code"
            size="100px"
            @newFileList="queryNew"
          ></IhUpload>
        </template>
      </el-table-column>
      <el-table-column
        label="附件"
        v-if="uploadType === 'view'"
      >
        <template v-slot="{ row }">
          <IhUpload
            :file-list.sync="row.fileList"
            :file-size="10"
            :file-type="row.code"
            size="100px"
            :removePermi="false"
            :upload-show="!!row.fileList.length"
            :limit="row.fileList.length"
          ></IhUpload>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        v-if="uploadType === 'edit'"
        @click="finish()"
        type="primary"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class UploadList extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  submitFile: any = {};
  fileListType: any = [];
  uploadType: any = "";

  cancel() {
    this.$emit("cancel", false);
  }

  get maxHeight() {
    let h =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      290 +
      "px";
    return h;
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("RefundItemAttachment");
    this.fileListType = list.map((v: any) => {
      return {
        ...v,
        fileList: data
          .filter((j: any) => j.type === v.code)
          .map((h: any) => ({
            ...h,
            name: h.fileName,
          })),
      };
    });
    let obj: any = {};
    this.fileListType.forEach((h: any) => {
      obj[h.code] = h.fileList;
    });
    this.submitFile = { ...obj };
  }

  queryNew(data: any, type?: any) {
    let obj: any = {};
    obj[type] = data;
    this.submitFile = { ...this.submitFile, ...obj };
  }

  finish() {
    let obj: any = {};
    obj.fileListType = this.fileListType;
    obj.submitFile = this.submitFile;
    this.$emit("finish", obj);
  }

  created() {
    this.uploadType = this.data.type;
    if (this.data.data.length) {
      this.getFileListType(this.data.data);
    } else {
      this.getFileListType([]);
    }
  }
}
</script>
<style lang="scss" scoped>
.uploadDialog {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
}
</style>