<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-07 14:32:16
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-29 20:53:55
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
    :title="`查看收派套餐`"
    :append-to-body="true"
  >
    <p class="ih-info-title">基础信息</p>
    <el-form
      ref="form"
      :model="info"
      label-width="80px"
      class="margin-left-20"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="套餐名称"
            prop="packageName"
          >
            <span class="text-ellipsis">{{ info.packageName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="物业类型"
            prop='propertyEnum'
          >
            <span class="text-ellipsis">{{ $root.dictAllName(info.propertyEnum, "Property") }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="基准费用"
            prop="baseCostEnum"
          >
            <span class="text-ellipsis">{{ $root.dictAllName(info.baseCostEnum, "BaseCost") }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="有效时间"
            prop="timeList"
          >
            <span class="text-ellipsis">{{ info.startTime + '至' + info.endTime }}</span>
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

    <p class="ih-info-title">收派套餐</p>
    <el-form
      :model="info"
      label-width="90px"
      class="margin-left-20"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="假定成交价">
            <span class="text-ellipsis">{{
              info.estimatedTransactionPrice + '万元/套'
            }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
              <div class="msg-left">
                <div class="title">服务费</div>
                <div style="display: flex;align-items: center">
                  <div style="width: 120px">是否免收服务费:</div>
                  <div>{{item.exVoidService?'是': '否'}}</div>
                </div>
              </div>
            </div>
            <el-table
              class="ih-table"
              :data="item.colletionandsendDetails"
              style="width: 100%"
              max-height="300"
            >
              <el-table-column
                prop="subdivideEnum"
                label="细分业务模式"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <span>{{row.subdivideEnum ? $root.dictAllName(row.subdivideEnum, "Subdivide") : '-'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contractEnum"
                label="合同类型"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <span>{{row.contractEnum ? $root.dictAllName(row.contractEnum, "ContType") : '-'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="transactionEnum"
                label="渠道类型"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{row.transactionEnum ? $root.dictAllName(row.transactionEnum, "Transaction") : '-'}}</div>
                  <div
                    :title="row.consumerName"
                    v-if="row.transactionEnum === 'Appoint' || row.transactionEnum === 'Strategic'"
                  >{{row.consumerName ? row.consumerName : '-'}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="condition"
                label="条件"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <pre
                    class="text-ellipsis"
                    :title="row.condition"
                  >{{row.condition ? row.condition : '-'}}</pre>
                </template>
              </el-table-column>
              <el-table-column
                label="应收金额(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{`金额:` + row.receivableAmout || 0}}</div>
                  <div>{{`点数: ${row.receivablePoint || 0}%`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发佣金(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{`金额:` + row.sendAmount || 0}}</div>
                  <div>{{`点数: ${row.sendPoint || 0}%`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发内场奖励(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{`金额:` + row.sendInAmount || 0}}</div>
                  <div>{{`点数: ${row.sendInPoint || 0}%`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="总包业绩(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{`金额:` + row.generalAchieveAmount || 0}}</div>
                  <div>{{`点数: ${row.generalAchievePoint || 0}%`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="分销业绩(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{`金额:` + row.distributeAchieveAmount || 0}}</div>
                  <div>{{`点数: ${row.distributeAchievePoint || 0}%`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="其他渠道费用(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <span>{{`金额:` + row.otherChannelAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="预计成交套数"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <span>{{row.estimateComplateNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="预计成交房款"
                width="120"
                align="center"
                prop="estimateComplateAmount"
              >
              </el-table-column>
              <el-table-column
                label="预计应收金额"
                width="120"
                align="center"
                prop="estimateReceiveAmount"
              >
              </el-table-column>
              <el-table-column
                label="备注"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <span>{{row.remark ? row.remark : '-'}}</span>
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
                <el-input
                  placeholder="请选择甲方公司名称"
                  v-model="item.partyCompany"
                  class="input-with-select margin-left-10"
                  readonly
                  :title="item.partyCompany"
                >
                </el-input>
              </div>
            </div>
            <el-table
              class="ih-table"
              :data="item.colletionandsendDetails"
              style="width: 100%"
              max-height="300"
            >
              <el-table-column
                prop="subdivideEnum"
                label="业务模式"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <span>{{row.subdivideEnum ? $root.dictAllName(row.subdivideEnum, "Subdivide") : '-'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contractEnum"
                label="合同类型"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <span>{{row.contractEnum ? $root.dictAllName(row.contractEnum, "ContType") : '-'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="transactionEnum"
                label="渠道类型"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{row.transactionEnum ? $root.dictAllName(row.transactionEnum, "Transaction") : '-'}}</div>
                  <div
                    :title="row.consumerName"
                    v-if="row.transactionEnum === 'Appoint' || row.transactionEnum === 'Strategic'"
                  >{{row.consumerName ? row.consumerName : '-'}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="condition"
                label="条件"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <pre
                    class="text-ellipsis"
                    :title="row.condition"
                  >{{row.condition ? row.condition : '-'}}</pre>
                </template>
              </el-table-column>
              <el-table-column
                prop="padCommissionEnum"
                label="垫佣周期"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <span>{{row.padCommissionEnum ? $root.dictAllName(row.padCommissionEnum, "PadCommission") : '-'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="应收金额(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{`金额:` + row.receivableAmout || 0}}</div>
                  <div>{{`点数: ${row.receivablePoint || 0}%`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发佣金(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{`金额:` + row.sendAmount || 0}}</div>
                  <div>{{`点数: ${row.sendPoint || 0}%`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="派发内场奖励(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{`金额:` + row.sendInAmount || 0}}</div>
                  <div>{{`点数: ${row.sendInPoint || 0}%`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="总包业绩(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{`金额:` + row.generalAchieveAmount || 0}}</div>
                  <div>{{`点数: ${row.generalAchievePoint || 0}%`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="分销业绩(元)"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>{{`金额:` + row.distributeAchieveAmount || 0}}</div>
                  <div>{{`点数: ${row.distributeAchievePoint || 0}%`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="预计成交套数"
                width="150"
                align="center"
              >
                <template v-slot="{ row }">
                  <span>{{row.estimateComplateNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="预计成交房款"
                width="120"
                align="center"
                prop="estimateComplateAmount"
              >
                <!-- <template v-slot="{ row }">
                  <span>
                    {{estimateComplateAmount(row)}}
                  </span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="预计应收金额"
                width="120"
                align="center"
                prop="estimateReceiveAmount"
              >
                <!-- <template v-slot="{ row }">
                  <span>
                    {{estimateReceiveAmount(row)}}
                  </span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="备注"
                width="200"
                align="center"
              >
                <template v-slot="{ row }">
                  <span>{{row.remark ? row.remark : '-'}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { get_collectandsend_get__packageId } from "@/api/project/index";
@Component({
  components: {},
})
export default class SetMealEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

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

  cancel() {
    this.$emit("cancel", false);
  }
  async created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.data.id;
    if (id) {
      const res = await get_collectandsend_get__packageId({
        packageId: id,
      });
      this.info = (this.$tool as any).deepClone(res);
    }
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
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
}
.msg-left {
  width: 210px;
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