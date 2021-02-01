<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 13:20:35
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-21 19:25:33
-->
<template>
  <ih-page class="text-left">
    <div v-if="changeType !== 'ChangeInternalAchieveInf'">
      <p id="anchor-1" class="ih-info-title">成交信息</p>
      <el-form
        @submit.native.prevent
        :model="infoForm"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm">
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="成交报告编号">{{infoForm.dealCode}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目周期">{{infoForm.projectCycle}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务模式">
              {{$root.dictAllName(infoForm.modelCode, 'BusinessModel')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="细分业务模式">
              {{$root.dictAllName(infoForm.refineModel, 'Subdivide')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否代销">
              {{$root.dictAllName(infoForm.isConsign, 'YesOrNoType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否市场化项目">
              {{$root.dictAllName(infoForm.isMarketProject, 'YesOrNoType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="一手代理公司">{{infoForm.oneAgentTeam}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交阶段">
              {{$root.dictAllName(infoForm.stage, 'DealStage')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物业类型">
              {{$root.dictAllName(infoForm.propertyType, 'Property')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="栋座">{{infoForm.buildingName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房号">{{infoForm.roomNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同类型">
              {{$root.dictAllName(infoForm.contType, 'ContType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="infoForm.contType === 'DistriDeal'">
            <el-form-item label="渠道公司">
              {{infoForm.agencyList && infoForm.agencyList.length ? infoForm.agencyList[0].agencyName : ''}}
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="infoForm.contType === 'DistriDeal'">
            <el-form-item label="渠道等级">
              {{infoForm.agencyList && infoForm.agencyList.length ? $root.dictAllName(infoForm.agencyList[0].channelLevel, 'ChannelLevel') : ''}}
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="infoForm.contType === 'DistriDeal'">
            <el-form-item label="经纪人">
              {{infoForm.agencyList && infoForm.agencyList.length ? infoForm.agencyList[0].broker : ''}}
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="infoForm.contType === 'DistriDeal'">
            <el-form-item label="分销协议编号">
              <div class="contNo-wrapper">
                <div class="contNo">{{infoForm.contNo}}</div>
                <div v-if="infoForm.contNo">
                  <el-link type="primary">详情</el-link>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="infoForm.contType === 'DistriDeal'">
            <el-form-item label="是否垫佣">
              {{$root.dictAllName(infoForm.isMat, 'YesOrNoType')}}
            </el-form-item>
          </el-col>
<!--          <el-col :span="8" v-if="infoForm.contType === 'DistriDeal'">-->
<!--            <el-form-item label="报备信息">{{infoForm.recordStr}}</el-form-item>-->
<!--          </el-col>-->
          <el-col :span="8">
            <el-form-item label="备案情况">
              {{$root.dictAllName(infoForm.recordState, 'HasOrNoType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑面积">{{infoForm.area}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="户型">
              <div class="home-type-wrapper">
                <div>{{infoForm.house.room}}室</div>
                <div>{{infoForm.house.hall}}厅</div>
                <div>{{infoForm.house.toilet}}卫</div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房产证/预售合同编号">{{infoForm.propertyNo}}</el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="房产证地址">{{infoForm.address}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现场销售">{{infoForm.sceneSales}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约类型">
              {{$root.dictAllName(infoForm.signType, 'SignUp')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="明源房款回笼比例">{{infoForm.returnRatio ? infoForm.returnRatio : 0}}%</el-form-item>
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
            <el-form-item label="成交组织">{{infoForm.dealOrgName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">{{infoForm.entryPerson}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入日期">{{infoForm.entryDate}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据标志">
              {{$root.dictAllName(infoForm.dataSign, 'DealDataFlag')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交状态">
              {{$root.dictAllName(infoForm.status, 'DealStatus')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩分配人">{{infoForm.alloter}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩分配日期">{{infoForm.allotDate}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计算方式">
              {{$root.dictAllName(infoForm.calculation, 'DealCalculateWay')}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p id="anchor-3" class="ih-info-title">优惠告知书信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="getOfferNoticeVO">
            <el-table-column prop="notificationType" label="名称" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.notificationType, 'NotificationType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="noticeNo" label="优惠告知书编号" min-width="120"></el-table-column>
            <el-table-column prop="notificationStatus" label="优惠告知书状态" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.notificationStatus, 'NotificationStatus')}}</div>
              </template>
            </el-table-column>
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
      <p id="anchor-4" class="ih-info-title">客户信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoForm.customerList">
            <el-table-column prop="customerNo" label="客户编号" min-width="150"></el-table-column>
            <el-table-column prop="customerType" label="客户类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.customerType, 'CustType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户名称" min-width="120"></el-table-column>
            <el-table-column prop="customerPhone" label="手机号码" min-width="120"></el-table-column>
            <el-table-column prop="CardType" label="证件类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="cardNo" label="证件编号" min-width="150"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div v-if="changeType !== 'ChangeBasicInf'">
        <p id="anchor-6" class="ih-info-title">收派金额</p>
        <el-row style="padding-left: 20px">
          <el-col>
            <el-table
              class="ih-table"
              show-summary
              sum-text="合计金额"
              :summary-method="getReceiveSummaries"
              :data="getReceiveVOList">
              <el-table-column prop="type" label="类型" fixed min-width="120">
                <template slot-scope="scope">
                  <div>{{scope.row.type === 'ServiceFee' ? '服务费' : '代理费'}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120"></el-table-column>
              <el-table-column prop="packageId" label="收派套餐" min-width="140">
                <template slot-scope="scope">
                  <el-tooltip placement="top" effect="light">
                    <div slot="content">
                      <el-table :data="scope.row.showData" style="width: 100%">
                        <el-table-column label="类型" prop="typeName" min-width="100"></el-table-column>
                        <el-table-column label="合同类型" prop="contractEnum" min-width="100">
                          <template slot-scope="scope">
                            <div>{{$root.dictAllName(scope.row.contractEnum, 'ContType')}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="客户类型" prop="transactionEnum" min-width="100">
                          <template slot-scope="scope">
                            <div>{{$root.dictAllName(scope.row.transactionEnum, 'Transaction')}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="条件" prop="condition" min-width="200"></el-table-column>
                        <el-table-column label="应收金额" prop="receivableAmout" min-width="200">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.receivableAmout}}</div>
                            <div>点数：{{scope.row.receivablePoint}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="派发佣金" prop="sendAmount" min-width="200">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.sendAmount}}</div>
                            <div>点数：{{scope.row.sendPoint}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="派发内场奖励" prop="sendInAmount" min-width="200">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.sendInAmount}}</div>
                            <div>点数：{{scope.row.sendInPoint}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="总包业绩" prop="generalAchieveAmount" min-width="200">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.generalAchieveAmount}}</div>
                            <div>点数：{{scope.row.generalAchievePoint}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="分销业绩" prop="distributeAchieveAmount" min-width="200">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.distributeAchieveAmount}}</div>
                            <div>点数：{{scope.row.distributeAchievePoint}}</div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <el-input
                      readonly
                      placeholder="收派标准">
                      <el-button slot="append" icon="el-icon-view"></el-button>
                    </el-input>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="receiveAmount" label="应收金额" min-width="180"></el-table-column>
              <el-table-column prop="commAmount" label="派发佣金金额" min-width="180"></el-table-column>
              <el-table-column prop="rewardAmount" label="派发内场奖励金额" min-width="180"></el-table-column>
              <el-table-column prop="totalPackageAmount" label="总包业绩金额" min-width="180"></el-table-column>
              <el-table-column prop="distributionAmount" label="分销业绩金额" min-width="180"></el-table-column>
              <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row style="padding-left: 20px; margin-top: 20px">
          <el-col>
            <el-table
              class="ih-table"
              :data="pageData.callBackInfo.receiveAchieveVO">
              <el-table-column prop="receiveAmount" label="本单应收" min-width="120"></el-table-column>
              <el-table-column prop="achieveAmount" label="本单业绩" min-width="120"></el-table-column>
              <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <p id="anchor-7" class="ih-info-title">对外拆佣</p>
        <el-row style="padding-left: 20px">
          <el-col>
            <el-table
              class="ih-table"
              show-summary
              sum-text="合计金额"
              :summary-method="getCommissionSummaries"
              :data="getChannelCommList">
              <el-table-column prop="target" label="拆佣对象" min-width="120">
                <template slot-scope="scope">
                  <div>{{$root.dictAllName(scope.row.target, 'CommObjectType')}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="agencyName" label="收款方" min-width="120"></el-table-column>
              <el-table-column prop="feeType" label="费用类型" min-width="120">
                <template slot-scope="scope">
                  <div>{{$root.dictAllName(scope.row.feeType, 'FeeType')}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="partyACustomer" label="费用来源(客户/甲方)" min-width="120">
                <template slot-scope="scope">
                  <div>{{scope.row.partyACustomerName}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="金额" min-width="120"></el-table-column>
              <el-table-column prop="remarks" label="备注" min-width="120"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="changeType !== 'ChangeBasicInf'">
      <p id="anchor-8" class="ih-info-title">平台费用</p>
      <p class="ih-type-wrapper">总包</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getAchieveSummaries"
            :data="infoForm.achieveTotalBagList">
            <el-table-column prop="roleType" label="角色类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.roleType, 'DealRole')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="150"></el-table-column>
            <el-table-column prop="rolerName" label="角色人" min-width="150">
              <template slot-scope="scope">
                <div v-if="scope.row.roleType === 'BranchOffice'">——</div>
                <div v-else>
                  <div>{{scope.row.rolerName}}</div>
                  <div>{{scope.row.rolerPosition}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="corporateAchieve" label="角色人业绩" min-width="150"></el-table-column>
            <el-table-column prop="corporateAchieveRatio" label="角色人业绩比例(%)" min-width="150"></el-table-column>
            <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
            <el-table-column prop="commFeesRatio" label="拆佣比例(%)" min-width="110"></el-table-column>
            <el-table-column prop="belongOrgName" label="店组" min-width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.roleType === 'BranchOffice'">{{infoForm.dealOrgName}}</div>
                <div v-else>{{scope.row.belongOrgName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="managerAchieveList" label="管理岗" min-width="210">
              <template slot-scope="scope">
                <div class="manager-list" v-for="(item, index) in scope.row.managerAchieveList" :key="index">
                  <div class="fee">{{item.achieveFees}}</div>
                  <div class="ratio">{{item.achieveFeesRatio ? item.achieveFeesRatio : 0}}%</div>
                  <div class="name">
                    <span>{{item.managerName ? item.managerName : '---'}}</span>
                    (<span>{{item.managerPosition}}</span>)
                  </div>
                </div>
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
            :data="infoForm.achieveDistriList">
            <el-table-column prop="roleType" label="角色类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.roleType, 'DealRole')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="150"></el-table-column>
            <el-table-column prop="rolerName" label="角色人" min-width="150">
              <template slot-scope="scope">
                <div v-if="scope.row.roleType === 'BranchOffice'">——</div>
                <div v-else>
                  <div>{{scope.row.rolerName}}</div>
                  <div>{{scope.row.rolerPosition}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="corporateAchieve" label="角色人业绩" min-width="150"></el-table-column>
            <el-table-column prop="corporateAchieveRatio" label="角色人业绩比例(%)" min-width="150"></el-table-column>
            <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
            <el-table-column prop="commFeesRatio" label="拆佣比例(%)" min-width="110"></el-table-column>
            <el-table-column prop="belongOrgName" label="店组" min-width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.roleType === 'BranchOffice'">{{infoForm.dealOrgName}}</div>
                <div v-else>{{scope.row.belongOrgName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="managerAchieveList" label="管理岗" min-width="210">
              <template slot-scope="scope">
                <div class="manager-list" v-for="(item, index) in scope.row.managerAchieveList" :key="index">
                  <div class="fee">{{item.achieveFees}}</div>
                  <div class="ratio">{{item.achieveFeesRatio ? item.achieveFeesRatio : 0}}%</div>
                  <div class="name">
                    <span>{{item.managerName ? item.managerName : '---'}}</span>
                    (<span>{{item.managerPosition}}</span>)
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="changeType !== 'ChangeInternalAchieveInf'">
      <p id="anchor-9" class="ih-info-title">上传附件</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="getUploadFileList">
            <el-table-column prop="fileType" label="类型" width="200">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.code, 'DealFileType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="fileName" label="附件" min-width="300">
              <template slot-scope="scope">
                <IhUpload
                  v-if="scope.row.fileList.length"
                  :isCrop="false"
                  :isMove="false"
                  :removePermi="false"
                  size="100px"
                  :file-type="scope.row.code"
                  :limit="scope.row.fileList.length"
                  :file-list.sync="scope.row.fileList"
                  :upload-show="!!scope.row.fileList.length"
                ></IhUpload>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="nav-box">
      <div class="nav-icon el-button--success" @click="navFlag = !navFlag " :title="navFlag ? '收起' : '展开'">
        <i :class="navFlag ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i>
      </div>
      <div :class="navFlag ? 'nav-wrapper' : 'nav-wrapper nav-transition'">
        <div
          @click="goAnchor(item.id, index)"
          v-for="(item, index) in navList"
          :key="item.id"
          :class="currentActiveIndex === index ? 'el-button--warning' : ''"
          class="nav-item el-button--success">{{item.name}}</div>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="handleSubmit('save')">保存</el-button>
      <el-button type="success" @click="handleSubmit('submit')">提交</el-button>
      <el-button @click="handleStepNext">返回</el-button>
    </div>
    <IhImgViews
      v-if="isShowImg"
      :url-list="srcList"
      :viewer-msg="srcData"
      :onClose="() => (isShowImg = false)"
    ></IhImgViews>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import {
    post_suppDeal_entryBasicInfChange, // 录入基础信息变更
    post_suppDeal_entryAchieveInfChange, // 录入业绩信息变更
    post_suppDeal_entryRetreatRoom, // 录入退房
    post_suppDeal_entryStaffAchieveChange, // 录入内部员工业绩变更
    post_suppDeal_updateAchieveInfChangeVO, // 修改业绩信息变更
    post_suppDeal_updateBasicInfChange, // 修改基础信息变更
    post_suppDeal_updateRetreatRoom, // 修改退房
    post_suppDeal_updateStaffAchieveChange, // 修改内部员工业绩变更
  } from "@/api/deal";

  @Component({
    components: {},
  })
  export default class PreviewPage extends Vue {
    private isShowImg = false;
    private srcList: any = [];
    private srcData: any = [];
    @Prop() private pageData?: any; // 页面数据
    changeType: any = null; // 补充成交类型
    btnType: any = null; // 新增add还是修改edit --- 初始化接口不一样
    infoForm: any = {
      dealCode: null,
      house: {}, // 房产信息
      offerNoticeList: [], // 优惠告知书
      customerList: [], // 客户信息
      agencyList: [], // 渠道信息
      receiveList: [], // 收派金额
      receiveAchieveList: [], // 应收业绩 - 收派信息下
      channelCommList: [], // 对外拆佣信息
      achieveVO: [], // 平台费用 - 包含总包和分销
      achieveTotalBagList: [], // 平台费用 - 总包 - 前端拆分
      achieveDistriList: [], // 平台费用 - 分销 - 前端拆分
      uploadDocumentList: [], // 附件信息
      processRecordList: [], // 审核信息
      callBackInfo: {}, // 预览接口返回的数据
    };
    dealId: any = null;
    navFlag: any = false; // 是否折叠锚点
    navList: any = [
      {
        id: 1,
        name: '成交信息'
      },
      {
        id: 3,
        name: '优惠告知书'
      },
      {
        id: 4,
        name: '客户信息'
      },
      {
        id: 6,
        name: '收派金额'
      },
      {
        id: 7,
        name: '对外拆佣'
      },
      {
        id: 8,
        name: '平台费用'
      },
      {
        id: 9,
        name: '上传附件'
      }
    ]; // 锚点列表
    currentActiveIndex: any = 0; // 当前激活的nav
    isCreated: any = false; // 当走了一次created后就置为true

    // 应收信息表格
    get receiveAchieveVO() {
      let arr: any = []
      if (this.pageData.receiveList.length > 0) {
        let obj = {
          receiveAmount: 0,
          achieveAmount: 0,
          otherChannelFees: 0,
        }
        this.pageData.receiveList.forEach((item: any) => {
          obj.receiveAmount = (obj.receiveAmount * 1 * 100 + item.receiveAmount * 1 * 100) / 100;
          obj.achieveAmount = (obj.achieveAmount * 1 * 100 + item.commAmount * 1 * 100
            + item.rewardAmount * 1 * 100 + item.totalPackageAmount * 1 * 100
            + item.distributionAmount * 1 * 100) / 100;
          obj.otherChannelFees = (obj.otherChannelFees * 1 * 100 + item.otherChannelFees * 1 * 100) / 100;
        })
        arr.push(obj);
      }
      return arr;
    }

    // 优惠告知书
    get getOfferNoticeVO() {
      let list: any = [];
      if (this.pageData.offerNoticeVO && this.pageData.offerNoticeVO.length) {
        list = [...this.pageData.offerNoticeVO];
      }
      if (this.pageData && this.pageData.noticeDealList && this.pageData.noticeDealList.length) {
        this.pageData.noticeDealList.forEach((item: any) => {
          list.push(
            {
              noticeAttachmentList: item.annexList, // 告知书附件
              noticeNo: '————', // 优惠告知书编号 --- 暂时新增的没有
              notificationStatus: null, // 告知书状态 --- 暂时新增的没有
              notificationStatusName: '新增', // 告知书状态 --- 显示新增
              notificationType: item.notificationType, // 告知书状态 --- 显示新增
              paymentAmount: null, // 优惠金额
              templateId: null, // 预览编号
              templateType: item.templateType, // 模版类型 --- 显示新增
            }
          )
        })
      }
      return list;
    }

    // 上传附件
    get getUploadFileList() {
      let list: any = [];
      if (this.pageData.uploadDocumentList && this.pageData.uploadDocumentList.length) {
        this.pageData.uploadDocumentList.forEach((item: any) => {
          item.fileList = [...item.fileList, ...item.defaultFileList];
          list.push(item);
        });
      }
      return list;
    }

    // 收派金额 --- 差值
    get getReceiveVOList() {
      let list: any = [];
      if (this.pageData.receiveList && this.pageData.receiveList.length
        && this.pageData.callBackInfo && this.pageData.callBackInfo.receiveVO &&
        this.pageData.callBackInfo.receiveVO.length) {
        this.pageData.receiveList.forEach((item: any, itemIndex: any) => {
          this.pageData.callBackInfo.receiveVO.forEach((vo: any, voIndex: any) => {
            if (itemIndex === voIndex) {
              list.push(
                {
                  ...item,
                  ...vo
                }
              )
            }
          });
        });
      }
      return list;
    }

    // 对外拆佣 --- 差值
    get getChannelCommList() {
      let list: any = [];
      if (this.pageData.channelCommList && this.pageData.channelCommList.length
        && this.pageData.callBackInfo && this.pageData.callBackInfo.channelCommVO &&
        this.pageData.callBackInfo.channelCommVO.length) {
        this.pageData.channelCommList.forEach((item: any, itemIndex: any) => {
          this.pageData.callBackInfo.channelCommVO.forEach((vo: any, voIndex: any) => {
            if (itemIndex === voIndex) {
              list.push(
                {
                  ...item,
                  ...vo
                }
              )
            }
          });
        });
      }
      return list;
    }

    created() {
      console.log('preview', this.pageData);
      this.dealId = this.$route.query.id;
      this.changeType = this.$route.query.type;
      this.btnType = this.$route.query.btnType;
      this.infoForm = (this as any).$tool.deepClone(this.pageData);
      // 平台费用-总包/分销数据初始化
      this.initAchieveData();
      this.isCreated = true;
    }

    // 重新赋值
    activated() {
      // console.log('activated', this.pageData);
      if (this.isCreated) {
        this.dealId = this.$route.query.id;
        this.changeType = this.$route.query.type;
        this.btnType = this.$route.query.btnType;
        this.infoForm = (this as any).$tool.deepClone(this.pageData);
        // 平台费用-总包/分销数据初始化
        this.initAchieveData();
      }
    }

    // 初始化平台费用数据
    initAchieveData() {
      if (this.pageData && this.pageData.callBackInfo && this.pageData.callBackInfo.achieveVO && this.pageData.callBackInfo.achieveVO.length) {
        this.pageData.callBackInfo.achieveVO.forEach((vo: any) => {
          if (vo.type === "TotalBag") {
            this.infoForm.achieveTotalBagList.push(vo);
          } else if (vo.type === "Distri") {
            this.infoForm.achieveDistriList.push(vo);
          }

        });
      } else {
        this.infoForm.achieveTotalBagList = [];
        this.infoForm.achieveDistriList = [];
      }
      console.log('this.infoForm', this.infoForm);
    }

    // 预览-优惠告知书
    preview(scope: any) {
      // console.log(scope);
      if (scope.row.templateType === "ElectronicTemplate") {
        window.open(
          `/sales-api/sales-document-cover/file/browse/${scope.row.templateId}`
        );
      } else {
        let imgList = scope.row.noticeAttachmentList || scope.row.annexList;
        this.srcList = imgList.map(
          (i: any) => `/sales-api/sales-document-cover/file/browse/${i.fileNo}`
        );
        this.srcData = imgList.map((v: any) => ({
          name: v.attachmentSuffix,
          preFileName: "优惠告知书",
        }));
        if (this.srcList.length) {
          this.isShowImg = true;
        } else {
          this.$message.warning("暂无图片");
        }
      }
    }

    // 保存/提交功能
    async handleSubmit(type: any = '') {
      // console.log(type);
      if (!type) return;
      let postData: any = this.pageData.currentPostData;
      // 补充成交类型
      switch (this.changeType) {
        case "ChangeBasicInf":
          // 变更基础信息
          postData.noticeDealList = this.pageData?.noticeDealList;
          postData.dealAddInputVO.status = type === 'save' ? 'Draft' : 'PlatformClerkUnreview';
          if (this.btnType === "add") {
            // 去新增
            await post_suppDeal_entryBasicInfChange(postData);
          } else if (this.btnType === "edit") {
            // 去修改
            await post_suppDeal_updateBasicInfChange(postData);
          }
          this.$goto({
            path: "/dealReport/list",
          });
          break
        case "ChangeAchieveInf":
          // 变更业绩信息
          postData.noticeDealList = this.pageData?.noticeDealList;
          postData.achieveVO = this.pageData?.callBackInfo?.achieveVO;
          postData.receiveAchieveVO = this.pageData?.callBackInfo?.receiveAchieveVO;
          postData.receiveVO = this.pageData?.callBackInfo?.receiveVO;
          postData.channelCommVO = this.pageData?.callBackInfo?.channelCommVO;
          postData.dealVO.status = type === 'save' ? 'Draft' : 'PlatformClerkUnreview';
          if (this.btnType === "add") {
            // 去新增
            await post_suppDeal_entryAchieveInfChange(postData);
          } else if (this.btnType === "edit") {
            // 去修改
            await post_suppDeal_updateAchieveInfChangeVO(postData);
          }
          this.$goto({
            path: "/dealReport/list",
          });
          break
        case "RetreatRoom":
          // 退房
          postData.noticeDealList = this.pageData?.noticeDealList;
          postData.achieveVO = this.pageData?.callBackInfo?.achieveVO;
          postData.receiveAchieveVO = this.pageData?.callBackInfo?.receiveAchieveVO;
          postData.receiveVO = this.pageData?.callBackInfo?.receiveVO;
          postData.channelCommVO = this.pageData?.callBackInfo?.channelCommVO;
          postData.dealVO.status = type === 'save' ? 'Draft' : 'PlatformClerkUnreview';
          if (this.btnType === "add") {
            // 去新增
            await post_suppDeal_entryRetreatRoom(postData);
          } else if (this.btnType === "edit") {
            // 去修改
            await post_suppDeal_updateRetreatRoom(postData);
          }
          this.$goto({
            path: "/dealReport/list",
          });
          break
        case "ChangeInternalAchieveInf":
          // 内部员工业绩变更
          postData.status = type === 'save' ? 'Draft' : 'PlatformClerkUnreview';
          if (this.btnType === "add") {
            // 去新增
            await post_suppDeal_entryStaffAchieveChange(postData);
          } else if (this.btnType === "edit") {
            // 去修改
            await post_suppDeal_updateStaffAchieveChange(postData);
          }
          this.$goto({
            path: "/dealReport/list",
          });
          break
      }
    }

    // 返回
    handleStepNext() {
      this.$emit("next", 'up');
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
                let total = (prev * 1 * 100 + curr * 1 * 100) / 100;
                return total;
              } else {
                return ((prev * 1 * 100) / 100);
              }
            }, 0);
            sums[index] = Math.round(sums[index] * 100) / 100; // 解决精度缺失问题
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
                let total = (prev * 1 * 100 + curr * 1 * 100) / 100;
                return total;
              } else {
                return ((prev * 1 * 100) / 100);
              }
            }, 0);
            sums[index] = Math.round(sums[index] * 100) / 100; // 解决精度缺失问题
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
        if ([3, 5, 6].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let total = (prev * 1 * 100 + curr * 1 * 100) / 100;
                return total;
              } else {
                return ((prev * 1 * 100) / 100);
              }
            }, 0);
            sums[index] = Math.round(sums[index] * 100) / 100; // 解决精度缺失问题
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 跳转到指定索引的元素
    goAnchor(id: any, index: any) {
      this.$nextTick(() => {
        // 获取目标的 offsetTop
        let selector = `#anchor-${id}`;
        let dom = document.querySelector(selector) as any;
        const targetOffsetTop = dom ? dom.offsetTop - 60 : 0;
        // console.log('targetOffsetTop:', targetOffsetTop);
        // 获取当前 offsetTop
        let mainDom =  document.querySelector('.el-main') as any;
        let scrollTop = mainDom ? mainDom.scrollTop : 0;
        // console.log('scrollTop:', scrollTop);
        // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
        const STEP = 50;
        // 定义往下滑函数
        function smoothDown() {
          // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
          if (scrollTop < targetOffsetTop) {
            // 如果和目标相差距离大于等于 STEP 就跳 STEP
            // 否则直接跳到目标点，目标是为了防止跳过了。
            if (targetOffsetTop - scrollTop >= STEP) {
              scrollTop += STEP;
            } else {
              scrollTop = targetOffsetTop;
            }
            mainDom.scrollTop = scrollTop;
            // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
            window.requestAnimationFrame(smoothDown);
          }
        }
        // 定义往上滑函数
        function smoothUp() {
          if (scrollTop > targetOffsetTop) {
            if (scrollTop - targetOffsetTop >= STEP) {
              scrollTop -= STEP;
            } else {
              scrollTop = targetOffsetTop;
            }
            mainDom.scrollTop = scrollTop;
            window.requestAnimationFrame(smoothUp);
          }
        }
        // 判断是往下滑还是往上滑
        if (scrollTop > targetOffsetTop) {
          // 往上滑
          smoothUp();
        } else {
          // 往下滑
          smoothDown();
        }
        this.currentActiveIndex = index;
      })
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

  .manager-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      //flex: 1;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }

    .fee {
      width: 30%;
    }

    .ratio{
      width: 20%;
    }

    .name{
      width: 50%;
    }
  }

  .btn {
    box-sizing: border-box;
    margin-top: 30px;
    text-align: center;
  }

  .contNo-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .contNo {
      flex: 1;
      box-sizing: border-box;
      margin-right: 20px;
    }
  }

  .btn-wrapper {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    margin-top: 20px;
  }

  .ih-type-wrapper {
    margin-right: 20px;
    box-sizing: border-box;
    border-left: 5px solid #F90;
    padding-left: 5px;
    color: #f90;
    margin-left: 40px;
  }

  .nav-box {
    position: fixed;
    right: 37px;
    top: 30%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    //align-items: center;
    //border: 1px solid #ffffff;
    z-index: 200;

    .nav-icon {
      width: 24px;
      height: 46px;
      line-height: 47px;
      border-radius: 50px 0 0 50px;
      cursor: pointer;
      //background-color: #2B4558;
      color: #ffffff;
      font-size: 12px;
      text-align: center;
    }

    .nav-wrapper {
      //width: 133px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #2B4558;
      color: #ffffff;
      visibility: visible;
      transform: scaleX(1);
      transition: all 0.3s;
      transform-origin: left bottom;

      .nav-item {
        width: 44px;
        //height: 40px;
        //line-height: 40px;
        text-align: center;
        font-size: 14px;
        box-sizing: border-box;
        padding: 5px 5px;
        cursor: pointer;
        border-left: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;

        &:not(:last-child) {
          border-bottom: 1px solid #ffffff;
        }
      }
    }

    .nav-transition {
      width: 0;
      visibility: hidden;
      transform: scaleX(0);
      transition: all 0.3s;
      transform-origin: left bottom;
    }
  }
</style>
