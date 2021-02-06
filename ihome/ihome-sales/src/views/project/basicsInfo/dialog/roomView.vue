<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 18:39:23
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-06 09:39:46
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    top="11vh"
    class="dialog text-left"
    :title="`当前位置: ${proName} ${$root.dictAllName(
      data.propertyEnum,
      'Property'
    )} ${data.buildingName}`"
  >
    <el-form
      ref="form"
      label-width="70px"
    >
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
                :key="item.houseTypeId"
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
                v-for="item in $root.dictAllList('Position')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          class="text-left width--50"
        >
          <el-form-item>
            <el-button
              type="primary"
              @click="search()"
            >查询</el-button>
            <el-button
              type="success"
              @click="add()"
              v-if="
                !['projectChildInfo', 'projectChildAudit'].includes(
                  this.$route.name
                )
               && !isMingyuan"
              v-has="'B.SALES.PROJECT.BASICLIST.XZFH'"
            >添加房号</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      class="ih-table"
      :data="resPageInfo.list"
      style="width: 100%"
      height="538px"
    >
      <el-table-column
        prop="roomNo"
        label="房号"
      ></el-table-column>
      <el-table-column
        prop="houseName"
        label="户型"
      ></el-table-column>
      <el-table-column label="房型">
        <template v-slot="{ row }">
          <span>
            {{
              `${row.room ? row.room : 0}室${row.hall ? row.hall : 0}厅${
                row.kitchen ? row.kitchen : 0
              }厨`
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="space"
        label="面积"
      ></el-table-column>
      <el-table-column
        prop="positionEnum"
        label="朝向"
      >
        <template v-slot="{ row }">
          {{ $root.dictAllName(row.positionEnum, "Position") }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        fixed="right"
        v-if="
          !['projectChildInfo', 'projectChildAudit'].includes(this.$route.name) && !isMingyuan
        "
      >
        <template v-slot="{ row }">
          <el-link
            type="primary"
            @click="edit(row)"
            v-has="'B.SALES.PROJECT.BASICLIST.BJFH'"
          >编辑</el-link>
          <el-link
            style="margin-left: 20px"
            type="primary"
            v-has="'B.SALES.PROJECT.BASICLIST.SCFH'"
            @click="remove(row)"
          >移除</el-link>
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
  post_room_getListByBuildingId,
  get_houseType_getItemsByProperty__proId,
  post_room_add,
  post_room_update,
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
    buildingId: this.data.buildingId,
  };
  houseTypeOptions: any = [];
  editData: any = {};
  proName: any = "";

  resPageInfo: any = {
    list: [],
    total: 0,
  };
  roomViewType: any = "";

  get isMingyuan() {
    return Number(window.sessionStorage.getItem("projectExMinyuan"));
  }

  private get proId() {
    return this.$route.query.id;
  }

  async created() {
    this.getListMixin();
    this.getHouseType();
    this.proName = window.sessionStorage.getItem("proName");
  }
  async getListMixin() {
    this.resPageInfo = await post_room_getListByBuildingId(
      this.queryPageParameters
    );
  }

  async getHouseType() {
    this.houseTypeOptions = await get_houseType_getItemsByProperty__proId({
      proId: this.proId,
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
    if (this.roomViewType === "add") {
      await post_room_add(obj);
    } else {
      await post_room_update(obj);
    }
    this.$message.success("保存成功");
    this.viewEditDialogVisible = false;
    this.getListMixin();
    this.getHouseType();
  }

  async remove(row: any) {
    try {
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