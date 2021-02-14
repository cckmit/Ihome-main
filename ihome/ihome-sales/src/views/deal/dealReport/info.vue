<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 13:20:35
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-08 08:46:13
-->
<template>
  <ih-page class="text-left">
    <div v-if="['ChangeBasicInf', 'ChangeAchieveInf', 'RetreatRoom'].includes(suppContType) || !suppContType">
      <p id="anchor-1" class="ih-info-title">成交信息</p>
      <el-form
        @submit.native.prevent
        :model="infoForm"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="成交报告编号">{{infoForm.dealCode}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目周期">
              <div class="cycle-name-wrapper" :title="infoForm.cycleName">{{infoForm.cycleName}}</div>
            </el-form-item>
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
              {{$root.dictAllName(infoForm.house.propertyType, 'Property')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="栋座">{{infoForm.house.buildingName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房号">{{infoForm.house.roomNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同类型">
              {{$root.dictAllName(infoForm.contType, 'ContType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分销协议编号">
              <div class="contNo-wrapper">
                <div class="no cycle-name-wrapper" :title="infoForm.contNo">{{infoForm.contNo}}</div>
                <div v-if="infoForm.contNo">
                  <el-link
                    class="margin-left-10"
                    type="primary"
                    @click.native.prevent="viewContNoDetail(infoForm.contNo)"
                  >查看
                  </el-link>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否垫佣">
              {{infoForm.isMat ? $root.dictAllName(infoForm.isMat, 'PadCommission') : '无数据'}}
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="infoForm.recordStr">
            <el-form-item label="报备信息">{{infoForm.recordStr}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道公司">
              {{infoForm.agencyList && infoForm.agencyList.length ? infoForm.agencyList[0].agencyName : ''}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道等级">
              {{infoForm.agencyList && infoForm.agencyList.length ? $root.dictAllName(infoForm.agencyList[0].channelLevel, 'ChannelLevel') : ''}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经纪人">
              {{infoForm.agencyList && infoForm.agencyList.length ? infoForm.agencyList[0].broker : ''}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备案情况">
              {{$root.dictAllName(infoForm.recordState, 'HasOrNoType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑面积">{{infoForm.house.area}}</el-form-item>
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
            <el-form-item label="房产证/预售合同编号">{{infoForm.house.propertyNo}}</el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="房产证地址">{{infoForm.house.address}}</el-form-item>
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
            <el-form-item label="成交组织">{{infoForm.dealOrgName ? infoForm.dealOrgName : '无数据'}}</el-form-item>
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
      <p id="anchor-2" class="ih-info-title">优惠告知书信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoForm.offerNoticeList">
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
                  @click.native.prevent="previewNotice(scope)"
                >预览
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <p id="anchor-3" class="ih-info-title">客户信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoForm.customerList">
            <el-table-column prop="customerNo" label="客户编号" min-width="120"></el-table-column>
            <el-table-column prop="customerType" label="客户类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.customerType, 'CustType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户名称" min-width="120"></el-table-column>
            <el-table-column prop="customerPhone" label="手机号码" min-width="120"></el-table-column>
            <el-table-column prop="cardType" label="证件类型" min-width="150">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="cardNo" label="证件编号" min-width="150"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="150"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="['ChangeAchieveInf', 'RetreatRoom'].includes(suppContType) || !suppContType">
      <p id="anchor-4" class="ih-info-title">收派金额</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getReceiveSummaries"
            :data="infoForm.receiveList">
            <el-table-column prop="type" label="类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.type, 'FeeType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120">
              <template slot-scope="scope">
                <div>{{scope.row.type === "ServiceFee" ? '客户' : scope.row.partyACustomerName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="packageId" label="收派套餐" min-width="140">
              <template slot-scope="scope">
                <div v-if="infoForm.calculation === 'Auto'">
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
                </div>
                <div v-else>---</div>
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
            :data="infoForm.receiveAchieveList">
            <el-table-column prop="receiveAmount" label="本单应收" min-width="120"></el-table-column>
            <el-table-column prop="achieveAmount" label="本单业绩" min-width="120"></el-table-column>
            <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <p id="anchor-5" class="ih-info-title">对外拆佣</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getCommissionSummaries"
            :data="infoForm.channelCommList">
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
            <el-table-column prop="partyACustomerName" label="费用来源(客户/甲方)" min-width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.feeType === 'ServiceFee'">客户</div>
                <div v-else>{{scope.row.partyACustomerName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额" min-width="150"></el-table-column>
            <el-table-column prop="remarks" label="备注" min-width="150"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="['ChangeAchieveInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(suppContType) || !suppContType">
      <p id="anchor-6" class="ih-info-title">平台费用</p>
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
                <div>{{scope.row.rolerName}}</div>
                <div>{{scope.row.rolerPosition}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="corporateAchieve" label="角色人业绩" min-width="120"></el-table-column>
            <el-table-column prop="roleAchieveRatio" label="角色业绩比例（%）" min-width="120">
              <template slot-scope="scope">
                <div v-if="suppContType">-</div>
                <div v-else>{{scope.row.roleAchieveRatio}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
            <el-table-column prop="commFeesRatio" label="拆佣比例（%）" min-width="150">
              <template slot-scope="scope">
                <div v-if="suppContType">-</div>
                <div v-else>{{scope.row.commFeesRatio}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
            <el-table-column prop="managerAchieveList" label="管理岗" min-width="150">
              <template slot-scope="scope">
                <div class="manager-list" v-for="(item, index) in scope.row.managerAchieveList" :key="index">
                  <div class="fee">{{item.achieveFees}}</div>
                  <div class="ratio" v-if="suppContType">-</div>
                  <div class="ratio" v-else>{{item.ratio ? item.ratio : 0}}%</div>
                  <div class="name">
                    <span>{{item.manager ? item.manager : '---'}}</span>
                    (<span>{{$root.dictAllName(item.type, 'ManagerType')}}</span>)
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
                <div>{{scope.row.rolerName}}</div>
                <div>{{scope.row.rolerPosition}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="corporateAchieve" label="角色人业绩" min-width="120"></el-table-column>
            <el-table-column prop="roleAchieveRatio" label="角色业绩比例（%）" min-width="120">
              <template slot-scope="scope">
                <div v-if="suppContType">-</div>
                <div v-else>{{scope.row.roleAchieveRatio}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
            <el-table-column prop="commFeesRatio" label="拆佣比例（%）" min-width="150">
              <template slot-scope="scope">
                <div v-if="suppContType">-</div>
                <div v-else>{{scope.row.commFeesRatio}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
            <el-table-column prop="managerAchieveList" label="管理岗" min-width="150">
              <template slot-scope="scope">
                <div class="manager-list" v-for="(item, index) in scope.row.managerAchieveList" :key="index">
                  <div class="fee">{{item.achieveFees}}</div>
                  <div class="ratio" v-if="suppContType">-</div>
                  <div class="ratio" v-else>{{item.ratio ? item.ratio : 0}}%</div>
                  <div class="name">
                    <span>{{item.manager ? item.manager : '---'}}</span>
                    (<span>{{$root.dictAllName(item.type, 'ManagerType')}}</span>)
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="suppContType !== 'ChangeInternalAchieveInf'">
      <p id="anchor-7" class="ih-info-title">上传附件</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoForm.documentList">
            <el-table-column prop="fileType" label="类型" width="200">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.code, 'DealFileType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="fileName" label="附件" min-width="300">
              <template slot-scope="scope">
                <IhUpload
                  :isCrop="false"
                  :isMove="false"
                  :removePermi="false"
                  size="100px"
                  :limit="scope.row.defaultFileLists.length"
                  :file-list.sync="scope.row.defaultFileLists"
                  :file-type="scope.row.code"
                  :upload-show="!!scope.row.defaultFileLists.length"
                ></IhUpload>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="!suppContType">
      <p class="ih-info-title">发票信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoForm.invoiceList">
            <el-table-column prop="businessNo" label="业务单号" min-width="120"></el-table-column>
            <el-table-column prop="invoiceTitle" label="发票抬头" min-width="100"></el-table-column>
            <el-table-column prop="invoiceType" label="发票类型" min-width="100">
              <template slot-scope="scope">
                {{$root.dictAllName(scope.row.invoiceType, 'InvoiceType')}}
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="发票金额（含税）" min-width="150"></el-table-column>
            <el-table-column prop="taxRate" label="税率" min-width="120"></el-table-column>
            <el-table-column prop="noTax" label="确认主营（不含税）" min-width="150"></el-table-column>
            <el-table-column prop="tax" label="税额" min-width="120"></el-table-column>
            <el-table-column prop="payee" label="收款方" min-width="120"></el-table-column>
            <el-table-column prop="ncCode" label="NC凭证号" min-width="120"></el-table-column>
            <el-table-column prop="status" label="开票状态" min-width="100">
              <template slot-scope="scope">
                {{$root.dictAllName(scope.row.invoiceType, 'InvoiceOperationStatus')}}
              </template>
            </el-table-column>
            <el-table-column prop="operationDate" label="开票日期" min-width="150"></el-table-column>
            <el-table-column fixed="right" label="操作" width="90">
              <template slot-scope="scope">
                <el-link
                  class="margin-right-10"
                  type="primary"
                  @click.native.prevent="viewInvoiceDetail(scope)"
                >查看详情
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="btn-wrapper">
      <el-button @click="handleBack">返回</el-button>
      <el-button type="primary" @click="viewReviewDetails">查看审核详情</el-button>
    </div>
    <div class="nav-box" v-if="['ChangeAchieveInf', 'RetreatRoom'].includes(suppContType) || !suppContType">
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
  import {get_org_get__id} from "@/api/system";

  @Component({
    components: {ReviewDetailsDialog},
  })
  export default class DealReportInfo extends Vue {
    private isShowImg = false;
    private srcList: any = [];
    private srcData: any = [];
    infoForm: any = {
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
      documentList: [], // 附件信息
      processRecordList: [], // 审核信息
      invoiceList: [] // 发票信息
    };
    reviewDialog: any = false;
    reviewData: any = []; // 审核详情
    infoType: any = null; // 是通过成交ID还是成交编号获取详情
    dealIdOrCode: any = null; // ID或者code
    navFlag: any = false; // 是否折叠锚点
    navList: any = [
      {
        id: 1,
        name: '成交信息'
      },
      {
        id: 2,
        name: '优惠告知书'
      },
      {
        id: 3,
        name: '客户信息'
      },
      {
        id: 4,
        name: '收派金额'
      },
      {
        id: 5,
        name: '对外拆佣'
      },
      {
        id: 6,
        name: '平台费用'
      },
      {
        id: 7,
        name: '上传附件'
      }
    ]; // 锚点列表
    currentActiveIndex: any = 0; // 当前激活的nav
    suppContType: any = null; // 补充成交类型 --- 区别主成交和补充成交的展示

    async created() {
      this.infoType = this.$route.query.type;
      this.dealIdOrCode = this.$route.query.id;
      if (this.infoType && this.dealIdOrCode) {
        await this.init(); // 基础数据
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
      this.infoForm = (this as any).$tool.deepClone(info || {});
      // 收派金额数据整理 showData
      if (this.infoForm.receiveList && this.infoForm.receiveList.length > 0) {
        this.infoForm.receiveList.forEach((list: any) => {
          this.$set(list, 'showData', [
            {
              ...list.collectandsendDetailDealVO,
              typeName: (this as any).$root.dictAllName(list.type, 'FeeType')
            }
          ]);
        });
      }
      // 平台费用 - 拆分总包和分销数据
      if (this.infoForm.achieveList && this.infoForm.achieveList.length > 0) {
        this.infoForm.achieveTotalBagList = [];
        this.infoForm.achieveDistriList = [];
        this.infoForm.achieveList.forEach((list: any) => {
          if (list.type === 'TotalBag') {
            this.infoForm.achieveTotalBagList.push(list);
          } else if (list.type === 'Distri') {
            this.infoForm.achieveDistriList.push(list);
          }
        })
      }
      // 初始化优惠告知书信息
      await this.getInformation(info.id);
      // 初始化附件
      if (info.documentList && info.documentList.length) {
        this.infoForm.documentList = this.initDocumentList(info.documentList);
        console.log('this.infoForm.documentList', this.infoForm.documentList);
      }
      // 初始化开票信息
      await this.getInvoiceInfo(info.dealCode);
      // 获取显示的成交组织name
      await this.getOrgName(info.dealOrgId);
    }

    // 获取组织name
    async getOrgName(id: any = '') {
      if (!id) return;
      const info: any = await get_org_get__id({id: id});
      // console.log('组织info:', info);
      this.infoForm.dealOrgName = info.name;
    }

    // 构建附件信息
    initDocumentList(list: any = []) {
      let fileList: any = (this as any).$root.dictAllList('DealFileType'); // 附件类型
      // 附件类型增加key
      if (fileList.length > 0 && list.length > 0) {
        fileList.forEach((vo: any) => {
          vo.defaultFileLists = []; // 存放原来的数据
          vo.fileList = []; // 存放新上传的数据
          list.forEach((item: any) => {
            if (vo.code === item.fileType) {
              vo.defaultFileLists.push(
                {
                  ...item,
                  name: item.fileName,
                  exAuto: true // 是否可以删除
                }
              );
            }
          });
        });
      }
      return fileList;
    }

    // 获取开票信息
    async getInvoiceInfo(code: any = '') {
      if (!code) return;
      let info: any = await get_invoice_getInvoiceInfo__businessCode({businessCode: code});
      // console.log(info);
      if (info.id) {
        this.infoForm.invoiceList.push(info);
      } else {
        this.infoForm.invoiceList = [];
      }
    }

    // 根据成交id获取优惠告知书列表
    async getInformation(id: any = '') {
      if (!id) return;
      const list: any = await post_notice_customer_information({dealId: id});
      // console.log('优惠告知书列表', list);
      if (list && list.length > 0) {
        this.infoForm.offerNoticeList = list;
      } else {
        this.infoForm.offerNoticeList = [];
      }
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

    // 查看分销协议
    viewContNoDetail(contractNo: any) {
      if (!contractNo) return;
      let router = this.$router.resolve({
        path: `/distribution/info`,
        query: {
          contractNo: contractNo
        },
      });
      window.open(router.href, "_blank");
    }

    // 预览-优惠告知书
    previewNotice(scope: any) {
      if (scope.row.templateType === "ElectronicTemplate") {
        window.open(
          `/sales-api/sales-document-cover/file/browse/${scope.row.templateId}`
        );
      } else {
        let imgList = scope.row.noticeAttachmentList;
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

    // 查看开票详情
    viewInvoiceDetail(scope: any) {
      // console.log(scope);
      let router = this.$router.resolve({
        path: `/invoice/info`,
        query: {
          id: scope.row.id
        },
      });
      window.open(router.href, "_blank");
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
  .cycle-name-wrapper {
    width: 97%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .home-type-wrapper {
    width: 100%;
    display: flex;

    div {
      flex: 1;
      text-align: center;
    }
  }

  .contNo-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .no {
      flex: 1;
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
