<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-21 18:06:34
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-23 18:10:51
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-col :span="4">
        <el-row>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="失效日期" prop="date">
              <el-form-item prop="date">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="creat()">创建</el-button>
      </el-col>
    </template>

    <div class="imgList">
      <img src alt />

      <el-link class="elLink">下载二维码</el-link>
    </div>
  </ih-page>
</template>
  
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_channelInvitationCode_create,
  get_channelInvitationCode_download,
} from "../../../api/channel/index";
@Component({
  components: {},
})
export default class Home extends Vue {
  ruleForm: any = { date: "", InviteCode: "" };
  rules: any = {
    name: [{ required: true, message: "请输入失效日期" }],
  };
  creat() {
    this.InviteCode();
    console.log("创建");
    console.log(this.ruleForm.InviteCode.data);
  }
  async InviteCode() {
    let InviteCode = await get_channelInvitationCode_create(this.ruleForm);
  }
}
</script>
<style lang="scss" scoped>
.imgList {
  border: 8px solid #cccccc;
  border-top: 0px;
  width: 300px;
  height: 300px;
  margin-left: 60px;
  margin-top: 80px;
}
.elLink {
  position: relative;
  left: 0px;
  top: 335px;
}
</style>