<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:27:01
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-20 16:31:22
-->
<template>
  <div>
    <p class="ih-info-title">中介分销合同模板</p>
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
        <el-table-column label="派发佣金标准">
          <template v-slot="{ row }">
            <template v-for="(item, i) in row.distributContractMxVOS">
              <span :key="i">
                <span>{{item.sendContext}}</span>
                <span v-if="i !== row.distributContractMxVOS.length - 1">、</span>
              </span>
            </template>
          </template>
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
          label="操作"
          width="120"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="viewTemplate(row)"
            >查看</el-button>
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
            width="120"
            fixed="right"
            align="center"
          >
            <template v-slot="{ row }">
              <el-button
                size="small"
                type="success"
                @click="uploadQRcode(row)"
              >下载二维码</el-button>
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
                  :file-list.sync="fileList"
                  size="100px"
                  :limit="fileList.length"
                  :removePermi="false"
                  :upload-show="!!fileList.length"
                ></IhUpload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="file-hint">特殊情况无法使用电子优惠告知书模板，请上传纸质版优惠告知书附件</div>
      </div>
    </div>
    <ih-dialog :show="viewDialogVisible">
      <ViewContract
        :data="viewData"
        @cancel="() => (viewDialogVisible = false)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewContract from "../dialog/notification-dialog/historyViewContract.vue";
import { get_his_distributContract_get__termId } from "@/api/project/index.ts";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
@Component({
  components: {
    ViewContract,
  },
})
export default class Notification extends Vue {
  viewDialogVisible = false;
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
          name: v.fileName,
          fileId: v.fileId,
        }));
      }
    }
  }

  viewTemplate(data: any) {
    this.viewData.agencyContrictId = data.agencyContrictId;
    this.viewDialogVisible = true;
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