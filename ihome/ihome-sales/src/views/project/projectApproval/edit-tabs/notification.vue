<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:27:01
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-30 11:18:38
-->
<template>
  <div>
    <div class="notification">
      <p class="ih-info-title">中介分销合同模板</p>
      <div class="notificationButton">
        <el-button
          size="small"
          type="success"
          @click="addTemplate"
          v-has="'B.SALES.PROJECT.TERMLIST.ZJFXHTXZ'"
        >+增加模板</el-button>
      </div>
    </div>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.distributContractVOS"
        style="width: 100%"
      >
        <el-table-column
          prop="contractTitle"
          label="合同主标题"
        ></el-table-column>
        <el-table-column
          label="甲方公司"
          prop="partyCompany"
        >
        </el-table-column>
        <el-table-column
          prop="padCommissionEnum"
          label="是否垫佣"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.padCommissionEnum, "PadCommission")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="channelEnum"
          label="渠道类型"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.channelEnum, "ChannelCustomer")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.state, 'Oper')}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="280"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="viewTemplate(row)"
            >查看</el-button>
            <el-button
              size="small"
              type="success"
              v-has="'B.SALES.PROJECT.TERMLIST.ZJFXHTBJ'"
              @click="editTemplate(row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="success"
              @click="previewTop(row)"
            >预览</el-button>
            <el-button
              size="small"
              type="success"
              v-if="row.state === 'Stop'"
              @click="start(row)"
              v-has="'B.SALES.PROJECT.TERMLIST.ZJFXHTQY'"
            >启用</el-button>
            <el-button
              size="small"
              type="danger"
              v-if="row.state === 'Start'"
              @click="stop(row)"
              v-has="'B.SALES.PROJECT.TERMLIST.ZJFXHTJY'"
            >禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />
    <el-form
      :model="info"
      label-width="140px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户成交以及确认">
            <div class="editParty">
              <el-input
                show-word-limit
                type="textarea"
                disabled
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="请输入客户成交以及确认"
                v-model="info.constractOaVO.customerConfirm"
              >
              </el-input>
              <i
                v-has="'B.SALES.PROJECT.TERMLIST.ZJFXHTKHBJ'"
                class="el-icon-edit-outline tubiao"
                @click="editDialog('customerConfirm')"
              ></i>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="违约责任">
            <div class="editParty">
              <el-input
                show-word-limit
                type="textarea"
                disabled
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="请输入违约责任"
                v-model="info.constractOaVO.responsibiltity"
              >
              </el-input>
              <i
                v-has="'B.SALES.PROJECT.TERMLIST.ZJFXHTWYZR'"
                class="el-icon-edit-outline tubiao"
                @click="editDialog('responsibiltity')"
              ></i>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="合同其他说明">
            <div class="editParty">
              <el-input
                show-word-limit
                type="textarea"
                disabled
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="请输入违约责任"
                v-model="info.constractOaVO.otherRemark"
              >
              </el-input>
              <i
                v-has="'B.SALES.PROJECT.TERMLIST.ZJFXHTQTSM'"
                class="el-icon-edit-outline tubiao"
                @click="editDialog('otherRemark')"
              ></i>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <br />
    <div v-if="info.chargeEnum && (info.chargeEnum === 'Service' || info.chargeEnum === 'ServiAndAgen')">
      <div class="notification">
        <p class="ih-info-title">优惠告知书模板</p>
        <div class="notificationButton">
          <el-button
            size="small"
            type="success"
            @click="addNotification"
            v-has="'B.SALES.PROJECT.TERMLIST.YHGZSXZ'"
          >+增加电子优惠告知书
          </el-button>
        </div>
      </div>
      <div class="hint">(注: 当 立项周期信息里的 启动模式设置为 服务费模式 或 服务费加代理费模式 时，表示 收取服务费。 才会显示 优惠告知书信息 模块内容. )</div>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.preferentialMxVOS"
          :loading="tableLoading"
          style="width: 100%"
        >
          <el-table-column
            prop="premiumReceived"
            label="优惠服务费缴纳金额"
          ></el-table-column>
          <el-table-column
            label="优惠方式说明"
            prop="modeDescription"
          ></el-table-column>
          <el-table-column label="优惠期限">
            <template v-slot="{ row }">
              {{row.startTime && row.endTime ? `${row.startTime}-${row.endTime}` : ''}}
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.state, 'Oper')}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="320"
            fixed="right"
            align="center"
          >
            <template v-slot="{ row }">
              <el-button
                size="small"
                type="success"
                @click="editNotification(row)"
                v-has="'B.SALES.PROJECT.TERMLIST.YHGZSBJ'"
              >编辑</el-button>
              <el-button
                size="small"
                type="success"
                @click="previewBottom(row)"
              >预览</el-button>
              <el-button
                size="small"
                type="success"
                @click="uploadQRcode(row)"
                v-has="'B.SALES.PROJECT.TERMLIST.YHGZSDOWMLOAD'"
              >下载二维码</el-button>
              <el-button
                size="small"
                type="success"
                v-if="row.state === 'Stop'"
                @click="startlation(row)"
                v-has="'B.SALES.PROJECT.TERMLIST.YHGZSQY'"
              >启用</el-button>
              <el-button
                size="small"
                type="danger"
                v-if="row.state === 'Start'"
                @click="stoplation(row)"
                v-has="'B.SALES.PROJECT.TERMLIST.YHGZSJY'"
              >禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="margin-left-20 margin-top-20">
        <el-form label-width="100px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="甲方退款天数"
                prop="partyARefundDays"
              >
                <div class="editParty">
                  <el-input
                    v-model="info.partyARefundDays"
                    disabled
                  ></el-input>
                  <i
                    class="el-icon-edit-outline partyARefundDays"
                    @click="editDialog('partyARefundDays')"
                  ></i>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="file text-left">
        <el-form>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="纸质告知书模板"
                class="file-item"
              >
                <IhUpload
                  :file-list="fileList"
                  size="100px"
                  @newFileList="newFileList"
                ></IhUpload>
                <el-button
                  class="file-button"
                  size="small"
                  type="success"
                  @click="uploadAdd"
                >保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="file-hint">特殊情况无法使用电子优惠告知书模板，请上传纸质版优惠告知书附件</div>
      </div>
    </div>
    <ih-dialog :show="dialogVisible">
      <AddContract
        :data="contractData"
        @cancel="() => (dialogVisible = false)"
        @finish="(data) => contractFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="editDialogVisible">
      <PartyADialog
        :data="editData"
        @cancel="() => (editDialogVisible = false)"
        @finish="(data) => editFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="addDialogVisible">
      <AddNotification
        :data="addNotificationData"
        @cancel="() => (addDialogVisible = false)"
        @finish="(data) => addFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="viewDialogVisible">
      <ViewContract
        :data="viewData"
        @cancel="() => (viewDialogVisible = false)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PartyADialog from "../dialog/partyA-dialog/partyADialog.vue";
