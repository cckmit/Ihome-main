<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-13 19:21:57
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="省份">
              <el-select
                v-model="queryPageParameters.proviceCode"
                clearable
                placeholder="请选择"
                class="width--100"
                @change="proviceChange"
              >
                <el-option
                  v-for="item in provinceOption"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-select
                v-model="queryPageParameters.cityCode"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in cityOption"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
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
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="info" @click="reset()">清空</el-button>
        <el-button
          type="success"
          @click="dialogFormVisible = true"
          :disabled="editDisabled"
          >修改</el-button
        >
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        @selection-change="handleSelectionChange"
        :data="resPageInfo.list"
      >
        <el-table-column fixed type="selection" width="100"></el-table-column>
        <el-table-column prop="parentCode" label="省份"></el-table-column>
        <el-table-column fixed prop="code" label="城市"></el-table-column>
        <el-table-column prop="cityGrade" label="城市等级">
          <template v-slot="{ row }">{{
            $root.dictAllName(row.cityGrade, "CityLevel").name
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
        :page-num="queryPageParameters.pageNum"
        :layout="$root.paginationLayout"
        :total="resPageInfo.total"
      ></el-pagination>
    </template>
    <el-dialog width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="城市等级" label-width="80px">
          <el-select
            v-model="form.cityGrade"
            clearable
            placeholder="城市等级"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish">确 定</el-button>
      </div>
    </el-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  post_channelCityLevel_getList,
  post_channelCityLevel_updateLevel,
} from "../../../api/channel/index";

import {
  get_area_getAllProvince,
  get_area_getAllChildArea__code,
} from "../../../api/system/index";
import PaginationMixin from "../../../mixins/pagination";

@Component({
  components: {},
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
  form = {
    cityGrade: null,
    ids: [],
  };
  dialogFormVisible = false;
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  private get editDisabled() {
    return this.selection.length === 0;
  }

  reset() {
    this.queryPageParameters = {
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
      proviceCode: null,
      cityCode: null,
      cityGrade: null,
    };
  }
  handleSizeChangeMixin(val: any) {
    this.queryPageParameters.pageSize = val;
    this.getListMixin();
  }
  handleCurrentChangeMixin(val: any) {
    this.queryPageParameters.pageNum = val;
    this.getListMixin();
  }
  handleSelectionChange(val: any) {
    this.selection = val;
  }
  total: any = null;
  async created() {
    this.getListMixin();
    this.getProvince();
  }
  async getProvince() {
    this.provinceOption = await get_area_getAllProvince();
  }
  async getListMixin() {
    this.resPageInfo = await post_channelCityLevel_getList(
      this.queryPageParameters
    );
  }

  async proviceChange(v: any) {
    this.queryPageParameters.cityCode = null;
    this.cityOption = [];
    if (v) {
      this.cityOption = await get_area_getAllChildArea__code({ code: v });
    }
  }

  search() {
    this.getListMixin();
  }

  async finish() {
    this.form.ids = this.selection.map((v: any) => v.id);
    await post_channelCityLevel_updateLevel(this.form);
    this.dialogFormVisible = false;
    this.$message.success("保存成功!");
    this.getListMixin();
    this.form = {
      cityGrade: null,
      ids: [],
    };
  }
}
</script>
<style lang="scss" scoped>
</style>
 