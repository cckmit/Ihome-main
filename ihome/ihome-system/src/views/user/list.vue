<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 16:31:18
--> 
<template>
  <div>
    <el-card class="ih-card-form">
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录账号">
              <el-input placeholder="登录账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户类型">
              <el-select v-model="value" clearable placeholder="请选择用户类型" style="width:100%;">
                <el-option
                  v-for="item in options"
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
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工工号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态">
                  <el-select v-model="value" clearable placeholder="请选择状态" style="width:100%;">
                    <el-option
                      v-for="item in options"
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
                    v-model="valuedate"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="离职日期">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="雇员状态">
                  <el-select v-model="value" clearable placeholder="请选择雇员状态" style="width:100%;">
                    <el-option
                      v-for="item in options"
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
                    style="width:100%;"
                    :props="props"
                    :options="list"
                    :value="valueId"
                    :clearable="true"
                    :accordion="true"
                    @getValue="getValue($event)"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="人员类型">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职能类别">
                  <el-select v-model="value" clearable placeholder="请选择职能类别" style="width:100%;">
                    <el-option
                      v-for="item in options"
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
                <el-form-item label="删除标识">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属组织">
                  <el-input
                    placeholder="归属组织"
                    class="input-with-select"
                    v-model="valueZZ"
                    :readonly="false"
                    @clear="clear()"
                    clearable
                    @focus="selectZZ()"
                  >
                    <el-button slot="append" icon="el-icon-search" @click="selectZZ()"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>

        <el-row class="btn-list">
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="success" @click="add()">添加</el-button>
          <el-button type="info">重置</el-button>
          <el-button>复制用户岗位角色</el-button>
          <el-button>复制用户组织权限</el-button>
          <!-- <el-button type="success" @click="set()">设置</el-button> -->

          <el-link
            type="primary"
            style="float:right;margin-right:40px;"
            @click="openToggle()"
          >{{searchOpen?'收起':'展开'}}</el-link>
        </el-row>
      </el-form>
      <br />
      <el-table
        class="ih-table"
        :data="tableData"
        :default-sort="{prop: 'id', order: 'descending'}"
      >
        <el-table-column fixed type="selection" width="50"></el-table-column>
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed prop="name" label="姓名" sortable width="90"></el-table-column>
        <el-table-column prop="account" label="登录账号" sortable width="150"></el-table-column>
        <el-table-column prop="phone" label="手机号码" width="120"></el-table-column>
        <el-table-column prop="accountType" label="用户类型" sortable width="120"></el-table-column>
        <el-table-column prop="orgName" label="归属组织" sortable width="300"></el-table-column>
        <el-table-column prop="employeeCode" label="员工工号" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" sortable width="90"></el-table-column>
        <el-table-column prop="xxx" label="雇员状态"></el-table-column>
        <el-table-column prop="employmentDate" label="入职日期" width="120"></el-table-column>
        <el-table-column prop="leaveDate" label="离职日期" width="120"></el-table-column>
        <el-table-column prop="xxxx" label="人员类型"></el-table-column>
        <el-table-column prop="workType" label="职能类别"></el-table-column>
        <el-table-column prop="updateUser" label="修改人"></el-table-column>
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
                <el-dropdown-item>删除用户</el-dropdown-item>
                <el-dropdown-item>锁定用户</el-dropdown-item>
                <el-dropdown-item>激活用户</el-dropdown-item>
                <el-dropdown-item>重置密码</el-dropdown-item>
                <el-dropdown-item>用户详情</el-dropdown-item>
                <el-dropdown-item>分配岗位角色</el-dropdown-item>
                <el-dropdown-item>分配组织权限</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="text-align: right;margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- <my-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50]"
        :total="50"
      ></my-pagination>-->
    </el-card>

    <ih-dialog :show="dialogVisible">
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserAdd from "./add.vue";

// import IhDialog from "@/components/IhDialog.vue";
import MyOrganization from "@/components/MyOrganization.vue";
import MyPagination from "@/components/my-pagination.vue";
import { organization, userList } from "../../api/system";
// import { getResourceByIdUsingGET } from "../../api/system";
@Component({
  components: { UserAdd, MyPagination, MyOrganization }
})
export default class UserList extends Vue {
  options: any = [
    {
      value: "1",
      label: "下拉数据1"
    },
    {
      value: "2",
      label: "下拉数据2"
    }
  ];
  addData: any = null;
  value: any = "";
  searchOpen = true;
  myOrganizationVisible = false;

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
  }

  valueId: any = "1D29BB468F504774ACE653B946A393EE"; // 初始ID（可选）
  // valueId: any = null; // 初始ID（可选）
  props = {
    // 配置项（必选）
    value: "id",
    label: "name",
    children: "subs",
    defaultExpandedKeys: [
      "10B1F16BDC5E7F33E0532429030A8871",
      "105DB2C289397D50E0532429030A3DE0"
    ]
    // defaultCheckedKeys: ["1D29BB468F504774ACE653B946A393EE"]
  };
  // 选项列表（必选）
  list: any = [];
  async created() {
    let organizationDTree = await organization();
    this.list = organizationDTree;

    this.getUserList();
  }
  async getUserList() {
    const { list, total } = await userList();
    console.log(list, total);
    this.tableData = list;
    this.total = total;
  }

  getValue(value: any) {
    this.valueId = value;
    console.log(this.valueId);
  }

  search() {
    console.log(this.valuedate);
    this.currentPage = 1;
    this.getUserList();
  }
  handleSizeChange(a: any) {
    console.log(a);
    this.getUserList();
  }
  handleCurrentChange(a: any) {
    console.log(a);
    this.getUserList();
  }
  set() {
    this.valueId = "2c92808270b81f9d0170bee437800015";
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
      query: { id: scope.row.id }
    });
  }
  edit(scope: any) {
    this.add(scope.row);
  }
}
</script>
<style lang="scss" scoped>
.btn-list {
  text-align: left;
  margin-left: 80px;
}
.ih-card {
  background: #fff;
  padding: 20px;
}
</style>
<style >
/* .el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
} */
</style>