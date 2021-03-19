<!--
 * @Description: 开票确认弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-19 09:36:58
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-19 11:13:52
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="550px"
    center
    title="提交确认"
  >
    <div class="tip">
      <i class="el-icon-question"></i>
      <span>除附件信息外，是否有修改请款申请单内容？</span>
    </div>
    <el-radio-group
      v-model="radio"
      class="config-radio"
    >
      <el-radio :label="1">是<span style="color: red;">(如有修改务必选是，否则修改内容将不被保存)</span></el-radio>
      <el-radio :label="0">否</el-radio>
    </el-radio-group>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Steps extends Vue {
  private radio: any = "";
  dialogVisible = true;

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    if (this.radio === "") {
      this.$message.warning("请选择是或者否");
      return;
    }
    this.$emit("finish", this.radio);
  }
}
</script>

<style lang="scss" scoped>
.tip {
  font-size: 18px;
  text-align: center;
  i {
    color: #ff9900;
    font-size: 22px;
    margin-right: 10px;
  }
}
.config-radio {
  margin-left: 85px;
  .el-radio {
    display: block;
    margin-top: 20px;
  }
}
</style>