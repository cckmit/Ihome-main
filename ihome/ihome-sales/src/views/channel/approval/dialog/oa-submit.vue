<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-22 11:00:59
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-22 11:41:29
-->
<template>
  <el-dialog
    v-dialogDrag
    title="是否确认提交呈批"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="600px"
    style="text-align: left"
    class="dialog user-job-role-dialog"
  >
    <div
      class="text-left margin-left-30 margin-top-20"
      v-for="(item, index) in fileList"
      :key="index"
      @click="down(item)"
    >
      <el-link type="primary">{{ item.fileName }}</el-link>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()" :loading="loading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  post_channelApproval_edit,
  post_channelApproval_add,
  post_channelApproval_previewOaAttachment,
} from "../../../../api/channel/index";
@Component({
  components: {},
})
export default class ApprovalChangeUser extends Vue {
  constructor() {
    super();
  }
  fileList: any[] = [];
  dialogVisible = true;
  loading = false;

  @Prop({ default: null }) data: any;

  cancel() {
    this.$emit("cancel", false);
  }
  @NoRepeatHttp()
  async finish() {
    try {
      this.loading = true;

      let d: any = this.$tool.deepClone(this.data);
      d.operateType = 2;
      if (d.id) {
        await post_channelApproval_edit(d);
        this.$message.success("提交成功");
        this.$goto({
          path: "/approval/list",
        });
      } else {
        await post_channelApproval_add(d);
        this.$message.success("提交成功");
        this.$goto({
          path: "/approval/list",
        });
      }

      //   await post_channelApproval_edit(this.data);
      //   this.$message.success("提交呈批成功");
      this.$goto({
        path: "/approval/list",
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
  down(item: any) {
    let url = this.$tool.downloadLongFileUrl(item.fileId);
    console.log(url);
    (window as any).open(url);
  }

  async created() {
    console.log(this.data);
    this.fileList = await post_channelApproval_previewOaAttachment(this.data);
  }
}
</script>
<style lang="scss" >
.text-item {
  padding: 5px;
}
</style>