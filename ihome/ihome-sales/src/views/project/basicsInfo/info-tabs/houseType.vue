<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-04 16:28:33
-->
<template>
  <div class="house-type">
    <div v-for="list in info" :key="list.propertyId">
      <p class="ih-info-title">
        {{ $root.dictAllName(list.propertyEnum, "PropertyEnum") + "户型" }}
      </p>
      <div class="content">
        <template v-for="item in list.houseTypeVOS">
          <div :key="item.houseTypeId" class="info">
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
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_houseType_getTabItem__proId } from "@/api/project/index";

@Component({
  components: {},
})
export default class InfoHouseType extends Vue {
  searchOpen = true;
  info: any = {};

  private get proId() {
    return this.$route.query.id;
  }

  async created() {
    this.getInfo();
  }
  async getInfo() {
    if (this.proId) {
      this.info = await get_houseType_getTabItem__proId({ proId: this.proId });
    } else {
      this.$message.warning("请先完善基础信息");
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