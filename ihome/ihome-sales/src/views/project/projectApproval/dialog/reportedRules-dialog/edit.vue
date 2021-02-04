<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-30 17:32:39
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-04 16:35:36
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="700px"
    class="dialog text-left"
    title="客户报备规则编辑"
  >
    <el-form
      label-width="120px"
      :model="form"
      ref="form"
      :rules="rules"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="开发商保护期"
            prop="developerProtectionPeriod"
          >
            <div class="inputTpye">
              <el-input
                v-model="form.developerProtectionPeriod"
                style="width: 20%"
              >
              </el-input>
              <span class="textType">小时</span>
              <span class="hint">保护期内，已完成认购的客户不能报备</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="报备类型"
            prop='reportTypeEnum'
          >
            <el-select
              v-model="form.reportTypeEnum"
              clearable
              placeholder="请选择"
              class="width--50"
            >
              <el-option
                v-for="item in $root.dictAllList('ReportType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="到访为王">
            <el-switch
              v-model="exVisit"
              active-color="#13ce66"
              inactive-color="#909399"
            >
            </el-switch>
            <span
              class="hint"
              style="margin-left: 120px"
            >开启后，无报备保护期，客户界定以到访为准</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!exVisit">
        <el-col :span="24">
          <el-form-item
            label="报备有效时间"
            prop="filingEffectiveTime"
          >
            <div class="inputTpye">
              <el-input
                v-model="form.filingEffectiveTime"
                style="width: 20%"
              >
              </el-input>
              <span class="textType">小时</span>
              <span class="hint">系统对报备有效客户的保护时间，超时自动变报备无效</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="客户保护期时间"
            prop="customerProtectionPeriod"
          >
            <div class="inputTpye">
              <el-input
                v-model="form.customerProtectionPeriod"
                style="width: 20%"
              >
              </el-input>
              <span class="textType">小时</span>
              <span class="hint">系统对到访有效客户的保护时间，超时自动变到访无效</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="报备说明">
            <el-input
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              maxlength="500"
              placeholder="请输入备注"
              v-model="form.reportDescription"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="到访说明">
            <el-input
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              maxlength="500"
              placeholder="请输入备注"
              v-model="form.visitDescription"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="开发商界定规则">
            <el-input
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              maxlength="500"
              placeholder="请输入备注"
              v-model="form.developersRules"
            >
            </el-input>
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
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  post_customerReportRule_add,
  post_customerReportRule_update,
} from "@/api/project/index.ts";
import { isNumberValidato } from "ihome-common/util/base/form-ui";
@Component({
  components: {},
})
export default class ReportedRulesEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    developerProtectionPeriod: null,
    exVisit: null,
    filingEffectiveTime: null,
    customerProtectionPeriod: null,
    reportDescription: null,
    visitDescription: null,
    developersRules: null,
    termId: null,
  };

  rules: any = {
    reportTypeEnum: [
      {
        required: true,
        message: "请选择报备类型",
        trigger: "change",
      },
    ],
    developerProtectionPeriod: [
      {
        validator: isNumberValidato,
        trigger: "change",
      },
    ],
    filingEffectiveTime: [
      {
        validator: isNumberValidato,
        trigger: "change",
      },
    ],
    customerProtectionPeriod: [
      {
        validator: isNumberValidato,
        trigger: "change",
      },
    ],
  };
  exVisit = false;

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.form.termId = this.$route.query.id;
      this.form.exVisit = this.exVisit ? 1 : 0;
      if (this.data.reportId) {
        await post_customerReportRule_update(this.form);
        this.$message.success("修改成功");
      } else {
        await post_customerReportRule_add(this.form);
        this.$message.success("新增成功");
      }
      this.$emit("finish", this.form);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  created() {
    this.form = { ...this.data };
    this.exVisit = this.data.exVisit ? true : false;
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  /deep/ .el-dialog {
    margin-top: 4vh !important;
  }
}
.inputTpye {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.textType {
  width: 60px;
  text-align: center;
}
.hint {
  color: #909399;
}
</style>