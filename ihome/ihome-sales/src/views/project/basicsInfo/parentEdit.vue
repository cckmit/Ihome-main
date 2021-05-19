<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-10 10:21:03
 * @LastEditors: zyc
 * @LastEditTime: 2021-05-19 08:55:06
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
                :readonly="baseReadOnly"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目推广名" prop="proName">
              <el-input
                clearable
                maxlength="50"
                v-model="form.proName"
                placeholder="项目推广名"
                :readonly="baseReadOnly"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目备案名" prop="proRecord">
              <el-input
                clearable
                maxlength="50"
                v-model="form.proRecord"
                placeholder="项目备案名"
                :readonly="baseReadOnly"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="开发商">
              <el-input
                disabled
                v-model="form.developerNames"
                placeholder="自动生成"
                :readonly="baseReadOnly"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="市场化项目" prop="exMarket">
              <el-select
                v-model="form.exMarket"
                clearable
                class="width--100"
                :disabled="baseReadOnly"
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
            <el-form-item label="关联明源" prop="exMinyuan">
              <el-select
                v-model="form.exMinyuan"
                clearable
                class="width--100"
                disabled
                :readonly="baseReadOnly"
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
                :readonly="baseReadOnly"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.exMinyuan">
            <el-form-item label="明源区域公司">
              <el-input
                v-model="form.companyName"
                disabled
                :readonly="baseReadOnly"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="省市区" prop="provinceOption">
              <IhCascader
                v-model="form.provinceOption"
                :checkStrictly="false"
                :disabled="baseReadOnly"
              ></IhCascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="项目地址" prop="proAddr">
              <el-input
                clearable
                maxlength="200"
                v-model="form.proAddr"
                placeholder="项目地址"
                :readonly="baseReadOnly"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <p class="ih-info-title">
        <span>子项目清单</span>
        <el-button
          type="primary"
          class="add-btn"
          size="small"
          @click.native="addsonProject()"
          >添加</el-button
        >
      </p>

      <div style="margin: 0 20px">
        <el-table :data="form.sonProjec" style="width: 100%">
          <el-table-column prop="proNo" label="盘编" width="180">
          </el-table-column>
          <el-table-column prop="" label="项目名称" width="300">
            <template v-slot="{ row }">
              <div>推广名：{{ row.proName }}</div>
              <div>备案名：{{ row.proRecord }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="市场化项目/关联明源"
            width="100"
          >
            <template v-slot="{ row }">
              <div>
                <span>{{ row.exMarket ? "是" : "否" }}</span
                >/<span>{{ row.exMinyuan ? "是" : "否" }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="明源信息" width="180">
            <template v-slot="{ row }">
              <div>所属父项目：{{ row.parentName }}</div>
              <div>楼盘名：{{ row.myName }}</div>
              <div>区域公司：{{ row.companyName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="省市区" width="100">
            <template v-slot="{ row }">
              <div>{{ $root.getAreaName(row.province) }}</div>
              <div>{{ $root.getAreaName(row.city) }}</div>
              <div>{{ $root.getAreaName(row.district) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="proAddr" label="项目地址"> </el-table-column>
          <el-table-column prop="auditEnum" label="项目审核状态" width="180">
            <template v-slot="{ row }">{{
              $root.dictAllName(row.auditEnum, "ProAudit")
            }}</template>
          </el-table-column>
          <el-table-column fixed="right" prop="" label="操作" width="120">
            <template v-slot="{ row }">
              <el-link type="primary" @click.native.prevent="goInfo(row)"
                >详情</el-link
              >
              <el-link
                style="margin-left: 20px"
                type="warning"
                @click.native.prevent="remove(row.$index)"
                >移除</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="margin-top-20">
        <el-button type="primary" @click="save" v-if="!baseReadOnly"
          >保 存</el-button
        >
        <el-button type="success" @click="submit()" v-if="!isYeGuan"
          >提交</el-button
        >
        <el-button @click="$goto({ path: '/projects/list' })">关 闭</el-button>
      </div>
    </template>
    <IhDialog :show="selectVisible">
      <SelectProject
        :parentId="$route.query.id"
        :hasCheckedData="form.sonProjec"
        @cancel="() => (selectVisible = false)"
        @finish="finish"
      />
    </IhDialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import SelectProject from "./dialog/selectProject.vue";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  get_project_getParent__proId,
  post_project_updateParent,
  post_project_auditWait,
  post_project_auditWaitManagement,
  post_project_updateParentAndSonProject,
  post_project_bussniessUpdateParent,
} from "../../../api/project/index";

@Component({
  components: { SelectProject },
})
export default class EditBasicInfo extends Vue {
  selectVisible = false;
  cunrentParams: any = {};
  form: any = {
    auditEnum: null,
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
    proAddr: null,
    companyName: null,
    developerNames: null,
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
  get baseReadOnly() {
    //基础信息只读，变更子项目
    return this.$route.query.type == "cahngeSon";
  }
  get isYeGuan() {
    return this.$route.query.type == "yeguanEdit";
  }

  created() {
    this.getInfo();
  }
  addsonProject() {
    this.selectVisible = true;
  }
  goInfo(item: any) {
    window.open(`/web-sales/projects/childInfo?id=${item.proId}`);
  }
  remove(index: number) {
    this.form.sonProjec.splice(index, 1);
  }
  finish(list: any) {
    console.log(list, "finish");
    let textList: any = [];
    (list || []).forEach((item: any) => {
      if (
        item.preParentId !== null &&
        item.preParentId != this.$route.query.id
      ) {
        textList.push(
          `【${item.proName}】 正在调整关联至【${
            item.parentName || ""
          }】项目的过程中`
        );
      }
    });
    if (textList.length > 0) {
      let text = textList.join("、");
      // A项目-二期（子项目）正在调整关联至B项目（父项目）的过程中，请先审核B项目信息再修改A项目-二期的关联关系
      this.$message.warning(`${text} ，请先审核其他项目信息再修改`);
    } else {
      this.selectVisible = false;
      this.form.sonProjec = list;
    }
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

  async submit() {
    (this.$refs["form"] as ElForm).validate(async (v: any) => {
      this.submitPost(v);
    });
  }
  @NoRepeatHttp()
  async submitPost(v: any) {
    if (v) {
      let obj = { ...this.form };
      let p = this.form.provinceOption[0];
      let c = this.form.provinceOption[1];
      if (p.trim().length === 0 || c.trim().length === 0) {
        this.$message.warning("省市区不能为空！");
        return;
      }
      obj.province = this.form.provinceOption[0];
      obj.city = this.form.provinceOption[1];
      obj.district = this.form.provinceOption[2];
      obj.provinceName = (this.$root as any).getAreaName(
        this.form.provinceOption[0]
      );
      obj.cityName = (this.$root as any).getAreaName(
        this.form.provinceOption[1]
      );
      obj.districtName = (this.$root as any).getAreaName(
        this.form.provinceOption[2]
      );
      obj.proId = this.projectId;
      obj.sonProjecIds = this.form.sonProjec.map((item: any) => {
        return item.proId;
      });

      //修改，业管修改，并更子项目
      // post_project_auditWait,
      // post_project_auditWaitManagement,
      // post_project_updateParentAndSonProject,
      if (this.$route.query.type == "cahngeSon") {
        //并更子项目
        let postData = {
          proId: obj.proId,
          sonProjecIds: this.form.sonProjec.map((item: any) => {
            return item.proId;
          }),
        };
        await post_project_updateParentAndSonProject(postData);
      } else if (this.$route.query.type == "edit") {
        await post_project_updateParent(obj);
        //修改
        let postData = {
          auditOption: "",
          proId: obj.proId,
        };
        await post_project_auditWait(postData);
      } else if (this.$route.query.type == "yeguanEdit") {
        //业管修改
        await post_project_updateParent(obj);
        let postData = {
          auditOption: "",
          proId: obj.proId,
        };
        await post_project_auditWaitManagement(postData);
      } else {
        this.$message.warning("请从指定入口进入页面");
      }
      this.$message.success("提交成功");
      this.$goto({ path: "/projects/list" });
    } else {
      setTimeout(() => {
        let isError: any = document.getElementsByClassName("is-error");
        if (isError != null) {
          isError[0].querySelector("input").focus();
        }
      }, 100);
      return false;
    }
  }

  async save() {
    (this.$refs["form"] as ElForm).validate(async (v: any) => {
      this.savePost(v);
    });
  }
  @NoRepeatHttp()
  async savePost(v: any) {
    if (v) {
      let obj = { ...this.form };
      obj.province = this.form.provinceOption[0];
      obj.city = this.form.provinceOption[1];
      obj.district = this.form.provinceOption[2];
      obj.provinceName = (this.$root as any).getAreaName(
        this.form.provinceOption[0]
      );
      obj.cityName = (this.$root as any).getAreaName(
        this.form.provinceOption[1]
      );
      obj.districtName = (this.$root as any).getAreaName(
        this.form.provinceOption[2]
      );
      obj.proId = this.projectId;
      obj.sonProjecIds = this.form?.sonProjec?.map((item: any) => {
        return item.proId;
      });

      if (this.isYeGuan) {
        await post_project_bussniessUpdateParent(obj);
      } else {
        await post_project_updateParent(obj);
      }

      this.$message.success("保存成功");
      this.$goto({ path: "/projects/list" });
    }
  }
}
</script>
<style lang="scss">
.info-title {
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ih-info-title {
  position: relative;
  .add-btn {
    position: absolute;
    top: 0px;
    left: 100px;
    transform: translate(0, -30%);
  }
}
</style>