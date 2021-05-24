<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 13:20:35
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-26 16:24:20
-->

<template>
  <ih-page class="text-left margin-bottom-30">
    <el-row class="ih-info-line">
      <el-col :span="12" class="text-left">
        <h3>成交报告编号：{{ infoForm.dealCode }}</h3>
      </el-col>
      <el-col :span="12" class="text-right">
        <h3>【{{ infoForm.dealOrg }}】</h3>
      </el-col>
    </el-row>
    <div class="deal-info-title">
      <div>
        <div>录入人：{{infoForm.entryPerson }}</div>
        <div>录入日期：{{infoForm.createTime ? infoForm.createTime.substring(0, 10) : '-'}}</div>
      </div>
      <div>
        <div>业绩分配人：{{infoForm.alloter }}</div>
        <div>业绩分配日期：{{infoForm.allotDate ? infoForm.allotDate.substring(0, 10) : '-'}}</div>
      </div>
      <div>
        <div>业绩确认日期：{{infoForm.alloter }}</div>
      </div>
      <div class="status-wrapper">
        <div>状态</div>
        <div class="status">
          <IhStatusComponent
            :status="infoForm.status"
            :status-obj="{
                warning: 'Draft',
                success: 'ReviewPassed'
            }">
            <div>{{ $root.dictAllName(infoForm.status, "DealStatus") }}</div>
          </IhStatusComponent>
        </div>
      </div>
      <div class="status-wrapper">
        <div>计算方式</div>
        <div class="status">
          <IhStatusComponent
            :status="infoForm.calculation"
            :status-obj="{
                warning: 'Manual',
                success: 'Auto'
            }">
            <div>{{ $root.dictAllName(infoForm.calculation, "DealCalculateWay") }}</div>
          </IhStatusComponent>
        </div>
      </div>
      <div class="status-wrapper">
        <div>数据标志</div>
        <div class="status">
          <IhStatusComponent
            :status="infoForm.dataSign"
            :status-obj="{
                warning: 'NoMingYuan',
                success: 'WholeMingYuan'
            }">
            <div>{{ $root.dictAllName(infoForm.dataSign, "DealDataFlag") }}</div>
          </IhStatusComponent>
        </div>
      </div>
    </div>
    <br />
    <div v-for="(item, index) in componentList" :key="index">
      <component
        :key="index"
        v-if="(!suppContType || item.isShowList.includes(suppContType)) && (!item.charge || item.charge !== infoForm.charge)"
        :infoForm="infoForm"
        v-bind:is="item.componentName"></component>
    </div>
    <div class="btn-wrapper">
      <el-button @click="handleBack">返回</el-button>
      <el-button type="primary" @click="viewReviewDetails">查看审核详情</el-button>
    </div>
    <ih-dialog :show="reviewDialog" desc="成交审核操作记录信息">
      <ReviewDetailsDialog
        :data="reviewData"
        @cancel="() => (reviewDialog = false)"
        @finish="
            () => {
              reviewDialog = false;
            }
          "/>
    </ih-dialog>
    <IhImgViews
      v-if="isShowImg"
      :url-list="srcList"
      :viewer-msg="srcData"
      :onClose="() => (isShowImg = false)"
    ></IhImgViews>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ReviewDetailsDialog from "@/views/deal/dealReport/dialog/reviewDetailsDialog.vue";
  import {
    get_deal_get__id, // 根据ID查询成交详情
    get_deal_getByCode__dealCode // 用成交报告编号，查询成交详情 --- 兼容其他模块
  } from "@/api/deal";
  import {post_notice_customer_information} from "@/api/contract";
  import {get_invoice_getInvoiceInfo__businessCode} from "@/api/finance";

  @Component({
    components: {ReviewDetailsDialog},
  })
  export default class DealReportInfo extends Vue {
    private isShowImg = false;
    private srcList: any = [];
    private srcData: any = [];
    private componentList: any = [
      {
        isShowList: ['ChangeBasicInf', 'ChangeAchieveInf', 'RetreatRoom'], // 展示组件的逻辑列表
        componentName: () => import('./info-components/baseInfo.vue'), // 成交信息
      },
      {
        charge: 'Agent', // 纯代理费不显示优惠告知书信息
        isShowList: ['ChangeBasicInf', 'ChangeAchieveInf', 'RetreatRoom'],
        componentName: () => import('./info-components/noticeInfo.vue'), // 优惠告知书信息
      },
      {
        isShowList: ['ChangeBasicInf', 'ChangeAchieveInf', 'RetreatRoom'],
        componentName: () => import('./info-components/customerInfo.vue'), // 客户信息
      },
      {
        isShowList: ['ChangeAchieveInf', 'RetreatRoom'],
        componentName: () => import('./info-components/receiveInfo.vue'), // 收派信息
      },
      {
        isShowList: ['ChangeAchieveInf', 'RetreatRoom'],
        componentName: () => import('./info-components/channelCommInfo.vue'), // 拆佣信息
      },
      {
        isShowList: ['ChangeAchieveInf', 'RetreatRoom', 'ChangeInternalAchieveInf'],
        componentName: () => import('./info-components/achieveInfo.vue'), // 平台费用信息
      },
      {
        isShowList: ['ChangeBasicInf', 'ChangeAchieveInf', 'RetreatRoom'],
        componentName: () => import('./info-components/documentInfo.vue'), // 附件信息
      },
      {
        isShowList: [],
        componentName: () => import('./info-components/invoiceInfo.vue'), // 发票信息
      }
    ]; // 详情的各个模块

    infoForm: any = {
      contractKind: null, // 分销协议合同类型
      contTitle: null,
      charge: null, // 收费类型 --- 用于是否展示优惠告知书：纯代理费不展示优惠告知书
      dealCode: null,
      dealOrgName: null, // 成交组织name
      house: {}, // 房产信息
      offerNoticeList: [], // 优惠告知书
      customerList: [], // 客户信息
      agencyList: [], // 渠道信息
      receiveList: [], // 收派金额
      receiveAchieveList: [], // 应收业绩 - 收派信息下
      channelCommList: [], // 对外拆佣信息
      achieveList: [], // 平台费用 - 包含总包和分销
      achieveTotalBagList: [], // 平台费用 - 总包 - 前端拆分
      achieveDistriList: [], // 平台费用 - 分销 - 前端拆分
      documentLists: [], // 附件信息
      processRecordList: [], // 审核信息
      invoiceList: [] // 发票信息
    };
    reviewDialog: any = false;
    reviewData: any = []; // 审核详情
    infoType: any = null; // 是通过成交ID还是成交编号获取详情
    dealIdOrCode: any = null; // ID或者code
    suppContType: any = null; // 补充成交类型 --- 区别主成交和补充成交的展示

    async created() {
      this.infoType = this.$route.query.type;
      this.dealIdOrCode = this.$route.query.id;
      if (this.infoType && this.dealIdOrCode) {
        await this.init(); // 基础数据
      }
    }

    // 链接跳转
    gotoNew(item: any, type: any) {
      if (type == "oneAgentTeam") {
        window.open(`/web-sales/firstAgency/info?id=${item.oneAgentTeamId}`);
      } else if (type == "agencyName") {
        let agencyId =
          item.agencyList && item.agencyList.length
            ? item.agencyList[0].agencyId
            : "";
        if (agencyId != "") {
          window.open(`/web-sales/channelBusiness/info?id=${agencyId}`);
        }
      } else if (type == "contTitle") {
        // 需要根据渠道合同类型跳转不同的页面
        if (item.contractKind === 'StandKindSaleConfirm') {
          // 标准联动销售确认书(启动函)
          window.open(`/web-sales/distribution/normalSalesInfo?id=${item.contId}`);
        } else if (item.contractKind === 'NoStandKindSaleConfirm') {
          // 非标联动销售确认书(启动函)
          window.open(`/web-sales/distribution/notSalesInfo?id=${item.contId}`);
        } else if (item.contractKind === 'StandChannel') {
          // 标准渠道分销合同
          window.open(`/web-sales/distribution/normalDistributionInfo?id=${item.contId}`);
        } else if (item.contractKind === 'NoStandChannel') {
          // 非标渠道分销合同
          window.open(`/web-sales/distribution/notDistributionInfo?id=${item.contId}`);
        } else if (item.contractKind === 'NoChannel') {
          // 非渠道类合同
          window.open(`/web-sales/distribution/notChannelInfo?id=${item.contId}`);
        }
      } else if (type == "firstContNo") {
        window.open(`/web-sales/distribution/notChannelInfo?id=${item.firstContId}`);
      } else if (type == "partyACustomerName") {
        window.open(`/web-sales/developers/info?id=${item.partyACustomer}`);
      } else if (type == "cycleName") {
        window.open(`/web-sales/projectApproval/info?id=${item.cycleId}`);
      }
    }

    // 初始化数据
    async init() {
      let info: any = null;
      if (this.infoType === "ID") {
        info = await get_deal_get__id({id: this.dealIdOrCode});
      } else {
        info = await get_deal_getByCode__dealCode({dealCode : this.dealIdOrCode});
      }
      // 补充成交类型
      this.suppContType = info?.suppContType;
      // console.log(this.infoForm);
      // this.infoForm = (this as any).$tool.deepClone(info || {});
      this.infoForm = {
        ...this.infoForm,
        ...info
      };
      // 初始化优惠告知书信息
      if (info && info.charge !== 'Agent') {
        await this.getInformation(info?.id, info?.parentId, info?.cycleId);
      }
      // 初始化开票信息
      await this.getInvoiceInfo(info.dealCode);
    }

    // 根据成交id获取优惠告知书列表
    async getInformation(id: any = '', parentId: any = '', cycleId: any = '') {
      if (!id || !parentId || !cycleId) return;
      if (id !== parentId) {
        const idList: any = await post_notice_customer_information({dealId: id, cycleId: cycleId});
        const parentIdList: any = await post_notice_customer_information({dealId: parentId, cycleId: cycleId});
        // console.log('优惠告知书列表', list);
        this.$nextTick(() => {
          this.infoForm.offerNoticeList = [...idList, ...parentIdList];
        });
      } else {
        const list: any = await post_notice_customer_information({dealId: id, cycleId: cycleId});
        // console.log('优惠告知书列表', list);
        if (list && list.length > 0) {
          this.infoForm.offerNoticeList = list;
        } else {
          this.infoForm.offerNoticeList = [];
        }
      }
      // console.log(this.infoForm.offerNoticeList);
    }

    // 获取开票信息
    async getInvoiceInfo(code: any = '') {
      if (!code) return;
      let info: any = await get_invoice_getInvoiceInfo__businessCode({businessCode: code});
      // console.log(info);
      if (info && info.length) {
        this.infoForm.invoiceList.push(info);
      } else {
        this.infoForm.invoiceList = [];
      }
    }

    // 返回
    handleBack() {
      this.$router.push({
        path: "/dealReport/list"
      });
    }

    // 查看审核详情
    viewReviewDetails() {
      // console.log('查看审核详情');
      this.reviewData = this.infoForm.processRecordList;
      this.reviewDialog = true;
    }
  }
