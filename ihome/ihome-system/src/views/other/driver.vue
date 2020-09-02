<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-09-02 16:41:21
 * @LastEditors: zyc
 * @LastEditTime: 2020-09-02 17:04:57
-->
<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="活动名称" prop="name" class="text-left" id="id1">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region" class="text-left" id="id2">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required class="text-left" id="id3">
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送" prop="delivery" class="text-left" id="id4">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="活动性质" prop="type" class="text-left" id="id5">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源" prop="resource" class="text-left" id="id6">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc" class="text-left" id="id7">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" id="id8">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')" class="reset-btn">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="guide()">新手引导</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import steps from "./guide";

@Component({
  components: {},
})
export default class DriverPage extends Vue {
  driver: any = null;
  ruleForm: any = {
    name: "",
    region: "",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: "",
  };
  rules: any = {
    name: [
      { required: true, message: "请输入活动名称", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    ],
    region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
    date1: [
      {
        type: "date",
        required: true,
        message: "请选择日期",
        trigger: "change",
      },
    ],
    date2: [
      {
        type: "date",
        required: true,
        message: "请选择时间",
        trigger: "change",
      },
    ],
    type: [
      {
        type: "array",
        required: true,
        message: "请至少选择一个活动性质",
        trigger: "change",
      },
    ],
    resource: [
      { required: true, message: "请选择活动资源", trigger: "change" },
    ],
    desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
  };
  submitForm(formName: any) {
    (this.$refs[formName] as any).validate((valid: any) => {
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  resetForm(formName: any) {
    (this.$refs[formName] as any).resetFields();
  }
  //   mounted() {}
  guide() {
    this.driver = new Driver({
      className: "scoped-class", // className to wrap driver.js popover
      animate: true, // Animate while changing highlighted element
      opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
      padding: 10, // Distance of element from around the edges
      allowClose: true, // Whether clicking on overlay should close or not
      overlayClickNext: false, // Should it move to next step on overlay click
      doneBtnText: "完成", // Text on the final button
      closeBtnText: "关闭", // Text on the close button for this step
      nextBtnText: "下一步", // Next button text for this step
      prevBtnText: "上一步", // Previous button text for this step
      // Called when moving to next step on any step
    });
    setTimeout(() => {
      this.driver.defineSteps(steps);
      this.driver.start();
    }, 0);
  }
}
</script>
<style lang="scss" scoped>
</style>