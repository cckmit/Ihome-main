<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-06 10:03:01
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-24 10:59:00
-->
<template>
  <ih-page class="text-left notSale">
    <template #info>
      <div class="title">非标联动销售确认书(启动函)模板</div>
      <br />
      <el-form
        ref="form"
        label-width="120px"
        :model="info"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同类型">
              <span>非标联动销售确认书(启动函)</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="合同标题"
              prop="contractTitle"
            >
              <el-input
                v-model="info.contractTitle"
                placeholder="请输入内容"
                readonly
                style="max-width: 300px;"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标题备注">
              <el-input
                v-model="info.titleOrRemark"
                placeholder="请输入标题备注"
                readonly
                style="max-width: 400px;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称">
              <span>{{info.proName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方公司">
              <span>{{info.partyCompany}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合作时间">
              <el-date-picker
                readonly
                v-model="info.timeList"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                style="max-width: 400px;width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="渠道类型"
              prop="channelEnum"
            >
              <el-select
                v-model="info.channelEnum"
                disabled
                placeholder="请选择渠道类型"
                style="max-width: 300px;width: 100%"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelCustomer')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div v-if="isShow">
            <el-col
              :span='5'
              class="width-200"
            >
              <el-form-item
                prop="companyKind"
                label-width="50px"
              >
                <el-select
                  v-model="info.companyKind"
                  disabled
                  placeholder="请选择"
                  class="width--150"
                >
                  <el-option
                    v-for="item in companyKindOption"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span='7'
              class="margin-left-10"
            >
              <IhSelectPageByCompany
                v-if="info.companyKind === 'InfieldCompany'"
                style="flex: 1;max-width: 300px;"
                disabled
                v-model="info.designatedAgencyId"
              ></IhSelectPageByCompany>
              <div v-else-if="info.companyKind === 'ChannelCompany'">
                <IhSelectPageByChannel
                  v-model="info.designatedAgencyId"
                  style="flex: 1;max-width: 300px;"
                  disabled
                  placeholder="渠道商名称"
                  :search-name="info.designatedAgency"
                ></IhSelectPageByChannel>
                <el-link
                  v-if="info.designatedAgencyId"
                  type="primary"
                  :href="`/web-sales/channelBusiness/info?id=${info.designatedAgencyId}`"
                  class="margin-left-10"
                  target="_blank"
                >详情</el-link>
              </div>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="合同电子版"
              required
            >
              <IhUpload
                v-model="fileList"
                size="100px"
                :upload-show="!!fileList.length"
                :limit="fileList.length"
                :editPermi="false"
                :removePermi="false"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center positon">
        <el-button @click="cancel">返 回</el-button>
      </div>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_company_get__id, post_dict_getAllByType } from "@/api/system";
import { get_distributContract_getDistri__agencyContrictId } from "@/api/project";
@Component({
  components: {},
})
export default class NotSalesApply extends Vue {
  private info: any = {
    agencyContrictId: null,
    attachTermItemVOS: [],
    contractEndTime: null,
    contractStartTime: null,
    contractTitle: null,
    partyCompany: null,
    partyCompanyId: null,
    partyaAddr: null,
    proId: null,
    proName: null,
    proRecord: null,
    termId: null,
    timeList: [],
    titleOrRemark: null,
    channelEnum: null,
    companyKind: null,
    designatedAgencyId: null,
    designatedAgency: null,
  };
  private fileList: any = [];
  private finishLoading: any = false;
  private isShow: any = false;
  private companyKindOption: any = [];

  get agencyContrictId() {
    return this.$route.query.id;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    const res: any = sessionStorage.getItem("addContract");
    if (this.agencyContrictId) {
      const data = await get_distributContract_getDistri__agencyContrictId({
        agencyContrictId: this.agencyContrictId,
      });
      this.info = { ...data, ...JSON.parse(res), timeList: [] };
      if (data.contractStartTime && data.contractEndTime) {
        this.info.timeList = [data.contractStartTime, data.contractEndTime];
      }
      this.fileList = data.attachTermItemVOS.map((v: any) => ({
        fileId: v.fileId,
        fileName: v.fileName,
        type: v.type,
        exAuto: v.exAuto,
      }));
      if (data.channelEnum === "Appoint" || data.channelEnum === "Strategic") {
        this.isShow = true;
        this.companyKindOption = await post_dict_getAllByType({
          tag: "Channel",
          type: "CompanyKind",
          valid: "Valid",
        });
      } else {
        this.isShow = false;
      }
    } else {
      Object.assign(this.info, JSON.parse(res));
      if (this.info.preferentialPartyAId) {
        const item = await get_company_get__id({
          id: this.info.preferentialPartyAId,
        });
        this.info.partyCompany = item?.name;
        this.info.partyCompanyId = item?.id;
        this.info.partyaAddr = item?.address;
      }
    }
  }

  cancel() {
    window.sessionStorage.setItem("tabStatus", "Notification");
    this.$router.go(-1);
  }
}
</script>
<style scoped lang="scss">
.notSale {
  position: relative;
}
.title {
  font-size: 18px;
  font-weight: 600;
}
.positon {
  position: absolute;
  bottom: 50px;
  left: calc(50% - 75px);
}
</style>