<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">标准渠道分销合同申领</p>
      <el-form
        label-width="90px"
        class="padding-left-20"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="合同类型">标准渠道分销合同</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同主标题">合同主标题</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同副标题">合同副标题</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="项目名称">项目名称</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方公司">甲方公司</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方地址">甲方地址</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方联系人">甲方联系人</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="甲方联系人电话"
              class="formItem"
            >甲方联系人电话</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方公司">乙方公司</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="乙方渠道等级"
              class="formItem"
            >乙方渠道等级</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方地址">乙方地址</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系人">乙方联系人</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方联系人电话">乙方联系人电话</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方账户名">乙方账户名</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方账号">乙方账号</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方开户行">乙方开户行</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作期限">
              2020-09-01 -- 2020-09-30
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              合同跟进人
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="代理费计付标准备注"
              class="formItem"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                placeholder="代理费计付标准备注"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="客户成交以及确认"
              class="formItem"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                placeholder="客户成交以及确认"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="代理费结算条件"
              class="formItem"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                placeholder="代理费结算条件"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="代理费结算方式"
              class="formItem"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                placeholder="代理费结算方式"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="违约责任">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                placeholder="违约责任"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="补充条款">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                placeholder="补充条款"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="房屋未成交乙方退回代理费期限"
              class="formItem"
              label-width="160px"
            >
              30
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="房屋未成交乙方退回代理费逾期违约金比例"
              class="formItem"
              label-width="160px"
            >
              5%
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="渠道类型">
              大型中介/一级平台
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="代理费是否垫佣"
              class="formItem"
            >
              1个月＜回款周期≤3个月
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <el-table>
            <el-table-column
              label="物业类型"
              prop="fileCode"
            ></el-table-column>
            <el-table-column
              label="佣金分类"
              prop="fileCode"
              min-width="200"
            ></el-table-column>
            <el-table-column
              label="条件"
              prop="fileCode"
            ></el-table-column>
            <el-table-column
              label="派发佣金标准"
              prop="fileCode"
            ></el-table-column>
          </el-table>
          <br />
        </div>
        <el-row>
          <el-col :span="18">
            <el-form-item label="合同电子版">
              <el-button type="success">预览电子版</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center">
        <el-button
          type="primary"
          @click="submit()"
        >提交</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_term_getDropDown } from "@/api/project/index";
import { get_channel_getAll, get_channel_get__id } from "@/api/channel/index";

@Component({})
export default class DistributionApply extends Vue {
  private dialogFormVisible = false;
  private dropOption: any = [];
  private channelList: any = [];
  private cycle = "";
  private channelData: any = null;
  private handler: any = null;
  private templateData: any = [];

  private handleOpen(): void {
    if (!this.cycle) {
      this.$message.warning("请选择周期信息");
      return;
    }
    this.dialogFormVisible = true;
  }
  private async getDropDown(): Promise<void> {
    this.dropOption = await post_term_getDropDown();
  }
  private async getChannelAll(): Promise<void> {
    this.channelList = await get_channel_getAll();
  }
  private async getChannelInfo(item: any) {
    let res = await get_channel_get__id({ id: item.id });
    console.log(res);
  }
  private submit() {
    console.log(this.handler);
  }

  created() {
    this.getDropDown();
    this.getChannelAll();
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>
