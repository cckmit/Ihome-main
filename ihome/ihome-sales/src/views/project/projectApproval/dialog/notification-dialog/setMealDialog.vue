<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-08 14:28:17
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-15 16:53:27
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="90%"
    class="setMeal text-left"
    :append-to-body="true"
  >
    <div>
      <p class="first-title">收派套餐</p>
      <el-table
        class="ih-table"
        :data="data"
        ref="multipleTable"
        style="width: 100%"
        @row-click="rowClick"
        @select="handleSelect"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="packageName"
          label="套餐名称"
        ></el-table-column>
        <el-table-column
          label="物业类型"
          prop="propertyEnum"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.propertyEnum, "Property")
          }}</template>
        </el-table-column>
        <el-table-column
          label="基准费用类型"
          width="120"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.baseCostEnum, "BaseCost")
          }}</template>
        </el-table-column>
        <el-table-column
          label="套餐有效时间"
          width="200"
        >
          <template v-slot="{ row }">
            {{row.startTime + '~' + row.endTime}}</template>
        </el-table-column>
        <el-table-column
          prop="estimatedTransactionPrice"
          label="假定成交均价(万元)"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="state"
          label="状态"
        >
          <template v-slot="{ row }">{{$root.dictAllName(row.state, 'Oper')}}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="view(row)"
            >显示详细收派标准</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="info.colletionandsendMxs.length">
      <div>
        <div class="info-list">
          <p class="first-title">详细收派标准</p>
          <span class="margin-left-20">假定成交均价:</span>
          <span class="text-ellipsis margin-left-10">{{
        info.estimatedTransactionPrice + '万元/套'
      }}</span>
        </div>
      </div>
      <!-- 详情信息 -->
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
                @selection-change="(data) => {map[i] = data}"
              >
                <el-table-column
                  fixed
                  type="selection"
                  width="50"
                  align="center"
                ></el-table-column>
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
                    <span>{{`金额:` + otherChannelAmount(row)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="预计成交套数"
                  width="150"
                  align="center"
                >
                  <template v-slot="{ row }">
                    <span>{{row.estimateComplateNum}}</span>
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
                  >
                  </el-input>
                </div>
              </div>
              <el-table
                class="ih-table"
                :data="item.colletionandsendDetails"
                style="width: 100%"
                @selection-change="(data) => {map[i] = data}"
              >
                <el-table-column
                  fixed
                  type="selection"
                  width="50"
                  align="center"
                ></el-table-column>
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
                    <span>{{row.remark ? row.remark : '-'}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </div>
      </div>
    </div>
    <ih-dialog :show="infoDialogVisible">
      <SetMealInfo
        :data="infoData"
        @cancel="() => (infoDialogVisible = false)"
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
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  post_collectandsend_getAllByStart,
  post_distributContract_getItemByCondition,
} from "@/api/project/index.ts";
import SetMealInfo from "../setMeal-dialog/info.vue";
@Component({
  components: {
    SetMealInfo,
  },
})
export default class SetMealDialog extends Vue {
  @Prop()
  searchdata!: any;
  dialogVisible = true;
  infoDialogVisible = false;
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
  infoData: any = {};
  data: any = [];
  map: any = {};
  selection: any = [];

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    let arr: any = [];
    if (Object.keys(this.map).length) {
      Object.keys(this.map).forEach((i: any) => {
        arr = arr.concat(this.map[i]);
      });
    }
    this.$emit("finish", arr);
  }

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
    return isNaN(computed) ? 0 : this.$math.tofixed(computed, 2);
  }

  estimateComplateAmount(row: any) {
    let total = 0;
    total =
      Number(this.info.estimatedTransactionPrice) *
      10000 *
      Number(row.estimateComplateNum);
    row.estimateComplateAmount = total;
    return isNaN(total) ? 0 : this.$math.tofixed(total, 2);
  }

  estimateReceiveAmount(row: any) {
    let total = 0;
    total =
      Number(row.receivableAmout) +
      Number(row.receivablePoint / 100) *
        Number(this.info.estimatedTransactionPrice) *
        10000;
    row.estimateReceiveAmount = total;
    return isNaN(total) ? 0 : this.$math.tofixed(total, 2);
  }

  view(data: any) {
    this.infoData.id = data.packageId;
    this.infoDialogVisible = true;
  }

  async created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.$route.query.id;
    if (id) {
      this.data = await post_collectandsend_getAllByStart({
        termId: id,
      });
    }
  }

  handleSelect(selection: any) {
    if (selection.length > 1) {
      let row = selection.pop();
      this.rowClick(row);
    } else if (selection.length === 1) {
      this.rowClick(selection[0]);
    }
  }

  async rowClick(row: any) {
    (this.$refs.multipleTable as any).clearSelection();
    (this.$refs.multipleTable as any).toggleRowSelection(row, true);
    let obj: any = {};
    obj.packageId = row.packageId;
    obj.padCommissionEnum = this.searchdata.padCommissionEnum;
    obj.channelEnum = this.searchdata.channelEnum;
    const res = await post_distributContract_getItemByCondition(obj);
    if (res) {
      this.info = (this.$tool as any).deepClone(res);
      if (this.info.colletionandsendMxs.length) {
        this.info.colletionandsendMxs.forEach(
          (i: any, n: number) => (this.map[n] = [])
        );
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.setMeal {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-dialog__body {
    padding: 0 20px 30px 20px;
  }
  /deep/ .el-table__header {
    .el-checkbox {
      display: none !important;
    }
  }
}
.first-title {
  font-size: 18px;
  font-weight: bold;
}
.info-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
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