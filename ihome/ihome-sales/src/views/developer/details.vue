<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-10 18:22:17
-->
<template>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane label="详情信息" name="first">
      <ih-page>
        <template v-slot:form>
          <p class="ih-info-title">基础信息</p>
          <el-form ref="form" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称" required align="left">
                  <span class="text-ellipsis">{{ resPageInfo.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="信用代码" required align="left">
                  <span>{{ resPageInfo.creditCode }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="简称" required align="left">
                  <span>{{ resPageInfo.shortName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-collapse-transition>
              <div v-show="searchOpen">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="类型" required align="left">
                      <span>{{ resPageInfo.type }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="法定代表人" required align="left">
                      <span>{{ resPageInfo.legalPerson }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="法人身份证号码" align="left">
                      <span>{{ resPageInfo.legalPersonId }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="成立日期" required align="left">
                      <span>{{ resPageInfo.setupTime }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="注册资本" required align="left">
                      <span>{{ resPageInfo.capital }}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="营业期限" align="left">
                      <span>{{ resPageInfo.businessTime }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="省市区">
                      <IhCascader
                        :disabled="true"
                        v-model="resPageInfo.provinceOption"
                      ></IhCascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="住所" required align="left">
                      <span>{{ resPageInfo.address }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="录入人" required align="left">
                      <span>{{ resPageInfo.inputUser }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="状态" align="left">
                      <span>{{
                        $root.displayName("devStatus", resPageInfo.status)
                      }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-transition>
          </el-form>
        </template>

        <template v-slot:btn>
          <el-row>
            <el-link
              type="primary"
              class="float-right margin-right-40"
              @click="openToggle()"
              >{{ searchOpen ? "收起" : "展开" }}</el-link
            >
          </el-row>
        </template>

        <template v-slot:table>
          <p class="ih-info-title">联系人信息</p>
          <br />
          <el-table
            class="ih-table"
            :data="resPageInfo.contactList"
            style="width: 100%"
          >
            <el-table-column prop="contactName" label="姓名"></el-table-column>
            <el-table-column prop="contactNum" label="手机号"></el-table-column>
            <el-table-column prop="email" label="电子邮箱"></el-table-column>
          </el-table>
          <br />
          <p class="ih-info-title">账户信息</p>
          <br />
          <el-table
            class="ih-table"
            :data="resPageInfo.bankList"
            style="width: 100%"
          >
            <el-table-column prop="name" label="账户名称"></el-table-column>
            <el-table-column prop="number" label="账号"></el-table-column>
            <el-table-column prop="bank" label="开户银行"></el-table-column>
            <el-table-column prop="type" label="账号类型">
              <template v-slot="{ row }">{{
                $root.displayName("accountTypes", row.type)
              }}</template>
            </el-table-column>
          </el-table>
          <br />
          <p class="ih-info-title">附件信息</p>
          <br />
          <el-table
            class="ih-table"
            :data="resPageInfo.attachmentList"
            style="width: 100%"
          >
            <el-table-column prop="type" label="类型">
              <template v-slot="{ row }">{{
                $root.displayName("accessoryTpye", row.type)
              }}</template>
            </el-table-column>
            <el-table-column prop="fileId" label="附件"></el-table-column>
          </el-table>
          <br />

          <p class="ih-info-title">企业概况</p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="请输入内容"
            v-model="resPageInfo.remark"
          >
          </el-input>

          <div v-if="isRemove" class="text-left">
            <p class="ih-info-title">撤回信息</p>
            <p class="msg-title">撤回原因</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="请输入内容"
              v-model="resPageInfo.recallReason"
            >
            </el-input>
            <!-- <div class="bottom"> -->
            <el-button
              class="margin-top-30"
              @click="submitRecall()"
              type="primary"
              >提交</el-button
            >
            <!-- </div> -->
          </div>
          <div v-if="isCheck" class="text-left">
            <p class="ih-info-title">审核信息</p>
            <p class="msg-title">审核意见</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="请输入内容"
              v-model="resPageInfo.checkOpinion"
            >
            </el-input>
            <el-button class="margin-top-30" @click="pass(true)" type="primary"
              >通过</el-button
            >
            <el-button class="margin-top-30" @click="pass(false)" type="primary"
              >驳回</el-button
            >
          </div>
        </template>
      </ih-page>
    </el-tab-pane>
    <el-tab-pane label="操作日志" name="second">
      <el-table class="ih-table" :data="companyLogInfo" style="width: 100%">
        <el-table-column prop="operation" label="操作"></el-table-column>
        <el-table-column prop="operator" label="处理人"></el-table-column>
        <el-table-column prop="operateTime" label="处理时间"></el-table-column>
        <el-table-column
          prop="operateResult"
          label="处理结果"
        ></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import UserAdd from "./add.vue";
import {
  get_company_get__id,
  get_companyLog_getAll__companyId,
  post_company_retract__id,
  post_company_audit__id,
} from "../../api/developer/index";
import PaginationMixin from "../../mixins/pagination";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class Edit extends Vue {
  private isRemove = false;
  private isCheck = false;
  private activeName = "first";
  @Watch("$route", { immediate: true })
  watchRoute(val: any) {
    switch (val.name) {
      case "developerRevocation":
        this.isRemove = true;
        break;
      case "developerCheck":
        this.isCheck = true;
        break;
    }
  }
  private get developerId() {
    return this.$route.query.id;
  }
  searchOpen = true;

  resPageInfo: any = {
    bankList: [],
    contactList: [],
    attachmentList: [],
    provinceOption: [],
    recallReason: null,
    checkOpinion: null,
  };
  companyLogInfo: any = [];

  openToggle() {
    this.searchOpen = !this.searchOpen;
  }
  employmentDateChange(dateArray: any) {
    console.log(dateArray);
  }

  finish(data: any) {
    console.log(data);
  }

  addData: any = null;
  value: any = "";

  currentPage: any = 1;
  valuedate: any = new Date().getTime();
  // valuedate: any ='2020-07-01';
  total: any = null;

  formatter(row: any) {
    return row.name;
  }
  contactsDialogVisible = false;
  accountDialogVisible = false;

  add(data: any) {
    this.addData = data;
    this.contactsDialogVisible = true;
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await get_company_get__id({ id: this.developerId });
    this.resPageInfo.provinceOption = [
      this.resPageInfo.province,
      this.resPageInfo.city,
      this.resPageInfo.county,
    ];
    this.companyLogInfo = await get_companyLog_getAll__companyId({
      companyId: this.developerId,
    });
  }

  async submitRecall() {
    await post_company_retract__id({
      reason: this.resPageInfo.recallReason,
      id: this.developerId,
    });
    this.$message({
      type: "success",
      message: "撤回成功!",
    });
  }

  async pass(val: any) {
    await post_company_audit__id({
      reason: this.resPageInfo.checkOpinion,
      id: this.developerId,
      pass: val,
    });
    this.$message({
      type: "success",
      message: val ? "审核通过!" : "驳回成功!",
    });
  }

  editContacts(row: any) {
    console.log(row);
    this.contactsDialogVisible = true;
  }

  editAccount(row: any) {
    console.log(row);
    this.accountDialogVisible = true;
  }
  // getValue(value: any) {
  // this.queryPageParameters.orgId = value;
  // }

  search() {
    console.log(this.queryPageParameters);
    console.log(this.valuedate);
    this.getListMixin();
  }

  edit(scope: any) {
    this.add(scope.row);
  }

  async remove(scope: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      // await post_user_delete__id({ id: scope.row.id });
      this.resPageInfo.list.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
<style lang="scss">
.msg-title {
  text-align: left;
  margin-left: 25px;
}

.text-ellipsis {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>