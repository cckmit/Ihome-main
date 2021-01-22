<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-04 09:40:47
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-22 14:07:58
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
      ref="form1"
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
                v-for="item in propertyEnumOptions"
                :key="item.propertyEnum"
                :label="item.propertyName"
                :value="item.propertyEnum"
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
              placeholder="请选择基准费用"
            >
              <el-option
                v-for="item in $root.dictAllList('BaseCost')"
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
            >{{$root.dictAllName(info.busEnum, 'BusinessModel')}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收费类型">
            <span
              class="text-ellipsis"
              :title="info.chargeEnum"
            >{{$root.dictAllName(info.chargeEnum, 'Charge')}}</span>
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
      <el-form
        :model="info"
        :rules="rules"
        ref="form2"
      >
        <el-form-item
          label="假定成交价"
          prop="estimatedTransactionPrice"
        >
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
            v-if="(info.chargeEnum === 'Service' || info.chargeEnum === 'ServiAndAgen') && item.costTypeEnum === 'ServiceFee'"
          >
            <!-- 表头行选择 -->
            <div class="top-select">
              <!-- 服务费代理费 -->
              <div
                class="msg-left"
                style="width: 400px"
              >
                <div class="title">服务费</div>
                <div style="display: flex;align-items: center">
                  <div style="width: 160px">是否免收服务费</div>
                  <el-select
                    style="margin-left: 10px"
                    v-model="item.exVoidService"
                    clearable
                    placeholder="请选择"
                    @change="exVoidServiceChange(item.exVoidService, i)"
                  >
                    <el-option
                      v-for="item in YesOrNoType"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </div>
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
                    @change="subdivideEnumChange(row)"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('Subdivide')"
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
                    @change="contractEnumChange(row, 'click')"
                  >
                    <el-option
                      v-for="item in contractTypeOptions"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="transactionEnum"
                label="渠道类型"
                width="150"
                align="center"
              >
                <template v-slot="{ row, $index }">
                  <el-select
                    style="width: 100%"
                    v-model="row.transactionEnum"
                    clearable
                    placeholder="请选择"
                    @change="transactionEnumChange(row)"
                  >
                    <el-option
                      v-for="item in row.transactionEnumOptions"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                  <div
                    class="margin-top-5"
                    v-if="row.transactionEnum === 'Appoint' || row.transactionEnum === 'Strategic'"
                  >
                    <SelectPageByCondition
                      v-model="row.consumerId"
                      clearable
                      placeholder="请选择"
                      :params="searchConditon"
                      @changeOption="getChannelInfo(row.consumerId, i, $index)"
                    ></SelectPageByCondition>
                  </div>
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
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model="row.receivableAmout"
                      v-digits="2"
                      clearable
                      :disabled="item.exVoidService ? true: false"
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      @input="row.receivablePoint = numberChange(row.receivablePoint)"
                      class="point"
                      style="width: 70%"
                      v-model="row.receivablePoint"
                      v-digits="5"
                      clearable
                      :disabled="item.exVoidService ? true: false"
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发佣金(元)"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      :disabled="(row.transactionEnum === 'Natural' || row.transactionEnum === 'SelfChannel') ? true : false"
                      v-model="row.sendAmount"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      @input="row.sendPoint = numberChange(row.sendPoint)"
                      class="point"
                      style="width: 70%"
                      :disabled="(row.transactionEnum === 'Natural' || row.transactionEnum === 'SelfChannel') ? true : false"
                      v-model="row.sendPoint"
                      v-digits="5"
                      clearable
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发内场奖励(元)"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model="row.sendInAmount"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      @input="row.sendInPoint = numberChange(row.sendInPoint)"
                      class="point"
                      style="width: 70%"
                      v-model="row.sendInPoint"
                      v-digits="5"
                      clearable
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="总包业绩(元)"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model="row.generalAchieveAmount"
                      v-digits="2"
                      clearable
                      :class="{'is-disabled': generalAchieveAmountDisabled(row)}"
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      @input="row.generalAchievePoint = numberChange(row.generalAchievePoint)"
                      class="point"
                      style="width: 70%"
                      v-model="row.generalAchievePoint"
                      v-digits="5"
                      clearable
                      :class="{'is-disabled': generalAchieveAmountDisabled(row)}"
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="分销业绩(元)"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model="row.distributeAchieveAmount"
                      v-digits="2"
                      clearable
                      :class="{'is-disabled': distributeAchieveAmountDisabled(row)}"
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      @input="row.distributeAchievePoint = numberChange(row.distributeAchievePoint)"
                      class="point"
                      style="width: 70%"
                      v-model="row.distributeAchievePoint"
                      v-digits="5"
                      clearable
                      :class="{'is-disabled': distributeAchieveAmountDisabled(row)}"
                    >
                      <template slot="append">%</template>
                    </el-input>
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
                    v-model="row.estimateComplateNum"
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
            v-if="(info.chargeEnum === 'Agent' || info.chargeEnum === 'ServiAndAgen') && item.costTypeEnum === 'AgencyFee'"
          >
            <br />
            <!-- 表头行选择 -->
            <div class="top-select">
              <!-- 服务费代理费 -->
              <div class="msg-left">
                <div class="title">代理费</div>
                <el-select
                  v-model="item.partyCompanyId"
                  placeholder="请选择"
                  @change="selectCompany(item.partyCompanyId, i)"
                >
                  <el-option
                    v-for="item in info.partyAInfoList"
                    :key="item.companyId"
                    :label="item.companyName"
                    :value="item.companyId"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
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
                    @change="subdivideEnumChange(row)"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('Subdivide')"
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
                    @change="contractEnumChange(row, 'click')"
                  >
                    <el-option
                      v-for="item in contractTypeOptions"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="transactionEnum"
                label="渠道类型"
                width="150"
                align="center"
              >
                <template v-slot="{ row, $index }">
                  <el-select
                    style="width: 100%"
                    v-model="row.transactionEnum"
                    clearable
                    placeholder="请选择"
                    @change="transactionEnumChange(row)"
                  >
                    <el-option
                      v-for="item in row.transactionEnumOptions"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                  <div
                    class="margin-top-5"
                    v-if="row.transactionEnum === 'Appoint' || row.transactionEnum === 'Strategic'"
                  >
                    <SelectPageByCondition
                      v-model="row.consumerId"
                      clearable
                      placeholder="请选择"
                      :params="searchConditon"
                      @changeOption="getChannelInfo(row.consumerId, i, $index)"
                    ></SelectPageByCondition>
                  </div>
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
                    :disabled="padCommissionEnumOptions.length === 1"
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
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model="row.receivableAmout"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      @input="row.receivablePoint = numberChange(row.receivablePoint)"
                      class="point"
                      style="width: 70%"
                      v-model="row.receivablePoint"
                      v-digits="5"
                      clearable
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发佣金(元)"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      :disabled="(row.transactionEnum === 'Natural' || row.transactionEnum === 'SelfChannel') ? true : false"
                      v-model="row.sendAmount"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      @input="row.sendPoint = numberChange(row.sendPoint)"
                      class="point"
                      style="width: 70%"
                      :disabled="(row.transactionEnum === 'Natural' || row.transactionEnum === 'SelfChannel') ? true : false"
                      v-model="row.sendPoint"
                      v-digits="5"
                      clearable
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发内场奖励(元)"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model="row.sendInAmount"
                      v-digits="2"
                      clearable
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      @input="row.sendInPoint = numberChange(row.sendInPoint)"
                      class="point"
                      style="width: 70%"
                      v-model="row.sendInPoint"
                      v-digits="5"
                      clearable
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="总包业绩(元)"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model="row.generalAchieveAmount"
                      v-digits="2"
                      clearable
                      :class="{'is-disabled': generalAchieveAmountDisabled(row)}"
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      @input="row.generalAchievePoint = numberChange(row.generalAchievePoint)"
                      class="point"
                      style="width: 70%"
                      v-model="row.generalAchievePoint"
                      v-digits="5"
                      clearable
                      :class="{'is-disabled': generalAchieveAmountDisabled(row)}"
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="分销业绩(元)"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    金额:
                    <el-input
                      v-model="row.distributeAchieveAmount"
                      v-digits="2"
                      clearable
                      :class="{'is-disabled': distributeAchieveAmountDisabled(row)}"
                      style="width: 70%"
                    />
                  </div>
                  <div class="margin-top-5">
                    点数:
                    <el-input
                      @input="row.distributeAchievePoint = numberChange(row.distributeAchievePoint)"
                      class="point"
                      style="width: 70%"
                      v-model="row.distributeAchievePoint"
                      v-digits="5"
                      clearable
                      :class="{'is-disabled': distributeAchieveAmountDisabled(row)}"
                    >
                      <template slot="append">%</template>
                    </el-input>
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
                    v-model="row.estimateComplateNum"
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
        :loading='finishLoading'
        @click="finish()"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
// import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  get_collectandsend_get__packageId,
  get_collectandsend_getBaseTermByTermId__termId,
  post_collectandsend_createConditionDescribe,
  post_collectandsend_add,
  post_collectandsend_update,
} from "@/api/project/index";
import { post_buModelContType_get } from "@/api/deal/index";
import SelectPageByCondition from "@/components/SelectPageByCondition.vue";
import Rules from "../setMeal-dialog/rules.vue";
@Component({
  components: {
    SelectPageByCondition,
    Rules,
  },
})
export default class SetMealEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  rulesDialogVisible = false;
  rulesData: any = [];
  isSubdivideEnum = false;
  busEnumType = "";
  searchConditon: any = {};
  finishLoading = false;
  info: any = {
    packageName: null,
    propertyEnum: null,
    baseCostEnum: null,
    timeList: null,
    busEnum: null,
    chargeEnum: null,
    estimatedTransactionPrice: null,
    colletionandsendMxs: [],
    partyAInfoList: [],
  };
  partyAInfoList: any = [];
  partyCompanyIndex = 0;
  conditionIndex = 0;
  conditionRowIndex = 0;
  padCommissionEnumOptions: any = [];
  contractTypeOptions: any = [];
  propertyEnumOptions: any = [];
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
    estimatedTransactionPrice: [
      {
        required: true,
        message: "请输入假定成交价",
        trigger: "change",
      },
    ],
  };

  YesOrNoType = [
    {
      code: 1,
      name: "是",
    },
    {
      code: 0,
      name: "否",
    },
  ];

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
    let computed =
      (isNaN(total) ? 0 : total) -
      ((isNaN(num1) ? 0 : num1) +
        (isNaN(num2) ? 0 : num2) +
        (isNaN(num3) ? 0 : num3) +
        (isNaN(num4) ? 0 : num4));
    row.otherChannelAmount = computed;
    return isNaN(computed) ? 0 : this.strip(computed);
  }

  estimateComplateAmount(row: any) {
    let total = 0;
    total =
      Number(
        isNaN(this.info.estimatedTransactionPrice)
          ? 0
          : this.info.estimatedTransactionPrice
      ) *
      10000 *
      Number(isNaN(row.estimateComplateNum) ? 0 : row.estimateComplateNum);
    row.estimateComplateAmount = total;
    return isNaN(total) ? 0 : this.strip(total);
  }

  estimateReceiveAmount(row: any) {
    let total = 0;
    total =
      Number(isNaN(row.receivableAmout) ? 0 : row.receivableAmout) +
      Number((isNaN(row.receivablePoint) ? 0 : row.receivablePoint) / 100) *
        Number(
          isNaN(this.info.estimatedTransactionPrice)
            ? 0
            : this.info.estimatedTransactionPrice
        ) *
        10000;
    row.estimateReceiveAmount = total;
    return isNaN(total) ? 0 : this.strip(total);
  }

  strip(number: number, precision = 12) {
    return Number(parseFloat(number.toPrecision(precision)));
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
    if (this.info.busEnum) this.queryContractType();
  }

  @Watch("padCommissionEnumOptions", { immediate: true })
  isPadCommissionEnum(v: any) {
    if (v.length === 1) {
      this.info.colletionandsendMxs.forEach((v: any) => {
        v.colletionandsendDetails.forEach((j: any) => {
          j.padCommissionEnum = "Veto";
        });
      });
    }
  }

  // 总包业绩
  generalAchieveAmountDisabled(row: any) {
    const TotalBagModel = this.info.busEnum === "TotalBagModel"; // 周期模式总包
    const DistriModel = this.info.busEnum === "DistriModel"; // 周期模式分销
    const TotalBagDistrModel = this.info.busEnum === "TotalBagDistrModel"; // 周期模式总包+分销
    const All = row.subdivideEnum === "All"; // 细分模式为总包
    const District = row.subdivideEnum === "District"; // 细分模式为分销
    return (
      !((TotalBagModel || TotalBagDistrModel) && All) &&
      DistriModel &&
      District &&
      !(TotalBagDistrModel && District)
    );
  }

  // 分销业绩
  distributeAchieveAmountDisabled(row: any) {
    const TotalBagModel = this.info.busEnum === "TotalBagModel"; // 周期模式总包
    const DistriModel = this.info.busEnum === "DistriModel"; // 周期模式分销
    const TotalBagDistrModel = this.info.busEnum === "TotalBagDistrModel"; // 周期模式总包+分销
    const All = row.subdivideEnum === "All"; // 细分模式为总包
    const District = row.subdivideEnum === "District"; // 细分模式为分销
    return (
      (TotalBagModel || TotalBagDistrModel) &&
      All &&
      !(DistriModel && District) &&
      !(TotalBagDistrModel && District)
    );
  }

  exVoidServiceChange(data: any, index: number) {
    if (data) {
      this.info.colletionandsendMxs[index].colletionandsendDetails.forEach(
        (v: any) => {
          v.receivablePoint = 0;
          v.receivableAmout = 0;
        }
      );
    }
  }

  selectCompany(v: any, i: number) {
    if (v) {
      const item = this.info.partyAInfoList.find((j: any) => j.companyId === v);
      this.info.colletionandsendMxs[i].partyCompanyId = v;
      this.info.colletionandsendMxs[i].partyCompany = item.companyName;
      let arr: any = [];
      this.info.colletionandsendMxs.forEach((j: any) => {
        if (j.partyCompanyId) arr.push(j.partyCompanyId);
      });
      this.info.partyAInfoList = this.partyAInfoList.map((h: any) => {
        if (arr.includes(h.companyId)) {
          return {
            ...h,
            disabled: true,
          };
        } else {
          return {
            ...h,
            disabled: false,
          };
        }
      });
    }
  }

  cancel() {
    this.$emit("cancel", false);
  }
  async finish(): Promise<void> {
    let form1 = new Promise((resolve: (value: any) => void) => {
      (this.$refs["form1"] as ElForm).validate((val) => {
        resolve(val);
      });
    });
    let form2 = new Promise((resolve: (value: any) => void) => {
      (this.$refs["form2"] as ElForm).validate((val) => {
        resolve(val);
      });
    });
    Promise.all([form1, form2]).then(async (value) => {
      if (value[0] && value[1]) {
        this.submit();
      }
    });
  }
  async submit() {
    this.finishLoading = true;
    this.info.startTime = this.info.timeList[0];
    this.info.endTime = this.info.timeList[1];
    this.info.colletionandsendMxs.forEach((v: any) => {
      v.colletionandsendDetails = v.colletionandsendDetails.map(
        (j: any, h: number) => ({
          ...j,
          sort: h,
        })
      );
    });
    let obj = this.$tool.deepClone(this.info);
    if (obj.chargeEnum === "Service") {
      obj.colletionandsendMxs = this.info.colletionandsendMxs.filter(
        (v: any) => v.costTypeEnum === "ServiceFee"
      );
    } else if (obj.chargeEnum === "Agent") {
      obj.colletionandsendMxs = this.info.colletionandsendMxs.filter(
        (v: any) => v.costTypeEnum === "AgencyFee"
      );
    }
    obj.termId = this.$route.query.id;
    if (this.data.id) {
      obj.packageId = this.data.id;
      try {
        await post_collectandsend_update(obj);
        this.finishLoading = false;
        this.$emit("finish");
      } catch (err) {
        this.finishLoading = false;
      }
    } else {
      try {
        await post_collectandsend_add(obj);
        this.finishLoading = false;
        this.$emit("finish");
      } catch (err) {
        this.finishLoading = false;
      }
    }
  }

  numberChange(val: any) {
    if (0 <= val && val <= 100) {
      return val;
    } else {
      return val > 100 ? 100 : 0;
    }
  }

  async created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.data.id;
    if (id) {
      const res: any = await get_collectandsend_get__packageId({
        packageId: id,
      });
      this.searchConditon = {
        cycleCity: res.city,
        departmentOrgId: res.startDivisionId,
      };
      if (res.padCommissionEnum !== "Veto") {
        this.padCommissionEnumOptions = [
          {
            code: "Veto",
            name: "否",
          },
          {
            code: res.padCommissionEnum,
            name: (this.$root as any).dictAllName(
              res.padCommissionEnum,
              "PadCommission"
            ),
          },
        ];
      } else {
        this.padCommissionEnumOptions = [
          {
            code: "Veto",
            name: "否",
          },
        ];
      }
      this.propertyEnumOptions = res.propertyDropDowm;
      this.info = (this.$tool as any).deepClone(res);
      this.info.timeList = [this.info.startTime, this.info.endTime];
      this.info.partyAInfoList = [...res.partyAInfoList];
      this.partyAInfoList = [...res.partyAInfoList];
      let arr: any = [];
      this.info.colletionandsendMxs.forEach((v: any) => {
        if (v.partyCompanyId) arr.push(v.partyCompanyId);
        v.colletionandsendDetails.forEach((j: any) => {
          this.contractEnumChange(j, "");
        });
      });
      this.info.partyAInfoList = this.partyAInfoList.map((h: any) => {
        if (arr.includes(h.companyId)) {
          return {
            ...h,
            disabled: true,
          };
        } else {
          return {
            ...h,
            disabled: false,
          };
        }
      });
    } else {
      const item: any = await get_collectandsend_getBaseTermByTermId__termId({
        termId: this.$route.query.id,
      });
      this.searchConditon = {
        cycleCity: item.city,
        departmentOrgId: item.startDivisionId,
      };
      this.propertyEnumOptions = item.propertyDropDowm;
      this.info.partyAInfoList = [...item.partyAInfoList];
      this.partyAInfoList = [...item.partyAInfoList];
      if (item.padCommissionEnum !== "Veto") {
        this.padCommissionEnumOptions = [
          {
            code: "Veto",
            name: "否",
          },
          {
            code: item.padCommissionEnum,
            name: (this.$root as any).dictAllName(
              item.padCommissionEnum,
              "PadCommission"
            ),
          },
        ];
      } else {
        this.padCommissionEnumOptions = [
          {
            code: "Veto",
            name: "否",
          },
        ];
      }
      this.info.busEnum = item.busEnum;
      this.info.chargeEnum = item.chargeEnum;
      if (item.termStart && item.termEnd) {
        this.info.timeList = [item.termStart, item.termEnd];
      } else {
        this.info.timeList = [];
      }
      // 假数据
      // 周期业务模式
      // this.info.busEnum = "TotalBagModel";
      // this.info.busEnum = "DistriModel";
      // this.info.busEnum = "TotalBagDistrModel";
      // 收费类型
      // this.info.chargeEnum = "Service";
      // this.info.chargeEnum = "Agent";
      // this.info.chargeEnum = "ServiAndAgen";
      this.info.colletionandsendMxs = [
        {
          colletionandsendDetails: [
            {
              collectandsendConditionVOS: [],
              condition: "",
              contractEnum: "",
              distributeAchieveAmount: 0,
              distributeAchievePoint: 0,
              estimateComplateAmount: 0,
              estimateComplateNum: 0,
              estimateReceiveAmount: 0,
              generalAchieveAmount: 0,
              generalAchievePoint: 0,
              otherChannelAmount: 0,
              otherChannelPoint: 0,
              receivableAmout: 0,
              receivablePoint: 0,
              remark: "",
              sendAmount: 0,
              sendInAmount: 0,
              sendInPoint: 0,
              sendPoint: 0,
              sort: "",
              subdivideEnum: this.busEnumType,
              transactionEnum: "",
            },
          ],
          costTypeEnum: "ServiceFee",
          exVoidService: "",
        },
        {
          colletionandsendDetails: [
            {
              collectandsendConditionVOS: [],
              condition: "",
              contractEnum: "",
              distributeAchieveAmount: 0,
              distributeAchievePoint: 0,
              estimateComplateAmount: 0,
              estimateComplateNum: 0,
              estimateReceiveAmount: 0,
              generalAchieveAmount: 0,
              generalAchievePoint: 0,
              otherChannelAmount: 0,
              otherChannelPoint: 0,
              padCommissionEnum:
                this.padCommissionEnumOptions.length === 1 ? "Veto" : "",
              receivableAmout: 0,
              receivablePoint: 0,
              remark: "",
              sendAmount: 0,
              sendInAmount: 0,
              sendInPoint: 0,
              sendPoint: 0,
              sort: "",
              subdivideEnum: this.busEnumType,
              transactionEnum: "",
            },
          ],
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
    let arr: any = [];
    arr = this.info.colletionandsendMxs.map((v: any) => v.costTypeEnum);
    // let serviceArr = arr.filter((v: any) => v === "Service");
    let agentArr = arr.filter((v: any) => v === "AgencyFee");
    if (this.info.chargeEnum === "ServiAndAgen") {
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
            if (arr.includes("ServiceFee")) {
              this.$message.warning("服务费已存在,无需再增加");
              return;
            } else {
              this.info.colletionandsendMxs.unshift({
                colletionandsendDetails: [
                  {
                    subdivideEnum: this.busEnumType,
                    collectandsendConditionVOS: [],
                    condition: "",
                    contractEnum: "",
                    distributeAchieveAmount: 0,
                    distributeAchievePoint: 0,
                    estimateComplateAmount: 0,
                    estimateComplateNum: 0,
                    estimateReceiveAmount: 0,
                    generalAchieveAmount: 0,
                    generalAchievePoint: 0,
                    otherChannelAmount: 0,
                    otherChannelPoint: 0,
                    receivableAmout: 0,
                    receivablePoint: 0,
                    remark: "",
                    sendAmount: 0,
                    sendInAmount: 0,
                    sendInPoint: 0,
                    sendPoint: 0,
                    sort: "",
                    transactionEnum: "",
                  },
                ],
                costTypeEnum: "ServiceFee",
                exVoidService: "",
              });
            }
          } else if (action === "confirm") {
            if (this.partyAInfoList.length > agentArr.length) {
              this.info.colletionandsendMxs.push({
                colletionandsendDetails: [
                  {
                    subdivideEnum: this.busEnumType,
                    collectandsendConditionVOS: [],
                    condition: "",
                    contractEnum: "",
                    distributeAchieveAmount: 0,
                    distributeAchievePoint: 0,
                    estimateComplateAmount: 0,
                    estimateComplateNum: 0,
                    estimateReceiveAmount: 0,
                    generalAchieveAmount: 0,
                    generalAchievePoint: 0,
                    otherChannelAmount: 0,
                    otherChannelPoint: 0,
                    padCommissionEnum:
                      this.padCommissionEnumOptions.length === 1 ? "Veto" : "",
                    receivableAmout: 0,
                    receivablePoint: 0,
                    remark: "",
                    sendAmount: 0,
                    sendInAmount: 0,
                    sendInPoint: 0,
                    sendPoint: 0,
                    sort: "",
                    transactionEnum: "",
                  },
                ],
                costTypeEnum: "AgencyFee",
              });
            } else {
              this.$message.warning("代理费模板已超过甲方个数,无法新增");
            }
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
              collectandsendConditionVOS: [],
              condition: "",
              contractEnum: "",
              distributeAchieveAmount: 0,
              distributeAchievePoint: 0,
              estimateComplateAmount: 0,
              estimateComplateNum: 0,
              estimateReceiveAmount: 0,
              generalAchieveAmount: 0,
              generalAchievePoint: 0,
              otherChannelAmount: 0,
              otherChannelPoint: 0,
              receivableAmout: 0,
              receivablePoint: 0,
              remark: "",
              sendAmount: 0,
              sendInAmount: 0,
              sendInPoint: 0,
              sendPoint: 0,
              sort: "",
              transactionEnum: "",
            },
          ],
          costTypeEnum: "ServiceFee",
          exVoidService: "",
        });
      }
    } else if (this.info.chargeEnum === "Agent") {
      if (this.partyAInfoList.length > agentArr.length) {
        this.info.colletionandsendMxs.push({
          colletionandsendDetails: [
            {
              subdivideEnum: this.busEnumType,
              collectandsendConditionVOS: [],
              condition: "",
              contractEnum: "",
              distributeAchieveAmount: 0,
              distributeAchievePoint: 0,
              estimateComplateAmount: 0,
              estimateComplateNum: 0,
              estimateReceiveAmount: 0,
              generalAchieveAmount: 0,
              generalAchievePoint: 0,
              otherChannelAmount: 0,
              otherChannelPoint: 0,
              padCommissionEnum:
                this.padCommissionEnumOptions.length === 1 ? "Veto" : "",
              receivableAmout: 0,
              receivablePoint: 0,
              remark: "",
              sendAmount: 0,
              sendInAmount: 0,
              sendInPoint: 0,
              sendPoint: 0,
              sort: "",
              transactionEnum: "",
            },
          ],
          costTypeEnum: "AgencyFee",
        });
      } else {
        this.$message.warning("代理费模板已超过甲方个数,无法新增");
      }
    } else {
      this.$message.warning("请先完善基础信息");
    }
  }

  // 删除模板
  async delTemplate(i: number) {
    try {
      await this.$confirm("是否确定删除模板?", "提示");
      // this.info.colletionandsendMxs[i].partyCompanyId = null;
      const item = this.info.colletionandsendMxs[i].partyCompanyId;
      this.info.partyAInfoList = this.info.partyAInfoList.map((v: any) => {
        if (v.companyId === item) {
          return {
            ...v,
            disabled: false,
          };
        } else {
          return {
            ...v,
          };
        }
      });
      this.info.colletionandsendMxs.splice(i, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (err) {
      console.log(err);
    }
  }

  // 新增行
  addRow(i: number) {
    this.info.colletionandsendMxs[i].colletionandsendDetails.push({
      collectandsendConditionVOS: [],
      condition: "",
      contractEnum: "",
      distributeAchieveAmount: 0,
      distributeAchievePoint: 0,
      estimateComplateAmount: 0,
      estimateComplateNum: 0,
      estimateReceiveAmount: 0,
      generalAchieveAmount: 0,
      generalAchievePoint: 0,
      otherChannelAmount: 0,
      otherChannelPoint: 0,
      padCommissionEnum:
        this.padCommissionEnumOptions.length === 1 ? "Veto" : "",
      receivableAmout: 0,
      receivablePoint: 0,
      remark: "",
      sendAmount: 0,
      sendInAmount: 0,
      sendInPoint: 0,
      sendPoint: 0,
      sort: "",
      subdivideEnum: this.busEnumType,
      transactionEnum: "",
    });
  }

  // 选择业务模式时清除行部分数据
  subdivideEnumChange(data: any) {
    if (data.subdivideEnum === "All") {
      data.distributeAchieveAmount = 0;
      data.distributeAchievePoint = 0;
    }
  }

  // 选择客户类型为自渠或自然到访时
  transactionEnumChange(data: any) {
    if (
      data.transactionEnum === "Natural" ||
      data.transactionEnum === "SelfChannel"
    ) {
      data.sendAmount = 0;
      data.sendPoint = 0;
    }
  }

  // 根据业务模式获取合同类型
  async queryContractType() {
    const item = await post_buModelContType_get({
      modelCode: this.info.busEnum,
    });
    this.contractTypeOptions = item.contTypeList.map((v: any) => ({
      code: v,
      name: (this.$root as any).dictAllName(v, "ContType"),
    }));
  }

  // 合同类型字典
  get contractDicts() {
    const list = (this.$root as any).dictAllList("Transaction");
    return list;
  }

  // 根据合同类型获取客户类型
  async contractEnumChange(row: any, type: any) {
    if (type) row.transactionEnum = "";
    let item: any = [];
    item = this.contractDicts.filter(
      (v: any) => v.tag.includes(row.contractEnum) && v.valid === "Valid"
    );
    row.transactionEnumOptions = item.map((v: any) => ({
      code: v.code,
      name: v.name,
    }));
  }

  // 选择代理费公司
  getChannelInfo(data: any, i: number, index: number) {
    this.$set(
      this.info.colletionandsendMxs[i].colletionandsendDetails[index],
      "consumerId",
      data
    );
  }

  // 编辑条件
  rulesDialog(data: any, i: number, index: number) {
    this.rulesData = data;
    this.conditionIndex = i;
    this.conditionRowIndex = index;
    this.rulesDialogVisible = true;
  }

  // 编辑条件完成
  async rulesFinish(data: any) {
    this.info.colletionandsendMxs[this.conditionIndex].colletionandsendDetails[
      this.conditionRowIndex
    ].collectandsendConditionVOS = data;
    // 条件文本信息
    const item = await post_collectandsend_createConditionDescribe(data);
    this.info.colletionandsendMxs[this.conditionIndex].colletionandsendDetails[
      this.conditionRowIndex
    ].condition = item;
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
.is-disabled {
  cursor: not-allowed !important;
  pointer-events: none;
  opacity: 0.5;
}

.point {
  /deep/ .el-input-group__append {
    padding: 0 3px;
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