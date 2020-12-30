<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-01 14:49:06
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-30 19:17:54
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="750px"
    class="dialog text-left"
    title="甲方合同信息"
  >
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="110px"
      class="demo-form"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="合同标题"
            prop="title"
          >
            <el-input
              v-model="form.title"
              placeholder="合同标题"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="甲方"
            prop="partyA"
          >
            <IhSelectPageByDeveloper
              v-model="form.partyA"
              placeholder="请选择甲方"
              clearable
              multiple
            ></IhSelectPageByDeveloper>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="乙方"
            prop="partyBId"
          >
            <el-select
              v-model="form.partyBId"
              clearable
              placeholder="乙方"
              class="width--100"
              @change="changePartyB"
            >
              <el-option
                v-for="item in partyBOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="乙方收款账号"
            prop="receivingAccountId"
          >
            <el-select
              v-model="form.receivingAccountId"
              clearable
              placeholder="请选择乙方收款账号"
              class="width--100"
              ref="branch"
              @visible-change="handleVisible"
            >
              <el-option
                v-for="item in branchOption"
                :key="item.id"
                :label="item.accountNo"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合作项目">
            <el-input
              placeholder="请填写合作项目"
              v-model="form.cooperationProjectsName"
              class="input-with-select"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属组织">
            <span :title="data.startDivisionName">{{data.startDivisionName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合作时间">
            <el-date-picker
              style="width:100%;"
              v-model="timeList"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="$root.pickerOptions"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="合同跟进人"
            prop="handlerId"
          >
            <IhSelectPageUser
              v-model="form.handlerId"
              clearable
              value-key="id"
            >
              <!-- 自定义模板使用 v-slot返回来的data：当前每条的数据；index：每一条数据的下标 -->
              <template v-slot="{ data }">
                <span style="float: left">{{ data.name }}</span>
                <span style="
                      margin-left: 20px;
                      float: right;
                      color: #8492a6;
                      font-size: 13px;
                    ">{{ data.account }}</span>
              </template>
            </IhSelectPageUser>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="成交确认人">
            <el-input
              v-model="form.confirmer"
              placeholder="成交确认人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式">
            <el-input
              v-model="form.confirmerContact"
              placeholder="成交确认人联系方式"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="甲方合同附件">
            <IhUpload
              :file-list="partyFileList"
              size="100px"
              @newFileList="partyNewFileList"
            ></IhUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="盖章版归档">
            <IhUpload
              :file-list="stampFileList"
              size="100px"
              @newFileList="stampNewFileList"
            ></IhUpload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >提 交</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { post_company_getAll } from "@/api/system/index";
import { get_bankAccount_get__companyId } from "@/api/finance/index";

@Component({
  components: {},
})
export default class PartyAAdd extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  partyFileList: any = [];
  stampFileList: any = [];
  timeList: any = [];
  form: any = {
    title: null,
    partyA: [],
    partyBId: null,
    receivingAccountId: null,
    cooperationProjectsName: null,
    cooperationTime: null,
    cooperationEnd: null,
    handlerId: null,
    confirmer: null,
    confirmerContact: null,
  };
  partyBOptions: any = [];
  branchOption: any = [];
  partyList: any = [];
  stampList: any = [];
  rules: any = {
    title: [
      {
        required: true,
        message: "请填写合同标题",
        trigger: "change",
      },
    ],
    partyA: [
      {
        required: true,
        message: "请选择甲方",
        trigger: "change",
      },
    ],
    partyBId: [
      {
        required: true,
        message: "请选择乙方",
        trigger: "change",
      },
    ],
    handlerId: [
      {
        required: true,
        message: "请选择合同跟进人",
        trigger: "change",
      },
    ],
    receivingAccountId: [
      {
        required: true,
        message: "请选择乙方收款账号",
        trigger: "change",
      },
    ],
  };

  partyNewFileList(data: any) {
    this.partyList = [];
    data.forEach((v: any) => {
      this.partyList.push({
        attachmentSuffix: v.name,
        fileNo: v.response[0].fileId,
        type: "ContractAnnex",
      });
    });
  }

  stampNewFileList(data: any) {
    this.stampList = [];
    data.forEach((v: any) => {
      this.stampList.push({
        attachmentSuffix: v.name,
        fileNo: v.response[0].fileId,
        type: "ArchiveAnnex",
      });
    });
  }

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      let arr: any = [];
      arr = this.form.partyA.map((v: any) => ({
        userId: v,
      }));

      let flag = this.timeList && this.timeList.length;
      this.form.cooperationTime = flag ? this.timeList[0] : null;
      this.form.cooperationEnd = flag ? this.timeList[1] : null;
      this.$emit("finish", {
        ...this.form,
        partyA: arr,
        originalList: this.partyList.concat(this.stampList),
      });
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  handleVisible(val: any) {
    if (val) {
      if (!this.form.partyBId) {
        (this.$refs.branch as any).blur();
        this.$message.warning("请先选择乙方信息");
      }
    }
  }
  async changePartyB(val: any) {
    this.branchOption = await get_bankAccount_get__companyId({
      companyId: val,
    });
  }

  async getPartyB() {
    this.partyBOptions = await post_company_getAll({ name: "" });
  }

  created() {
    this.getPartyB();
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px 0 20px;
  }
}
</style>