import AddNotification from "../dialog/notification-dialog/addNotification.vue";
import AddContract from "../dialog/notification-dialog/addContract.vue";
import ViewContract from "../dialog/notification-dialog/viewContract.vue";
import {
  get_distributContract_get__termId,
  post_distributContract_saveOaRemark,
  post_preferential_uploadTemplate,
  post_distributContract_start__agencyContrictId,
  post_distributContract_cancel__agencyContrictId,
  post_preferential_start__preferentialMxId,
  post_preferential_cancel__preferentialMxId,
  post_preferential_updateRetuenDays,
} from "@/api/project/index.ts";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
@Component({
  components: {
    PartyADialog,
    AddNotification,
    AddContract,
    ViewContract,
  },
})
export default class Notification extends Vue {
  dialogVisible = false;
  editDialogVisible = false;
  addDialogVisible = false;
  viewDialogVisible = false;
  tableLoading: any = false;
  info: any = {
    distributContractVOS: [],
    preferentialMxVOS: [],
    chargeEnum: null,
    city: null,
    partyARefundDays: null,
    termStart: null,
    termEnd: null,
    constractOaVO: {
      customerConfirm: null,
      responsibiltity: null,
      otherRemark: null,
    },
  };
  editData: any = {};
  contractData: any = {};
  editType: any = "";
  viewData: any = {};
  budingEditData: any = [];
  fileList: any = [];
  uploadList: any = [];
  addType = "";
  addNotificationData: any = {};

