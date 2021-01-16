<!--
 * @Description: 批量添加回款
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-16 15:47:02
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-16 17:32:21
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="650px"
    title="批量添加回款"
    class="text-left return-add"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <template v-for="(i, n) in form.addReceList">
        <div :key="n">
          <div class="text-center">请录入申请单号(<span style="color: red;">{{data[n].applyNo}}</span>)的回款流水编号及金额及金额</div>
          <br />
          <el-row
            :key="num"
            v-for="(val, num) in i.receiveList"
          >
            <el-col :span="12">
              <el-form-item
                label="流水编号"
                :prop="`addReceList.${n}.receiveList.${num}.receiveNo`"
                :rules="[
                  {required: true, message: '请输入流水编号', trigger: 'change'}
                ]"
              >
                <el-input
                  v-model="val.receiveNo"
                  placeholder="请输入回款流水编号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="金额"
                :prop="`addReceList.${n}.receiveList.${num}.receiveMoney`"
                :rules="[
                  {required: true, message: '请输入金额', trigger: 'change'}
                ]"
              >
                <el-input
                  v-model="val.receiveMoney"
                  placeholder="请输入回款金额"
                  v-digits="2"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-form>
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

  private dialogVisible = true;
  private form: any = {
    addReceList: [],
  };
  private rules: any = {};

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      try {
        await post_receConfirmDetail_addBatch(this.form);
        this.$emit("finish");
        this.$message.success("批量添加成功");
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  }

  created() {
    console.log(this.data);
    this.form.addReceList = this.data.map((i: any) => ({
      applyId: i.id,
      receiveList: [
        {
          receiveMoney: i.shuoldReceMoney,
          receiveNo: null,
        },
      ],
    }));
  }
}
</script>
