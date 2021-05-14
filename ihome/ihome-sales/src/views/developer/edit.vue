<!--
 * @Description:
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-25 17:59:09
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-14 14:38:26
-->
<template>
  <ih-page>
    <template v-slot:form>
      <p class="ih-info-title">基础信息</p>
      <el-form
        ref="form"
        label-width="135px"
        :model="resPageInfo"
        :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="公司名称"
              prop="name">
              <el-input
                clearable
                maxlength="64"
                v-model="resPageInfo.name"
                placeholder="名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="公司简称"
              prop="shortName"
            >
              <el-input
                clearable
                maxlength="16"
                v-model="resPageInfo.shortName"
                placeholder="简称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="信用代码"
              prop="creditCode"
            >
              <el-input
                clearable
                v-model="resPageInfo.creditCode"
                placeholder="信用代码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="公司类型"
              prop="type"
            >
              <el-select
                v-model="resPageInfo.type"
                clearable
                placeholder="请选择类型"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelCompanyType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人">
              <el-input
                clearable
                maxlength="32"
                v-model="resPageInfo.legalPerson"
                placeholder="法定代表人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人身份证号码">
              <el-input
                clearable
                maxlength="18"
                v-model="resPageInfo.legalPersonId"
                placeholder="法人身份证号码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="成立日期"
              prop="setupTime"
            >
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
            <el-form-item label="注册资本">
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
            <el-form-item
              label="省市区"
              prop="provinceOption"
            >
              <IhCascader
                v-model="resPageInfo.provinceOption"
                :checkStrictly="false"
              ></IhCascader>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item
              label="保利系统内开发商"
              prop="isPolyDeveloper"
            >
              <el-select
                v-model="resPageInfo.isPolyDeveloper"
                clearable
                placeholder="请选择类型"
                class="width--100"
              >
                <el-option
                  label="是"
                  :value="1"
                ></el-option>
                <el-option
                  label="否"
                  :value="0"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话">
              <el-input
                clearable
                v-model="resPageInfo.phone"
                placeholder="电话"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              label="住所"
              prop="address"
            >
              <el-input
                clearable
                maxlength="64"
                v-model="resPageInfo.address"
                placeholder="住所"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="企业概况"
              prop="address"
            >
              <el-input
                style="box-sizing: border-box"
                maxlength="256"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10 }"
                placeholder="请输入企业概况(选填)"
                v-model="resPageInfo.remark">
              </el-input>
            </el-form-item>
          </el-col>
