<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 18:39:23
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-04 16:31:02
-->
<template>
  <ih-page>
    <template v-slot:info>
      <div class="text-left">
        <p class="ih-info-title">基础信息</p>
        <el-form label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="名称">
                <span class="text-ellipsis" :title="info.agencyName">{{
                  info.agencyName
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="信用代码">
                <span class="text-ellipsis" :title="info.creditCode">{{
                  info.creditCode
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="简称">{{ info.simpleName }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="省份">{{
                $root.getAreaName(info.province)
              }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市">{{
                $root.getAreaName(info.city)
              }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行政区">{{
                $root.getAreaName(info.area)
              }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="住所" prop="addr">
                <span class="text-ellipsis" :title="info.addr">{{
                  info.addr
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法定代表人">{{
                info.legalPerson
              }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="类型">
                <span
                  class="text-ellipsis"
                  :title="
                    $root.dictAllName(info.companyType, 'ChannelCompanyType')
                  "
                  >{{
                    $root.dictAllName(info.companyType, "ChannelCompanyType")
                  }}</span
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="成立日期">{{
                info.establishDate
              }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册资本">{{
                info.registeredCapital
              }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="营业期限">{{
                `${info.businessStart} 至 ${info.businessEnd}`
              }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="跟进人">{{ info.followMan }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="状态" v-if="info.agencyAuditEnum">{{
                $root.dictAllName(info.agencyAuditEnum, "AgencyAuditEnum")
              }}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <p class="ih-info-title">
          <span>银行账号信息</span>
        </p>
        <div class="padding-left-20">
          <el-table :data="info.firstAgencyAccounts" style="100%">
            <el-table-column
              prop="accountName"
              label="账户名称"
              min-width="300"
            ></el-table-column>
            <el-table-column prop="accountNo" label="账号" min-width="200">
            </el-table-column>
            <el-table-column
              prop="depositBank"
              label="开户银行"
              width="300"
            ></el-table-column>
            <el-table-column prop="accountEnum" label="账号类型" width="200">
              <template v-slot="{ row }">
                {{ $root.dictAllName(row.accountEnum, "AccountEnum") }}
              </template>
            </el-table-column>
          </el-table>
        </div>

        <p class="ih-info-title">负责人信息</p>
        <el-form label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名">{{
                info.responsibleMan
              }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码">{{ info.mobile }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号码">{{ info.idCard }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="电子邮箱">{{ info.mail }}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <p class="ih-info-title">
          <span>附件信息</span>
        </p>
        <div class="padding-left-20">
          <el-table style="width: 100%" :data="info.attachAgencyVOS">
            <el-table-column
              prop="firstAgencyAttachEnum"
              width="180"
              label="类型"
              ><template v-slot="{ row }">{{
                $root.dictAllName(
                  row.firstAgencyAttachEnum,
                  "FirstAgencyAttachEnum"
                )
              }}</template>
            </el-table-column>
            <el-table-column label="附件"></el-table-column>
          </el-table>
          <br />
        </div>

        <p class="ih-info-title">备注</p>
        <div class="padding-left-20">{{ info.remark }}</div>
        <br />
      </div>
    </template>
  </ih-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_firstAgencyCompany_get__agencyId } from "@/api/project/index";
@Component({
  components: {},
})
export default class FirstAgencyInfo extends Vue {
  info: any = {};

  async getInfo() {
    let id = this.$route.query.id;
    this.info = await get_firstAgencyCompany_get__agencyId({ agencyId: id });
  }

  async created() {
    this.getInfo();
  }
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