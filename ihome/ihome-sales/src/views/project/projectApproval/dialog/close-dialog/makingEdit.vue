<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-09 20:12:21
 * @LastEditors: ywl
 * @LastEditTime: 2021-05-18 08:58:30
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
    title="结佣结算详情"
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
        <template v-for="(item, i) in info.settleConditionMakingVOS">
          <el-row :key="i">
            <el-col :span="24">
              <div
                class="condition-item"
                :class="{channelType: isShow && item.conditionModel === 'ChannelType'}"
              >
                <div style="width: 100px;display: inline-block">
                  <el-checkbox
                    :label="item.conditionModel"
                    v-model="item.checkboxed"
                  >{{$root.dictAllName(item.conditionModel, 'ConditionMarking')}}
                  </el-checkbox>
                </div>
                <div
                  v-if="item.checkboxed && item.enumType && !['ContractType', 'ExRecode', 'PadCommission'].includes(item.conditionModel)"
                  class="condition-list"
                >
                  <div>
                    <el-checkbox-group
                      v-if="item.conditionModel === 'Property'"
                      v-model="item.values"
                    >
                      <el-checkbox
                        :label="list.propertyEnum"
                        v-for="(list, h) in PropertyOptions"
                        :key="h"
                      >{{list.propertyName}}</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group
                      v-else
                      v-model="item.values"
                      @change="checkboxChange"
                    >
                      <el-checkbox
                        :label="list.code"
                        v-for="(list, h) in $root.dictAllList(item.enumType)"
                        :key="h"
                      >{{list.name}}</el-checkbox>
                    </el-checkbox-group>
                    <div
                      v-if="isShow && item.conditionModel === 'ChannelType'"
                      class="ChannelType"
                    >
                      <!-- <IhSelectPageByChannel
                        multiple
                        :params="searchParams"
                        value-key="id"
                        v-model="item.designatedAgency"
                      ></IhSelectPageByChannel> -->
                      <el-select
                        v-model="item.designatedAgency"
                        multiple
                        style="width: 100%"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item, i) in channelList"
                          :key="i"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>
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
                  :label="info.serviceFee"
                  v-model="info.serviceFee"
                  :disabled="serviceFeeDisabled"
                >服务费
                </el-checkbox>
              </div>
              <div
                class="flex margin-left-10"
                v-if="info.serviceFee"
              >
                <div style="width: 300px">服务费结算比例
                  <el-input
                    class="margin-left-20"
                    style="width: 50%"
                    v-digits="2"
                    v-model="info.serviceFeeSettleRate"
                  ><template slot="append">%</template>
                  </el-input>
                </div>
                <div style="width: 300px">服务费结算金额
                  <el-input
                    class="margin-left-20"
                    style="width: 40%"
                    v-digits="2"
                    v-model="info.serviceFeeSettleAmount"
                  ></el-input>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
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
  post_settleCondition_getMakingTypeNew,
  post_partyAContract_getBuilding__termId,
  post_settleCondition_getMaking__settleId,
  post_settleCondition_addMaking,
  post_settleCondition_updateMaking,
} from "@/api/project/index";
// import { post_channel_getAllListByName } from "@/api/channel/index";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
@Component({
  components: {},
})
export default class MakingEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  isShow = false;
  serviceFeeDisabled = false;
  agencyFeeDisabled = false;
  finishLoading = false;
  info: any = {
    settleName: null,
    agencyFee: 0,
    agencyFeeSettleAmount: null,
    agencyFeeSettleRate: null,
    agencyPadCommisionType: null,
    serviceFee: 0,
    serviceFeeSettleAmount: null,
    serviceFeeSettleRate: null,
    servicePadCommisionType: null,
    settleConditionMakingVOS: [],
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
  searchParams: any = {};
  channelList: any = [];

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
        this.info.settleConditionMakingVOS[i].isConditionAndShow = false;
      } else {
        this.info.settleConditionMakingVOS[i].isConditionAndShow = true;
        const ruleEnumList = (this.$root as any).dictAllList("Rule");
        const item = ruleEnumList.find((v: any) => v.code === data);
        let arr: any = [];
        arr = item.tag.split(",");
        this.info.settleConditionMakingVOS[i].compareBList = arr.map(
          (v: any) => ({
            code: v,
            name: (this.$root as any).dictAllName(v, "Rule"),
          })
        );
      }
    }
  }

  checkboxChange(val: any) {
    if (val.includes("Appoint") || val.includes("Strategic")) {
      this.isShow = true;
    } else {
      this.isShow = false;
      this.info.settleConditionMakingVOS.forEach((v: any) => {
        v.designatedAgency = [];
      });
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
      arr = this.info.settleConditionMakingVOS.filter(
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
        settleConditionMakingVOS: arr,
        agencyFee: this.info.agencyFee ? 1 : 0,
        serviceFee: this.info.serviceFee ? 1 : 0,
      };
      obj.termId = this.$route.query.id;
      if (!this.data.id) {
        try {
          await post_settleCondition_addMaking(obj);
          this.finishLoading = false;
          this.$message.success("新增成功");
          this.$emit("finish");
        } catch (err) {
          this.finishLoading = false;
        }
      } else {
        if (this.data.type === "edit") {
          try {
            obj.settleId = this.data.id;
            await post_settleCondition_updateMaking(obj);
            this.$message.success("修改成功");
            this.finishLoading = false;
            this.$emit("finish");
          } catch (err) {
            this.finishLoading = false;
          }
        } else {
          try {
            await post_settleCondition_addMaking(obj);
            this.finishLoading = false;
            this.$message.success("复制成功");
            this.$emit("finish");
          } catch (err) {
            this.finishLoading = false;
          }
        }
      }
    }
  }

  // 获取类型
  async getMakingType() {
    let obj: any = {};
    obj = await post_settleCondition_getMakingTypeNew({
      termId: this.$route.query.id,
      settleId: this.data.type === "edit" ? this.data.id : null,
    });
    this.channelList = obj.companyItemListVOS;
    this.searchParams = {
      cycleCity: obj.city,
      departmentOrgId: obj.startDivisionId,
      isNotNeedChannelLevelApprove: true,
    };
    this.PropertyOptions = obj.propertyVOS;
    this.info.settleConditionMakingVOS = obj.settleMakingListVOS.map(
      (v: any) => ({
        enumType: v.enumType,
        type: v.fieldEnum,
        compare: null,
        compareB: null,
        conditionAnd: null,
        conditionModel: v.conditionMarkingEnum,
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

  // 获取结佣详情
  async getMakingInfo() {
    const item = await post_settleCondition_getMaking__settleId({
      settleId: this.data.id,
    });
    const ruleEnumList = (this.$root as any).dictAllList("Rule");
    let info = item.settleConditionMakingVOS.map((v: any) => {
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
    this.info.settleConditionMakingVOS.forEach((v: any, i: number) => {
      info.forEach((j: any) => {
        if (j.conditionModel === v.conditionModel) {
          this.$set(this.info.settleConditionMakingVOS, i, { ...v, ...j });
        }
      });
    });
    this.info = {
      ...item,
      settleConditionMakingVOS: this.info.settleConditionMakingVOS,
    };
    this.info.agencyFee = item.agencyFee ? true : false;
    this.info.serviceFee = item.serviceFee ? true : false;
    // 触发指定中介或战略合作方按钮事件
    this.info.settleConditionMakingVOS.forEach((v: any) => {
      if (v.conditionModel === "ChannelType") {
        if (v.values.includes("Appoint") || v.values.includes("Strategic")) {
          this.isShow = true;
        }
      }
    });
  }

  // 获取栋座信息
  async getBuding() {
    this.budingList = await post_partyAContract_getBuilding__termId({
      termId: this.$route.query.id,
    });
  }

  // 获取渠道商信息
  async getChannel() {
    // this.channelList = await post_channel_getAllListByName({
    //   ...this.searchParams,
    // });
  }

  async created() {
    await this.getMakingType();
    if (this.data.id) {
      this.getMakingInfo();
    }
    this.getBuding();
    this.getChannel();
    let options: any = sessionStorage.getItem("padCommissionEnum");
    this.padCommissionEnumOptions = JSON.parse(options);
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
    &.channelType {
      display: flex;
      height: auto;
    }
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