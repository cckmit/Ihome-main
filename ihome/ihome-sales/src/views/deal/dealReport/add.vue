<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-10-30 16:38:23
 * @LastEditors: lsj
 * @LastEditTime: 2020-10-30 16:38:23
-->
<template>
  <ih-page class="text-left">
    <el-form
      :model="postData"
      :rules="rules"
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm"
    >
      <p class="ih-info-title">成交信息</p>
      <el-row>
        <el-col
          :span="6"
          v-if="!!postData.dealCode"
        >
          <el-form-item
            label="成交报告编号"
            :prop="!!postData.dealCode ? 'dealCode' : ''"
          >
            <el-input
              disabled
              placeholder="成交报告编号"
              v-model="postData.dealCode"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="项目周期"
            prop="cycleId"
          >
            <el-input
              placeholder="请选择项目周期"
              readonly
              v-model="postData.cycleName"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click.native.prevent="selectProject"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="业务模式"
            prop="businessType"
          >
            <el-select
              v-model="postData.businessType"
              clearable
              @change="changeBusinessType"
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
          <el-form-item
            label="合同类型"
            prop="contType"
          >
            <div class="cont-type-wrapper">
              <div>
                <el-select
                  v-model="postData.contType"
                  clearable
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
              </div>
              <el-button
                @click="selectReport"
                v-if="postData.contType === 'DistriDeal'"
                type="primary"
                icon="el-icon-plus"
                size="small"
              >报备信息</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          v-if="postData.contType !== 'NaturalVisitDeal'"
        >
          <el-form-item label="渠道商">
            <el-input
              placeholder="请选择渠道商"
              readonly
              v-model="postData.channelName"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click.native.prevent="selectCompany"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="细分业务模式"
            prop="subdivisionType"
          >
            <el-select
              v-model="postData.subdivisionType"
              :disabled="['TotalBagModel', 'DistriModel'].includes(postData.businessType)"
              placeholder="细分业务模式"
              class="width--100"
            >
              <el-option
                label="总包"
                value="All"
              ></el-option>
              <el-option
                label="分销"
                value="District"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="一手代理团队"
            prop="oneAgentTeamId"
          >
            <el-select
              v-model="postData.oneAgentTeamId"
              clearable
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
          <el-form-item
            label="是否市场化项目"
            prop="isMarketProject"
          >
            <el-select
              v-model="postData.isMarketProject"
              clearable
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
          <el-form-item
            label="成交组织"
            prop="dealOrgId"
          >
            <el-input
              v-model="postData.dealOrgId"
              disabled
              placeholder="成交组织"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备案情况">
            <el-select
              v-model="postData.recordState"
              clearable
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
              clearable
              placeholder="明源房款回笼比例"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="数据标志"
            prop="dataSign"
          >
            <el-input
              v-model="postData.dataSign"
              readonly
              placeholder="数据标志"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分销协议编号">
            <el-select
              v-model="postData.contNo"
              clearable
              placeholder="分销协议编号"
              class="width--100"
            >
              <el-option
                label="A"
                value="Has"
              ></el-option>
              <el-option
                label="B"
                value="No"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="是否垫佣"
            prop="isMat"
          >
            <el-select
              v-model="postData.isMat"
              clearable
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
          <el-form-item
            label="成交阶段"
            prop="stage"
          >
            <el-select
              v-model="postData.stage"
              clearable
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
              clearable
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
              clearable
              placeholder="认购价格"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认购日期">
            <el-date-picker
              style="width: 100%"
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
              clearable
              placeholder="签约价格"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约日期">
            <el-date-picker
              style="width: 100%"
              v-model="postData.signDate"
              type="datetime"
              placeholder="签约日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          v-if="!!id"
        >
          <el-form-item
            label="录入日期"
            prop="entryDate"
          >
            <el-date-picker
              style="width: 100%"
              v-model="postData.entryDate"
              type="datetime"
              readonly
              placeholder="录入日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          v-if="!!id"
        >
          <el-form-item
            label="录入人"
            prop="entryPerson"
          >
            <el-input
              v-model="postData.entryPerson"
              readonly
              placeholder="录入人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          v-if="!!id"
        >
          <el-form-item
            label="成交状态"
            prop="status"
          >
            <el-input
              v-model="postData.status"
              disabled
              placeholder="成交状态"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现场销售">
            <el-input
              type="textarea"
              :rows="3"
              v-model="postData.remarks"
              placeholder="现场销售"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :rows="3"
              v-model="postData.remarks"
              placeholder="备注说明"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="ih-info-title">房产信息</p>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="物业类型"
            prop="propertyType"
          >
            <el-select
              v-model="postData.propertyType"
              clearable
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
            <el-input
              v-model="postData.buildingId"
              disabled
              placeholder="栋座"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">
            <el-input
              placeholder="请选择房号"
              readonly
              v-model="postData.roomNo"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click.native.prevent="selectRoom"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产证/预售合同编号">
            <el-input
              v-model="postData.propertyNo"
              clearable
              placeholder="房产证/预售合同编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房屋地址">
            <el-input
              v-model="postData.address"
              clearable
              placeholder="房屋地址"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="建筑面积"
            prop="area"
          >
            <el-input
              v-model="postData.area"
              clearable
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
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"
                  abel="描述文字"
                ></el-input-number>
                室
              </div>
              <div>
                <el-input-number
                  v-model="postData.hall"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"
                  abel="描述文字"
                ></el-input-number>
                厅
              </div>
              <div>
                <el-input-number
                  v-model="postData.kitchen"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"
                  abel="描述文字"
                ></el-input-number>
                厨
              </div>
              <div>
                <el-input-number
                  v-model="postData.toilet"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"
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
              :data="postData.offerNoticeVO"
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
    <p class="ih-info-title">客户信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div class="add-all-wrapper">
          <el-button
            type="success"
            @click="handleAddCustomer"
          >添加客户</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="postData.customerVO"
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
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.customerType"
                clearable
                placeholder="客户类型"
              >
                <el-option
                  v-for="item in $root.dictAllList('CommObjectType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="客户名称"
            min-width="120"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.customerName"
                clearable
                placeholder="客户名称"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="customerPhone"
            label="手机号码"
            min-width="120"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.customerPhone"
                clearable
                placeholder="手机号码"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="cardType"
            label="证件类型"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.cardType"
                clearable
                placeholder="证件类型"
              >
                <el-option
                  v-for="item in $root.dictAllList('CommObjectType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="cardNo"
            label="证件编号"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.cardNo"
                clearable
                placeholder="证件编号"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.email"
                clearable
                placeholder="邮箱"
              />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="deleteAdd(scope, 'customer')"
              >删除
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p
      class="ih-info-title"
      v-if="postData.contType !== 'NaturalVisitDeal'"
    >渠道信息</p>
    <el-row
      style="padding-left: 20px"
      v-if="postData.contType !== 'NaturalVisitDeal'"
    >
      <el-col>
        <div class="add-all-wrapper">
          <el-button
            type="success"
            @click="handleAddBroker"
          >添加渠道经纪人</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="postData.agencyVO"
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
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="deleteAdd(scope, 'broker')"
              >删除
              </el-link>
            </template>
          </el-table-column>
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
          :data="postData.receiveVO"
        >
          <el-table-column
            prop="type"
            label="类型"
            min-width="120"
          >
            <template slot-scope="scope">
              <div>{{scope.row.type === 'ServiceFee' ? '服务费' : '代理费'}}</div>
            </template>
          </el-table-column>
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
          :data="postData.receiveAchieveVO"
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
    <p class="ih-info-title">上传附件</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="postData.documentVO"
        >
          <el-table-column
            prop="name"
            label="类型"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="fileName"
            label="附件"
            min-width="120"
          >
            <template slot-scope="scope">
              <IhUpload
                :isCrop="false"
                :file-list.sync="scope.row.fileList"
                size="100px"
                :limit="5"
                :file-size="10"
                :isMove="false"
                @newFileList="getNewFile"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="text-center btn-top">
      <el-button @click="cancel()">取消</el-button>
      <el-button
        type="primary"
        @click="save()"
      >保存</el-button>
      <el-button
        type="success"
        @click="save()"
      >提交</el-button>
      <el-button
        v-if="![null, undefined, ''].includes(id)"
        type="warning"
        @click="confirmPerformance()"
      >确认业绩申报</el-button>
    </div>
    <ih-dialog
      :show="dialogAddProjectCycle"
      desc="选择项目周期列表"
    >
      <SelectProjectCycle
        :hasCheckedData="cycleCheckedData"
        @cancel="() => (dialogAddProjectCycle = false)"
        @finish="
            (data) => {
              dialogAddProjectCycle = false;
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog
      :show="dialogAddAgentCompany"
      desc="选择渠道商列表"
    >
      <AgentCompanyList
        :hasCheckedData="companyCheckedData"
        @cancel="() => (dialogAddAgentCompany = false)"
        @finish="
            (data) => {
              dialogAddAgentCompany = false;
              finishAddAgentCompany(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog
      :show="dialogAddReportInfo"
      desc="选择已成交报备信息列表"
    >
      <SelectReportInfo
        :hasCheckedData="reportCheckedData"
        @cancel="() => (dialogAddReportInfo = false)"
        @finish="
            (data) => {
              dialogAddReportInfo = false;
              finishAddReportInfo(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog
      :show="dialogAddRoom"
      desc="选择房号列表"
    >
      <SelectRoom
        @cancel="() => (dialogAddRoom = false)"
        @finish="
            (data) => {
              dialogAddRoom = false;
              finishAddRoom(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog
      :show="dialogAddCustomer"
      desc="选择客户列表"
    >
      <AddCustomer
        @cancel="() => (dialogAddCustomer = false)"
        @finish="
            (data) => {
              dialogAddCustomer = false;
              finishAddCustomer(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog
      :show="dialogAddBroker"
      desc="选择渠道经纪人列表"
    >
      <AddBroker
        @cancel="() => (dialogAddBroker = false)"
        @finish="
            (data) => {
              dialogAddBroker = false;
              finishAddBroker(data);
            }
          "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectProjectCycle from "@/views/deal/dealReport/dialog/selectProjectCycle.vue";
import SelectReportInfo from "@/views/deal/dealReport/dialog/selectReportInfo.vue";
import AgentCompanyList from "@/views/deal/dealReport/dialog/agentCompanyList.vue";
import SelectRoom from "@/views/deal/dealReport/dialog/selectRoom.vue";
import AddCustomer from "@/views/deal/dealReport/dialog/addCustomer.vue";
import AddBroker from "@/views/deal/dealReport/dialog/addBroker.vue";
import {
  post_achieveScaleScheme_add,
  get_achieveScaleScheme_get__id,
  post_achieveScaleScheme_update,
} from "@/api/deal";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";

@Component({
  components: {
    AddCustomer,
    AddBroker,
    SelectProjectCycle,
    SelectRoom,
    AgentCompanyList,
    SelectReportInfo,
  },
})
export default class DealReportAdd extends Vue {
  postData: any = {
    dealCode: null,
    cycleId: null,
    cycleName: null,
    businessType: null,
    contType: null,
    subdivisionType: null,
    channelId: null,
    channelName: null,
    oneAgentTeamId: null,
    isMarketProject: null,
    dealOrgId: null,
    recordState: null,
    returnRatio: null,
    dataSign: null,
    contNo: null,
    isMat: null,
    stage: null,
    signType: null,
    subscribePrice: null,
    subscribeDate: null,
    signPrice: null,
    signDate: null,
    entryDate: null,
    entryPerson: null,
    status: null,
    remarks: null,
    propertyType: null,
    buildingId: null,
    roomNo: null,
    propertyNo: null,
    address: null,
    area: null,
    room: null,
    hall: null,
    kitchen: null,
    toilet: null,
    offerNoticeVO: [], // 优惠告知书
    customerVO: [], // 客户信息
    agencyVO: [], // 渠道信息
    receiveVO: [], // 收派金额
    receiveAchieveVO: [], // 应收信息
    documentVO: [], // 附件信息
  };
  DealDataFlag: any = []; // 数据来源
  rules: any = {
    dealCode: [
      { required: true, message: "成交报告编号不能为空", trigger: "change" },
    ],
    cycleId: [{ required: true, message: "项目周期必选", trigger: "change" }],
    businessType: [
      { required: true, message: "业务模式必选", trigger: "change" },
    ],
    contType: [{ required: true, message: "合同类型必选", trigger: "change" }],
    subdivisionType: [
      { required: true, message: "细分模式必选", trigger: "blur" },
    ],
    oneAgentTeamId: [
      { required: true, message: "一手代理团队必选", trigger: "change" },
    ],
    isMarketProject: [
      { required: true, message: "是否市场化项目必选", trigger: "change" },
    ],
    dealOrgId: [{ required: true, message: "成交组织必选", trigger: "change" }],
    dataSign: [
      { required: true, message: "数据标志不能为空", trigger: "change" },
    ],
    isMat: [{ required: true, message: "是否垫佣必选", trigger: "change" }],
    stage: [{ required: true, message: "成交阶段必选", trigger: "change" }],
    entryDate: [{ required: true, message: "录入日期必选", trigger: "change" }],
    entryPerson: [
      { required: true, message: "录入人不能为空", trigger: "change" },
    ],
    status: [{ required: true, message: "成交状态必填", trigger: "change" }],
    propertyType: [
      { required: true, message: "物业类型必选", trigger: "change" },
    ],
    area: [{ required: true, message: "建筑面积必填", trigger: "change" }],
  };
  id: any = null;
  dialogAddRoom: any = false;
  dialogAddCustomer: any = false;
  dialogAddBroker: any = false;
  dialogAddProjectCycle: any = false;
  cycleCheckedData: any = [];
  dialogAddReportInfo: any = false;
  reportCheckedData: any = [];
  dialogAddAgentCompany: any = false;
  companyCheckedData: any = [];

  async created() {
    this.DealDataFlag = (this as any).$root.dictAllList("DealDataFlag"); // 数据来源
    this.postData.documentVO = (this as any).$root.dictAllList("DealFileType"); // 附件类型
    // 附件类型增加key
    if (this.postData.documentVO.length > 0) {
      this.postData.documentVO.forEach((vo: any) => {
        vo.fileList = [];
      });
    }
    this.id = this.$route.query.id;
    if (this.id) {
      const res: any = await get_achieveScaleScheme_get__id({ id: this.id });
      this.postData = res;
    } else {
      // 录入日期
      this.postData.entryDate = new Date();
    }
  }

  // 修改业务模式逻辑
  changeBusinessType(value: any) {
    // console.log(value);
    switch (value) {
      case "TotalBagModel":
        // 总包
        this.postData.subdivisionType = "All";
        break;
      case "DistriModel":
        // 分销
        this.postData.subdivisionType = "District";
        break;
      case "TotalBagDistriModel":
        // 总包+分销
        this.postData.subdivisionType = "";
        break;
      default:
        this.postData.subdivisionType = "";
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

  // 选择项目周期
  selectProject() {
    this.dialogAddProjectCycle = true;
    // input失焦
    // (this as any).$refs.inputCycle && (this as any).$refs.inputCycle.blur();
  }

  // 确定选择项目周期
  async finishAddProjectCycle(data: any) {
    console.log("data", data);
    if (data && data.length > 0) {
      this.postData.cycleName = data[0].termName;
      this.postData.cycleId = data[0].termId;
      this.cycleCheckedData = [...data];
    }
  }

  // 选择已成交的报备信息-分销成交模式下
  selectReport() {
    this.dialogAddReportInfo = true;
    // input失焦
    // (this as any).$refs.inputCompany && (this as any).$refs.inputCompany.blur();
  }

  // 确定选择已成交的报备信息-分销成交模式下
  finishAddReportInfo(data: any) {
    // console.log('data', data);
    if (data && data.length > 0) {
      this.postData.channelName = data[0].name;
      this.postData.channelId = data[0].id;
      this.reportCheckedData = [...data];
    }
  }

  // 选择渠道商
  selectCompany() {
    this.dialogAddAgentCompany = true;
    // input失焦
    // (this as any).$refs.inputCompany && (this as any).$refs.inputCompany.blur();
  }

  // 确定选择渠道商
  finishAddAgentCompany(data: any) {
    // console.log('data', data);
    if (data && data.length > 0) {
      this.postData.channelName = data[0].name;
      this.postData.channelId = data[0].id;
      this.companyCheckedData = [...data];
    }
  }

  // 选择房号
  selectRoom() {
    // 分销成交模式下不能选择房号，房号是不可编辑的
    if (this.postData.contType === "DistriDeal") return;
    this.dialogAddRoom = true;
    // input失焦
    // (this as any).$refs.inputRoom && (this as any).$refs.inputRoom.blur();
  }

  // 确定选择房号
  async finishAddRoom(data: any) {
    console.log("data", data);
    // this.addTotalPackageList = data;
  }

  // 预览-优惠告知书
  preview(scope: any) {
    console.log(scope);
  }

  // 添加客户
  handleAddCustomer() {
    this.dialogAddCustomer = true;
  }

  // 添加渠道经纪人
  handleAddBroker() {
    this.dialogAddBroker = true;
  }

  // 确定选择客户
  async finishAddCustomer(data: any) {
    console.log("data", data);
    // this.addTotalPackageList = data;
  }

  // 确定选择渠道经纪人
  async finishAddBroker(data: any) {
    console.log("data", data);
    // this.addTotalPackageList = data;
  }

  // 删除客户/渠道经纪人
  async deleteAdd(scope: any, type: any) {
    console.log(scope);
    console.log(type);
    if (type === "customer") {
      // 删除客户信息逻辑
      console.log(111);
    } else if (type === "broker") {
      // 删除渠道经纪人逻辑
      console.log(222);
    }
  }

  getNewFile(val: any) {
    console.log(val);
  }

  // 取消
  async cancel() {
    this.$goto({
      path: "/dealReport/list",
    });
  }

  // 保存
  async save() {
    (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
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

  // 确认业绩申报
  confirmPerformance() {
    console.log("确认业绩申报");
    this.$router.push({
      path: "/dealReport/achieveAllotEntry",
      query: { id: this.id },
    });
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

.input-select-wrapper {
  cursor: pointer;

  /deep/ .el-input__inner {
    cursor: pointer;
  }
}

.cont-type-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    flex: 1;
  }
}
</style>
