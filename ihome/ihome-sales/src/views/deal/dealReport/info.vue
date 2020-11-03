<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 13:20:35
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-03 13:20:35
-->
<template>
  <ih-page class="text-right">
    <p class="ih-info-title">成交信息</p>
    <el-form
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="成交报告编号">{{infoForm.modelName}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目周期">{{infoForm.contType}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型">{{infoForm.isMarketProject}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务模式">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交渠道等级">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交状态">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否垫佣">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="一手代理团队">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否市场化项目">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务类型">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否代销">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备案情况">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同编号">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="明源房款回笼比例">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数据标志">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交组织">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交阶段">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约类型">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认购价格">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认购日期">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约价格">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约日期">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入日期">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入人">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业绩分配人">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业绩分配日期">{{infoForm.isSame}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="备注">{{infoForm.isSame}}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p class="ih-info-title">房产信息</p>
    <el-form
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="物业类型">{{infoForm.modelName}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="栋座">{{infoForm.contType}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">{{infoForm.isMarketProject}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房产证/预售合同编号">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="房屋地址">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑面积">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="户型">
            <div class="home-type-wrapper">
              <div>3室</div>
              <div>2厅</div>
              <div>1厨</div>
              <div>1卫</div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="优惠告知书"></el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="" label-width="80px">
            <el-table
              class="ih-table"
              :data="infoList">
              <el-table-column
                prop="modelName"
                label="名称"
                min-width="120"
              ></el-table-column>
              <el-table-column
                prop="contType"
                label="优惠告知书编号"
                min-width="120"
              ></el-table-column>
              <el-table-column
                prop="contType"
                label="优惠告知书状态"
                min-width="120"
              ></el-table-column>
              <el-table-column fixed="right" label="操作" width="130">
                <template>
                  <el-link
                    class="margin-right-10"
                    type="primary"
                    @click.native.prevent="preview(scope)"
                  >预览
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p class="ih-info-title">客户信息</p>
    <el-table
      class="ih-table"
      :data="infoList">
      <el-table-column
        prop="modelName"
        label="客户编号"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="客户类型"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="客户名称"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="手机号码"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="证件类型"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="证件编号"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="邮箱"
        min-width="150"
      ></el-table-column>
    </el-table>
    <p class="ih-info-title">中介信息</p>
    <el-table
      class="ih-table"
      :data="infoList">
      <el-table-column
        prop="modelName"
        label="中介公司名称"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="渠道等级"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="经纪人"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="门店"
        min-width="120"
      ></el-table-column>
    </el-table>
    <p class="ih-info-title">收派金额</p>
    <el-table
      class="ih-table"
      :data="infoList">
      <el-table-column
        prop="modelName"
        label="类型"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="甲方/客户"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="收派套餐"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="应收金额"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="应收已收金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="派发佣金金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="派发内场奖励金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="总包业绩金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="分销业绩金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="其他渠道费用(正数为产生，负数为使用)"
        min-width="150"
      ></el-table-column>
    </el-table>
    <el-table
      class="ih-table"
      :data="infoList">
      <el-table-column
        prop="modelName"
        label="本单应收"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="本单业绩"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="其他渠道费用(正数为产生，负数为使用)"
        min-width="150"
      ></el-table-column>
    </el-table>
    <p class="ih-info-title">对外拆佣</p>
    <el-table
      class="ih-table"
      :data="infoList">
      <el-table-column
        prop="modelName"
        label="拆佣对象"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="拆佣名称"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="收款方"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="费用类型"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="已付金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="客户/甲方"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="备注"
        min-width="150"
      ></el-table-column>
    </el-table>
    <p class="ih-info-title">平台费用</p>
    <p>总包</p>
    <el-table
      class="ih-table"
      :data="infoList">
      <el-table-column
        prop="modelName"
        label="角色类型"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="角色业绩上限"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="公司业绩"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="公司业绩比例（%）"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="拆佣金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="拆佣比例（%）"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="角色人"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="店组"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="管理岗1"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="管理岗2"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="管理岗3"
        min-width="150"
      ></el-table-column>
    </el-table>
    <p>分销</p>
    <el-table
      class="ih-table"
      :data="infoList">
      <el-table-column
        prop="modelName"
        label="角色类型"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="角色业绩上限"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="公司业绩"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="公司业绩比例（%）"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="拆佣金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="拆佣比例（%）"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="角色人"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="店组"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="管理岗1"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="管理岗2"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="管理岗3"
        min-width="150"
      ></el-table-column>
    </el-table>
    <p class="ih-info-title">附件</p>
    <el-table
      class="ih-table"
      :data="infoList">
      <el-table-column
        prop="modelName"
        label="类型"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="附件"
        min-width="120"
      ></el-table-column>
    </el-table>
    <p class="ih-info-title">发票信息</p>
    <el-table
      class="ih-table"
      :data="infoList">
      <el-table-column
        prop="modelName"
        label="开票日期"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="发票类型"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="发票代码"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="发票号码"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="抬头"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="发票金额（含税）"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="确认主营（不含税）"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="税额（公式）"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="NC凭证号"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="备注"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="附件"
        min-width="150"
      ></el-table-column>
    </el-table>
    <div class="btn-wrapper">
      <el-button type="primary" @click="viewReviewDetails">查看审核详情</el-button>
    </div>
    <ih-dialog :show="reviewDialog" desc="成交审核记录">
      <ReviewDetailsDialog
        @cancel="() => (reviewDialog = false)"
        @finish="
            () => {
              reviewDialog = false;
            }
          "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ReviewDetailsDialog from "@/views/deal/dealReport/dialog/reviewDetailsDialog.vue";
  import {get_deal_get__id} from "@/api/deal";

  @Component({
    components: {ReviewDetailsDialog},
  })
  export default class DealReportInfo extends Vue {
    infoForm: any = {};
    infoList: any = [{}];
    reviewDialog: any = false;
    dealId: any = null;

    async created() {
      this.dealId = this.$route.query.id;
      if (this.dealId) {
        localStorage.setItem('dealId', this.dealId);
        this.infoForm = await get_deal_get__id({id: this.dealId});
      }
    }

    // 预览
    preview(scope: any) {
      console.log('预览scope', scope);
    }

    // 查看审核详情
    viewReviewDetails() {
      console.log('查看审核详情');
      this.reviewDialog = true;
    }
  }
</script>
<style lang="scss" scoped>
  .home-type-wrapper {
    width: 100%;
    display: flex;

    div {
      flex: 1;
      text-align: center;
    }
  }

  .btn-wrapper {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    margin-top: 20px;
  }
</style>
