<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-06 15:31:32
-->
<template>
  <div class="house-type text-left">
    <div class="content" v-for="item in info" :key="item.houseTypeId">
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
      <el-button size="small" type="success" @click="edit(item)"
        >编辑</el-button
      >
      <el-button size="small" type="danger" @click="remove(item)"
        >删除</el-button
      >
    </div>
    <div class="plus" @click="add()">
      <i class="el-icon-plus"></i>
      <div class="title">点击新增户型</div>
    </div>
    <ih-dialog :show="dialogVisible" desc="编辑">
      <HouseTypeEdit
        :data="editData"
        @cancel="() => (dialogVisible = false)"
        @finish="(data) => finish(data)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HouseTypeEdit from "../dialog/houseTypeEdit.vue";
import {
  get_houseType_getTabItem__proId,
  post_houseType_add,
  post_houseType_delete__houseTypeId,
} from "@/api/project/index";

@Component({
  components: { HouseTypeEdit },
})
export default class EditHouseType extends Vue {
  searchOpen = true;
  info: any = {};
  dialogVisible = false;
  editData: any = {};

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
    this.editData = {};
    this.dialogVisible = true;
  }

  edit(data: any) {
    this.editData = { ...data };
    this.dialogVisible = true;
  }

  async finish(data: any) {
    let obj: any = {};
    obj = { ...data };
    obj.picAddr = data.fileList[0].fileId;
    obj.proId = this.proId;
    await post_houseType_add(obj);
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
}
</script>
<style lang="scss" scoped>
.house-type {
  display: flex;
  overflow: auto;
  width: 100%;
  height: 100%;
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
</style>