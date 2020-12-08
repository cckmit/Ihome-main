<!--
 * @Description: 银行网点库维护
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-01 10:29:31
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-08 15:45:52
-->
<template>
  <IhPage label-width="80px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户行">
              <el-input
                v-model="queryPageParameters.branchName"
                placeholder="开户行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属银行">
              <el-input
                v-model="queryPageParameters.bankName"
                placeholder="所属银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联行号">
              <el-input
                v-model="queryPageParameters.branchNo"
                placeholder="联行号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省份">
              <el-input
                v-model="queryPageParameters.provinceName"
                placeholder="省份"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-input
                v-model="queryPageParameters.cityName"
                placeholder="城市"
              ></el-input>
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
          type="info"
          @click="reset()"
        >重置</el-button>
        <el-button type="success">导入</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list"
      >
        <el-table-column
          fixed
          prop="branchName"
          label="开户行"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="所属银行"
        ></el-table-column>
        <el-table-column
          prop="provinceName"
          label="省份"
        ></el-table-column>
        <el-table-column
          prop="cityName"
          label="城市"
        ></el-table-column>
        <el-table-column
          prop="branchNo"
          label="联行号"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="70"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="danger"
              @click="remove(row)"
            >删除</el-link>
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
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  post_bankBranch_getList,
  post_bankBranch_delete__id,
} from "@/api/finance/index";

import PaginationMixin from "../../../mixins/pagination";

@Component({
  mixins: [PaginationMixin],
})
export default class BankBranchList extends Vue {
  queryPageParameters: any = {
    bankName: "",
    branchName: "",
    branchNo: "",
    cityName: "",
    provinceName: "",
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };

  private search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      bankName: null,
      branchName: null,
      branchNo: null,
      cityName: null,
      provinceName: null,
    });
  }
  private async remove(row: any): Promise<void> {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_bankBranch_delete__id({ id: row.id });
      // 删除list最后一条数据 返回前一页面
      if (this.resPageInfo.list.length === 1) {
        this.queryPageParameters.pageNum === 1
          ? (this.queryPageParameters.pageNum = 1)
          : this.queryPageParameters.pageNum--;
      }
      this.$message.success("删除成功");
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }
  async getListMixin() {
    this.resPageInfo = await post_bankBranch_getList(this.queryPageParameters);
  }

  created() {
    this.getListMixin();
  }
}
</script>
