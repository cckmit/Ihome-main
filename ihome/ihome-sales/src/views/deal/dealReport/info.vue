<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 13:20:35
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-11 08:47:44
-->
<template>
  <ih-page class="text-left">
    <p class="ih-info-title">成交信息</p>
    <el-form
      :model="infoForm"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="成交报告编号">{{infoForm.dealCode}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目周期">{{infoForm.projectCycle}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务模式">{{infoForm.modelName}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型">{{infoForm.contType}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="细分业务模式">{{infoForm.refineModel}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交状态">{{infoForm.status}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否代销">{{infoForm.isConsign}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="一手代理团队">{{infoForm.oneAgentTeam}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否市场化项目">{{infoForm.isMarketProject}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务类型">{{infoForm.businessType}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="明源房款回笼比例">{{infoForm.returnRatio}}%</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备案情况">{{infoForm.recordState}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分销协议编号">{{infoForm.channelLevel}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否垫佣">{{infoForm.isMat}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数据标志">{{infoForm.dataSign}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交组织">{{infoForm.dealOrgId}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交阶段">{{infoForm.stage}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约类型">{{infoForm.signType}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认购价格">{{infoForm.subscribePrice}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认购日期">{{infoForm.subscribeDate}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约价格">{{infoForm.signPrice}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约日期">{{infoForm.signDate}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入日期">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入人">{{infoForm.entryDate}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业绩分配人">{{infoForm.alloter}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业绩分配日期">{{infoForm.allotDate}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="备注">{{infoForm.remarks}}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p class="ih-info-title">房产信息</p>
    <el-form
      :model="infoForm"
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="物业类型">{{infoForm.house.propertyType}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="栋座">{{infoForm.house.buildingName}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">{{infoForm.house.roomNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房产证/预售合同编号">{{infoForm.house.propertyNo}}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="房产证地址">{{infoForm.house.address}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑面积">{{infoForm.house.area}}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="户型">
            <div class="home-type-wrapper">
              <div>{{infoForm.house.room}}室</div>
              <div>{{infoForm.house.hall}}厅</div>
              <div>{{infoForm.house.kitchen}}厨</div>
              <div>{{infoForm.house.toilet}}卫</div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="优惠告知书"></el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label=""
            label-width="80px"
          >
            <el-table
              class="ih-table"
              :data="infoForm.offerNoticeList"
            >
              <el-table-column
                prop="offerNoticeName"
                label="名称"
                min-width="120"
              ></el-table-column>
              <el-table-column
                prop="offerNoticeCode"
                label="优惠告知书编号"
                min-width="120"
              ></el-table-column>
              <el-table-column
                prop="offerNoticeStatus"
                label="优惠告知书状态"
                min-width="120"
              ></el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="130"
              >
                <template slot-scope="scope">
                  <el-link
                    class="margin-right-10"
                    type="primary"
                    @click.native.prevent="preview(scope)"
                  >预览
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p class="ih-info-title">客户信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.customerList"
        >
          <el-table-column
            prop="customerNo"
            label="客户编号"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="customerType"
            label="客户类型"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="customerName"
            label="客户名称"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="customerPhone"
            label="手机号码"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="cardType"
            label="证件类型"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="cardNo"
            label="证件编号"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            min-width="150"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p class="ih-info-title">渠道信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.agencyList"
        >
          <el-table-column
            prop="agencyName"
            label="渠道公司名称"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="channelLevel"
            label="渠道等级"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="broker"
            label="经纪人"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="storeIdName"
            label="门店"
            min-width="120"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p class="ih-info-title">收派金额</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getReceiveSummaries"
          :data="infoForm.receiveList"
        >
          <el-table-column
            prop="type"
            label="类型"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="partyACustomerName"
            label="甲方/客户"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="packageId"
            label="收派套餐"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="receiveAmount"
            label="应收金额"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="receivedAmount"
            label="应收已收金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="commAmount"
            label="派发佣金金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="rewardAmount"
            label="派发内场奖励金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="totalPackageAmount"
            label="总包业绩金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="distributionAmount"
            label="分销业绩金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="otherChannelFees"
            label="其他渠道费用(正数为产生，负数为使用)"
            min-width="150"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="padding-left: 20px; margin-top: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.receiveAchieveList"
        >
          <el-table-column
            prop="receiveAmount"
            label="本单应收"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="achieveAmount"
            label="本单业绩"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="otherChannelFees"
            label="其他渠道费用(正数为产生，负数为使用)"
            min-width="150"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p class="ih-info-title">对外拆佣</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getCommissionSummaries"
          :data="infoForm.channelCommList"
        >
          <el-table-column
            prop="target"
            label="拆佣对象"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="payee"
            label="收款方"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="feeType"
            label="费用类型"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="feeType"
            label="费用来源(客户/甲方)"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="paidAmount"
            label="已付金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="amount"
            label="金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            min-width="150"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p class="ih-info-title">平台费用</p>
    <p class="ih-type-wrapper">总包</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getAchieveSummaries"
          :data="infoForm.achieveTotalBagList"
        >
          <el-table-column
            prop="roleType"
            label="角色类型"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="roleAchieveCap"
            label="角色业绩上限"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="corporateAchieve"
            label="公司业绩"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="corporateAchieveRatio"
            label="公司业绩比例（%）"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="commFees"
            label="拆佣金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="commFeesRatio"
            label="拆佣比例（%）"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="rolerName"
            label="角色人"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="belongOrgName"
            label="店组"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="管理岗"
            min-width="150"
          >
            <template slot-scope="scope">
              <span>{{scope.row.commFees}}%</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p class="ih-type-wrapper">分销</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getAchieveSummaries"
          :data="infoForm.achieveDistriList"
        >
          <el-table-column
            prop="roleType"
            label="角色类型"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="roleAchieveCap"
            label="角色业绩上限"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="corporateAchieve"
            label="公司业绩"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="corporateAchieveRatio"
            label="公司业绩比例（%）"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="commFees"
            label="拆佣金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="commFeesRatio"
            label="拆佣比例（%）"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="rolerName"
            label="角色人"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="belongOrgName"
            label="店组"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="管理岗"
            min-width="150"
          >
            <template slot-scope="scope">
              <span>{{scope.row.commFees}}%</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p class="ih-info-title">附件</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.documentList"
        >
          <el-table-column
            prop="fileType"
            label="类型"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="fileName"
            label="附件"
            min-width="120"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p class="ih-info-title">发票信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.invoiceList"
        >
          <el-table-column
            prop="modelName"
            label="开票日期"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="发票类型"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="发票代码"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="发票号码"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="抬头"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="发票金额（含税）"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="确认主营（不含税）"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="税额（公式）"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="NC凭证号"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="备注"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="附件"
            min-width="150"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="btn-wrapper">
      <el-button
        type="primary"
        @click="viewReviewDetails"
      >查看审核详情</el-button>
    </div>
    <ih-dialog
      :show="reviewDialog"
      desc="成交审核记录"
    >
      <ReviewDetailsDialog
        :data="reviewData"
        @cancel="() => (reviewDialog = false)"
        @finish="
            () => {
              reviewDialog = false;
            }
          "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ReviewDetailsDialog from "@/views/deal/dealReport/dialog/reviewDetailsDialog.vue";
import { get_deal_get__id } from "@/api/deal";

@Component({
  components: { ReviewDetailsDialog },
})
export default class DealReportInfo extends Vue {
  infoForm: any = {
    dealCode: null,
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
    documentList: [], // 附件信息
    processRecordList: [], // 审核信息
    invoiceList: [], // 发票信息
  };
  reviewDialog: any = false;
  reviewData: any = {};
  dealId: any = null;

  created() {
    this.dealId = this.$route.query.id;
    if (this.dealId) {
      this.init();
    }
  }

  // 初始化数据
  async init() {
    this.infoForm = await get_deal_get__id({ id: this.dealId });
    // console.log(this.infoForm);
    // 业务模式
    if (this.infoForm.modelName) {
      this.infoForm.modelName = this.getNameByDict(
        "BusinessModel",
        this.infoForm.modelName
      );
    }
    // 合同模式
    if (this.infoForm.contType) {
      this.infoForm.contType = this.getNameByDict(
        "ContType",
        this.infoForm.contType
      );
    }
    // 细分业务模式
    if (this.infoForm.refineModel) {
      this.infoForm.refineModel =
        this.infoForm.refineModel === "All" ? "总包" : "分销";
    }
    // 成交状态
    if (this.infoForm.status) {
      this.infoForm.status = this.getNameByDict(
        "DealStatus",
        this.infoForm.status
      );
    }
    // 是否代销
    if (this.infoForm.isConsign) {
      this.infoForm.isConsign = this.infoForm.isConsign === "Yes" ? "是" : "否";
    }
    // 是否市场化项目
    if (this.infoForm.isMarketProject) {
      this.infoForm.isMarketProject =
        this.infoForm.isMarketProject === "Yes" ? "是" : "否";
    }
    // 业务类型
    if (this.infoForm.businessType) {
      this.infoForm.businessType = this.getNameByDict(
        "BusType",
        this.infoForm.businessType
      );
    }
    // 备案情况
    if (this.infoForm.recordState) {
      this.infoForm.recordState =
        this.infoForm.recordState === "Has" ? "有" : "无";
    }
    // 是否垫佣
    if (this.infoForm.isMat) {
      this.infoForm.isMat = this.infoForm.isMat === "Yes" ? "是" : "否";
    }
    // 数据源标志
    if (this.infoForm.dataSign) {
      this.infoForm.dataSign = this.getNameByDict(
        "DealDataFlag",
        this.infoForm.dataSign
      );
    }
    // 签约类型
    if (this.infoForm.signType) {
      this.infoForm.signType = this.getNameByDict(
        "SignUp",
        this.infoForm.signType
      );
    }
    // 成交阶段
    if (this.infoForm.stage) {
      this.infoForm.stage = this.getNameByDict(
        "DealStage",
        this.infoForm.stage
      );
    }
    // 物业类型
    if (this.infoForm.house && this.infoForm.house.propertyType) {
      this.infoForm.house.propertyType = this.getNameByDict(
        "Property",
        this.infoForm.house.propertyType
      );
    }
    // 客户信息
    if (this.infoForm.customerList.length > 0) {
      this.infoForm.customerList.forEach((list: any) => {
        // 客户类型
        if (list.customerType) {
          list.customerType = this.getNameByDict("CustType", list.customerType);
        }
        // 证件类型
        if (list.cardType) {
          list.cardType = this.getNameByDict("CardType", list.cardType);
        }
      });
    }
    // 渠道信息
    if (this.infoForm.agencyList.length > 0) {
      this.infoForm.agencyList.forEach((list: any) => {
        // 渠道等级
        if (list.channelLevel) {
          list.channelLevel = this.getNameByDict(
            "ChannelLevel",
            list.channelLevel
          );
        }
      });
    }
    // 收派金额
    if (this.infoForm.receiveList.length > 0) {
      this.infoForm.receiveList.forEach((list: any) => {
        // 渠道等级
        if (list.type) {
          list.type = this.getNameByDict("FeeType", list.type);
        }
      });
    }
    // 平台费用
    if (this.infoForm.achieveList.length > 0) {
      this.infoForm.achieveTotalBagList = [];
      this.infoForm.achieveDistriList = [];
      this.infoForm.achieveList.forEach((list: any) => {
        if (list.roleType) {
          list.roleType = this.getNameByDict("DealRole", list.roleType);
        }
        if (list.type === "TotalBag") {
          this.infoForm.achieveTotalBagList.push(list);
        } else if (list.type === "Distri") {
          this.infoForm.achieveDistriList.push(list);
        }
      });
    }
  }

  // 在数据字典中获取对应的中文名
  getNameByDict(key: any, type: any) {
    if (!key || !type) return;
    let name = "";
    let list = (this as any).$root.dictAllList(key);
    list.forEach((item: any) => {
      if (item.code === type) {
        name = item.name;
      }
    });
    return name;
  }

  // 计算收派金额总计
  getReceiveSummaries(param: any) {
    const { columns, data } = param;
    const sums: any = [];
    columns.forEach((column: any, index: any) => {
      if (index === 0) {
        sums[index] = "合计金额";
        return;
      }
      if (![0, 1, 2].includes(index)) {
        const values = data.map((item: any) => Number(item[column.property]));
        if (!values.every((value: any) => isNaN(value))) {
          sums[index] = values.reduce((prev: any, curr: any) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      } else {
        sums[index] = "";
      }
    });
    return sums;
  }

  // 计算对外拆佣合计
  getCommissionSummaries(param: any) {
    const { columns, data } = param;
    const sums: any = [];
    columns.forEach((column: any, index: any) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }
      if ([4].includes(index)) {
        const values = data.map((item: any) => Number(item[column.property]));
        if (!values.every((value: any) => isNaN(value))) {
          sums[index] = values.reduce((prev: any, curr: any) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      } else {
        sums[index] = "";
      }
    });
    return sums;
  }

  // 计算平台费用-总包/分销合计
  getAchieveSummaries(param: any) {
    const { columns, data } = param;
    const sums: any = [];
    columns.forEach((column: any, index: any) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }
      if ([1, 2, 3, 4, 5].includes(index)) {
        const values = data.map((item: any) => Number(item[column.property]));
        if (!values.every((value: any) => isNaN(value))) {
          sums[index] = values.reduce((prev: any, curr: any) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      } else {
        sums[index] = "";
      }
    });
    return sums;
  }

  // 预览
  preview(scope: any) {
    console.log("预览scope", scope);
  }

  // 查看审核详情
  viewReviewDetails() {
    console.log("查看审核详情");
    this.reviewData = {
      title: "main", // 标题
      dealId: this.infoForm.id, // 成交id
    };
    this.reviewDialog = true;
  }
}
</script>
<style lang="scss" scoped>
.home-type-wrapper {
  width: 100%;
  display: flex;

  div {
    flex: 1;
    text-align: center;
  }
}

.btn-wrapper {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  margin-top: 20px;
}

.ih-type-wrapper {
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  padding-left: 20px;
  text-align: left;
}
</style>
