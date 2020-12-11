<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-09 20:12:21
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-11 19:06:25
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
    title="结佣结算条件"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="info"
    >
      <el-row>
        <el-col :span="10">
          <el-form-item label="名称">
            <el-input v-model="info.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="优先级">
            <el-input v-model="info.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="condition-title">满足条件</div>
      <template v-for="(item, i) in typeList">
        <el-row :key="i">
          <el-col :span="24">
            <div class="condition-item">
              <div style="width: 100px;display: inline-block">
                <el-checkbox
                  :label="item.conditionMarkingEnum"
                  v-model="item.checkboxed"
                >{{$root.dictAllName(item.conditionMarkingEnum, 'ConditionMarking')}}
                </el-checkbox>
              </div>
              <span
                v-if="item.checkboxed && item.enumType && !['ContractType', 'ExRecode'].includes(item.conditionMarkingEnum)"
                class="condition-list"
              >
                <el-checkbox-group v-model="item.values">
                  <el-checkbox
                    :label="list.code"
                    v-for="(list, h) in $root.dictAllList(item.enumType)"
                    :key="h"
                  >{{list.name}}</el-checkbox>
                </el-checkbox-group>
              </span>
              <span
                v-if="
                item.checkboxed &&
                (item.conditionMarkingEnum === 'Area'
                || item.conditionMarkingEnum === 'DealTotalSets'
                || item.conditionMarkingEnum === 'DealTotalAmount')"
                class="margin-left-25"
              >
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
                  :placeholder="$root.dictAllName(item.conditionMarkingEnum, 'ConditionMarking')"
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
                    :placeholder="$root.dictAllName(item.conditionMarkingEnum, 'ConditionMarking')"
                  ></el-input>
                </span>
              </span>
              <span
                v-if="item.checkboxed && item.conditionMarkingEnum === 'Building'"
                class="margin-left-25"
              >
                <el-select
                  v-model="item.budings"
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
              <span
                v-if="item.checkboxed && (item.conditionMarkingEnum === 'ContractType' || item.conditionMarkingEnum === 'ExRecode')"
                class="margin-left-25"
              >
                <el-select
                  class="margin-left-20"
                  style="width: 15%"
                  v-model="item.values"
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
              <span
                v-if="item.checkboxed && item.conditionMarkingEnum === 'PaymentReturnRate'"
                class="margin-left-40"
              >
                <el-input
                  style="width: 20%"
                  v-digits="2"
                  v-model="item.returnRateByHouse"
                ><template slot="append">%</template>
                </el-input>
              </span>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-form>

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
  get_settleCondition_getMakingType,
  post_partyAContract_getBuilding__termId,
} from "@/api/project/index";
@Component({
  components: {},
})
export default class CloseRules extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  info: any = {};
  typeList: any = [];
  budingList: any = [];

  compareChange(data: any, i: number) {
    console.log(data, i);
  }

  cancel() {
    this.$emit("cancel", false);
  }

  finish() {
    console.log(this.typeList);
    this.$emit("finish");
  }

  // 获取类型
  async getMakingType() {
    let arr: any = [];
    arr = await get_settleCondition_getMakingType();
    this.typeList = arr.map((v: any) => ({
      conditionMarkingEnum: v.conditionMarkingEnum,
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
      budings: [],
      isConditionAndShow: true,
    }));
  }

  // 获取栋座信息
  async getBuding() {
    this.budingList = await post_partyAContract_getBuilding__termId({
      termId: this.$route.query.id,
    });
  }

  created() {
    this.getMakingType();
    this.getBuding();
  }
}
</script>
<style lang="scss" scoped>
.condition {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
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
    padding-bottom: 30px;
  }
  &-list {
    margin-left: 30px;
    display: inline-block;
  }
}
</style>