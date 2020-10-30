<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    class="dialog text-left"
    :title="`当前位置: ${$route.query.proName} ${$root.dictAllName(
      data.propertyEnum,
      'PropertyEnum'
    )} ${data.buildingName}`"
  >
    <el-form ref="form" label-width="100px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="房号：">
            <el-input
              clearable
              v-model="resPageInfo.roomNo"
              placeholder="房号"
              class="width--100"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="户型：">
            <el-select
              v-model="resPageInfo.houseTypeName"
              clearable
              placeholder="户型"
              class="width--100"
            >
              <el-option
                v-for="item in houseTypeOptions"
                :key="item.propertyId"
                :label="item.houseName"
                :value="item.houseName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="朝向：">
            <el-select
              v-model="resPageInfo.positionEnum"
              clearable
              placeholder="朝向"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('PositionEnum')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9" class="text-left">
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="success" @click="add()">添加房号</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table class="ih-table" :data="resPageInfo.list" style="width: 100%">
      <el-table-column prop="roomNo" label="房号"></el-table-column>
      <el-table-column prop="houseName" label="户型"></el-table-column>
      <el-table-column label="房型">
        <template v-slot="{ row }">
          <span>
            {{ `${row.room}室${row.hall}厅${row.kitchen}厨` }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="space" label="面积"></el-table-column>
      <el-table-column prop="positionEnum" label="朝向">
        <template v-slot="{ row }">
          {{ $root.dictAllName(row.positionEnum, "PositionEnum") }}
        </template>
      </el-table-column>
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
    <ih-dialog :show="viewEditDialogVisible">
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
import { Component, Vue, Prop } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import RoomViewEdit from "./roomViewEdit.vue";
import {
  post_room_getList,
  get_houseType_getItemsByProperty__propertyId,
  post_room_add,
  post_room_del__id,
} from "@/api/project/index";

@Component({
  components: { RoomViewEdit },
  mixins: [PaginationMixin],
})
export default class RoomView extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  viewEditDialogVisible = false;
  queryPageParameters: any = {
    roomNo: null,
    houseTypeName: null,
    positionEnum: null,
    proId: this.$route.query.id,
  };
  houseTypeOptions: any = [];
  editData: any = {};

  resPageInfo: any = {
    list: [],
    total: 0,
  };
  roomViewType: any = "";

  private get proId() {
    return this.$route.query.id;
  }

  async created() {
    this.getListMixin();
    this.getHouseType();
  }
  async getListMixin() {
    this.resPageInfo = await post_room_getList(this.queryPageParameters);
  }

  async getHouseType() {
    this.houseTypeOptions = await get_houseType_getItemsByProperty__propertyId({
      propertyId: this.data.propertyId,
    });
  }

  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  cancel() {
    this.$emit("cancel");
  }

  add() {
    this.roomViewType = "add";
    this.editData = {
      buildingName: this.data.buildingName,
      buildingId: this.data.buildingId,
      roomViewType: this.roomViewType,
      propertyId: this.data.propertyId,
    };
    this.viewEditDialogVisible = true;
  }

  edit(row: any) {
    this.roomViewType = "edit";
    this.editData = {
      ...row,
      buildingName: this.data.buildingName,
      buildingId: this.data.buildingId,
      roomViewType: this.roomViewType,
      propertyId: this.data.propertyId,
    };
    this.viewEditDialogVisible = true;
  }

  async editFinish(data: any) {
    let obj = { ...data };
    obj.proId = this.proId;
    console.log(obj);
    await post_room_add(obj);
    this.$message.success("保存成功");
    this.viewEditDialogVisible = false;
    this.getListMixin();
  }

  async remove(row: any) {
    try {
      console.log(row);
      await this.$confirm("是否确定移除?", "提示");
      await post_room_del__id({ id: row.roomId });
      this.getListMixin();
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