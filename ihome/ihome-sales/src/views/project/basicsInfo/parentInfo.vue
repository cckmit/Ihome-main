<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-10 10:34:18
 * @LastEditors: zyc
 * @LastEditTime: 2021-05-19 18:24:17
-->
<template>
  <ih-page>
    <template v-slot:info>
      <p class="ih-info-title">{{ title }}</p>
      <el-form
        ref="form"
        label-width="110px"
        class="margin-top-30 text-left"
        :model="form"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="盘编">
              <span
                class="text-ellipsis"
                :title="form.proNo"
              >{{
                form.proNo
              }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目推广名">
              <span>{{ form.proName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目备案名">
              <span>{{ form.proRecord }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="开发商">
              <span>{{ form.developerNames }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="市场化项目">
              <span>{{ filterExMarket(form.exMarket) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联明源">
              <span>{{ filterExMarket(form.exMinyuan) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="明源楼盘名">
              <span>{{ form.buildingGuidName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="明源区域公司">
              <span>{{ form.companyName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省份">
              <span>{{ $root.getAreaName(form.province) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <span>{{ $root.getAreaName(form.city) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行政区">
              <span>{{ $root.getAreaName(form.district) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="项目地址">
              <span>{{ form.proAddr }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <p class="ih-info-title">
        <span>子项目清单</span>
      </p>

      <div style="margin: 0 20px">
        <el-table
          :data="form.sonProjec"
          style="width: 100%"
        >
          <el-table-column
            prop="proNo"
            label="盘编"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="项目名称"
            width="300"
          >
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
                <span>{{ row.exMarket ? "是" : "否" }}</span>/<span>{{ row.exMinyuan ? "是" : "否" }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="明源信息"
            width="180"
          >
            <template v-slot="{ row }">
              <div>所属父项目：{{ row.parentName }}</div>
              <div>楼盘名：{{ row.myName }}</div>
              <div>区域公司：{{ row.companyName }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="省市区"
            width="100"
          >
            <template v-slot="{ row }">
              <div>{{ $root.getAreaName(row.province) }}</div>
              <div>{{ $root.getAreaName(row.city) }}</div>
              <div>{{ $root.getAreaName(row.district) }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="proAddr"
            label="项目地址"
          > </el-table-column>
          <el-table-column
            prop="auditEnum"
            label="项目审核状态"
            width="180"
          >
            <template v-slot="{ row }">{{
              $root.dictAllName(row.auditEnum, "ProAudit")
            }}</template>
          </el-table-column>
          <el-table-column
            fixed="right"
            prop=""
            label="操作"
            width="120"
          >
            <template v-slot="{ row }">
              <el-link
                type="primary"
                @click.native.prevent="goInfo(row)"
              >详情</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div
        class="margin-top-20"
        v-if="$route.name === 'projectParentAudit'"
      >
        <p class="ih-info-title">审核意见</p>
        <el-input
          class="padding-left-20"
          style="box-sizing: border-box"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入内容"
          v-model="remark"
        >
        </el-input>
        <div class="margin-top-20">
          <el-button
            @click="auditPass()"
            type="primary"
          >通过</el-button>
          <el-button
            @click="auditReject()"
            type="danger"
          >驳回</el-button>
        </div>
      </div>
      <div
        v-if="$route.name === 'projectParentRecall'"
        class="margin-top-20"
      >
        <el-button
          @click="recall()"
          type="primary"
        >撤回</el-button>
      </div>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_project_getParent__proId,
  post_project_audit,
  post_project_reject,
  post_project_cancel__proId,
} from "@/api/project/index";

@Component({
  components: {},
})
export default class EditBasicInfo extends Vue {
  title = "父项目详情";
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
    companyName: null,
    provinceOption: [],
    developerNames: null,
  };
  remark = "";
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
    if (this.$route.name === "projectParentAudit") {
      this.title = "父项目审核";
    }

    this.getInfo();
  }
  goInfo(item: any) {
    window.open(`/web-sales/projects/childInfo?id=${item.proId}`);
  }

  private filterExMarket(type: any) {
    const item = this.YesOrNoType.find((v: any) => v.code === type)?.name;
    return item;
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

  async recall() {
    try {
      await post_project_cancel__proId({
        proId: this.form.proId,
      });
      this.$message.success("撤回成功!");
      this.$goto({ path: "/projects/list" });
    } catch (err) {
      console.log(err);
    }
  }

  async auditPass() {
    if (this.remark) {
      let obj: any = {};
      obj.proId = this.projectId;
      obj.auditOption = this.remark;
      await post_project_audit(obj);
      this.$message.success("审核成功");
      this.$goto({ path: "/projects/list" });
    } else {
      this.$message({
        type: "warning",
        message: "请填写审核意见",
      });
    }
  }

  async auditReject() {
    if (this.remark) {
      let obj: any = {};
      obj.proId = this.projectId;
      obj.rejectOption = this.remark;
      await post_project_reject(obj);
      this.$message.success("驳回成功");
      this.$goto({ path: "/projects/list" });
    } else {
      this.$message({
        type: "warning",
        message: "请填写审核意见",
      });
    }
  }
}
</script>
<style lang="scss">
.text-ellipsis {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>