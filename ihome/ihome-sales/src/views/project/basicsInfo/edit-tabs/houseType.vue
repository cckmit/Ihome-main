<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-31 09:47:27
-->
<template>
  <div>
    <div class="text-left margin-left-25">
      <el-button
        type="success"
        v-if="$route.name !== 'projectChildAdd'"
        @click="fastImport"
        size="mini"
      >快捷导入房号</el-button>
      <div class="init">温馨提示：推荐使用快捷导入房号功能，导入成功后将自动生成户型信息、栋座信息、房间信息</div>
    </div>
    <div
      class="house-type text-left"
      :style="{ height: info.length ? '100%' : '200px' }"
    >
      <div
        class="content"
        v-for="item in info"
        :key="item.houseTypeId"
      >
        <img
          class="img"
          :src="`/sales-api/sales-document-cover/file/browse/${item.picAddr}`"
          alt=""
        />
        <div class="title">
          {{ `${item.houseName} ${item.space}m²` }}<br />
          {{
          `${item.room}室${item.hall}厅 ${item.kitchen}厨
              ${item.toilet}卫 ${item.space}m²`
        }}
        </div>
        <el-button
          size="small"
          type="success"
          @click="edit(item)"
        >编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="remove(item)"
        >删除</el-button>
      </div>
      <div
        class="plus"
        @click="add()"
      >
        <i class="el-icon-plus"></i>
        <div class="title">点击新增户型</div>
      </div>
      <ih-dialog
        :show="dialogVisible"
        desc="编辑"
      >
        <HouseTypeEdit
          :data="editData"
          @cancel="() => (dialogVisible = false)"
          @finish="(data) => finish(data)"
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HouseTypeEdit from "../dialog/houseTypeEdit.vue";
import Import from "../dialog/import.vue";
import {
  get_houseType_getTabItem__proId,
  post_houseType_add,
  post_houseType_update,
  post_houseType_delete__houseTypeId,
} from "@/api/project/index";

@Component({
  components: { HouseTypeEdit, Import },
})
export default class EditHouseType extends Vue {
  searchOpen = true;
  info: any = [];
  dialogVisible = false;
  editData: any = {};
  dialogType = "";
  importDialogVisible = false;
  inportData: any = {};

  private get proId() {
    return this.$route.query.id;
  }

  async created() {
    this.getInfo();
  }
  async getInfo() {
    if (this.proId) {
      this.info = await get_houseType_getTabItem__proId({ proId: this.proId });
    }
  }

  add() {
    this.dialogType = "add";
    this.editData = {};
    this.dialogVisible = true;
  }

  edit(data: any) {
    this.dialogType = "edit";
    this.editData = { ...data };
    this.dialogVisible = true;
  }

  async finish(data: any) {
    let obj: any = {};
    obj = { ...data };
    if (data.fileList.length) {
      obj.picAddr = data.fileList[0].fileId;
    }
    obj.proId = this.proId;
    if (this.dialogType === "add") {
      await post_houseType_add(obj);
    } else {
      await post_houseType_update(obj);
    }
    this.$message.success("保存成功");
    this.dialogVisible = false;
    this.getInfo();
  }

  async remove(data: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_houseType_delete__houseTypeId({
        houseTypeId: data.houseTypeId,
      });
      this.$message({
        type: "success",
        message: "删除成功!",
      });
      this.getInfo();
    } catch (error) {
      console.log(error);
    }
  }

  fastImport() {
    this.importDialogVisible = true;
  }

  cancel() {
    this.importDialogVisible = false;
    this.getInfo();
  }
}
</script>
<style lang="scss" scoped>
.house-type {
  display: flex;
  overflow: auto;
  width: 100%;
  margin-top: 20px;
  .content {
    display: inline-block;
    margin-left: 20px;
    text-align: center;
    padding: 5px;
    & + & {
      margin-left: 10px;
    }
    .img {
      width: 150px;
      height: 150px;
    }
  }

  .plus {
    width: 150px;
    height: 150px;
    display: inline-block;
    margin-left: 10px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    border-radius: 6px;
    text-align: center;
    vertical-align: top;
    .el-icon-plus {
      font-size: 30px;
      line-height: 150px;
      color: #8c939d;
    }
  }
}
.title {
  width: 150px;
  padding: 5px 0;
  font-size: 14px;
}
.init {
  margin-top: 15px;
  font-size: 14px;
  color: red;
}
</style>