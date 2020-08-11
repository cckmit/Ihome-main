<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 16:53:27
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-11 15:45:21
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="批量分配用户"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1000px"
    style="text-align: left;"
    class="dialog"
    top="50px"
  >
    <div>
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录账号">
              <el-input placeholder="登录账号" v-model="queryPageParameters.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input placeholder="姓名" v-model="queryPageParameters.name"></el-input>
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
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码">
              <el-input placeholder="手机号码" v-model="queryPageParameters.mobilePhone"></el-input>
            </el-form-item>
          </el-col>
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
            <el-form-item label="账号状态">
              <el-select
                v-model="queryPageParameters.status"
                clearable
                placeholder="请选择状态"
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
            <el-form-item label="雇员状态">
              <el-select
                v-model="queryPageParameters.employeeStatus"
                clearable
                placeholder="请选择状态"
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
          <el-col :span="8">
            <el-form-item label="归属组织">
              <IhSelectTree
                min-height="400px"
                class="width--100"
                :props="props"
                :options="orgList"
                :value="queryPageParameters.orgId"
                :clearable="true"
                :accordion="true"
                @getValue="getValue($event)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label>
              <el-button @click="search()" type="primary">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <br />

      <el-table
        :data="resPageInfo.list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="account" label="登录账号"></el-table-column>
        <el-table-column prop="employmentDate" label="入职日期"></el-table-column>
        <el-table-column prop="employeeStatus" label="雇员状态">
          <template slot-scope="scope">{{getEmployeeStatusName(scope.row.employeeStatus)}}</template>
        </el-table-column>
        <el-table-column prop="status" label="账号状态">
          <template slot-scope="scope">{{getAccountStatusName(scope.row.status)}}</template>
        </el-table-column>
        <el-table-column prop="orgName" label="归属组织"></el-table-column>
      </el-table>
      <div class="text-right padding-right-40">
        <el-pagination
          @size-change="handleSizeChangeMixin"
          @current-change="handleCurrentChangeMixin"
          :current-page.sync="queryPageParameters.pageNum"
          :page-sizes="$root.pageSizes"
          :page-size="queryPageParameters.pageSize"
          :layout="$root.paginationLayout"
          :total="resPageInfo.total"
        ></el-pagination>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  post_role_addRoleToUserBatch,
  post_user_getList,
  get_org_getAll,
} from "../../api/system/index";
// import { Form as ElForm } from "element-ui";
import PaginationMixin from "../../mixins/pagination";
import {
  getListTool,
  accountType,
  accountStatus,
  employeeStatus,
} from "../../util/enums/dic";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class BatchOperationUser extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  selectList: any = [];
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
  getEmployeeStatusName(key: string) {
    return employeeStatus[key];
  }
  getAccountStatusName(key: string) {
    return accountStatus[key];
  }
  props = {
    // 配置项（必选）
    value: "id",
    label: "name",
    children: "children",
    defaultExpandedKeys: [1],
    // defaultCheckedKeys: ["1D29BB468F504774ACE653B946A393EE"]
  };
  orgList: any = [];
  employmentDateChange(dateArray: any) {
    console.log(dateArray);
    this.queryPageParameters.employmentDateStart = dateArray[0];
    this.queryPageParameters.employmentDateEnd = dateArray[1];
  }

  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    if (this.selectList.length > 0) {
      let p: any = {
        roleId: this.data.id,
        userIds: this.selectList.map((item: any) => item.id),
      };
      console.log(p);
      const res = await post_role_addRoleToUserBatch(p);
      this.$message.success("操作成功");

      this.$emit("finish", res);
    } else {
      this.$message.warning("请先选择数据");
    }
  }

  async getListMixin() {
    this.resPageInfo = await post_user_getList(this.queryPageParameters);
  }
  async created() {
    this.getOrgList();
    this.search();
  }
  async getOrgList() {
    let listOrg = await get_org_getAll({ onlyValid: true });
    if (listOrg && listOrg.length > 0) {
      listOrg[0].parentId = 0;
    }
    console.log(listOrg);
    this.orgList = this.$tool.listToGruop(listOrg, {
      id: "id",
      children: "children",
      parentId: "parentId",
      rootId: 0,
    });
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.selectList = val;
  }
  getValue(value: any) {
    this.queryPageParameters.orgId = value;
  }
  search() {
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>