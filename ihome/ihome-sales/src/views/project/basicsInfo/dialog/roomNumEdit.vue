<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 18:39:23
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-01 17:12:02
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="500px"
    class="dialog text-left"
    :title="Object.keys(data).length === 0 ? '新增栋座' : '编辑栋座'"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="栋座名称："
            prop="buildingName"
          >
            <el-input
              v-model="form.buildingName"
              placeholder="栋座名称"
              maxlength="50"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="地上层数："
            prop="floor"
          >
            <el-input
              v-model="form.floor"
              placeholder="地上层数"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="地下层数："
            prop="undergroundNum"
          >
            <el-input
              v-model="form.undergroundNum"
              placeholder="地下层数"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="物业类型："
            prop="propertyEnum"
          >
            <el-select
              style="width: 100%"
              v-model="form.propertyEnum"
              clearable
              placeholder="物业类型"
              value-key="propertyId"
            >
              <el-option
                v-for="item in propertyEnumOptions"
                :key="item.propertyId"
                :label="item.propertyName"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="装修级别">
            <el-select
              style="width: 100%"
              v-model="form.renovatLevelEnum"
              clearable
              placeholder="装修级别"
            >
              <el-option
                v-for="item in $root.dictAllList('RenovatLevel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">返 回</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { isNumberValidato } from "ihome-common/util/base/form-ui";
import { get_building_getPropertyDropDowm__proId } from "@/api/project/index";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: {},
})
export default class RoomNumEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    buildingName: null,
    floor: 0,
    undergroundNum: 0,
    propertyEnum: null,
    renovatLevelEnum: null,
    propertyId: null,
  };
  propertyEnumOptions: any = [];
  rules: any = {
    buildingName: [
      { required: true, message: "请输入栋座名称", trigger: "change" },
    ],
    floor: [
      { required: true, message: "请输入地上层数", trigger: "change" },
      { validator: isNumberValidato, trigger: "change" },
    ],
    undergroundNum: [
      { required: true, message: "请输入地下层数", trigger: "change" },
      { validator: isNumberValidato, trigger: "change" },
    ],
    propertyEnum: [
      { required: true, message: "请选择物业类型", trigger: "change" },
    ],
  };

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.$emit("finish", this.form);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async created() {
    this.propertyEnumOptions = await get_building_getPropertyDropDowm__proId({
      proId: this.$route.query.id,
    });
    this.form = {
      ...this.data,
      buildingName: this.data.buildingName ? this.data.buildingName : null,
      floor: this.data.floor ? this.data.floor : 0,
      undergroundNum: this.data.undergroundNum ? this.data.undergroundNum : 0,
      propertyEnum: this.data.propertyEnum ? this.data.propertyEnum : null,
      renovatLevelEnum: this.data.renovatLevelEnum
        ? this.data.renovatLevelEnum
        : null,
      propertyId: this.data.propertyId ? this.data.propertyId : null,
    };
  }
}
</script>
<style lang="scss" scoped>
</style>