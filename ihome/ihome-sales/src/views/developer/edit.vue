<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-25 17:59:09
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-10 18:10:30
-->
<template>
  <ih-page>
    <template v-slot:form>
      <p class="ih-info-title">基础信息</p>
      <el-form ref="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称" required>
              <el-input
                v-model="resPageInfo.name"
                placeholder="名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用代码" required>
              <el-input
                v-model="resPageInfo.creditCode"
                placeholder="信用代码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="简称" required>
              <el-input
                v-model="resPageInfo.shortName"
                placeholder="简称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="类型">
                  <el-select
                    v-model="resPageInfo.type"
                    clearable
                    placeholder="请选择类型"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('accountType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法定代表人" required>
                  <el-input
                    v-model="resPageInfo.legalPerson"
                    placeholder="法定代表人"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人身份证号码">
                  <el-input
                    v-model="resPageInfo.legalPersonId"
                    placeholder="法人身份证号码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成立日期" required>
                  <el-date-picker
                    v-model="resPageInfo.setupTime"
                    style="width: 100%"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本" required>
                  <el-input
                    v-model="resPageInfo.capital"
                    placeholder="注册资本"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="营业期限">
                  <!-- <el-date-picker
                    style="width: 100%"
                    v-model="resPageInfo.businessTime"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd"
                    @change="employmentDateChange"
                  ></el-date-picker> -->
                  <el-input
                    v-model="resPageInfo.businessTime"
                    placeholder="注册资本"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="省市区">
                  <IhCascader v-model="resPageInfo.provinceOption"></IhCascader>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="住所" required>
                  <el-input
                    v-model="resPageInfo.address"
                    placeholder="住所"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="录入人" required>
                  <el-input
                    disabled
                    v-model="resPageInfo.inputUser"
                    placeholder="录入人"
                  ></el-input>
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
      <div class="content">
        <p class="ih-info-title">联系人信息</p>
        <el-button
          @click="
            contactsDialogVisible = true;
            countactsData = {};
          "
          type="primary"
          >添加</el-button
        >
      </div>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.contactList"
        style="width: 100%"
      >
        <el-table-column prop="contactName" label="姓名"></el-table-column>
        <el-table-column prop="contactNum" label="手机号"></el-table-column>
        <el-table-column prop="email" label="电子邮箱"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template v-slot="{ row }">
            <span class="el-dropdown-link" @click="editContacts(row)">
              编辑
            </span>
            <span class="el-dropdown-link" @click="routerTo(row)"> 移除 </span>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <div class="content">
        <p class="ih-info-title">账户信息</p>
        <el-button
          @click="
            accountDialogVisible = true;
            accountData = {};
          "
          type="primary"
          >添加</el-button
        >
      </div>
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
        <el-table-column fixed="right" label="操作" align="center">
          <template v-slot="{ row }">
            <span class="el-dropdown-link" @click="editAccount(row)">
              编辑
            </span>
            <span class="el-dropdown-link" @click="routerTo(row)"> 移除 </span>
          </template>
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
        v-model="queryPageParameters.remark"
      >
      </el-input>

      <div v-if="isShow">
        <p class="ih-info-title">变更原因</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入内容"
          v-model="queryPageParameters.employeeCode"
        >
        </el-input>
      </div>

      <div class="bottom">
        <el-button @click="add()" type="primary">保存</el-button>
        <el-button @click="add()" type="primary">提交</el-button>
      </div>
    </template>

    <ih-dialog :show="contactsDialogVisible" desc="联系人信息">
      <Contacts
        :data="countactsData"
        @cancel="() => (contactsDialogVisible = false)"
        @finish="
          (data) => {
            contactsDialogVisible = false;
            finish(data);
          }
        "
      />
    </ih-dialog>
    <ih-dialog :show="accountDialogVisible" desc="账户信息">
      <Account
        :data="accountData"
        @cancel="() => (accountDialogVisible = false)"
        @finish="
          (data) => {
            accountDialogVisible = false;
            finish(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import UserAdd from "./add.vue";
import Contacts from "./dialog/contacts.vue";
import Account from "./dialog/account.vue";
import { get_company_get__id } from "../../api/developer/index";
import PaginationMixin from "../../mixins/pagination";

@Component({
  components: {
    Contacts,
    Account,
  },
  mixins: [PaginationMixin],
})
export default class Edit extends Vue {
  private isShow = false;
  private fileList: Array<object> = [
    {
      name: "abc.pdf",
      url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
      img_url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
    },
  ];
  @Watch("$route", { immediate: true })
  watchRoute(val: any) {
    if (val.name === "developerChange") {
      this.isShow = true;
    }
  }
  resPageInfo: any = {
    total: 0,
    bankList: [],
    contactList: [],
    attachmentList: [],
    recallReason: null,
    checkOpinion: null,
    employmentDateStart: null,
    employmentDateEnd: null,
  };
  accountData: any = {};
  countactsData: any = {};

  searchOpen = true;
  private get developerId() {
    return this.$route.query.id;
  }

  openToggle() {
    this.searchOpen = !this.searchOpen;
  }
  employmentDateChange(dateArray: any) {
    console.log(dateArray);
    this.resPageInfo.employmentDateStart = dateArray[0];
    this.resPageInfo.employmentDateEnd = dateArray[1];
  }

  finish(data: any) {
    console.log(data);
  }

  addData: any = null;
  value: any = "";

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
  }

  editContacts(row: any) {
    this.countactsData = row;
    this.contactsDialogVisible = true;
  }

  editAccount(row: any) {
    this.accountData = row;
    this.accountDialogVisible = true;
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
<style lang="scss" scoped>
.content {
  position: relative;
  /deep/ .el-button {
    position: absolute;
    top: -15px;
    left: 140px;
  }
}
.bottom {
  margin-top: 35px;
  text-align: left;
}
</style>