<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-10 15:48:11
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-11 08:47:51
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
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="成交报告编号">
              <el-input
                disabled
                placeholder="成交报告编号"
                v-model="postData.dealCode"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目周期">
              <el-input
                disabled
                placeholder="项目周期"
                v-model="postData.contType"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同类型">
              <el-select
                v-model="postData.contType"
                disabled
                placeholder="请选择合同类型"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ContType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务模式">
              <el-select
                v-model="postData.businessType"
                disabled
                placeholder="业务模式"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('BusinessModel')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="成交渠道等级">
              <el-select
                v-model="postData.channelLevel"
                disabled
                placeholder="成交渠道等级"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('DealChannelLevel')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="成交状态">
              <el-input
                v-model="postData.status"
                disabled
                placeholder="成交状态"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否垫佣">
              <el-select
                v-model="postData.isMat"
                disabled
                placeholder="是否垫佣"
                class="width--100"
              >
                <el-option
                  label="是"
                  value="yes"
                ></el-option>
                <el-option
                  label="否"
                  value="no"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="一手代理团队">
              <el-select
                v-model="postData.oneAgentTeamId"
                disabled
                placeholder="一手代理团队"
                class="width--100"
              >
                <el-option
                  label="是"
                  value="yes"
                ></el-option>
                <el-option
                  label="否"
                  value="no"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否市场化项目">
              <el-select
                v-model="postData.isMarketProject"
                disabled
                placeholder="请选择是否市场化项目"
                class="width--100"
              >
                <el-option
                  label="是"
                  value="yes"
                ></el-option>
                <el-option
                  label="否"
                  value="no"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备案情况">
              <el-select
                v-model="postData.recordState"
                disabled
                placeholder="备案情况"
                class="width--100"
              >
                <el-option
                  label="有"
                  value="Has"
                ></el-option>
                <el-option
                  label="无"
                  value="No"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="明源房款回笼比例">
              <el-input
                v-model="postData.returnRatio"
                disabled
                placeholder="明源房款回笼比例"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="数据标志">
              <el-input
                v-model="postData.dataSign"
                disabled
                placeholder="数据标志"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="成交组织">
              <el-input
                v-model="postData.dealOrgId"
                disabled
                placeholder="成交组织"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同编号">
              <el-input
                v-model="postData.contNo"
                disabled
                placeholder="合同编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="成交阶段">
              <el-select
                v-model="postData.stage"
                disabled
                placeholder="成交阶段"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('DealStage')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="签约类型">
              <el-select
                v-model="postData.signType"
                disabled
                placeholder="签约类型"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('SignUp')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="认购价格">
              <el-input
                v-model="postData.subscribePrice"
                disabled
                placeholder="认购价格"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="认购日期">
              <el-date-picker
                style="width: 100%"
                disabled
                v-model="postData.subscribeDate"
                type="datetime"
                placeholder="认购日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="签约价格">
              <el-input
                v-model="postData.signPrice"
                disabled
                placeholder="签约价格"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="签约日期">
              <el-date-picker
                style="width: 100%"
                disabled
                v-model="postData.signDate"
                type="datetime"
                placeholder="签约日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="录入人">
              <el-input
                v-model="postData.entryPerson"
                disabled
                placeholder="录入人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="录入日期">
              <el-date-picker
                style="width: 100%"
                disabled
                v-model="postData.entryDate"
                type="datetime"
                placeholder="录入日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                disabled
                type="textarea"
                :rows="3"
                v-model="postData.remarks"
                placeholder="请输入备注说明"
              ></el-input>
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
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="物业类型">
              <el-select
                v-model="postData.propertyType"
                disabled
                placeholder="物业类型"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('Property')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="栋座">
              <el-select
                v-model="postData.buildingId"
                disabled
                placeholder="栋座"
                class="width--100"
              >
                <el-option
                  v-for="item in modelContType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房号">
              <el-select
                v-model="postData.roomNo"
                disabled
                placeholder="房号"
                class="width--100"
              >
                <el-option
                  v-for="item in modelContType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房产证/预售合同编号">
              <el-input
                v-model="postData.propertyNo"
                disabled
                placeholder="房产证/预售合同编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋地址">
              <el-input
                v-model="postData.address"
                disabled
                placeholder="房屋地址"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑面积">
              <el-input
                v-model="postData.area"
                disabled
                placeholder="建筑面积"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="户型">
              <div class="home-type-wrapper">
                <div>
                  <el-input-number
                    v-model="postData.room"
                    disabled
                    :min="0"
                    :step="1"
                    size="small"
                    :step-strictly="true"
                    :controls="false"
                    abel="描述文字"
                  ></el-input-number>
                  室
                </div>
                <div>
                  <el-input-number
                    v-model="postData.hall"
                    disabled
                    :min="0"
                    :step="1"
                    size="small"
                    :step-strictly="true"
                    :controls="false"
                    abel="描述文字"
                  ></el-input-number>
                  厅
                </div>
                <div>
                  <el-input-number
                    v-model="postData.kitchen"
                    disabled
                    :min="0"
                    :step="1"
                    size="small"
                    :step-strictly="true"
                    :controls="false"
                    abel="描述文字"
                  ></el-input-number>
                  厨
                </div>
                <div>
                  <el-input-number
                    v-model="postData.toilet"
                    disabled
                    :min="0"
                    :step="1"
                    size="small"
                    :step-strictly="true"
                    :controls="false"
                    abel="描述文字"
                  ></el-input-number>
                  卫
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="优惠告知书"></el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label=""
              label-width="80px"
            >
              <el-table
                class="ih-table"
                :data="infoList"
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
                  width="100"
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
    </div>
    <div>
      <p class="ih-info-title">客户信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoList"
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
    </div>
    <div>
      <p class="ih-info-title">渠道信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoList"
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
            :data="infoList"
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
            :data="infoList"
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
            :data="postData.commissionInfoList"
          >
            <el-table-column
              prop="target"
              label="拆佣对象"
              min-width="120"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.target"
                  placeholder="请选择"
                >
                  <el-option
                    label="公司"
                    value="Company"
                  ></el-option>
                  <el-option
                    label="个人"
                    value="Personal"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="commName"
              label="拆佣名称"
              min-width="120"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.commName"
                  placeholder="拆佣名称"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="payee"
              label="收款方"
              min-width="120"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.payee"
                  clearable
                  placeholder="收款方"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="feeType"
              label="费用类型"
              min-width="120"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.feeType"
                  placeholder="请选择"
                >
                  <el-option
                    label="代理费"
                    value="AgencyFee"
                  ></el-option>
                  <el-option
                    label="服务费"
                    value="ServiceFee"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              label="金额"
              min-width="120"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.amount"
                  clearable
                  placeholder="金额"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="partyACustomer"
              label="客户/甲方"
              min-width="120"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.partyACustomer"
                  placeholder="请选择"
                >
                  <el-option
                    label="客户A"
                    value="AA"
                  ></el-option>
                  <el-option
                    label="客户B"
                    value="BB"
                  ></el-option>
                  <el-option
                    label="甲方A"
                    value="CC"
                  ></el-option>
                  <el-option
                    label="甲方B"
                    value="DD"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              min-width="120"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.remarks"
                  clearable
                  placeholder="备注"
                />
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
            :data="postData.achieveTotalBagList"
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
                <div v-if="scope.row.SupervisorList.length > 0">
                  <div
                    v-for="list in scope.row.SupervisorList"
                    :key="list.id"
                  >
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
            :data="postData.achieveDistriList"
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
                <div v-if="scope.row.SupervisorList.length > 0">
                  <div
                    v-for="list in scope.row.SupervisorList"
                    :key="list.id"
                  >
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
            :data="infoList"
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
    </div>
    <div class="text-center btn-top">
      <el-button @click="handleCancel()">取消</el-button>
      <el-button
        type="primary"
        @click="handleSave()"
      >保存</el-button>
      <el-button
        type="success"
        @click="handleSubmit()"
      >提交</el-button>
    </div>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  post_achieveScaleScheme_add,
  get_achieveScaleScheme_get__id,
  post_achieveScaleScheme_update,
} from "@/api/deal";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";

