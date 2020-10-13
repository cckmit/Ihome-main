<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-16 14:05:21
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-13 16:10:23
-->

<template>
  <ih-page>
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
              <el-input v-model="info.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="信用代码"
              prop="creditCode"
            >
              <el-input v-model="info.creditCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="简称"
              prop="shortName"
            >
              <el-input v-model="info.shortName"></el-input>
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
              <el-input v-model="info.legalPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="法人身份证号码"
              prop="legalIdentityCode"
            >
              <el-input v-model="info.legalIdentityCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="成立日期"
              prop="setupTime"
            >
              <el-input v-model="info.setupTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="注册资本"
              prop="capital"
            >
              <el-input v-model="info.capital"></el-input>
            </el-form-item>
          </el-col>
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
        </el-row>
        <!-- <el-row>
          <el-col :span="8">
            <el-form-item label="省份">
              <el-select
                v-model="ruleForm.province"
                clearable
                placeholder="请选择省份"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('provinces')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-select
                v-model="ruleForm.province"
                clearable
                placeholder="请选择城市"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('provinces')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="行政区"
              prop="county"
            >
              <el-input v-model="ruleForm.county"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="省市区"
              prop="provinceList"
            >
              <IhCascader v-model="info.provinceList"></IhCascader>
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
        @click.native="addAccount()"
      >添加</el-button>
    </p>
    <br />
    <el-table
      :data="info.channelBanks"
      style="width: 100%"
    >
      <el-table-column
        prop="accountName"
        label="账户名称"
        min-width="200"
      ></el-table-column>
      <el-table-column
        prop="accountNum"
        label="账号"
        width="200"
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
          <span>{{$root.dictAllName(row.type, "AccountEnum").name}}</span>
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
            type="primary"
            @click="deleteBank(row, $index)"
          >删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <p class="ih-info-title">负责人信息</p>
    <el-form
      :model="channelPersons"
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
          >
            <el-input v-model="channelPersons.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="手机号码"
            prop="bobile"
          >
            <el-input v-model="channelPersons.bobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="身份证号码"
            prop="identityCode"
          >
            <el-input v-model="channelPersons.identityCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input v-model="channelPersons.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <p class="ih-info-title">附件信息</p>
    <el-table style="width: 100%">
      <el-table-column
        prop="type"
        width="180"
        label="类型"
      ></el-table-column>
      <el-table-column label="附件"></el-table-column>
    </el-table>

    <p class="ih-info-title">企业概况</p>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入企业概况"
      v-model="info.remark"
    >
    </el-input>
    <div>
      <br />
      <el-button
        type="primary"
        @click="handleSave()"
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
        @finish="handlePushBank"
      />
    </IhDialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
//引入请求数据的api -- 先调用本地的
import {
  get_channel_get__id,
  post_channel_add,
} from "../../../../api/channel/index";
import BankDialog from "../dialog/bankDialog.vue";
// import PaginationMixin from "../../../../mixins/pagination";
@Component({
  components: {
    BankDialog,
  },
})
export default class Home extends Vue {
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
  dialogFormVisible = false;
  Bankrule: any = {
    bank: "",
    type: "",
    accountName: "",
    accountNum: "",
  };
  bankType: any = "new-add";
  channelPersons: any = {
    name: "",
    bobile: "",
    identityCode: "",
    email: "",
  };
  ruleForm: any = {
    county: "",
    city: "",
    province: "",
    businessTime: "",
    capital: "",
    setupTime: "",
    id: "",
    legalPerson: "",
    type: "",
    shortName: "",
    creditCode: "",
    name: "",
    inputTimeStart: "",
    inputTimeEnd: "",
    address: "",
    email: "",
    bobile: "",
  };

  private rules: any = {
    address: [{ required: true, message: "请输入住所", trigger: "blur" }],
    provinceList: [
      { required: true, message: "请选择省市区", trigger: ["blur", "change"] },
    ],
    legalIdentityCode: [
      { required: true, message: "请输入法人身份证号码", trigger: "blur" },
    ],
    type: [{ required: true, message: "请选择类型", trigger: "blur" }],
    shortName: [{ required: true, message: "请输入简称", trigger: "blur" }],
    creditCode: [
      { required: true, message: "请输入信用代码", trigger: "blur" },
    ],
    legalPerson: [
      { required: true, message: "请输入法定代表人", trigger: "blur" },
    ],
    bobile: [
      { required: true, message: "请输入手机号", trigger: "blur" },
      {
        pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
        message: "手机号格式不对",
        trigger: "blur",
      },
    ],
    identityCode: [
      { required: true, message: "请填写证件号码", trigger: "blur" },
      {
        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
        message: "证件号码格式有误！",
        trigger: "blur",
      },
    ],
    email: [
      { required: true, message: "请填写邮箱", trigger: "blur" },
      {
        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
        message: "邮箱格式有误！",
        trigger: "blur",
      },
    ],
    name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
    capital: [{ required: true, message: "请输入注册资本", trigger: "blur" }],
    setupTime: [{ required: true, message: "请输入成立日期", trigger: "blur" }],
  };

  employmentDateChange(dateArray: any) {
    console.log(dateArray);
    this.ruleForm.inputTimeStart = dateArray[0];
    this.ruleForm.inputTimeEnd = dateArray[1];
  }
  addAccount() {
    this.Bankrule = {
      bank: "",
      type: "",
      accountName: "",
      accountNum: "",
    };
    this.dialogFormVisible = true;
  }
  async handleSave() {
    if (this.info.timeList.length) {
      this.info.businessTime = `${this.info.timeList[0]} - ${this.info.timeList[1]}`;
    }
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
      console.log(value);
      if (value[0] && value[1]) {
        this.info.channelPersons.push(this.channelPersons);
        await post_channel_add({ ...this.info, operateType: 1 });
        this.$message.success("渠道商添加成功");
      } else {
        // 表单还有没填写
      }
    });
  }
  submit() {
    console.log("提交");
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
        console.log(this.info.channelBanks);
        break;
    }
    this.dialogFormVisible = false;
  }
  async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      this.ruleForm = await get_channel_get__id({ id: id });
      console.log(this.info);
      this.ruleForm = {};
    }
  }
  /**
   * @description: 编辑银行信息
   * @param {object} row 编辑当前行数据
   * @param {number} index 编辑当前行数据下标
   */
  private editBank(row: object, index: number): void {
    console.log("编辑银行信息", row, index);
    this.bankType = "new-edit";
    this.Bankrule = { ...row, index };
    this.dialogFormVisible = true;
  }
  /**
   * @description: 删除银行信息
   * @param {object} row 编辑当前行数据
   * @param {number} index 编辑当前行数据下标
   */
  private deleteBank(row: object, index: number): void {
    console.log("删除银行信息", row, index);
    this.info.channelBanks.splice(index, 1);
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
.line {
  padding: 15px;
}
.ih-info-item-left {
  text-align: right;
  line-height: 21px;
}
.ih-info-item-right {
  text-align: left;
  padding-left: 20px;
  line-height: 21px;
}
.title {
  font-weight: 600;
  text-align: left;
  margin-left: 20px;
  height: 500px;
}
.el-input__inner {
  width: 1060px;
}
</style>
