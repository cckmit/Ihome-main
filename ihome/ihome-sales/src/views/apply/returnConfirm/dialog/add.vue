<!--
 * @Description: 添加回款
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-16 09:23:25
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-16 16:14:17
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="650px"
    :title="title"
    class="text-left return-add"
  >
    <div>
      <div class="text-center">请录入申请单号(<span style="color: red;">{{data.applyNo}}</span>)的回款流水编号及金额及金额</div>
      <br />
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-row
          v-for="(i, n) in form.receiveList"
          :key="n"
        >
          <el-col :span="12">
            <el-form-item
              label="流水编号"
              :prop="`receiveList.${n}.receiveNo`"
              :rules="[
                {required: true, message: '请输入流水编号', trigger: 'change'}
              ]"
            >
              <el-input
                v-model="i.receiveNo"
                placeholder="请输入回款流水编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="金额"
              class="code-item padding-right-20"
              :prop="`receiveList.${n}.receiveMoney`"
              :rules="[
                {required: true, message: '请输入金额', trigger: 'change'}
              ]"
            >
              <el-input
                v-model="i.receiveMoney"
                placeholder="请输入回款金额"
                v-digits="2"
              ></el-input>
              <i
                :class="['icon', {'el-icon-circle-plus-outline': n === 0}]"
                @click="handleAdd()"
              ></i>
              <i
                :class="['icon', {'el-icon-circle-close': n !== 0}]"
                @click="handleRemove(n)"
              ></i>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >保 存</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import { post_receConfirmDetail_addBatch } from "../../../../api/apply/index";

@Component({})
export default class AddRetPayment extends Vue {
  @Prop() data!: any;
  @Prop({ default: "添加回款" }) title?: string;

  private dialogVisible = true;
  private totalMoney = 0;
  private form: any = {
    applyId: null,
    receiveList: [
      {
        receiveMoney: 0,
        receiveNo: null,
      },
    ],
  };
  private rules: any = {};

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  private handleAdd() {
    this.form.receiveList.push({ receiveNo: null, receiveMoney: 0 });
  }
  private handleRemove(index: number) {
    this.form.receiveList.splice(index, 1);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      let sumArr = this.form.receiveList.map((v: any) =>
        parseFloat(v.receiveMoney || 0)
      );
      let sum = this.$math.addArr(sumArr);
      if (sum > this.totalMoney) {
        this.$message.warning("金额总数不能大于应回款金额");
        return;
      }
      try {
        await post_receConfirmDetail_addBatch({
          addReceList: [this.form],
        });
        this.$emit("finish");
        this.$message.success("添加成功");
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  }

  created() {
    console.log(this.data);
    this.form.applyId = this.data.id;
    this.form.receiveList[0].receiveMoney = this.data.shuoldReceMoney;
    this.totalMoney = this.data.shuoldReceMoney;
  }
}
</script>

<style lang="scss" scoped>
.return-add {
  .code-item {
    position: relative;
  }
  .icon {
    position: absolute;
    font-size: 25px;
    top: 8px;
    right: -30px;
    cursor: pointer;
  }
}
</style>
