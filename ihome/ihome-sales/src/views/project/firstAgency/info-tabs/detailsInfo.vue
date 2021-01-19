<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-15 12:33:25
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-19 16:07:46
-->
<template>
  <div class="text-left">
    <p class="ih-info-title">基础信息</p>
    <el-form
      ref="form"
      label-width="120px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="名称"
            align="left"
          >
            <span class="text-ellipsis">{{ resPageInfo.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="信用代码"
            align="left"
          >
            <span>{{ resPageInfo.creditCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="简称"
            align="left"
          >
            <span>{{ resPageInfo.shortName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="类型"
            align="left"
          >
            <span>{{
              $root.dictAllName(resPageInfo.type, "ChannelCompanyType")
            }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="法定代表人"
            align="left"
          >
            <span>{{ resPageInfo.legalPerson }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="法人身份证号码"
            align="left"
          >
            <span>{{ resPageInfo.legalPersonId }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="成立日期"
            align="left"
          >
            <span>{{ resPageInfo.setupTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="注册资本"
            align="left"
          >
            <span>{{ resPageInfo.capital }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="营业期限"
            align="left"
          >
            <span>{{ resPageInfo.businessTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省份">
            <span>{{ $root.getAreaName(resPageInfo.province) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市">
            <span>{{ $root.getAreaName(resPageInfo.city) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政区">
            <span>{{ $root.getAreaName(resPageInfo.county) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            label="住所"
            align="left"
          >
            <span>{{ resPageInfo.address }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="录入人"
            align="left"
          >
            <span>{{ resPageInfo.inputUserName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="状态"
            align="left"
          >
            <span>{{
              $root.dictAllName(resPageInfo.status, "CompanyStatus")
            }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <p class="ih-info-title">联系人信息</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="resPageInfo.contactList"
        style="width: 100%"
      >
        <el-table-column
          prop="contactName"
          label="姓名"
        ></el-table-column>
        <el-table-column
          prop="contactNum"
          label="手机号"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="电子邮箱"
        ></el-table-column>
      </el-table>
    </div>
    <br />
    <p class="ih-info-title">账户信息</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="resPageInfo.bankList"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="账户名称"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="账号"
        ></el-table-column>
        <el-table-column
          prop="bank"
          label="开户银行"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="账号类型"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.type, "AccountType")
          }}</template>
        </el-table-column>
      </el-table>
    </div>
    <br />
    <p class="ih-info-title">附件信息</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="fileListType"
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
              :limit="row.fileList.length"
              size="100px"
              :removePermi="false"
              :upload-show="!!row.fileList.length"
            ></IhUpload>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />

    <p class="ih-info-title">企业概况</p>
    <div style="padding: 20px">
      {{ resPageInfo.remark }}
    </div>

    <div
      v-if="typeStr === 'firstAgencyRevocation'"
      class="text-left"
    >
      <p class="ih-info-title">撤回信息</p>
      <p class="msg-title"><span style="color: red">* </span>撤回原因</p>
      <el-input
        type="textarea"
        class="padding-left-20"
        style="box-sizing: border-box"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.recallReason"
      >
      </el-input>
      <div class="margin-top-30 text-center">
        <el-button
          @click="submitRecall()"
          type="primary"
        >提交</el-button>
      </div>
    </div>
    <div
      v-if="typeStr === 'firstAgencyCheck'"
      class="text-left"
    >
      <p class="ih-info-title">审核信息</p>
      <p class="msg-title"><span style="color: red">* </span>审核意见</p>
      <el-input
        class="padding-left-20"
        style="box-sizing: border-box"
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="resPageInfo.checkOpinion"
      >
      </el-input>
      <div class="margin-top-30 text-center">
        <el-button
          @click="pass(true)"
          type="primary"
        >通过</el-button>
        <el-button
          @click="pass(false)"
          type="primary"
        >驳回</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
//引入请求数据的api
import {
  get_company_get__id,
  post_company_retract,
  post_company_audit,
} from "@/api/project/index";
@Component({
  components: {},
})
export default class Home extends Vue {
  @Prop() typeStr!: string;

  private get developerId() {
    return this.$route.query.id;
  }
  searchOpen = true;
  private info = [];
  private remark = "";

  resPageInfo: any = {
    bankList: [],
    contactList: [],
    attachmentList: [],
    provinceOption: [],
    recallReason: null,
    checkOpinion: null,
  };
  fileListType: any = [];

  openToggle() {
    this.searchOpen = !this.searchOpen;
  }

  async created() {
    this.getInfo();
  }

  async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      const res = await get_company_get__id({ id: this.developerId });
      this.resPageInfo = res;
      this.resPageInfo.provinceOption = [res.province, res.city, res.county];
      this.getFileListType(res.attachmentList);
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
  }

  async submitRecall() {
    if (this.resPageInfo.recallReason) {
      await post_company_retract({
        reason: this.resPageInfo.recallReason,
        id: this.developerId,
      });
      this.$message({
        type: "success",
        message: "撤回成功!",
      });
      this.$goto({ path: `/firstAgency/list` });
    } else {
      this.$message.warning("请填写撤回原因");
    }
  }

  async pass(val: any) {
    if (!this.resPageInfo.checkOpinion) {
      this.$message.warning("请填写审核意见");
      return;
    }
    await post_company_audit({
      reason: this.resPageInfo.checkOpinion,
      id: this.developerId,
      pass: val,
    });
    this.$message({
      type: "success",
      message: val ? "审核通过!" : "驳回成功!",
    });
    this.$goto({ path: `/firstAgency/list` });
  }
}
</script>

<style lang="scss" scoped>
.text-ellipsis {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.msg-title {
  text-align: left;
  margin-left: 25px;
}
</style>