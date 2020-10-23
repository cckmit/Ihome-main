<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-23 10:01:56
-->
<template>
  <div>
    <p class="ih-info-title">楼盘卖点</p>
    <ih-upload :file-list="fileList" accept="image/*" class="margin-left-20">
      <template #info>
        <div>高层单位87m²<br />3室 2厅 1厨 2卫 87.0㎡</div>
        <el-button size="small" @click="edit($event)">编辑</el-button>
        <el-button size="small">删除</el-button>
      </template>
    </ih-upload>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import UserAdd from "./add.vue";
import { get_companyLog_getAll__companyId } from "../../../api/developer/index";

@Component({
  components: {},
})
export default class HouseType extends Vue {
  searchOpen = true;
  resPageInfo: any = {
    bankList: [],
    contactList: [],
    attachmentList: [],
    provinceOption: [],
    recallReason: null,
    checkOpinion: null,
  };
  fileList: any = [
    {
      name: "abc.pdf",
      fileId: 344,
      preFileName: "xxxx",
    },
    {
      name: "abc.pdf",
      fileId: 344,
      preFileName: "xxxx",
    },
  ];
  companyLogInfo: any = [];

  private get developerId() {
    return this.$route.query.id;
  }

  openToggle() {
    this.searchOpen = !this.searchOpen;
  }

  async created() {
    if (this.developerId) this.getInfo();
  }
  async getInfo() {
    this.companyLogInfo = await get_companyLog_getAll__companyId({
      companyId: this.developerId,
    });
  }

  edit(e: any) {
    console.log(e);
  }
}
</script>
<style lang="scss">
.msg-title {
  text-align: left;
  margin-left: 25px;
}

.text-ellipsis {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>