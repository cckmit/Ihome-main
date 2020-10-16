<!--
 * @Description: 
 * @version: 
 * @Author: ywl
 * @Date: 2020-07-08 14:23:16
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-15 18:32:50
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
            <el-select
              style="width: 100%"
              v-model="user"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in testList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
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
import {
  post_channel_modifyFollowUser,
  post_channel_modifyInputUser,
} from "@/api/channel/index";

import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: {},
})
export default class UpdateUser extends Vue {
  @Prop({ default: [] }) data!: Array<object>;
  @Prop() isInput!: boolean;
  dialogVisible = true;

  form: any = {
    channelIds: this.data.map((v: any) => v.id),
  };
  private user = "";
  testList = [
    { value: "管理员1", id: 1 },
    { value: "管理员2", id: 2 },
    { value: "管理员3", id: 3 },
  ];

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      if (this.isInput) {
        this.form.inputUser = this.user;
        await post_channel_modifyInputUser(this.form);
      } else {
        this.form.followUserId = this.user;
        await post_channel_modifyFollowUser(this.form);
      }
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