<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-18 09:14:40
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-10 17:10:12
-->
<template>
  <ih-page>
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="邀请码">
              <el-input
                v-model="queryPageParameters.invitationCode"
                placeholder="邀请码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-select
                v-model="queryPageParameters.invitationUserId"
                clearable
                placeholder="创建人"
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
          <el-col :span="8">
            <el-form-item label="失效日期">
              <el-date-picker
                v-model="queryPageParameters.expiresTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-select
                v-model="queryPageParameters.division"
                clearable
                placeholder="创建人"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('division')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="success"
          @click="add()"
        >添加</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
        <el-button
          type="info"
          @click="invalid()"
        >作废</el-button>
      </el-row>
    </template>
    <br />
    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'id', order: 'descending' }"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
          fixed
        > </el-table-column>
        <el-table-column
          prop="invitationCode"
          label="邀请码"
          width="170"
          fixed
        ></el-table-column>
        <el-table-column
          prop="invitationCode"
          label="状态"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="expiresTime"
          label="失效日期"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="invitationCode"
          label="事业部"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="invitationUserId"
          label="创建人"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="150"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              class="detail"
              @click.native.prevent="info(scope)"
            >详情</el-link>
            <el-link
              type="primary"
              @click.native.prevent="deleted(scope)"
            >删除</el-link>
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
  </ih-page>
</template>

<script lang="ts">
// import { Row } from "element-ui";
import { Component, Vue } from "vue-property-decorator";
import {
  post_channelInvitationCode_getList,
  get_channelInvitationCode_delete__invitationCode,
  post_channelInvitationCode_cancel,
} from "../../../api/channel/index";
import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class Home extends Vue {
  queryPageParameters: any = {
    invitationUserId: "",
    invitationCode: "",
    expiresTime: "",
    state: "",
    division: "",
  };

  resPageInfo: any = {
    total: 0,
    list: [],
  };
  invaildList: any = {
    list: [],
  };

  currentPage: any = 1;
  add() {
    console.log("跳转至添加邀请码页面");
    this.$router.push({
      path: "channelInviteCode/addCode",
    });
  }
  //重置
  reset() {
    console.log("重置");
    this.queryPageParameters = {};
  }

  info(row: any) {
    console.log("详情");
    console.log(row);
    this.$router.push({
      path: "channelInviteCode/info",
      params: {
        invitationCode: row.row.invitationCode,
      },
    });
  }

  async created() {
    this.getListMixin();
  }
  search() {
    console.log("查询");
    this.getListMixin();
  }
  deleted(row: any) {
    console.log(row.row);
    let invitationCode = row.row.invitationCode;
    console.log(invitationCode);
    get_channelInvitationCode_delete__invitationCode({
      invitationCode: invitationCode,
    });
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_channelInvitationCode_getList(
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
  handleSelectionChange(val: any) {
    console.log("fff");
    this.invaildList.list = val;
    // console.log(this.changeList.list);
  }
  private idArr: any[] = [];
  async invalid() {
    if (this.invaildList.list == "") {
      this.$message({
        message: "请选择要作废的邀请码",
        type: "warning",
      });
    } else
      try {
        await this.$confirm("是否确定作废?", "提示");
        {
          this.invaildList.list.forEach((ele: any) => {
            this.idArr.push(ele.id);
          });
          // console.log(idArr);
          post_channelInvitationCode_cancel(this.idArr);
          console.log("作废");
          this.getListMixin();
        }
        this.$message({
          type: "success",
          message: "作废成功!",
        });
      } catch (error) {
        console.log(error);
      }
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
}
</style>