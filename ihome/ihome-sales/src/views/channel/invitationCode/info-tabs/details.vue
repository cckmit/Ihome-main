<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:31:23
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-22 17:21:04
--> 
<template>
  <div>
    <p class="ih-info-title">邀请码信息</p>
    <el-row class="ih-info-line text-left">
      <el-image
        v-if="url"
        style="width: 300px; height: 300px"
        :src="url"
        fit="fill"
      ></el-image>
    </el-row>

    <el-row class="ih-info-line text-left">
      <el-link
        style="color: #409eff"
        class="margin-right-10"
        type="primary"
        @click.native.prevent="download()"
        >下载</el-link
      >
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_channelInvitationCode_get__id } from "../../../../api/channel/index";

@Component({
  components: {},
})
export default class InvitationCodeDetails extends Vue {
  info: any = {};
  url: any = null;
  async created() {
    let id = this.$route.query.id;

    const res: any = await get_channelInvitationCode_get__id({ id: id });
    this.url = this.$tool.downloadLongFileUrl(res.fileId);
  }
  download() {
    window.open(this.url);
  }
  // goto() {
  //   this.$goto({
  //     path: "/invitationCode/list",
  //   });
  // }
}
</script>
<style lang="scss" scoped>
.el-row {
  line-height: 30px;
}
</style>