  @Watch("info.attachTermVOS")
  geiFileList(val: any, oldVal: any) {
    if (oldVal === undefined) {
      this.fileList = val.map((v: any) => ({
        name: v.fileName,
        fileId: v.fileId,
      }));
    } else {
      if (val.length !== oldVal.length) {
        this.fileList = val.map((v: any) => ({
          name: v.fileName,
          fileId: v.fileId,
        }));
      }
    }
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.$route.query.id;
    if (id) {
      this.info = await get_distributContract_get__termId({
        termId: id,
      });
      this.contractData = {
        // preferentialPartyA: this.info.preferentialPartyA,
        // preferentialPartyAddr: this.info.preferentialPartyAddr,
        padCommissionEnum: this.info.padCommissionEnum,
      };
      window.sessionStorage.setItem("shengshiqu", this.info.city);
      window.sessionStorage.setItem(
        "departmentOrgId",
        this.info.startDivisionId
      );
    }
  }

  previewTop(row: any) {
    // const token: any = getToken();
    // axios({
    //   method: "POST",
    //   url: `/sales-api/project/distributContract/getPreViewOut/${row.agencyContrictId}`,
    //   xsrfHeaderName: "Authorization",
    //   responseType: "blob",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "bearer " + token,
    //   },
    // }).then((res: any) => {
    //   const arr = new Blob([res.data], { type: "application/pdf" });
    //   const href = window.URL.createObjectURL(arr);
    //   window.open(href);
    // });
    window.open(`/sales-api/sales-document-cover/file/browse/${row.fileId}`);
  }

