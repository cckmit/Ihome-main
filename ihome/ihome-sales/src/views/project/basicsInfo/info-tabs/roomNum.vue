<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-09 15:00:50
-->
<template>
  <div>
    <el-form
      ref="form"
      label-width="100px"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="栋座名称">
            <el-input
              clearable
              v-model="queryPageParameters.buildingName"
              placeholder="栋座名称"
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
                v-for="item in $root.dictAllList('Property')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
        <el-col
          :span="6"
          class="text-left"
        >
          <el-form-item>
            <el-button
              type="primary"
              @click="search()"
            >查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
        width="120"
        fixed="right"
        align="center"
      >
        <template v-slot="{ row }">
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
      :show="viewDialogVisible"
      desc="查看房源"
    >
      <RoomView
        :data="viewData"
        @cancel="() => (viewDialogVisible = false)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RoomView from "../dialog/roomView.vue";
import PaginationMixin from "@/mixins/pagination";
import { post_building_getList } from "@/api/project/index";

@Component({
  components: { RoomView },
  mixins: [PaginationMixin],
})
export default class InfoRoomNum extends Vue {
  queryPageParameters: any = {
    buildingName: null,
    propertyEnum: null,
    proId: this.$route.query.id,
  };
  viewDialogVisible = false;
  viewData: any = {};

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
    } else {
      this.$message.warning("请先完善基础信息");
    }
  }

  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  view(row: any) {
    this.viewData = row;
    this.viewDialogVisible = true;
  }
}
</script>
<style lang="scss">
</style>