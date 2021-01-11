<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-09 16:17:09
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-09 16:21:00
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    class="condition text-left"
    :append-to-body="true"
    title="请佣条件详情"
  >
    <el-form
      ref="form"
      label-width="70px"
      :model="info"
    >
      <el-row>
        <el-col :span="24">
          <div class="condition-item flex">
            <el-form-item label="名称">
              <span class="text-ellipsis">{{ info.settleName }}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <div style="border-top: 1px solid #E4E7ED;margin-top:20px;padding-top:15px">
        <div class="condition-title">满足条件</div>
        <template v-for="(item, i) in info.settleConditionPleaseVOS">
          <el-row :key="i">
            <el-col :span="24">
              <div class="condition-item">
                <div style="width: 100px;display: inline-block">
                  <el-checkbox
                    :label="item.conditionModel"
                    v-model="item.checkboxed"
                    disabled
                  >{{$root.dictAllName(item.conditionModel, 'ConditionPlease')}}
                  </el-checkbox>
                </div>
                <div
                  v-if="item.checkboxed && item.enumType && !['ContractType', 'ExRecode', 'PadCommission'].includes(item.conditionModel)"
                  class="condition-list"
                >
                  <el-checkbox-group
                    v-model="item.values"
                    v-if="item.conditionModel === 'Property'"
                    disabled
                  >
                    <el-checkbox
                      :label="list.propertyEnum"
                      v-for="(list, h) in PropertyOptions"
                      :key="h"
                    >{{list.propertyName}}</el-checkbox>
                  </el-checkbox-group>
                  <el-checkbox-group
                    v-model="item.values"
                    v-else
                    disabled
                  >
                    <el-checkbox
                      :label="list.code"
                      v-for="(list, h) in $root.dictAllList(item.enumType)"
                      :key="h"
                    >{{list.name}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <span v-if="
                item.checkboxed &&
                (item.conditionModel === 'Area'
                || item.conditionModel === 'DealTotalSets'
                || item.conditionModel === 'DealTotalAmount')">
                  <el-select
                    class="margin-left-20"
                    style="width: 15%"
                    v-model="item.compare"
                    disabled
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('Rule')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                  <el-input
                    class="margin-left-20"
                    v-model="item.conditionNumA"
                    style="width: 15%;"
                    disabled
                    v-digits="0"
                    :placeholder="$root.dictAllName(item.conditionModel, 'ConditionMarking')"
                  ></el-input>
                  <el-checkbox
                    v-if="item.isConditionAndShow"
                    :label="item.conditionAnd"
                    v-model="item.conditionAndCheckboxed"
                    class="margin-left-20"
                    disabled
                  >且
                  </el-checkbox>
                  <span v-if="item.conditionAndCheckboxed && item.isConditionAndShow">
                    <el-select
                      class="margin-left-20"
                      style="width: 15%"
                      v-model="item.compareB"
                      disabled
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in item.compareBList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                    <el-input
                      class="margin-left-20"
                      v-model="item.conditionNumB"
                      style="width: 20%"
                      disabled
                      v-digits="0"
                      :placeholder="$root.dictAllName(item.conditionModel, 'ConditionMarking')"
                    ></el-input>
                  </span>
                </span>
                <span v-if="item.checkboxed && item.conditionModel === 'Building'">
                  <el-select
                    v-model="item.mulitVal"
                    multiple
                    disabled
                    style="width: 70%"
                    class="margin-left-20"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, i) in budingList"
                      :key="i"
                      :label="item.buildingName"
                      :value="item.buildingId"
                    >
                    </el-option>
                  </el-select>
                </span>
                <span v-if="item.checkboxed && item.conditionModel === 'PartyACompany'">
                  <div
                    class="margin-left-20"
                    style="display: inline-block;width: 70%"
                  >
                    <IhSelectPageByDeveloper
                      multiple
                      disabled
                      value-key="id"
                      v-model="item.mulitVal"
                    ></IhSelectPageByDeveloper>
                  </div>
                </span>
                <span v-if="item.checkboxed && (item.conditionModel === 'ContractType' || item.conditionModel === 'ExRecode')">
                  <el-select
                    class="margin-left-20"
                    style="width: 15%"
                    v-model="item.simpleVal"
                    disabled
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in $root.dictAllList(item.enumType)"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </span>
                <span v-if="item.checkboxed && (item.conditionModel === 'PadCommission')">
                  <el-select
                    class="margin-left-20"
                    style="width: 15%"
                    v-model="item.simpleVal"
                    clearable
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="item in padCommissionEnumOptions"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                  <span style="color: red;margin-left:50px">注：结算方式没有勾选代理费时不可选择此项</span>
                </span>
                <span v-if="item.checkboxed && item.conditionModel === 'PaymentReturnRate'">
                  <el-input
                    class="margin-left-20"
                    style="width: 20%"
                    disabled
                    v-model="item.simpleVal"
                  ><template slot="append">%</template>
                  </el-input>
                </span>
              </div>
            </el-col>
          </el-row>
        </template>
      </div>
      <div style="border-top: 1px solid #E4E7ED;padding-top:15px">
        <div class="condition-title">结算方式</div>
        <el-row>
          <el-col :span="24">
            <div class="condition-item flex">
              <div style="width: 100px;display: inline-block">
                <el-checkbox
                  :label="info.agencyFee"
                  v-model="info.agencyFee"
                  disabled
                >代理费
                </el-checkbox>
              </div>
              <div
                class="flex margin-left-10"
                v-if="info.agencyFee"
              >
                <div style="width: 300px">代理费结算比例
                  <el-input
                    class="margin-left-20"
                    style="width: 50%"
                    disabled
                    v-model="info.agencyFeeSettleRate"
                  ><template slot="append">%</template>
                  </el-input>
                </div>
                <div style="width: 300px">代理费结算金额
                  <el-input
                    class="margin-left-20"
                    style="width: 40%"
                    disabled
                    v-model="info.agencyFeeSettleAmount"
                  ></el-input>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>

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
import {
  get_his_settleCondition_getPleaseType__proId,
  post_partyAContract_getBuilding__termId,
  post_his_settleCondition_getPlease__settleId,
} from "@/api/project/index";
@Component({
  components: {},
})
export default class PleaseEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  info: any = {
    settleName: null,
    agencyFee: 0,
    agencyFeeSettleAmount: null,
    agencyFeeSettleRate: null,
    agencyPadCommisionType: null,
    settleConditionPleaseVOS: [],
  };
  PropertyOptions: any = [];
  budingList: any = [];
  padCommissionEnumOptions: any = [];
  cancel() {
    this.$emit("cancel", false);
  }

  // 获取类型
  async getMakingType() {
    let obj: any = {};
    obj = await get_his_settleCondition_getPleaseType__proId({
      proId: this.data.proId,
    });
    this.PropertyOptions = obj.propertyVOS;
    this.info.settleConditionPleaseVOS = obj.settlePleaseListVOS.map(
      (v: any) => ({
        enumType: v.enumType,
        type: v.fieldEnum,
        compare: null,
        compareB: null,
        conditionAnd: null,
        conditionModel: v.conditionPleaseEnum,
        conditionNumA: null,
        conditionNumB: null,
        conditionSetId: null,
        designatedAgency: [],
        returnRateByHouse: null,
        values: [],
        checkboxed: false,
        conditionAndCheckboxed: false,
        compareBList: [],
        isConditionAndShow: true,
        mulitVal: [],
      })
    );
  }

  // 获取请佣详情
  async getMakingInfo() {
    const item = await post_his_settleCondition_getPlease__settleId({
      settleId: this.data.id,
    });
    const ruleEnumList = (this.$root as any).dictAllList("Rule");
    let info = item.settleConditionPleaseVOS.map((v: any) => {
      let arr: any = [];
      const list = ruleEnumList.find((j: any) => j.code === v.compare);
      if (list) arr = list.tag?.split(",");
      return {
        ...v,
        checkboxed: true,
        conditionAndCheckboxed: v.conditionAnd ? true : false,
        isConditionAndShow: v.compare === "EQ" ? false : true,
        compareBList:
          v.compare === "EQ"
            ? []
            : arr.map((h: any) => ({
                code: h,
                name: (this.$root as any).dictAllName(h, "Rule"),
              })),
      };
    });
    this.info.settleConditionPleaseVOS.forEach((v: any, i: number) => {
      info.forEach((j: any) => {
        if (j.conditionModel === v.conditionModel) {
          this.$set(this.info.settleConditionPleaseVOS, i, { ...v, ...j });
        }
      });
    });
    this.info = {
      ...item,
      settleConditionPleaseVOS: this.info.settleConditionPleaseVOS,
    };
    this.info.agencyFee = item.agencyFee ? true : false;
  }

  // 获取栋座信息
  async getBuding() {
    this.budingList = await post_partyAContract_getBuilding__termId({
      termId: this.$route.query.id,
    });
  }

  async created() {
    await this.getMakingType();
    if (this.data.id) {
      this.getMakingInfo();
    }
    this.getBuding();
    this.padCommissionEnumOptions = [
      {
        code: "Veto",
        name: "否",
      },
      {
        code: this.data.padCommissionEnum,
        name: (this.$root as any).dictAllName(
          this.data.padCommissionEnum,
          "PadCommission"
        ),
      },
    ];
  }
}
</script>
<style lang="scss" scoped>
.condition {
  /deep/ .el-dialog {
    margin-top: 2vh !important;
  }

  /deep/ .el-dialog__body {
    padding: 10px 30px;
  }

  /deep/ .el-dialog__title {
    font-weight: bold;
  }

  /deep/ el-col {
    margin-bottom: 10px;
  }
  &-title {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 20px;
  }
  &-item {
    padding-bottom: 10px;
    height: 40px;
    line-height: 40px;
  }
  &-list {
    margin-left: 25px;
    display: inline-block;
  }
}

.flex {
  display: flex;
  justify-content: flex-start;
}
</style>