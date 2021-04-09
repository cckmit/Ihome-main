<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-04 19:58:24
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-08 14:54:07
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
      onkeydown="if(event.keyCode==13){return false;}"
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
@Component({
  components: {},
})
export default class RulesDialog extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  form: any = [
    {
      conditionEnum: "HouseType",
      compare: null,
      conditionNumA: null,
      conditionAnd: null,
      compareB: null,
      conditionNumB: null,
      checkboxed: false,
      compareBList: [],
      conditionAndCheckboxed: false,
      isConditionAndShow: true,
    },
    {
      conditionEnum: "Area",
      compare: null,
      conditionNumA: null,
      conditionAnd: null,
      compareB: null,
      conditionNumB: null,
      checkboxed: false,
      compareBList: [],
      conditionAndCheckboxed: false,
      isConditionAndShow: true,
    },
    {
      conditionEnum: "ContractPrice",
      compare: null,
      conditionNumA: null,
      conditionAnd: null,
      compareB: null,
      conditionNumB: null,
      checkboxed: false,
      compareBList: [],
      conditionAndCheckboxed: false,
      isConditionAndShow: true,
    },
    {
      conditionEnum: "SubscriPrice",
      compare: null,
      conditionNumA: null,
      conditionAnd: null,
      compareB: null,
      conditionNumB: null,
      checkboxed: false,
      compareBList: [],
      conditionAndCheckboxed: false,
      isConditionAndShow: true,
    },
    {
      conditionEnum: "OtherMsg",
      compare: null,
      conditionNumA: null,
      conditionAnd: null,
      compareB: null,
      conditionNumB: null,
      checkboxed: false,
      compareBList: [],
      conditionAndCheckboxed: false,
      isConditionAndShow: true,
    },
  ];

  compareChange(data: any, i: number) {
    if (Object.keys(data).length) {
      if (data === "EQ") {
        this.form[i].isConditionAndShow = false;
      } else {
        this.form[i].isConditionAndShow = true;
        const ruleEnumList = (this.$root as any).dictAllList("Rule");
        const item = ruleEnumList.find((v: any) => v.code === data);
        let arr: any = [];
        arr = item.tag.split(",");
        this.form[i].compareBList = arr.map((v: any) => ({
          code: v,
          name: (this.$root as any).dictAllName(v, "Rule"),
        }));
      }
    }
  }

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    let arr: any = [];
    arr = this.form.filter((v: any) => v.checkboxed === true);
    arr = arr.map((v: any) => {
      if (v.conditionEnum !== "OtherMsg") {
        return {
          ...v,
          compare: v.compare,
          conditionAnd: v.conditionAndCheckboxed ? 1 : 0,
        };
      } else {
        return {
          ...v,
        };
      }
    });
    arr.forEach((v: any) => {
      delete v.compareBList;
      delete v.checkboxed;
      delete v.conditionAndCheckboxed;
      delete v.isConditionAndShow;
    });
    this.$emit("finish", arr);
  }
  async created() {
    const ruleEnumList = (this.$root as any).dictAllList("Rule");
    let info: any = [];
    if (this.data) {
      info = this.data.map((v: any) => {
        let arr: any = [];
        const item = ruleEnumList.find((j: any) => j.code === v.compare);
        if (item) arr = item.tag?.split(",");
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
    }
    this.form.forEach((v: any, i: number) => {
      info.forEach((j: any) => {
        if (v.conditionEnum === j.conditionEnum) {
          this.$set(this.form, i, j);
        }
      });
    });
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