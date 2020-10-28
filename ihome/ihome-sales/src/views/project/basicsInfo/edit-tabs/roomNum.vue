<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-28 15:28:57
-->
<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="项目盘编">
            <el-input
              clearable
              v-model="resPageInfo.checkOpinion"
              placeholder="项目盘编"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务类型">
            <el-select
              v-model="resPageInfo.checkOpinion"
              clearable
              placeholder="业务类型"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('ChannelStatus')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="text-left">
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="success">快捷导入房号</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table class="ih-table" :data="resPageInfo.list" style="width: 100%">
      <el-table-column prop="operation" label="栋座"></el-table-column>
      <el-table-column prop="operator" label="物业类型"></el-table-column>
      <el-table-column prop="operateTime" label="地上层数"></el-table-column>
      <el-table-column prop="operateResult" label="地下层数"></el-table-column>
      <el-table-column prop="remark" label="户型"></el-table-column>
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
        @finish="
          (data) => {
            editDialogVisible = false;
            editFinish(data);
          }
        "
      />
    </ih-dialog>
    <ih-dialog :show="viewDialogVisible" desc="查看房源">
      <RoomView
        @cancel="() => (viewDialogVisible = false)"
        @finish="
          (data) => {
            viewDialogVisible = false;
            viewFinish(data);
          }
        "
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RoomNumEdit from "../dialog/roomNumEdit.vue";
import RoomView from "../dialog/roomView.vue";
import PaginationMixin from "@/mixins/pagination";

@Component({
  components: { RoomNumEdit, RoomView },
  mixins: [PaginationMixin],
})
export default class RoomNum extends Vue {
  searchOpen = true;

  queryPageParameters: any = {
    pageNum: 1,
    checkOpinion: null,
  };

  editDialogVisible = false;
  viewDialogVisible = false;
  editData: any = {};
  viewData: any = {};

  resPageInfo: any = {
    list: [{}],
    total: 0,
  };

  async created() {
    this.getInfo();
  }
  async getInfo() {
    // this.resPageInfo = await get_companyLog_getAll__companyId({
    //   companyId: this.developerId,
    // });
  }

  edit(row: any) {
    this.editData = row;
    this.editDialogVisible = true;
  }
  view(row: any) {
    this.viewData = row;
    this.viewDialogVisible = true;
  }
}
</script>
<style lang="scss">
</style>