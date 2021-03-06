<!--
 * @Description: 服务费增加、服务费金额不变优惠方式变更、购房客户更名、告知书信息填写错误：终止协议、新优惠告知书
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-04 10:59:21
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-06 16:28:29
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
        <span>优惠告知书</span>
        <!--<span class="annotation padding-left-20">*注：允许生成新告知书的条件：原告知书是无效状态，否则必须同时生成原告知书的终止协议</span>
         <el-switch
          class="title-switch"
          v-model="isShow.isNotice"
          @change="handleSwitch(1)"
        ></el-switch> -->
      </p>
      <template v-if="isShow.isNotice">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="联动周期"
              :prop="`formList.${1}.cycleId`"
              :rules="{
                required: true, message: '请选择立项周期', trigger: 'change'
              }"
            >
              <IhSelectPageByCycle
                v-model="form.formList[1].cycleId"
                :searchName="cycleName"
                placeholder="请选择立项周期"
                @changeOption="(data) => {
                  form.formList[1].proId = data.proId
                  getMethodByTermId(data.termId)
                }"
              ></IhSelectPageByCycle>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="栋座"
              :prop="`formList.${1}.buyUnit`"
              :rules="{
                required: true, message: '请选择栋座', trigger: 'change'
              }"
            >
              <IhSelectPageByBuild
                v-model="form.formList[1].buyUnit"
                :proId="form.formList[1].proId"
                placeholder="请选择栋座"
              ></IhSelectPageByBuild>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="房号"
              :prop="`formList.${1}.roomNumberId`"
              :rules="{
                required: true, message: '请选择栋座', trigger: 'change'
              }"
            >
              <IhSelectPageByRoom
                v-model="form.formList[1].roomNumberId"
                :proId="form.formList[1].proId"
                :buildingId="form.formList[1].buyUnit"
                placeholder="请选择房号"
                clearable
              ></IhSelectPageByRoom>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="业主类型"
              :prop="`formList.${1}.ownerType`"
              :rules="{
                required: true, message: '请选择业主类型', trigger: 'change'
              }"
            >
              <el-select
                v-model="form.formList[1].ownerType"
                placeholder="业主类型"
                class="width--100"
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('OwnerType')"
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
              label="优惠告知书类型"
              :prop="`formList.${1}.templateType`"
              :rules="{
                required: true, message: '请选择优惠告知书类型', trigger: 'change'
              }"
            >
              <el-select
                v-model="form.formList[1].templateType"
                placeholder="优惠告知书类型"
                :disabled="form.formList[1].ownerType === 'Enterprise'"
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
              label="优惠方式"
              :prop="`formList.${1}.methObj`"
              :rules="{
                required: true, message: '请选择优惠方式', trigger: 'change'
              }"
            >
              <el-select
                v-model="form.formList[1].methObj"
                placeholder="优惠方式"
                class="width--100"
                value-key="index"
                @change="methodChange"
              >
                <el-option
                  v-for="(i, n) in methodList"
                  :key="n"
                  :value="i"
                  :label="i.modeDescription"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="优惠方式说明"
              :prop="`formList.${1}.explain`"
              :rules="{
                required: true, message: '请输入优惠方式说明', trigger: 'change'
              }"
            >
              <el-input
                v-model="form.formList[1].explain"
                :disabled="form.formList[1].promotionMethod !== 'Manual'"
                placeholder="优惠方式说明"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="优惠金额"
              :prop="`formList.${1}.paymentAmount`"
              :rules="{
                required: true, message: '请输入优惠金额', trigger: 'change'
              }"
            >
              <el-input
                v-model="form.formList[1].paymentAmount"
                :disabled="form.formList[1].promotionMethod !== 'Manual'"
                placeholder="优惠金额"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="text-right">
          <el-button
            type="primary"
            size="mini"
            @click="handleAdd(form.formList[1].ownerType)"
          >添加客户</el-button>
        </div>
        <div class="padding-left-20">
          <br />
          <el-table :data="form.formList[1].ownerList">
            <el-table-column
              label="客户编号"
              prop="code"
            ></el-table-column>
            <el-table-column
              label="客户类型"
              prop="type"
            ></el-table-column>
            <el-table-column
              label="客户名称"
              prop="ownerName"
            ></el-table-column>
            <el-table-column
              label="手机号"
              prop="ownerMobile"
            ></el-table-column>
            <el-table-column
              label="证件编号"
              prop="ownerCertificateNo"
            ></el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="80"
            >
              <template v-slot="{ $index }">
                <el-link
                  type="danger"
                  @click="handleRemove($index)"
                >删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <br />
        </div>
        <el-row v-if="form.formList[1].templateType === 'PaperTemplate'">
          <el-col :span="24">
            <el-form-item label="纸质版附件">
              <IhUpload
                :file-list.sync="noticeFile"
                @newFileList="handleNoticeFile($event, 1)"
                uploadAccept="image"
                accept="image/*"
                class="upload"
                size="100px"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isOther">
          <el-col :span="24">
            <el-form-item label="认购书附件">
              <IhUpload
                :file-list.sync="subFile"
                @newFileList="handleSubFile($event, 1)"
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
    <!-- 弹窗 -->
    <IhDialog :show="dialogOwnerVisible">
      <SelectOwner
        :hasCheckedData="selection"
        @cancel="() => (dialogOwnerVisible = false)"
        @finish="handleFinish"
      />
    </IhDialog>
    <IhDialog :show="dialogComVisible">
      <SelectCompany
        :hasCheckedData="selection"
        @cancel="() => (dialogComVisible = false)"
        @finish="handleFinish"
      />
    </IhDialog>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import SelectOwner from "../dialog/selectOwner.vue";
