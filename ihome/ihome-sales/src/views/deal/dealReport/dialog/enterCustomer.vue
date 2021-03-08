<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2021-01-19 17:00:11
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-19 17:20:11
-->
<template>
  <el-dialog
    v-dialogDrag
    title="添加客户"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="600px"
    style="text-align: left"
    class="dialog">
    <el-form :model="postData" :rules="rules" ref="ruleForm" label-width="100px" @submit.native.prevent>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户姓名" prop="custName">
            <el-input
              clearable
              :maxlength="20"
              v-model="postData.custName"
              placeholder="客户姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机号码" prop="custTel">
            <el-input
              clearable
              :maxlength="11"
              v-model="postData.custTel"
              placeholder="手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="客户来源" prop="custOrg">
            <el-select
              clearable
              v-model="postData.custOrg"
              placeholder="客户来源"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('CustomerOrg')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="客户类型" prop="custType">
            <el-select
              clearable
              v-model="postData.custType"
              @change="handleChangeCustType"
              placeholder="客户类型"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('CustType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="证件类型" prop="cardType">
            <el-select
              clearable
              v-model="postData.cardType"
              @change="handleChangeCardType"
              placeholder="证件类型"
              class="width--100">
              <el-option
                v-for="item in cardTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="证件编号" prop="certificateNumber">
            <el-input
              clearable
              v-model="postData.certificateNumber"
              placeholder="证件编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="邮箱">
            <el-input
              clearable
              v-model="postData.email"
              placeholder="邮箱"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="handleAdd()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import {post_customer_add} from "@/api/customer";
  import {
    phoneValidator,
    validIdentityCard
  } from "ihome-common/util/base/form-ui";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {},
    mixins: [],
  })
  export default class EnterCustomer extends Vue {
    constructor() {
      super();
    }
    private dialogVisible = true;
    private cardTypeList = [];
    postData: any = {
      custName: null,
      custTel: null,
      custOrg: null,
      custType: null,
      cardType: null,
      certificateNumber: null,
      email: null
    };
    rules: any = {
      custName: [
        { required: true, message: "请输入客户名称", trigger: "change" },
        { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "change" }
      ],
      custTel: [
        { required: true, message: "请输入手机号", trigger: "change" },
        { validator: phoneValidator, trigger: "change" }
      ],
      custOrg: [
        {required: true, message: "请选择客户来源", trigger: "change"}
      ],
      custType: [
        {required: true, message: "请选择客户类型", trigger: "change"}
      ],
      cardType: [
        {required: true, message: "请选择证件类型", trigger: "change"}
      ],
      certificateNumber: [
        {required: true, message: "请输入证件编号", trigger: "change"}
      ],
    };
    @Prop({default: null}) data: any;

    created() {
      console.log('created');
    }

    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    async finish() {
      this.$emit("finish", false);
    }

    // 确定-添加客户
    @NoRepeatHttp()
    handleAdd() {
      (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
    }

    async addSave(valid: any) {
      if (valid) {
        await post_customer_add(this.postData);
        this.$emit("finish", false);
      }
    }

    // 改变客户类型
    handleChangeCustType(value: any) {
      if (!value) {
        this.postData.cardType = null;
        this.cardTypeList = [];
      } else {
         let CardList: any = (this as any).$root.dictAllList('CardType');
        if (value === "Individual") {
          // 个人
          this.cardTypeList = CardList.filter((item: any) => {
            return item.code !== "Businesslicense";
          });
          this.postData.cardType = "IDCard"; // 个人默认选中居民身份证
        } else if (value === "Company") {
          // 公司
          this.cardTypeList = CardList.filter((item: any) => {
            return ['Businesslicense', "Others"].includes(item.code);
          });
          this.postData.cardType = "Businesslicense"; // 公司默认选中营业执照
        }
      }
    }

    // 改变证件类型
    handleChangeCardType(value: any) {
      if (value === 'IdCard') {
        // 居民身份证
        this.rules.certificateNumber = [
          {required: true, message: "请输入证件编号", trigger: "change"},
          {validator: validIdentityCard, trigger: "change"}
        ]
      } else {
        this.rules.certificateNumber = [
          {required: true, message: "请输入证件编号", trigger: "change"}
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>