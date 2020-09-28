<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-16 14:05:21
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-28 11:42:13
-->

<template>
  <ih-page>
    <template v-slot:form>
      <p class="ih-info-title">基础信息</p>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用代码" prop="creditCode">
              <el-input v-model="ruleForm.creditCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="简称" prop="shortName">
              <el-input v-model="ruleForm.shortName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="类型" prop="type">
              <el-input v-model="ruleForm.type"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人" prop="legalPerson">
              <el-input v-model="ruleForm.legalPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人身份证号码" prop="id">
              <el-input v-model="ruleForm.id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="成立日期" prop="setupTime">
              <el-input v-model="ruleForm.setupTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资本" prop="capital">
              <el-input v-model="ruleForm.capital"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业期限" prop="businessTime">
              <el-input v-model="ruleForm.businessTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省份" prop="province">
              <el-input v-model="ruleForm.province"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市" prop="city">
              <el-input v-model="ruleForm.city"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行政区" prop="county">
              <el-input v-model="ruleForm.county"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <p class="ih-info-title">
      <span>银行账号信息</span>

      <el-button type="success" class="add" @click.native="addAccount()"
        >添加</el-button
      >
    </p>
    <!-- 对话框 -->

    <el-dialog title="账户信息" :visible.sync="dialogFormVisible" width="800px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账户名称" prop="accountName">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="accountNum">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bank">
          <el-input v-model="ruleForm.bank"></el-input>
        </el-form-item>
        <el-col :span="8">
          <el-form-item label="账户类型" prop="bankType">
            <el-select
              v-model="ruleForm.bankType"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in $root.displayList('bankType')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-table :data="info.channelBanks" border style="width: 100%">
      <el-table-column
        prop="accountName"
        label="账户名称"
        width="400"
      ></el-table-column>
      <el-table-column prop="accountNum" label="账号"> </el-table-column>
      <el-table-column
        prop="bank"
        label="开户银行"
        width="400"
      ></el-table-column>
      <el-table-column
        prop="Banktype"
        label="账号类型"
        width="300"
      ></el-table-column>
    </el-table>
    <p class="ih-info-title">负责人信息</p>

    <p class="ih-info-title">附件信息</p>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//引入请求数据的api
import {
  get_channel_get__id,
  // post_channelBank_addOrEdit,
} from "../../../../api/channel/index";
// import PaginationMixin from "../../../../mixins/pagination";
@Component({
  components: {},
})
export default class Home extends Vue {
  info: any = {};

  dialogFormVisible = false;
  ruleForm: any = {
    accountName: "",
    accountNum: "",
    bank: "",
    Banktype: "",
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
  };
  rules: any = {
    accountName: [
      { required: true, message: "请输入账户名称", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 64 个字符", trigger: "blur" },
    ],
    accountNum: [
      { required: true, max: 32, message: "请输入账号", trigger: "blur" },
    ],
    bank: [
      { required: true, max: 64, message: "请输入开户银行", trigger: "blur" },
    ],
    Banktype: [{ required: true, message: "请选择账户类型", trigger: "blur" }],
    county: [{ required: true, message: "请选择行政区", trigger: "blur" }],
    city: [{ required: true, message: "请选择城市", trigger: "blur" }],
    province: [{ required: true, message: "请选择省份", trigger: "blur" }],
    businessTime: [
      { required: true, message: "请输入营业期限", trigger: "blur" },
    ],
    id: [{ required: true, message: "请输入法人身份证号码", trigger: "blur" }],
    type: [{ required: true, message: "请选择类型", trigger: "blur" }],
    shortName: [{ required: true, message: "请输入简称", trigger: "blur" }],
    creditCode: [
      { required: true, message: "请输入信用代码", trigger: "blur" },
    ],
    legalPerson: [
      { required: true, message: "请输入法定代表人", trigger: "blur" },
    ],
    name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
    capital: [{ required: true, message: "请输入注册资本", trigger: "blur" }],
    setupTime: [{ required: true, message: "请输入成立日期", trigger: "blur" }],
  };

  addAccount(scope: any) {
    console.log(11);
    this.dialogFormVisible = true;
  }

  // handleAdd(formName) {
  //   // this.$refs[formName].validate((valid) => {
  //   //   if (valid) {
  //   //     post_channelBank_addOrEdit(this.ruleForm);
  //   //     this.dialogFormVisible = false;
  //   //   } else {
  //   //     return false;
  //   //   }
  //   // });
  //   console.log(11);
  // }

  async created() {
    this.getInfo();
    console.log("4444");
  }
  async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      this.ruleForm = await get_channel_get__id({ id: id });
    } else {
      this.ruleForm = {};
    }
  }
}
</script>
<style lang="scss" scoped>
.ih-info-title {
  border-left: 5px solid #4cccec;
  .add {
    color: #000;
    margin-left: 20px;
    cursor: pointer;
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
