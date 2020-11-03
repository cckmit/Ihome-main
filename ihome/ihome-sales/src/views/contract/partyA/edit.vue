<!--
 * @Description: 合同的修改页面
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 16:00:37
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-03 14:47:59
-->
<template>
  <IhPage>
    <template v-slot:info>
      <p class="ih-info-title">甲方合同信息</p>
      <el-form
        :model="formData"
        :rules="rule"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="合同标题"
              prop="title"
            >
              <el-input
                v-model="formData.title"
                placeholder="合同标题"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="甲方"
              prop="partyA"
            >
              <el-select
                v-model="formData.partyA"
                placeholder="甲方"
                filterable
                multiple
                value-key="id"
                class="width--100"
              >
                <el-option
                  v-for="(item) in partyAList"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="乙方"
              prop="partyB"
            >
              <el-select
                v-model="formData.partyB"
                placeholder="乙方"
                clearable
                filterable
                class="width--100"
              >
                <el-option
                  v-for="(item) in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="执行时间"
              prop="effectiveTime"
            >
              <el-date-picker
                style="width:100%;"
                v-model="formData.effectiveTime"
                type="date"
                align="left"
                placeholder="年/月/日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              <IhSelectPageUser
                v-model="formData.handler"
                clearable
                class="width--100"
              >
                <template v-slot="{ data }">
                  <span style="float: left">{{ data.name }}</span>
                  <span
                    class="margin-left-30"
                    style="float: right; color: #8492a6; font-size: 13px"
                  >{{ data.employeeCode }}</span>
                </template>
              </IhSelectPageUser>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="成交确认人">
              <el-input
                v-model="formData.customer"
                placeholder="成交确认人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式">
              <el-input
                v-model="formData.customerNo"
                placeholder="成交确认人联系方式"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号">
              <el-input
                v-model="formData.name"
                placeholder="合同编号(自动生成)"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归档编号">
              <el-input
                v-model="formData.name"
                placeholder="归档编号(自动生成)"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归档状态">
              <el-select
                v-model="formData.name"
                placeholder="归档状态"
                clearable
                disabled
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前状态">
              <el-select
                v-model="formData.name"
                placeholder="当前状态"
                clearable
                disabled
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="甲方合同附件">
              <IhUpload
                :file-list="fileList"
                size="100px"
                :limit="1"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="盖章版归档">
              <IhUpload
                :file-list="fileList2"
                size="100px"
                :limit="1"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div>
              <el-button
                type="primary"
                @click="submit()"
              >提交</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";

import { get_contract_detail__id } from "@/api/contract/index";
import { post_company_listAll } from "@/api/developer/index";
import { post_company_getAll } from "@/api/system/index";

@Component({})
export default class PartyAadd extends Vue {
  private formData: any = {
    title: "",
    partyA: [],
    partyB: "",
    effectiveTime: "",
    handler: "",
    customer: "",
    customerNo: "",
  };
  private fileList: Array<object> = [];
  private fileList2: Array<object> = [];
  private companyList: any = [];
  private partyAList: any = [];
  private rule: any = {
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
    partyA: [
      { required: true, message: "请选择甲方", trigger: ["blur", "change"] },
    ],
    partyB: [
      { required: true, message: "请选择乙方", trigger: ["blur", "change"] },
    ],
    effectiveTime: [
      {
        required: true,
        message: "执行时间不能为空",
        trigger: ["blur", "change"],
      },
    ],
  };

  private async getCompanyList() {
    this.companyList = await post_company_getAll({ name: "" });
  }
  private async getPartyAList() {
    this.partyAList = await post_company_listAll({ name: "" });
  }
  @NoRepeatHttp()
  private submit() {
    (this.$refs["ruleForm"] as ElForm).validate(async (val) => {
      if (val) {
        console.log(this.formData);

        this.$message.success("提交成功");
      }
    });
  }
  private async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      let res = await get_contract_detail__id({ id: id });
      console.log(res);
    }
  }

  created() {
    this.getPartyAList();
    this.getCompanyList();
    this.getInfo();
  }
}
</script>