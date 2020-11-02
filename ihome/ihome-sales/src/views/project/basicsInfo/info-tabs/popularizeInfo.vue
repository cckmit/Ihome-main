<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-22 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-02 16:38:35
-->
<template>
  <div>
    <p class="ih-info-title">楼盘卖点</p>
    <div style="margin-left: 20px">
      <p class="subtitle">价格优势:</p>
      <div class="msg">{{ info.priceAdvantage }}</div>
      <p class="subtitle">生活配套:</p>
      <div class="msg">{{ info.lifeFacilities }}</div>
      <p class="subtitle">交通出行:</p>
      <div class="msg">{{ info.transportation }}</div>
      <p class="subtitle">学区配套:</p>
      <div class="msg">{{ info.schoolFacilities }}</div>
      <p class="subtitle">项目特色:</p>
      <div class="msg">{{ info.projectFeatures }}</div>
      <p class="subtitle">物业管理:</p>
      <div class="msg">{{ info.propertyManagement }}</div>
      <p class="subtitle">其他:</p>
      <div class="msg">{{ info.other }}</div>
    </div>
    <p class="ih-info-title">目标客户</p>
    <div style="margin-left: 20px">
      <p class="subtitle">客户年龄:</p>
      <div class="msg">{{ info.customerAge }}</div>
      <p class="subtitle">购房目的:</p>
      <div class="msg">{{ info.housePurchasing }}</div>
      <p class="subtitle">工作区域:</p>
      <div class="msg">{{ info.workArea }}</div>
      <p class="subtitle">居住区域:</p>
      <div class="msg">{{ info.residentialArea }}</div>
      <p class="subtitle">意向房型:</p>
      <div class="msg">{{ info.intentionRoomType }}</div>
      <p class="subtitle">客户考虑因素:</p>
      <div class="msg">{{ info.customerConsiderations }}</div>
      <p class="subtitle">客户其他:</p>
      <div class="msg">{{ info.customerOther }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_promotion_get__proId } from "@/api/project/index";

@Component({
  components: {},
})
export default class PopularizeInfo extends Vue {
  searchOpen = true;

  info: any = {};

  private get proId() {
    return this.$route.query.id;
  }

  async created() {
    this.getListMixin();
  }

  async getListMixin() {
    if (this.proId) {
      const data = await get_promotion_get__proId({
        proId: this.proId,
      });
      this.info = { ...data };
    }
  }
}
</script>
<style lang="scss">
.subtitle {
  text-align: left;
  margin-left: 10px;
  font-size: 15px;
}
.msg {
  padding: 20px;
}
</style>