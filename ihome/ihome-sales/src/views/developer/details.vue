<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-27 17:02:59
-->
<template>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane label="详情信息" name="first">
      <ih-page>
        <template v-slot:form>
          <p class="ih-info-title">基础信息</p>
          <el-form ref="form" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称" required align="left">
                  <span>{{ queryPageParameters.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="信用代码" required align="left">
                  <span>{{ queryPageParameters.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="简称" required align="left">
                  <span>{{ queryPageParameters.name }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-collapse-transition>
              <div v-show="searchOpen">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="类型" align="left">
                      <span>{{ queryPageParameters.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="法定代表人" required align="left">
                      <span>{{ queryPageParameters.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="法人身份证号码" align="left">
                      <span>{{ queryPageParameters.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="成立日期" required align="left">
                      <span>{{ queryPageParameters.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="注册资本" required align="left">
                      <span>{{ queryPageParameters.name }}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="营业期限" align="left">
                      <span>{{ queryPageParameters.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="省市区" align="left">
                      <span>{{ queryPageParameters.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="住所" required align="left">
                      <span>{{ queryPageParameters.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="录入人" required align="left">
                      <span>{{ queryPageParameters.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="状态" required align="left">
                      <span>{{ queryPageParameters.name }}</span>
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
          <p class="ih-info-title">联系人信息</p>
          <br />
          <ih-table
            class="ih-table"
            :data="tableData"
            :column="contactsColumn"
            :isPagination="false"
            :columnCheck="false"
            :columnIndex="false"
          />
          <br />
          <p class="ih-info-title">账户信息</p>
          <br />
          <ih-table
            class="ih-table"
            :data="tableData"
            :column="accountColumn"
            :isPagination="false"
            :columnCheck="false"
            :columnIndex="false"
          />
          <br />
          <p class="ih-info-title">附件信息</p>
          <br />
          <ih-table
            class="ih-table"
            :data="tableData"
            :column="accessoryColumn"
            :isPagination="false"
            :columnCheck="false"
            :columnIndex="false"
          />
          <br />

          <p class="ih-info-title">企业概况</p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="请输入内容"
            v-model="queryPageParameters.employeeCode"
          >
          </el-input>

          <div v-if="isRemove" class="text-left">
            <p class="ih-info-title">撤回信息</p>
            <p class="msg-title">撤回原因</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="请输入内容"
              v-model="queryPageParameters.employeeCode"
            >
            </el-input>
            <!-- <div class="bottom"> -->
            <el-button class="margin-top-30" @click="add()" type="primary"
              >提交</el-button
            >
            <!-- </div> -->
          </div>
          <div v-if="isCheck" class="text-left">
            <p class="ih-info-title">审核信息</p>
            <p class="msg-title">审核意见</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="请输入内容"
              v-model="queryPageParameters.employeeCode"
            >
            </el-input>
            <el-button class="margin-top-30" @click="add()" type="primary"
              >通过</el-button
            >
            <el-button class="margin-top-30" @click="add()" type="primary"
              >驳回</el-button
            >
          </div>
        </template>
      </ih-page>
    </el-tab-pane>
    <el-tab-pane label="操作日志" name="second">
      <ih-table
        class="ih-table"
        :data="tableData"
        :column="operationColumn"
        :isPagination="false"
        :columnCheck="false"
        :columnIndex="false"
      />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import UserAdd from "./add.vue";
import {
  post_user_getList,
  post_user_delete__id,
  //   post_user_lock__id,
} from "../../api/system/index";
import PaginationMixin from "../../mixins/pagination";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class Edit extends Vue {
  private isRemove = false;
  private isCheck = false;
  private activeName = "first";
  @Watch("$route", { immediate: true })
  watchRoute(val: any) {
    console.log(val.name, "aaaaaaaaaaa");
    switch (val.name) {
      case "developerRevocation":
        this.isRemove = true;
        break;
      case "developerCheck":
        this.isCheck = true;
        break;
    }
  }
  queryPageParameters: any = {
    name: "xxxxx",
    creditCode: null,
    devStatus: null,
    ProvincesOptions: Array,
    keyboarder: null,
    pageSize: 20,
    pageNum: 1,
  };

  searchOpen = true;

  tableData = [
    {
      name: "xxx",
    },
    {
      name: "xxx",
    },
    {
      name: "xxx",
    },
    {
      name: "xxx",
    },
  ];

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
  operationColumn = [
    {
      label: "操作",
      prop: "name",
    },
    {
      label: "处理人",
      prop: "name",
    },
    {
      label: "处理时间",
      prop: "name",
    },
    {
      label: "处理结果",
      prop: "name",
    },
    {
      label: "备注",
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
<style lang="scss">
.msg-title {
  text-align: left;
  margin-left: 25px;
}
</style>