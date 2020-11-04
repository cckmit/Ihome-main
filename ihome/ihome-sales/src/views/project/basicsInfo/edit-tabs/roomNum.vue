<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-04 17:52:40
-->
<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="项目盘编">
            <el-input
              clearable
              v-model="queryPageParameters.buildingName"
              placeholder="项目盘编"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物业类型">
            <el-select
              v-model="queryPageParameters.propertyEnum"
              clearable
              placeholder="物业类型"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('PropertyEnum')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="text-left">
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button
              type="success"
              v-if="$route.name !== 'projectAdd'"
              @click="fastImport"
              >快捷导入房号</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table class="ih-table" :data="resPageInfo.list" style="width: 100%">
      <el-table-column prop="buildingName" label="栋座"></el-table-column>
      <el-table-column prop="propertyEnum" label="物业类型">
        <template v-slot="{ row }">{{
          $root.dictAllName(row.propertyEnum, "PropertyEnum")
        }}</template>
      </el-table-column>
      <el-table-column prop="floor" label="地上层数"></el-table-column>
      <el-table-column prop="undergroundNum" label="地下层数"></el-table-column>
      <el-table-column prop="houseTypes" label="户型">
        <template v-slot="{ row }">
          <span v-for="(item, i) in row.houseTypes" :key="item">
            <span>{{ item }}</span>
            <span v-if="i !== row.houseTypes.length - 1">、</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template v-slot="{ row }">
          <el-link type="primary" @click="edit(row)">编辑</el-link>
          <el-link
            style="margin-left: 20px"
            type="primary"
            @click.native.prevent="view(row)"
            >查看房号</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      class="text-right"
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>
    <ih-dialog :show="editDialogVisible" desc="编辑">
      <RoomNumEdit
        :data="editData"
        @cancel="() => (editDialogVisible = false)"
        @finish="(data) => editFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="viewDialogVisible" desc="查看房源">
      <RoomView :data="viewData" @cancel="() => (viewDialogVisible = false)" />
    </ih-dialog>
    <ih-dialog :show="importDialogVisible" desc="快捷导入房号">
      <Import :data="inportData" @cancel="cancel" />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RoomNumEdit from "../dialog/roomNumEdit.vue";
import RoomView from "../dialog/roomView.vue";
import PaginationMixin from "@/mixins/pagination";
import Import from "../dialog/import.vue";
import {
  post_building_getList,
  post_building_update,
} from "@/api/project/index";

@Component({
  components: { RoomNumEdit, RoomView, Import },
  mixins: [PaginationMixin],
})
export default class EidtRoomNum extends Vue {
  queryPageParameters: any = {
    buildingName: null,
    propertyEnum: null,
    proId: this.$route.query.id,
  };

  editDialogVisible = false;
  viewDialogVisible = false;
  importDialogVisible = false;
  editData: any = {};
  viewData: any = {};
  inportData: any = {};

  resPageInfo: any = {
    list: [],
    total: 0,
  };

  private get proId() {
    return this.$route.query.id;
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    if (this.proId) {
      this.resPageInfo = await post_building_getList(this.queryPageParameters);
    }
  }

  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  edit(row: any) {
    this.editData = row;
    this.editDialogVisible = true;
  }
  async editFinish(data: any) {
    let obj = { ...data };
    obj.proId = this.proId;
    await post_building_update(obj);
    this.$message.success("保存成功");
    this.editDialogVisible = false;
    this.getListMixin();
  }

  cancel() {
    this.importDialogVisible = false;
    this.getListMixin();
  }

  view(row: any) {
    this.viewData = row;
    this.viewDialogVisible = true;
  }

  fastImport() {
    this.importDialogVisible = true;
  }
}
</script>
<style lang="scss">
</style>