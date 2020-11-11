<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-11 15:04:35
--> 
<template>
  <IhPage label-width="100px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="省市">
              <IhCascader
                :level="2"
                v-model="provinceOption"
                clearable
                placeholder="请选择"
                class="width--100"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市等级">
              <el-select
                v-model="queryPageParameters.cityGrade"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('CityLevel')"
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
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          @click="reset"
        >重置</el-button>
        <el-button
          type="success"
          @click="citySet()"
        >设置城市等级</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        @selection-change="handleSelectionChange"
        :data="resPageInfo.list"
        :empty-text="emptyText"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="parentCode"
          label="省份"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.parentCode)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="城市"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.code)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="cityGrade"
          label="城市等级"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.cityGrade, "CityLevel")
          }}</template>
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

    <IhDialog
      :show="dialogFormVisible"
      desc="设置城市等级"
    >
      <LevalDialog
        :data="selection"
        @cancel="() => (dialogFormVisible = false)"
        @finish="
          (data) => {
            dialogFormVisible = false;
            getListMixin();
          }
        "
      >
      </LevalDialog>
    </IhDialog>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { post_channelCityLevel_getList } from "../../../api/channel/index";
import PaginationMixin from "../../../mixins/pagination";

import LevalDialog from "./dialog/levelDialog.vue";

@Component({
  components: { LevalDialog },
  mixins: [PaginationMixin],
})
export default class CityList extends Vue {
  queryPageParameters: any = {
    proviceCode: null,
    cityCode: null,
    cityGrade: null,
  };
  provinceOption: any = [];
  cityOption: any = [];
  selection: any = [];
  dialogFormVisible = false;
  resPageInfo: any = {
    total: null,
    list: [],
  };
  total: any = null;

  reset() {
    Object.assign(this.queryPageParameters, {
      proviceCode: null,
      cityCode: null,
      cityGrade: null,
    });
    this.provinceOption = [];
  }
  handleSelectionChange(val: any) {
    this.selection = val;
  }
  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_channelCityLevel_getList(
      this.queryPageParameters
    );
  }

  search() {
    this.queryPageParameters.proviceCode = this.provinceOption[0];
    this.queryPageParameters.cityCode = this.provinceOption[1];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  citySet() {
    if (this.selection.length) this.dialogFormVisible = true;
    else this.$message.warning("请先勾选表格数据");
  }
}
</script>
<style lang="scss" scoped>
</style>
 