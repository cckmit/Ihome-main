<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 16:00:28
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-13 11:09:26
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="复制用户岗位角色组织权限"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1000px"
    style="text-align: left;"
    class="dialog"
    top="50px"
  >
    <el-row>
      <el-col :span="6">
        <el-card class="box-card" style="height:500px;">
          <div slot="header" class="clearfix">
            <span>选中用户</span>
          </div>
          <div style="height:400px;overflow: auto;">
            <div
              class="text item"
              v-for="(item,index) in data"
              :key="index"
            >{{item.name}} ({{item.account}})</div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16" class="margin-left-20">
        <el-card class="box-card" style="height:500px;width:695px;">
          <div slot="header" class="clearfix" style="height:20px;">
            <div class="float-left">
              <span>复制选项</span>
              <span class="margin-left-20">
                <el-checkbox v-model="copyJobAndRole" size="small" label="岗位角色" border></el-checkbox>
                <el-checkbox v-model="copyOrg" size="small" label="组织权限" border></el-checkbox>
              </span>
            </div>
          </div>
          <div>
            <div style="text-align:right;">
              <el-input
                v-model="queryPageParameters.name"
                style="width:150px;margin-right:20px;"
                placeholder="姓名"
                class="input-with-select"
                clearable
              ></el-input>
              <el-input
                v-model="queryPageParameters.account"
                style="width:150px;margin-right:20px;"
                placeholder="登录账号"
                class="input-with-select"
                clearable
              ></el-input>
              <el-button type="primary" @click="search()">查询</el-button>
            </div>
            <br />
            <el-table
              :data="resPageInfo.list"
              height="300"
              border
              style="width: 100%"
              highlight-current-row
              @selection-change="handleSelectionChange"
              @current-change="currentChange"
            >
              <el-table-column property="selected" label width="30">
                <template slot-scope="scope">
                  <ih-table-radio :radio="scope.row.id===currentItem.id"></ih-table-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="account" label="登录账号"></el-table-column>
              <el-table-column prop="accountType" label="用户类型" width="120">
                <template
                  slot-scope="scope"
                >{{$root.displayName('accountType',scope.row.accountType)}}</template>
              </el-table-column>
            </el-table>
            <div>
              <el-pagination
                @size-change="handleSizeChangeMixin"
                @current-change="handleCurrentChangeMixin"
                :current-page.sync="queryPageParameters.pageNum"
                :page-sizes="$root.pageSizes"
                :page-size="queryPageParameters.pageSize"
                layout="total, prev, pager, next"
                :total="resPageInfo.total"
              ></el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  post_user_getList,
  post_user_copyJobAndRole,
} from "../../../api/system/index";
import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class CopyUsers extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  copyJobAndRole = false;
  copyOrg = false;

  queryPageParameters: any = {
    account: null,
    accountType: null,
    employeeCode: null,
    employeeStatus: null,
    employeeType: null,
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
    status: null,
    workType: null,
  };

  resPageInfo: any = {
    total: 0,
    list: [],
  };

  selectList: any = [];

  async getListMixin() {
    this.resPageInfo = await post_user_getList(this.queryPageParameters);
  }

  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    if (this.currentItem.id) {
      if (this.copyJobAndRole === false && this.copyOrg === false) {
        this.$message.warning("请先勾选复制选项");
      } else {
        let userListId = (this.data || []).map((item: any) => {
          return item.id;
        });
        if (userListId.includes(this.currentItem.id)) {
          this.$message.warning("请勿勾选与左边列表相同的用户");
        } else {
          let p: any = {
            copyJobAndRole: this.copyJobAndRole,
            copyOrg: this.copyOrg,
            targetUserId: this.currentItem.id,
            userIds: userListId,
          };
          const res = await post_user_copyJobAndRole(p);
          this.$message.success("操作成功");

          this.$emit("finish", res);
        }
      }
    } else {
      this.$message.warning("请先选择数据");
    }
  }
  currentItem: any = { id: 0 };

  search() {
    this.currentItem = { id: 0 };
    this.getListMixin();
  }
  async created() {
    console.log(this.data);
    this.search();
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.selectList = val;
  }
  currentChange(val: any) {
    console.log(val);
    this.currentItem = val || { id: 0 };
  }
}
</script>
<style lang="scss" scoped>
.item {
  line-height: 40px;
}
</style>