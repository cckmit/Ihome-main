<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-13 09:41:09
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录账号">
              <el-input v-model="queryPageParameters.account" placeholder="登录账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="queryPageParameters.name" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户类型">
              <el-select
                v-model="queryPageParameters.accountType"
                clearable
                placeholder="请选择用户类型"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('accountType')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input v-model="queryPageParameters.mobilePhone" placeholder="手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工工号">
                  <el-input v-model="queryPageParameters.employeeCode" placeholder="员工工号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账号状态">
                  <el-select
                    v-model="queryPageParameters.status"
                    clearable
                    placeholder="请选择账号状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in  $root.displayList('accountStatus')"
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
                <el-form-item label="入职日期">
                  <el-date-picker
                    style="width:100%;"
                    v-model="queryPageParameters.employmentDate"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd"
                    @change="employmentDateChange"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="离职日期">
                  <el-date-picker
                    style="width:100%;"
                    v-model="queryPageParameters.leaveDate"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd"
                    @change="leaveDateChange"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="雇员状态">
                  <el-select
                    v-model="queryPageParameters.employeeStatus"
                    clearable
                    placeholder="请选择雇员状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('employeeStatus')"
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
                <el-form-item label="归属组织">
                  <SelectOrganizationTree
                    :orgId="queryPageParameters.orgId"
                    @callback="(id)=>queryPageParameters.orgId=id"
                  />
                  <!-- <IhSelectTree
                    min-height="400px"
                    class="width--100"
                    :props="props"
                    :options="list"
                    :value="queryPageParameters.orgId"
                    :clearable="true"
                    :accordion="true"
                    @getValue="getValue($event)"
                  />-->
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="人员类型">
                  <el-select
                    v-model="queryPageParameters.employeeType"
                    clearable
                    placeholder="请选择人员类型"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('employeeType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职能类别">
                  <el-select
                    v-model="queryPageParameters.workType"
                    clearable
                    placeholder="请选择职能类别"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('workType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="success" @click="add()">添加</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
        <el-button @click="copyUser()">复制用户岗位角色组织权限</el-button>
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
        :default-sort="{prop: 'id', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed type="selection" width="50"></el-table-column>
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed prop="name" label="姓名" width="90"></el-table-column>
        <el-table-column fixed prop="account" label="登录账号" width="150"></el-table-column>
        <el-table-column prop="mobilePhone" label="手机号码" width="120"></el-table-column>
        <el-table-column prop="accountType" label="用户类型" width="120">
          <!-- <template slot-scope="scope">{{getAccountTypeName(scope.row.accountType)}}</template> -->
          <template slot-scope="scope">{{$root.displayName('accountType',scope.row.accountType)}}</template>
        </el-table-column>
        <el-table-column prop="orgName" label="归属组织" width="300"></el-table-column>
        <el-table-column prop="employeeCode" label="员工工号" width="150"></el-table-column>
        <el-table-column prop="status" label="账号状态" width="120">
          <template slot-scope="scope">{{$root.displayName('accountStatus',scope.row.status)}}</template>
        </el-table-column>
        <el-table-column prop="employeeStatus" label="雇员状态">
          <template
            slot-scope="scope"
          >{{$root.displayName('employeeStatus',scope.row.employeeStatus)}}</template>
        </el-table-column>
        <el-table-column prop="employmentDate" label="入职日期" width="120"></el-table-column>
        <el-table-column prop="leaveDate" label="离职日期" width="120"></el-table-column>
        <el-table-column prop="employeeType" label="人员类型">
          <template slot-scope="scope">{{$root.displayName('employeeType',scope.row.employeeType)}}</template>
        </el-table-column>
        <el-table-column prop="workType" label="职能类别">
          <template slot-scope="scope">{{$root.displayName('workType',scope.row.workType)}}</template>
        </el-table-column>
        <el-table-column prop="updateUserName" label="修改人"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" width="150"></el-table-column>

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-link type="primary" @click.native.prevent="info(scope)">详情</el-link>
            <el-dropdown trigger="click" style="margin-left:15px;">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="edit(scope)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="remove(scope)">删除</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="locking(scope)">锁定用户</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="activation(scope)">激活用户</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="resetPassword(scope)">重置密码</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="jobRole(scope)">分配岗位角色</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="pOrganization(scope)">分配组织权限</el-dropdown-item>
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

    <ih-dialog :show="dialogVisible" desc="用户新增编辑">
      <UserAdd
        :data="addData"
        @cancel="()=>dialogVisible=false"
        @finish="(data)=>{dialogVisible=false;finish(data)}"
      />
    </ih-dialog>

    <ih-dialog :show="jobVisible" desc="分配岗位角色">
      <UserJobRole
        :data="jobVisibleData"
        @cancel="()=>jobVisible=false"
        @finish="(data)=>{jobVisible=false;finishJob(data)}"
      />
    </ih-dialog>
    <ih-dialog :show="organizationJurisdictionVisible" desc="分配组织权限">
      <OrganizationJurisdiction
        :data="OrganizationJurisdictionData"
        @cancel="()=>organizationJurisdictionVisible=false"
        @finish="(data)=>{organizationJurisdictionVisible=false;finishJob(data)}"
      />
    </ih-dialog>
    <ih-dialog :show="copyUserVisible" desc="复制用户岗位角色组织权限">
      <CopyUsers
        :data="copyUserData"
        @cancel="()=>copyUserVisible=false"
        @finish="(data)=>{copyUserVisible=false;finishCopyUser(data)}"
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserAdd from "./add.vue";
import UserJobRole from "./dialog/job.vue";
import CopyUsers from "./dialog/copy-users.vue";
import OrganizationJurisdiction from "@/components/OrganizationJurisdiction.vue";
import SelectOrganizationTree from "@/components/SelectOrganizationTree.vue";
import {
  post_user_getList,
  post_user_delete__id,
  post_user_lock__id,
  post_user_activate__id,
  post_user_resetPassword__id,
} from "../../api/system/index";
import PaginationMixin from "../../mixins/pagination";
 
@Component({
  components: {
    UserAdd,
    UserJobRole,
    OrganizationJurisdiction,
    CopyUsers,
    SelectOrganizationTree,
  },
  mixins: [PaginationMixin],
})
export default class UserList extends Vue {
  queryPageParameters: any = {
    account: null,
    accountType: "Ihome",
    employeeCode: null,
    employeeStatus: "On",
    employeeType: "Formal",
    employmentDateEnd: null,
    employmentDateStart: null,
    employmentDate: null,
    leaveDateEnd: null,
    leaveDateStart: null,
    leaveDate: null,
    mobilePhone: null,
    name: null,
    orgId: null,
    permissionOrgId: null,
    status: "Valid",
    workType: null,
  };
  jobVisibleData: any = null;
  OrganizationJurisdictionData: any = null;
  copyUserData: any = null;
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  employmentDateChange(dateArray: any) {
    console.log(dateArray);
    this.queryPageParameters.employmentDateStart = dateArray[0];
    this.queryPageParameters.employmentDateEnd = dateArray[1];
  }
  leaveDateChange(dateArray: any) {
    console.log(dateArray);
    this.queryPageParameters.leaveDateStart = dateArray[0];
    this.queryPageParameters.leaveDateEnd = dateArray[1];
  }

  reset() {
    this.queryPageParameters = {
      account: null,
      accountType: "Ihome",
      employeeCode: null,
      employeeStatus: "On",
      employeeType: "Formal",
      employmentDateEnd: null,
      employmentDateStart: null,
      employmentDate: null,
      leaveDateEnd: null,
      leaveDateStart: null,
      leaveDate: null,
      mobilePhone: null,
      name: null,
      orgId: null,
      permissionOrgId: null,
      status: "Valid",
      workType: null,
    };
  }

  addData: any = null;
  value: any = "";
  searchOpen = true;

  organizationJurisdictionVisible = false;
  jobVisible = false;
  copyUserVisible = false;

  currentPage: any = 1;
  valuedate: any = new Date().getTime();
  // valuedate: any ='2020-07-01';
  tableData: any = [];
  total: any = null;

  formatter(row: any) {
    return row.name;
  }

  openToggle() {
    this.searchOpen = !this.searchOpen;
  }
  dialogVisible = false;

  add(data: any) {
    this.addData = data;
    this.dialogVisible = true;
  }

  finishJob(data: any) {
    console.log(data);
    this.search();
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_user_getList(this.queryPageParameters);
  }

  getValue(value: any) {
    this.queryPageParameters.orgId = value;
  }

  search() {
    console.log(this.queryPageParameters);
    console.log(this.valuedate);
    this.getListMixin();
  }

  info(scope: any) {
    this.$router.push({
      path: "/user/info",
      query: { id: scope.row.id },
    });
  }
  edit(scope: any) {
    this.add(scope.row);
  }
  jobRole(scope: any) {
    console.log(scope);
    this.jobVisibleData = scope.row;
    this.jobVisible = true;
  }
  pOrganization(scope: any) {
    console.log(scope);
    this.OrganizationJurisdictionData = scope.row;
    this.organizationJurisdictionVisible = true;
  }

  async remove(scope: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_user_delete__id({ id: scope.row.id });
      this.resPageInfo.list.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async locking(scope: any) {
    console.log(scope);
    try {
      await this.$confirm("是否确定锁定用户?", "提示");
      await post_user_lock__id({ id: scope.row.id });

      this.$message({
        type: "success",
        message: "锁定成功!",
      });
      this.search();
    } catch (error) {
      console.log(error);
    }
  }
  async activation(scope: any) {
    console.log(scope);
    try {
      await this.$confirm("是否确定激活用户?", "提示");
      await post_user_activate__id({ id: scope.row.id });

      this.$message({
        type: "success",
        message: "激活成功!",
      });
      this.search();
    } catch (error) {
      console.log(error);
    }
  }
  async resetPassword(scope: any) {
    console.log(scope);
    try {
      await this.$confirm("是否确定重置密码?", "提示");
      const res = await post_user_resetPassword__id({ id: scope.row.id });
      this.$alert(res, "密码重置成功");
    } catch (error) {
      console.log(error);
    }
  }
  copyUser() {
    if (this.copyUserData && this.copyUserData.length > 0) {
      this.copyUserVisible = true;
    } else {
      this.$message.warning("请先选择数据");
    }
  }
  finishCopyUser(data: any) {
    console.log(data);
    this.search();
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.copyUserData = val;
  }
}
</script>
<style lang="scss" scoped>
</style>
 