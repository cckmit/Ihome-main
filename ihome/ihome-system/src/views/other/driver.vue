<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-09-02 16:41:21
 * @LastEditors: zyc
 * @LastEditTime: 2020-09-02 17:44:03
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
      className: "scoped-class", // 包装类名
      animate: true, // 动画
      opacity: 0.75, // 遮罩层不透明度（0表示仅弹出且不覆盖）
      padding: 10, // 边距
      allowClose: true, // 点击遮罩层是否关闭
      overlayClickNext: false, // Should it move to next step on overlay click
      doneBtnText: "完成", // 最后一个按钮上的文本
      closeBtnText: "关闭", // “关闭”按钮上的文本
      nextBtnText: "下一步", // “下一步”按钮上的文本
      prevBtnText: "上一步", // “上一步”按钮上的文本
      showButtons: true, // 不显示控制按钮（弹窗底部）
      keyboardControl: true, // 允许通过键盘进行控制（esc以关闭，箭头键移动）
      scrollIntoViewOptions: {}, // We use `scrollIntoView()` when possible, pass here the options for it if you want any
      // onHighlightStarted: (Element) {}, // 在元素即将突出显示时调用
      // onHighlighted: (Element) {}, // 当元素完全突出显示时调用
      // onDeselected: (Element) {}, // 取消选择元素时调用
      // onReset: (Element) {},        // 覆盖即将清除时调用
      // onNext: (Element) => {},      // 在任何步骤转到下一步时调用
      // onPrevious: (Element) => {},  // 在任何步骤转到上一步时调用
    });
    setTimeout(() => {
      this.driver.defineSteps(steps);
      this.driver.start(0); //可以指定从第几步开始
    }, 0);
  }
}
</script>
<style lang="scss" scoped>
</style>