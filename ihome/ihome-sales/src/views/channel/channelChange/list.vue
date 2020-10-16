<!--
 * @Description: 渠道商变更列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-16 16:48:13
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
            <el-form-item label="渠道商名称">
              <el-select
                v-model="queryPageParameters.name"
                clearable
                placeholder="请选择"
                class="width--100"
                filterable
              >
                <el-option
                  v-for="item in channelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-select
                v-model="queryPageParameters.inputUser"
                clearable
                placeholder="请选择"
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
                placeholder="请选择"
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
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="渠道跟进人">
              <el-select
                v-model="queryPageParameters.followUserId"
                clearable
                placeholder="请选择"
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
      </el-form>
    </template>

    <template v-slot:btn>
      <el-button
        type="primary"
        @click="search()"
      >查询</el-button>
      <el-button
        type="info"
        @click="reset()"
      >重置</el-button>
      <el-button
        :disabled="!selectionData.length"
        @click="dialogVisible = true"
      >变更录入人</el-button>
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
          label="渠道商名称"
          min-width="150"
        ></el-table-column>
        <el-table-column
          fixed
          prop="followUserId"
          label="渠道跟进人"
          width="120"
        ></el-table-column>
        <el-table-column
          fixed
          prop="inputUser"
          label="录入人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="changeTime"
          label="变更日期"
          width="220"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="150"
        >
          <template v-slot="{ row }">
            {{ $root.dictAllName(row.status, 'ChannelStatus').name }}
          </template>
        </el-table-column>
        <el-table-column
          prop="changeReason"
          label="变更原因"
          min-width="240"
        ></el-table-column>

        <el-table-column
          label="操作"
          width="150"
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
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="handleToPage(row, 'edit')">修改</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="remove(row)">删除</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleToPage(row, 'confirm')">确认</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleToPage(row, 'examine')">审核</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleToPage(row, 'revoke')">撤回</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="draft(row)">退回起草</el-dropdown-item>
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

import {
  post_channelChange_getList,
  get_channel_getAll,
  post_channelChange_delete__id,
} from "@/api/channel/index";
import PaginationMixin from "../../../mixins/pagination";
import UpdateUser from "./dialog/updateUser.vue";

@Component({
  components: { UpdateUser },
  mixins: [PaginationMixin],
})
export default class ChannelChangeList extends Vue {
  queryPageParameters: any = {
    name: "",
    inputUser: "",
    status: "",
    followUserId: "",
  };
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  selectionData = [];
  dialogVisible = false;
  private channelList: any = [];

  // 测试数据
  testList = [
    { value: "管理员1", id: 1 },
    { value: "管理员2", id: 2 },
    { value: "管理员3", id: 3 },
  ];

  reset() {
    this.queryPageParameters = {
      name: "",
      inputUser: "",
      status: "",
      followUserId: "",
      pageNum: 1,
      pageSize: 10,
    };
    this.getListMixin();
  }
  /**
   * @description: 跳转页面
   * @param {any} row
   * @param {string} page 跳转页面path
   */
  private handleToPage(row: any, page: string): void {
    this.$router.push({
      path: page,
      query: { id: row.id },
    });
  }
  private draft(row: any): void {
    this.$confirm("此操作将退回起草该渠道基础变更信息, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        console.log(row);
        this.getListMixin();
        this.$message.success("删除成功");
      })
      .catch(async () => {
        console.log("取消");
      });
  }
  private remove(row: any): void {
    this.$confirm("此操作将删除该渠道基础变更信息, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await post_channelChange_delete__id({ id: row.id });
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
  search() {
    this.getListMixin();
  }
  handleSelectionChange(val: any) {
    this.selectionData = val;
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_channelChange_getList(
      this.queryPageParameters
    );
  }
  private async getChannelList(): Promise<void> {
    this.channelList = await get_channel_getAll();
  }

  async created() {
    this.getListMixin();
    this.getChannelList();
  }
}
</script>
 