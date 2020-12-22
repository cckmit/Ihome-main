<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-13 19:06:12
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-22 17:22:08
-->
<template>
  <el-dialog
    v-dialogDrag
    title="二维码"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="800px"
    style="text-align: left"
    class="dialog"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="失效时间" prop="expiresTime">
        <el-date-picker
          v-model="form.expiresTime"
          type="date"
          placeholder="失效时间"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="事业部" prop="departmentOrgId">
        <IhSelectPageDivision
          placeholder="事业部"
          v-model="form.departmentOrgId"
          :searchName="form.departmentName"
          clearable
          value-key="id"
        ></IhSelectPageDivision>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-button type="primary" @click="finish('ruleForm')">创建</el-button>
      </el-form-item>
      <div v-show="url">
        <el-form-item label="" prop="">
          <el-image  
            style="width: 300px; height: 300px"
            :src="url"
            fit="fill"
          ></el-image>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-link
            style="color: #409eff"
            class="margin-right-10"
            type="primary"
            @click.native.prevent="download()"
            >下载</el-link
          >
        </el-form-item>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { get_channelInvitationCode_create } from "../../../api/channel/index";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: {},
})
export default class InvitationCodeAdd extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    expiresTime: this.$tool.currentAddDay(14),
    departmentOrgId: null,
  };
  divisionList: any = [
    {
      label: "测试数据",
      value: 1,
    },
    {
      label: "测试数据2",
      value: 2,
    },
  ];
  pickerOptions = {
    disabledDate(time: any) {
      // 在科学计数法中，为了使公式简便，可以用带“E”的格式表示。例如1.03乘10的8次方，可简写为“1.03e8”的形式
      // 一天是24*60*60*1000 = 86400000 = 8.64e7
      return (
        time.getTime() < Date.now() - 24 * 60 * 60 * 1000 ||
        time.getTime() > Date.now() + 14 * 24 * 60 * 60 * 1000
      );
    },
  };

  rules: any = {
    expiresTime: [
      { required: true, message: "请选择失效时间", trigger: "change" },
    ],
    departmentOrgId: [
      { required: true, message: "请选择事业部", trigger: "change" },
    ],
  };
  url: any = null;

  cancel() {
    this.$emit("finish", true);
  }

  async finish(formName: any) {
    (this.$refs[formName] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      const res = await get_channelInvitationCode_create(this.form);
      this.url = this.url = this.$tool.downloadLongFileUrl(res);
      this.$message.success("创建成功");
    }
  }

  download() {
    window.open(this.url);
  }
}
</script>
<style lang="scss" scoped>
</style>