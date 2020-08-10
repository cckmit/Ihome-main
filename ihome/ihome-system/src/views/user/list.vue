<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-10 17:38:35
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
                  v-for="item in accountTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-if="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input v-model="queryPageParameters.phone" placeholder="手机号码"></el-input>
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
                      v-for="item in accountStatusOptions"
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
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
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
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
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
                      v-for="item in employeeStatusOptions"
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
                  <IhSelectTree
                    min-height="400px"
                    class="width--100"
                    :props="props"
                    :options="list"
                    :value="queryPageParameters.orgId"
                    :clearable="true"
                    :accordion="true"
                    @getValue="getValue($event)"
                  />
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
                      v-for="item in employeeTypeOptions"
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
                      v-for="item in workTypeOptions"
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
      >
        <el-table-column fixed type="selection" width="50"></el-table-column>
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed prop="name" label="姓名" sortable width="90"></el-table-column>
        <el-table-column fixed prop="account" label="登录账号" sortable width="150"></el-table-column>
        <el-table-column prop="mobilePhone" label="手机号码" width="120"></el-table-column>
        <el-table-column prop="accountType" label="用户类型" sortable width="120">
          <template slot-scope="scope">{{getAccountTypeName(scope.row.accountType)}}</template>
        </el-table-column>
        <el-table-column prop="orgName" label="归属组织" sortable width="300"></el-table-column>
        <el-table-column prop="employeeCode" label="员工工号" width="150"></el-table-column>
        <el-table-column prop="status" label="账号状态" sortable width="120">
          <template slot-scope="scope">{{getAccountStatusName(scope.row.status)}}</template>
        </el-table-column>
        <el-table-column prop="employeeStatus" label="雇员状态">
          <template slot-scope="scope">{{getEmployeeStatusName(scope.row.employeeStatus)}}</template>
        </el-table-column>
        <el-table-column prop="employmentDate" label="入职日期" width="120"></el-table-column>
        <el-table-column prop="leaveDate" label="离职日期" width="120"></el-table-column>
        <el-table-column prop="employeeType" label="人员类型">
          <template slot-scope="scope">{{getEmployeeTypeName(scope.row.employeeType)}}</template>
        </el-table-column>
        <el-table-column prop="workType" label="职能类别">
          <template slot-scope="scope">{{getWorkTypeName(scope.row.workType)}}</template>
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

    <ih-dialog :show="myOrganizationVisible">
      <MyOrganization
        :currentId="valueVal"
        @cancel="()=>myOrganizationVisible=false"
        @finish="(data)=>{myOrganizationVisible=false;finish(data)}"
      />
    </ih-dialog>

    <ih-dialog :show="jobVisible">
      <UserJobRole
        :data="jobVisibleData"
        @cancel="()=>jobVisible=false"
        @finish="(data)=>{jobVisible=false;finishJob(data)}"
      />
    </ih-dialog>
    <ih-dialog :show="organizationJurisdictionVisible">
      <OrganizationJurisdiction
        :data="addData"
        @cancel="()=>organizationJurisdictionVisible=false"
        @finish="(data)=>{organizationJurisdictionVisible=false;finishJob(data)}"
      />
    </ih-dialog>
    <ih-dialog :show="copyUserVisible">
      <CopyUsers
        :data="addData"
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

// import IhDialog from "@/components/IhDialog.vue";
import MyOrganization from "@/components/MyOrganization.vue";
import OrganizationJurisdiction from "@/components/OrganizationJurisdiction.vue";
import MyPagination from "@/components/my-pagination.vue";
// import { organization, userList } from "../../api/system/index2";
import {
  get_org_getAll,
  post_user_getList,
  post_user_delete__id,
  post_user_lock__id,
  post_user_activate__id,
  post_user_resetPassword__id,
} from "../../api/system/index";
import PaginationMixin from "../../mixins/pagination";

// import { getResourceByIdUsingGET } from "../../api/system";
import {
  getListTool,
  accountType,
  accountStatus,
  employeeStatus,
  employeeType,
  workType,
} from "../../util/enums/dic";
@Component({
  components: {
    UserAdd,
    MyPagination,
    MyOrganization,
    UserJobRole,
    OrganizationJurisdiction,
    CopyUsers,
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
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  get accountTypeOptions() {
    let list = getListTool(accountType);
    return list;
  }
  get accountStatusOptions() {
    let list = getListTool(accountStatus);
    return list;
  }
  get employeeStatusOptions() {
    let list = getListTool(employeeStatus);
    return list;
  }
  get employeeTypeOptions() {
    let list = getListTool(employeeType);
    return list;
  }
  get workTypeOptions() {
    let list = getListTool(workType);
    return list;
  }
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
  pickerOptions: any = {
    shortcuts: [
      {
        text: "最近一周",
        onClick(picker: any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: "最近一个月",
        onClick(picker: any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: "最近三个月",
        onClick(picker: any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit("pick", [start, end]);
        },
      },
    ],
  };
  getAccountTypeName(key: string) {
    return accountType[key];
  }
  getAccountStatusName(key: string) {
    return accountStatus[key];
  }
  getEmployeeStatusName(key: string) {
    return employeeStatus[key];
  }
  getEmployeeTypeName(key: string) {
    return employeeType[key];
  }
  getWorkTypeName(key: string) {
    return workType[key];
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
  myOrganizationVisible = false;
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

  finish(data: any) {
    console.log(data);
    this.valueVal = data?.id;
    this.valueZZ = data?.name;
    this.search();
  }
  finishJob(data: any) {
    console.log(data);
  }

  // valueId: any = null; // 初始ID（可选）
  props = {
    // 配置项（必选）
    value: "id",
    label: "name",
    children: "children",
    defaultExpandedKeys: [1],
    // defaultCheckedKeys: ["1D29BB468F504774ACE653B946A393EE"]
  };
  // 选项列表（必选）
  list: any = [];
  async created() {
    let listOrg = await get_org_getAll({ onlyValid: true });
    if (listOrg && listOrg.length > 0) {
      listOrg[0].parentId = 0;
    }
    console.log(listOrg);
    this.list = this.$tool.listToGruop(listOrg, {
      id: "id",
      children: "children",
      parentId: "parentId",
      rootId: 0,
    });
    console.log(this.list);

    this.getListMixin();
  }
  async getListMixin() {
    console.log("页面中调用getListMixin");
    this.resPageInfo = await post_user_getList(this.queryPageParameters);

    console.log(this.resPageInfo);
  }

  getValue(value: any) {
    this.queryPageParameters.orgId = value;
  }

  search() {
    console.log(this.queryPageParameters);
    console.log(this.valuedate);
    this.getListMixin();
  }

  valueZZ: any = null;
  valueVal: any = null;
  selectZZ() {
    console.log("选择归属组织");
    this.myOrganizationVisible = true;
  }
  clear() {
    console.log("clear");
    this.valueVal = null;
    this.valueZZ = null;
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
    this.copyUserVisible = true;
  }
  finishCopyUser(data: any) {
    console.log(data);
  }
}
</script>
<style lang="scss" scoped>
.btn-list {
  text-align: left;
  margin-left: 80px;
}
</style>
 