<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2021-01-25 15:43:45
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-25 16:05:13
-->
<template>
  <el-dialog
    v-dialogDrag
    title="审核业绩确认时间"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="400px"
    style="text-align: left"
    class="dialog">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" @submit.native.prevent>
      <el-row>
        <el-col>
          <el-form-item label="确认时间" prop="date">
            <el-date-picker
              v-model="form.date"
              type="datetime"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="cancel()">取 消</el-button>
      <el-button :loading="loading" type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {},
    mixins: [],
  })
  export default class ReviewDate extends Vue {
    constructor() {
      super();
    }
    @Prop({default: null}) data: any;
    @Prop({default: null}) loading: any = false;
    dialogVisible = true;
    public form: any = {
      date: null
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
    rules: any = {
      date: [
        {required: true, message: "请选择业绩确认时间", trigger: "change"},
      ]
    }

    created() {
      console.log(123);
    }

    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    async finish() {
      (this.$refs["form"] as ElForm).validate(this.submitFinish);
    }

    @NoRepeatHttp()
    submitFinish(valid: any) {
      if (valid) {
        this.$emit("finish", this.form.date);
      }
    }
  }
</script>
<style lang="scss" scoped>
.dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px 10px 20px;
  }
}
</style>