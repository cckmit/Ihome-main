<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-10-30 15:23:40
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-13 14:35:38
-->
<template>
  <ih-page label-width="100px">
    <template v-slot:form>
      <el-form ref="form" label-width="100px"  @submit.native.prevent>
        <el-row>
          <el-col :span="20" class="text-left">
            <el-input
              v-model="queryPageParameters.name"
              clearable
              class="input-wrapper"
              placeholder="请输入分公司名称"
            ></el-input>
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button type="primary" class="margin-left-20" @click.native.prevent="getListMixin()">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:table>
      <br/>
      <el-table
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list">
        <el-table-column
          prop="name"
          label="分公司名称"
          min-width="120"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-link
              class="margin-right-10"
              type="primary"
              @click.native.prevent="detail(scope)"
            >详情
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
      <br/>
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
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {
    post_org_getList
  } from "@/api/system";

  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class CompanyList extends Vue {
    queryPageParameters: any = {
      name: null,
      orgType: 'Department'
    };

    resPageInfo: any = {
      total: null,
      list: [],
    };

    async created() {
      await this.getListMixin();
    }

    // 获取分公司列表
    async getListMixin() {
      this.resPageInfo = await post_org_getList(this.queryPageParameters);
    }

    // 重置
    reset() {
      this.queryPageParameters = {
        name: null,
        orgType: 'Department',
        pageNum: 1,
        pageSize: this.queryPageParameters.pageSize,
      };
    }

    // 分公司详情
    async detail(scope: any) {
      localStorage.setItem('companyId', scope.row.id);
      this.$router.push({path: "/achieveScaleScheme/list"});
    }
  }
</script>
<style lang="scss" scoped>
  .input-wrapper {
    width: 230px;
  }
</style>
