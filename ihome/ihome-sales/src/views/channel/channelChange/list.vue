<!--
 * @Description: 渠道商变更列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-19 15:14:05
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
              <IhSelectPageByChannel
                v-model="queryPageParameters.oldChannelId"
                clearable
                placeholder="请选择渠道商"
              ></IhSelectPageByChannel>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="录入人">
              <IhSelectPageUser
                v-model="queryPageParameters.inputUser"
                clearable
              >
                <template v-slot="{ data }">
                  <span style="float: left">{{ data.name }}</span>
                  <span style="
                      margin-left: 20px;
                      float: right;
                      color: #8492a6;
                      font-size: 13px;
                    ">{{ data.account }}</span>
                </template>
              </IhSelectPageUser>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.status"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelChangeStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道跟进人">
              <IhSelectPageUser
                v-model="queryPageParameters.followUserId"
                clearable
              >
                <template v-slot="{ data }">
                  <span style="float: left">{{ data.name }}</span>
                  <span style="
                      margin-left: 20px;
                      float: right;
                      color: #8492a6;
                      font-size: 13px;
                    ">{{ data.account }}</span>
                </template>
              </IhSelectPageUser>
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
      <!-- <el-button @click="handleOpen()">变更录入人</el-button> -->
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        @selection-change="handleSelectionChange"
        :empty-text="emptyText"
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
          min-width="250"
        ></el-table-column>
        <el-table-column
          prop="followUserName"
          label="渠道跟进人"
          width="120"
        ></el-table-column>
        <!-- <el-table-column
          prop="inputUser"
          label="录入人"
          width="120"
        ></el-table-column> -->
        <el-table-column
          prop="changeTime"
          label="变更日期"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="145"
        >
          <template v-slot="{ row }">
            {{ $root.dictAllName(row.status, "ChannelChangeStatus") }}
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
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'edit')"
                  :class="{ 'ih-data-disabled': !editChange(row) }"
                  v-has="'B.SALES.CHANNEL.CHANGELIST.UPDATE'"
                >修改</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="remove(row)"
                  :class="{ 'ih-data-disabled': !editChange(row) }"
                  v-has="'B.SALES.CHANNEL.CHANGELIST.DELETE'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'confirm')"
                  :class="{'is-disabled': row.status !== 'ToBeConfirmed'}"
                  v-has="'B.SALES.CHANNEL.CHANGELIST.CONFIRM'"
                >确认</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'examine')"
                  :class="{ 'ih-data-disabled': !auditChange(row) }"
                  v-has="'B.SALES.CHANNEL.CHANGELIST.VERIFY'"
                >审核</el-dropdown-item>
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': !recallChange(row) }"
                  @click.native.prevent="handleToPage(row, 'revoke')"
                  v-has="'B.SALES.CHANNEL.CHANGELIST.REVOKE'"
                >撤回</el-dropdown-item>
                <!-- <el-dropdown-item
                  @click.native.prevent="draft(row)"
                  v-has="'B.SALES.CHANNEL.CHANGELIST.REVOKEDRAFT'"
                >退回起草</el-dropdown-item> -->
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
  post_channelChange_delete__id,
  post_channelChange_backToDraft__id,
} from "@/api/channel/index";
import PaginationMixin from "../../../mixins/pagination";
import UpdateUser from "./dialog/updateUser.vue";

@Component({
  components: { UpdateUser },
  mixins: [PaginationMixin],
})
export default class ChannelChangeList extends Vue {
  queryPageParameters: any = {
    oldChannelId: null,
    inputUser: null,
    status: null,
    followUserId: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  selectionData = [];
  dialogVisible = false;

  editChange(row: any) {
    const DRAFT = row.status === "DRAFT";
    const dangqian = (this.$root as any).userInfo.id === row.followUserId;
    return DRAFT && dangqian;
  }

  recallChange(row: any) {
    const PTWYSH = row.status === "PTWYSH";
    const FGSYGSH = row.status === "FGSYGSH";
    const ZBYGSH = row.status === "ZBYGSH";
    const roleList = (this.$root as any).userInfo.roleList.map(
      (v: any) => v.code
    );
    const pingtai = roleList.includes("RPlatformClerk");
    const fen = roleList.includes("BusinessManagement");
    const qudao = roleList.includes("RChannelStaff");
    const dangqian = (this.$root as any).userInfo.id === row.followUserId;
    const skipPlatformClerk = row.skipPlatformClerk === "true" ? true : false;
    return (
      (PTWYSH && dangqian && !skipPlatformClerk && qudao) ||
      (FGSYGSH && dangqian && skipPlatformClerk && qudao) ||
      (FGSYGSH && pingtai) ||
      (ZBYGSH && fen)
    );
  }

  auditChange(row: any) {
    const PTWYSH = row.status === "PTWYSH";
    const FGSYGSH = row.status === "FGSYGSH";
    const ZBYGSH = row.status === "ZBYGSH";
    const roleList = (this.$root as any).userInfo.roleList.map(
      (v: any) => v.code
    );
    const pingtai = roleList.includes("RPlatformClerk");
    const fen = roleList.includes("BusinessManagement");
    const zong = roleList.includes("HeadBusinessManagement");
    return (PTWYSH && pingtai) || (FGSYGSH && fen) || (ZBYGSH && zong);
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      oldChannelId: null,
      inputUser: null,
      status: null,
      followUserId: null,
    });
  }
  search() {
    this.queryPageParameters.pageNum = 1;
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
        await post_channelChange_backToDraft__id({ id: row.id });
        this.getListMixin();
        this.$message.success("退回起草成功");
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
  handleOpen() {
    if (!this.selectionData.length) {
      this.$message.warning("请先勾选表格数据");
      return;
    }
    this.dialogVisible = true;
  }
  handleSelectionChange(val: any) {
    this.selectionData = val;
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_channelChange_getList(
      this.queryPageParameters
    );
  }

  async created() {
    this.getListMixin();
  }
}
</script>
 