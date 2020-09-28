<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-18 09:14:40
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-28 17:53:00
-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="line">{{
        $route.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <ih-page>
      <template v-slot:form>
        <el-form ref="form" label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input
                  v-model="queryPageParameters.name"
                  placeholder="姓名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                <el-select
                  v-model="queryPageParameters.state"
                  clearable
                  placeholder="状态"
                  class="width--100"
                >
                  <el-option
                    v-for="item in $root.displayList('state')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结佣权限">
                <el-select
                  v-model="queryPageParameters.settlementFlag"
                  clearable
                  placeholder="结佣权限"
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
        </el-form>
      </template>
      <template v-slot:btn>
        <el-row>
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="success" @click="add()">添加</el-button>
          <el-button type="info" @click="reset()">清空</el-button>
        </el-row>
      </template>
      <br />
      <template v-slot:table>
        <br />
        <el-table
          class="ih-table"
          :data="resPageInfo.list"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <el-table-column type="selection" width="70"> </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="170"
          ></el-table-column>

          <el-table-column
            prop="mobile"
            label="手机号码"
            width="170"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="170"
          ></el-table-column>
          <el-table-column
            prop="settlementFlag"
            label="结佣权限"
            width="170"
          ></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>

          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-link type="primary" @click.native.prevent="change(scope)"
                >修改</el-link
              >
              <el-dropdown trigger="click" style="margin-left: 15px">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native.prevent="confirm(scope)"
                    >关闭</el-dropdown-item
                  >
                  <el-dropdown-item @click.native.prevent="changeinfo(scope)"
                    >启用</el-dropdown-item
                  >
                  <el-dropdown-item @click.native.prevent="maintenance(scope)"
                    >删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <template v-slot:pagination>
        <br />
        <el-pagination
          @size-change="handleSizeChangeMixin"
          @current-change="handleCurrentChangeMixin"
          :current-page.sync="queryPageParameters.pageNum"
          :page-sizes="$root.pageSizes"
          :page-size="queryPageParameters.pageSize"
          :page-num="queryPageParameters.pageNum"
          :layout="$root.paginationLayout"
          :total="resPageInfo.total"
        ></el-pagination>
      </template>
      <el-dialog title="" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="form">
          <el-form-item label="渠道商名称" :label-width="formLabelWidth">
            <el-input v-model="form.chanelId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.checked">结佣权限</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addEdit">确 定</el-button>
        </div>
      </el-dialog>
    </ih-page>
  </div>
</template>
<script lang="ts">
import { Row } from "element-ui";
import { Component, Vue } from "vue-property-decorator";
import {
  post_channelAgent_getList,
  post_channelAgent_edit,
} from "../../../../api/channel/index";
import PaginationMixin from "../../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class Home extends Vue {
  queryPageParameters: any = {
    settlementFlag: "",
    status: "",
    name: "",
    pageSize: 10,
    pageNum: 1,
  };
  form: any = {
    name: "",
    mobile: "",
    email: "",
    checked: false,
    chanelId: "",
  };

  dialogFormVisible: any = false;
  formLabelWidth: any = "120px";
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  formLabelWidth = "120px";
  currentPage: any = 1;

  reset() {
    console.log("重置");
    this.queryPageParameters = {};
  }

  info(row) {
    console.log("详情");
    console.log(row);
    this.$router.push({
      path: "/info",
      query: { invitationCode: row.row.invitationCode },
    });
    console.log(row.row.invitationCode);
  }
  invalid() {
    console.log("作废");
  }
  add() {
    this.dialogFormVisible = true;
    console.log("111");
  }

  change(scope: any) {
    this.dialogFormVisible = true;
    this.form = scope.row;
  }

  addEdit() {
    post_channelAgent_edit(this.form);
    this.getListMixin();
    this.dialogFormVisible = false;
  }

  async created() {
    this.getListMixin();
  }
  search() {
    console.log("查询");
    this.getListMixin();
  }
  // deleted(row) {
  //   console.log(row.row);
  //   let invitationCode = row.row.invitationCode;
  //   console.log(invitationCode);
  //   // post_channelInvitationCode_delete__invitationCode({
  //   //   query: { invitationCode: invitationCode },
  //   // });
  //   get_channelInvitationCode_delete__invitationCode({
  //     invitationCode: invitationCode,
  //   });
  //   this.getListMixin();
  // }
  async getListMixin() {
    this.resPageInfo = await post_channelAgent_getList(
      this.queryPageParameters
    );
  }
  handleSizeChangeMixin(val: any) {
    console.log("页码大小", val);
    this.queryPageParameters.pageSize = val;
    this.getListMixin();
  }
  handleCurrentChangeMixin(val: any) {
    console.log("指定页码", val);
    this.queryPageParameters.pageNum = val;
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
  .line {
    border-left: solid;
    color: #4cccec;
    padding-left: 7px;
  }
}
.detail {
  margin-right: 5px;
  color: #000;
}
</style>