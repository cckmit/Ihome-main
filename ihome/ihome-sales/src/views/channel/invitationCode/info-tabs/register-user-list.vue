<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-13 19:51:15
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-31 09:50:06
-->
<template>
  <div>
    <p class="ih-info-title">注册用户列表</p>
    <div>
      <el-form class="form-condition" ref="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input
                clearable
                v-model="queryPageParameters.username"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码">
              <el-input
                clearable
                v-model="queryPageParameters.mobile"
                placeholder="手机号码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道商">
              <el-select
                clearable
                v-model="queryPageParameters.channelId"
                filterable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in allList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="text-left margin-left-80">
      <el-button type="primary" @click="getListMixin()">查询</el-button>
    </el-row>
    <br />
    <el-table :data="resPageInfo.list" style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码"
        width="180"
      ></el-table-column>
      <el-table-column prop="channelId" label="渠道商名称">
        <!-- <template slot-scope="scope">{{
          $root.displayName("accountType", scope.row.accountType)
        }}</template> -->
      </el-table-column>
      <el-table-column prop="registTime" label="注册日期"></el-table-column>
    </el-table>
    <div class="text-right">
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
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  get_channel_getAll,
  post_channelRegistUser_getList,
  get_channelInvitationCode_get__id,
} from "../../../../api/channel/index";
import PaginationMixin from "../../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class RegisterUserList extends Vue {
  queryPageParameters: any = {
    channelId: null,
    invitationCode: null,
    mobile: null,
    username: null,
  };

  resPageInfo: any = {
    total: 0,
    list: [],
  };
  allList: any = [];

  async getListMixin() {
    this.resPageInfo = await post_channelRegistUser_getList(
      this.queryPageParameters
    );
  }
  async created() {
    let id = this.$route.query.id;
    const res: any = await get_channelInvitationCode_get__id({ id: id });
    this.queryPageParameters.invitationCode = res.invitationCode;
    this.allList = await get_channel_getAll();
    this.getListMixin();
  }
}
</script>
<style lang="scss" >
.form-condition .el-form-item__content {
  margin-right: 40px !important;
}
</style>
