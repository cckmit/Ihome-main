<!--
 * @Description: 到访无效弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2021年2月9日10:24:09
 * @LastEditors: ywl
 * @LastEditTime: 2021年2月9日10:24:12
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="60%"
    :title="`附件详情`"
    class="text-left"
  >
    <div class="padding-left-20">
      <el-table style="width: 100%" :data="fileListType">
        <el-table-column prop="type" width="180" label="类型" align="center">
          <template v-slot="{ row }">
            <div>
              <span style="color: red" v-if="row.subType">*</span>{{ row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="附件">
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
      </el-table>
    </div>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="submit()" :loading="loading"
        >确 认</el-button
      >
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  post_reportAttachment_getAll,
  post_reportAttachment_addAttachment,
} from "../../../../api/customer/index";

@Component({})
export default class FileDetail extends Vue {
  [x: string]: any;
  @Prop() isHandmade!: any;
  @Prop() data!: any;
  submitFile: any = {};
  fileListType: any = [];
  private dialogVisible = true;
  private form: any = {
    reportId: null,
    attachments: {}, // 附件信息
  };

  loading = false;

  cancel(): void {
    this.$emit("cancel", false);
  }

  queryNew(data: any, type?: any) {
    let obj: any = {};
    obj[type] = data;
    this.submitFile = { ...this.submitFile, ...obj };
  }

  @NoRepeatHttp()
  async submit() {
    // 校验提示
    let arr: any = [];
    Object.values(this.submitFile).forEach((v: any) => {
      if (v.length) {
        arr = arr.concat(v);
      }
    });
    let submitList: any = this.fileListType.map((v: any) => {
      return {
        ...v,
        fileList: arr
          .filter((j: any) => j.type === v.code)
          .map((h: any) => ({
            ...h,
            name: h.fileName,
          })),
      };
    });
    let isSubmit = true;
    let msgList: any = [];
    submitList.forEach((v: any) => {
      if (v.subType && !v.fileList.length) {
        msgList.push(v.name);
        isSubmit = false;
      }
    });
    if (isSubmit) {
      this.form.attachments = arr.map((v: any) => ({
        fileId: v.fileId,
        fileName: v.name,
        type: v.type,
      }));
    } else {
      this.$message({
        type: "warning",
        message: `${msgList.join(",")}项,请上传附件`,
      });
      return;
    }
    const res = await post_reportAttachment_addAttachment(this.form);
    this.$message.success("附件上传成功");
    this.$emit("finish", res);
  }

  async created() {
    this.form.reportId = this.data.reportId;
    this.form.attachments = await post_reportAttachment_getAll({
      reportId: this.data.reportId,
    });
    this.getFileListType(this.form.attachments);
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("ReportAttachment");
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
}
</script>

<style lang="scss" scoped>
.red-content {
  .item {
    padding-bottom: 20px;
  }
}
</style>
