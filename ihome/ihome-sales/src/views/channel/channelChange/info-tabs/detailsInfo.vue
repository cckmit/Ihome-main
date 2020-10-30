<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-16 14:05:21
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-23 11:59:27
-->
<template>
  <div class="text-left">
    <p class="ih-info-title">基础信息</p>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称">
            <span
              class="text-ellipsis"
              :title="info.name"
            >{{ info.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="信用代码">
            <span
              class="text-ellipsis"
              :title="info.creditCode"
            >{{ info.creditCode }}</span>
          </el-form-item>
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
          >
            <span
              class="text-ellipsis"
              :title="$root.dictAllName(info.type, 'ChannelCompanyType')"
            >{{ $root.dictAllName(info.type, "ChannelCompanyType") }}</span>
          </el-form-item>
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
          <el-form-item label="省份">{{ $root.getAreaName(info.province) }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市">{{ $root.getAreaName(info.city) }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政区">{{ $root.getAreaName(info.county) }}</el-form-item>
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
    <div class="padding-left-20">
      <el-table
        :data="info.channelBankChanges"
        style="100%"
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
            {{$root.dictAllName(row.type, "AccountEnum")}}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <p class="ih-info-title">负责人信息</p>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">{{ channelPersons.name }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">{{ channelPersons.mobile }}</el-form-item>
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
    <p class="ih-info-title">
      <span>附件信息</span>
      <el-link
        class="margin-left-16"
        href="http://zxgk.court.gov.cn/zhzxgk/"
        type="success"
        target="_blank"
      >综合查询被执行人</el-link>
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
      <br />
    </div>

    <p class="ih-info-title">企业概况</p>
    <div class="padding-left-20">{{info.remark}}</div>
    <br />

    <p class="ih-info-title">变更原因</p>
    <div class="padding-left-20">{{info.changeReason}}</div>

    <template v-if="pageName === 'ChannelChangeConfirm'">
      <p class="ih-info-title">确认意见</p>
      <el-input
        type="textarea"
        placeholder="请输入确认意见"
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

    <template v-if="pageName === 'ChannelChangeExamine'">
      <p class="ih-info-title">审核意见</p>
      <el-input
        type="textarea"
        style="box-sizing: border-box;"
        class="padding-left-20"
        placeholder="请输入审核意见"
        v-model="approveRecord.remark"
        :rows="3"
      ></el-input>
      <div class="text-center">
        <br />
        <el-button
          type="success"
          @click="confirmChannel('Pass')"
        >通过</el-button>
        <el-button>退回</el-button>
      </div>
    </template>

    <template v-if="pageName === 'ChannelChangeRevoke'">
      <p class="ih-info-title">撤回原因</p>
      <el-input
        type="textarea"
        style="box-sizing: border-box;"
        class="padding-left-20"
        placeholder="请输入撤回原因"
        v-model="approveRecord.remark"
        :rows="3"
      ></el-input>
      <div class="text-center">
        <br />
        <el-button
          type="success"
          @click="confirmChannel('Revoke')"
        >通过</el-button>
        <el-button>退回</el-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//引入请求数据的api
import {
  get_channelChange_get__id,
  post_channelChange_approveRecord,
} from "@/api/channel/index";
@Component({
  components: {},
})
export default class DetailInfo extends Vue {
  info: any = {};
  private channelPersons: object = {};
  private approveRecord: ConfirmObj = {
    remark: "",
    result: "",
  };
  private get pageName(): string | null | undefined {
    return this.$route.name;
  }

  async getInfo() {
    let id = this.$route.query.id;
    this.info = await get_channelChange_get__id({ id: id });
    this.channelPersons =
      this.info.channelPersonChanges.length &&
      this.info.channelPersonChanges[0];
  }
  private async confirmChannel(type: string): Promise<void> {
    if (!this.approveRecord.remark) {
      this.$message.error("输入不能为空");
      return;
    }
    this.approveRecord.result = type;
    await post_channelChange_approveRecord({
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
.text-ellipsis {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
