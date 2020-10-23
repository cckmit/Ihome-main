<!--
 * @Description: 渠道商列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-23 09:51:36
-->
<template>
  <IhPage label-width="100px">
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
                  v-for="item in testList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
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
                  v-for="item in testList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省市区">
              <IhCascader v-model="provinceList"></IhCascader>
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
          @click="reset()"
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
            <span>{{$root.dictAllName(row.status, 'ChannelStatus')}}</span>
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
              @click.native.prevent="handleToPage(row, 'info')"
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
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'edit')"
                  :disabled="row.status !== 'DRAFT'"
                >修改</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="remove(row)"
                  :disabled="row.status !== 'DRAFT'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'confirm')"
                  :disabled="row.status !== 'ToBeConfirmed'"
                >确认</el-dropdown-item>
                <!-- <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'revoke')"
                  :disabled="row.status === 'DRAFT'"
                >撤回起草</el-dropdown-item> -->
                <el-dropdown-item
                  @click.native.prevent="backDraft(row, 'revoke')"
                  :disabled="row.status === 'DRAFT'"
                >撤回起草</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'change')"
                  :disabled="row.status !== 'Audited'"
                >变更信息</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'agent')"
                  :disabled="row.status !== 'DRAFT'"
                >维护渠道经纪人</el-dropdown-item>
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
  post_channel_backToDraft__id,
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

  // 测试数据
  testList = [
    { value: "管理员1", id: 1 },
    { value: "管理员2", id: 2 },
    { value: "管理员3", id: 3 },
  ];

  search() {
    this.queryPageParameters.provinces = this.provinceList[0];
    this.queryPageParameters.city = this.provinceList[1];
    this.queryPageParameters.county = this.provinceList[2];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  reset() {
    this.queryPageParameters = {
      name: "",
      creditCode: "",
      shortName: "",
      provinces: "",
      county: "",
      city: "",
      inputUser: "",
      status: "",
      followUserId: "",
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
    };
    this.provinceList = [];
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
   * @description: 退回起草
   * @param {any} row
   */
  private backDraft(row: any): void {
    this.$confirm("此操作将该渠道商撤回起草, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await post_channel_backToDraft__id({ id: row.id });
        this.getListMixin();
        this.$message.success("撤回起草成功");
      })
      .catch(async () => {
        console.log("取消");
      });
  }
  /**
   * @description: 删除当前 -- 只有草稿状态能删除
   * @param {any} row
   */
  private async remove(row: any): Promise<void> {
    this.$confirm("此操作将删除该渠商, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await post_channel_delete__id({ id: row.id });
        // 删除list最后一条数据 返回前一页面
        if (this.resPageInfo.list.length === 1) {
          this.queryPageParameters.pageNum === 1
            ? (this.queryPageParameters.pageNum = 1)
            : this.queryPageParameters.pageNum--;
        }
        this.getListMixin();
        this.$message.success("删除成功");
      })
      .catch(async () => {
        console.log("取消");
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
