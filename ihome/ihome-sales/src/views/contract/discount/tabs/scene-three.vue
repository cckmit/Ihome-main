<!--
 * @Description: 场景三 --服务费全部减免, 退房
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-03 20:42:48
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-04 16:39:27
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
        <el-switch
          class="title-switch"
          v-model="isShow.isTermination"
          @change="handleSwitch(0)"
        ></el-switch>
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
              <IhUpload
                :file-list.sync="noticeAttachmentList"
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
      <p class="ih-info-title">
        <span>退款申请书</span>
        <el-switch
          class="title-switch"
          v-model="isShow.isRefund"
          @change="handleSwitch(1)"
        ></el-switch>
      </p>
      <template v-if="isShow.isRefund">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="退款申请书类型"
              :prop="`formList.${1}.templateType`"
              :rules="{
                required: true, message: '请选择退款申请书类型', trigger: 'change'
              }"
            >
              <el-select
                v-model="form.formList[1].templateType"
                placeholder="退款申请书类型"
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
              label="退款金额"
              :prop="`formList.${1}.refundableAmount`"
              :rules="{
                required: true, message: '请输入退款金额', trigger: 'change'
              }"
            >
              <el-input
                v-model="form.formList[1].refundableAmount"
                placeholder="退款金额"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="form.formList[1].templateType === 'PaperTemplate'">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="开户银行"
                :prop="`formList.${1}.branchName`"
                :rules="{
                  required: true, message: '请选择开户银行', trigger: 'change'
                }"
              >
                <el-input
                  v-model="form.formList[1].branchName"
                  readonly
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click.native="dialogFormVisible = true"
                  ></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="开户人"
                :prop="`formList.${1}.accountHolderName`"
                :rules="{
                  required: true, message: '请输入开户人', trigger: 'change'
                }"
              >
                <el-input
                  v-model="form.formList[1].accountHolderName"
                  placeholder="请输入开户人"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="银行账号"
                :prop="`formList.${1}.account`"
                :rules="{
                  required: true, message: '请输入银行账号', trigger: 'change'
                }"
              >
                <el-input
                  v-model="form.formList[1].account"
                  placeholder="请输入银行账号"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="纸质版附件">
                <IhUpload
                  :file-list.sync="refundFile"
                  @newFileList="handleNoticeFile($event, 1)"
                  uploadAccept="image"
                  accept="image/*"
                  class="upload"
                  size="100px"
                ></IhUpload>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </template>
    </el-form>
    <div class="text-center">
      <el-button
        type="primary"
        @click="finish"
      >提交</el-button>
    </div>
    <IhDialog
      :show="dialogFormVisible"
      desc="银行网点档案库"
    >
      <BankRecord
        @cancel="() => (dialogFormVisible = false)"
        @finish="(data) => {
          form.formList[1].bankName = data.bankName;
          form.formList[1].cityName = data.cityName;
          form.formList[1].provinceName = data.provinceName;
          form.formList[1].branchName = data.branchName;
          dialogFormVisible = false;
        }"
      />
    </IhDialog>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import BankRecord from "@/components/bankRecord.vue";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";

@Component({
  components: { BankRecord },
})
export default class SceneThree extends Vue {
  @Prop() data!: any;

  private dialogFormVisible = false;
  private isShow: any = {
    isTermination: true,
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
      {
        notificationType: "RefundApplication",
        templateType: null,
        refundableAmount: null,
        account: null,
        accountHolderName: null,
        bankName: null,
        branchName: null,
        cityName: null,
        provinceName: null,
        noticeAttachmentList: [],
      },
    ],
  };
  private noticeAttachmentList: any[] = [];
  private refundFile: any[] = [];

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
        notificationType: "RefundApplication",
        templateType: null,
        refundableAmount: null,
        account: null,
        accountHolderName: null,
        bankName: null,
        branchName: null,
        cityName: null,
        provinceName: null,
        noticeAttachmentList: [],
      },
    ];
    this.$set(this.form.formList, index, list[index]);
  }
  private handleNoticeFile(list: any, index: number) {
    this.form.formList[index].noticeAttachmentList = list.map((i: any) => ({
      attachmentSuffix: i.name,
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
        this.form.formList[0].templateType === "PaperTemplate" &&
        !this.form.formList[0].noticeAttachmentList.length
      ) {
        this.$message.warning("终止协议附件不能为空");
        return;
      }
      if (
        this.form.formList[1].templateType === "PaperTemplate" &&
        !this.form.formList[1].noticeAttachmentList.length
      ) {
        this.$message.warning("退款申请书附件不能为空");
        return;
      }
      this.$emit("finish", this.form.formList);
    } else {
      console.log("error submit!!");
      return false;
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
