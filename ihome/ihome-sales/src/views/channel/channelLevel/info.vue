<template>
  <ih-page>
    <el-row class="ih-info-line">
      <el-col class="text-left">
        <h3>入库编号：{{ resPageInfo.storageNum }}</h3>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="18">
        <el-row>
          <el-col class="ih-info-item-right item-padding-left-0">录入人：{{resPageInfo.inputUserName }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-row>
          <el-col class="text-right">当前状态</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="18">
        <el-row>
          <el-col class="ih-info-item-right item-padding-left-0">录入时间：{{resPageInfo.createTime }}</el-col>
        </el-row>
      </el-col>
      <el-col
        :span="6"
        class="text-right"
        style="font-weight: 700; font-size: 20px">
        <el-row>
          <el-col class="text-right">
            <div class="ih-status-dot flex-content" v-if="resPageInfo.status">
              <span class="dot" :class="getStatusDot(resPageInfo.status)"></span>
              <span>{{ $root.dictAllName(resPageInfo.status, "ChannelGradeStatus") }}</span>
            </div>
            <div v-else>-</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div style="margin-bottom: 50px">
      <el-tabs v-model="tabActive">
        <el-tab-pane label="信息详情" name="1">
          <DetailsInfo :resPageInfo="resPageInfo" :typeStr="typeStr" />
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="2">
          <ChannelLog />
        </el-tab-pane>
      </el-tabs>
    </div>
<!--    <template v-slot:info>
      <el-scrollbar>
        <el-tabs type="border-card" v-model="tabActive">
          <el-tab-pane label="信息详情" name="1">
            <DetailsInfo :typeStr="typeStr" />
          </el-tab-pane>
          <el-tab-pane label="操作日志" name="2">
            <ChannelLog />
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </template>-->
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_channelGrade_get__id
} from "../../../api/channel/index";

import ChannelLog from "./info-tabs/operationLog.vue";
import DetailsInfo from "./info-tabs/detailsInfo.vue";

Component.registerHooks(["beforeRouteEnter"]);
@Component({
  components: { DetailsInfo, ChannelLog },
})
export default class ChannelInfo extends Vue {
  tabActive: any = "1";
  resPageInfo: any = {
    channelId: null,
    channelGrade: null,
    channelType: null,
    province: null,
    city: null,
    cityGrade: null,
    special: null,
    storageNum: null,
    status: null,
    channelGradeItems: [],
    channelGradeAttachments: [],
  };
  typeStr = "";

  private beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.typeStr = to.name;
    });
  }

  async created() {
    await this.getInfo();
  }

  async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      this.resPageInfo = await get_channelGrade_get__id({ id: id });
    }
  }

  // 获取颜色
  getStatusDot(status: any = '') {
    if (status === 'DRAFT') {
      return 'warning';
    } else if (status === 'Approved') {
      return 'success';
    } else {
      return 'primary';
    }
  }
}
</script>
<style lang="scss" scoped>
.ih-page {
  overflow: hidden;
}
/deep/ .ih-info-line {
  padding: 0 10px 10px 10px;
}
/deep/ .el-card__header {
  background: #f9f9f9;
}
.item-padding-left-0 {
  padding-left: 0px;
}
.flex-content {
  justify-content: flex-end;
}
</style>
