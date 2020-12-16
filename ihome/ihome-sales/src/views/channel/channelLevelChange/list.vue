<!--
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-16 19:59:11
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
          type="info"
          @click="reset()"
        >重置</el-button>
        <el-button @click="handleOpen()">变更录入人</el-button>
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
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="storageNum"
          label="入库编号"
          min-width="170"
        ></el-table-column>
        <el-table-column
          prop="inputUserName"
          label="录入人"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="changeTime"
          label="变更日期"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="departmentName"
          label="事业部"
          min-width="225"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="135"
        >
          <template v-slot="{ row }">
            {{ $root.dictAllName(row.status, "ChannelGradeStatus") }}
          </template>
        </el-table-column>
        <el-table-column
          prop="changeReason"
          label="变更原因"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="150"
        >
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
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'edit')"
                  :disabled="row.status !== 'DRAFT'"
                  v-has="'B.SALES.CHANNEL.LEVELCHANGELIST.UPDATE'"
                >修改</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="remove(row)"
                  :disabled="row.status !== 'DRAFT'"
                  v-has="'B.SALES.CHANNEL.LEVELCHANGELIST.DELETE'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'revoke')"
                  :disabled="row.status !== 'PTWYSH'"
                  v-has="'B.SALES.CHANNEL.LEVELCHANGELIST.REVOKE'"
                >撤回</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'examine')"
                  v-has="'B.SALES.CHANNEL.LEVELCHANGELIST.VERIFY'"
                >审核</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="backDraft(row)"
                  :disabled="row.status !== 'PASS'"
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
  post_channelGradeChange_backToDraft__id,
} from "@/api/channel/index";
import UpdateUser from "./dialog/updateUser.vue";
import PaginationMixin from "../../../mixins/pagination";

@Component({
  components: { UpdateUser },
  mixins: [PaginationMixin],
})
export default class LevelChangeList extends Vue {
  queryPageParameters: any = {
    channelId: null,
    inputUser: null,
    status: null,
    storageNum: null,
    departmentOrgId: null,
    changeTimeStart: null,
    changeTimeEnd: null,
  };
  changeTime: any = null;
  resPageInfo: any = {
    total: null,
    list: [],
  };
  dialogVisible = false;
  selectionData = [];

  reset() {
    Object.assign(this.queryPageParameters, {
      channelId: null,
      inputUser: null,
      status: null,
      storageNum: null,
      departmentOrgId: null,
      changeTimeStart: null,
      changeTimeEnd: null,
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
 