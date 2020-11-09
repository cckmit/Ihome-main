<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-05 09:25:33
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-05 09:25:33
-->
<template>
  <ih-page class="text-left">
    <p class="ih-info-title">成交部分信息</p>
    <el-form
      label-width="130px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="成交报告编号">{{postData.dealCode}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目周期">{{postData.projectCycle}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务模式">{{postData.modelName}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同类型">{{postData.contType}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物业类型">{{postData.achievePropertyTypeList}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约价格">{{postData.signPrice}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交状态">{{postData.status}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业绩分配人">{{postData.alloter}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业绩分配日期">{{postData.allotDate}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="计算方式">
            <el-select
              v-model="postData.contType"
              clearable
              placeholder="计算方式">
              <el-option label="自动" value="auto"></el-option>
              <el-option label="手动" value="man"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p class="ih-info-title">收派金额</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getReceiveSummaries"
          :data="postData.receiveInfoList">
          <el-table-column
            prop="type"
            label="类型"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="partyACustomer"
            label="甲方/客户"
            min-width="120"
          ></el-table-column>
          <el-table-column prop="packageId" label="收派套餐" min-width="140">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.packageId"
                ref="inputSelect"
                class="input-select-wrapper"
                placeholder="收派套餐"
                prefix-icon="el-icon-search"
                @click.native.prevent="selectPackage(scope)"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="receiveAmount"
            label="应收金额"
            min-width="120"
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
          :data="postData.receiveAmountList">
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
    <p class="ih-info-title">中介信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="postData.agentInfoList">
          <el-table-column
            prop="modelName"
            label="中介公司名称"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="渠道等级"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="经纪人"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="contType"
            label="门店"
            min-width="120"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p class="ih-info-title">对外拆佣</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div class="add-all-wrapper">
          <el-button type="success" @click="handleAddCommission">增加拆佣项</el-button>
        </div>
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
              <el-input
                v-model="scope.row.commName"
                ref="inputSelect"
                class="input-select-wrapper"
                placeholder="拆佣名称"
                prefix-icon="el-icon-search"
                @click.native.prevent="selectCommName(scope)"/>
            </template>
          </el-table-column>
          <el-table-column prop="payee" label="收款方" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.payee" clearable placeholder="收款方"/>
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
          <el-table-column prop="amount" label="金额" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" clearable placeholder="金额"/>
            </template>
          </el-table-column>
          <el-table-column prop="partyACustomer" label="客户/甲方" min-width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.partyACustomer" placeholder="请选择">
                <el-option label="客户A" value="AA"></el-option>
                <el-option label="客户B" value="BB"></el-option>
                <el-option label="甲方A" value="CC"></el-option>
                <el-option label="甲方B" value="DD"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="备注" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remarks" clearable placeholder="备注"/>
            </template>
          </el-table-column>
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
    <p class="ih-info-title">平台费用</p>
    <div class="ih-type-wrapper">
      <div class="title">总包</div>
      <el-button type="success" @click="handleAddRole('total')">增加角色人</el-button>
    </div>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getAchieveSummaries"
          :data="postData.achieveTotalBagList">
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
          <el-table-column prop="type" label="主管" min-width="150">
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
          <el-table-column prop="type" label="经理" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.ManagerList.length > 0">
                <div v-for="list in scope.row.ManagerList" :key="list.id">
                  <span>{{list.ratio}}%</span>
                  <span>{{list.manager}}({{list.managerPosition}})</span>
                </div>
              </div>
              <div v-else>暂无信息</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="总监" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.DirectorList.length > 0">
                <div v-for="list in scope.row.DirectorList" :key="list.id">
                  <span>{{list.ratio}}%</span>
                  <span>{{list.manager}}({{list.managerPosition}})</span>
                </div>
              </div>
              <div v-else>暂无信息</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="deleteAchieveTotalBag(scope)"
              >删除
              </el-link>
              <el-dropdown trigger="click" style="margin-left: 15px">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native.prevent="editAchieveTotalBag(scope)"
                  >修改
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="ih-type-wrapper">
      <div class="title">分销</div>
      <el-button type="success" @click="handleAddRole('distri')">增加角色人</el-button>
    </div>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getAchieveSummaries"
          :data="postData.achieveDistriList">
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
          <el-table-column prop="type" label="主管" min-width="150">
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
          <el-table-column prop="type" label="经理" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.ManagerList.length > 0">
                <div v-for="list in scope.row.ManagerList" :key="list.id">
                  <span>{{list.ratio}}%</span>
                  <span>{{list.manager}}({{list.managerPosition}})</span>
                </div>
              </div>
              <div v-else>暂无信息</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="总监" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.DirectorList.length > 0">
                <div v-for="list in scope.row.DirectorList" :key="list.id">
                  <span>{{list.ratio}}%</span>
                  <span>{{list.manager}}({{list.managerPosition}})</span>
                </div>
              </div>
              <div v-else>暂无信息</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="deleteAchieveDistri(scope)"
              >删除
              </el-link>
              <el-dropdown trigger="click" style="margin-left: 15px">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native.prevent="editAchieveDistri(scope)"
                  >修改
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="text-center btn-top">
      <el-button type="info" @click="cancel()">取消</el-button>
      <el-button type="success" @click="save()">提交</el-button>
    </div>
    <ih-dialog :show="dialogAddReceivePackage" desc="选择收派套餐列表">
      <SelectReceivePackage
        :data="receiveData"
        @cancel="() => (dialogAddReceivePackage = false)"
        @finish="
            (data) => {
              dialogAddReceivePackage = false;
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddAgentCompany" desc="选择中介公司列表">
      <AgentCompanyList
        :data="receiveData"
        @cancel="() => (dialogAddAgentCompany = false)"
        @finish="
            (data) => {
              dialogAddAgentCompany = false;
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddRole" desc="选择角色用户列表">
      <SelectRole
        @cancel="() => (dialogAddRole = false)"
        @finish="
            (data) => {
              dialogAddRole = false;
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogEditDealAchieve" desc="修改成交业绩">
      <EditDealAchieve
        @cancel="() => (dialogEditDealAchieve = false)"
        @finish="
            (data) => {
              dialogEditDealAchieve = false;
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import SelectReceivePackage from "@/views/deal/dealReport/dialog/selectReceivePackage.vue";
  import AgentCompanyList from "@/views/deal/dealReport/dialog/agentCompanyList.vue";
  import SelectRole from "@/views/deal/dealReport/dialog/selectRole.vue";
  import EditDealAchieve from "@/views/deal/dealReport/dialog/editDealAchieve.vue";
  import {
    post_achieveScaleScheme_add,
    get_achieveScaleScheme_get__id,
    post_achieveScaleScheme_update
  } from "@/api/deal";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {SelectReceivePackage, AgentCompanyList, SelectRole, EditDealAchieve},
  })
  export default class AchieveAllotEntry extends Vue {
    postData: any = {
      dealCode: null,
      projectCycle: null,
      modelName: null,
      contType: null,
      achievePropertyTypeList: null,
      signPrice: null,
      status: null,
      alloter: null,
      allotDate: null,
      receiveInfoList: [
        {
          type: '服务费',
          partyACustomer: '客户AAA',
          packageId: '222',
          receiveAmount: 4000,
          commAmount: 1000,
          rewardAmount: 500,
          totalPackageAmount: 500,
          distributionAmount: 500,
          otherChannelFees: 500,
        }
      ], // 收派金额1
      receiveAmountList: [], // 收派金额2
      agentInfoList: [], // 中介信息
      commissionInfoList: [], // 对外拆佣
      achieveTotalBagList: [
        {
          SupervisorList: [],
          ManagerList: [],
          DirectorList: [],
        }
      ], // 平台费用 - 总包
      achieveDistriList: [
        {
          SupervisorList: [],
          ManagerList: [],
          DirectorList: [],
        }
      ], // 平台费用 - 分销
    };
    id: any = null;
    dialogAddReceivePackage: any = false;
    receiveData: any = null;
    dialogAddAgentCompany: any = false;
    dialogAddRole: any = false;
    dialogEditDealAchieve: any = false;

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

    // 选择收派套餐
    selectPackage(scope: any) {
      console.log('选择收派套餐', scope);
      this.dialogAddReceivePackage = true;
      this.receiveData = {
        type: 'service1',
        id: 123
      };
      // input失焦
      (this as any).$refs.inputSelect && (this as any).$refs.inputSelect.blur();
    }

    // 增加拆佣项
    handleAddCommission() {
      console.log('增加拆佣项');
      let obj = {};
      this.postData.commissionInfoList.push(obj);
    }

    // 选择拆佣名称
    selectCommName(scope: any) {
      console.log('选择收派套餐', scope);
      this.dialogAddAgentCompany = true;
      // input失焦
      (this as any).$refs.inputSelect && (this as any).$refs.inputSelect.blur();
    }

    // 增加角色人
    handleAddRole(type: any) {
      console.log('type', type);
      this.dialogAddRole = true;
      // total - 总包； distri - 分销
    }

    // 确定选择项目周期
    async finishAddProjectCycle(data: any) {
      console.log('data', data);
      // this.addTotalPackageList = data;
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

    // 删除总包平台费用
    deleteAchieveTotalBag(scope: any) {
      console.log('data', scope);
    }

    // 修改总包平台费用
    editAchieveTotalBag(scope: any) {
      console.log('data', scope);
      this.dialogEditDealAchieve = true;
    }

    // 删除分销平台费用
    deleteAchieveDistri(scope: any) {
      console.log('data', scope);
    }

    // 修改分销平台费用
    editAchieveDistri(scope: any) {
      console.log('data', scope);
      this.dialogEditDealAchieve = true;
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
          await post_achieveScaleScheme_update(this.postData);
          this.$message.success("编辑成功");
          this.$goto({
            path: "/dealReport/list",
          });
        } else {
          await post_achieveScaleScheme_add(this.postData);
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

  .input-select-wrapper {
    cursor: pointer;

    /deep/ .el-input__inner {
      cursor: pointer;
    }
  }
</style>
