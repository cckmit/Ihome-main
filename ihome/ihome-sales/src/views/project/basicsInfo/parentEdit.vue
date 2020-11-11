<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-10 10:21:03
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-11 15:00:00
-->
<template>
  <ih-page>
    <template v-slot:info>
      <p class="ih-info-title">父项目编辑</p>
      <el-form
        ref="form"
        label-width="110px"
        class="margin-top-30"
        :model="form"
        :rules="rules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="盘编">
              <el-input
                clearable
                maxlength="64"
                v-model="form.proNo"
                placeholder="盘编"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="项目推广名"
              prop="proName"
            >
              <el-input
                clearable
                maxlength="50"
                v-model="form.proName"
                placeholder="项目推广名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="项目备案名"
              prop="proRecord"
            >
              <el-input
                clearable
                maxlength="50"
                v-model="form.proRecord"
                placeholder="项目备案名"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="市场化项目"
              prop="exMarket"
            >
              <el-select
                v-model="form.exMarket"
                clearable
                class="width--100"
              >
                <el-option
                  v-for="item in YesOrNoType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="关联明源"
              prop="exMinyuan"
            >
              <el-select
                v-model="form.exMinyuan"
                clearable
                class="width--100"
                disabled
              >
                <el-option
                  v-for="item in YesOrNoType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="明源楼盘名">
              <el-input
                clearable
                v-model="form.buildingGuidName"
                placeholder="明源楼盘名"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="省市区"
              prop="provinceOption"
            >
              <IhCascader
                v-model="form.provinceOption"
                :checkStrictly="false"
              ></IhCascader>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              label="项目地址"
              prop="proAddr"
            >
              <el-input
                clearable
                maxlength="200"
                v-model="form.proAddr"
                placeholder="项目地址"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="margin-top-20">
        <el-button
          type="primary"
          @click="save"
        >保存</el-button>
        <el-button @click="$goto({ path: '/projects/list' })">关闭</el-button>
      </div>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_project_getParent__proId,
  post_project_updateParent,
} from "@/api/project/index";

@Component({
  components: {},
})
export default class EditBasicInfo extends Vue {
  form: any = {
    proNo: null,
    proName: null,
    proRecord: null,
    exMarket: null,
    exMinyuan: 0,
    buildingGuidName: null,
    province: null,
    city: null,
    district: null,
    provinceOption: [],
  };

  rules: any = {
    proName: [
      { required: true, message: "请填写项目推广名", trigger: "change" },
    ],
    proRecord: [
      { required: true, message: "请填写项目备案名", trigger: "change" },
    ],
    exMarket: [
      { required: true, message: "请选择市场化项目", trigger: "change" },
    ],
    exMinyuan: [
      { required: true, message: "请选择关联明源", trigger: "change" },
    ],
    provinceOption: [
      { required: true, message: "请选择省市区", trigger: "change" },
    ],
    proAddr: [{ required: true, message: "请填写项目地址", trigger: "change" }],
  };
  YesOrNoType: any = [
    {
      code: 0,
      name: "否",
    },
    {
      code: 1,
      name: "是",
    },
  ];

  private get projectId() {
    return this.$route.query.id;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    if (this.projectId) {
      const data = await get_project_getParent__proId({
        proId: this.projectId,
      });
      this.form = { ...this.form, ...data };
      this.form.provinceOption = [data.province, data.city, data.district];
    }
  }

  async save() {
    let obj = { ...this.form };
    obj.province = this.form.provinceOption[0];
    obj.city = this.form.provinceOption[1];
    obj.district = this.form.provinceOption[2];
    obj.provinceName = (this.$root as any).getAreaName(
      this.form.provinceOption[0]
    );
    obj.cityName = (this.$root as any).getAreaName(this.form.provinceOption[1]);
    obj.districtName = (this.$root as any).getAreaName(
      this.form.provinceOption[2]
    );
    obj.proId = this.projectId;
    await post_project_updateParent(obj);
    this.$message.success("保存成功");
    this.$goto({ path: "/projects/list" });
  }
}
</script>
<style lang="scss">
</style>