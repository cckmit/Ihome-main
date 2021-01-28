<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-27 17:01:52
-->
<template>
  <div>
    <el-form
      ref="form"
      label-width="100px"
      class="text-left"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="栋座名称">
            <el-input
              style="width: 100%"
              clearable
              v-model="queryPageParameters.buildingName"
              placeholder="栋座名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物业类型">
            <el-select
              v-model="queryPageParameters.propertyEnum"
              clearable
              placeholder="物业类型"
              style="width: 100%"
            >
              <el-option
                v-for="item in $root.dictAllList('Property')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="装修级别">
            <el-select
              v-model="queryPageParameters.renovatLevelEnum"
              clearable
              placeholder="装修级别"
              style="width: 100%"
            >
              <el-option
                v-for="item in $root.dictAllList('RenovatLevel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="12"
          class="text-left"
        >
          <el-form-item>
            <el-button
              type="primary"
              @click="search()"
            >查询</el-button>
            <el-button
              type="success"
              @click="add()"
              v-if="!isMingyuan"
              v-has="'B.SALES.PROJECT.BASICLIST.XZDZ'"
            >新增栋座</el-button>
            <el-button
              v-has="'B.SALES.PROJECT.BASICLIST.DZFHKJDRFH'"
              type="success"
              v-if="$route.name !== 'projectChildAdd' && !isMingyuan"
              @click="fastImport"
            >快捷导入房号</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="inittitle">温馨提示：推荐使用快捷导入房号功能，导入成功后将自动生成户型信息、栋座信息、房间信息</div>
    <br />
    <el-table
      class="ih-table"
      :data="resPageInfo.list"
      style="width: 100%"
    >
      <el-table-column
        prop="buildingName"
        label="栋座"
      ></el-table-column>
      <el-table-column
        prop="propertyEnum"
        label="物业类型"
      >
        <template v-slot="{ row }">{{
          $root.dictAllName(row.propertyEnum, "Property")
        }}</template>
      </el-table-column>
      <el-table-column
        prop="renovatLevelEnum"
        label="装修级别"
      >
        <template v-slot="{ row }">{{
          $root.dictAllName(row.renovatLevelEnum, "RenovatLevel")
        }}</template>
      </el-table-column>
      <el-table-column
        prop="floor"
        label="地上层数"
      ></el-table-column>
      <el-table-column
        prop="undergroundNum"
        label="地下层数"
      ></el-table-column>
      <el-table-column
        prop="houseTypes"
        label="户型"
      >
        <template v-slot="{ row }">
          <span
            v-for="(item, i) in row.houseTypes"
            :key="i"
          >
            <span>{{ item }}</span>
            <span v-if="i !== row.houseTypes.length - 1">、</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        fixed="right"
        align="center"
      >
        <template v-slot="{ row }">
          <el-link
            type="primary"
            @click="edit(row)"
            v-has="'B.SALES.PROJECT.BASICLIST.DZFHBJ'"
            v-if="!isMingyuan"
          >编辑</el-link>
          <el-link
            style="margin-left: 20px"
            type="primary"
            @click.native.prevent="view(row)"
          >查看房号</el-link>
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
    <ih-dialog
      :show="editDialogVisible"
      desc="编辑"
    >
      <RoomNumEdit
        :data="editData"
        @cancel="() => (editDialogVisible = false)"
        @finish="(data) => editFinish(data)"
      />
    </ih-dialog>
    <ih-dialog
      :show="viewDialogVisible"
      desc="查看房源"
    >
      <RoomView
        :data="viewData"
        @cancel="() => (viewDialogVisible = false)"
      />
    </ih-dialog>
    <ih-dialog
      :show="importDialogVisible"
      desc="快捷导入房号"
    >
      <Import
        :data="inportData"
        @cancel="cancel"
      />
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
  post_building_add,
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
    renovatLevelEnum: null,
    proId: this.$route.query.id,
  };

  editDialogVisible = false;
  viewDialogVisible = false;
  importDialogVisible = false;
  editData: any = {};
  viewData: any = {};
  inportData: any = {};
  roomNumType = "";

  resPageInfo: any = {
    list: [],
    total: 0,
  };

  get isMingyuan() {
    return Number(window.sessionStorage.getItem("projectExMinyuan"));
  }

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

  add() {
    this.editData = {};
    this.roomNumType = "add";
    this.editDialogVisible = true;
  }

  edit(row: any) {
    this.editData = {
      ...row,
      propertyEnum: {
        propertyId: row.propertyId,
        propertyEnum: row.propertyEnum,
      },
    };
    this.roomNumType = "edit";
    this.editDialogVisible = true;
  }
  async editFinish(data: any) {
    let obj = { ...data };
    obj.proId = this.proId;
    obj.propertyEnum = data.propertyEnum.propertyEnum;
    obj.propertyId = data.propertyEnum.propertyId;
    if (this.roomNumType === "add") {
      await post_building_add(obj);
    } else {
      await post_building_update(obj);
    }
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
<style lang="scss" scoped>
.inittitle {
  font-size: 14px;
  color: red;
  text-align: left;
}
</style>