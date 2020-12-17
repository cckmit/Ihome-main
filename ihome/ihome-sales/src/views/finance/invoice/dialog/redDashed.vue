<!--
 * @Description: 红冲弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-09 16:47:26
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-17 15:30:43
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="460px"
    :title="`${this.isHandmade ? '手工' : '自动'}红冲`"
    class="text-left"
  >
    <div class="red-content">
      <el-radio-group v-model="form.state">
        <div class="item">
          <el-radio :label="1">仅初始化开票信息</el-radio>
        </div>
        <div class="item">
          <el-radio :label="2">初始化开票信息并将请款单退回起草状态</el-radio>
        </div>
      </el-radio-group>
      <div>
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.remark"
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
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  post_invoice_handHCInvoicing,
  post_invoice_autoHCInvoicing,
} from "../../../../api/finance/index";

@Component({})
export default class RedDashed extends Vue {
  @Prop() isHandmade!: any;
  @Prop() data!: any;

  private dialogVisible = true;
  private form: any = {
    state: 1,
    remark: null,
    ids: [],
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  async finish() {
    let res = 0;
    if (this.isHandmade) {
      res = await post_invoice_handHCInvoicing(this.form);
    } else {
      res = await post_invoice_autoHCInvoicing(this.form);
    }
    this.$message.success(`${res}条数据红冲成功`);
    this.$emit("finish");
  }

  created() {
    this.form.ids = this.data.ids;
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
