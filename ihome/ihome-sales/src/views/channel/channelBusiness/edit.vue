<!--
 * @Description: 渠道商 添加、编辑
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-16 14:05:21
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-16 17:57:05
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
              prop="name"
            >
              <el-input
                v-model="info.name"
                maxlength="64"
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
              prop="shortName"
            >
              <el-input
                v-model="info.shortName"
                clearable
                maxlength="16"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="类型"
              prop="type"
            >
              <el-select
                v-model="info.type"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelCompanyType')"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
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
          <el-col :span="8">
            <el-form-item
              label="法人身份证号码"
              prop="legalIdentityCode"
            >
              <el-input
                v-model="info.legalIdentityCode"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="成立日期"
              prop="setupTime"
            >
              <el-date-picker
                v-model="info.setupTime"
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
              prop="capital"
            >
              <el-input
                v-model="info.capital"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业期限">
              <el-input
                v-model="info.businessTime"
                clearable
                maxlength="32"
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
              prop="address"
            >
              <el-input
                v-model="info.address"
                clearable
                placeholder="请输入住所"
                maxlength="64"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="跟进人">
              <el-input
                v-model="info.followUserId"
                placeholder="跟进人"
                disabled
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
        class="add-account"
        size="small"
        @click.native="addAccount()"
      >添加</el-button>
    </p>
    <div class="padding-left-20">
      <el-table
        :data="info.channelBanks"
        style="width: 100%; "
      >
        <el-table-column
          prop="accountName"
          label="账户名称"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="accountNum"
          label="账号"
          min-width="200"
        > </el-table-column>
        <el-table-column
          prop="bank"
          label="开户银行"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="账号类型"
          width="150"
        >
          <template v-slot="{ row }">
            <span>{{$root.dictAllName(row.type, "AccountEnum")}}</span>
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
              @click="deleteBank(row, $index)"
            >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p class="ih-info-title">负责人信息</p>
    <el-form
      :model="channelPersonsData"
      :rules="rules"
      ref="personForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[
              { required: true, message: '请输入姓名', trigger: 'change' },
            ]"
          >
            <el-input
              v-model="channelPersonsData.name"
              clearable
              maxlength="32"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="手机号码"
            prop="mobile"
          >
            <el-input
              v-model="channelPersonsData.mobile"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="身份证号码"
            prop="identityCode"
          >
            <el-input
              v-model="channelPersonsData.identityCode"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="channelPersonsData.email"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <p class="ih-info-title">
      <span>附件信息</span>
      <el-link
        class="margin-left-16"
        href="http://zxgk.court.gov.cn/zhzxgk/"
        type="success"
        target="_blank"
      >综合查询被执行人</el-link>
      <span
        class="margin-left-10"
        style="font-size: 12px; color: #909399;"
      >附件类型支持jpg、png、bmp、tif、tiff等图片格式，以及pdf、word、excel文档，单个文件不能超过10M</span>
    </p>
    <div class="padding-left-20">
      <el-table style="width: 100%">
        <el-table-column
          prop="type"
          width="180"
          label="类型"
        ></el-table-column>
        <el-table-column label="附件"></el-table-column>
      </el-table>
    </div>

    <p class="ih-info-title">企业概况</p>
    <div class="padding-left-20">
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 8 }"
        maxlength="256"
        placeholder="请输入企业概况"
        v-model="info.remark"
      >
      </el-input>
    </div>

    <template v-if="pageName === 'ChangeChannel'">
      <p class="ih-info-title">变更原因</p>
      <div class="padding-left-20">
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 8 }"
          maxlength="256"
          placeholder="请输入变更原因"
          v-model="changeReason"
        >
        </el-input>
      </div>
    </template>
    <div>
      <br />
      <el-button
        type="primary"
        @click="submit(1)"
      >保存</el-button>
      <el-button
        type="success"
        @click="submit(2)"
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
        @finish="handlePushBank"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import {
  noTrim,
  phoneValidator,
  validIdentityCard,
  validForbid,
} from "ihome-common/util/base/form-ui";
//引入请求数据的api -- 先调用本地的
import {
  get_channel_get__id,
  post_channel_add,
  post_channel_edit,
  post_channelChange_add,
} from "@/api/channel/index";
import BankDialog from "./dialog/bankDialog.vue";

@Component({
  components: {
    BankDialog,
  },
})
export default class ModifyThe extends Vue {
  info: any = {
    name: "",
    creditCode: "",
    address: "",
    businessTime: "",
    capital: "",
    channelAttachments: [],
    channelBanks: [],
    channelPersons: [],
    city: "",
    county: "",
    remark: "",
    shortName: "",
    type: "",
    legalPerson: "",
    legalIdentityCode: "",
    setupTime: "",
    timeList: [],
    provinceList: [],
  };
  changeReason = "";
  dialogFormVisible = false;
  Bankrule: any = {
    bank: "",
    type: "",
    accountName: "",
    accountNum: "",
  };
  bankType: any = "new-add";
  channelPersonsData: any = {
    name: "",
    mobile: "",
    identityCode: "",
    email: "",
  };

