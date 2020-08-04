<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:30:29
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-04 14:25:56
--> 
<template>
  <div>
    <div style="text-align:right;">
      <el-input
        style="width:300px;"
        placeholder="名称 编码"
        class="input-with-select"
        v-model="queryPageParameters.key"
      >
        <el-button slot="append" icon="el-icon-search" @click="getListMixin()"></el-button>
      </el-input>
    </div>
    <br />
    <el-table :data="resPageInfo.list" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="code" label="编码" width="180"></el-table-column>
      <el-table-column prop="describe" label="描述"></el-table-column>
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
import { post_job_getListByRoleId } from "../../../api/system/index";
import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class RoleInfoJob extends Vue {
  queryPageParameters: any = {
    key: null,
    roleId: 0,
  };

  resPageInfo: any = {
    total: 0,
    list: [],
  };
  async getListMixin() {
    this.resPageInfo = await post_job_getListByRoleId(this.queryPageParameters);
  }
  async created() {
    let id = this.$route.query.id;
    this.queryPageParameters.roleId = id;
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>
