<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-09 20:12:21
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-11 15:53:09
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="60%"
    class="rulesDialog text-left"
    :append-to-body="true"
    title="条件编辑"
  >
    <el-form
      ref="form"
      label-width="0"
    >
      <template v-for="(item, i) in form">
        <el-row :key="i">
          <el-col :span="24">
            <el-form-item>
              <span style="width: 80px;display:inline-block">
                <el-checkbox
                  :label="item.conditionEnum"
                  v-model="item.checkboxed"
                >{{$root.dictAllName(item.conditionEnum, 'Condition')}}
                </el-checkbox>
              </span>
              <span v-if="item.checkboxed && item.conditionEnum !== 'OtherMsg'">
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
                  :placeholder="$root.dictAllName(item.conditionEnum, 'Condition')"
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
                    :placeholder="$root.dictAllName(item.conditionEnum, 'Condition')"
                  ></el-input>
                </span>
              </span>
              <el-input
                v-if="item.checkboxed && item.conditionEnum === 'OtherMsg'"
                class="margin-left-20"
                v-model="item.otherMsg"
                style="width: 33%;"
                clearable
                placeholder="填写系统无法支持的条件"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <div style="color: red">注意：其他条件是文本框形式，系统无法自动判断，填写的文字信息会在条件框中展示，条件是否符合需要人为判断</div>
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
import { get_settleCondition_getMakingType } from "@/api/project/index";
@Component({
  components: {},
})
export default class CloseRules extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  form: any = [];
  type: any = [];

  compareChange(data: any, i: number) {
    console.log(data, i);
  }

  cancel() {
    this.$emit("cancel", false);
  }

  finish() {
    this.$emit("finish");
  }

  // 获取类型
  async getMakingType() {
    this.type = await get_settleCondition_getMakingType();
  }
  created() {
    this.getMakingType();
  }
}
</script>
<style lang="scss" scoped>
.rulesDialog {
  /deep/ .el-dialog {
    margin-top: 25vh !important;
  }

  /deep/ el-col {
    margin-bottom: 10px;
  }
}
</style>