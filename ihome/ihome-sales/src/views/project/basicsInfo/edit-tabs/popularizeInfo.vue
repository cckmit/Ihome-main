<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-22 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-22 17:29:23
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
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">生活配套:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">交通出行:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">学区配套:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">项目特色:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">物业管理:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">其他:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
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
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">购房目的:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">工作区域:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">居住区域:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">意向房型:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">客户考虑因素:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
      <p class="subtitle">客户其他:</p>
      <ElInput
        type="textarea"
        show-word-limit
        maxlength="500"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.reason"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class PopularizeInfo extends Vue {
  searchOpen = true;

  resPageInfo: any = {
    bankList: [],
    contactList: [],
    attachmentList: [],
    provinceOption: [],
    recallReason: null,
    checkOpinion: null,
  };
}
</script>
<style lang="scss">
.subtitle {
  text-align: left;
  margin-left: 10px;
  font-size: 15px;
}
</style>