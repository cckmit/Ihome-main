<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-07-08 14:23:16
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-25 17:09:03
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
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="账户姓名" prop="name">
            <el-input v-model="form.name" placeholder="账户姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="账号" prop="mobilePhone">
            <el-input v-model="form.mobilePhone" placeholder="账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="开户银行" prop="mobilePhone">
            <el-input
              v-model="form.mobilePhone"
              placeholder="开户银行"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="账号类型">
            <el-select
              style="width: 100%"
              v-model="form.mobilePhone"
              clearable
              placeholder="账号类型"
            >
              <el-option
                v-for="item in $root.displayList('account')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";

import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  emailOrNullValidato,
  phoneValidator,
} from "ihome-common/util/base/form-ui";
@Component({
  components: {},
})
export default class UserAdd extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    id: null,
    account: null,
    accountType: "Ihome",
    email: null,
    employeeCode: null,
    employeeStatus: "On",
    employeeType: "Formal",
    employmentDate: this.$tool.todayStr(),
    leaveDate: "2099-12-31",
    mobilePhone: null,
    name: null,
    orgId: null,
    workType: "FrontLine",
  };
  rules: any = {
    name: [
      { required: true, message: "请输入名称", trigger: "change" },
      { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "change" },
    ],
    mobilePhone: [
      { required: true, message: "请输入手机号码", trigger: "change" },

      { validator: phoneValidator, trigger: "change" },
    ],
    email: [
      { trigger: "change" },
      { validator: emailOrNullValidato, trigger: "change" },
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
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      // console.log(this.form);
      // if (this.form.id > 0) {
      //   const res = await post_user_update(this.form);
      //   this.$message.success("修改成功");
      //   this.$emit("finish", res);
      // } else {
      //   const res = await post_user_add(this.form);
      //   this.$alert(res, "用户新增成功，密码是：");
      //   this.$emit("finish", res);
      // }
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async created() {
    console.log(this.data);
    if (this.data && this.data.id > 0) {
      // const res = await get_user_get__id({ id: this.data.id });
      // this.form = res;
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