<!--
 * @Description: 甲方/中介战略协议 ‘录入-编辑’ 页
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 14:41:06
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-04 20:06:36
-->
<template>
  <IhPage>
    <template v-slot:info>
      <p class="ih-info-title">基础信息</p>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="padding-left-30"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="标题"
              prop="title"
            >
              <el-input
                v-model="ruleForm.title"
                placeholder="标题"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="协议类型"
              prop="agreementType"
            >
              <el-select
                v-model="ruleForm.agreementType"
                clearable
                @change="handleChange"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('AgreementTypeEnum')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="甲方"
              prop="partyA"
            >
              <el-select
                v-model="ruleForm.partyA"
                placeholder="甲方"
                clearable
                filterable
                class="width--100"
                @focus="handleClick()"
                value-key="id"
              >
                <el-option
                  v-for="(item) in partyAList"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="乙方"
              prop="partyB"
            >
              <el-select
                v-model="ruleForm.partyB"
                placeholder="乙方"
                clearable
                filterable
                class="width--100"
                @focus="handleClick()"
                value-key="id"
              >
                <el-option
                  v-for="(item) in partyBList"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="协议时间"
              prop="timeList"
            >
              <el-date-picker
                style="width:100%;"
                v-model="ruleForm.timeList"
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
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="协议编号">
              <el-input
                v-model="ruleForm.strategyCode"
                disabled
                placeholder="协议编号(自动生成)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归档编号">
              <el-input
                v-model="ruleForm.name"
                placeholder="归档编号"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归档状态">
              <el-select
                v-model="ruleForm.fileState"
                placeholder="归档状态"
                disabled
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('StrategyEnum.FileState')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前状态">
              <el-select
                v-model="ruleForm.state"
                placeholder="当前状态"
                disabled
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('StrategyState')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="未盖章扫描件">
              <IhUpload
                :file-list="fileList"
                @newFileList="handleNoSealFile"
                size="100px"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="盖章版归档">
              <IhUpload
                :file-list="fileList2"
                @newFileList="handleSealFile"
                size="100px"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="text-align:left;">
              <el-button
                type="primary"
                @click="submit('Draft')"
              >保存草稿</el-button>
              <el-button
                type="primary"
                @click="submit('Audit')"
              >提交审核</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";

import {
  post_strategy_create,
  get_strategy_detail__id,
  post_strategy_update,
} from "@/api/contract/index";
import { post_company_listAll } from "@/api/developer/index";
import { post_company_getAll } from "@/api/system/index";
import { get_channel_getAll } from "@/api/channel/index";

@Component({})
export default class StrategyAdd extends Vue {
  private ruleForm: any = {
    beginTime: "",
    endTime: "",
    partyA: null,
    partyB: null,
    title: "",
    agreementType: "",
    timeList: [],
  };
  private noSealFile: any = [
    // {
    //   url: "",
    //   attachmentSuffix: "",
    //   type: "NoSeal",
    // },
  ];
  private sealFile: any = [
    // {
    //   url: "",
    //   attachmentSuffix: "",
    //   type: "Seal",
    // },
  ];
  private partyBList: any = [];
  private partyAList: any = [];
  private myCompany: any = [];
  private devList: any = [];
  private channelList: any = [];
  private fileList: Array<object> = [];
  private fileList2: Array<object> = [];

  private rules: any = {
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
    partyA: [{ required: true, message: "请选择甲方", trigger: "blur" }],
    partyB: [{ required: true, message: "请选择乙方", trigger: "blur" }],
    timeList: [
      { required: true, message: "协议时间不能为空", trigger: "blur" },
    ],
    agreementType: [
      { required: true, message: "协议类型不能为空", trigger: "blur" },
    ],
  };

  private handleNoSealFile(val: any) {
    this.noSealFile = val.map((v: any) => {
      return {
        type: "NoSeal",
        attachmentSuffix: v.name,
        url: v.fileId,
      };
    });
  }
  private handleSealFile(val: any) {
    this.sealFile = val.map((v: any) => {
      return {
        type: "Seal",
        attachmentSuffix: v.name,
        url: v.fileId,
      };
    });
  }
  private handleChange(val: any) {
    this.ruleForm.partyA = null;
    this.ruleForm.partyB = null;
    if (val === "PartyA") {
      this.partyAList = this.devList;
      this.partyBList = this.myCompany;
    } else {
      this.partyAList = this.myCompany;
      this.partyBList = this.channelList;
    }
  }
  private async getMyCompanyList(): Promise<void> {
    this.myCompany = await post_company_getAll({ name: "" });
  }
  private async getDevList(): Promise<void> {
    this.devList = await post_company_listAll({ name: "" });
  }
  private async getChannel(): Promise<void> {
    this.channelList = await get_channel_getAll();
  }
  private handleClick() {
    if (!this.ruleForm.agreementType) {
      this.$message.warning("请选择协议类型");
      return;
    }
  }
  @NoRepeatHttp()
  private submit(state: any) {
    (this.$refs["ruleForm"] as ElForm).validate(async (val) => {
      if (val) {
        let sign = this.ruleForm.timeList && this.ruleForm.timeList.length;
        this.ruleForm.beginTime = sign ? this.ruleForm.timeList[0] : "";
        this.ruleForm.endTime = sign ? this.ruleForm.timeList[1] : "";
        if (this.$route.name === "StrategyAdd") {
          await post_strategy_create({
            ...this.ruleForm,
            originalList: [...this.noSealFile, ...this.sealFile],
            partyA: this.ruleForm.partyA.id,
            partyAName: this.ruleForm.partyA.name,
            partyB: this.ruleForm.partyB.id,
            partyBName: this.ruleForm.partyB.name,
            state,
          });
          this.$message.success("添加成功");
        } else {
          console.log(this.$route.name);
          await post_strategy_update({
            ...this.ruleForm,
            originalList: [...this.noSealFile, ...this.sealFile],
            partyA: this.ruleForm.partyA.id,
            partyAName: this.ruleForm.partyA.name,
            partyB: this.ruleForm.partyB.id,
            partyBName: this.ruleForm.partyB.name,
            state,
          });
          this.$message.success("编辑成功");
        }
      }
    });
  }
  private async getInfo(): Promise<void> {
    let id = this.$route.query.id;
    if (id) {
      let res: any = await get_strategy_detail__id({ id: id });

      this.noSealFile = res.originalList.filter(
        (val: any) => val.type === "NoSeal"
      );
      this.fileList = this.noSealFile.map((item: any) => ({
        name: item.attachmentSuffix,
        fileId: item.url,
      }));
      this.sealFile = res.originalList.filter(
        (val: any) => val.type === "Seal"
      );
      this.fileList2 = this.sealFile.map((item: any) => ({
        name: item.attachmentSuffix,
        fileId: item.url,
      }));
      if (res.agreementType === "PartyA") {
        this.partyAList = this.devList;
        this.partyBList = this.myCompany;
      } else {
        this.partyAList = this.myCompany;
        this.partyBList = this.channelList;
      }
      this.ruleForm = {
        ...res,
        partyA: {
          id: res.partyA,
          name: res.partyAName,
        },
        partyB: {
          id: res.partyB,
          name: res.partyBName,
        },
        timeList: res.beginTime ? [res.beginTime, res.endTime] : [],
      };
      console.log(this.fileList, this.ruleForm);
    }
  }

  created() {
    this.getMyCompanyList();
    this.getDevList();
    this.getChannel();
    this.getInfo();
  }
}
</script>