<!--
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-23 17:41:31
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
                v-model="queryPageParameters.channelId"
                clearable
                placeholder="请选择"
                class="width--100"
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
                v-model="queryPageParameters.changeTime"
                type="date"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-select
                v-model="queryPageParameters.departmentOrgId"
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
          prop="channelId"
          min-width="200"
        ></el-table-column>
        <el-table-column
          fixed
          prop="storageNum"
          label="入库编号"
          min-width="170"
        ></el-table-column>
        <el-table-column
          prop="inputUser"
          label="录入人"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="changeTime"
          label="变更日期"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="departmentOrgId"
          label="事业部"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="130"
        >
          <template v-slot="{ row }">
            {{ $root.dictAllName(row.status, 'ChannelGradeStatus') }}
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
                >修改</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="remove(row)"
                  :disabled="row.status !== 'DRAFT'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'revoke')"
                  :disabled="row.status !== 'PTWYSH'"
                >撤回</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleToPage(row, 'examine')">审核</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="backDraft(row)"
                  :disabled="row.status !== 'PASS'"
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
  get_channel_getAll,
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
    channelId: "",
    inputUser: "",
    status: "",
    storageNum: "",
    departmentOrgId: "",
    changeTime: "",
  };
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  dialogVisible = false;
  selectionData = [];
  private channelList: any = [];

  // 测试数据
  testList = [
    { value: "管理员1", id: 1 },
    { value: "管理员2", id: 2 },
    { value: "管理员3", id: 3 },
  ];

  reset() {
    this.queryPageParameters = {
      channelId: "",
      inputUser: "",
      status: "",
      storageNum: "",
      departmentOrgId: "",
      changeTime: "",
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
    };
  }
  search() {
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
  private async getChannelList(): Promise<void> {
    this.channelList = await get_channel_getAll();
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_channelGradeChange_getList(
      this.queryPageParameters
    );
  }

  async created() {
    this.getListMixin();
    this.getChannelList();
  }
}
</script>
 