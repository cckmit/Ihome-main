<!--
 * @Description: 审核POS事项
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-25 11:15:51
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-25 15:04:30
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
        placeholder="请填写审核意见，审核不通过必须填写"
        maxlength="256"
        show-word-limit
      ></el-input>
    </div>
    <template #footer>
      <el-button
        type="success"
        @click="finish('Pass')"
      >通 过</el-button>
      <el-button
        type="primary"
        @click="finish('NoPass')"
      >不通过</el-button>
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
  async finish(type: string) {
    if (type === "NoPass" && !this.form.remark) {
      this.$message.warning("请填写审核意见");
      return;
    }
    try {
      await post_posApplyItem_posOperate({ ...this.form, type });
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
