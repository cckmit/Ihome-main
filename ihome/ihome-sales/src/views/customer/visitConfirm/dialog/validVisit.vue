<!--
 * @Description: 到访有效弹窗
 * @version: 
 * @Author: yag
 * @Date: 2021年2月9日10:23:56
 * @LastEditors: yag
 * @LastEditTime: 2021年2月9日17:37:56
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="660px"
    :title="`到访确认`"
    class="text-left"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="20">
          <el-form-item label="确认到访日期" prop="visitDealTime">
            <el-date-picker
              v-model="form.visitDealTime"
              type="datetime"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择确认到访日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()" :loading="loading"
        >确 认</el-button
      >
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import { post_report_visitValidOrInvalid } from "../../../../api/customer/index";

@Component({})
export default class ValidVisit extends Vue {
  @Prop() isHandmade!: any;
  @Prop() data!: any;

  private dialogVisible = true;
  private form: any = {
    visitDealTime: null,
    validOrInvalid: null,
    reportIds: [],
  };
  pickerOptions: any = {
      disabledDate(time: any) {
        let curDate: any = new Date();
        let year: any = curDate.getFullYear();
        let month: any = curDate.getMonth() + 1 < 10 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
        // let day: any = curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate();
        // 判断今天是否是本月的第一天
        let rangeTimes: any = 0;
        if (curDate.getDate() === 1) {
          // 第一天，还要判断当月是否为第一个月
          if (curDate.getMonth() === 0) {
            // 第一个月
            rangeTimes = new Date(`${year - 1}-12-01`).getTime();
          } else {
            // 不是第一个月
            rangeTimes = new Date(`${year}-${curDate.getMonth()}-01`).getTime();
          }
        } else {
          // 不是第一天
          rangeTimes = new Date(`${year}-${month}-01`).getTime() - 24 * 60 * 60 * 1000;
        }
        return time.getTime() > Date.now() || time.getTime() < rangeTimes;
      }
    }
  private rules: any = {
    visitDealTime: [
      { required: true, message: "请选择确认到访日期", trigger: "change" },
    ],
  };

  loading = false;

  cancel(): void {
    this.$emit("cancel", false);
  }

  finish() {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      const res = await post_report_visitValidOrInvalid(this.form);
      this.$message.success("到访确认有效成功");
      this.$emit("finish", res);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  created() {
    this.form.reportId = this.data.reportId;
    this.form.validOrInvalid = this.data.validOrInvalid;
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
