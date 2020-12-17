<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 18:39:23
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-16 17:15:59
-->
<template>
  <IhPage>
    <template v-slot:form>
      <p class="ih-info-title">基础信息</p>
      <el-form
        :model="info"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="名称"
              prop="agencyName"
            >
              <el-input
                v-model="info.agencyName"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="信用代码"
              prop="creditCode"
            >
              <el-input
                v-model="info.creditCode"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="简称"
              prop="simpleName"
            >
              <el-input
                v-model="info.simpleName"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="省市区"
              prop="provinceList"
            >
              <IhCascader
                v-model="info.provinceList"
                :checkStrictly="false"
              ></IhCascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="住所"
              prop="addr"
            >
              <el-input
                v-model="info.addr"
                clearable
                placeholder="请输入住所"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="法定代表人"
              prop="legalPerson"
            >
              <el-input
                v-model="info.legalPerson"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="类型"
              prop="companyType"
            >
              <el-select
                v-model="info.companyType"
                clearable
                placeholder="请选择"
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
            <el-form-item
              label="成立日期"
              prop="establishDate"
            >
              <el-date-picker
                v-model="info.establishDate"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="注册资本"
              prop="registeredCapital"
            >
              <el-input
                v-model="info.registeredCapital"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="营业期限">
              <el-date-picker
                style="width: 100%"
                v-model="info.timeList"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="$root.pickerOptions"
              >
                ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="跟进人"
              prop="followMan"
            >
              <el-input
                v-model="info.followMan"
                disabled
                placeholder="自动带出"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <!-- 银行账号信息 -->
    <p class="ih-info-title">
      <span>银行账号信息</span>
      <el-button
        type="primary"
        size="small"
        class="add-account"
        @click.native="addAccount()"
      >添加</el-button>
    </p>
    <div class="padding-left-20">
      <el-table
        :data="info.firstAgencyAccounts"
        style="width: 100%"
      >
        <el-table-column
          prop="accountName"
          label="账户名称"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="accountNo"
          label="账号"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="depositBank"
          label="开户银行"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="accountEnum"
          label="账号类型"
          width="150"
        >
          <template v-slot="{ row }">
            <span>{{ $root.dictAllName(row.accountEnum, "Account") }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="120"
        >
          <template v-slot="{ row, $index }">
            <el-link
              type="primary"
              class="margin-right-15"
              @click="editBank(row, $index)"
            >编辑</el-link>
            <el-link
              type="danger"
              @click="deleteBank($index)"
            >移除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p class="ih-info-title">负责人信息</p>
    <el-form
      :model="info"
      :rules="rules"
      ref="personForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="姓名"
            prop="responsibleMan"
          >
            <el-input
              v-model="info.responsibleMan"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="手机号码"
            prop="mobile"
          >
            <el-input
              v-model="info.mobile"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="身份证号码"
            prop="idCard"
          >
            <el-input
              v-model="info.idCard"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="邮箱"
            prop="mail"
          >
            <el-input
              v-model="info.mail"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <p class="ih-info-title">附件信息</p>
    <div class="padding-left-20">
      <el-table
        style="width: 100%"
        :data="fileListType"
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
                v-if="row.subType"
              >*</span>{{row.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="附件">
          <template v-slot="{ row }">
            <IhUpload
              :file-list.sync="row.fileList"
              :file-size="10"
              :file-type="row.code"
              size="100px"
              @newFileList="queryNew"
            ></IhUpload>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <p class="ih-info-title">备注</p>
    <el-input
      type="textarea"
      style="box-sizing: border-box"
      class="padding-left-20"
      :autosize="{ minRows: 5, maxRows: 8 }"
      maxlength="256"
      placeholder="请输入备注"
      v-model="info.remark"
    >
    </el-input>
    <div>
      <br />
      <el-button
        type="primary"
        @click="save()"
      >保存</el-button>
      <el-button
        type="success"
        @click="submit()"
      >提交</el-button>
    </div>

    <!-- 账户信息 -->
    <IhDialog
      :show="dialogFormVisible"
      desc="账户信息"
    >
      <BankDialog
        :data="Bankrule"
        :bankType="bankType"
        @cancel="() => (dialogFormVisible = false)"
        @finish="
          (data, type) => {
            handlePushBank(data, type);
          }
        "
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
//引入请求数据的api -- 先调用本地的
import {
  get_firstAgencyCompany_get__agencyId,
  post_firstAgencyCompany_save,
} from "@/api/project/index";
import BankDialog from "./dialog/bankDialog.vue";
import { phoneValidator } from "ihome-common/util/base/form-ui";

@Component({
  components: {
    BankDialog,
  },
})
export default class FirstAgencyEdit extends Vue {
  info: any = {
    agencyName: "",
    creditCode: "",
    simpleName: "",
    provinceList: [],
    addr: "",
    legalPerson: "",
    companyType: "",
    registeredCapital: "",
    businessStart: "",
    businessEnd: "",
    followMan: "",
    province: "",
    city: "",
    area: "",
    establishDate: "",
    attachAgencyVOS: [], // 附件信息
    firstAgencyAccounts: [], // 账号信息
    responsibleMan: "",
    mobile: "",
    idCard: "",
    mail: "",
    remark: "",
    timeList: [],
  };
  fileListType: any = [];
  submitFile: any = {};
  dialogFormVisible = false;
  Bankrule: any = {
    accountName: "",
    accountNo: "",
    depositBank: "",
    accountEnum: "",
  };
  bankType: any = "new-add";
  private fileList: any = [];

  private rules: any = {
    agencyName: [
      { required: true, message: "请输入公司名称", trigger: "change" },
    ],
    creditCode: [
      { required: true, message: "请输入信用代码", trigger: "change" },
      {
        pattern: /^[A-Za-z0-9]{18}$/,
        message: "信用代码格式不对",
        trigger: "change",
      },
    ],
    simpleName: [{ required: true, message: "请输入简称", trigger: "change" }],
    provinceList: [
      { required: true, message: "请选择省市区", trigger: "change" },
    ],
    addr: [{ required: true, message: "请输入住所", trigger: "change" }],
    legalPerson: [
      { required: true, message: "请输入法定代表人", trigger: "change" },
    ],
    companyType: [{ required: true, message: "请选择类型", trigger: "change" }],
    registeredCapital: [
      { required: true, message: "请输入注册资本", trigger: "change" },
    ],
    establishDate: [
      { required: true, message: "请输入成立日期", trigger: "change" },
    ],
    responsibleMan: [
      { required: true, message: "请输入姓名", trigger: "change" },
    ],
    mobile: [
      { required: true, message: "请输入手机号", trigger: "change" },
      { validator: phoneValidator, trigger: "change" },
    ],
    idCard: [
      { required: true, message: "请填写证件号码", trigger: "change" },
      {
        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
        message: "证件号码格式有误！",
        trigger: "change",
      },
    ],
    mail: [
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: "change",
      },
    ],
  };

  addAccount() {
    this.Bankrule = {
      accountName: "",
      accountNo: "",
      depositBank: "",
      accountEnum: "",
    };
    this.bankType = "new-add";
    this.dialogFormVisible = true;
  }

  save() {
    (this.$refs["ruleForm"] as ElForm).validate(async (v: any) => {
      if (v) {
        let infoObj: any = { ...this.info };
        // 校验提示
        let arr: any = [];
        Object.values(this.submitFile).forEach((v: any) => {
          if (v.length) {
            arr = arr.concat(v);
          }
        });
        // 以下操作仅仅是为了校验必上传项
        let submitList: any = this.fileListType.map((v: any) => {
          return {
            ...v,
            fileList: arr
              .filter((j: any) => j.type === v.code)
              .map((h: any) => ({
                ...h,
                name: h.fileName,
              })),
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
          console.log(arr);
          infoObj.attachAgencyVOS = arr.map((v: any) => ({
            fileId: v.fileId,
            fileName: v.name,
            type: v.type,
          }));
        } else {
          this.$message({
            type: "warning",
            message: `${msgList.join(",")}项,请上传附件`,
          });
          return;
        }
        console.log(this.info.timeList, "this.info.timeList");
        if (this.info.timeList.length) {
          infoObj.businessStart = this.info.timeList[0];
          infoObj.businessEnd = this.info.timeList[1];
        }
        if (this.info.provinceList.length) {
          infoObj.province = this.info.provinceList[0];
          infoObj.city = this.info.provinceList[1];
          infoObj.area = this.info.provinceList[2];
        }
        switch (this.$route.name) {
          case "firstAgencyAdd":
            infoObj.agencyId = "";
            break;
          case "firstAgencyEdit":
            infoObj.agencyId = this.$route.query.id;
            break;
        }
        infoObj.followMan = (this.$root as any).userInfo.name;
        infoObj.followManId = (this.$root as any).userInfo.id;
        await post_firstAgencyCompany_save(infoObj);
        this.$message.success("保存成功");
        this.$goto({ path: "/firstAgency/list" });
      }
    });
  }
  submit() {
    this.$message.warning("接口未提供,功能未实现");
  }
  /**
   * @description: 新添加数据--银行账号信息
   * @param {object} value
   * @param {string} type
   */
  private handlePushBank(value: any, type: string): void {
    switch (type) {
      case "new-add":
        this.info.firstAgencyAccounts.push(value);
        break;
      case "new-edit":
        this.$set(this.info.firstAgencyAccounts, value.index, value);
        break;
    }
    this.dialogFormVisible = false;
  }
  async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      let res: any = await get_firstAgencyCompany_get__agencyId({
        agencyId: id,
      });
      if (res.businessStart && res.businessEnd) {
        res.timeList = [res.businessStart, res.businessEnd];
      } else {
        res.timeList = [];
      }
      this.info = { ...res };
      this.info.provinceList = [res.province, res.city, res.area];
      this.getFileListType(res.attachAgencyVOS);
    } else {
      this.getFileListType([]);
    }
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("FirstAgencyAttach");
    this.fileListType = list.map((v: any) => {
      return {
        ...v,
        fileList: data
          .filter((j: any) => j.type === v.code)
          .map((h: any) => ({
            ...h,
            name: h.fileName,
          })),
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

  /**
   * @description: 编辑银行信息
   * @param {object} row 编辑当前行数据
   * @param {number} index 编辑当前行数据下标
   */
  private editBank(row: object, index: number): void {
    this.bankType = "new-edit";
    this.Bankrule = { ...row, index };
    this.dialogFormVisible = true;
  }
  /**
   * @description: 删除银行信息
   * @param {number} index 编辑当前行数据下标
   */
  private async deleteBank(index: number): Promise<void> {
    try {
      await this.$confirm("是否确定移除?", "提示");
      this.info.firstAgencyAccounts.splice(index, 1);
      this.$message({
        type: "success",
        message: "移除成功!",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async created() {
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
.ih-info-title {
  position: relative;
  .add-account {
    position: absolute;
    top: 0px;
    left: 120px;
    transform: translate(0, -30%);
  }
}
</style>