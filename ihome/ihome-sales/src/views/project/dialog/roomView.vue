<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    class="dialog text-left"
    :title="`当前位置`"
  >
    <el-form ref="form" label-width="100px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="房号：">
            <el-input
              clearable
              v-model="resPageInfo.checkOpinion"
              placeholder="房号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="户型：">
            <el-select
              v-model="resPageInfo.checkOpinion"
              clearable
              placeholder="户型"
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
        <el-col :span="5">
          <el-form-item label="朝向：">
            <el-select
              v-model="resPageInfo.checkOpinion"
              clearable
              placeholder="朝向"
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
        <el-col :span="9" class="text-left">
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button
              type="success"
              @click="
                {
                  viewEditDialogVisible = true;
                  editData = {};
                }
              "
              >添加房号</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table class="ih-table" :data="resPageInfo.list" style="width: 100%">
      <el-table-column prop="operation" label="房号"></el-table-column>
      <el-table-column prop="operator" label="户型"></el-table-column>
      <el-table-column prop="operateTime" label="房型"></el-table-column>
      <el-table-column prop="operateResult" label="面积"></el-table-column>
      <el-table-column prop="remark" label="户型"></el-table-column>
      <el-table-column prop="rema11rk" label="朝向"></el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template v-slot="{ row }">
          <el-link type="primary" @click="edit(row)">编辑</el-link>
          <el-link style="margin-left: 20px" type="primary" @click="remove(row)"
            >移除</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      class="text-right"
      style="margin-right: 40px"
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>
    <ih-dialog :show="viewEditDialogVisible" desc="编辑">
      <RoomViewEdit
        :data="editData"
        @cancel="() => (viewEditDialogVisible = false)"
        @finish="
          (data) => {
            viewEditDialogVisible = false;
            editFinish(data);
          }
        "
      />
    </ih-dialog>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import RoomViewEdit from "./roomViewEdit.vue";

@Component({
  components: { RoomViewEdit },
  mixins: [PaginationMixin],
})
export default class RoomView extends Vue {
  dialogVisible = true;
  viewEditDialogVisible = false;
  queryPageParameters: any = {
    pageNum: 1,
    checkOpinion: null,
  };
  editData: any = {};

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

  cancel() {
    this.$emit("cancel");
  }

  edit(row: any) {
    this.editData = row;
    this.viewEditDialogVisible = true;
  }

  async remove(row: any) {
    try {
      console.log(row);
      await this.$confirm("是否确定移除?", "提示");
      // await get_company_delete__id({ id: row.id });
      this.getInfo();
      this.$message({
        type: "success",
        message: "移除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
<style lang="scss">
</style>