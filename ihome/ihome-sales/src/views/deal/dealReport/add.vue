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
    <p class="ih-info-title">成交信息</p>
    <el-form
      :model="postData"
      :rules="rules"
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="6" v-if="!!postData.dealCode">
          <el-form-item label="成交报告编号">
            <el-input
              disabled
              placeholder="成交报告编号"
              v-model="postData.dealCode"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目周期">
            <el-input
              ref="inputSelect"
              class="input-select-wrapper"
              placeholder="项目周期"
              prefix-icon="el-icon-search"
              @click.native.prevent="selectProject"
              v-model="postData.contType"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同类型">
            <el-select
              v-model="postData.contType"
              clearable
              placeholder="请选择合同类型"
              class="width--100">
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
              clearable
              placeholder="业务模式"
              class="width--100">
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
              clearable
              placeholder="成交渠道等级"
              class="width--100">
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
            <el-input v-model="postData.status" clearable placeholder="成交状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否垫佣">
            <el-select
              v-model="postData.isMat"
              clearable
              placeholder="是否垫佣"
              class="width--100">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="一手代理团队">
            <el-select
              v-model="postData.oneAgentTeamId"
              clearable
              placeholder="一手代理团队"
              class="width--100">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否市场化项目">
            <el-select
              v-model="postData.isMarketProject"
              clearable
              placeholder="请选择是否市场化项目"
              class="width--100">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备案情况">
            <el-select
              v-model="postData.recordState"
              clearable
              placeholder="备案情况"
              class="width--100">
              <el-option label="有" value="Has"></el-option>
              <el-option label="无" value="No"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="明源房款回笼比例">
            <el-input v-model="postData.returnRatio" clearable placeholder="明源房款回笼比例"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="数据标志">
            <el-input v-model="postData.dataSign" clearable placeholder="数据标志"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交组织">
            <el-input v-model="postData.dealOrgId" clearable placeholder="成交组织"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同编号">
            <el-input v-model="postData.contNo" clearable placeholder="合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交阶段">
            <el-select
              v-model="postData.stage"
              clearable
              placeholder="成交阶段"
              class="width--100">
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
              class="width--100">
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
            <el-input v-model="postData.subscribePrice" clearable placeholder="认购价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认购日期">
            <el-date-picker
              style="width: 100%"
              v-model="postData.subscribeDate"
              type="datetime"
              placeholder="认购日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约价格">
            <el-input v-model="postData.signPrice" clearable placeholder="签约价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约日期">
            <el-date-picker
              style="width: 100%"
              v-model="postData.signDate"
              type="datetime"
              placeholder="签约日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入日期">
            <el-date-picker
              style="width: 100%"
              v-model="postData.entryDate"
              type="datetime"
              placeholder="录入日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入人">
            <el-input v-model="postData.entryPerson" clearable placeholder="录入人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="postData.remarks" clearable placeholder="请输入备注说明"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
            <el-select
              v-model="postData.propertyType"
              clearable
              placeholder="物业类型"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('PropertyEnum')"
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
              clearable
              placeholder="栋座"
              class="width--100">
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
              clearable
              placeholder="房号"
              class="width--100">
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
            <el-input v-model="postData.propertyNo" clearable placeholder="房产证/预售合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房屋地址">
            <el-input v-model="postData.address" clearable placeholder="房屋地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑面积">
            <el-input v-model="postData.area" clearable placeholder="建筑面积"></el-input>
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
                  abel="描述文字"></el-input-number>
                室
              </div>
              <div>
                <el-input-number
                  v-model="postData.hall"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"
                  abel="描述文字"></el-input-number>
                厅
              </div>
              <div>
                <el-input-number
                  v-model="postData.kitchen"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"
                  abel="描述文字"></el-input-number>
                厨
              </div>
              <div>
                <el-input-number
                  v-model="postData.toilet"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"
                  abel="描述文字"></el-input-number>
                卫
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="优惠告知书"></el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="" label-width="80px">
            <el-table
              class="ih-table"
              :data="infoList">
              <el-table-column prop="offerNoticeName" label="名称" min-width="120"></el-table-column>
              <el-table-column prop="offerNoticeCode" label="优惠告知书编号" min-width="120"></el-table-column>
              <el-table-column prop="offerNoticeStatus" label="优惠告知书状态" min-width="120"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
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
          <el-button type="success" @click="handleAddCustomer">添加客户</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="infoList">
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
          <el-table-column fixed="right" label="操作" width="100">
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
    <p class="ih-info-title">中介信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div class="add-all-wrapper">
          <el-button type="success" @click="handleAddBroker">添加中介经纪人</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="infoList">
          <el-table-column
            prop="agencyName"
            label="中介公司名称"
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
          <el-table-column fixed="right" label="操作" width="100">
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
          :data="infoList">
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
          :data="infoList">
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
          :data="infoList">
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
    <div class="text-center btn-top">
      <el-button type="info" @click="cancel()">取消</el-button>
      <el-button type="success" @click="save()">保存</el-button>
      <el-button type="primary" @click="confirmPerformance()">确认业绩申报</el-button>
    </div>
    <ih-dialog :show="dialogAddProjectCycle" desc="选择项目周期列表">
      <SelectProjectCycle
        @cancel="() => (dialogAddProjectCycle = false)"
        @finish="
            (data) => {
              dialogAddProjectCycle = false;
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddCustomer" desc="选择客户列表">
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
    <ih-dialog :show="dialogAddBroker" desc="选择中介经纪人列表">
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
  import {Component, Vue} from "vue-property-decorator";
  import SelectProjectCycle from "@/views/deal/dealReport/dialog/selectProjectCycle.vue";
  import AddCustomer from "@/views/deal/dealReport/dialog/addCustomer.vue";
  import AddBroker from "@/views/deal/dealReport/dialog/addBroker.vue";
  import {
    post_achieveScaleScheme_add,
    get_achieveScaleScheme_get__id,
    post_achieveScaleScheme_update
  } from "@/api/deal";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {AddCustomer, AddBroker, SelectProjectCycle},
  })
  export default class DealReportAdd extends Vue {
    postData: any = {
      modelName: null,
      contType: null,
      isMarketProject: null,
      isSame: null,
      achievePropertyTypeList: [],
      achieveProjectList: [],
      remarks: null,
      buModelContTypeList: []
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
    divisionList: any = [
      {
        value: "TotalBagModel",
        label: "总包模式"
      },
      {
        value: "DistriModel",
        label: "分销模式"
      },
      {
        value: "TotalBagDistriModel",
        label: "总包+分销模式"
      },
      {
        value: "UnderwritingModel",
        label: "承销"
      }
    ];
    modelContType: any = [
      {
        value: "SelfDeal",
        label: "自行成交"
      },
      {
        value: "DistriDeal",
        label: "分销成交"
      },
      {
        value: "NaturalVisitDeal",
        label: "自然来访成交"
      },
      {
        value: "SelfChannelDeal",
        label: "自渠成交"
      }
    ]
    id: any = null;
    dialogAddCustomer: any = false;
    dialogAddBroker: any = false;
    dialogAddProjectCycle: any = false;

    async created() {
      this.id = this.$route.query.id;
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

    // 选择项目周期
    selectProject() {
      this.dialogAddProjectCycle = true;
      // input失焦
      (this as any).$refs.inputSelect && (this as any).$refs.inputSelect.blur();
    }

    // 确定选择项目周期
    async finishAddProjectCycle(data: any) {
      console.log('data', data);
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

    // 添加中介经纪人
    handleAddBroker() {
      this.dialogAddBroker = true;
    }

    // 确定选择客户
    async finishAddCustomer(data: any) {
      console.log('data', data);
      // this.addTotalPackageList = data;
    }

    // 确定选择中介经纪人
    async finishAddBroker(data: any) {
      console.log('data', data);
      // this.addTotalPackageList = data;
    }

    // 删除客户/中介经纪人
    async deleteAdd(scope: any, type: any) {
      console.log(scope);
      console.log(type);
      if (type === 'customer') {
        // 删除客户信息逻辑
        console.log(111);
      } else if (type === 'broker') {
        // 删除中介经纪人逻辑
        console.log(222);
      }
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

    // 确认业绩申报
    confirmPerformance() {
      console.log('确认业绩申报');
      this.$router.push({
        path: "/dealReport/achieveAllotEntry",
        query: {id: this.id},
      });
    }
  }
</script>
<style lang="scss" scoped>
  .ih-info-item-left,
  .ih-info-item-right {
    line-height: 40px;
  }

  .info-btn-list {
    float: left;
    margin-left: 150px;
    margin-top: -25px;
  }

  .checkbox-align {
    text-align: left;
  }

  .link-pro-wrapper {
    width: 100%;

    .el-button, .el-tag {
      margin-right: 10px;
    }
  }

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
</style>