  private rules: any = {
    name: [
      { required: true, message: "请输入名称", trigger: "change" },
      { validator: validForbid, trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { min: 1, max: 64, message: "长度在 1 到 64 个字符", trigger: "change" },
    ],
    creditCode: [
      { required: true, message: "请输入信用代码", trigger: "change" },
      {
        pattern: /^[A-Za-z0-9]{18}$/,
        message: "格式不正确, 请输入18位正确的信用代码",
        trigger: "change",
      },
    ],
    shortName: [
      { required: true, message: "请输入简称", trigger: "change" },
      { validator: validForbid, trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" },
    ],
    type: [{ required: true, message: "请选择类型", trigger: "change" }],
    legalPerson: [
      { required: true, message: "请输入法定代表人", trigger: "change" },
      { validator: validForbid, trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "change" },
    ],
    legalIdentityCode: [
      { required: true, message: "请输入法人身份证号码", trigger: "change" },
      { validator: validIdentityCard, trigger: "change" },
    ],
    setupTime: [
      { required: true, message: "请输入成立日期", trigger: "change" },
    ],
    capital: [
      { required: true, message: "请输入注册资本", trigger: "change" },
      { validator: noTrim, trigger: "change" },
    ],
    provinceList: [
      { required: true, message: "请选择省市区", trigger: "change" },
    ],
    address: [
      { required: true, message: "请输入住所", trigger: "change" },
      { validator: noTrim, trigger: "change" },
    ],
    mobile: [
      { required: true, message: "请输入手机号", trigger: "change" },
      { validator: phoneValidator, trigger: "change" },
    ],
    identityCode: [
      { required: true, message: "请填写证件号码", trigger: "change" },
      { validator: validIdentityCard, trigger: "change" },
    ],
    email: [
      { required: true, message: "请填写邮箱", trigger: "change" },
      { type: "email", message: "请输入正确的邮箱地址", trigger: "change" },
    ],
  };

  private get pageName(): string | null | undefined {
    return this.$route.name;
  }

  addAccount() {
    this.Bankrule = {
      bank: "",
      type: "",
      accountName: "",
      accountNum: "",
    };
    this.bankType = "new-add";
    this.dialogFormVisible = true;
  }

  async submit(type: number): Promise<void> {
    // if (this.info.timeList.length) {
    //   this.info.businessTime = `${this.info.timeList[0]} - ${this.info.timeList[1]}`;
    // }
    if (this.info.provinceList.length) {
      this.info.province = this.info.provinceList[0];
      this.info.city = this.info.provinceList[1];
      this.info.county = this.info.provinceList[2];
    }
    let ruleFrom = new Promise((resolve: (value: any) => void) => {
      (this.$refs["ruleForm"] as ElForm).validate((val) => {
        resolve(val);
      });
    });
    let personForm = new Promise((resolve: (value: any) => void) => {
      (this.$refs["personForm"] as ElForm).validate((val) => {
        resolve(val);
      });
    });

    Promise.all([ruleFrom, personForm]).then(async (value) => {
      if (value[0] && value[1]) {
        // this.info.channelPersons.push(this.channelPersonsData);
        switch (this.pageName) {
          case "AddChannel":
            // 渠道商添加
            await post_channel_add({
              ...this.info,
              channelPersons: [{ ...this.channelPersonsData }],
              operateType: type,
            });
            this.$message.success("渠道商添加成功");
            this.$goto({ path: "/channelBusiness/list" });
            break;
          case "EditChannel":
            // 修改渠道商
            await post_channel_edit({
              ...this.info,
              channelPersons: [{ ...this.channelPersonsData }],
              operateType: type,
            });
            this.$message.success("修改渠道商成功");
            this.$goto({ path: "/channelBusiness/list" });
            break;
          case "ChangeChannel":
            // 渠道商提交变更
            if (!this.changeReason) {
              this.$message.error("变更原因不能为空");
              return;
            }
            await post_channelChange_add({
              ...this.info,
              operateType: type,
              channelPersonChanges: [{ ...this.channelPersonsData }],
              channelBankChanges: this.info.channelBanks,
              changeReason: this.changeReason,
              oldChannelId: this.$route.query.id,
            });
            this.$message.success("渠道商变更提交成功");
            this.$goto({ path: "/channelChange/list" });
            break;
          case "ChannelChangeEdit":
            break;
        }
      } else {
        // 表单还有没填写
      }
    });
  }
  /**
   * @description: 新添加数据--银行账号信息
   * @param {object} value
   * @param {string} type
   */
  private handlePushBank(value: any, type: string): void {
    switch (type) {
      case "new-add":
        this.info.channelBanks.push(value);
        break;
      case "new-edit":
        this.$set(this.info.channelBanks, value.index, value);
        // console.log(this.info.channelBanks);
        break;
    }
    this.dialogFormVisible = false;
  }
  async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      let res: any = await get_channel_get__id({ id: id });
      // res.timeList = res.businessTime.split(" - ");
      res.provinceList = [res.province, res.city, res.county];
      this.info = res;
      this.channelPersonsData = this.info.channelPersons.length
        ? this.info.channelPersons[0]
        : {};
    }
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
   * @param {object} row 编辑当前行数据
   * @param {number} index 编辑当前行数据下标
   */
  private async deleteBank(row: object, index: number): Promise<void> {
    this.info.channelBanks.splice(index, 1);
    this.$message.success("删除成功");
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
