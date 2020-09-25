<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称">
              <el-input v-model="searchList.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用代码">
              <el-input v-model="searchList.creditCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="searchList.devStatus"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('devStatus')"
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
            <el-form-item label="省市区">
              <el-cascader
                placeholder="请选择省市区"
                :options="searchList.provincesOptions"
                :props="{ checkStrictly: true }"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-select
                v-model="searchList.keyboarder"
                clearable
                placeholder="请选择业务类型"
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
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="danger" @click="search()">查询</el-button>
        <el-button type="success" @click="add()">添加</el-button>
        <el-button type="success" @click="reset()">重置</el-button>
        <el-button type="info" @click="update()">变更录入人</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <ih-table
        class="ih-table"
        :data="resPageInfo.list"
        :column="tableColumn"
        :default-sort="{ prop: 'id', order: 'descending' }"
        :current-page.sync="searchList.pageNum"
        :page-sizes="$root.pageSizes"
        @selection-change="handleSelectionChange"
        @page-change="handleCurrentChangeMixin"
        @size-change="handleSizeChangeMixin"
      >
        <template #operation>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click.native.prevent="edit(scope)"
                >编辑</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click.native.prevent="info(scope)"
                >详情</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click.native.prevent="info(scope)"
                >审核</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click.native.prevent="remove(scope)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
      </ih-table>
    </template>
    <!-- <template v-slot:pagination>
      <br />
      <el-pagination
        @size-change="handleSizeChangeMixin"
        @current-change="handleCurrentChangeMixin"
        :current-page.sync="searchList.pageNum"
        :page-sizes="$root.pageSizes"
        :page-size="searchList.pageSize"
        :layout="$root.paginationLayout"
        :total="resPageInfo.total"
      ></el-pagination>
    </template> -->

    <ih-dialog :show="dialogVisible" desc="用户新增编辑">
      <!-- <UserAdd
        :data="addData"
        @cancel="()=>dialogVisible=false"
        @finish="(data)=>{dialogVisible=false;finish(data)}"
      />-->
    </ih-dialog>

    <ih-dialog :show="jobVisible" desc="分配岗位角色">
      <!-- <UserJobRole
        :data="jobVisibleData"
        @cancel="()=>jobVisible=false"
        @finish="(data)=>{jobVisible=false;finishJob(data)}"
      />-->
    </ih-dialog>
    <!-- <ih-dialog :show="organizationJurisdictionVisible" desc="分配组织权限">
      <OrganizationJurisdiction
        :data="OrganizationJurisdictionData"
        @cancel="()=>organizationJurisdictionVisible=false"
        @finish="(data)=>{organizationJurisdictionVisible=false;finishJob(data)}"
      />
    </ih-dialog>-->
    <ih-dialog :show="copyUserVisible" desc="复制用户岗位角色组织权限">
      <!-- <CopyUsers
        :data="copyUserData"
        @cancel="()=>copyUserVisible=false"
        @finish="(data)=>{copyUserVisible=false;finishCopyUser(data)}"
      />-->
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import UserAdd from "./add.vue";
// import UserJobRole from "./dialog/job.vue";
// import CopyUsers from "./dialog/copy-users.vue";
// import OrganizationJurisdiction from "@/components/OrganizationJurisdiction.vue";
// import SelectOrganizationTree from "@/components/SelectOrganizationTree.vue";
import {
  post_user_getList,
  post_user_delete__id,
  //   post_user_lock__id,
  //   post_user_activate__id,
  //   post_user_resetPassword__id,
} from "../../api/system/index";
import PaginationMixin from "../../mixins/pagination";

@Component({
  components: {
    // UserAdd,
    // UserJobRole,
    // OrganizationJurisdiction,
    // CopyUsers,
    // SelectOrganizationTree,
  },
  mixins: [PaginationMixin],
})
export default class UserList extends Vue {
  searchList: any = {
    name: null,
    creditCode: null,
    devStatus: null,
    ProvincesOptions: Array,
    keyboarder: null,
  };

  tableColumn = [
    {
      label: "名称",
      prop: "name",
    },
    {
      label: "信用代码",
      prop: "creditCode",
    },
    {
      label: "省份",
      prop: "province",
    },
    {
      label: "城市",
      prop: "city",
    },
    {
      label: "行政区",
      prop: "administrative",
    },
    {
      label: "录入人",
      prop: "keyboarder",
    },
    {
      label: "状态",
      prop: "status",
    },
    {
      slot: "operation",
    },
  ];
  jobVisibleData: any = null;
  OrganizationJurisdictionData: any = null;
  copyUserData: any = null;
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  employmentDateChange(dateArray: any) {
    console.log(dateArray);
    this.searchList.employmentDateStart = dateArray[0];
    this.searchList.employmentDateEnd = dateArray[1];
  }
  leaveDateChange(dateArray: any) {
    console.log(dateArray);
    this.searchList.leaveDateStart = dateArray[0];
    this.searchList.leaveDateEnd = dateArray[1];
  }

  reset() {
    this.searchList = {
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
      pageNum: this.searchList.pageNum,
      pageSize: this.searchList.pageSize,
    };
  }

  addData: any = null;
  value: any = "";

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
    this.resPageInfo = await post_user_getList(this.searchList);
  }

  getValue(value: any) {
    this.searchList.orgId = value;
  }

  search() {
    console.log(this.searchList);
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
