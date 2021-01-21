<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-02 11:18:51
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-21 17:20:12
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
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item
            label="甲方退款天数"
            prop="partyARefundDays"
          >
            <div class="inputTpye">
              <el-input
                v-model="form.partyARefundDays"
                style="width: 30%"
              >
              </el-input>
              <span class="textType">天</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row> -->
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
  };

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.finishLoading = true;
      this.form.termId = this.$route.query.id;
      if (this.data.title === "新增") {
        try {
          await post_preferential_add(this.form);
          this.finishLoading = false;
          this.$emit("finish");
        } catch (err) {
          this.finishLoading = false;
        }
      } else {
        try {
          await post_preferential_update(this.form);
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
    this.form = { ...this.data };
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
</style>