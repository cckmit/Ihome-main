<!--
 * @Description: 甲方/中介战略协议详情页
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 14:41:06
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-11 08:46:21
-->
<template>
  <IhPage class="text-left strategy-info">
    <template #info>
      <p class="ih-info-title">基础信息</p>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="padding-left-30"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题">
              {{ruleForm.title}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-form-item label="协议类型">
            {{ $root.dictAllName(ruleForm.agreementType, 'AgreementType') }}
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方">
              {{ruleForm.partyA}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方">
              {{ruleForm.partyB}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="协议时间">
              {{ruleForm.beginTime}} 至 {{ruleForm.endTime}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="协议编号">
              {{ruleForm.strategyCode}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归档编号">
              <span>{{ruleForm.fileCode}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归档状态">
              <span v-if="$route.name === 'StrategyDetail'">
                {{$root.dictAllName(ruleForm.fileState, 'FileState')}}
              </span>
              <el-select
                v-model="ruleForm.fileState"
                placeholder="归档状态"
                clearable
                class="width--100"
                disabled
              >
                <el-option
                  v-for="item in $root.dictAllList('FileState')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态">
              <span v-if="$route.name === 'StrategyDetail'">
                {{$root.dictAllName(ruleForm.state, 'StrategyState')}}
              </span>
              <el-select
                v-model="ruleForm.state"
                placeholder="当前状态"
                clearable
                v-else
                class="width--100"
                disabled
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
                :removePermi="false"
                :file-list="fileList"
                size="100px"
                @newFileList="handleNoSealFile"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="盖章版归档">
              <IhUpload
                :removePermi="false"
                :file-list="fileList2"
                size="100px"
                class="update"
                @newFileList="handleSealFile"
              ></IhUpload>
              <el-button
                type="primary"
                class="upload-button"
                @click="duplicate()"
              >提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="annotation padding-left-20">*注：上传附件后请点击提交按钮保存</div>
        <!-- <el-row>
          <div
            class="text-center"
            v-if="$route.name === 'scanArchived'"
          >
            <el-button type="primary">扫描件归档</el-button>
          </div>
        </el-row> -->
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { get_strategy_detail__id } from "@/api/contract/index";

@Component({})
export default class StrategyDetail extends Vue {
  private ruleForm: any = {};
  private fileList: Array<object> = [];
  private fileList2: Array<object> = [];

  private noSealFile: any = [];
  private sealFile: any = [];

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
  private duplicate() {
    //
  }
  private async getInfo(): Promise<void> {
    let id = this.$route.query.id;
    if (id) {
      this.ruleForm = await get_strategy_detail__id({ id: id });
      this.ruleForm.originalList.forEach((item: any) => {
        switch (item.type) {
          case "NoSeal":
            this.fileList.push({
              name: item.attachmentSuffix,
              fileId: item.url,
            });
            break;
          case "Seal":
            this.fileList2.push({
              name: item.attachmentSuffix,
              fileId: item.url,
            });
            break;
        }
      });
    }
  }

  created() {
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
.strategy-info {
  /deep/ .upload {
    display: inline-block;
  }
  .upload-button {
    position: absolute;
    bottom: 0;
    margin-left: 15px;
  }
  .annotation {
    color: #d9001b;
    font-size: 14px;
  }
}
</style>
