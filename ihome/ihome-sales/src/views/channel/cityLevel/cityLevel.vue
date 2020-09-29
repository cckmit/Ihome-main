<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-29 11:42:48
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <p class="ih-info-title">城市等级信息列表</p>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="省份">
              <el-select
                v-model="queryPageParameters.parentCode"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('provinces')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-select
                v-model="queryPageParameters.code"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('city')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市等级">
              <el-select
                v-model="queryPageParameters.grade"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('cityLevel')"
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
        <el-button type="warning" @click="reset()">清空</el-button>
        <el-button type="info" @click="change()">修改</el-button>
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
        <el-table-column
          fixed
          poro="parentCode"
          label="省份"
          width="500"
        ></el-table-column>
        <el-table-column
          fixed
          prop="code"
          label="城市"
          width="500"
        ></el-table-column>
        <el-table-column fixed prop="grade" label="城市等级"></el-table-column>
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
    <el-dialog title="" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="城市等级">
          <el-select
            v-model="form.grade"
            clearable
            placeholder="城市等级"
            class="width--100"
          >
            <el-option
              v-for="item in $root.displayList('cityLevel')"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
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
import PaginationMixin from "../../../mixins/pagination";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class CityList extends Vue {
  queryPageParameters: any = {
    grade: "",
    parentCode: "",
    code: "",
    pageSize: 10,
    pageNum: 1,
  };
  changeList: any = {
    list: [],
  };
  form: any = {
    grade: 1,
  };
  dialogFormVisible = false;
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  reset() {
    this.queryPageParameters = {
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
      grade: null,
      cityCode: null,
      parentCode: null,
    };
  }
  handleSizeChangeMixin(val: any) {
    console.log(val);
    this.queryPageParameters.pageSize = val;
    this.getListMixin();
  }
  handleCurrentChangeMixin(val: any) {
    console.log(val);
    this.queryPageParameters.pageNum = val;
    this.getListMixin();
  }
  handleSelectionChange(val) {
    console.log("fff");
    this.changeList.list = val;
    // console.log(this.changeList.list);
  }
  total: any = null;
  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_channelCityLevel_getList(
      this.queryPageParameters
    );
  }
  search() {
    this.getListMixin();
  }
  change() {
    console.log("修改");
    console.log(this.changeList.list);
    this.dialogFormVisible = true;
  }
  update() {
    let idArr: number[];
    this.changeList.list.forEach((ele) => {
      idArr.push(ele.id);
    });
    console.log(idArr);
    post_channelCityLevel_updateLevel({
      ids: idArr,
      cityGrade: this.form.grade,
    });
    this.dialogFormVisible = false;
  }
}
</script>
<style lang="scss" scoped>
</style>
 