<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-01 10:32:40
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-11 09:50:28
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
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <p>
        <b>账号信息</b>
      </p>
      <el-row>
        <el-col :span="12">
          <el-form-item label="账号类型" prop="accountType">
            <el-select v-model="form.accountType" placeholder="请选择账号类型">
              <el-option
                v-for="item in $root.dictAllList('UserAccountType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="登录账号" prop="account">
            <el-input v-model="form.account" placeholder="登录账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="mobilePhone">
            <el-input
              v-model="form.mobilePhone"
              placeholder="手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p>
        <b>员工信息</b>
      </p>
      <el-row>
        <el-col :span="12">
          <el-form-item label="员工工号" :prop="getProp('employeeCode')">
            <el-input
              v-model="form.employeeCode"
              placeholder="员工工号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属组织" :prop="getProp('orgId')">
            <SelectOrganizationTree
              :orgId="form.orgId"
              @callback="(id) => (form.orgId = id)"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="入职日期" :prop="getProp('employmentDate')">
            <el-date-picker
              v-model="form.employmentDate"
              type="date"
              placeholder="入职日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="离职日期" :prop="getProp('leaveDate')">
            <el-date-picker
              v-model="form.leaveDate"
              type="date"
              placeholder="离职日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="职能类别" :prop="getProp('workType')">
            <el-select
              v-model="form.workType"
              clearable
              placeholder="请选择职能类别"
            >
              <el-option
                v-for="item in $root.dictAllList('UserWorkType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="人员类型" :prop="getProp('employeeType')">
            <el-select
              v-model="form.employeeType"
              clearable
              placeholder="请选择人员类型"
            >
              <el-option
                v-for="item in $root.dictAllList('EmployeeType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱" :prop="getProp('email')">
            <el-input v-model="form.email" placeholder="电子邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="雇员状态" :prop="getProp('employeeStatus')">
            <el-select
              v-model="form.employeeStatus"
              clearable
              placeholder="请选择雇员状态"
            >
              <el-option
                v-for="item in $root.dictAllList('EmployeeStatus')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
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

import SelectOrganizationTree from "@/components/SelectOrganizationTree.vue";

import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  post_user_add,
  post_user_update,
  get_user_get__id,
} from "../../api/system";
import { phoneValidator } from "ihome-common/util/base/form-ui";
@Component({
  components: { SelectOrganizationTree },
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
    accountType: "Juheng",
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
    accountType: [
      { required: true, message: "请选择用户类型", trigger: "change" },
    ],
    name: [
      { required: true, message: "请输入名称", trigger: "change" },
      { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "change" },
    ],
    account: [
      { required: true, message: "请输入登录账号", trigger: "change" },
      { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "change" },
    ],
    mobilePhone: [
      { required: true, message: "请输入手机号码", trigger: "change" },

      { validator: phoneValidator, trigger: "change" },
    ],

    employeeCode: [
      { required: true, message: "请选择员工工号", trigger: "change" },
    ],
    orgId: [{ required: true, message: "请选择归属组织", trigger: "change" }],

    employmentDate: [
      { required: true, message: "请选择入职日期", trigger: "change" },
    ],
    leaveDate: [
      { required: true, message: "请选择离职日期", trigger: "change" },
    ],
    workType: [
      { required: true, message: "请选择职能类别", trigger: "change" },
    ],
    employeeType: [
      { required: true, message: "请选择人员类型", trigger: "change" },
    ],
    email: [
      { required: true, message: "邮箱必填", trigger: "change" },
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: "change",
      },
    ],
    employeeStatus: [
      { required: true, message: "请选择雇员状态", trigger: "change" },
    ],
  };
  getProp(type: any) {
    // let list: string[] = ["Ihome", "Juheng", "Poly"];
    let list: string[] = (this.$root as any)
      .dictAllList("UserAccountType", "Staff")
      .map((i: any) => {
        return i.code;
      });
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
      console.log(this.form);
      if (this.form.id > 0) {
        const res = await post_user_update(this.form);
        this.$message.success("用户修改成功");
        this.$emit("finish", res);
      } else {
        const res = await post_user_add(this.form);
        this.$message.success("用户新增成功");
        // this.$alert(res, "用户新增成功，密码是：");
        this.$emit("finish", res);
      }
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async created() {
    console.log(this.data);
    if (this.data && this.data.id > 0) {
      const res = await get_user_get__id({ id: this.data.id });
      this.form = res;
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
