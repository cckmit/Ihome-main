<!--
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-12 11:14:29
--> 
<template>
  <IhPage label-width="100px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="渠道商名称">
              <IhSelectPageByChannel
                v-model="queryPageParameters.channelId"
                clearable
                placeholder="请选择渠道商"
              ></IhSelectPageByChannel>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <IhSelectPageUser
                v-model="queryPageParameters.inputUser"
                clearable>
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
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.status"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelGradeStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="入库编号">
                  <el-input
                    v-model="queryPageParameters.storageNum"
                    placeholder="入库编号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="变更日期">
                  <el-date-picker
                    v-model="changeTime"
                    type="daterange"
                    align="left"
                    style="width: 100%"
                    value-format="yyyy-MM-dd"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="$root.pickerOptions"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="事业部">
                  <IhSelectPageDivision
                    v-model="queryPageParameters.departmentOrgId"
                    clearable
                    placeholder="请选择事业部"
                  ></IhSelectPageDivision>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="呈批申请编号">
                  <el-input
                    clearable
                    v-model="queryPageParameters.approvalNo"
                    placeholder="呈批申请编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
        <el-button
          @click="handleOpen()"
          v-has="'B.SALES.CHANNEL.LEVELCHANGELIST.UPDATEENTRY'"
        >变更录入人</el-button>
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="openToggle()"
        >{{searchOpen?'收起':'展开'}}</el-link>
      </el-row>
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
          type="selection"
          width="50"
          align="center"
          fixed
        ></el-table-column>
        <el-table-column
          fixed
          label="渠道商名称"
          prop="channelName"
          min-width="220"
        ></el-table-column>
        <el-table-column
          prop="storageNum"
          label="入库编号"
          min-width="180"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="120">
          <template v-slot="{ row }">
            <IhStatusComponent
              :status="row.status"
              :status-obj="{
                warning: 'DRAFT',
                success: 'Approved'
              }">
              <div>{{ $root.dictAllName(row.status, "ChannelGradeStatus") }}</div>
            </IhStatusComponent>
          </template>
        </el-table-column>
        <el-table-column
          prop="approvalNo"
          label="呈批申请编号"
          min-width="220">
          <template v-slot="{ row }">
            <el-link
              v-if="row.approvalNo"
              type="primary"
              class="font-weight-600" @click="gotoNew(row.approvalNo)">
              {{ row.approvalNo }}</el-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="inputUserName"
          label="录入人"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="changeTime"
          label="变更日期"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="changeReason"
          label="变更原因"
          min-width="220"
        ></el-table-column>
        <el-table-column
          prop="departmentName"
          label="事业部"
          min-width="230">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="120">
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="handleToPage(row, 'info')"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              style="margin-left: 15px"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'edit')"
                  :class="{ 'ih-data-disabled': !editChange(row) }"
                  v-has="'B.SALES.CHANNEL.LEVELCHANGELIST.UPDATE'"
                >修改</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="remove(row)"
                  :class="{ 'ih-data-disabled': !editChange(row) }"
                  v-has="'B.SALES.CHANNEL.LEVELCHANGELIST.DELETE'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'revoke')"
                  :class="{ 'ih-data-disabled': !recallChange(row) }"
                  v-has="'B.SALES.CHANNEL.LEVELCHANGELIST.REVOKE'"
                >撤回</el-dropdown-item>
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': !auditChange(row) }"
                  @click.native.prevent="handleToPage(row, 'examine')"
                  v-has="'B.SALES.CHANNEL.LEVELCHANGELIST.VERIFY'"
                >审核</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="backDraft(row)"
                  :class="{'ih-data-disabled': row.status !== 'PASS'}"
                  v-has="'B.SALES.CHANNEL.LEVELCHANGELIST.REVOKEDRAFT'"
                >退回起草</el-dropdown-item>
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
  post_channelGradeChange_getList,
  post_channelGradeChange_delete__id,
  post_channelGradeChange_backToDraft__id, get_channelApproval_getIdByCode__approvalNo,
} from "@/api/channel/index";
import UpdateUser from "./dialog/updateUser.vue";
import PaginationMixin from "../../../mixins/pagination";

