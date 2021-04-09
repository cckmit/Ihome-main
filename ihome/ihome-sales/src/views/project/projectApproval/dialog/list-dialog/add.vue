<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 18:41:30
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-01 17:56:02
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="600px"
    class="text-left dialog-table"
    :title="`创建立项`"
  >
    <el-form
      ref="form"
      label-width="100px"
      :rules="rules"
      :model="form"
    >
      <el-row>
        <el-col :span="20">
          <el-form-item
            prop="proName"
            label="合作项目"
          >
            <el-input
              placeholder="请选择合作项目"
              v-model="form.proName"
              class="input-with-select"
              readonly
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="basicInfoDialog = true"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item
            label="启动事业部"
            prop="startDivisionId"
          >
            <IhSelectPageDivision
              v-model="form.startDivisionId"
              @change="form.companyId = null"
            ></IhSelectPageDivision>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item
            label="公司主体"
            prop="companyId"
          >
            <IhSelectPageByOrgCompany
              v-model="form.companyId"
              :proId="form.startDivisionId"
            ></IhSelectPageByOrgCompany>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item
            label="周期时间"
            prop="timeList"
          >
            <el-date-picker
              style="width:100%"
              @change='timeChange'
              v-model="form.timeList"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="$root.pickerOptions"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
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
    <ih-dialog :show="basicInfoDialog">
      <BasicInfo
        @cancel="() => (basicInfoDialog = false)"
        @finish="(data) => basicInfoFinish(data)"
      />
    </ih-dialog>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BasicInfo from "../list-dialog/basicinfo.vue";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import { post_term_add } from "@/api/project/index.ts";

@Component({
  components: { BasicInfo },
})
export default class AddDialog extends Vue {
  dialogVisible = true;
  basicInfoDialog = false;
  form: any = {
    termStart: null,
    termEnd: null,
    proId: null,
    proName: null,
    startDivisionId: null,
    companyId: null,
    timeList: [],
  };

  rules: any = {
    proName: [{ required: true, message: "请选择合作项目", trigger: "change" }],
    timeList: [
      { required: true, message: "请选择周期时间", trigger: "change" },
    ],
    startDivisionId: [
      {
        required: true,
        message: "请选择启动事业部",
        trigger: "change",
      },
    ],
    companyId: [
      {
        required: true,
        message: "请选择公司主体",
        trigger: "change",
      },
    ],
  };

  timeChange(val: any) {
    this.form.termStart = val[0];
    this.form.termEnd = val[1];
  }

  cancel() {
    this.$emit("cancel");
  }

  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      delete this.form.proName;
      delete this.form.timeList;
      const res = await post_term_add(this.form);
      this.$message.success("保存成功");
      this.$emit("finish", res);
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  basicInfoFinish(data: any) {
    this.basicInfoDialog = false;
    this.form.proId = data[0].proId;
    this.form.proName = data[0].proName;
  }
}
</script>
<style lang="scss" scoped>
.dialog-table {
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>