<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-11 15:36:42
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-20 14:36:16
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
      :rules="rules"
    >
      <el-row>
        <el-col :span="24">
          <div class="condition-item flex">
            <el-form-item
              label="名称"
              prop="settleName"
            >
              <el-input
                style="width: 70%"
                v-model="info.settleName"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <div style="border-top: 1px solid #E4E7ED;margin-top:20px;padding-top:15px">
        <div class="condition-title">满足条件</div>
        <template v-for="(item, i) in info.settleConditionPleaseVOS">
          <el-row :key="i">
            <el-col :span="24">
              <div
                class="condition-item"
                :class="{PartyACompany: item.checkboxed && ['Building', 'PartyACompany'].includes(item.conditionModel)}"
              >
                <div style="width: 100px;display: inline-block">
                  <el-checkbox
                    :label="item.conditionModel"
                    v-model="item.checkboxed"
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
                    clearable
                    placeholder="请选择"
                    @change="compareChange(item.compare, i)"
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
                    clearable
                    v-digits="0"
                    :placeholder="$root.dictAllName(item.conditionModel, 'ConditionMarking')"
                  ></el-input>
                  <el-checkbox
                    v-if="item.isConditionAndShow"
                    :label="item.conditionAnd"
                    v-model="item.conditionAndCheckboxed"
                    class="margin-left-20"
                  >且
                  </el-checkbox>
                  <span v-if="item.conditionAndCheckboxed && item.isConditionAndShow">
                    <el-select
                      class="margin-left-20"
                      style="width: 15%"
                      v-model="item.compareB"
                      clearable
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
                      clearable
                      v-digits="0"
                      :placeholder="$root.dictAllName(item.conditionModel, 'ConditionMarking')"
                    ></el-input>
                  </span>
                </span>
                <span v-if="item.checkboxed && item.conditionModel === 'Building'">
                  <el-select
                    v-model="item.mulitVal"
                    multiple
                    style="width: 200%"
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
                  <div class="margin-left-20">
                    <!-- <IhSelectPageByDeveloper
                      multiple
                      value-key="id"
                      :params="searchParams"
                      v-model="item.mulitVal"
                    ></IhSelectPageByDeveloper> -->
                    <el-select
                      v-model="item.mulitVal"
                      multiple
                      style="width: 200%"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, i) in developerList"
                        :key="i"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </span>
                <span v-if="item.checkboxed && (item.conditionModel === 'ContractType' || item.conditionModel === 'ExRecode')">
                  <el-select
                    class="margin-left-20"
                    style="width: 15%"
                    v-model="item.simpleVal"
                    clearable
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
                    :disabled="agencyDisabled"
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
                    v-digits="2"
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
                  :disabled="agencyFeeDisabled"
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
                    v-digits="2"
                    v-model="info.agencyFeeSettleRate"
                  ><template slot="append">%</template>
                  </el-input>
                </div>
                <div style="width: 300px">代理费结算金额
                  <el-input
                    class="margin-left-20"
                    style="width: 40%"
                    v-digits="2"
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
      <el-button
        type="primary"
        @click="finish()"
        :loading="finishLoading"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import {
  get_settleCondition_getPleaseType__termId,
  post_partyAContract_getBuilding__termId,
  post_settleCondition_getPlease__settleId,
  post_settleCondition_addPlease,
  post_settleCondition_updatePlease,
} from "@/api/project/index";
import { post_company_listAll } from "@/api/developer/index";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
@Component({
  components: {},
})
export default class PleaseEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  serviceFeeDisabled = false;
  agencyFeeDisabled = false;
  finishLoading = false;
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
  rules: any = {
    settleName: [
      {
        required: true,
        message: "请填写名称",
        trigger: "change",
      },
    ],
  };
  agencyDisabled: any = true;
  developerList: any = [];

  @Watch("data.chargeEnum", { immediate: true })
  isDisabled(val: any) {
    if (val === "Service") {
      this.serviceFeeDisabled = false;
      this.agencyFeeDisabled = true;
    } else if (val === "Agent") {
      this.serviceFeeDisabled = true;
      this.agencyFeeDisabled = false;
    } else {
      this.serviceFeeDisabled = false;
      this.agencyFeeDisabled = false;
    }
  }

  @Watch("info.agencyFee", { immediate: true })
  agencDisabled(val: any) {
    if (val) {
      this.agencyDisabled = false;
    } else {
      this.agencyDisabled = true;
    }
  }

  compareChange(data: any, i: number) {
    if (Object.keys(data).length) {
      if (data === "EQ") {
        this.info.settleConditionPleaseVOS[i].isConditionAndShow = false;
      } else {
        this.info.settleConditionPleaseVOS[i].isConditionAndShow = true;
        const ruleEnumList = (this.$root as any).dictAllList("Rule");
        const item = ruleEnumList.find((v: any) => v.code === data);
        let arr: any = [];
        arr = item.tag.split(",");
        this.info.settleConditionPleaseVOS[i].compareBList = arr.map(
          (v: any) => ({
            code: v,
            name: (this.$root as any).dictAllName(v, "Rule"),
          })
        );
      }
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
      this.finishLoading = true;
      let arr: any = [];
      arr = this.info.settleConditionPleaseVOS.filter(
        (v: any) => v.checkboxed === true
      );
      arr = arr.map((v: any) => {
        return {
          ...v,
          compare: v.compare,
          conditionAnd: v.conditionAndCheckboxed ? 1 : 0,
        };
      });
      arr.forEach((v: any) => {
        delete v.compareBList;
        delete v.checkboxed;
        delete v.conditionAndCheckboxed;
        delete v.isConditionAndShow;
      });
      let obj = {
        ...this.info,
        settleConditionPleaseVOS: arr,
        agencyFee: this.info.agencyFee ? 1 : 0,
      };
      obj.termId = this.$route.query.id;
      if (!this.data.id) {
        try {
          await post_settleCondition_addPlease(obj);
          this.$emit("finish");
          this.finishLoading = false;
          this.$message.success("新增成功");
        } catch (err) {
          this.finishLoading = false;
        }
      } else {
        try {
          obj.settleId = this.data.id;
          await post_settleCondition_updatePlease(obj);
          this.$message.success("修改成功");
          this.finishLoading = false;
          this.$emit("finish");
        } catch (err) {
          this.finishLoading = false;
        }
      }
    }
  }

  // 获取类型
  async getMakingType() {
    let obj: any = {};
    obj = await get_settleCondition_getPleaseType__termId({
      termId: this.$route.query.id,
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
    const item = await post_settleCondition_getPlease__settleId({
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

  // 获取渠道商信息
  async getDeveloper() {
    this.developerList = await post_company_listAll({
      name: "",
    });
  }

  async created() {
    await this.getMakingType();
    if (this.data.id) {
      this.getMakingInfo();
    }
    this.getBuding();
    this.getDeveloper();
    if (this.data.padCommissionEnum) {
      if (this.data.padCommissionEnum !== "Veto") {
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
      } else {
        this.padCommissionEnumOptions = [
          {
            code: "Veto",
            name: "否",
          },
        ];
      }
    } else {
      this.padCommissionEnumOptions = [
        {
          code: "Veto",
          name: "否",
        },
      ];
    }
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
.PartyACompany {
  display: flex;
  height: auto;
}
</style>