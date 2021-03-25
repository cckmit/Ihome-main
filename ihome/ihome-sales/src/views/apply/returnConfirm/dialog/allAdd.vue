<!--
 * @Description: 批量添加回款
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-16 15:47:02
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-23 09:14:30
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="75%"
    title="批量添加回款"
    class="text-left return-add"
  >
    <el-table
      style="width:100%;"
      :data="form.addReceList"
    >
      <el-table-column
        label="请款单号"
        prop="receiveList.0.applyNo"
      ></el-table-column>
      <el-table-column label="流水编号">
        <template v-slot="{ row }">
          <el-input
            placeholder="流水编号"
            v-model="row.receiveList[0].receiveNo"
          />
        </template>
      </el-table-column>
      <el-table-column label="回款金额">
        <template v-slot="{ row }">
          <el-input
            placeholder="回款金额"
            v-digits="2"
            v-model="row.receiveList[0].receiveMoney"
          />
        </template>
      </el-table-column>
      <el-table-column label="回款日期">
        <template v-slot="{ row }">
          <el-date-picker
            v-model="row.receiveList[0].receDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-form
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
    </el-form> -->
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="submit()"
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
    addReceList: [
      {
        applyId: null,
        receiveList: [],
      },
    ],
  };
  private rules: any = {};
  private pickerOptions: any = {
    disabledDate(time: any) {
      return time.getTime() > Date.now() - 8.64e6;
    },
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit() {
    // if (valid) {
    // let list = this.form.addReceList.map((i: any) => ({...i.receiveList[0]}))
    // if (list)
    try {
      await post_receConfirmDetail_addBatch(this.form);
      this.$emit("finish");
      this.$message.success("批量添加成功");
    } catch (error) {
      console.log(error);
    }
    // } else {
    //   return false;
    // }
  }

  created() {
    this.form.addReceList = this.data.map((i: any) => ({
      applyId: i.id,
      receiveList: [
        {
          receiveMoney: i.shuoldReceMoney,
          receiveNo: null,
          applyNo: i.applyNo,
          receDate: (this.$tool as any).todayStr(),
        },
      ],
    }));
  }
}
</script>
