<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:27:01
 * @LastEditors: ywl
 * @LastEditTime: 2021-05-17 14:47:06
-->
<template>
  <div>
    <div class="notification">
      <p class="ih-info-title">乙方合同模板</p>
      <div class="notificationButton">
        <el-button
          size="small"
          type="success"
          @click="addTemplate"
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
          prop="contractKind"
          label="合同类型"
          width="200"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.contractKind, "ContractKind")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="contractTitle"
          label="合同主标题"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="titleOrRemark"
          label="标题备注"
        ></el-table-column>
        <el-table-column
          label="甲方公司"
          prop="partyCompany"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="padCommissionEnum"
          label="是否垫佣"
          width="120"
        >
          <template v-slot="{ row }">
            {{ row.padCommissionEnum ? $root.dictAllName(row.padCommissionEnum, "PadCommission") : '-'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="channelEnum"
          label="渠道类型"
          width="350"
        >
          <template v-slot="{ row }">
            <div>{{row.channelEnum ? $root.dictAllName(row.channelEnum, "ChannelCustomer") : '-'}}</div>
            <div
              v-if="row.channelEnum === 'Appoint' || row.channelEnum === 'Strategic'"
              :title="row.designatedAgency"
            >{{row.designatedAgency}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="100"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.state, 'Oper')}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="viewTemplate(row)"
            >查看</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="editTemplate(row)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="previewTop(row)">预览</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="copyTop(row)">复制</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="delTop(row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
            label="是否显示“本优惠不在《认购书》上重复体现”条款"
            width="200"
          >
            <template v-slot="{ row }">
              {{row.exPreferentialItem ? '是' : '否'}}
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
            width="140"
            fixed="right"
            align="center"
          >
            <template v-slot="{ row }">
              <el-link
                type="primary"
                @click="uploadQRcode(row)"
              >二维码</el-link>
              <el-dropdown
                trigger="click"
                class="margin-left-15"
              >
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native.prevent="editNotification(row)">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native.prevent="previewBottom(row)">预览</el-dropdown-item>
                  <el-dropdown-item @click.native.prevent="copyBottom(row)">复制</el-dropdown-item>
                  <el-dropdown-item @click.native.prevent="delBottom(row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
                  v-model="fileList"
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
      <TemplateSelect
        :data="templateDate"
        @cancel="() => (dialogVisible = false)"
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
    <IhImgViews
      v-if="isShowImg"
      :url-list="srcList"
      :viewer-msg="srcData"
      :onClose="() => (isShowImg = false)"
    ></IhImgViews>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PartyADialog from "../dialog/partyA-dialog/partyADialog.vue";
import AddNotification from "../dialog/notification-dialog/addNotification.vue";
import TemplateSelect from "../dialog/notification-dialog/templateSelect.vue";
import {
  get_distributContract_get__termId,
  post_distributContract_saveOaRemark,
  post_preferential_uploadTemplate,
  post_preferential_updateRetuenDays,
  post_distributContract_delete,
  post_preferential_delete,
} from "@/api/project/index.ts";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
@Component({
  components: {
    PartyADialog,
    AddNotification,
    TemplateSelect,
  },
})
export default class Notification extends Vue {
  dialogVisible = false;
  editDialogVisible = false;
  addDialogVisible = false;
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
  templateDate: any = {};
  editType: any = "";
  viewData: any = {};
  budingEditData: any = [];
  fileList: any = [];
  uploadList: any = [];
  addType = "";
  addNotificationData: any = {};
  isShowImg = false;
  srcList: any = [];
  srcData: any = [];
  startLoading: any = false;
  stopLoading: any = false;

  @Watch("info.attachTermVOS")
  geiFileList(val: any, oldVal: any) {
    if (oldVal === undefined) {
      this.fileList = val.map((v: any) => ({
        fileName: v.fileName,
        fileId: v.fileId,
      }));
    } else {
      if (val.length !== oldVal.length) {
        this.fileList = val.map((v: any) => ({
          fileName: v.fileName,
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
      this.templateDate = {
        disabled: ["1", "2", "3"],
      };
      window.sessionStorage.setItem("shengshiqu", this.info.city);
      window.sessionStorage.setItem(
        "departmentOrgId",
        this.info.startDivisionId
      );
      let addObj: any = {
        proId: this.info.proId,
        proName: this.info.proName,
        proRecord: this.info.proRecord,
        // padCommissionEnum: this.info.padCommissionEnum,
        preferentialPartyAId: this.info.preferentialPartyAId,
        termId: this.$route.query.id,
        chargeEnum: this.info.chargeEnum,
        termStart: this.info.termStart,
        termEnd: this.info.termEnd,
      };
      window.sessionStorage.setItem("addContract", JSON.stringify(addObj));
    }
  }

  previewTop(row: any) {
    let imgList = row.attachTerms;
    this.srcList = imgList.map(
      (i: any) => `/sales-api/sales-document-cover/file/browse/${i.fileId}`
    );
    this.srcData = imgList.map((v: any) => ({
      fileName: v.fileName,
      fileId: v.fileId,
    }));
    if (this.srcList.length) {
      this.isShowImg = true;
    } else {
      this.$message.warning("暂无图片");
    }
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
        startTime: row.startTime,
        endTime: row.endTime,
        exPreferentialItem: row.exPreferentialItem,
      },
    }).then((res: any) => {
      const arr = new Blob([res.data], { type: "application/pdf" });
      const href = window.URL.createObjectURL(arr);
      window.open(href);
    });
  }

  addTemplate() {
    this.dialogVisible = true;
  }

  editTemplate(data: any) {
    switch (data.contractKind) {
      case "StandKindSaleConfirm":
        this.$router.push({
          path: "/projectApproval/normalSalesApply",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "NoStandKindSaleConfirm":
        this.$router.push({
          path: "/projectApproval/notSalesApply",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "StandChannel":
        this.$router.push({
          path: "/projectApproval/normalDistributionApply",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "NoStandChannel":
        this.$router.push({
          path: "/projectApproval/notDistributionApply",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "NoChannel":
        this.$router.push({
          path: "/projectApproval/notChannelApply",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
    }
  }

  copyTop(data: any) {
    switch (data.contractKind) {
      case "StandKindSaleConfirm":
        this.$router.push({
          path: "/projectApproval/copyNormalSalesApply",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "NoStandKindSaleConfirm":
        this.$router.push({
          path: "/projectApproval/copyNotSalesApply",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "StandChannel":
        this.$router.push({
          path: "/projectApproval/copyNormalDistributionApply",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "NoStandChannel":
        this.$router.push({
          path: "/projectApproval/copyNotDistributionApply",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "NoChannel":
        this.$router.push({
          path: "/projectApproval/copyNotChannelApply",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
    }
  }

  async delTop(data: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_distributContract_delete({
        termId: data.termId,
        agencyContrictId: data.agencyContrictId,
      });
      this.getInfo();
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  viewTemplate(data: any) {
    switch (data.contractKind) {
      case "StandKindSaleConfirm":
        this.$router.push({
          path: "/projectApproval/normalSalesInfo",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "NoStandKindSaleConfirm":
        this.$router.push({
          path: "/projectApproval/notSalesInfo",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "StandChannel":
        this.$router.push({
          path: "/projectApproval/normalDistributionInfo",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "NoStandChannel":
        this.$router.push({
          path: "/projectApproval/notDistributionInfo",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
      case "NoChannel":
        this.$router.push({
          path: "/projectApproval/notChannelInfo",
          query: {
            id: data.agencyContrictId,
          },
        });
        break;
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
        if (data == 0 || data < 0) {
          this.$notify({
            title: "提示",
            message: "退款天数必须大于0",
            duration: 0,
          });
        }
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
    this.addNotificationData.title = "编辑";
  }

  // 优惠告知书复制
  copyBottom(data: any) {
    this.addType = "copy";
    this.addDialogVisible = true;
    this.addNotificationData = {
      ...data,
      timeList: [data.startTime, data.endTime],
      noChangeTime: [this.info.termStart, this.info.termEnd],
    };
    this.addNotificationData.title = "复制";
  }

  // 优惠告知书删除
  async delBottom(data: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_preferential_delete({
        termId: data.termId,
        preferentialMxId: data.preferentialMxId,
      });
      this.getInfo();
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
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

  async addFinish() {
    if (this.addType === "add") {
      this.$message.success("新增成功");
    } else if (this.addType === "edit") {
      this.$message.success("修改成功");
    } else if (this.addType === "copy") {
      this.$message.success("复制成功");
    }
    this.getInfo();
    this.addDialogVisible = false;
  }

  newFileList(data: any) {
    let arr = data.map((v: any) => ({
      fileId: v.fileId,
      fileName: v.fileName,
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
.text-ellipsis {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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