<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-11 08:48:35
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-10 11:40:30
-->
<template>
  <ih-page class="text-left">
    <div>
      <p class="ih-info-title">成交信息</p>
      <el-form
        :model="postData"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="成交报告编号">
              <div>{{postData.dealCode}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目周期">
              <div>{{postData.contType}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务模式">
              <div>{{postData.businessType}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同类型">
              <div>{{postData.contType}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道商">
              <div>{{postData.businessType}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="细分业务模式">
              <div>{{postData.businessType}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="一手代理团队">
              <div>{{postData.oneAgentTeamId}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否市场化项目">
              <div>{{postData.isMarketProject}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交组织">
              <div>{{postData.dealOrgId}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备案情况">
              <div>{{postData.recordState}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="明源房款回笼比例">
              <div>{{postData.returnRatio}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据标志">
              <div>{{postData.dataSign}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分销协议编号">
              <div>{{postData.recordState}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否垫佣">
              <div>{{postData.isMat}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否代销">
              <div>{{postData.isMat}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约类型">
              <div>{{postData.signType}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="认购价格">
              <div>{{postData.subscribePrice}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="认购日期">
              <div>{{postData.subscribeDate}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约价格">
              <div>{{postData.signPrice}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约日期">
              <div>{{postData.signDate}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入日期">
              <div>{{postData.entryDate}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <div>{{postData.entryPerson}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交阶段">
              <div>{{postData.stage}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交状态">
              <div>{{postData.status}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注">
              <div>{{postData.remarks}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现场销售">
              <div>{{postData.entryPerson}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩分配人">
              <div>{{postData.entryPerson}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩分配日期">
              <div>{{postData.entryPerson}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计算方式">
              <div>{{postData.entryPerson}}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <p class="ih-info-title">房产信息</p>
      <el-form
        :model="postData"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="物业类型">
              <div>{{postData.propertyType}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="栋座">
              <div>{{postData.buildingId}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房号">
              <div>{{postData.roomNo}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房产证/预售合同编号">
              <div>{{postData.propertyNo}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房产证地址">
              <div>{{postData.address}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑面积">
              <div>{{postData.area}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="户型">
              <div class="home-type-wrapper">
                <div>{{postData.room}}室</div>
                <div>{{postData.hall}}厅</div>
                <div>{{postData.kitchen}}厨</div>
                <div>{{postData.toilet}}卫</div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <p class="ih-info-title">优惠告知书信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoList">
            <el-table-column prop="offerNoticeName" label="名称" min-width="120"></el-table-column>
            <el-table-column prop="offerNoticeCode" label="优惠告知书编号" min-width="120"></el-table-column>
            <el-table-column prop="offerNoticeStatus" label="优惠告知书状态" min-width="120"></el-table-column>
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
        </el-col>
      </el-row>
    </div>
    <div>
      <p class="ih-info-title">客户信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoList">
            <el-table-column prop="customerNo" label="客户编号" min-width="120"></el-table-column>
            <el-table-column prop="customerType" label="客户类型" min-width="120"></el-table-column>
            <el-table-column prop="customerName" label="客户名称" min-width="120"></el-table-column>
            <el-table-column prop="customerPhone" label="手机号码" min-width="120"></el-table-column>
            <el-table-column prop="cardType" label="证件类型" min-width="150"></el-table-column>
            <el-table-column prop="cardNo" label="证件编号" min-width="150"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="150"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div>
      <p class="ih-info-title">渠道信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoList">
            <el-table-column prop="agencyName" label="渠道公司名称" min-width="120"></el-table-column>
            <el-table-column prop="channelLevel" label="渠道等级" min-width="120"></el-table-column>
            <el-table-column prop="broker" label="经纪人" min-width="120"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div>
      <p class="ih-info-title">收派金额</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getReceiveSummaries"
            :data="infoList">
            <el-table-column prop="type" label="类型" min-width="120"></el-table-column>
            <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120"></el-table-column>
            <el-table-column prop="packageId" label="收派套餐" min-width="120"></el-table-column>
            <el-table-column prop="receiveAmount" label="应收金额" min-width="120"></el-table-column>
            <el-table-column prop="commAmount" label="派发佣金金额" min-width="150"></el-table-column>
            <el-table-column prop="rewardAmount" label="派发内场奖励金额" min-width="150"></el-table-column>
            <el-table-column prop="totalPackageAmount" label="总包业绩金额" min-width="150"></el-table-column>
            <el-table-column prop="distributionAmount" label="分销业绩金额" min-width="150"></el-table-column>
            <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="padding-left: 20px; margin-top: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoList">
            <el-table-column prop="receiveAmount" label="本单应收" min-width="120"></el-table-column>
            <el-table-column prop="achieveAmount" label="本单业绩" min-width="120"></el-table-column>
            <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div>
      <p class="ih-info-title">对外拆佣</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getCommissionSummaries"
            :data="postData.commissionInfoList">
            <el-table-column prop="target" label="拆佣对象" min-width="120">
              <template slot-scope="scope">
                <el-select v-model="scope.row.target" placeholder="请选择">
                  <el-option label="公司" value="Company"></el-option>
                  <el-option label="个人" value="Personal"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="commName" label="拆佣名称" min-width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.commName" placeholder="拆佣名称"/>
              </template>
            </el-table-column>
            <el-table-column prop="feeType" label="费用类型" min-width="120">
              <template slot-scope="scope">
                <el-select v-model="scope.row.feeType" placeholder="请选择">
                  <el-option label="代理费" value="AgencyFee"></el-option>
                  <el-option label="服务费" value="ServiceFee"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="payee" label="费用来源(客户/甲方)" min-width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.payee" clearable placeholder="收款方"/>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额" min-width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.amount" clearable placeholder="金额"/>
              </template>
            </el-table-column>
            <el-table-column prop="remarks" label="备注" min-width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remarks" clearable placeholder="备注"/>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div>
      <p class="ih-info-title">平台费用</p>
      <div class="ih-type-wrapper">
        <div class="title">总包</div>
      </div>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getAchieveSummaries"
            :data="postData.achieveTotalBagList">
            <el-table-column prop="roleType" label="角色类型" min-width="120"></el-table-column>
            <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="120"></el-table-column>
            <el-table-column prop="corporateAchieve" label="公司业绩" min-width="120"></el-table-column>
            <el-table-column prop="corporateAchieveRatio" label="角色业绩比例（%）" min-width="120"></el-table-column>
            <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
            <el-table-column prop="commFeesRatio" label="拆佣比例（%）" min-width="150"></el-table-column>
            <el-table-column prop="rolerName" label="角色人" min-width="150"></el-table-column>
            <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
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
      <div class="ih-type-wrapper">
        <div class="title">分销</div>
      </div>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getAchieveSummaries"
            :data="postData.achieveDistriList">
            <el-table-column prop="roleType" label="角色类型" min-width="120"></el-table-column>
            <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="120"></el-table-column>
            <el-table-column prop="corporateAchieve" label="公司业绩" min-width="120"></el-table-column>
            <el-table-column prop="corporateAchieveRatio" label="角色业绩比例（%）" min-width="120"></el-table-column>
            <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
            <el-table-column prop="commFeesRatio" label="拆佣比例（%）" min-width="150"></el-table-column>
            <el-table-column prop="rolerName" label="角色人" min-width="150"></el-table-column>
            <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
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
    </div>
    <div>
      <p class="ih-info-title">上传附件</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoList">
            <el-table-column prop="fileType" label="类型" min-width="120"
            ></el-table-column>
            <el-table-column prop="fileName" label="附件" min-width="120"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="audit-info-wrapper">
      <p class="ih-info-title">审核意见</p>
      <el-form
        :model="postData"
        :rules="rules"
        ref="ruleForm"
        label-width="20px"
        class="demo-ruleForm">
        <el-row class="audit-info">
          <el-col :span="12">
            <el-form-item label="">
              <el-input
                type="textarea"
                :rows="3"
                v-model="postData.remarks"
                placeholder="请输入审核意见"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="">
              <el-button type="primary" @click="handleViewReviewDetail">查看审核详情</el-button>
              <el-button type="primary" @click="handleViewInfoDetail">查看原成交详情</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="text-center btn-top">
      <el-button @click="handleBack()">取消</el-button>
      <el-button type="danger" @click="handleFail()">驳回</el-button>
      <el-button type="success" @click="handlePass()">通过</el-button>
    </div>
    <ih-dialog :show="dialogReviewDeal" desc="成交审核记录">
      <ReviewDetailsDialog
        :data="reviewData"
        @cancel="() => (dialogReviewDeal = false)"
        @finish="() => {dialogReviewDeal = false;}"
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ReviewDetailsDialog from "@/views/deal/dealReport/dialog/reviewDetailsDialog.vue";

  import {
    post_achieveScaleScheme_add,
    get_achieveScaleScheme_get__id,
    post_achieveScaleScheme_update
  } from "@/api/deal";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {ReviewDetailsDialog},
  })
  export default class ReviewDealInfo extends Vue {
    postData: any = {
      modelName: null,
      contType: null,
      isMarketProject: null,
      isSame: null,
      achievePropertyTypeList: [],
      achieveProjectList: [],
      remarks: null,
      buModelContTypeList: [],
      commissionInfoList: [],
      achieveTotalBagList: [],
      achieveDistriList: [],
    };
    infoList: any = [];
    rules: any = {
      modelName: [
        {required: true, message: "业务模式必选", trigger: "change"},
      ],
      buModelContTypeList: [
        {required: true, message: "合同类型必选", trigger: "change"},
      ]
    };
    id: any = null;
    changeType: any = null; // 改变成交信息的类型
    dialogReviewDeal: any = false; // 成交审核记录弹窗标识
    reviewData: any = null;

    async created() {
      this.id = this.$route.query.id;
      this.changeType = this.$route.query.type;
      // console.log('changeType', this.changeType);
      if (this.id) {
        const res: any = await get_achieveScaleScheme_get__id({id: this.id});
        this.postData = res;
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

    // 预览-优惠告知书
    preview(scope: any) {
      console.log(scope);
    }

    // 查看审核记录
    handleViewReviewDetail() {
      this.dialogReviewDeal = true;
      this.reviewData = {
        title: 'main'
      }
    }

    // 查看原成交详情
    handleViewInfoDetail() {
      this.$router.push({
        path: "/dealReport/info"
      });
    }

    // 通过
    handlePass() {
      console.log('通过');
    }

    // 驳回
    handleFail() {
      console.log('驳回');
      (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
    }

    // 返回
    async handleBack() {
      this.$goto({
        path: "/dealReport/list",
      });
    }

    @NoRepeatHttp()
    async addSave(valid: any) {
      if (valid) {
        if (this.id) {
          let postData: any = {
            id: this.id,
            modelName: this.postData.modelName,
            buModelContTypeList: []
          };
          if (this.postData.buModelContTypeList.length > 0) {
            this.postData.buModelContTypeList.forEach((list: any) => {
              postData.buModelContTypeList.push(
                {
                  contType: list
                }
              )
            })
          }
          await post_achieveScaleScheme_update(postData);
          this.$message.success("编辑成功");
          this.$goto({
            path: "/dealReport/list",
          });
        } else {
          let postData: any = {
            modelName: this.postData.modelName,
            buModelContTypeList: []
          };
          if (this.postData.buModelContTypeList.length > 0) {
            this.postData.buModelContTypeList.forEach((list: any) => {
              postData.buModelContTypeList.push(
                {
                  contType: list
                }
              )
            })
          }
          await post_achieveScaleScheme_add(postData);
          this.$message.success("新增成功");
          this.$goto({
            path: "/dealReport/list",
          });
        }
      } else {
        this.$message.warning("请先填好数据再保存");
        return false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .add-all-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .home-type-wrapper {
    width: 100%;
    display: flex;

    div {
      flex: 1;
      text-align: center;

      /deep/ .el-input-number {
        box-sizing: border-box;
        margin-right: 5px;
      }
    }
  }

  .btn-top {
    box-sizing: border-box;
    margin-top: 20px;
  }

  .ih-type-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    margin: 15px 0px;
    text-align: left;
    display: flex;
    align-items: center;

    .title {
      margin-right: 20px;
      box-sizing: border-box;
      border-left: 5px solid #F90;
      padding-left: 5px;
      color: #f90;
      margin-left: 20px;
    }
  }

  .audit-info-wrapper {
    box-sizing: border-box;
    margin-top: 20px;

    .audit-info {
      display: flex;
      align-items: center;
    }
  }
</style>
