<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-06 09:40:39
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-27 11:39:42
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
        :rules="rules"
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
                clearable
                style="max-width: 300px;"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标题备注">
              <el-input
                v-model="info.titleOrRemark"
                placeholder="请输入标题备注"
                clearable
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
                clearable
                placeholder="请选择渠道类型"
                style="max-width: 300px;width: 100%"
                @change="channelChange"
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
                  clearable
                  placeholder="请选择"
                  class="width--150"
                  @change="companyKindChange"
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
                clearable
                v-model="info.designatedAgencyId"
                @changeOption="getChannelInfo"
              ></IhSelectPageByCompany>
              <div v-else-if="info.companyKind === 'ChannelCompany'">
                <IhSelectPageByChannel
                  v-model="info.designatedAgencyId"
                  style="flex: 1;max-width: 300px;"
                  clearable
                  placeholder="渠道商名称"
                  :params="searchConditon"
                  :search-name="info.designatedAgency"
                  @changeOption="getChannelInfo"
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
                @newFileList="newFileList"
                accept=".pdf, .doc, .docx, .docm"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center positon">
        <el-button
          type="success"
          @click="finish()"
          :loading="finishLoading"
        >提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_company_get__id, post_dict_getAllByType } from "@/api/system";
import {
  post_distributContract_addNoStandKindSaleConfirm,
  get_distributContract_getDistri__agencyContrictId,
  post_distributContract_updateNoStandKindSaleConfirm,
} from "@/api/project";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
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
    channelEnum: null,
    companyKind: null,
    designatedAgencyId: null,
    designatedAgency: null,
    titleOrRemark: null,
  };
  private rules: any = {
    contractTitle: [
      {
        required: true,
        message: "请填写合同标题",
        trigger: "change",
      },
    ],
    channelEnum: [
      {
        required: true,
        message: "请选择渠道类型",
        trigger: "change",
      },
    ],
  };
  private searchConditon: any = {};
  private isShow: any = false;
  private companyKindOption: any = [];
  private fileList: any = [];
  private finishLoading: any = false;

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
        if (data.companyKind === "ChannelCompany") {
          this.searchConditon = {
            cycleCity: window.sessionStorage.getItem("shengshiqu"),
            departmentOrgId: window.sessionStorage.getItem("departmentOrgId"),
            isNotNeedChannelLevelApprove: true,
          };
        }
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

  companyKindChange(val: any) {
    this.info.designatedAgencyId = null;
    this.info.designatedAgency = null;
    if (val) {
      switch (val) {
        case "ChannelCompany":
          this.searchConditon = {
            cycleCity: window.sessionStorage.getItem("shengshiqu"),
            departmentOrgId: window.sessionStorage.getItem("departmentOrgId"),
            isNotNeedChannelLevelApprove: true,
            // channelEnum: this.info.channelEnum,
          };
          break;
        case "InfieldCompany":
          this.searchConditon = {};
          break;
      }
    }
  }

  async channelChange(val: any) {
    if (val === "Appoint" || val === "Strategic") {
      this.isShow = true;
      this.companyKindOption = await post_dict_getAllByType({
        tag: "Channel",
        type: "CompanyKind",
        valid: "Valid",
      });
    } else {
      this.isShow = false;
      this.companyKindOption = [];
    }
  }

  getChannelInfo(item: any) {
    this.info.designatedAgency = item.name;
    this.info.designatedAgencyId = item.id;
  }

  newFileList(data: any) {
    this.info.attachTermItemVOS = data.map((v: any) => ({
      fileId: v.fileId,
      fileName: v.fileName,
      type: "LinkProSale",
    }));
  }

  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }

  @NoRepeatHttp()
  async submit(v: any) {
    if (v) {
      let obj: any = {};
      obj = { ...this.info };
      let flag = this.info.timeList && this.info.timeList.length;
      obj.contractStartTime = flag ? this.info.timeList[0] : null;
      obj.contractEndTime = flag ? this.info.timeList[1] : null;
      delete obj.timeList;
      delete obj.padCommissionEnum;
      delete obj.preferentialPartyAId;
      console.log(obj);
      if (!this.info.attachTermItemVOS.length) {
        this.$message.warning("请上传合同电子版附件");
        return false;
      }
      if (!this.agencyContrictId) {
        try {
          this.finishLoading = true;
          await post_distributContract_addNoStandKindSaleConfirm(obj);
          this.$message.success("模板添加成功");
          this.finishLoading = false;
          window.sessionStorage.setItem("tabStatus", "Notification");
          this.$router.go(-1);
        } catch (err) {
          this.finishLoading = false;
          console.log(err);
        }
      } else {
        if (this.$route.name === "copyNotSalesApply") {
          try {
            this.finishLoading = true;
            await post_distributContract_addNoStandKindSaleConfirm(obj);
            this.$message.success("模板复制成功");
            this.finishLoading = false;
            window.sessionStorage.setItem("tabStatus", "Notification");
            this.$router.go(-1);
          } catch (err) {
            this.finishLoading = false;
            console.log(err);
          }
        } else if (this.$route.name === "notSalesApply") {
          try {
            this.finishLoading = true;
            await post_distributContract_updateNoStandKindSaleConfirm(obj);
            this.$message.success("模板编辑成功");
            this.finishLoading = false;
            window.sessionStorage.setItem("tabStatus", "Notification");
            this.$router.go(-1);
          } catch (err) {
            this.finishLoading = false;
            console.log(err);
          }
        }
      }
    } else {
      setTimeout(() => {
        let isError: any = document.getElementsByClassName("is-error");
        if (isError != null) {
          isError[0].querySelector("input").focus();
        }
      }, 100);
      return false;
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