import SelectCompany from "../dialog/selectCompany.vue";
import { get_preferential_getListByTermId__termId } from "@/api/project/index";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";

@Component({
  components: { SelectOwner, SelectCompany },
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
        exPreferentialItem: 1,
        ownerList: [],
        noticeAttachmentList: [],
      },
    ],
  };
  private proId: any = null;
  private methodList: any[] = [];
  private noticeAttachmentList: any[] = []; //
  private noticeFile: any[] = []; //
  private subFile: any[] = [];
  private isOther = false;
  private beforeValue: any = null;
  private action = 0;
  private cycleName = "";

  @Watch("form.formList.1.ownerType")
  watchOwner(val: any) {
    if (this.beforeValue) {
      if (val !== this.beforeValue) {
        this.$confirm("切换用户类型会清空客户数据", "提示")
          .then(() => {
            this.beforeValue = val;
            this.form.formList[1].ownerList = [];
            val === "Enterprise"
              ? (this.form.formList[1].templateType = "PaperTemplate")
              : (this.form.formList[1].templateType = null);
          })
          .catch(() => {
            this.form.formList[1].ownerType = this.beforeValue;
          });
      }
    }
  }

  private handleNoticeFile(list: any, index: number) {
    this.form.formList[index].noticeAttachmentList = list.map((i: any) => ({
      attachmentSuffix: i.name,
      fileNo: i.fileId,
      type: "NoticeAttachment",
    }));
  }
  private handleSubFile(list: any, index: number) {
    this.form.formList[index].noticeAttachmentList = list.map((i: any) => ({
      attachmentSuffix: i.name,
      fileNo: i.fileId,
      type: "Subscription",
    }));
  }
  private methodChange(val: any) {
    console.log(val);
    if (val.index !== "other") {
      this.form.formList[1].promotionMethod = val.promotionMethod;
      this.form.formList[1].explain = val.modeDescription;
      this.form.formList[1].paymentAmount = val.premiumReceived;
      this.form.formList[1].exPreferentialItem = val.exPreferentialItem;
      this.isOther = false;
    } else {
      this.form.formList[1].promotionMethod = val.promotionMethod;
      this.form.formList[1].exPreferentialItem = val.exPreferentialItem;
      this.isOther = true;
    }
  }
  private async getMethodByTermId(termId: any) {
    try {
      let list = await get_preferential_getListByTermId__termId({
        termId,
      });
      this.methodList = list
        .map((i: any, n: number) => ({
          modeDescription: i.modeDescription,
          premiumReceived: i.premiumReceived,
          promotionMethod: "Automatic",
          index: n.toString(),
          exPreferentialItem: i.exPreferentialItem,
        }))
        .concat([
          {
            modeDescription: "自定义",
            premiumReceived: "other",
            promotionMethod: "Manual",
            index: "other",
            exPreferentialItem: 1,
          },
        ]);
      console.log(this.methodList);
    } catch (error) {
      console.log(error);
    }
  }
  private handleAdd(type: any) {
    if (type) {
      type === "Personal"
        ? (this.dialogOwnerVisible = true)
        : (this.dialogComVisible = true);
    } else {
      this.$message.warning("请先选择业主类型");
    }
  }
  private handleFinish(val: any) {
    this.selection = val;
    this.form.formList[1].ownerList = val.map((i: any) => ({
      ownerCertificateNo: i.certificateNumber,
      ownerMobile: i.custTel,
      ownerName: i.custName,
      type: (this.$root as any).dictAllName(i.custType, "CustType"),
      code: i.custCode,
    }));
    this.dialogOwnerVisible = false;
    this.dialogComVisible = false;
  }
  private handleRemove(index: number) {
    this.selection.splice(index, 1);
    this.form.formList[1].ownerList.splice(index, 1);
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
        this.$message.warning("优惠告知书附件不能为空");
        return;
      }
      this.$emit("finish", this.form.formList);
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  created() {
    this.cycleName = this.data.cycleName;
    this.form.formList[1].cycleId = this.data.cycleId;
    this.form.formList[1].buyUnit = this.data.buyUnit;
    this.form.formList[1].roomNumberId = this.data.roomNumberId;
    this.form.formList[1].ownerType = this.data.ownerType;
    this.form.formList[1].proId = this.data.projectId;
    this.beforeValue = this.data.ownerType;
    this.getMethodByTermId(this.data.cycleId);
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