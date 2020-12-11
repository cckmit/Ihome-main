<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 11:30:07
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-10 16:08:39
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="组织架构"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="800px"
    style="text-align: left"
    class="dialog"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="父组织名称" prop="parentOrgName">{{
            ruleForm.parentOrgName
          }}</el-form-item>

          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="简称首字母" prop="shortNameAbbr">
            <el-input v-model="ruleForm.shortNameAbbr"></el-input>
          </el-form-item>

          <el-form-item label="开业日期" prop="openDate">
            <el-date-picker
              v-model="ruleForm.openDate"
              type="date"
              placeholder="开业日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="OA呈字" prop="oaChar">
            <el-input v-model="ruleForm.oaChar"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            style="visibility: hidden"
            label="组织层级"
            prop="level"
            >{{ ruleForm.level }}</el-form-item
          >

          <el-form-item label="简称" prop="shortName">
            <el-input v-model="ruleForm.shortName"></el-input>
          </el-form-item>
          <el-form-item label="部门分类" prop="departmentType">
            <el-select
              v-model="ruleForm.departmentType"
              clearable
              placeholder="请选择部门分类"
              class="width--100"
            >
              <el-option
                v-for="(item, index) in $root.dictAllList('DepartmentType')"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关闭日期" prop="closeDate">
            <el-date-picker
              v-model="ruleForm.closeDate"
              type="date"
              placeholder="关闭日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="ruleForm.status"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="(item, index) in $root.dictAllList('ValidType')"
                :key="index"
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
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import {
  isUpperLetterValidato,
  isChineseValidato,
  noTrim,
} from "ihome-common/util/base/form-ui";
import { post_org_add, post_org_update } from "../../api/system/index";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: {},
})
export default class OrganizationAdd extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  ruleForm: any = {
    closeDate: "2099-12-31",
    departmentType: "Business",
    name: null,
    openDate: this.$tool.todayStr(),
    orgCode: null,
    orgType: "Company",
    parentId: 0,
    shortName: null,
    status: "Valid",
    oaChar: null,
    parentOrgName: null,
  };
  rules: any = {
    type: [{ required: true, message: "请选择类型", trigger: "change" }],
    name: [
      {
        validator: noTrim,
        message: "不允许输入空格",
        trigger: "change",
      },
      { required: true, message: "请输入名称", trigger: "change" },
      { min: 2, max: 32, message: "长度在 2 到 32 个字符", trigger: "change" },
      {
        validator: isChineseValidato,
        message: "名称只能输入中文",
        trigger: "change",
      },
    ],
    shortNameAbbr: [
      {
        validator: noTrim,
        message: "不允许输入空格",
        trigger: "change",
      },
      { required: true, message: "请填写简称首字母", trigger: "change" },

      { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "change" },
      { validator: isUpperLetterValidato, trigger: "change" },
    ],
    openDate: [
      { required: true, message: "请选择开业日期", trigger: "change" },
    ],

    shortName: [
      {
        validator: noTrim,
        message: "不允许输入空格",
        trigger: "change",
      },
      { required: true, message: "请输入简称", trigger: "change" },
      { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "change" },

      {
        validator: isChineseValidato,
        message: "简称只能输入中文",
        trigger: "change",
      },
    ],
    departmentType: [
      { required: true, message: "请选择部门分类", trigger: "change" },
    ],
    closeDate: [
      { required: true, message: "请选择关闭日期", trigger: "change" },
    ],
    status: [{ required: true, message: "请选择状态", trigger: "change" }],
    oaChar: [
      {
        validator: noTrim,
        message: "不允许输入空格",
        trigger: "change",
      },
      { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "change" },
    ],
  };

  cancel() {
    this.$emit("cancel", false);
  }

  async finish(formName: any) {
    (this.$refs[formName] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      console.log(this.ruleForm);
      if (this.ruleForm.id > 0) {
        const res = await post_org_update(this.ruleForm);
        this.$message.success("修改成功");
        this.$emit("finish", res);
      } else {
        const res = await post_org_add(this.ruleForm);
        this.$message.success("添加成功");
        this.$emit("finish", res);
      }
    } else {
      console.log("error submit!!");
      // this.$message.warning("请先填好表单数据");
      return false;
    }
  }

  created() {
    Object.assign(this.ruleForm, this.data);

    console.log(this.ruleForm);
  }
}
</script>
<style lang="scss" scoped>
</style>