<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-06 17:32:51
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
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HouseTypeEdit from "../dialog/houseTypeEdit.vue";
import { get_houseType_getTabItem__proId } from "@/api/project/index";

@Component({
  components: { HouseTypeEdit },
})
export default class EditHouseType extends Vue {
  searchOpen = true;
  info: any = {};
  dialogVisible = false;

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
}
.title {
  width: 150px;
  padding: 5px 0;
  font-size: 14px;
}
</style>