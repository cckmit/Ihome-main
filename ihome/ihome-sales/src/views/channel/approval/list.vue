<!--
 * @Description:
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 09:23:40
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-12 15:05:22
--> 
--> 
<template>
  <ih-page label-width="100px">
    <template v-slot:form>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请编号">
              <el-input
                v-model="queryPageParameters.approvalNo"
                placeholder="申请编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <IhSelectPageDivision
                clearable
                placeholder="事业部"
                v-model="queryPageParameters.departmentOrgId"
              >
              </IhSelectPageDivision>
              <!-- <el-select
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
              </el-select> -->
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
            <el-form-item label="经办人">
              <IhSelectPageUser
                v-model="queryPageParameters.approvalUser"
                placeholder="经办人"
                clearable
              >
              </IhSelectPageUser>
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
          <!-- <el-col :span="8">
            <el-form-item label="OA发文文号">
              <el-input
                v-model="queryPageParameters.oaNo"
                placeholder="OA发文文号"
              ></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="searchMixin()">查询</el-button>
        <el-button
          type="success"
          @click="add()"
          v-has="'B.SALES.CHANNEL.APPROVALLIST.ADD'"
          >添加</el-button
        >
        <el-button type="info" @click="reset()">重置</el-button>
        <el-button
          type="default"
          @click="approvalUserChange()"
          v-has="'B.SALES.CHANNEL.APPROVALLIST.UPDATEMANAGER'"
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
        :empty-text="emptyText"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
<!--        <el-table-column
          fixed
          type="index"
          label="序号"
          width="50"
        ></el-table-column>-->
        <el-table-column
          prop="approvalNo"
          label="申请编号"
          min-width="120"
          fixed
        ></el-table-column>
        <el-table-column
          prop="approvalTitle"
          label="标题"
          min-width="320"
          fixed>
          <template slot-scope="scope">
            <div>{{scope.row.approvalTitle ? scope.row.approvalTitle : '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="120">
          <template slot-scope="scope">
            <IhStatusComponent
              :status="scope.row.status"
              :status-obj="{
                warning: 'Draft',
                success: 'Approved',
                error: 'ApprovalFailed',
              }">
              <div>{{scope.row.status ? $root.dictAllName(scope.row.status, "ChannelApprovalStatus") : '-'}}</div>
            </IhStatusComponent>
          </template>
        </el-table-column>
        <el-table-column
          prop="approvalUserName"
          label="经办人"
          min-width="100"
        ></el-table-column>
        <el-table-column prop="departmentName" label="事业部" min-width="220"></el-table-column>
        <el-table-column
          prop="inputTime"
          label="发起日期"
          min-width="80"
        ></el-table-column>
        <!-- <el-table-column
          prop="oaNo"
          label="OA发文文号"
          width="180"
        ></el-table-column> -->

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
                <el-dropdown-item
                  @click.native.prevent="edit(scope)"
                  v-has="'B.SALES.CHANNEL.APPROVALLIST.UPDATE'"
                  :class="{ 'ih-data-disabled': scope.row.status != 'Draft' }"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native.prevent="remove(scope)"
                  v-has="'B.SALES.CHANNEL.APPROVALLIST.DELETE'"
                  :class="{ 'ih-data-disabled': scope.row.status != 'Draft' }"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native.prevent="withdraw(scope)"
                  v-has="'B.SALES.CHANNEL.APPROVALLIST.RETURNRESEND'"
                  :class="{
                    'ih-data-disabled': scope.row.status != 'ApprovalFailed',
                  }"
                  >撤回重发</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native.prevent="downloadSupplier(scope)"
                  v-has="'B.SALES.CHANNEL.APPROVALLIST.DOWNSUPPLIER'"
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
  post_channelApproval_downloadDirectoryFile__id,
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
    total: null,
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
    if (dateArray) {
      this.queryPageParameters.inputTimeStart = dateArray[0];
      this.queryPageParameters.inputTimeEnd = dateArray[1];
    } else {
      this.queryPageParameters.inputTimeStart = null;
      this.queryPageParameters.inputTimeEnd = null;
    }
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
  async downloadSupplier(scope: any) {
    // await get_channelApproval_downloadML__id({ id: scope.row.id });
    const res: any = await post_channelApproval_downloadDirectoryFile__id({
      id: scope.row.id,
    });
    if (res) {
      let url = this.$tool.downloadLongFileUrl(res);
      console.log(url);
      (window as any).open(url);
    } else {
      this.$message.warning("无供应商目录");
    }
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
