<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>成交信息</span>
      </div>
      <p class="p-title">项目信息</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">
            <span>项目周期</span>
            <span class="red">
              <span v-if="infoForm.modelCode"
                >[{{
                  $root.dictAllName(infoForm.modelCode, "BusinessModel")
                }}]</span
              >
              <span v-if="infoForm.isConsign">
                [ {{ infoForm.isConsign == "Yes" ? "代销" : "非代销" }}]
              </span>
              <span v-if="infoForm.isMarketProject">
                [{{
                  infoForm.isMarketProject == "Yes" ? "市场化" : "非市场化"
                }}]
              </span>
            </span>
          </div>
          <div class="line-item-bottom">{{ infoForm.cycleName }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">细分业务模式</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.refineModel, "Subdivide") }}
          </div>
        </el-col>
      </el-row>

      <p class="p-title">房产信息</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">物业类型</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.house.propertyType, "Property") }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">栋座房号</div>
          <div class="line-item-bottom">
            {{ infoForm.house.buildingName }}{{ infoForm.house.roomNo }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">建筑面积</div>
          <div class="line-item-bottom">{{ infoForm.house.area }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">户型</div>
          <div class="line-item-bottom">
            <span>{{ infoForm.house.room }}室</span>
            <span>{{ infoForm.house.hall }}厅</span>
            <span>{{ infoForm.house.toilet }}卫</span>
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">房产证/预售合同编号</div>
          <div class="line-item-bottom">{{ infoForm.house.propertyNo }}</div>
        </el-col>
      </el-row>
      <p class="line"></p>
      <p class="p-title">房产信息</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">合同类型</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.contType, "ContType") }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">成交阶段</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.stage, "DealStage") }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">签约类型</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.signType, "SignUp") }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">认购价格</div>
          <div class="line-item-bottom">{{ infoForm.subscribePrice }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">认购日期</div>
          <div class="line-item-bottom">{{ infoForm.subscribeDate }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">签约价格</div>
          <div class="line-item-bottom">{{ infoForm.signPrice }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">签约日期</div>
          <div class="line-item-bottom">{{ infoForm.signDate }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">备案情况</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.recordState, "HasOrNoType") }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">现场销售</div>
          <div class="line-item-bottom">{{ infoForm.sceneSales }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">房款回笼比例</div>
          <div class="line-item-bottom">
            {{ infoForm.returnRatio ? infoForm.returnRatio : 0 }}%
          </div>
        </el-col>
      </el-row>

      <p class="p-title">拆佣公司</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">一手代理公司</div>
          <div class="line-item-bottom">{{ infoForm.oneAgentTeam }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">一手代理合同</div>
          <div class="line-item-bottom">{{ infoForm.firstContNo }}</div>
        </el-col>
      </el-row>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">
            <span>渠道公司</span>
            <span class="red" v-if="companyKind">[{{ companyKind }}]</span>
          </div>
          <div class="line-item-bottom">
            {{
              infoForm.agencyList && infoForm.agencyList.length
                ? infoForm.agencyList[0].agencyName
                : ""
            }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">经纪人</div>
          <div class="line-item-bottom">
            {{
              infoForm.agencyList && infoForm.agencyList.length
                ? infoForm.agencyList[0].broker
                : ""
            }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">
            <span>渠道分销合同</span>
            <span class="red">
              <span v-if="infoForm.isMat">
                [{{
                  infoForm.isMat == "Veto"
                    ? "不垫佣"
                    : $root.dictAllName(infoForm.isMat, "PadCommission")
                }}]
              </span>
            </span>
          </div>
          <div class="line-item-bottom">{{ infoForm.contTitle }}</div>
        </el-col>
      </el-row>
      <p class="line"></p>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>优惠告知书</span>
      </div>
      <div class="file-list">
        <div
          class="file-item-border"
          v-for="(item, index) in infoForm.offerNoticeList"
          :key="index"
        >
          <div class="file-item">
            <div class="floating-layer">
              <div class="file-pre">
                <a class="file-pre-btn" href="javascript:;" @click="pre(item)">
                  <i class="el-icon-zoom-in"></i>
                  预览</a
                >
              </div>
            </div>
            <div class="file-item-1">
              <div class="file-item-1-left">
                 {{
                    $root.dictAllName(item.notificationType, "NotificationType")
                  }}
              </div>
              <!-- <div class="file-item-1-right">客户待签署</div> -->
              <div class="file-item-1-right">
                <span :class="item.notificationStatus">
                  {{
                    $root.dictAllName(
                      item.notificationStatus,
                      "NotificationStatus"
                    )
                  }}
                </span>
              </div>
            </div>
            <div class="file-item-1">编号：{{ item.noticeNo }}</div>
            <div class="file-item-1">
              <!-- <div class="file-item-1-left special">特殊</div> -->
              <div style="height: 16px"></div>
              <!-- <div class="file-item-1-right">
                <el-link type="primary">预览</el-link>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>客户信息</span>
      </div>
      <div>
        <el-table :data="infoForm.customerList" style="width: 100%">
          <el-table-column
            prop="customerNo"
            label="客户编号"
            min-width="120"
          ></el-table-column>
          <el-table-column prop="customerType" label="客户类型" min-width="120">
            <template slot-scope="scope">
              <div>
                {{ $root.dictAllName(scope.row.customerType, "CustType") }}
              </div>
            </template>
          </el-table-column>
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
          <el-table-column prop="cardType" label="证件类型" min-width="150">
            <template slot-scope="scope">
              <div>{{ $root.dictAllName(scope.row.cardType, "CardType") }}</div>
            </template>
          </el-table-column>
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
      </div>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>收派信息</span>
      </div>
      <div>
        <el-table
          :data="infoForm.receiveList"
          style="width: 100%"
          show-summary
          sum-text="合计"
        >
          <el-table-column prop="type" label="类型" width="200">
            <template slot-scope="scope">
              <div>{{ $root.dictAllName(scope.row.type, "FeeType") }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="partyACustomerName"
            label="甲方/客户"
            width="200"
          >
            <template slot-scope="scope">
              <div>
                {{
                  scope.row.type === "ServiceFee"
                    ? "客户"
                    : scope.row.partyACustomerName
                }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="receiveAmount"
            label="应收金额"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="commAmount"
            label="派发佣金金额"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="rewardAmount"
            label="派发内场金额"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="totalPackageAmount"
            label="总包业绩金额"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="distributionAmount"
            label="分销业绩金额"
            min-width="180"
          ></el-table-column>
        </el-table>
      </div>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>拆佣信息</span>
      </div>
      <div>
        <el-table
          style="width: 100%"
          key=""
          show-summary
          sum-text="合计"
          :data="infoForm.channelCommList"
        >
          <el-table-column prop="target" label="拆佣对象" min-width="120">
            <template slot-scope="scope">
              <div>
                {{ $root.dictAllName(scope.row.target, "CommObjectType") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="agencyName"
            label="收款方"
            min-width="120"
          ></el-table-column>
          <el-table-column prop="feeType" label="费用类型" min-width="120">
            <template slot-scope="scope">
              <div>{{ $root.dictAllName(scope.row.feeType, "FeeType") }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="partyACustomerName"
            label="费用来源"
            min-width="120"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.feeType === 'ServiceFee'">客户</div>
              <div v-else>{{ scope.row.partyACustomerName }}</div>
            </template>
          </el-table-column>
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
      </div>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>平台费用信息</span>
      </div>
      <div>
        <p class="p-title">总包费用</p>
        <el-table
          show-summary
          sum-text="合计"
          :data="infoForm.achieveTotalBagList"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <p>管理岗分配业绩</p>
              <el-table :data="scope.row.managerAchieveList" style="width: 600">
                <el-table-column prop="manager" label="管理岗" width="200">
                </el-table-column>
                <el-table-column
                  prop="achieveFees"
                  label="分配金额"
                  width="200"
                >
                </el-table-column>
                <el-table-column prop="ratio" label="金额比例" width="200">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>

          <el-table-column prop="roleType" label="角色类型" min-width="120">
            <template slot-scope="scope">
              <div>{{ $root.dictAllName(scope.row.roleType, "DealRole") }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="roleAchieveCap"
            label="角色业绩上限"
            min-width="150"
          ></el-table-column>
          <el-table-column prop="rolerName" label="角色人" min-width="150">
            <template slot-scope="scope">
              <div>{{ scope.row.rolerName }}</div>
              <div>{{ scope.row.rolerPosition }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="corporateAchieve"
            label="角色人业绩"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="roleAchieveRatio"
            label="角色业绩比例（%）"
            min-width="120"
          >
            <template slot-scope="scope">
              <div v-if="suppContType">-</div>
              <div v-else>{{ scope.row.roleAchieveRatio }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="commFees"
            label="拆佣金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="commFeesRatio"
            label="拆佣比例（%）"
            min-width="150"
          >
            <template slot-scope="scope">
              <div v-if="suppContType">-</div>
              <div v-else>{{ scope.row.commFeesRatio }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="belongOrgName"
            label="店组"
            min-width="150"
          ></el-table-column>
        </el-table>

        <p class="p-title">分销费用</p>
        <el-table
          show-summary
          sum-text="合计"
          :data="infoForm.achieveDistriList"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <p>管理岗分配业绩</p>
              <el-table :data="scope.row.managerAchieveList" style="width: 600">
                <el-table-column prop="manager" label="管理岗" width="200">
                </el-table-column>
                <el-table-column
                  prop="achieveFees"
                  label="分配金额"
                  width="200"
                >
                </el-table-column>
                <el-table-column prop="ratio" label="金额比例" width="200">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="roleType" label="角色类型" min-width="120">
            <template slot-scope="scope">
              <div>{{ $root.dictAllName(scope.row.roleType, "DealRole") }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="roleAchieveCap"
            label="角色业绩上限"
            min-width="150"
          ></el-table-column>
          <el-table-column prop="rolerName" label="角色人" min-width="150">
            <template slot-scope="scope">
              <div>{{ scope.row.rolerName }}</div>
              <div>{{ scope.row.rolerPosition }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="corporateAchieve"
            label="角色人业绩"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="roleAchieveRatio"
            label="角色业绩比例（%）"
            min-width="120"
          >
            <template slot-scope="scope">
              <div v-if="suppContType">-</div>
              <div v-else>{{ scope.row.roleAchieveRatio }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="commFees"
            label="拆佣金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="commFeesRatio"
            label="拆佣比例（%）"
            min-width="150"
          >
            <template slot-scope="scope">
              <div v-if="suppContType">-</div>
              <div v-else>{{ scope.row.commFeesRatio }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="belongOrgName"
            label="店组"
            min-width="150"
          ></el-table-column>
        </el-table>
      </div>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>附件信息</span>
        <span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >查看来访/成交信息</el-button
          >
        </span>
      </div>
      <div>
        <el-row style="padding-left: 20px">
          <el-col>
            <el-table class="ih-table" :data="infoForm.documentLists">
              <el-table-column prop="fileType" label="类型" width="200">
                <template slot-scope="scope">
                  <div>
                    {{ $root.dictAllName(scope.row.code, "DealFileType") }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="fileName" label="附件" min-width="300">
                <template slot-scope="scope">
                  <IhUpload
                    :removePermi="false"
                    size="100px"
                    :editPermi="false"
                    :limit="scope.row.fileList.length"
                    v-model="scope.row.fileList"
                    :file-type="scope.row.code"
                    :upload-show="!!scope.row.fileList.length"
                  ></IhUpload>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <IhImgViews
      v-if="isShowImg"
      :url-list="srcList"
      :viewer-msg="srcData"
      :onClose="() => (isShowImg = false)"
    ></IhImgViews>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_deal_get__id } from "../../../../api/deal";
import { post_notice_customer_information } from "../../../../api/contract";
// import { get_invoice_getInvoiceInfo__businessCode } from "../../../../api/finance";
@Component({
  components: {},
})
export default class RealDealDetails extends Vue {
  infoForm: any = {
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
    invoiceList: [], // 发票信息
  };
  tableData: any = [];
  tableData2: any = [{}];
  fileList: any = [1, 2, 3, 4, 5, 6, 7, 8];
  srcList: any = [];
  srcData: any = [];
  companyKind: any = null;
  private isShowImg = false;

  pre(item: any) {
    console.log("pre");
    if (item.templateType === "ElectronicTemplate") {
      window.open(
        `/sales-api/sales-document-cover/file/browse/${item.templateId}`
      );
    } else {
      let imgList = item.noticeAttachmentList;
      this.srcList = imgList.map(
        (i: any) => `/sales-api/sales-document-cover/file/browse/${i.fileNo}`
      );
      this.srcData = imgList.map((v: any) => ({
        fileName: v.attachmentSuffix,
        preFileName: "优惠告知书",
      }));
      if (this.srcList.length) {
        this.isShowImg = true;
      } else {
        this.$message.warning("暂无图片");
      }
    }
  }
  async created() {
    if (this.$route.query.id) {
      let info: any = await get_deal_get__id({ id: this.$route.query.id });
      this.infoForm = {
        ...this.infoForm,
        ...info,
      };
      if (this.infoForm.agencyList && this.infoForm.agencyList.length > 0) {
        let companyKind = this.infoForm.agencyList[0].companyKind;
        this.companyKind = (this as any).$root.dictAllName(
          companyKind,
          "CompanyKind"
        );
      }

      await this.getInformation(info?.id, info?.parentId, info?.cycleId);
    }
  }
  // 根据成交id获取优惠告知书列表
  async getInformation(id: any = "", parentId: any = "", cycleId: any = "") {
    if (!id || !parentId || !cycleId) return;
    if (id !== parentId) {
      const idList: any = await post_notice_customer_information({
        dealId: id,
        cycleId: cycleId,
      });
      const parentIdList: any = await post_notice_customer_information({
        dealId: parentId,
        cycleId: cycleId,
      });
      // console.log('优惠告知书列表', list);
      this.$nextTick(() => {
        this.infoForm.offerNoticeList = [...idList, ...parentIdList];
      });
    } else {
      const list: any = await post_notice_customer_information({
        dealId: id,
        cycleId: cycleId,
      });
      // console.log('优惠告知书列表', list);
      if (list && list.length > 0) {
        this.infoForm.offerNoticeList = list;
      } else {
        this.infoForm.offerNoticeList = [];
      }
    }
    console.log(this.infoForm.offerNoticeList);
  }
}
</script>
<style lang="scss" scoped>
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
.Invalidation{
}
.WaitBeSigned{
  color: #F56C6C;
}
.BecomeEffective{
  color: #19BE6B;
}
</style>