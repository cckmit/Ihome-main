<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-16 10:08:37
-->
<template>
  <IhPage>
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称">
              <el-input
                v-model="queryPageParameters.name"
                placeholder="名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用代码">
              <el-input
                v-model="queryPageParameters.creditCode"
                placeholder="信用代码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="简称">
              <el-input
                v-model="queryPageParameters.shortName"
                placeholder="简称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="8">
            <el-form-item label="省份">
              <el-select
                v-model="queryPageParameters.provinces"
                clearable
                placeholder="请选择省份"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('provinces')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-select
                v-model="queryPageParameters.city"
                clearable
                placeholder="请选择城市"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('city')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行政区">
              <el-select
                v-model="queryPageParameters.county"
                clearable
                placeholder="行政区"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('administrative')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="渠道跟进人">
              <el-select
                v-model="queryPageParameters.followUserId"
                clearable
                placeholder="渠道跟进人"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('state')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.status"
                clearable
                placeholder="状态"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道录入人">
              <el-select
                v-model="queryPageParameters.inputUser"
                clearable
                placeholder="渠道录入人"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('state')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省市区">
              <IhCascader v-model="queryPageParameters.provinceList"></IhCascader>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="success"
          @click="$router.push('add')"
        >添加</el-button>
        <el-button
          type="info"
          @click="empty()"
        >重置</el-button>
        <el-button
          :disabled="!selectionData.length"
          @click="changeFollower()"
        >变更跟进人</el-button>
        <el-button
          :disabled="!selectionData.length"
          @click="changeInputPerson()"
        >变更录入人</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="名称"
          min-width="250"
        ></el-table-column>
        <el-table-column
          fixed
          prop="shortName"
          label="简称"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="200"
        >
          <template v-slot="{ row }">
            {{ $root.getAreaName(row.province) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          width="200"
        >
          <template v-slot="{ row }">
            {{ $root.getAreaName(row.city) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="county"
          label="行政区"
          width="200"
        >
          <template v-slot="{ row }">
            {{ $root.getAreaName(row.county) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="inputUser"
          label="录入人"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="followUserId"
          label="渠道跟进人"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="200"
        >
          <template v-slot="{ row }">
            <span>{{$root.dictAllName(row.status, 'ChannelStatus').name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="handleToInfo(row)"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="handleChange(row)">修改</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleRemove(row)">删除</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleToConfirm(row)">确认</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleToRevoke(row)">撤回起草</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleToChange(row)">变更信息</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleToMaintenance(row)">维护渠道经纪人</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
      <br />
      <el-pagination
        @size-change="handleSizeChangeMixin"
        @current-change="handleCurrentChangeMixin"
        :current-page.sync="queryPageParameters.pageNum"
        :page-sizes="$root.pageSizes"
        :page-size="queryPageParameters.pageSize"
        :layout="$root.paginationLayout"
        :total="resPageInfo.total"
      ></el-pagination>
    </template>
    <!-- dialog -->
    <IhDialog
      :show="dialogVisible"
      desc="变更录入人"
    >
      <UpdateUser
        :data="selectionData"
        :isInput="isInput"
        @cancel="() => (dialogVisible = false)"
        @finish="
          (data) => {
            dialogVisible = false;
            getListMixin();
          }
        "
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// 引入api ---先调用本地
import {
  post_channel_getList,
  post_channel_delete__id,
} from "@/api/channel/index";
import UpdateUser from "./dialog/updateUser.vue";

import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: { UpdateUser },
  mixins: [PaginationMixin],
})
export default class List extends Vue {
  queryPageParameters: any = {
    name: "",
    creditCode: "",
    shortName: "",
    provinces: "",
    county: "",
    city: "",
    inputUser: "",
    status: "",
    followUserId: "",
  };
  dialogVisible = false;
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  selectionData = [];
  isInput = true;
  private provinceList: any = [];

  search() {
    console.log("查询");
    this.getListMixin();
  }
  empty() {
    console.log("清空");
    this.queryPageParameters = {};
  }
  changeFollower() {
    console.log("变更跟进人");
    this.dialogVisible = true;
    this.isInput = false;
  }
  changeInputPerson() {
    console.log("变更录入人");
    this.dialogVisible = true;
    this.isInput = true;
  }
  /**
   * @description: 跳转详情
   * @param {any} row
   */
  private handleToInfo(row: any): void {
    this.$router.push({
      path: "info",
      query: { id: row.id },
    });
  }
  /**
   * @description: 跳转修改
   * @param {any} row
   */
  private handleChange(row: any): void {
    this.$router.push({
      path: "edit",
      query: { id: row.id },
    });
  }
  /**
   * @description: 删除当前 -- 只有草稿状态能删除
   * @param {any} row
   */
  private async handleRemove(row: any) {
    await post_channel_delete__id({ id: row.id });
    // 删除list最后一条数据 返回前一页面
    if (this.resPageInfo.list.length === 1) {
      this.queryPageParameters.pageNum === 1
        ? (this.queryPageParameters.pageNum = 1)
        : this.queryPageParameters.pageNum--;
    }
    this.getListMixin();
    this.$message.success("删除成功");
  }
  /**
   * @description: 跳转渠道商确认页面
   * @param {any} row
   */
  handleToConfirm(row: any) {
    this.$router.push({
      path: "confirm",
      query: {
        id: row.id,
      },
    });
  }
  /**
   * @description: 跳转渠道商撤回起草
   * @param {any} row
   */
  handleToRevoke(row: any) {
    this.$router.push({
      path: "revoke",
      query: { id: row.id },
    });
  }
  handleToChange(row: any) {
    this.$router.push({
      path: "change",
      query: { id: row.id },
    });
  }
  handleToMaintenance(row: any) {
    this.$router.push({
      path: "agent",
      query: { id: row.id },
    });
  }
  /**
   * @description: 跳转页面
   * @param {any} row
   * @param {string} type 页面page
   */
  private handleToPage(row: any, type: string): void {
    this.$router.push({
      path: type,
      query: { id: row.id },
    });
  }
  //获取数据
  async getListMixin() {
    this.resPageInfo = await post_channel_getList(this.queryPageParameters);
  }
  handleSelectionChange(val: any) {
    this.selectionData = val;
  }

  created() {
    this.getListMixin();
  }
}
</script>
