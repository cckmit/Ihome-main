<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-10-09 09:35:09
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-10 16:19:02
-->

<template>
  <el-dialog
    v-dialogDrag
    title="用户"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="800px"
    class="dialog text-left"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="城市等级"
            :prop="getProp('workType')"
          >
            <el-select
              v-model="form.workType"
              clearable
              placeholder="请选择职能类别"
            >
              <el-option
                v-for="item in $root.displayList(
                  'ChannelLevelStandardAttachment'
                )"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="渠道等级"
            :prop="getProp('employeeType')"
          >
            <el-select
              v-model="form.employeeType"
              clearable
              placeholder="请选择人员类型"
            >
              <el-option
                v-for="item in $root.displayList('ChannelLevel')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";

// import SelectOrganizationTree from "@/components/SelectOrganizationTree.vue";

import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
// import {
//   post_user_add,
//   post_user_update,
//   get_user_get__id,
// } from "../../api/system";

@Component({
  //   components: { SelectOrganizationTree },
})
export default class EntryToModify extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    workType: "bigPlatform",
    employeeType: "firstLevel",
  };

  //   created() {
  //     console.log(this.$root);
  //   }
  rules: any = {
    workType: [
      { required: true, message: "请选择职能类别", trigger: "change" },
    ],
    employeeType: [
      { required: true, message: "请选择人员类型", trigger: "change" },
    ],
  };
  getProp(type: any) {
    let list: string[] = ["Ihome", "Juheng", "Poly"];
    let required = list.includes(this.form.accountType);
    if (required) {
      return type;
    } else {
      return null;
    }
  }
  cancel() {
    console.log("取消");

    this.$emit("cancel", false);
  }
  finish() {
    console.log("确定");

    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    console.log(valid);
    // if (valid) {
    //   console.log(this.form);
    //   if (this.form.id > 0) {
    //     const res = await post_user_update(this.form);
    //     this.$message.success("修改成功");
    //     this.$emit("finish", res);
    //   } else {
    //     const res = await post_user_add(this.form);
    //     this.$alert(res, "用户新增成功，密码是：");
    //     this.$emit("finish", res);
    //   }
    // } else {
    //   console.log("error submit!!");
    //   return false;
    // }
  }
  async created() {
    // console.log(this.data);
    // if (this.data && this.data.id > 0) {
    //   const res = await get_user_get__id({ id: this.data.id });
    //   this.form = res;
    // }
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
