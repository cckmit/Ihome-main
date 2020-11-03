<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 09:23:40
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-03 10:12:28
--> 
--> 
<template>
  <ih-page label-width="100px">
    <template v-slot:form>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-select
                v-model="queryPageParameters.departmentOrgId"
                clearable
                placeholder="事业部"
                class="width--100"
              >
                <el-option
                  v-for="item in divisionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发起日期">
              <el-date-picker
                style="width: 100%"
                v-model="queryPageParameters.inputTime"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
                @change="inputTimeChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人">
              <el-select
                v-model="queryPageParameters.approvalUser"
                clearable
                placeholder="经办人"
                class="width--100"
              >
                <el-option
                  v-for="item in approvalUserList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请编号">
              <el-input
                v-model="queryPageParameters.approvalNo"
                placeholder="申请编号"
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
                  v-for="item in $root.dictAllList('ChannelApprovalStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="OA发文文号">
              <el-input
                v-model="queryPageParameters.oaNo"
                placeholder="OA发文文号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="getListMixin()">查询</el-button>
        <el-button type="success" @click="add()">添加</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
        <el-button type="default" @click="approvalUserChange()"
          >变更经办人</el-button
        >
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column
          prop="approvalNo"
          label="申请编号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="approvalTitle"
          label="标题"
          width="240"
        ></el-table-column>
        <el-table-column
          prop="departmentOrgId"
          label="事业部"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="inputTime"
          label="发起日期"
          width="180"
        ></el-table-column>
        <el-table-column prop="approvalUser" label="经办人"></el-table-column>

        <el-table-column label="状态" width="120">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.status, "ChannelApprovalStatus")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="oaNo"
          label="OA发文文号"
          width="180"
        ></el-table-column>

        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-link
              class="margin-right-10"
              type="primary"
              @click.native.prevent="info(scope)"
              >详情</el-link
            >
            <el-dropdown trigger="click" style="margin-left: 15px">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="edit(scope)"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="remove(scope)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="withdraw(scope)"
                  >撤回重发</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native.prevent="downloadSupplier(scope)"
                  >下载供应商名录</el-dropdown-item
                >
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
    <ih-dialog :show="changeUserVisible" desc="变更经办人">
      <ApprovalChangeUser
        :data="selectList"
        @cancel="() => (changeUserVisible = false)"
        @finish="
          (data) => {
            changeUserVisible = false;
            finishChangeUser(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  post_channelApproval_getList,
  post_channelApproval_delete__id,
  post_channelApproval_backToDraft__id,
  get_channelApproval_downloadML__id,
} from "../../../api/channel/index";

import PaginationMixin from "../../../mixins/pagination";
import ApprovalChangeUser from "./dialog/change-user.vue";
@Component({
  components: { ApprovalChangeUser },
  mixins: [PaginationMixin],
})
export default class InvitationCodeList extends Vue {
  queryPageParameters: any = {
    approvalNo: null,
    approvalUser: null,
    departmentOrgId: null,
    inputTimeEnd: null,
    inputTimeStart: null,
    oaNo: null,
    status: null,
  };

  divisionList: any = []; //事业部列表
  approvalUserList: any = []; //经办人
  selectList: any = []; //勾选的数据
  changeUserVisible: any = false;

  resPageInfo: any = {
    total: 0,
    list: [],
  };
  dialogAdd = false;

  async getListMixin() {
    this.resPageInfo = await post_channelApproval_getList(
      this.queryPageParameters
    );
  }

  async created() {
    this.getListMixin();
  }
  inputTimeChange(dateArray: any) {
    this.queryPageParameters.inputTimeStart = dateArray[0];
    this.queryPageParameters.inputTimeEnd = dateArray[1];
  }
  async remove(scope: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      //   const res = await get_channelInvitationCode_delete__invitationCode({
      //     invitationCode: scope.row.invitationCode,
      //   });
      //   console.log(res);
      await post_channelApproval_delete__id({ id: scope.row.id });
      this.resPageInfo.list.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
  info(scope: any) {
    this.$router.push({
      path: "/approval/info",
      query: { id: scope.row.id },
    });
  }
  reset() {
    Object.assign(this.queryPageParameters, {
      approvalNo: null,
      approvalUser: null,
      departmentOrgId: null,
      inputTimeEnd: null,
      inputTimeStart: null,
      oaNo: null,
      status: null,
    });
  }
  finishAdd() {
    this.getListMixin();
  }
  async add() {
    this.$router.push({
      path: "/approval/add",
    });
  }
  async edit(scope: any) {
    this.$router.push({
      path: "/approval/add",
      query: { id: scope.row.id },
    });
  }
  async withdraw(scope: any) {
    try {
      await this.$confirm("是否确定撤回?", "提示");
      await post_channelApproval_backToDraft__id({
        id: scope.row.id,
      });

      this.$message({
        type: "success",
        message: "撤回成功!",
      });
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }
  async downloadSupplier() {
    // await get_channelApproval_downloadML__id({ id: scope.row.id });
    this.$message.warning("未实现");
    get_channelApproval_downloadML__id;
  }

  handleSelectionChange(val: any) {
    this.selectList = val;
  }
  approvalUserChange() {
    if (this.selectList && this.selectList.length > 0) {
      // let p = {
      //   list: this.selectList.map((item: any) => {
      //     return item.id;
      //   }),
      // };
      this.changeUserVisible = true;
    } else {
      this.$message.warning("请先勾选数据");
    }
  }
  finishChangeUser(data: any) {
    if (data) {
      this.getListMixin();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
