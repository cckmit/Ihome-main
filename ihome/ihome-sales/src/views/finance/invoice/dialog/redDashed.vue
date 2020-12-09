<!--
 * @Description: 红冲弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-09 16:47:26
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-09 17:09:54
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="460px"
    title="红冲"
    class="text-left"
  >
    <div class="red-content">
      <div class="item">
        <el-checkbox v-model="form.checked">仅初始化开票信息</el-checkbox>
      </div>
      <div class="item">
        <el-checkbox v-model="form.checked2">初始化开票信息并将请款单退回起草状态</el-checkbox>
      </div>
      <div>
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.xx"
          placeholder="备注信息"
        ></el-input>
      </div>
    </div>
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
export default class RedDashed extends Vue {
  private dialogVisible = true;
  private form: any = {
    checked: true,
    checked2: false,
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    this.$emit("finish");
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
