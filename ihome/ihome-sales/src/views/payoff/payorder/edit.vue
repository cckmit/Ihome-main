<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:23
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-26 18:14:06
-->
<template>
  <ih-page>
    <template v-slot:form>
      <p class="ih-info-title">付款申请单信息</p>
      <el-form
        ref="form"
        label-width="120px"
        :model="info"
        :rules="rules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="付款单编号"
              prop="applyCode"
            >
              <el-input
                disabled
                v-model="info.applyCode"
                placeholder="付款单编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="当前状态"
              prop="status"
            >
              <el-input
                disabled
                v-model="info.status"
                placeholder="当前状态"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="渠道商"
              prop="agencyId"
            >
              <IhSelectPageByChannel
                placeholder="请选择渠道商"
                v-model="info.agencyId"
              ></IhSelectPageByChannel>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="渠道收款账号"
              prop="receiveAccount"
            >
              <el-select
                v-model="info.receiveAccount"
                clearable
                placeholder="请选择账号"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelCompanyType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="渠道商发票类型"
              required
              prop="invoiceType"
            >
              <el-select
                v-model="info.invoiceType"
                clearable
                placeholder="请选择类型"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelCompanyType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="发票税率"
              prop="taxRate"
            >
              <el-select
                v-model="info.taxRate"
                clearable
                placeholder="请选择发票税率"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelCompanyType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="制单人"
              prop="makerId"
            >
              <el-input
                disabled
                v-model="info.makerId"
                placeholder="制单人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="制单日期"
              prop="makerTime"
            >
              <el-input
                disabled
                v-model="info.makerTime"
                placeholder="制单日期"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:table>
      <div class="content">
        <p class="ih-info-title">待付款列表</p>
        <el-button
          @click="addContacts()"
          type="success"
          size="small"
        >添加成交报告</el-button>
      </div>
      <div class="text-left margin-left-20 zhouqi">
        <div>归属周期</div>
        <el-radio-group
          v-model="radio1"
          class="margin-left-20"
        >
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <br />
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.payApplyDetailList"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            width="50"
            label="序号"
          ></el-table-column>
          <el-table-column
            label="成交信息"
            width="200"
          >
            <template v-slot="{ row }">
              <div>客户姓名: {{row.customer}}</div>
              <div>成交编号: {{row.dealCode}}</div>
              <div>地址: {{row.address}}</div>
              <div>业务模式: {{$root.dictAllName(row.busModel, 'busModel')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="周期合同信息"
            prop="contactNum"
            width="200"
          >
            <template v-slot="{ row }">
              <div>周期名称: {{row.customer}}</div>
              <div>是否垫佣: {{$root.dictAllName(row.isMat, 'YesOrNoType')}}</div>
              <div>分销协议编号: {{row.contNo}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="签约价格"
            prop="signPrice"
          ></el-table-column>
          <el-table-column
            label="签约日期"
            prop="signDate"
          ></el-table-column>
          <el-table-column
            label="服务费情况"
            width="150"
          >
            <template v-slot="{ row }">
              <div>应收: {{row.serReceiveFees}}</div>
              <div>实收: {{row.serActualFees}}</div>
              <div>未收: {{row.serNoFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="代理费情况"
            width="150"
          >
            <template v-slot="{ row }">
              <div>应收: {{row.ageReceiveFees}}</div>
              <div>实收: {{row.ageActualFees}}</div>
              <div>未收: {{row.ageNoFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="拆佣金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serCommFees}}</div>
              <div>代理费: {{row.ageCommFees}}</div>
              <div>合计: {{row.allCommFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="已结佣付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serSettledCommFees}}</div>
              <div>代理费: {{row.ageSettledCommFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="未结佣付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serUnsetCommFees}}</div>
              <div>代理费: {{row.ageUnsetCommFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次付款金额"
            prop="email"
            width="200"
          >
            <template v-slot="{ row }">
              <div>
                服务费:
                <el-input
                  v-model="row.serNoCommFees"
                  v-digits="2"
                  clearable
                  style="width: 70%"
                />
              </div>
              <div class="margin-top-5">
                代理费:
                <el-input
                  v-model="row.ageNoCommFees"
                  v-digits="2"
                  clearable
                  style="width: 70%"
                />
              </div>
              <div>合计: {{
                Number(row.serNoCommFees?row.serNoCommFees:0) + 
                Number(row.ageNoCommFees?row.ageNoCommFees:0)
              }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="不含税金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>不含税金额: {{row.noTaxAmount}}</div>
              <div>税额: {{row.tax}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="付款限额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serLimitFees}}</div>
              <div>代理费: {{row.ageLimitFees}}</div>
              <div>签字确认: {{$root.dictAllName(row.signConfirm, 'YesOrNoType')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="扣除项类别"
            width="200"
          >
            <template v-slot="{ row }">
              <el-select
                v-model="row.deductType"
                clearable
                placeholder="请选择扣除项类别"
                style="width: 70%"
              >
                <el-option
                  v-for="item in $root.dictAllList('deductType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="本次应扣"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.thisDeduct"
                v-digits="2"
                clearable
                style="width: 70%"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="本次支付比例(%)"
            prop="ratio"
            width="150"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
          >
            <template v-slot="{ $index }">
              <el-button
                type="danger"
                @click="delContacts($index)"
              > 移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <el-button type="primary">点击计算结佣统计数据及成本归属明细</el-button>
      <p class="ih-info-title">此渠道公司周期结佣汇总</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.payDeductDetailList"
          style="width: 100%"
        >
          <el-table-column
            label="周期名称"
            prop="name"
          ></el-table-column>
          <el-table-column
            label="所属项目"
            prop="number"
          ></el-table-column>
          <el-table-column
            label="累计结佣次数"
            prop="bank"
          ></el-table-column>
          <el-table-column
            label="历史累计发生金额"
            prop="type"
          ></el-table-column>
          <el-table-column
            label="历史累计扣除金额"
            prop="type"
          ></el-table-column>
          <el-table-column
            label="本期实际付款金额"
            prop="type"
          ></el-table-column>
          <el-table-column
            label="本期扣除金额"
            prop="type"
          ></el-table-column>
          <el-table-column
            label="累计发生金额（含本期）"
            prop="type"
          ></el-table-column>
          <el-table-column
            label="累计扣除金额（含本期）"
            prop="type"
          ></el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">成本归属列表</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.costApportionList"
          style="width: 100%"
        >
          <el-table-column
            label="周期名称"
            prop="cycleName"
          ></el-table-column>
          <el-table-column
            label="成本归属区域"
            prop="ownedAreaName"
          ></el-table-column>
          <el-table-column
            label="成本归属门店"
            prop="ownedStoreId"
          ></el-table-column>
          <el-table-column
            label="应承担总成本"
            prop="shouldTotalCost"
          ></el-table-column>
          <el-table-column
            label="累计已分摊成本金额"
            prop="totalApportionCost"
          ></el-table-column>
          <el-table-column
            label="未分摊成本金额"
            prop="unapportionCost"
          ></el-table-column>
          <el-table-column
            label="本次分摊成本金额（合计）"
            prop="thisApportionCost"
          ></el-table-column>
          <el-table-column
            label="本次分摊不含税金额"
            prop="thisApportionNoTaxCost"
          ></el-table-column>
          <el-table-column
            label="本次分摊税额"
            prop="thisApportionTax"
          ></el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">结佣信息</p>
      <div class="margin-left-20">
        <table
          border="1"
          cellspacing="0"
          cellpadding="0"
          width="100%"
          height="100%"
        >
          <tr>
            <td
              height="50"
              width="200"
            >领取单位</td>
            <td width="200">{{info.agencyName}}</td>
            <td width="200">区域</td>
            <td width="200">{{info.area}}</td>
            <td width="200">项目</td>
            <td width="200">{{info.projectName}}</td>
          </tr>
          <tr>
            <td height="50">本期申请支付金额</td>
            <td>{{info.applyAmount}}</td>
            <td>不含税金额（实付）</td>
            <td>{{info.noTaxAmount}}</td>
            <td>税额（实付）</td>
            <td>{{info.tax}}</td>
          </tr>
          <tr>
            <td height="50">本期实际付款金额</td>
            <td>{{info.actualAmount}}</td>
            <td>本期扣除金额</td>
            <td>{{info.deductAmount}}</td>
            <td colspan="2">
              <el-button>查看</el-button>
            </td>
          </tr>
          <tr>
            <td height="50">累计付款金额</td>
            <td>{{info.totalPayFees}}</td>
            <td>累计扣除金额</td>
            <td>{{info.totalPdeductFees}}</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td
              colspan="6"
              height="50"
            >经办部门意见</td>
          </tr>
          <tr>
            <td colspan="6">
              <el-input
                type="textarea"
                style="box-sizing: border-box"
                :autosize="{ minRows: 5, maxRows: 10 }"
                placeholder="请输入内容"
                v-model="info.description"
              >
              </el-input>
            </td>
          </tr>
        </table>
      </div>
      <p class="ih-info-title">附件信息</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.documentList"
          style="width: 100%"
        >
          <el-table-column
            prop="type"
            width="180"
            label="类型"
            align="center"
          >
            <template v-slot="{ row }">
              <div><span
                  style="color: red"
                  v-if="row.subType"
                >*</span>{{row.name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="附件">
            <template v-slot="{ row }">
              <IhUpload
                :file-list.sync="row.fileList"
                :file-size="10"
                :file-type="row.code"
                size="100px"
                @newFileList="queryNew"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <div class="bottom">
        <el-button
          @click="submit('Draft')"
          type="primary"
        >保存</el-button>
        <el-button
          @click="submit('WaitAuditByBranchHead')"
          type="primary"
        >提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
    <ih-dialog
      :show="contactsDialogVisible"
      desc="联系人信息"
    >
      <Contacts
        :data="contactsData"
        @cancel="() => (contactsDialogVisible = false)"
        @finish="
          (data) => {
            contactsDialogVisible = false;
            contactsFinish(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_company_get__id,
  post_company_add,
  post_company_updateDraft,
  post_company_update,
} from "@/api/developer/index";
import { Form as ElForm } from "element-ui";

@Component({
  components: {},
})
export default class Edit extends Vue {
  private fileList: Array<object> = [];
  info: any = {
    applyCode: null,
    status: null,
    agencyId: null,
    receiveAccount: null,
    invoiceType: null,
    taxRate: null,
    makerId: null,
    makerTime: null,
    payApplyDetailList: [{}],
    payDeductDetailList: [{}],
    costApportionList: [{}],
    documentList: [{}],
  };
  radio1: any = "";
  fileListType: any = [];
  submitFile: any = {};
  accountData: any = {};
  contactsData: any = {};
  contactsDialogType: any;
  contactsIndex: any;
  accountDialogType: any;
  accountIndex: any;
  contactsDialogVisible = false;
  accountDialogVisible = false;

  private rules: any = {
    name: [{ required: true, message: "请填写名称", trigger: "change" }],
    creditCode: [
      { required: true, message: "请填写信用代码", trigger: "change" },
    ],
    shortName: [{ required: true, message: "请填写简称", trigger: "change" }],
    type: [{ required: true, message: "请选择类型", trigger: "change" }],
    legalPersonId: [
      { required: true, message: "请填写法人身份证号码", trigger: "change" },
      {
        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
        message: "证件号码格式有误！",
        trigger: "change",
      },
    ],
    setupTime: [
      { required: true, message: "请选择成立日期", trigger: "change" },
    ],
    capital: [{ required: true, message: "请填写注册资本", trigger: "change" }],
    provinceOption: [
      { required: true, message: "请选择省市区", trigger: "change" },
    ],
    address: [{ required: true, message: "请填写住所", trigger: "change" }],
    legalPerson: [
      { required: true, message: "请填法定代表人", trigger: "change" },
    ],
  };

  searchOpen = true;
  private get developerId() {
    return this.$route.query.id;
  }

  cancel() {
    this.$router.push("/payoff/list");
  }

  async created() {
    this.getInfo();
  }
  async getInfo() {
    if (this.developerId) {
      const res = await get_company_get__id({ id: this.developerId });
      this.info = res;
      this.info.provinceOption = [res.province, res.city, res.county];
      this.getFileListType(res.attachmentList);
    } else {
      this.info.inputUserName = (this.$root as any).userInfo.name;
      this.info.inputUser = (this.$root as any).userInfo.id;
      this.getFileListType([]);
    }
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("AttachementType");
    this.fileListType = list.map((v: any) => {
      return {
        ...v,
        fileList: data
          .filter((j: any) => j.type === v.code)
          .map((h: any) => ({
            ...h,
            name: h.fileName,
          })),
      };
    });
    let obj: any = {};
    this.fileListType.forEach((h: any) => {
      obj[h.code] = h.fileList;
    });
    this.submitFile = { ...obj };
  }

  queryNew(data: any, type?: any) {
    let obj: any = {};
    obj[type] = data;
    this.submitFile = { ...this.submitFile, ...obj };
  }

  // 联系人信息
  addContacts() {
    this.contactsDialogVisible = true;
    this.contactsData = {};
    this.contactsDialogType = "add";
  }

  editContacts(row: any, index: number) {
    this.contactsData = row;
    this.contactsIndex = index;
    this.contactsDialogType = "edit";
    this.contactsDialogVisible = true;
  }

  async delContacts(index: number) {
    try {
      await this.$confirm("是否确定移除?", "提示");
      this.info.contactList.splice(index, 1);
      this.$message({
        type: "success",
        message: "移除成功!",
      });
    } catch (err) {
      console.log(err);
    }
  }

  contactsFinish(data: any) {
    if (this.contactsDialogType === "add") {
      this.info.contactList.push(data);
    } else {
      this.$set(this.info.contactList, this.contactsIndex, data);
    }
  }

  //账户信息
  addAccount() {
    this.accountDialogVisible = true;
    this.accountData = {};
    this.accountDialogType = "add";
  }

  editAccount(row: any, index: number) {
    this.accountData = row;
    this.contactsIndex = index;
    this.accountDialogType = "edit";
    this.accountDialogVisible = true;
  }

  async delAccount(index: number) {
    try {
      await this.$confirm("是否确定移除?", "提示");
      this.info.bankList.splice(index, 1);
      this.$message({
        type: "success",
        message: "移除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  accountFinish(data: any) {
    if (this.accountDialogType === "add") {
      this.info.bankList.push(data);
    } else {
      this.$set(this.info.bankList, this.contactsIndex, data);
    }
  }

  submit(val: string) {
    (this.$refs["form"] as ElForm).validate(async (v: any) => {
      if (v) {
        this.info.province = this.info.provinceOption[0];
        this.info.city = this.info.provinceOption[1];
        this.info.county = this.info.provinceOption[2];
        this.info.status = val;
        // 校验提示
        let arr: any = [];
        Object.values(this.submitFile).forEach((v: any) => {
          if (v.length) {
            arr = arr.concat(v);
          }
        });
        // 以下操作仅仅是为了校验必上传项
        let submitList: any = this.fileListType.map((v: any) => {
          return {
            ...v,
            fileList: arr
              .filter((j: any) => j.type === v.code)
              .map((h: any) => ({
                ...h,
                name: h.fileName,
              })),
          };
        });
        let isSubmit = true;
        let msgList: any = [];
        submitList.forEach((v: any) => {
          if (v.subType && !v.fileList.length) {
            msgList.push(v.name);
            isSubmit = false;
          }
        });
        if (isSubmit) {
          this.info.attachmentList = arr.map((v: any) => ({
            fileId: v.fileId,
            fileName: v.name,
            type: v.type,
          }));
        } else {
          this.$message({
            type: "warning",
            message: `${msgList.join(",")}项,请上传附件`,
          });
          return;
        }
        switch (this.$route.name) {
          case "developerAdd":
            await post_company_add(this.info);
            break;
          case "developerEdit":
            await post_company_updateDraft(this.info);
            break;
          case "developerChange":
            await post_company_update(this.info);
            break;
        }
        this.$goto({ path: `/developers/list` });
        this.$message({
          type: "success",
          message: val === "Draft" ? "保存成功!" : "提交成功!",
        });
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  /deep/ .el-button {
    position: absolute;
    top: -10px;
    right: 0;
  }
}
.bottom {
  margin-top: 30px;
  text-align: center;
}
.zhouqi {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>