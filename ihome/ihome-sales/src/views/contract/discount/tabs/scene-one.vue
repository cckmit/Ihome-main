<!--
 * @Description: 换房不涉及优惠折扣变更：补充协议
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-03 10:04:07
 * @LastEditors: ywl
 * @LastEditTime: 2021-05-17 17:15:14
-->
<template>
  <section>
    <p class="ih-info-title">补充协议</p>
    <el-form
      ref="form"
      label-width="120px"
      :model="form"
      :rules="rules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="补充协议类型"
            prop="templateType"
          >
            <el-select
              v-model="form.templateType"
              placeholder="补充协议类型"
              :disabled="data.ownerType === 'Enterprise'"
              class="width--100"
            >
              <el-option
                v-for="(i, n) in $root.dictAllList('TemplateType')"
                :key="n"
                :value="i.code"
                :label="i.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="栋座"
            prop="buyUnit"
          >
            <IhSelectPageByBuild
              v-model="form.buyUnit"
              :proId="data.projectId"
              placeholder="请选择栋座"
              clearable
              @change="() => {
                form.roomNumberId = null;
              }"
            ></IhSelectPageByBuild>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="房号"
            prop="roomNumberId"
          >
            <IhSelectPageByRoom
              v-model="form.roomNumberId"
              :proId="data.projectId"
              :buildingId="form.buyUnit"
              placeholder="请选择房号"
              clearable
            ></IhSelectPageByRoom>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.templateType === 'PaperTemplate'">
        <el-col :span="12">
          <el-form-item label="纸质版附件">
            <IhUpload
              v-model="niticeFile"
              @newFileList="handleNoticeFile($event)"
              uploadAccept="image"
              accept="image/*"
              class="upload"
              size="100px"
            ></IhUpload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="text-center">
      <el-button
        type="primary"
        @click="finish"
      >提交</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";

@Component({})
export default class SceneOne extends Vue {
  @Prop({}) data!: any;

  private rules: any = {
    templateType: [
      { required: true, message: "请选择协议类型", trigger: "change" },
    ],
    buyUnit: [{ required: true, message: "请选择栋座", trigger: "change" }],
    roomNumberId: [
      { required: true, message: "请选择房号", trigger: "change" },
    ],
  };
  private form: any = {
    notificationType: "SupplementaryAgreement",
    templateType: null,
    buyUnit: null,
    roomNumberId: null,
    noticeAttachmentList: [],
  };
  private niticeFile: any[] = [];

  private handleNoticeFile(list: any) {
    this.form.noticeAttachmentList = list.map((i: any) => ({
      attachmentSuffix: i.fileName,
      fileNo: i.fileId,
      type: "NoticeAttachment",
    }));
  }
  private finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      if (
        this.form.templateType === "PaperTemplate" &&
        !this.form.noticeAttachmentList.length
      ) {
        this.$message.warning("附件不能为空");
        return;
      }
      this.$emit("finish", [this.form]);
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  created() {
    if (this.data.ownerType === "Enterprise") {
      this.form.templateType = "PaperTemplate";
    }
  }
}
</script>
