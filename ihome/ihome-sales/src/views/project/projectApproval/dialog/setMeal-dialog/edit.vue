<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-04 09:40:47
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-05 18:51:29
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="90%"
    class="editDialog text-left"
    :title="(data.id ? '编辑' : '新增') + `收派套餐`"
  >
    <p class="ih-info-title">基础信息</p>
    <el-form
      ref="form"
      :model="info"
      :rules="rules"
      label-width="80px"
      class="margin-left-20"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="套餐名称"
            prop="packageName"
          >
            <el-input
              v-model="info.packageName"
              placeholder="套餐名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="物业类型"
            prop='propertyEnum'
          >
            <el-select
              style="width: 100%"
              v-model="info.propertyEnum"
              clearable
              placeholder="物业类型"
            >
              <el-option
                v-for="item in $root.dictAllList('PropertyEnum')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="基准费用"
            prop="baseCostEnum"
          >
            <el-select
              style="width: 100%"
              v-model="info.baseCostEnum"
              clearable
              placeholder="物业类型"
            >
              <el-option
                v-for="item in $root.dictAllList('BaseCostEnum')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="有效时间"
            prop="timeList"
          >
            <el-date-picker
              style="width:100%;"
              v-model="info.timeList"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="$root.pickerOptions"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="业务模式">
            <span
              class="text-ellipsis"
              :title="info.busEnum"
            >{{$root.dictAllName(info.busEnum, 'BusEnum')}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收费类型">
            <span
              class="text-ellipsis"
              :title="info.chargeEnum"
            >{{$root.dictAllName(info.chargeEnum, 'ChargeEnum')}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="setMeal">
      <p class="ih-info-title">收派套餐</p>
      <div class="setMealButton">
        <el-button
          size="small"
          type="success"
          @click="addTemplate"
        >增加模板</el-button>
      </div>
    </div>
    <div class="estimated">
      <el-form :model="info">
        <el-form-item label="假定成交价">
          <el-input
            v-digits="2"
            v-model="info.estimatedTransactionPrice"
            style="width:60%;"
          ><template slot="append">万元/套</template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div>

      <div>
        <template v-for="(item, i) in info.colletionandsendMxs">
          <!-- 服务费 -->
          <div
            :key="i"
            v-if="(info.chargeEnum === 'Service' || info.chargeEnum === 'ServiceAndAgent') && item.costTypeEnum === 'ServiceFee'"
          >
            <!-- 表头行选择 -->
            <div class="top-select">
              <!-- 服务费代理费 -->
              <div class="title">服务费</div>
              <!-- 删除模板,新增行 -->
              <div class="right-button">
                <el-button
                  type="danger"
                  size="small"
                  @click="delTemplate(i)"
                >删除模板</el-button>
                <el-button
                  type="success"
                  size="small"
                  @click="addRow(i)"
                >新增行</el-button>
              </div>
            </div>
            <el-table
              class="ih-table"
              :data="item.colletionandsendDetails"
              style="width: 100%"
            >
              <el-table-column
                prop="subdivideEnum"
                label="细分业务模式"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-select
                    style="width: 100%"
                    v-model="row.subdivideEnum"
                    clearable
                    :disabled="isSubdivideEnum"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('SubdivideEnum')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="contractEnum"
                label="合同类型"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-select
                    style="width: 100%"
                    v-model="row.contractEnum"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('ContractEnum')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="transactionEnum"
                label="客户类型"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-select
                    style="width: 100%"
                    v-model="row.transactionEnum"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('TransactionEnum')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="condition"
                label="条件"
                width="150"
                align="center"
              >
                <template v-slot="{ row, $index }">
                  <pre
                    class="text-ellipsis"
                    :title="row.condition"
                  >{{row.condition}}</pre>
                  <el-button
                    size="small"
                    @click="rulesDialog(row.collectandsendConditionVOS, i, $index)"
                  >编辑</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="应收金额(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model.number="row.receivableAmout"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      v-model.number="row.receivablePoint"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发佣金(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model.number="row.sendAmount"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      v-model.number="row.sendPoint"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发内场奖励(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model.number="row.sendInAmount"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      v-model.number="row.sendInPoint"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="总包业绩(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model.number="row.generalAchieveAmount"
                      v-digits="2"
                      clearable
                      :disabled="(info.busEnum === 'TotalBagDistriModel' || row.subdivideEnum === 'All') ? false : true"
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      v-model.number="row.generalAchievePoint"
                      v-digits="2"
                      clearable
                      :disabled="(info.busEnum === 'TotalBagDistriModel' || row.subdivideEnum === 'All') ? false : true"
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="分销业绩(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model.number="row.distributeAchieveAmount"
                      v-digits="2"
                      clearable
                      :disabled="row.subdivideEnum === 'All' ? true : false"
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      v-model.number="row.distributeAchievePoint"
                      v-digits="2"
                      clearable
                      :disabled="row.subdivideEnum === 'All' ? true : false"
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="其他渠道费用(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      :value="otherChannelAmount(row)"
                      v-digits="2"
                      disabled
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="预计成交套数"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-input
                    v-model.number="row.estimateComplateNum"
                    v-digits="0"
                    style="width: 80%"
                    placeholder="套数"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="预计成交房款"
                width="120"
                align="center"
                prop="estimateComplateAmount"
              >
                <template v-slot="{ row }">
                  <span>
                    {{estimateComplateAmount(row)}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="预计应收金额"
                width="120"
                align="center"
                prop="estimateReceiveAmount"
              >
                <template v-slot="{ row }">
                  <span>
                    {{estimateReceiveAmount(row)}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-input
                    v-model="row.remark"
                    style="width: 100%"
                    placeholder="备注"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="250"
                align="center"
              >
                <template v-slot="{ row, $index }">
                  <el-button
                    size="small"
                    type="primary"
                    @click="shiftUp(row, i, $index)"
                  >上移</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="shiftDown(row, i, $index)"
                  >下移</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="delRow(row, i, $index)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 代理费 -->
          <div
            :key="i"
            v-if="(info.chargeEnum === 'Agent' || info.chargeEnum === 'ServiceAndAgent') && item.costTypeEnum === 'AgencyFee'"
          >
            <br />
            <!-- 表头行选择 -->
            <div class="top-select">
              <!-- 服务费代理费 -->
              <div class="msg-left">
                <div class="title">代理费</div>
                <el-input
                  placeholder="请选择甲方公司名称"
                  v-model="item.partyCompany"
                  class="input-with-select margin-left-10"
                  readonly
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="businessDialogVisible = true;partyCompanyIndex = i;"
                  ></el-button>
                </el-input>
              </div>
              <!-- 删除模板,新增行 -->
              <div class="right-button">
                <el-button
                  type="danger"
                  size="small"
                  @click="delTemplate(i)"
                >删除模板</el-button>
                <el-button
                  type="success"
                  size="small"
                  @click="addRow(i)"
                >新增行</el-button>
              </div>
            </div>
            <el-table
              class="ih-table"
              :data="item.colletionandsendDetails"
              style="width: 100%"
            >
              <el-table-column
                prop="subdivideEnum"
                label="业务模式"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-select
                    style="width: 100%"
                    v-model="row.subdivideEnum"
                    clearable
                    :disabled="isSubdivideEnum"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('SubdivideEnum')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="contractEnum"
                label="合同类型"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-select
                    style="width: 100%"
                    v-model="row.contractEnum"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('ContractEnum')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="transactionEnum"
                label="客户类型"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-select
                    style="width: 100%"
                    v-model="row.transactionEnum"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('TransactionEnum')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="condition"
                label="条件"
                width="150"
                align="center"
              >
                <template v-slot="{ row, $index }">
                  <pre
                    class="text-ellipsis"
                    :title="row.condition"
                  >{{row.condition}}</pre>
                  <el-button
                    size="small"
                    @click="rulesDialog(row.collectandsendConditionVOS, i, $index)"
                  >编辑</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="padCommissionEnum"
                label="垫佣周期"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-select
                    style="width: 100%"
                    v-model="row.padCommissionEnum"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in padCommissionEnumOptions"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="应收金额(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model.number="row.receivableAmout"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      v-model.number="row.receivablePoint"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发佣金(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model.number="row.sendAmount"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      v-model.number="row.sendPoint"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发内场奖励(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model.number="row.sendInAmount"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      v-model.number="row.sendInPoint"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="总包业绩(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model.number="row.generalAchieveAmount"
                      v-digits="2"
                      clearable
                      :disabled="(info.busEnum === 'TotalBagDistriModel' || row.subdivideEnum === 'All') ? false : true"
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      v-model.number="row.generalAchievePoint"
                      v-digits="2"
                      clearable
                      :disabled="(info.busEnum === 'TotalBagDistriModel' || row.subdivideEnum === 'All') ? false : true"
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="分销业绩(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model.number="row.distributeAchieveAmount"
                      v-digits="2"
                      clearable
                      :disabled="row.subdivideEnum === 'All' ? true : false"
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      v-model.number="row.distributeAchievePoint"
                      v-digits="2"
                      clearable
                      :disabled="row.subdivideEnum === 'All' ? true : false"
                      style="width: 70%"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="预计成交套数"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-input
                    v-model.number="row.estimateComplateNum"
                    v-digits="0"
                    style="width: 80%"
                    placeholder="套数"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="预计成交房款"
                width="120"
                align="center"
                prop="estimateComplateAmount"
              >
                <template v-slot="{ row }">
                  <span>
                    {{estimateComplateAmount(row)}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="预计应收金额"
                width="120"
                align="center"
                prop="estimateReceiveAmount"
              >
                <template v-slot="{ row }">
                  <span>
                    {{estimateReceiveAmount(row)}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-input
                    v-model="row.remark"
                    style="width: 80%"
                    placeholder="备注"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="250"
                align="center"
              >
                <template v-slot="{ row, $index }">
                  <el-button
                    size="small"
                    type="primary"
                    @click="shiftUp(row, i, $index)"
                  >上移</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="shiftDown(row, i, $index)"
                  >下移</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="delRow(row, i, $index)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </div>
    </div>
    <ih-dialog :show="businessDialogVisible">
      <Business
        @cancel="() => (businessDialogVisible = false)"
        @finish="(data) => businessFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="rulesDialogVisible">
      <Rules
        :data="rulesData"
        @cancel="() => (rulesDialogVisible = false)"
        @finish="(data) => rulesFinish(data)"
      />
    </ih-dialog>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  get_collectandsend_get__packageId,
  get_collectandsend_getBaseTermByTermId__termId,
} from "@/api/project/index";
import Business from "../notification-dialog/channelBusiness.vue";
import Rules from "../setMeal-dialog/rules.vue";
@Component({
  components: {
    Business,
    Rules,
  },
})
export default class SetMealEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  businessDialogVisible = false;
  rulesDialogVisible = false;
  rulesData: any = [];
  isSubdivideEnum = false;
  busEnumType = "";

  info: any = {
    packageName: null,
    propertyEnum: null,
    baseCostEnum: null,
    timeList: null,
    busEnum: null,
    chargeEnum: null,
    estimatedTransactionPrice: null,
    colletionandsendMxs: [],
  };
  partyCompanyIndex = 0;
  conditionIndex = 0;
  conditionRowIndex = 0;
  padCommissionEnumOptions: any = [];
  rules: any = {
    packageName: [
      { required: true, message: "请输入套餐名称", trigger: "change" },
    ],
    propertyEnum: [
      { required: true, message: "请选择物业类型", trigger: "change" },
    ],
    baseCostEnum: [
      { required: true, message: "请选择基准费用", trigger: "change" },
    ],
    timeList: [
      { required: true, message: "请选择有效时间", trigger: "change" },
    ],
  };

  otherChannelAmount(row: any) {
    let total =
      Number(row.receivableAmout) +
      Number(row.receivablePoint / 100) *
        Number(this.info.estimatedTransactionPrice) *
        10000;
    let num1 =
      Number(row.sendAmount) +
      Number(row.sendPoint / 100) *
        Number(this.info.estimatedTransactionPrice) *
        10000;
    let num2 =
      Number(row.sendInAmount) +
      Number(row.sendInPoint / 100) *
        Number(this.info.estimatedTransactionPrice) *
        10000;
    let num3 =
      Number(row.generalAchieveAmount) +
      Number(row.generalAchievePoint / 100) *
        Number(this.info.estimatedTransactionPrice) *
        10000;
    let num4 =
      Number(row.distributeAchieveAmount) +
      Number(row.distributeAchievePoint / 100) *
        Number(this.info.estimatedTransactionPrice) *
        10000;
    let computed = total - (num1 + num2 + num3 + num4);
    row.otherChannelAmount = computed;
    return isNaN(computed) ? 0 : computed;
  }

  estimateComplateAmount(row: any) {
    let total = 0;
    total =
      Number(this.info.estimatedTransactionPrice) *
      10000 *
      Number(row.estimateComplateNum);
    row.estimateComplateAmount = total;
    return isNaN(total) ? 0 : total;
  }

  estimateReceiveAmount(row: any) {
    let total = 0;
    total =
      Number(row.receivableAmout) +
      Number(row.receivablePoint / 100) *
        Number(this.info.estimatedTransactionPrice) *
        10000;
    row.estimateReceiveAmount = total;
    return isNaN(total) ? 0 : total;
  }

  @Watch("info.busEnum", { immediate: true })
  getSubdivideEnum(v: any) {
    if (v === "TotalBagModel") {
      this.busEnumType = "All";
      this.isSubdivideEnum = true;
      this.info.colletionandsendMxs.forEach((v: any) => {
        v.colletionandsendDetails.forEach((j: any) => {
          j.subdivideEnum = "All";
        });
      });
    } else if (v === "DistriModel") {
      this.busEnumType = "District";
      this.isSubdivideEnum = true;
      this.info.colletionandsendMxs.forEach((v: any) => {
        v.colletionandsendDetails.forEach((j: any) => {
          j.subdivideEnum = "District";
        });
      });
    } else {
      this.busEnumType = "";
      this.isSubdivideEnum = false;
    }
  }

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.$emit("finish", this.info);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.data.id;
    if (id) {
      this.info = await get_collectandsend_get__packageId({
        packageId: id,
      });
      this.padCommissionEnumOptions = [
        {
          code: "Veto",
          name: "否",
        },
        {
          code: window.sessionStorage.getItem("padCommissionEnum"),
          name: (this.$root as any).dictAllName(
            window.sessionStorage.getItem("padCommissionEnum"),
            "PadCommissionEnum"
          ),
        },
      ];
    } else {
      const item = await get_collectandsend_getBaseTermByTermId__termId({
        termId: this.$route.query.id,
      });
      this.padCommissionEnumOptions = [
        {
          code: "Veto",
          name: "否",
        },
        {
          code: item.padCommissionEnum,
          name: (this.$root as any).dictAllName(
            item.padCommissionEnum,
            "PadCommissionEnum"
          ),
        },
      ];
      this.info.busEnum = item.busEnum;
      this.info.chargeEnum = item.chargeEnum;
      // this.info.busEnum = "TotalBagModel";
      // this.info.busEnum = "DistriModel";
      // 假数据
      // this.info.chargeEnum = "Service";
      this.info.colletionandsendMxs = [
        {
          colletionandsendDetails: [{}],
          costTypeEnum: "ServiceFee",
        },
        {
          colletionandsendDetails: [{}],
          costTypeEnum: "AgencyFee",
        },
      ];
    }
  }
  // 上移
  shiftUp(data: any, i: number, index: number) {
    if (index > 0) {
      this.info.colletionandsendMxs[i].colletionandsendDetails.splice(index, 1);
      this.info.colletionandsendMxs[i].colletionandsendDetails.splice(
        index - 1,
        0,
        data
      );
    } else {
      this.$message.warning("第一行不可再上移");
    }
  }

  // 下移
  shiftDown(data: any, i: number, index: number) {
    if (
      index + 1 <
      this.info.colletionandsendMxs[i].colletionandsendDetails.length
    ) {
      this.info.colletionandsendMxs[i].colletionandsendDetails.splice(index, 1);
      this.info.colletionandsendMxs[i].colletionandsendDetails.splice(
        index + 1,
        0,
        data
      );
    } else {
      this.$message.warning("最后一行不可再下移");
    }
  }

  // 删除行
  async delRow(data: any, i: number, index: number) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      this.info.colletionandsendMxs[i].colletionandsendDetails.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 增加模板
  async addTemplate() {
    if (this.info.chargeEnum === "ServiceAndAgent") {
      this.$confirm("请选择增加模板类型?", "提示", {
        confirmButtonText: "代理费模板",
        cancelButtonText: "服务费模板",
        confirmButtonClass: "addTemplateButton",
        cancelButtonClass: "addTemplateButton",
        distinguishCancelAndClose: true,
        type: "success",
        center: true,
        callback: (action) => {
          if (action === "cancel") {
            let item = this.info.colletionandsendMxs.map(
              (v: any) => v.costTypeEnum
            );
            if (item.includes("ServiceFee")) {
              this.$message.warning("服务费已存在,无需再增加");
              return;
            } else {
              this.info.colletionandsendMxs.unshift({
                colletionandsendDetails: [
                  {
                    subdivideEnum: this.busEnumType,
                  },
                ],
                costTypeEnum: "ServiceFee",
              });
            }
          } else if (action === "confirm") {
            this.info.colletionandsendMxs.push({
              colletionandsendDetails: [
                {
                  subdivideEnum: this.busEnumType,
                },
              ],
              costTypeEnum: "AgencyFee",
            });
          }
        },
      });
    } else if (this.info.chargeEnum === "Service") {
      let item = this.info.colletionandsendMxs.map((v: any) => v.costTypeEnum);
      if (item.includes("ServiceFee")) {
        this.$message.warning("服务费已存在,无需再增加");
        return;
      } else {
        this.info.colletionandsendMxs.unshift({
          colletionandsendDetails: [
            {
              subdivideEnum: this.busEnumType,
            },
          ],
          costTypeEnum: "ServiceFee",
        });
      }
    } else {
      this.info.colletionandsendMxs.push({
        colletionandsendDetails: [
          {
            subdivideEnum: this.busEnumType,
          },
        ],
        costTypeEnum: "AgencyFee",
      });
    }
  }

  // 删除模板
  async delTemplate(i: number) {
    try {
      await this.$confirm("是否确定删除模板?", "提示");
      this.info.colletionandsendMxs.splice(i, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (err) {
      console.log(err);
    }
  }

  // 删除行
  addRow(i: number) {
    this.info.colletionandsendMxs[i].colletionandsendDetails.push({
      collectandsendConditionVOS: [],
      condition: "",
      contractEnum: "",
      distributeAchieveAmount: "",
      distributeAchievePoint: "",
      estimateComplateAmount: "",
      estimateComplateNum: "",
      estimateReceiveAmount: "",
      generalAchieveAmount: "",
      generalAchievePoint: "",
      otherChannelAmount: "",
      otherChannelPoint: "",
      padCommissionEnum: "",
      receivableAmout: "",
      receivablePoint: "",
      remark: "",
      sendAmount: "",
      sendInAmount: "",
      sendInPoint: "",
      sendPoint: "",
      sort: "",
      subdivideEnum: this.busEnumType,
      transactionEnum: "",
    });
  }

  // 选择代理费公司
  businessFinish(data: any) {
    this.info.colletionandsendMxs[this.partyCompanyIndex].partyCompany =
      data[0].name;
    this.info.colletionandsendMxs[this.partyCompanyIndex].partyCompanyId =
      data[0].id;
    this.businessDialogVisible = false;
  }

  // 编辑条件
  rulesDialog(data: any, i: number, index: number) {
    this.rulesData = data;
    this.conditionIndex = i;
    this.conditionRowIndex = index;
    this.rulesDialogVisible = true;
  }

  // 编辑条件完成
  rulesFinish(data: any) {
    console.log(data, this.conditionIndex, this.conditionRowIndex);
    this.info.colletionandsendMxs[this.conditionIndex].colletionandsendDetails[
      this.conditionRowIndex
    ].collectandsendConditionVOS = data;
    // 条件文本信息
    this.info.colletionandsendMxs[this.conditionIndex].colletionandsendDetails[
      this.conditionRowIndex
    ].condition = "";
    this.rulesDialogVisible = false;
  }
}
</script>
<style lang="scss" scoped>
.editDialog {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px 10px 20px;
  }
}
.text-ellipsis {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.setMeal {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  float: left;
}
.setMealButton {
  margin: 5px 0 0 20px;
}
.estimated {
  margin-left: 20px;
  display: inline-block;
  /deep/ .el-form-item__error {
    margin-left: 80px;
  }
}

.top-select {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  .title {
    width: 100px;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    line-height: 40px;
  }
  .right-button {
    margin-top: 5px;
  }
}
.msg-left {
  width: 250px;
  padding: 0 10px;
  display: flex;
  justify-content: flex-start;
  .title {
    width: 130px;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    line-height: 40px;
  }
}
</style>
<style lang="scss">
.addTemplateButton {
  color: #fff !important;
  background-color: #9c3 !important;
  border-color: #9c3 !important;
}
</style>