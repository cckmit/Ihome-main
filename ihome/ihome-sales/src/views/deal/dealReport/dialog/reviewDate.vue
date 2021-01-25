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
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
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
    dialogVisible = true;
    public form: any = {
      date: null
    };
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