<!--
 * @Description: 退房不退款：终止协议
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-04 19:17:24
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-26 10:05:53
-->
<template>
  <section>
    <el-form
      ref="form"
      :model="form"
      label-width="130px"
    >
      <p class="ih-info-title">
        <span>终止协议</span>
        <!-- <el-switch
          class="title-switch"
          v-model="isShow.isTermination"
          @change="handleSwitch(0)"
        ></el-switch> -->
      </p>
      <template v-if="isShow.isTermination">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="终止协议类型"
              :prop="`formList.${0}.templateType`"
              :rules="{
                required: true, message: '请选择终止协议类型', trigger: 'change'
              }"
            >
              <el-select
                v-model="form.formList[0].templateType"
                placeholder="终止协议类型"
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
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="终止原因"
              :prop="`formList.${0}.reason`"
              :rules="{
                required: true, message: '请选择终止原因', trigger: 'change'
              }"
            >
              <el-select
                v-model="form.formList[0].reason"
                placeholder="终止原因"
                class="width--100"
                @change="(data) => {
                  data !== 'other'
                    ? form.formList[0].reasonDescription = $root.dictAllName(data, 'Reason')
                    : form.formList[0].reasonDescription = ''
                }"
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('Reason')"
                  :key="n"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            v-if="form.formList[0].reason === 'other'"
          >
            <el-form-item
              label-width="50px"
              :prop="`formList.${0}.reasonDescription`"
              :rules="{
                required: true, message: '请输入其他原因', trigger: 'change'
              }"
            >
              <el-input v-model="form.formList[0].reasonDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.formList[0].templateType === 'PaperTemplate'">
          <el-col :span="24">
            <el-form-item label="纸质版附件">
              <!-- :file-list="form.formList[0].noticeAttachmentList" -->
              <IhUpload
                v-model="noticeAttachmentList"
                @newFileList="handleNoticeFile($event, 0)"
                uploadAccept="image"
                accept="image/*"
                class="upload"
                size="100px"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
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

@Component({
  components: {},
})
export default class SceneTwo extends Vue {
  @Prop() data!: any;

  private dialogOwnerVisible = false;
  private dialogComVisible = false;
  private selection: any[] = [];
  private isShow: any = {
    isTermination: true,
    isNotice: true,
    isRefund: true,
  };
  private form: any = {
    formList: [
      {
        notificationType: "TerminationAgreement",
        templateType: null,
        reason: null,
        reasonDescription: null,
        noticeAttachmentList: [],
      },
    ],
  };
  private proId: any = null;
  private methodList: any[] = [];
  private noticeAttachmentList: any[] = []; //
  private noticeFile: any[] = []; //

  private handleNoticeFile(list: any, index: number) {
    this.form.formList[index].noticeAttachmentList = list.map((i: any) => ({
      attachmentSuffix: i.fileName,
      fileNo: i.fileId,
      type: "NoticeAttachment",
    }));
  }
  private handleSwitch(index: number) {
    const list = [
      {
        notificationType: "TerminationAgreement",
        templateType: null,
        reason: null,
        reasonDescription: null,
        noticeAttachmentList: [],
      },
      {
        notificationType: "Notification",
        roomNumberId: null,
        cycleId: null,
        proId: null,
        buyUnit: null,
        templateType: null,
        ownerType: null,
        promotionMethod: null,
        explain: null,
        paymentAmount: null,
        methObj: null,
        ownerList: [],
        noticeAttachmentList: [],
      },
    ];
    this.$set(this.form.formList, index, list[index]);
  }
  private finish() {
    console.log(123);

    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      if (
        this.form.formList[0].templateType === "PaperTemplate" &&
        !this.form.formList[0].noticeAttachmentList.length
      ) {
        this.$message.warning("终止协议附件不能为空");
        return;
      }
      this.$emit("finish", this.form.formList);
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  created() {
    if (this.data.ownerType === "Enterprise") {
      this.form.formList[0].templateType = "PaperTemplate";
    }
  }
}
</script>

<style lang="scss" scoped>
.ih-info-title {
  position: relative;
  .title-switch {
    position: absolute;
    top: 2px;
    left: 100px;
    transform: translate(0, -30%);
  }
}
.annotation {
  position: absolute;
  right: 0;
  color: #d9001b;
  font-size: 14px;
}
</style>
