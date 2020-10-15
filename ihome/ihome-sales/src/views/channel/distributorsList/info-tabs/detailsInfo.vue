<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-16 14:05:21
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-15 10:40:58
-->
<template>
  <div class="text-left">
    <p class="ih-info-title">基础信息</p>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称">{{ info.name }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="信用代码">{{ info.creditCode }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="简称">{{ info.shortName }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="类型"
            v-if="info.type"
          >{{ $root.dictAllName(info.type, "ChannelCompanyType").name }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法定代表人">{{ info.legalPerson }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人身份证号码">{{ info.legalIdentityCode }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="成立日期">{{ info.setupTime }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册资本">{{ info.capital }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="营业期限">{{ info.businessTime }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="省份">{{ info.province }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市">{{ info.city }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政区">{{ info.county }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="住所">{{ info.address }}</el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="跟进人">{{ info.followUserId }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="状态"
            v-if="info.status"
          >{{ $root.dictAllName(info.status, 'ChannelStatus').name }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <p class="ih-info-title">
      <span>银行账号信息</span>
    </p>
    <el-table
      :data="info.channelBanks"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="accountName"
        label="账户名称"
        min-width="300"
      ></el-table-column>
      <el-table-column
        prop="accountNum"
        label="账号"
        min-width="200"
      > </el-table-column>
      <el-table-column
        prop="bank"
        label="开户银行"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="账号类型"
        width="200"
      >
        <template v-slot="{row}">
          {{$root.dictAllName(row.type, "AccountEnum").name}}
        </template>
      </el-table-column>
    </el-table>

    <p class="ih-info-title">负责人信息</p>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">{{ channelPersons.name }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">{{ channelPersons.bobile }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号码">{{ channelPersons.identityCode }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电子邮箱">{{ channelPersons.email }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p class="ih-info-title">附件信息</p>
    <br />

    <p class="ih-info-title">企业概况</p>
    <div>
      {{info.remark}}
    </div>
    <br />

    <template v-if="typeStr === 'ConfirmChannel'">
      <p class="ih-info-title">确认意见</p>
      <el-input
        type="textarea"
        placeholder="请输入意见"
        v-model="approveRecord.remark"
        :rows="3"
      ></el-input>
      <div class="text-center">
        <br />
        <el-button
          type="success"
          @click="confirmChannel('Confirm')"
        >通过</el-button>
        <el-button>退回</el-button>
      </div>
    </template>

    <template v-if="typeStr === 'RevokeChannel'">
      <p class="ih-info-title">撤回原因</p>
      <el-input
        type="textarea"
        placeholder="请输入撤回原因"
        v-model="approveRecord.remark"
        :rows="3"
      ></el-input>
      <div class="text-center">
        <br />
        <el-button
          type="success"
          @click="confirmChannel('Revoke')"
        >提交</el-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
//引入请求数据的api
import {
  get_channel_get__id,
  post_channel_approveRecord,
} from "../../../../api/channel/index";
@Component({
  components: {},
})
export default class Home extends Vue {
  @Prop() typeStr!: string;
  info: any = {};
  private channelPersons: object = {};
  private approveRecord: ConfirmObj = {
    remark: "",
    result: "",
  };

  async getInfo() {
    let id = this.$route.query.id;
    this.info = await get_channel_get__id({ id: id });
    this.channelPersons = this.info.channelPersons[0];
  }
  private async confirmChannel(type: string): Promise<void> {
    if (!this.approveRecord.remark) {
      this.$message.error("输入不能为空");
      return;
    }
    this.approveRecord.result = type;
    await post_channel_approveRecord({
      ...this.approveRecord,
      id: this.$route.query.id,
    });
    this.$message.success("成功");
    this.$router.push({
      path: "list",
    });
  }

  async created() {
    this.getInfo();
  }
}
interface ConfirmObj {
  remark: string;
  result: string;
}
</script>

<style lang="scss" scoped>
.line {
  padding: 15px;
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
