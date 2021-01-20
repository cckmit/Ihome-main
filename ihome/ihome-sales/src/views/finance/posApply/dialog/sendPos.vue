<!--
 * @Description: 寄出操作
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-25 11:15:51
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-25 15:05:27
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="460px"
    :title="$root.dictAllName(applyType, 'PosOperate')"
    class="text-left"
  >
    <div>
      <el-input
        type="textarea"
        :rows="4"
        v-model="form.remark"
        placeholder="可在此处填写快递单号等备注信息"
        maxlength="256"
        show-word-limit
      ></el-input>
    </div>
    <template #footer>
      <el-button
        type="primary"
        @click="finish('Pass')"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { post_posApplyItem_posOperate } from "../../../../api/finance/index";

@Component({})
export default class CheckPOS extends Vue {
  @Prop() data!: any;
  @Prop() applyType!: any;

  private dialogVisible = true;
  private form: any = {
    id: null,
    operateType: null,
    remark: null,
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  async finish() {
    if (!this.form.remark) {
      this.$message.warning("请填写备注信息");
      return;
    }
    try {
      await post_posApplyItem_posOperate({ ...this.form });
      this.$message.success("操作成功");
    } catch (error) {
      console.log(error);
    }
    this.$emit("finish");
  }

  created() {
    console.log(this.data);
    this.form.id = this.data.id;
    this.form.operateType = this.applyType;
  }
}
</script>