</script>
<style lang="scss" scoped>
.deal-info-title {
  //width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 15px 0px 20px;

  &>div {
    flex: 3;
    &>div {
      box-sizing: border-box;
      margin-bottom: 8px;
    }
  }

  .status-wrapper {
    text-align: right;
    flex: 1;

    .status {
      //font-size: 19px;
      font-weight: 700;

      /deep/.ih-status-dot {
        justify-content: flex-end;
      }
    }
  }
}

/deep/ .ih-info-line {
  padding: 0 10px 10px 10px;
}
/deep/ .el-card__header {
  background: #f9f9f9;
}

  .btn-wrapper {
    //width: 100%;
    position: fixed;
    bottom: 20px;
    right: 20px;
    text-align: right;
    padding-right: 20px;
    margin: 0 20px;
    //text-align: center;
    box-sizing: border-box;
    //margin-top: 20px;
    z-index: 10;
  }
</style>
<style lang="scss">
.font-weight-600 {
  font-weight: 600;
  font-size: 15px;
}
.card-header {
  text-align: left;
  font-weight: 600;
  font-size: 18px;
}
.p-title {
  font-weight: 600;
  text-align: left;
}
.line-item {
  text-align: left;
  padding-bottom: 15px;
}
.line-item-bottom {
  font-weight: 600;
}
.line {
  border-top: 1px solid #eee;
}

.red {
  color: red;
  margin-left: 10px;
}
.file-list {
  text-align: left;
}
.file-item-border {
  padding: 8px;
  display: inline-block;
  width: 25%;
  box-sizing: border-box;
}

.file-item {
  padding: 10px;
  border: 1px solid #eee;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.file-item-border :hover {
  .floating-layer {
    display: block;
  }
}
.floating-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgba($color: #000000, $alpha: 0.5);
  left: 0px;
  top: 0px;
  z-index: 10;
  display: none;
}
.file-pre {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-pre-btn {
  color: #fff;
  text-decoration: none;
}

.file-item-1 {
  display: flex;
  position: relative;
}
.file-item-1-left {
  width: 80px;
  text-align: left;
}
.file-item-1-right {
  flex: 1;
  text-align: right;
}
.special {
  width: 80px;
  height: 28px;
  text-align: center;
  display: inline-block;
  background: red;
  color: #fff;
  transform: rotate(45deg);
  position: absolute;
  left: -41px;
  bottom: -13px;
  font-size: 12px;
}
.Invalidation {
}
.WaitBeSigned {
  color: #f56c6c;
}
.BecomeEffective {
  color: #19be6b;
}
</style>
