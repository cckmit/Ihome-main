<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-21 18:06:34
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-29 11:53:37
-->
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="失效日期" prop="expiresTime">
                <el-form-item prop="expiresTime">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    v-model="ruleForm.expiresTime"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <el-form-item label="事业部">
              <el-select
                v-model="ruleForm.division"
                clearable
                placeholder="事业部"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('division')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-button type="primary" @click="creat()">创建</el-button>
    </template>
    <template v-slot:info>
      <div class="imgList">
        <img src="" alt="" />
      </div>
      <el-link type="success" class="elLink">下载二维码</el-link>
    </template>
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
  ruleForm: any = {
    expiresTime: "",
    invitationCode: "",
    Imgrl: "",
    division: 1,
  };

  rules: any = {
    expiresTime: [{ required: true, message: "请输入失效日期" }],
  };
  creat() {
    this.InviteCode();
    console.log("创建");
    // this.getImgurl();
  }
  async InviteCode() {
    let invitationCode = await get_channelInvitationCode_create({
      expiresTime: this.ruleForm.expiresTime,
      departmentOrgId: this.ruleForm.division,
    });
    // let Imgrl = await get_channelInvitationCode_download({
    //   invitationCode: invitationCode,
    // });
  }
  // async getImgurl() {
  //   let Imgrl = await get_channelInvitationCode_download(InviteCode);
  // }
}
</script>
<style lang="scss" scoped>
.imgList {
  border: 8px solid #cccccc;
  border-top: 0px;
  width: 300px;
  height: 300px;
  margin-left: 60px;
  margin-top: 30px;
}
.elLink {
  position: relative;
  left: -700px;
  margin-top: 15px;
}
</style>