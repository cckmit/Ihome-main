<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-22 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-30 14:36:05
-->
<template>
  <div>
    <p class="ih-info-title">楼盘卖点</p>
    <div style="margin-left: 20px">
      <p class="subtitle">价格优势:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.priceAdvantage"
      />
      <p class="subtitle">生活配套:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.lifeFacilities"
      />
      <p class="subtitle">交通出行:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.transportation"
      />
      <p class="subtitle">学区配套:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.schoolFacilities"
      />
      <p class="subtitle">项目特色:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.projectFeatures"
      />
      <p class="subtitle">物业管理:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.propertyManagement"
      />
      <p class="subtitle">其他:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.other"
      />
    </div>
    <p class="ih-info-title">目标客户</p>
    <div style="margin-left: 20px">
      <p class="subtitle">客户年龄:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.customerAge"
      />
      <p class="subtitle">购房目的:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.housePurchasing"
      />
      <p class="subtitle">工作区域:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.workArea"
      />
      <p class="subtitle">居住区域:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.residentialArea"
      />
      <p class="subtitle">意向房型:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.intentionRoomType"
      />
      <p class="subtitle">客户考虑因素:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.customerConsiderations"
      />
      <p class="subtitle">客户其他:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.customerOther"
      />
    </div>
    <div class="margin-top-20">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="$goto({ path: '/projects/list' })">关闭</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_promotion_get__proId,
  post_promotion_save,
} from "@/api/project/index";

@Component({
  components: {},
})
export default class PopularizeInfo extends Vue {
  searchOpen = true;

  info: any = {
    customerAge: null,
    customerConsiderations: null,
    customerOther: null,
    housePurchasing: null,
    intentionRoomType: null,
    lifeFacilities: null,
    other: null,
    priceAdvantage: null,
    projectFeatures: null,
    promotionId: null,
    propertyManagement: null,
    residentialArea: null,
    schoolFacilities: null,
    transportation: null,
    workArea: null,
  };

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
  async save() {
    this.info.proId = this.$route.query.id;
    await post_promotion_save(this.info);
    this.$message.success("保存成功");
    this.getListMixin();
  }
}
</script>
<style lang="scss">
.subtitle {
  text-align: left;
  margin-left: 10px;
  font-size: 15px;
}
</style>