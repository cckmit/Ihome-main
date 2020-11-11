<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-07-08 14:23:16
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-11 10:51:03
--> 
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="500px"
    class="dialog text-left"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="110px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="已选渠道商"
            prop="name"
          >
            <template v-for="(item, i) in data">
              <span :key="item.id">
                <span>{{ `${item.name}` }}</span>
                <span v-if="i !== data.length - 1">、</span>
              </span>
            </template>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="选择用户">
            <IhSelectPageUser
              v-model="form.inputUser"
              clearable
            >
              <template v-slot="{ data }">
                <span style="float: left">{{ data.name }}</span>
                <span style="
                    margin-left: 20px;
                    float: right;
                    color: #8492a6;
                    font-size: 13px;
                  ">{{ data.account }}</span>
              </template>
            </IhSelectPageUser>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="finish()"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { post_company_updateInputUser } from "../../../api/developer/index";

import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: {},
})
export default class UpdateUser extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    companyId: this.data.map((v: any) => v.id),
    inputUser: null,
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
      await post_company_updateInputUser(this.form);
      this.$message.success("保存成功");
      this.$emit("finish");
    } else {
      console.log("error submit!!");
      return false;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss" >
.ih-dialog {
  .el-form-item__content {
    margin-right: 40px;
  }
  .el-input,
  .el-select {
    width: 100%;
  }
}
</style>
