<!--
 * @Description: 客户信息
 * @version: 1.0
 * @Author: yag
 * @Date: - 2021-02-05 11:11:54
 * @LastEditors: yag
 * @LastEditTime: - 2021-02-05 11:11:54
-->

<template>
  <el-dialog
    v-dialogDrag
    title="客户信息"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="600px"
    class="dialog text-left"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col>
          <el-form-item label="客户姓名" prop="custName">
            <el-input v-model="form.custName" placeholder="客户姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="手机号码" prop="custTel">
            <el-input
              v-model="form.custTel"
              placeholder="客户联系方式"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="客户来源" prop="custOrg">
            <el-select v-model="form.custOrg" placeholder="请选客户来源">
              <el-option
                v-for="item in $root.dictAllList('CustOrg')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="客户类型" prop="custType">
            <el-select v-model="form.custType" placeholder="请选客户类型">
              <el-option
                v-for="item in $root.dictAllList('CustType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="证件类型" prop="cardType">
            <el-select v-model="form.cardType" placeholder="请选择证件类型" @change="() => {handleCardChange()}">
              <el-option
                v-for="item in $root.dictAllList('CardType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="证件编号" prop="certificateNumber">
            <el-input
              v-model="form.certificateNumber"
              placeholder="证件编号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";

import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  phoneValidator,
  validIdentityCard,
  emailOrNullValidato,
} from "ihome-common/util/base/form-ui";
import { post_customer_add } from "../../../api/customer";
@Component({
  components: {},
})
export default class CustomerAdd extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  form: any = {
    custName: null,
    custType: null,
    custTel: null,
    cardType: null,
    certificateNumber: null,
    custOrg: null,
    email: null,
  };
  rules: any = {
    custName: [
      { required: true, message: "客户姓名不能为空", trigger: "change" },
      { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "change" },
    ],
    custOrg: [{ required: true, message: "请选择客户来源", trigger: "change" }],
    custType: [
      { required: true, message: "请选择客户类型", trigger: "change" },
    ],
    cardType: [
      { required: true, message: "请选择证件类型", trigger: "change" },
    ],
    custTel: [
      { required: true, message: "手机号码不能为空", trigger: "change" },
      { validator: phoneValidator, trigger: "change" },
    ],
    certificateNumber: [
      { required: true, message: "证件编号不能为空", trigger: "change" },
    ],
    email: [{ validator: emailOrNullValidato, trigger: "change" }],
  };

  // 切换证件类型，验证身份证、港澳通行证、台湾通行证、护照
  handleCardChange() {
    if (this.form.cardType == 'IDCard') {
      this.rules.certificateNumber = [
        { required: true, message: "证件编号不能为空", trigger: "change" },
        { validator: validIdentityCard, trigger: "change" },
      ];
    }else{
      this.rules.certificateNumber = [
        { required: true, message: "证件编号不能为空", trigger: "change" },
      ];
    } 
  }
  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      const res = await post_customer_add(this.form);
      this.$message.success(res);
      this.$emit("finish", res);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss" >
.ih-dialog {
  .el-form-item__content {
    margin-right: 40px;
  }
  .el-input,
  .el-select {
    width: 100%;
  }
}
</style>
