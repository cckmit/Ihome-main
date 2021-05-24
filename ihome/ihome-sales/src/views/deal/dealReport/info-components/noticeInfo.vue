<!--
 * @Description: 优惠告知书信息
 * @version: 
 * @Author: lsj
 * @Date: 2021-05-18 11:20:11
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-18 14:36:22
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>优惠告知书信息</span>
      </div>
      <div class="file-list">
        <div
          class="file-item-border"
          v-for="(item, index) in infoForm.offerNoticeList"
          :key="index">
          <div class="file-item">
            <div class="floating-layer">
              <div class="file-pre">
                <a class="file-pre-btn" href="javascript:;" @click="pre(item)">
                  <i class="el-icon-zoom-in"></i>预览</a>
              </div>
            </div>
            <div class="file-item-1">
              <div class="file-item-1-left">
                {{$root.dictAllName(item.notificationType, "NotificationType") }}
              </div>
              <!-- <div class="file-item-1-right">客户待签署</div> -->
              <div class="file-item-1-right">
                <span :class="item.notificationStatus">
                  {{$root.dictAllName(item.notificationStatus, "NotificationStatus")}}
                </span>
              </div>
            </div>
            <div class="file-item-1">编号：{{ item.noticeNo }}</div>
            <div class="file-item-1">
              <div v-if="item.promotionMethod === 'Manual' && item.notificationType === 'Notification'" class="file-item-1-left special">特殊</div>
              <div style="height: 16px"></div>
              <!-- <div class="file-item-1-right">
                <el-link type="primary">预览</el-link>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <br />
    <IhImgViews
      v-if="isShowImg"
      :url-list="srcList"
      :viewer-msg="srcData"
      :onClose="() => (isShowImg = false)"
    ></IhImgViews>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class NoticeInfo extends Vue {
    @Prop() infoForm?: any;
    private isShowImg = false;
    private srcList: any = [];
    private srcData: any = [];

    async created() {
      console.log('NoticeInfo');
    }

    // 预览
    pre(item: any) {
      console.log("pre");
      if (item.templateType === "ElectronicTemplate") {
        window.open(
          `/sales-api/sales-document-cover/file/browse/${item.templateId}`
        );
      } else {
        let imgList = item.noticeAttachmentList;
        this.srcList = imgList.map(
          (i: any) => `/sales-api/sales-document-cover/file/browse/${i.fileNo}`
        );
        this.srcData = imgList.map((v: any) => ({
          fileName: v.attachmentSuffix,
          preFileName: "优惠告知书",
        }));
        if (this.srcList.length) {
          this.isShowImg = true;
        } else {
          this.$message.warning("暂无图片");
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
