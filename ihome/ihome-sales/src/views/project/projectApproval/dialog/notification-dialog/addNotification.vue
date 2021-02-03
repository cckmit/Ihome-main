<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-02 11:18:51
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-03 11:35:42
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="600px"
    class="dialog text-left"
    :title="`${data.title}电子优惠告知书`"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="150px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="优惠服务费缴纳金额"
            prop="premiumReceived"
          >
            <div class="inputTpye">
              <el-input
                v-model="form.premiumReceived"
                style="width: 30%"
              >
              </el-input>
              <span class="textType">元</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="优惠方式说明"
            prop="modeDescription"
          >
            <el-input
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              :placeholder="`请输入优惠方式说明`"
              v-model="form.modeDescription"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="优惠期限"
            prop="timeList"
          >
            <el-date-picker
              v-model="form.timeList"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="是否显示“本优惠不在《认购书》上重复体现”条款"
            prop="exPreferentialItem"
            class="formItem"
          >
            <el-switch
              v-model="form.exPreferentialItem"
              active-color="#ef9d39"
              inactive-color="#7b7b7b"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        :loading="finishLoading"
        @click="finish()"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { isNumberValidato } from "ihome-common/util/base/form-ui";
import { post_preferential_add, post_preferential_update } from "@/api/project";
@Component({
  components: {},
})
export default class AddNotification extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  finishLoading = false;

  form: any = {
    premiumReceived: null,
    modeDescription: null,
    startTime: null,
    endTime: null,
    timeList: [],
    exPreferentialItem: false,
  };
  pickerOptions: any = {
    disabledDate: (time: any) => {
      return this.dataTimeChange(time);
    },
  };
  rules: any = {
    premiumReceived: [
      {
        required: true,
        message: "请输入优惠服务费缴纳金额",
        trigger: "change",
      },
      {
        validator: isNumberValidato,
        trigger: "change",
      },
    ],
    modeDescription: [
      { required: true, message: "请输入优惠方式说明", trigger: "change" },
    ],
    timeList: [
      {
        required: true,
        message: "请选择优惠期限",
        trigger: "change",
      },
    ],
  };
  dataTimeChange(time: any) {
    let start: any =
      new Date(this.form.noChangeTime[0]).getTime() - 24 * 60 * 60 * 1000;
    let end: any = new Date(this.form.noChangeTime[1]).getTime();
    return time.getTime() < start || time.getTime() > end;
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
      let obj = { ...this.form };
      this.finishLoading = true;
      obj.termId = this.$route.query.id;
      obj.startTime = this.form.timeList[0];
      obj.endTime = this.form.timeList[1];
      obj.exPreferentialItem = this.form.exPreferentialItem ? 1 : 0;
      if (this.data.title === "新增") {
        try {
          await post_preferential_add(obj);
          this.finishLoading = false;
          this.$emit("finish");
        } catch (err) {
          this.finishLoading = false;
        }
      } else {
        try {
          await post_preferential_update(obj);
          this.finishLoading = false;
          this.$emit("finish");
        } catch (err) {
          this.finishLoading = false;
        }
      }
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async created() {
    this.form = {
      ...this.data,
      exPreferentialItem: this.data.exPreferentialItem ? true : false,
    };
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss" >
.inputTpye {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.textType {
  width: 60px;
  text-align: center;
}
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>