<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-26 10:05:46
-->
<template>
  <div class="house-type">
    <p class="ih-info-title">住宅户型</p>
    <div class="content">
      <template v-for="item in data">
        <div :key="item.id" class="info">
          <img class="img" :src="item.url" alt="" />
          <div class="title">{{ item.msg }}</div>
          <el-button size="small" type="success" @click="edit(item)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="remove(item)"
            >删除</el-button
          >
        </div>
      </template>
      <div class="plus" @click="dialogVisible = true">
        <i class="el-icon-plus"></i>
        <div class="title">点击新增户型</div>
      </div>
    </div>
    <ih-dialog :show="dialogVisible" desc="编辑">
      <HouseTypeEdit
        :data="editData"
        @cancel="() => (dialogVisible = false)"
        @finish="
          (data) => {
            dialogVisible = false;
            editFinish(data);
          }
        "
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HouseTypeEdit from "../dialog/houseTypeEdit.vue";

@Component({
  components: { HouseTypeEdit },
})
export default class HouseType extends Vue {
  searchOpen = true;
  data: any = [
    {
      name: "abc.pdf",
      fileId: 344,
      msg: "高层单位100m² 1室 1厅 1厨 1卫 100.0㎡",
      id: 1,
      url: require("./1111.jpg"),
    },
    {
      name: "word.docx",
      fileId: 346,
      msg: "高层单位200m² 2室 2厅 2厨 2卫 200.0㎡",
      id: 2,
      url: require("./2222.jpg"),
    },
  ];
  dialogVisible = false;
  editData: any = {};

  async created() {
    this.getInfo();
  }
  async getInfo() {
    // this.fileList = await get_companyLog_getAll__companyId();
  }

  edit(data: any) {
    this.editData = data;
    this.dialogVisible = true;
  }

  async remove(data: any) {
    console.log(data);
    try {
      let index = this.data.findIndex((v: any) => v.id === data.id);
      await this.$confirm("是否确定删除?", "提示");
      this.data.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
<style lang="scss" scoped>
.house-type {
  width: 100%;
  height: 100%;
  display: inline-block;
  .content {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    margin-left: 20px;
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
    .el-icon-plus {
      font-size: 30px;
      line-height: 150px;
      color: #8c939d;
    }
  }
}
.info {
  display: inline-block;
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

.title {
  width: 150px;
  padding: 5px 0;
  font-size: 14px;
}
</style>