<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-13 20:32:44
-->
<template>
  <ih-page>
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
                v-model="queryPageParameters.state"
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
        >清空</el-button>
        <el-button
          type="danger"
          @click="ChangeFollower()"
        >变更跟进人</el-button>
        <el-button
          type="danger"
          @click="ChangeInputPerson()"
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
          min-width="200"
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
        ></el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="county"
          label="行政区"
          width="200"
        ></el-table-column>
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
                <el-dropdown-item @click.native.prevent="remove(scope)">删除</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="confirm(scope)">确认</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="confirm(scope)">撤回起草</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="changeinfo(scope)">变更信息</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="maintenance(scope)">维护渠道经纪人</el-dropdown-item>
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
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// 引入api ---先调用本地
import { post_channel_getList } from "../../../api/channel/index";

import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class UserList extends Vue {
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

  resPageInfo: any = {
    total: 0,
    list: [],
  };
  search() {
    console.log("查询");
    this.getListMixin();
  }
  empty() {
    console.log("清空");
    this.queryPageParameters = {};
  }
  ChangeFollower() {
    console.log("变更跟进人");
  }
  ChangeInputPerson() {
    console.log("变更录入人");
  }

  /**
   * @description: 跳转详情
   * @param {any} row
   */
  private handleToInfo(row: any): void {
    this.$router.push({
      path: "/channelsTest/info",
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
  remove(row: any) {
    console.log("删除");
    console.log(row.row.id);
  }
  confirm(scope: any) {
    console.log("确认");
    this.$router.push({
      path: "distributorsList/confirm",
      query: {
        id: scope.row.id,
      },
    });
  }
  changeinfo(scope: any) {
    console.log("变更信息");
    this.$router.push({
      path: "distributorsList/changeInfo",
      query: { id: scope.row.id },
    });
  }
  maintenance(scope: any) {
    console.log("维护渠道经纪人");
    this.$router.push({
      path: "distributorsList/MaintenanceOfChannels",
      query: { id: scope.row.id },
    });
  }
  //获取数据
  async getListMixin() {
    this.resPageInfo = await post_channel_getList(this.queryPageParameters);
  }
  handleSelectionChange(val: any) {
    console.log(val);
  }

  created() {
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.line {
  border-left: solid;
  color: #4cccec;
  padding-left: 7px;
}
</style>