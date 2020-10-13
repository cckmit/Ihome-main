<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 09:23:40
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-13 20:52:59
--> 
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px">
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
                  v-for="item in createUserList"
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
                style="width: 100%"
                v-model="queryPageParameters.expiresTime"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
                @change="expiresTimeChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-select
                v-model="queryPageParameters.departmentOrgId"
                clearable
                placeholder="事业部"
                class="width--100"
              >
                <el-option
                  v-for="item in divisionList"
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
                  v-for="item in $root.dictAllList('ValidType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="getListMixin()">查询</el-button>
        <el-button type="success" @click="add()">添加</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
        <el-button type="default" @click="toVoid()">作废</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table class="ih-table" :data="resPageInfo.list">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column
          prop="invitationCode"
          label="邀请码"
          width="180"
        ></el-table-column>
        <!-- <el-table-column
          prop="status"
          label="状态"
          width="180"
        ></el-table-column> -->
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.status, "ValidType").name
          }}</template>
        </el-table-column>
        <el-table-column prop="expiresTime" label="失效日期"></el-table-column>
        <el-table-column
          prop="departmentOrgId"
          label="事业部"
        ></el-table-column>
        <el-table-column prop="createUser" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-link
              style="color: #409eff"
              class="margin-right-10"
              type="primary"
              @click.native.prevent="info(scope)"
              >详情</el-link
            >
            <el-link
              style="color: #f66"
              type="primary"
              @click.native.prevent="remove(scope)"
              >删除</el-link
            >
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

    <ih-dialog :show="dialogAdd" desc="新增二维码">
      <InvitationCodeAdd
        @cancel="() => (dialogAdd = false)"
        @finish="
          (data) => {
            dialogAdd = false;
            finishAdd(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  post_channelInvitationCode_getList,
  get_channelInvitationCode_delete__invitationCode,
} from "../../../api/channel/index";
import InvitationCodeAdd from "./add.vue";
import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: { InvitationCodeAdd },
  mixins: [PaginationMixin],
})
export default class InvitationCodeList extends Vue {
  queryPageParameters: any = {
    departmentOrgId: null,
    expiresTime: null,
    expiresTimeBegin: null,
    expiresTimeEnd: null,
    invitationCode: null,
    invitationUserId: null,
    status: "Valid",
  };
  createUserList: any = []; //创建人列表
  divisionList: any = []; //事业部列表

  resPageInfo: any = {
    total: 0,
    list: [],
  };
  dialogAdd = false;

  async getListMixin() {
    this.resPageInfo = await post_channelInvitationCode_getList(
      this.queryPageParameters
    );
  }

  async created() {
    this.getListMixin();
  }
  expiresTimeChange(dateArray: any) {
    this.queryPageParameters.expiresTimeBegin = dateArray[0];
    this.queryPageParameters.expiresTimeEnd = dateArray[1];
  }
  async remove(scope: any) {
    console.log(scope);

    try {
      await this.$confirm("是否确定删除?", "提示");
      const res = await get_channelInvitationCode_delete__invitationCode({
        invitationCode: scope.row.invitationCode,
      });
      console.log(res);
      this.resPageInfo.list.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
  info(scope: any) {
    console.log(scope);
    this.$router.push({
      path: "/invitationCode/info",
      query: { id: scope.row.id },
    });
  }
  reset() {
    this.queryPageParameters = {
      departmentOrgId: null,
      expiresTime: null,
      expiresTimeBegin: null,
      expiresTimeEnd: null,
      invitationCode: null,
      invitationUserId: null,
      status: "Valid",
    };
  }
  finishAdd(data: any) {
    console.log(data);
    this.getListMixin();
  }
  async add() {
    this.dialogAdd = true;
  }
  async toVoid(){
    console.log('作废，未实现')
  }
}
</script>
<style lang="scss" scoped>
</style>