<!--          <el-col :span="8">
            <el-form-item label="录入人">
              <el-input
                clearable
                disabled
                v-model="resPageInfo.inputUserName"
                placeholder="录入人"
              ></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
    </template>

    <template v-slot:table>
      <div class="content">
        <p class="ih-info-title">联系人信息</p>
        <el-button
          @click="addContacts()"
          type="primary"
          size="small"
        >添加联系人</el-button>
      </div>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="resPageInfo.contactList"
          style="width: 100%"
        >
          <el-table-column
            prop="contactName"
            label="姓名"
          ></el-table-column>
          <el-table-column
            prop="contactNum"
            label="手机号"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="电子邮箱"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
          >
            <template v-slot="{ row, $index }">
              <span
                class="el-dropdown-link"
                @click="editContacts(row, $index)"
              >
                编辑
              </span>
              <span
                class="el-dropdown-link"
                @click="delContacts($index)"
              >
                移除
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <div class="content">
        <p class="ih-info-title">银行账户信息</p>
        <el-button
          @click="addAccount()"
          type="primary"
          size="small"
        >添加银行账户</el-button>
      </div>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="resPageInfo.bankList"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="账户名称"
          ></el-table-column>
          <el-table-column
            prop="number"
            label="账号"
          ></el-table-column>
          <el-table-column
            prop="bank"
            label="开户银行"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="账号类型"
          >
            <template v-slot="{ row }">{{
              $root.dictAllName(row.type, "AccountType")
            }}</template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
          >
            <template v-slot="{ row, $index }">
              <span
                class="el-dropdown-link"
                @click="editAccount(row, $index)"
              >
                编辑
              </span>
              <span
                class="el-dropdown-link"
                @click="delAccount($index)"
              >
                移除
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">
        附件信息
        <el-link
          class="margin-left-15"
          href="http://zxgk.court.gov.cn/zhzxgk/"
          type="success"
          target="_blank"
        >综合查询被执行人</el-link>
        <span
          class="margin-left-10"
          style="font-size: 12px; color: #909399"
        >附件类型支持jpg、png、bmp、tif、tiff等图片格式，以及pdf、word、excel文档，单个文件不能超过10M</span>
      </p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="fileListType"
          style="width: 100%"
        >
          <el-table-column
            prop="type"
            width="180"
            label="类型"
            align="center"
          >
            <template v-slot="{ row }">
              <div><span
                  style="color: red"
                  v-if="row.subType && !resPageInfo.isPolyDeveloper"
                >*</span>{{row.name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="附件">
            <template v-slot="{ row }">
              <IhUpload
                v-model="row.fileList"
                :file-size="10"
                :file-type="row.code"
                size="100px"
                @newFileList="queryNew"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <div v-if="$route.name !== 'developerChange'">
<!--        <p class="ih-info-title">企业概况</p>
        <el-input
          class="padding-left-20"
          style="box-sizing: border-box"
          maxlength="256"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入企业概况"
          v-model="resPageInfo.remark"
        >
        </el-input>-->
        <div class="bottom">
          <el-button
            @click="submit('Draft')"
            type="primary"
          >保存</el-button>
          <el-button
            @click="submit('WaitAuditByBranchHead')"
            type="success"
          >提交</el-button>
        </div>
      </div>

      <div v-if="$route.name === 'developerChange'">
<!--        <p class="ih-info-title">企业概括</p>
        <el-input
          class="padding-left-20"
          style="box-sizing: border-box"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入内容"
          v-model="resPageInfo.remark"
        >
        </el-input>-->
        <p class="ih-info-title">变更原因</p>
        <p class="msg-title"><span style="color: red">* </span>变更信息</p>
        <el-input
          class="padding-left-20"
          style="box-sizing: border-box"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入内容"
          v-model="resPageInfo.reason"
        >
        </el-input>
        <div class="bottom">
          <el-button
            @click="submit('Audited')"
            type="primary"
          >提交</el-button>
        </div>
      </div>
    </template>

    <ih-dialog
      :show="contactsDialogVisible"
      desc="联系人信息"
    >
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
    <ih-dialog
      :show="accountDialogVisible"
      desc="账户信息"
    >
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
    inputUserName: null,
    contactList: [],
    bankList: [],
    attachmentList: [],
    remark: null,
    reason: null,
    isPolyDeveloper: null,
    provinceOption: [],
  };
  fileListType: any = [];
  submitFile: any = {};
  accountData: any = {};
  contactsData: any = {};
  contactsDialogType: any;
  contactsIndex: any;
  accountDialogType: any;
  accountIndex: any;
  contactsDialogVisible = false;
  accountDialogVisible = false;

  private rules: any = {
    name: [{ required: true, message: "请填写名称", trigger: "change" }],
    creditCode: [
      { required: true, message: "请填写信用代码", trigger: "change" },
      { min: 15, message: "字符长度不能小于15", trigger: "change" },
      { max: 20, message: "字符长度不能大于20", trigger: "change" },
    ],
    shortName: [{ required: true, message: "请填写简称", trigger: "change" }],
    type: [{ required: true, message: "请选择类型", trigger: "change" }],
    // legalPersonId: [
    //   { required: true, message: "请填写法人身份证号码", trigger: "change" },
    //   {
    //     pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
    //     message: "证件号码格式有误！",
    //     trigger: "change",
    //   },
    // ],
    setupTime: [
      { required: true, message: "请选择成立日期", trigger: "change" },
    ],
    // capital: [{ required: true, message: "请填写注册资本", trigger: "change" }],
    provinceOption: [
      { required: true, message: "请选择省市区", trigger: "change" },
    ],
    address: [{ required: true, message: "请填写住所", trigger: "change" }],
    isPolyDeveloper: [
      {
        required: true,
        message: "请选择是否保利系统内开发商",
        trigger: "change",
      },
    ],
  };

  searchOpen = true;
  private get developerId() {
    return this.$route.query.id;
  }

  async created() {
    this.getInfo();
  }
  async getInfo() {
    if (this.developerId) {
      const res = await get_company_get__id({ id: this.developerId });
      this.resPageInfo = res;
      this.resPageInfo.provinceOption = [res.province, res.city, res.county];
      this.getFileListType(res.attachmentList);
    } else {
      this.resPageInfo.inputUserName = (this.$root as any).userInfo.name;
      this.resPageInfo.inputUser = (this.$root as any).userInfo.id;
      this.getFileListType([]);
    }
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("AttachementType");
    this.fileListType = list.map((v: any) => {
      return {
        ...v,
        fileList: data.filter((j: any) => j.type === v.code),
      };
    });
    let obj: any = {};
    this.fileListType.forEach((h: any) => {
      obj[h.code] = h.fileList;
    });
    this.submitFile = { ...obj };
  }

  queryNew(data: any, type?: any) {
    let obj: any = {};
    obj[type] = data;
    this.submitFile = { ...this.submitFile, ...obj };
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
    try {
      await this.$confirm("是否确定移除?", "提示");
      this.resPageInfo.contactList.splice(index, 1);
      this.$message({
        type: "success",
        message: "移除成功!",
      });
    } catch (err) {
      console.log(err);
    }
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
    try {
      await this.$confirm("是否确定移除?", "提示");
      this.resPageInfo.bankList.splice(index, 1);
      this.$message({
        type: "success",
        message: "移除成功!",
      });
    } catch (error) {
      console.log(error);
    }
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
        // 校验提示
        let arr: any = [];
        Object.values(this.submitFile).forEach((v: any) => {
          if (v.length) {
            arr = arr.concat(v);
          }
        });
        // 以下操作仅仅是为了校验必上传项
        if (!this.resPageInfo.isPolyDeveloper) {
          let submitList: any = this.fileListType.map((v: any) => {
            return {
              ...v,
              fileList: arr.filter((j: any) => j.type === v.code),
            };
          });
          let isSubmit = true;
          let msgList: any = [];
          submitList.forEach((v: any) => {
            if (v.subType && !v.fileList.length) {
              msgList.push(v.name);
              isSubmit = false;
            }
          });

          if (isSubmit) {
            this.resPageInfo.attachmentList = arr.map((v: any) => ({
              fileId: v.fileId,
              fileName: v.fileName,
              type: v.type,
            }));
          } else {
            this.$message({
              type: "warning",
              message: `${msgList.join(",")}项,请上传附件`,
            });
            return;
          }
        } else {
          this.resPageInfo.attachmentList = arr.map((v: any) => ({
            fileId: v.fileId,
            fileName: v.fileName,
            type: v.type,
          }));
        }
        switch (this.$route.name) {
          case "developerAdd":
            try {
              await post_company_add(this.resPageInfo);
            } catch (err) {
              console.log(err);
              return;
            }
            break;
          case "developerEdit":
            try {
              await post_company_updateDraft(this.resPageInfo);
            } catch (err) {
              console.log(err);
              return;
            }
            break;
          case "developerChange":
            if (!this.resPageInfo.reason) {
              this.$message.warning("请填写变更原因");
              return;
            }
            try {
              await post_company_update(this.resPageInfo);
            } catch (err) {
              console.log(err);
              return;
            }
            break;
        }
        this.$goto({ path: `/developers/list` });
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
    left: 130px;
  }
}
.bottom {
  margin-top: 30px;
  text-align: center;
}
.msg-title {
  text-align: left;
  margin-left: 25px;
}
</style>