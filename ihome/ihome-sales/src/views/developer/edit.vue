<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-25 17:59:09
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-20 11:57:16
-->
<template>
  <ih-page>
    <template v-slot:form>
      <p class="ih-info-title">基础信息</p>
      <el-form
        ref="form"
        label-width="120px"
        :model="resPageInfo"
        :rules="rules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称" prop="name">
              <el-input
                clearable
                maxlength="64"
                v-model="resPageInfo.name"
                placeholder="名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用代码" prop="creditCode">
              <el-input
                clearable
                maxlength="18"
                v-model="resPageInfo.creditCode"
                placeholder="信用代码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="简称" prop="shortName">
              <el-input
                clearable
                maxlength="16"
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
                <el-form-item label="类型" prop="type">
                  <el-select
                    v-model="resPageInfo.type"
                    clearable
                    placeholder="请选择类型"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('CompanyTypeEnum')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法定代表人" required prop="legalPerson">
                  <el-input
                    clearable
                    maxlength="32"
                    v-model="resPageInfo.legalPerson"
                    placeholder="法定代表人"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人身份证号码" prop="legalPersonId">
                  <el-input
                    clearable
                    maxlength="18"
                    v-model="resPageInfo.legalPersonId"
                    placeholder="法人身份证号码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成立日期" prop="setupTime">
                  <el-date-picker
                    v-model="resPageInfo.setupTime"
                    style="width: 100%"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本" prop="capital">
                  <el-input
                    clearable
                    maxlength="32"
                    v-model="resPageInfo.capital"
                    placeholder="注册资本"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="营业期限">
                  <el-input
                    clearable
                    maxlength="32"
                    v-model="resPageInfo.businessTime"
                    placeholder="营业期限"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="省市区" prop="provinceOption">
                  <IhCascader
                    v-model="resPageInfo.provinceOption"
                    :checkStrictly="false"
                  ></IhCascader>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="住所" prop="address">
                  <el-input
                    clearable
                    maxlength="64"
                    v-model="resPageInfo.address"
                    placeholder="住所"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="录入人" prop="inputUser">
                  <el-input
                    clearable
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
        <el-button @click="addContacts()" type="primary">添加</el-button>
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
          <template v-slot="{ row, $index }">
            <span class="el-dropdown-link" @click="editContacts(row, $index)">
              编辑
            </span>
            <span class="el-dropdown-link" @click="delContacts($index)">
              移除
            </span>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <div class="content">
        <p class="ih-info-title">账户信息</p>
        <el-button @click="addAccount()" type="primary">添加</el-button>
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
            $root.dictAllName(row.type, "BankAccountTypeEnum")
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template v-slot="{ row, $index }">
            <span class="el-dropdown-link" @click="editAccount(row, $index)">
              编辑
            </span>
            <span class="el-dropdown-link" @click="delAccount($index)">
              移除
            </span>
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
          <!-- <template v-slot="{ row }">{{
            $root.displayName("accessoryTpye", row.type)
          }}</template> -->
        </el-table-column>
        <el-table-column prop="fileId" label="附件"></el-table-column>
      </el-table>
      <br />

      <div v-if="$route.name !== 'developerChange'">
        <p class="ih-info-title">企业概况</p>
        <el-input
          maxlength="256"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入企业概况"
          v-model="resPageInfo.remark"
        >
        </el-input>
        <div class="bottom">
          <el-button @click="submit('Draft')" type="primary">保存</el-button>
          <el-button @click="submit('WaitAuditByBranchHead')" type="primary"
            >提交</el-button
          >
        </div>
      </div>

      <div v-if="$route.name === 'developerChange'">
        <p class="ih-info-title">变更原因</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入内容"
          v-model="resPageInfo.reason"
        >
        </el-input>
        <div class="bottom">
          <el-button @click="submit('Audited')" type="primary">提交</el-button>
        </div>
      </div>
    </template>

    <ih-dialog :show="contactsDialogVisible" desc="联系人信息">
      <Contacts
        :data="contactsData"
        @cancel="() => (contactsDialogVisible = false)"
        @finish="
          (data) => {
            contactsDialogVisible = false;
            contactsFinish(data);
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
            accountFinish(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Contacts from "./dialog/contacts.vue";
import Account from "./dialog/account.vue";
import {
  get_company_get__id,
  post_company_add,
  post_company_updateDraft,
  post_company_update,
} from "../../api/developer/index";
import { Form as ElForm } from "element-ui";

@Component({
  components: {
    Contacts,
    Account,
  },
})
export default class Edit extends Vue {
  private fileList: Array<object> = [];
  resPageInfo: any = {
    name: null,
    creditCode: null,
    shortName: null,
    type: null,
    legalPerson: null,
    legalPersonId: null,
    setupTime: null,
    capital: null,
    businessTime: null,
    province: null,
    city: null,
    county: null,
    address: null,
    inputUser: null,
    contactList: [],
    bankList: [],
    attachmentList: [],
    remark: null,
    reason: null,
    provinceOption: [],
  };
  accountData: any = {};
  contactsData: any = {};
  contactsDialogType: any;
  contactsIndex: any;
  accountDialogType: any;
  accountIndex: any;
  contactsDialogVisible = false;
  accountDialogVisible = false;

  private rules: any = {
    name: [{ required: true, message: "请填写名称", trigger: "blur" }],
    creditCode: [
      { required: true, message: "请填写信用代码", trigger: "blur" },
    ],
    shortName: [{ required: true, message: "请填写简称", trigger: "blur" }],
    type: [{ required: true, message: "请选择类型", trigger: "blur" }],
    legalPersonId: [
      { required: true, message: "请填写法人身份证号码", trigger: "blur" },
      {
        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
        message: "证件号码格式有误！",
        trigger: "blur",
      },
    ],
    setupTime: [{ required: true, message: "请选择成立日期", trigger: "blur" }],
    capital: [{ required: true, message: "请填写注册资本", trigger: "blur" }],
    provinceOption: [
      { required: true, message: "请选择省市区", trigger: "blur" },
    ],
    address: [{ required: true, message: "请填写住所", trigger: "blur" }],
    legalPerson: [
      { required: true, message: "请填法定代表人", trigger: "blur" },
    ],
  };

  searchOpen = true;
  private get developerId() {
    return this.$route.query.id;
  }

  openToggle() {
    this.searchOpen = !this.searchOpen;
  }

  async created() {
    this.getInfo();
  }
  async getInfo() {
    if (this.developerId) {
      const res = await get_company_get__id({ id: this.developerId });
      this.resPageInfo = res;
      this.resPageInfo.provinceOption = [res.province, res.city, res.county];
    }
  }

  // 联系人信息
  addContacts() {
    this.contactsDialogVisible = true;
    this.contactsData = {};
    this.contactsDialogType = "add";
  }

  editContacts(row: any, index: number) {
    this.contactsData = row;
    this.contactsIndex = index;
    this.contactsDialogType = "edit";
    this.contactsDialogVisible = true;
  }

  async delContacts(index: number) {
    await this.$confirm("是否确定移除?", "提示");
    this.resPageInfo.contactList.splice(index, 1);
    this.$message({
      type: "success",
      message: "移除成功!",
    });
  }

  contactsFinish(data: any) {
    if (this.contactsDialogType === "add") {
      this.resPageInfo.contactList.push(data);
    } else {
      this.$set(this.resPageInfo.contactList, this.contactsIndex, data);
    }
  }

  //账户信息
  addAccount() {
    this.accountDialogVisible = true;
    this.accountData = {};
    this.accountDialogType = "add";
  }

  editAccount(row: any, index: number) {
    this.accountData = row;
    this.contactsIndex = index;
    this.accountDialogType = "edit";
    this.accountDialogVisible = true;
  }

  async delAccount(index: number) {
    await this.$confirm("是否确定移除?", "提示");
    this.resPageInfo.bankList.splice(index, 1);
    this.$message({
      type: "success",
      message: "移除成功!",
    });
  }

  accountFinish(data: any) {
    if (this.accountDialogType === "add") {
      this.resPageInfo.bankList.push(data);
    } else {
      this.$set(this.resPageInfo.bankList, this.contactsIndex, data);
    }
  }

  submit(val: string) {
    (this.$refs["form"] as ElForm).validate(async (v: any) => {
      if (v) {
        this.resPageInfo.province = this.resPageInfo.provinceOption[0];
        this.resPageInfo.city = this.resPageInfo.provinceOption[1];
        this.resPageInfo.county = this.resPageInfo.provinceOption[2];
        this.resPageInfo.status = val;
        switch (this.$route.name) {
          case "developerAdd":
            await post_company_add(this.resPageInfo);
            break;
          case "developerEdit":
            await post_company_updateDraft(this.resPageInfo);
            break;
          case "developerChange":
            await post_company_update(this.resPageInfo);
            break;
        }
        this.$router.push(`/developers/list`);
        this.$message({
          type: "success",
          message: val === "Draft" ? "保存成功!" : "提交成功!",
        });
      }
    });
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