<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">申领渠道分销合同</p>
      <el-form
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="周期">
              <el-select
                v-model="cycle"
                placeholder="周期"
                clearable
                filterable
                class="width--100"
              >
                <el-option
                  v-for="item in dropOption"
                  :key="item.termId"
                  :label="item.termName"
                  :value="item.termId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方(渠道)公司">
              <el-select
                v-model="channelData"
                placeholder="乙方(渠道)公司"
                clearable
                filterable
                class="width--100"
                value-key="id"
              >
                <el-option
                  v-for="item in channelList"
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
            <el-form-item label="渠道公司等级">
              <el-input placeholder="渠道公司等级"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              <IhSelectPageUser
                v-model="handler"
                clearable
                value-key="id"
                class="width--100"
              >
                <template v-slot="{ data }">
                  <span style="float: left">{{ data.name }}</span>
                  <span style="margin-left: 20px;float: right; color: #8492a6; font-size: 13px">{{ data.account }}</span>
                </template>
              </IhSelectPageUser>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="padding-left-30">
        <el-button
          type="primary"
          class="margin-bottom-17"
          @click="handleOpen()"
        >选择分销合同模板</el-button>
        <el-table :data="templateData">
          <el-table-column
            label="合同主标题"
            prop="fileCode"
          ></el-table-column>
          <el-table-column
            label="甲方公司"
            prop="fileCode"
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="派发佣金标准"
            prop="fileCode"
          ></el-table-column>
          <el-table-column
            label="是否垫佣"
            prop="fileCode"
          ></el-table-column>
          <el-table-column
            label="渠道类型"
            prop="fileCode"
          ></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="150"
          >
            <template>
              <el-link
                type="primary"
                class="margin-right-15"
              >查看参数</el-link>
              <el-link type="primary">预览合同</el-link>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <el-divider>预览</el-divider>
      </div>
      <el-form
        label-width="120px"
        label-position="left"
        class="padding-left-30"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同主标题">
              合同主标题
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同副标题">
              合同副标题
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方公司">
              甲方公司
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方地址">
              甲方地址
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方联系人">
              甲方联系人
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方联系人电话">
              甲方联系人电话
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方公司">
              乙方公司
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方渠道等级">
              乙方渠道等级
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方地址">
              乙方地址
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系人">
              乙方联系人
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方联系人电话">
              乙方联系人电话
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方账户名">
              乙方账户名
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方账号">
              乙方账号
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方开户行">
              乙方开户行
            </el-form-item>
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
              {{handler ? handler.name : '--'}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="代理费计付标准备注"
              label-width="90px"
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
              label-width="90px"
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
              label-width="90px"
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
              label-width="90px"
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
            <el-form-item
              label="违约责任"
              label-width="90px"
            >
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
            <el-form-item
              label="补充条款"
              label-width="90px"
            >
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
          <el-col :span="24">
            <el-form-item
              label="房屋未成交乙方退回代理费期限"
              label-width="280px"
            >
              30
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="房屋未成交乙方退回代理费逾期违约金比例"
              label-width="280px"
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
            <el-form-item label="代理费是否垫佣">
              1个月＜回款周期≤3个月
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="padding-left-30">
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
      <el-form
        label-width="120px"
        label-position="left"
        class="padding-left-30"
      >
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

    <IhDialog
      :show="dialogFormVisible"
      desc="分销合同模板"
    >
      <TemplateDailog
        :data="cycle"
        @cancel="() => (dialogFormVisible = false)"
        @finish="(data) => {
          dialogFormVisible = false;
          templateData = [data]
        }"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TemplateDailog from "./dialog/templateDialog.vue";
import { post_term_getDropDown } from "@/api/project/index";
import { get_channel_getAll } from "@/api/channel/index";

@Component({
  components: { TemplateDailog },
})
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
  private submit() {
    console.log(this.handler);
  }

  created() {
    this.getDropDown();
    this.getChannelAll();
  }
}
</script>