@Component({
  components: {},
})
export default class PreviewDealInfo extends Vue {
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
    modelName: [{ required: true, message: "业务模式必选", trigger: "change" }],
    buModelContTypeList: [
      { required: true, message: "合同类型必选", trigger: "change" },
    ],
  };
  modelContType: any = [
    {
      value: "SelfDeal",
      label: "自行成交",
    },
    {
      value: "DistriDeal",
      label: "分销成交",
    },
    {
      value: "NaturalVisitDeal",
      label: "自然来访成交",
    },
    {
      value: "SelfChannelDeal",
      label: "自渠成交",
    },
  ];
  id: any = null;
  changeType: any = null; // 改变成交信息的类型

  async created() {
    this.id = this.$route.query.id;
    this.changeType = this.$route.query.type;
    // console.log('changeType', this.changeType);
    if (this.id) {
      const res: any = await get_achieveScaleScheme_get__id({ id: this.id });
      this.postData = res;
    }
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

  // 预览-优惠告知书
  preview(scope: any) {
    console.log(scope);
  }

  // 保存
  handleSave() {
    console.log("保存");
  }

  // 提交
  handleSubmit() {
    console.log("提交");
    (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
  }

  // 取消
  async handleCancel() {
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
          buModelContTypeList: [],
        };
        if (this.postData.buModelContTypeList.length > 0) {
          this.postData.buModelContTypeList.forEach((list: any) => {
            postData.buModelContTypeList.push({
              contType: list,
            });
          });
        }
        await post_achieveScaleScheme_update(postData);
        this.$message.success("编辑成功");
        this.$goto({
          path: "/dealReport/list",
        });
      } else {
        let postData: any = {
          modelName: this.postData.modelName,
          buModelContTypeList: [],
        };
        if (this.postData.buModelContTypeList.length > 0) {
          this.postData.buModelContTypeList.forEach((list: any) => {
            postData.buModelContTypeList.push({
              contType: list,
            });
          });
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
  }
}
</style>