@Component({
  components: { UpdateUser },
  mixins: [PaginationMixin],
})
export default class LevelChangeList extends Vue {
  private searchOpen = false;
  queryPageParameters: any = {
    channelId: null,
    inputUser: null,
    status: null,
    storageNum: null,
    departmentOrgId: null,
    changeTimeStart: null,
    changeTimeEnd: null,
    approvalNo: null,
  };
  changeTime: any = null;
  resPageInfo: any = {
    total: null,
    list: [],
  };
  dialogVisible = false;
  selectionData = [];

  // 查询条件折叠/展开
  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }

  // 呈批申请编号跳转
  async gotoNew(approvalNo: any) {
    if (approvalNo) {
      console.log(approvalNo);
      let id: any = await get_channelApproval_getIdByCode__approvalNo({
        approvalNo: approvalNo,
      });
      if (id) {
        window.open(`/web-sales/approval/info?id=${id}`);
      } else {
        this.$message.warning("没获取到对应的呈批id");
      }
    }
  }

  editChange(row: any) {
    const DRAFT = row.status === "DRAFT";
    const dangqian = (this.$root as any).userInfo.id === row.inputUser;
    return DRAFT && dangqian;
  }

  auditChange(row: any) {
    const PTWYSH = row.status === "PTWYSH";
    const FGSYGSH = row.status === "FGSYGSH";
    const ZBYGSH = row.status === "ZBYGSH";
    const RHeadBusinessManagement = this.$roleTool.RHeadBusinessManagement();
    const RBusinessManagement = this.$roleTool.RBusinessManagement();
    const RPlatformClerk = this.$roleTool.RPlatformClerk();
    return (
      (PTWYSH && RPlatformClerk) ||
      (FGSYGSH && RBusinessManagement) ||
      (ZBYGSH && RHeadBusinessManagement)
    );
  }

  recallChange(row: any) {
    const PTWYSH = row.status === "PTWYSH";
    const FGSYGSH = row.status === "FGSYGSH";
    const ZBYGSH = row.status === "ZBYGSH";
    const RPlatformClerk = this.$roleTool.RPlatformClerk();
    const RBusinessManagement = this.$roleTool.RBusinessManagement();
    const RChannelStaff = this.$roleTool.RChannelStaff();
    const dangqian = (this.$root as any).userInfo.id === row.followUserId;
    const skipPlatformClerk = row.skipPlatformClerk === "true" ? true : false;
    return (
      (PTWYSH && dangqian && !skipPlatformClerk && RChannelStaff) ||
      (FGSYGSH && dangqian && skipPlatformClerk && RChannelStaff) ||
      (FGSYGSH && RPlatformClerk) ||
      (ZBYGSH && RBusinessManagement)
    );
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      channelId: null,
      inputUser: null,
      status: null,
      storageNum: null,
      departmentOrgId: null,
      changeTimeStart: null,
      changeTimeEnd: null,
      approvalNo: null,
    });
    this.changeTime = null;
  }
  search() {
    let sign = this.changeTime && this.changeTime.length;
    this.queryPageParameters.changeTimeStart = sign ? this.changeTime[0] : null;
    this.queryPageParameters.changeTimeEnd = sign ? this.changeTime[1] : null;
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  handleSelectionChange(val: any) {
    this.selectionData = val;
  }
  /**
   * @description: 退回起草
   * @param {any} row
   */
  private backDraft(row: any): void {
    this.$confirm("此操作将该渠道等级变更信息退回起草, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await post_channelGradeChange_backToDraft__id({ id: row.id });
        this.getListMixin();
        this.$message.success("退回起草成功");
      })
      .catch(async () => {
        console.log("取消");
      });
  }
  /**
   * @description: 删除当前 -- 只有草稿状态能删除
   * @param {any} row
   */
  private remove(row: any): void {
    this.$confirm("此操作将删除该渠道等级变更信息, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await post_channelGradeChange_delete__id({ id: row.id });
        // 删除list最后一条数据 返回前一页面
        if (this.resPageInfo.list.length === 1) {
          this.queryPageParameters.pageNum === 1
            ? (this.queryPageParameters.pageNum = 1)
            : this.queryPageParameters.pageNum--;
        }
        await this.getListMixin();
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
  private handleOpen() {
    if (!this.selectionData.length) {
      this.$message.warning("请先勾选表格数据");
      return;
    }
    this.dialogVisible = true;
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_channelGradeChange_getList(
      this.queryPageParameters
    );
  }

  async created() {
    this.getListMixin();
  }
}
</script>
 