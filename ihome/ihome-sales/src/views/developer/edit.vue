<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-25 17:59:09
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-27 17:03:08
-->
<template>
  <ih-page>
    <template v-slot:form>
      <p class="ih-info-title">基础信息</p>
      <el-form ref="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称" required>
              <el-input
                v-model="queryPageParameters.account"
                placeholder="名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用代码" required>
              <el-input
                v-model="queryPageParameters.name"
                placeholder="信用代码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="简称" required>
              <el-input
                v-model="queryPageParameters.name"
                placeholder="简称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="类型">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="请选择类型"
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
              <el-col :span="8">
                <el-form-item label="法定代表人" required>
                  <el-input
                    v-model="queryPageParameters.mobilePhone"
                    placeholder="法定代表人"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人身份证号码">
                  <el-input
                    v-model="queryPageParameters.employeeCode"
                    placeholder="法人身份证号码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成立日期" required>
                  <el-date-picker
                    v-model="queryPageParameters.employeeCode"
                    style="width: 100%"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本" required>
                  <el-input
                    v-model="queryPageParameters.employeeCode"
                    placeholder="注册资本"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="营业期限">
                  <el-date-picker
                    style="width: 100%"
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
                <el-form-item label="省市区">
                  <el-cascader
                    style="width: 100%"
                    placeholder="请选择省市区"
                    :options="queryPageParameters.provincesOptions"
                    :props="{ checkStrictly: true }"
                    clearable
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="住所" required>
                  <el-input
                    v-model="queryPageParameters.employeeCode"
                    placeholder="住所"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="录入人" required>
                  <el-input
                    disabled
                    v-model="queryPageParameters.employeeCode"
                    placeholder="录入人"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="openToggle()"
          >{{ searchOpen ? "收起" : "展开" }}</el-link
        >
      </el-row>
    </template>

    <template v-slot:table>
      <div class="content">
        <p class="ih-info-title">联系人信息</p>
        <el-button @click="contactsDialogVisible = true" type="primary"
          >添加</el-button
        >
      </div>
      <br />
      <ih-table
        class="ih-table"
        :data="resPageInfo.list"
        :column="contactsColumn"
        :isPagination="false"
        :columnCheck="false"
        :columnIndex="false"
      >
        <template #operation>
          <el-table-column fixed="right" label="操作" align="center">
            <template v-slot="{ row }">
              <span class="el-dropdown-link" @click="editContacts(row)">
                编辑
              </span>
              <span class="el-dropdown-link" @click="routerTo(row)">
                移除
              </span>
            </template>
          </el-table-column>
        </template>
      </ih-table>
      <br />
      <div class="content">
        <p class="ih-info-title">账户信息</p>
        <el-button @click="accountDialogVisible = true" type="primary"
          >添加</el-button
        >
      </div>
      <br />
      <ih-table
        class="ih-table"
        :data="resPageInfo.list"
        :column="accountColumn"
        :isPagination="false"
        :columnCheck="false"
        :columnIndex="false"
      >
        <template #operation>
          <el-table-column fixed="right" label="操作" align="center">
            <template v-slot="{ row }">
              <span class="el-dropdown-link" @click="editAccount(row)">
                编辑
              </span>
              <span class="el-dropdown-link" @click="routerTo(row)">
                移除
              </span>
            </template>
          </el-table-column>
        </template>
      </ih-table>
      <br />
      <p class="ih-info-title">附件信息</p>
      <br />
      <ih-table
        class="ih-table"
        :data="resPageInfo.list"
        :column="accessoryColumn"
        :isPagination="false"
        :columnCheck="false"
        :columnIndex="false"
      >
        <template #operation>
          <el-table-column fixed="right" label="操作" align="center">
            <template v-slot="{ row }">
              <span class="el-dropdown-link" @click="routerTo(row)">
                编辑
              </span>
              <span class="el-dropdown-link" @click="routerTo(row)">
                移除
              </span>
            </template>
          </el-table-column>
        </template>
      </ih-table>
      <br />

      <p class="ih-info-title">企业概况</p>
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="queryPageParameters.employeeCode"
      >
      </el-input>

      <div v-if="isShow">
        <p class="ih-info-title">变更原因</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入内容"
          v-model="queryPageParameters.employeeCode"
        >
        </el-input>
      </div>

      <div class="bottom">
        <el-button @click="add()" type="primary">保存</el-button>
        <el-button @click="add()" type="primary">提交</el-button>
      </div>
    </template>

    <ih-dialog :show="contactsDialogVisible" desc="联系人信息录入">
      <Contacts
        :data="addData"
        @cancel="() => (contactsDialogVisible = false)"
        @finish="
          (data) => {
            contactsDialogVisible = false;
            finish(data);
          }
        "
      />
    </ih-dialog>
    <ih-dialog :show="accountDialogVisible" desc="账户信息录入">
      <Account
        :data="addData"
        @cancel="() => (accountDialogVisible = false)"
        @finish="
          (data) => {
            accountDialogVisible = false;
            finish(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import UserAdd from "./add.vue";
import Contacts from "./dialog/contacts.vue";
import Account from "./dialog/account.vue";
import {
  post_user_getList,
  post_user_delete__id,
  //   post_user_lock__id,
} from "../../api/system/index";
import PaginationMixin from "../../mixins/pagination";

@Component({
  components: {
    Contacts,
    Account,
  },
  mixins: [PaginationMixin],
})
export default class Edit extends Vue {
  private isShow = false;
  @Watch("$route", { immediate: true })
  watchRoute(val: any) {
    if (val.name === "developerChange") {
      this.isShow = true;
    }
  }
  queryPageParameters: any = {
    name: null,
    creditCode: null,
    devStatus: null,
    ProvincesOptions: Array,
    keyboarder: null,
    pageSize: 20,
    pageNum: 1,
  };

  searchOpen = true;

  contactsColumn = [
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "手机号",
      prop: "name",
    },
    {
      label: "邮箱",
      prop: "name",
    },
    {
      slot: "operation",
    },
  ];
  accountColumn = [
    {
      label: "账户名称",
      prop: "name",
    },
    {
      label: "账号",
      prop: "name",
    },
    {
      label: "开户银行",
      prop: "name",
    },
    {
      label: "账户类型",
      prop: "name",
    },
    {
      slot: "operation",
    },
  ];
  accessoryColumn = [
    {
      label: "类型",
      prop: "name",
    },
    {
      label: "附件",
      prop: "name",
    },
  ];
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  openToggle() {
    this.searchOpen = !this.searchOpen;
  }
  employmentDateChange(dateArray: any) {
    console.log(dateArray);
    this.queryPageParameters.employmentDateStart = dateArray[0];
    this.queryPageParameters.employmentDateEnd = dateArray[1];
  }

  reset() {
    this.queryPageParameters = {
      name: null,
      creditCode: null,
      devStatus: null,
      ProvincesOptions: Array,
      keyboarder: null,
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
    };
  }
  finish(data: any) {
    console.log(data);
  }

  addData: any = null;
  value: any = "";

  currentPage: any = 1;
  valuedate: any = new Date().getTime();
  // valuedate: any ='2020-07-01';
  tableData: any = [];
  total: any = null;

  formatter(row: any) {
    return row.name;
  }
  contactsDialogVisible = false;
  accountDialogVisible = false;

  add(data: any) {
    this.addData = data;
    this.contactsDialogVisible = true;
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_user_getList(this.queryPageParameters);
  }

  editContacts(row: any) {
    console.log(row);
    this.contactsDialogVisible = true;
  }

  editAccount(row: any) {
    console.log(row);
    this.accountDialogVisible = true;
  }
  getValue(value: any) {
    this.queryPageParameters.orgId = value;
  }

  search() {
    console.log(this.queryPageParameters);
    console.log(this.valuedate);
    this.getListMixin();
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
}
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  /deep/ .el-button {
    position: absolute;
    top: -15px;
    left: 140px;
  }
}
.bottom {
  margin-top: 35px;
  text-align: left;
}
</style>