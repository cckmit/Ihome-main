<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:27:01
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-25 11:51:17
-->
<template>
  <div>
    <p class="ih-info-title">乙方合同模板</p>
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
        ></el-table-column>
        <el-table-column
          prop="titleOrRemark"
          label="标题备注"
        >
        </el-table-column>
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
            <el-link @click="viewTemplate(row)">查看</el-link>
            <el-link @click="previewTop(row)">预览</el-link>
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
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <br />
    <div v-if="info.chargeEnum && (info.chargeEnum === 'Service' || info.chargeEnum === 'ServiAndAgen')">
      <p class="ih-info-title">优惠告知书模板</p>
      <div class="hint">(注: 当 立项周期信息里的 启动模式设置为 服务费模式 或 服务费加代理费模式 时，表示 收取服务费。 才会显示 优惠告知书信息 模块内容. )</div>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.preferentialMxVOS"
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
            width="180"
            fixed="right"
            align="center"
          >
            <template v-slot="{ row }">
              <el-link @click="uploadQRcode(row)">二维码</el-link>
              <el-link @click="previewBottom(row)">预览</el-link>
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
                <el-input
                  v-model="info.partyARefundDays"
                  disabled
                ></el-input>
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
                  :limit="fileList.length"
                  :removePermi="false"
                  :editPermi="false"
                  :upload-show="!!fileList.length"
                ></IhUpload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <IhImgViews
      v-if="isShowImg"
      :url-list="srcList"
      :viewer-msg="srcData"
      :onClose="() => (isShowImg = false)"
    ></IhImgViews>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_his_distributContract_get__termId } from "@/api/project/index.ts";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
@Component({
  components: {},
})
export default class Notification extends Vue {
  info: any = {
    distributContractVOS: [],
    preferentialMxVOS: [],
    chargeEnum: null,
    partyARefundDays: null,
    constractOaVO: {
      customerConfirm: null,
      responsibiltity: null,
      otherRemark: null,
    },
  };
  viewData: any = {};
  fileList: any = [];
  isShowImg = false;
  srcList: any = [];
  srcData: any = [];

  created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.$route.query.id;
    if (id) {
      const res = await get_his_distributContract_get__termId({
        termId: id,
      });
      this.info = { ...res };
      if (res.attachTermVOS.length) {
        this.fileList = res.attachTermVOS.map((v: any) => ({
          fileName: v.fileName,
          fileId: v.fileId,
        }));
      }
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
}
</script>
<style lang="scss" scoped>
.editParty {
  position: relative;
  .tubiao {
    position: absolute;
    bottom: 5px;
    right: 20px;
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
    }
  }
}
</style>