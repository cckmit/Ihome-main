<!--
 * @Description: 优惠告知书详情页
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 17:27:00
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-30 16:58:57
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
              {{isRecognize ? '以最终甲方推送的房号确认书为准' : `${resInfo.buyUnitName}-${resInfo.roomNumberName}`}}
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
                @newFileList="handleFile"
                uploadAccept="image"
                accept="image/*"
                class="upload"
                size="100px"
              ></IhUpload>
              <el-button
                type="primary"
                class="upload-button"
                v-has="'B.SALES.CONTRACT.DISCOUNTLIST.ORIGINALFILE'"
                @click="submit()"
              >提交</el-button>
            </el-form-item>
          </el-col>
          <div class="annotation padding-left-20">*注：上传附件后请点击提交按钮保存</div>
        </el-row>
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_term_getRecognizeById__termId } from "../../../api/project/index";
import { get_notice_detail__id, post_notice_annex } from "@/api/contract/index";

@Component({})
export default class DiscountDetail extends Vue {
  private fileList: Array<object> = [];
  private resInfo: any = {};
  private addFile: any = [];
  private isRecognize = false;

  private get isPaper(): boolean {
    return this.resInfo.templateType === "PaperTemplate";
  }

  private handleFile(list: any) {
    this.addFile = list
      .filter((i: any) => {
        return i.response;
      })
      .map((v: any) => ({
        attachmentSuffix: v.name,
        fileNo: v.fileId,
        type: "NoticeAttachment",
        contractId: this.resInfo.id,
      }));
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
    }
  }
  private async submit() {
    if (this.addFile.length) {
      try {
        await post_notice_annex(this.addFile);
        this.$message.success("提交成功");
        this.addFile = [];
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.$message.warning("请先添加附件");
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

<style lang="scss" scoped>
.discount-info {
  // /deep/ .upload {
  //   display: inline-block;
  //   line-height: normal;
  // }
  // .upload-button {
  //   position: absolute;
  //   bottom: 0px;
  //   margin-left: 15px;
  // }
  .annotation {
    color: #d9001b;
    font-size: 14px;
  }
}
</style>