  async previewBottom(row: any) {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/project/preferential/getPreView`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: {
        premiumReceived: row.premiumReceived,
        modeDescription: row.modeDescription,
        partyARefundDays: row.partyARefundDays,
        termId: row.termId,
      },
    }).then((res: any) => {
      const arr = new Blob([res.data], { type: "application/pdf" });
      const href = window.URL.createObjectURL(arr);
      window.open(href);
    });
  }

  addTemplate() {
    this.contractData.agencyContrictId = "";
    this.contractData.id = this.info.preferentialPartyAId;
    this.dialogVisible = true;
  }

  editTemplate(data: any) {
    this.contractData.agencyContrictId = data.agencyContrictId;
    this.dialogVisible = true;
  }

  viewTemplate(data: any) {
    this.viewData.agencyContrictId = data.agencyContrictId;
    this.viewDialogVisible = true;
  }

  contractFinish() {
    if (this.contractData.agencyContrictId) {
      this.$message.success("修改成功");
    } else {
      this.$message.success("新增成功");
    }
    this.dialogVisible = false;
    this.getInfo();
  }

  // 中介分销合同启用
  async start(data: any) {
    try {
      this.tableLoading = true;
      await post_distributContract_start__agencyContrictId({
        agencyContrictId: data.agencyContrictId,
      });
      this.tableLoading = false;
      this.$message.success("启用成功");
      this.getInfo();
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async stop(data: any) {
    try {
      this.tableLoading = true;
      await post_distributContract_cancel__agencyContrictId({
        agencyContrictId: data.agencyContrictId,
      });
      this.tableLoading = false;
      this.$message.success("禁用成功");
      this.getInfo();
    } catch (err) {
      this.tableLoading = false;
    }
  }

  editDialog(type: string) {
    this.editType = type;
    switch (type) {
      case "customerConfirm":
        this.editData.title = "客户成交以及确认";
        this.editData.value = this.info.constractOaVO[type];
        break;
      case "responsibiltity":
        this.editData.title = "违约责任";
        this.editData.value = this.info.constractOaVO[type];
        break;
      case "otherRemark":
        this.editData.title = "合同其他说明";
        this.editData.value = this.info.constractOaVO[type];
        break;
      case "partyARefundDays":
        this.editData.title = "甲方退款天数";
        this.editData.value = this.info.partyARefundDays;
        break;
    }
    this.editDialogVisible = true;
  }

  async editFinish(data: any) {
    let type: any = null;
    switch (this.editType) {
      case "customerConfirm":
        type = 1;
        await post_distributContract_saveOaRemark({
          constractOaId: this.info.constractOaVO.constractOaId,
          remark: data,
          type: type,
        });
        break;
      case "responsibiltity":
        type = 2;
        await post_distributContract_saveOaRemark({
          constractOaId: this.info.constractOaVO.constractOaId,
          remark: data,
          type: type,
        });
        break;
      case "otherRemark":
        type = 3;
        await post_distributContract_saveOaRemark({
          constractOaId: this.info.constractOaVO.constractOaId,
          remark: data,
          type: type,
        });
        break;
      case "partyARefundDays":
        await post_preferential_updateRetuenDays({
          partyARefundDays: data,
          termId: this.$route.query.id,
        });
        break;
    }
    this.$message.success("保存成功");
    this.getInfo();
    this.editDialogVisible = false;
  }

  addNotification() {
    this.addType = "add";
    this.addDialogVisible = true;
    this.addNotificationData = {
      timeList: [this.info.termStart, this.info.termEnd],
      noChangeTime: [this.info.termStart, this.info.termEnd],
    };
    this.addNotificationData.title = "新增";
  }

  // 优惠告知书编辑
  editNotification(data: any) {
    this.addType = "edit";
    this.addDialogVisible = true;
    this.addNotificationData = {
      ...data,
      timeList: [data.startTime, data.endTime],
      noChangeTime: [this.info.termStart, this.info.termEnd],
    };
    this.addNotificationData.title = "修改";
  }

  //优惠告知书下载二维码
  async uploadQRcode(data: any) {
    const token: any = getToken();
    axios({
      method: "GET",
      url: `/sales-api/project/preferential/getQRCodeImage/${data.preferentialMxId}`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "二维码.jpg";
      $a.click();
      $a.remove();
    });
  }

  //优惠告知书启用
  async startlation(data: any) {
    await post_preferential_start__preferentialMxId({
      preferentialMxId: data.preferentialMxId,
    });
    this.$message.success("启用成功");
    this.getInfo();
  }

  //优惠告知书作废
  async stoplation(data: any) {
    await post_preferential_cancel__preferentialMxId({
      preferentialMxId: data.preferentialMxId,
    });
    this.$message.success("禁用成功");
    this.getInfo();
  }

  async addFinish() {
    if (this.addType === "add") {
      this.$message.success("新增成功");
    } else if (this.addType === "edit") {
      this.$message.success("修改成功");
    }
    this.getInfo();
    this.addDialogVisible = false;
  }

  newFileList(data: any) {
    let arr = data.map((v: any) => ({
      fileId: v.fileId,
      fileName: v.name,
    }));
    arr.forEach((v: any, i: number) => {
      this.$set(this.uploadList, i, arr[i]);
    });
  }

  async uploadAdd() {
    let obj: any = {};
    obj.attachTermItemVOS = [...this.uploadList];
    obj.termId = this.$route.query.id;
    await post_preferential_uploadTemplate(obj);
    this.$message.success("保存成功");
  }
}
</script>
<style lang="scss" scoped>
.notification {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}
.notificationButton {
  margin: 5px 0 0 20px;
}
.editParty {
  position: relative;
  .tubiao {
    position: absolute;
    bottom: 5px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
  }
  .partyARefundDays {
    position: absolute;
    bottom: 5px;
    right: 6px;
    font-size: 24px;
    cursor: pointer;
  }
}
.hint {
  text-align: left;
  color: #909399;
  font-size: 14px;
  padding: 5px 20px 10px 20px;
}

.file {
  margin: 20px 0 0 20px;
  &-hint {
    color: #ff0000;
    font-size: 14px;
    text-align: left;
    margin-top: 5px;
  }
  &-item {
    /deep/ .upload {
      display: inline-block;
      line-height: normal;
    }
  }

  &-button {
    margin-left: 10px;
    position: absolute;
    bottom: 0;
  }
}
</style>