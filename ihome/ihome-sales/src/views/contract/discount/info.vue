<!--
 * @Description: 优惠告知书详情页
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 17:27:00
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-04 14:31:11
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">基础信息</p>
      <el-form
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="优惠告知书编号">
              {{resInfo.noticeNo}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板类型">
              {{$root.dictAllName(resInfo.templateType, 'NoticeEnum.TemplateType')}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="甲方">
              {{resInfo.partyAName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方">
              <span
                v-for="(i, n) in resInfo.ownerList"
                :key="n"
              >{{i.ownerName}} <span v-if="n !== (resInfo.ownerList.length-1)">、</span>
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系电话">
              <span
                v-for="(i, n) in resInfo.ownerList"
                :key="n"
              >{{i.ownerMobile}} <span v-if="n !== (resInfo.ownerList.length-1)">、</span>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方证件号码">
              <span
                v-for="(i, n) in resInfo.ownerList"
                :key="n"
              >{{i.ownerCertificateNo}} <span v-if="n !== (resInfo.ownerList.length-1)">、</span>
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠项目名称">
              {{resInfo.projectName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="(拟)购买单位">
              {{`${resInfo.buyUnit}栋-${resInfo.roomNumberId}`}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <p class="ih-info-title">优惠信息</p>
      <el-form
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="优惠服务费缴纳金额">
              {{ resInfo.paymentAmount }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠方式说明">
              {{resInfo.explain}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="优惠期限">
              {{resInfo.beginTime}} ~ {{resInfo.endTime}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <p class="ih-info-title">其他</p>
      <el-form
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方退款天数">
              {{resInfo.refundDays}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人">
              {{resInfo.agentName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="告知书电子版">
              <el-button
                type="success"
                @click="preview()"
              >预览电子版</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="告知书扫描件">
              <IhUpload
                v-if="fileList.length"
                :file-list="fileList"
                size="100px"
                :limit="1"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  get_notice_detail__id,
  post_notice_preview__noticeId,
} from "@/api/contract/index";

@Component({})
export default class DiscountDetail extends Vue {
  private fileList: Array<object> = [];
  private resInfo: any = {};

  private async getInfo(): Promise<void> {
    let id = this.$route.query.id;
    if (id) {
      this.resInfo = await get_notice_detail__id({ id: id });
      this.fileList = this.resInfo.noticeAttachmentList
        .filter((i: any) => {
          return i.type === "NoticeAttachment";
        })
        .map((item: any) => ({
          name: item.attachmentSuffix,
          fileId: item.fileNo,
        }));
    }
  }

  private async preview(): Promise<void> {
    let id = this.$route.query.id;
    try {
      let res = await post_notice_preview__noticeId({ noticeId: id });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  created() {
    this.getInfo();
  }
}
</script>
