<!--
 * @Descripttion: 渠道经纪人列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-18 09:14:40
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-20 10:23:00
-->
<template>
  <IhPage>
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input
                v-model="queryPageParameters.name"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号">
              <el-input
                v-model="queryPageParameters.mobile"
                placeholder="手机号"
              ></el-input>
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
                  v-for="item in $root.dictAllList('ValidType')"
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
            <el-form-item label="结佣权限">
              <el-select
                v-model="queryPageParameters.settlementFlag"
                clearable
                placeholder="结佣权限"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('HasOrNoType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
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
          type="success"
          @click="add()"
        >添加</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
      </el-row>
    </template>
    <br />
    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        > </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="170"
        ></el-table-column>

        <el-table-column
          prop="mobile"
          label="手机号码"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="settlementFlag"
          label="结佣权限"
          min-width="170"
        >
          <template v-slot="{ row }">
            <span>{{$root.dictAllName(row.settlementFlag, 'HasOrNoType').name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="120"
        >
          <template v-slot="{ row }">
            <span>{{$root.dictAllName(row.status, 'ValidType').name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="handleEdit(row)"
            >修改</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="handleSwitch(row, false)">关闭</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleSwitch(row, true)">启用</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleDelete(row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <template v-slot:pagination>
      <br />
      <el-pagination
        @size-change="handleSizeChangeMixin"
        @current-change="handleCurrentChangeMixin"
        :current-page.sync="queryPageParameters.pageNum"
        :page-sizes="$root.pageSizes"
        :page-size="queryPageParameters.pageSize"
        :page-num="queryPageParameters.pageNum"
        :layout="$root.paginationLayout"
        :total="resPageInfo.total"
      ></el-pagination>
    </template>
    <!-- dialog -->
    <IhDialog
      :show="dialogFormVisible"
      desc="渠道经纪人"
    >
      <AgentDialog
        :isAdd="isAdd"
        :channelId="$route.query.id"
        :data="agentData"
        @cancel="() => (dialogFormVisible = false)"
        @finish="(val) => {
          dialogFormVisible = false;
          if (val) queryPageParameters.pageNum = 1;
          getListMixin()
        }"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  post_channelAgent_getList,
  post_channelAgent_delete__id,
  post_channelAgent_disable__id,
  post_channelAgent_enable__id,
} from "@/api/channel/index";
import PaginationMixin from "@/mixins/pagination";
import AgentDialog from "./dialog/agentDailog.vue";

@Component({
  components: { AgentDialog },
  mixins: [PaginationMixin],
})
export default class Maintenance extends Vue {
  queryPageParameters: any = {
    settlementFlag: "",
    status: "",
    name: "",
    mobile: "",
  };

  dialogFormVisible: any = false;
  isAdd = true;
  agentData: object = {};
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  reset() {
    this.queryPageParameters = {
      settlementFlag: "",
      status: "",
      name: "",
      mobile: "",
      pageSize: this.queryPageParameters.pageSize,
      pageNum: this.queryPageParameters.pageNum,
    };
  }
  /**
   * @description: 开启/关闭渠道经纪人
   * @param {any} row
   * @param {boolean} type
   */
  private async handleSwitch(row: any, type: boolean): Promise<void> {
    this.$confirm(
      `此操作将${type ? "开启" : "关闭"}该渠道经纪人, 是否继续?`,
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(async () => {
        type
          ? await post_channelAgent_enable__id({ id: row.id })
          : await post_channelAgent_disable__id({ id: row.id });
        this.getListMixin();
        this.$message.success(`${type ? "开启" : "关闭"}成功`);
      })
      .catch(async () => {
        console.log("取消");
      });
  }
  /**
   * @description: 删除渠道经纪人
   * @param {any} row
   */
  private async handleDelete(row: any): Promise<void> {
    this.$confirm("此操作将删除该渠道经纪人, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await post_channelAgent_delete__id({ id: row.id });
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
  add() {
    this.dialogFormVisible = true;
    this.isAdd = true;
  }
  handleEdit(row: any) {
    this.dialogFormVisible = true;
    this.agentData = { ...row };
    this.isAdd = false;
  }
  async getListMixin() {
    this.resPageInfo = await post_channelAgent_getList(
      this.queryPageParameters
    );
  }

  async created() {
    this.getListMixin();
  }
}
</script>