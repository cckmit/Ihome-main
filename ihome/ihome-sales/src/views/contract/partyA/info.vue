<!--
 * @Description: 合同的录入页面
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 16:00:37
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-26 15:44:40
-->
<template>
  <IhPage class="text-left">
    <template v-slot:info>
      <p class="ih-info-title">甲方合同信息</p>
      <el-form
        :model="formData"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="合同标题">
              {{formData.title}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方">
              <template v-for="(item, index) in formData.partyA">
                <span :key="item.id">
                  {{item.partyA}}
                  <span v-if="index === (item.length-1)">、</span>
                </span>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方">
              {{formData.partyB}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执行时间">
              {{formData.effectiveTime}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              {{formData.handler}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="成交确认人">
              {{formData.customer}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式">
              {{formData.customerNo}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号">
              {{formData.contractCode}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归档编号">
              {{formData.fileCode}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归档状态">
              {{formData.fileState}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前状态">
              {{formData.state}}
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
        <!-- <el-row>
          <el-col :span="24">
            <div>
              <el-button type="primary">提交</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row> -->
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { get_contract_detail__id } from "@/api/contract/index";

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
  private fileList: Array<object> = [
    // {
    //   name: "abc.pdf",
    //   url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
    //   img_url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
    // },
  ];
  private fileList2: Array<object> = [];

  private async getInfo() {
    let id = this.$route.query.id;
    if (id) this.formData = await get_contract_detail__id({ id: id });
  }

  created() {
    this.getInfo();
  }
}
</script>