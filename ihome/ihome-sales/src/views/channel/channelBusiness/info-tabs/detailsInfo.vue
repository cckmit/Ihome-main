<!--
 * @Description:
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-16 14:05:21
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-11 11:57:26
-->
<template>
  <div class="text-left">
    <p class="ih-info-title">基础信息</p>
    <el-form label-width="130px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司名称">
            <span
              class="text-ellipsis"
              :title="info.name"
            >{{ info.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司简称">{{ info.shortName }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="信用代码">{{ info.creditCode }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="公司类型"
            v-if="info.type"
          >
            <span
              class="text-ellipsis"
              :title="$root.dictAllName(info.type, 'ChannelCompanyType')"
            >{{ $root.dictAllName(info.type, "ChannelCompanyType") }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法定代表人">{{ info.legalPerson }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人身份证号码">{{ info.legalIdentityCode }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="成立日期">{{ info.setupTime }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册资本">{{ info.capital }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="营业期限">{{ info.businessTime }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="省市区">{{ $root.getAreaName(info.province) }}/{{ $root.getAreaName(info.city) }}/{{ $root.getAreaName(info.county) }}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="住所">{{ info.address }}</el-form-item>
        </el-col>
<!--        <el-col :span="8">
          <el-form-item label="省份">{{ $root.getAreaName(info.province) }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市">{{ $root.getAreaName(info.city) }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政区">{{ $root.getAreaName(info.county) }}</el-form-item>
        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="企业概况">{{ info.remark }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="跟进人">{{ info.followUserName }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="状态"
            v-if="info.status"
          >{{ $root.dictAllName(info.status, 'ChannelStatus') }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <p class="ih-info-title">负责人信息</p>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">{{ channelPersons.name }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">{{ channelPersons.mobile }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号码">{{ channelPersons.identityCode }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电子邮箱">{{ channelPersons.email }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <p class="ih-info-title">
      <span>银行账号信息</span>
    </p>
    <div class="padding-left-20">
      <el-table
        :data="info.channelBanks"
        style="width: 100%"
      >
        <el-table-column
          prop="accountName"
          label="账户名称"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="accountNo"
          label="银行账号"
          min-width="200"
        > </el-table-column>
        <el-table-column
          prop="branchName"
          label="开户银行"
          width="300"
        ></el-table-column>
        <!-- <el-table-column
          prop="branchNo"
          label="联行号"
        ></el-table-column> -->
        <el-table-column
          prop="accountType"
          label="账号类型"
          width="200"
        >
          <template v-slot="{row}">
            {{$root.dictAllName(row.accountType, "Account")}}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <p class="ih-info-title">
      <span>附件信息</span>
      <el-link
        class="margin-left-16"
        href="http://zxgk.court.gov.cn/zhzxgk/"
        type="success"
        target="_blank"
      >综合查询被执行人</el-link>
    </p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        style="width: 100%"
        :data="fileListType"
      >
        <el-table-column
          prop="type"
          width="200"
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
              v-model="row.fileList"
              :file-size="10"
              :file-type="row.code"
              :limit="row.limit ? row.fileList.length : 999"
              :upload-show="row.limit && !!row.fileList.length"
              size="100px"
              @newFileList="queryNew"
            ></IhUpload>
          </template>
        </el-table-column>
      </el-table>
      <br />
    </div>

    <template v-if="pageName === 'ConfirmChannel'">
      <p class="ih-info-title">确认意见</p>
      <el-input
        type="textarea"
        style="box-sizing: border-box;"
        class="padding-left-20"
        placeholder="请输入意见"
        v-model="approveRecord.remark"
        :autosize="{ minRows: 5, maxRows: 8 }"
        maxlength="256"
      ></el-input>
      <div class="text-center">
        <br />
        <el-button
          type="success"
          @click="confirmChannel('Confirm')"
        >通过</el-button>
        <el-button @click="confirmChannel('Reject')">驳回</el-button>
      </div>
    </template>

    <template v-if="pageName === 'RevokeChannel'">
      <p class="ih-info-title">撤回原因</p>
      <el-input
        type="textarea"
        style="box-sizing: border-box;"
        class="padding-left-20"
        placeholder="请输入撤回原因"
        v-model="approveRecord.remark"
        :autosize="{ minRows: 5, maxRows: 8 }"
        maxlength="256"
      ></el-input>
      <div class="text-center">
        <br />
        <el-button
          type="success"
          @click="confirmChannel('Revoke')"
        >提交</el-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//引入请求数据的api
import {
  get_channel_get__id,
  post_channel_approveRecord,
} from "../../../../api/channel/index";
@Component({
  components: {},
})
export default class Home extends Vue {
  info: any = {};
  fileListType: any = [];
  private channelPersons: object = {};
  private approveRecord: ConfirmObj = {
    remark: "",
    result: "",
  };

  submitFile: any = {};

  private get pageName(): string | null | undefined {
    return this.$route.name;
  }

  async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      this.info = await get_channel_get__id({ id: id });
      this.channelPersons = this.info.channelPersons.length
        ? this.info.channelPersons[0]
        : {};
      this.getFileListType(this.info.channelAttachments);
    }
  }
  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("ChannelAttachment");
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
    this.fileListType = this.fileListType.map((v: any) => {
      if (
        ["ComprehensiveQueryResult"].includes(v.code) &&
        this.$route.name === "ConfirmChannel"
      ) {
        return {
          ...v,
        };
      } else {
        return {
          ...v,
          limit: true,
          fileList: v.fileList.map((j: any) => ({
            ...j,
            exAuto: 1,
          })),
        };
      }
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

  private async confirmChannel(type: string): Promise<void> {
    if (!this.approveRecord.remark) {
      this.$message.warning(`${this.switchType(type)}不能为空`);
      return;
    }
    let obj: any = {};
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
        fileList: arr.filter((j: any) => j.type === v.code),
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
      let uploadArr: any = arr.map((v: any) => ({
        fileId: v.fileId,
        fileName: v.fileName,
        type: v.type,
      }));
      obj.channelAttachments = uploadArr.filter(
        (v: any) => v.type === "ComprehensiveQueryResult"
      );
    } else {
      this.$message({
        type: "warning",
        message: `${msgList.join(",")}项,请上传附件`,
      });
      return;
    }
    obj.remark = this.approveRecord.remark;
    obj.result = type;
    obj.id = this.$route.query.id;
    await post_channel_approveRecord(obj);
    this.$message.success("成功");
    this.$goto({ path: "/channelBusiness/list" });
  }
  private switchType(type: any) {
    switch (type) {
      case "Confirm":
      case "Reject":
        return "确认意见";
      case "Revoke":
        return "撤回原因";
      default:
        break;
    }
  }

  async created() {
    this.getInfo();
  }
}
interface ConfirmObj {
  remark: string;
  result: string;
}
</script>

<style lang="scss" scoped>
.text-ellipsis {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
