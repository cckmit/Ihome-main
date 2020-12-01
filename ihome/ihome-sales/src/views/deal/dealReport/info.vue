<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 13:20:35
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-03 13:20:35
-->
<template>
  <ih-page class="text-right">
    <p class="ih-info-title">成交信息</p>
    <el-form
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm">
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
          <el-form-item label="细分业务模式">{{infoForm.contType}}</el-form-item>
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
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="物业类型">{{infoForm.houseList.propertyType}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="栋座">{{infoForm.houseList.buildingName}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">{{infoForm.houseList.roomNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房产证/预售合同编号">{{infoForm.houseList.propertyNo}}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="房产证地址">{{infoForm.houseList.address}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑面积">{{infoForm.houseList.area}}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="户型">
            <div class="home-type-wrapper">
              <div>{{infoForm.houseList.room}}室</div>
              <div>{{infoForm.houseList.hall}}厅</div>
              <div>{{infoForm.houseList.kitchen}}厨</div>
              <div>{{infoForm.houseList.toilet}}卫</div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="优惠告知书"></el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="" label-width="80px">
            <el-table
              class="ih-table"
              :data="infoList.offerNoticeList">
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
              <el-table-column fixed="right" label="操作" width="130">
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
          :data="infoList.customerList">
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
          :data="infoList.agencyList">
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
          :data="infoList.receiveList">
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
          :data="infoList.receiveAchieveList">
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
          :data="infoList.channelCommList">
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
          :data="infoList.achieveTotalBagList">
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
          <el-table-column prop="type" label="管理岗" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.SupervisorList.length > 0">
                <div v-for="list in scope.row.SupervisorList" :key="list.id">
                  <span>{{list.ratio}}%</span>
                  <span>{{list.manager}}({{list.managerPosition}})</span>
                </div>
              </div>
              <div v-else>暂无信息</div>
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
          :data="infoList.achieveDistriList">
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
          <el-table-column prop="type" label="管理岗" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.SupervisorList.length > 0">
                <div v-for="list in scope.row.SupervisorList" :key="list.id">
                  <span>{{list.ratio}}%</span>
                  <span>{{list.manager}}({{list.managerPosition}})</span>
                </div>
              </div>
              <div v-else>暂无信息</div>
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
          :data="infoList.documentList">
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
          :data="infoList">
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
      <el-button type="primary" @click="viewReviewDetails">查看审核详情</el-button>
    </div>
    <ih-dialog :show="reviewDialog" desc="成交审核记录">
      <ReviewDetailsDialog
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
  import {Component, Vue} from "vue-property-decorator";
  import ReviewDetailsDialog from "@/views/deal/dealReport/dialog/reviewDetailsDialog.vue";
  import {get_deal_get__id} from "@/api/deal";

  @Component({
    components: {ReviewDetailsDialog},
  })
  export default class DealReportInfo extends Vue {
    infoForm: any = {
      houseList: {},
      achieveTotalBagList: [], // 平台费用-总包
      achieveDistriList: [], // 平台费用-分销
    };
    infoList: any = [{}];
    reviewDialog: any = false;
    dealId: any = null;

    async created() {
      this.dealId = this.$route.query.id;
      if (this.dealId) {
        this.infoForm = await get_deal_get__id({id: this.dealId});
        // 处理平台费用中总包和分销的表格数据
        if (this.infoForm.achieveList && this.infoForm.achieveList.length > 0) {
          this.infoForm.achieveList.forEach((list: any) => {
            this.$set(list, "SupervisorList", []); // 主管
            this.$set(list, "ManagerList", []); // 经理
            this.$set(list, "DirectorList", []); // 总监
            if (list.managerAchieveList && list.managerAchieveList.length > 0) {
              list.managerAchieveList.forEach((mList: any) => {
                switch (mList.type) {
                  case "Supervisor":
                    list.SupervisorList.push(mList);
                    break;
                  case "Manager":
                    list.ManagerList.push(mList);
                    break;
                  case "Director":
                    list.DirectorList.push(mList);
                    break;
                }
              })
            }
            if (list.type === "TotalBag") {
              // 总包
              this.infoForm.achieveTotalBagList.push(list);
            } else if (list.type === "Distri") {
              // 分销
              this.infoForm.achieveDistriList.push(list);
            }
          })
        }
      }
    }

    // 计算收派金额总计
    getReceiveSummaries(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计金额';
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
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 计算对外拆佣合计
    getCommissionSummaries(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计';
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
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 计算平台费用-总包/分销合计
    getAchieveSummaries(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计';
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
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 预览
    preview(scope: any) {
      console.log('预览scope', scope);
    }

    // 查看审核详情
    viewReviewDetails() {
      console.log('查看审核详情');
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
