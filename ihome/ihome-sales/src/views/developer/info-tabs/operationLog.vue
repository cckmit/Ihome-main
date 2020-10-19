<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-19 11:07:29
-->
<template>
  <div>
    <el-table class="ih-table" :data="companyLogInfo" style="width: 100%">
      <el-table-column prop="operation" label="操作"></el-table-column>
      <el-table-column prop="operator" label="处理人"></el-table-column>
      <el-table-column prop="operateTime" label="处理时间"></el-table-column>
      <el-table-column prop="operateResult" label="处理结果"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import UserAdd from "./add.vue";
import { get_companyLog_getAll__companyId } from "../../../api/developer/index";

@Component({
  components: {},
})
export default class Edit extends Vue {
  searchOpen = true;

  resPageInfo: any = {
    bankList: [],
    contactList: [],
    attachmentList: [],
    provinceOption: [],
    recallReason: null,
    checkOpinion: null,
  };
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