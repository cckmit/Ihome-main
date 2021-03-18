<!--
 * @Description: 优惠告知书审核
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-18 10:15:13
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-18 11:03:27
-->
<template>
  <IhPage class="text-left discount-info">
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
            <el-form-item label="类型">
              {{$root.dictAllName(resInfo.notificationType, 'NotificationType')}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方">
              {{resInfo.partyAName}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板类型">
              {{$root.dictAllName(resInfo.templateType, 'TemplateType')}}
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
        <el-row v-if="resInfo.notificationType === 'SupplementaryAgreement'">
          <el-col :span="12">
            <el-form-item label="原购买单位">
              {{`${resInfo.oldBuyUnitName}-${resInfo.oldRoomNumberName}`}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="现购买单位">
              {{`${resInfo.buyUnitName}-${resInfo.roomNumberName}`}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="24">
            <el-form-item label="(拟)购买单位">
              <span v-if="isRecognize">
                <span v-if="resInfo.buyUnitName && resInfo.roomNumberName">{{`${$root.dictAllName(resInfo.propertyType, 'Property')}-${resInfo.buyUnitName}-${resInfo.roomNumberName}`}}</span>
                <span v-else>以最终甲方推送的房号确认书为准</span>
              </span>
              <span v-else>{{`${$root.dictAllName(resInfo.propertyType, 'Property')}-${resInfo.buyUnitName}-${resInfo.roomNumberName}`}}</span>
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
          <el-col :span="12">
            <el-form-item label="优惠期限">
              {{resInfo.beginTime}} ~ {{resInfo.endTime}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属周期">
              {{resInfo.cycleName}}
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
        <el-row v-if="!isPaper">
          <el-col :span="24">
            <el-form-item label="电子版">
              <el-button
                type="success"
                @click="preview()"
              >预览电子版</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="24">
            <el-form-item label="附件">
              <IhUpload
                :file-list="fileList"
                uploadAccept="image"
                accept="image/*"
                class="upload"
                size="100px"
                :limit="fileList.length"
                :upload-show="!!fileList.length"
                :removePermi="false"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isOther">
          <el-col :span="24">
            <el-form-item label="认购书附件">
              <IhUpload
                :file-list="subscripList"
                uploadAccept="image"
                accept="image/*"
                class="upload"
                size="100px"
                :limit="subscripList.length"
                :upload-show="!!subscripList.length"
                :removePermi="false"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见">
              <el-input
                v-model="reviewOpinion"
                type="textarea"
                :rows="4"
                maxlength="40"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center">
        <el-button
          type="primary"
          @click="submit('Yes')"
        >通过</el-button>
        <el-button
          type="danger"
          @click="submit('No')"
        >驳回</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_term_getRecognizeById__termId } from "../../../api/project/index";
import {
  get_notice_detail__id,
  post_notice_industry_management_determine,
} from "@/api/contract/index";

@Component({})
export default class DiscountAudit extends Vue {
  private fileList: Array<object> = [];
  private subscripList: any = [];
  private addSub: any = [];
  private resInfo: any = {};
  private addFile: any = [];
  private isRecognize = false;
  private reviewOpinion: any = null;

  private get isPaper(): boolean {
    return this.resInfo.templateType === "PaperTemplate";
  }
  private get isOther(): boolean {
    return this.resInfo.promotionMethod === "Manual";
  }

  private async submit(status: any) {
    if (!this.reviewOpinion) {
      this.$message.warning("审核意见不能为空");
      return;
    }
    try {
      await post_notice_industry_management_determine({
        id: this.resInfo.id,
        reviewOpinion: this.reviewOpinion,
        status,
      });
      this.$message.success(`${status === "Yes" ? "审核通过" : "操作成功"}`);
      this.$goto({
        path: "/discount/list",
      });
    } catch (error) {
      console.log(error);
    }
  }
  private async getInfo(): Promise<void> {
    let id = this.$route.query.id;
    if (id) {
      try {
        this.resInfo = await get_notice_detail__id({ id: id });
        this.isRecognize = await get_term_getRecognizeById__termId({
          termId: this.resInfo.cycleId,
        });
      } catch (error) {
        console.log(error);
      }
      this.fileList = this.resInfo.noticeAttachmentList
        .filter((i: any) => {
          return i.type === "NoticeAttachment";
        })
        .map((item: any) => ({
          name: item.attachmentSuffix,
          fileId: item.fileNo,
          exAuto: 1,
        }));
      this.subscripList = this.resInfo.subscriptionAnnex.map((i: any) => ({
        name: i.attachmentSuffix,
        fileId: i.fileNo,
        exAuto: 1,
      }));
      console.log(this.subscripList);
    }
  }
  private async preview(): Promise<void> {
    try {
      window.open(
        `/sales-api/sales-document-cover/file/browse/${this.resInfo.templateId}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  created() {
    this.getInfo();
  }
}
</script>
