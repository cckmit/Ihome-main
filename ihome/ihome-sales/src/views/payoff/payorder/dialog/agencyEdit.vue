<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-02-05 16:44:29
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 16:40:04
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="50%"
    class="agencyDialog text-left"
    title="付款代理费分配"
  >
    <el-form
      :model="form"
      ref="form"
    >
      <el-form-item
        v-for="(item, i) in form.agencyData"
        :key="i"
        :prop="'agencyData.' + i + '.agencyFeesAmount'"
        :label="`甲方公司: ${item.partyAName} 代理费: `"
      >
        <div class="title">
          <el-input
            class="inputClass margin-left-10"
            v-model="item.agencyFeesAmount"
            @input="agencyFeesAmountChange(item)"
            placeholder="请输入"
            v-digits="2"
            clearable
            style="width: 20%"
          />
          <span style="margin-left:10px;color: red">{{`可结: ${item.kejie}`}}</span>
        </div>
      </el-form-item>
    </el-form>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
@Component({
  components: {},
})
export default class AgencyEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    agencyData: [],
  };

  agencyFeesAmountChange(data: any) {
    if (Number(data.agencyFeesAmount) > data.kejie) {
      data.agencyFeesAmount = data.kejie;
      return;
    }
  }

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.$emit("finish", this.form.agencyData);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  created() {
    this.form.agencyData = this.data.map((v: any) => ({
      ...v,
      agencyFeesAmount: v.kejie,
    }));
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss" >
.agencyDialog {
  /deep/ .el-dialog__body {
    padding: 10px 20px 30px 20px;
  }
}
</style>