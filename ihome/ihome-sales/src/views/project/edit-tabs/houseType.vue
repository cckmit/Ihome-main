<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-23 17:37:30
-->
<template>
  <div class="house-type">
    <p class="ih-info-title">楼盘卖点</p>
    <!-- <ih-upload
      :file-list="fileList"
      accept="image/*"
      class="margin-left-20"
      size="150px"
    >
      <template #info="{ data }">
        <div class="file-item">
          <div class="width-150">{{ data.msg }}</div>
          <el-button type="success" size="small" @click="edit(data)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="remove(data)"
            >删除</el-button
          >
        </div>
      </template>
    </ih-upload> -->
    <template v-for="item in data">
      <div :key="item.id" class="info">
        <img class="img" :src="item.url" alt="" />
      </div>
    </template>
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
  display: flex;
  display: inline-block;
  flex-direction: row;
  justify-content: flex-start;
}
.info {
  .img {
    width: 100px;
    height: 100px;
  }
}
</style>