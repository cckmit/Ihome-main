<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>流水汇总</span>
      </div>
      <div>
        <el-row>
          <el-col :span="6" v-for="(item, index) in waterList" :key="index">
            <div class="water-item">
              <div class="water-item-1">
                <div class="water-item-1-left">应收金额{{ item }}</div>
                <div class="water-item-1-right">开发商已签字</div>
              </div>
              <div class="water-item-2">70,000.00</div>
              <div class="water-item-3"></div>
              <div class="water-item-4">
                <span>服务费： </span>
                <span>10,000.00</span>

                <span style="margin-left: 10px">代理费：</span>
                <span>60,000.00</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br />

    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>收款明细</span>
      </div>
      <div>
        <p class="p-title">
          <span>客户服务费</span>
          <span class="red"
            >【应收：10,000.00 已收：10,000.00 未收：0.00】</span
          >
        </p>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="xxx" label="收款编号"> </el-table-column>
          <el-table-column prop="xxx" label="收款金额"> </el-table-column>
          <el-table-column prop="xxx" label="收款状态"> </el-table-column>
          <el-table-column prop="xxx" label="经办人"> </el-table-column>
          <el-table-column prop="xxx" label="业务编号"> </el-table-column>
          <el-table-column prop="xxx" label="凭证号"> </el-table-column>
          <el-table-column prop="xxx" label="支付时间"> </el-table-column>
          <el-table-column prop="xxx" label="对账时间"> </el-table-column>
          <el-table-column prop="xxx" label="确认时间"> </el-table-column>
        </el-table>
      </div>
      <p class="p-title">
        <span>开发商代理费-广州番禺雅居乐房地产开发有限公司</span>
        <span class="red"
          >【应收：30,000.00 已收：20,000.00 未收：10,000.00】</span
        >
      </p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="xxx" label="收款编号"> </el-table-column>
        <el-table-column prop="xxx" label="收款金额"> </el-table-column>
        <el-table-column prop="xxx" label="收款状态"> </el-table-column>
        <el-table-column prop="xxx" label="经办人"> </el-table-column>
        <el-table-column prop="xxx" label="业务编号"> </el-table-column>
        <el-table-column prop="xxx" label="凭证号"> </el-table-column>
        <el-table-column prop="xxx" label="支付时间"> </el-table-column>
        <el-table-column prop="xxx" label="对账时间"> </el-table-column>
      </el-table>
      <p class="p-title">
        <span>开发商代理费-广州中耀实业投资有限公司 </span>
        <span class="red">【应收：30,000.00 已收：30,000.00 未收：0.00】</span>
      </p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="xxx" label="收款编号"> </el-table-column>
        <el-table-column prop="xxx" label="收款金额"> </el-table-column>
        <el-table-column prop="xxx" label="收款状态"> </el-table-column>
        <el-table-column prop="xxx" label="经办人"> </el-table-column>
        <el-table-column prop="xxx" label="业务编号"> </el-table-column>
        <el-table-column prop="xxx" label="凭证号"> </el-table-column>
        <el-table-column prop="xxx" label="支付时间"> </el-table-column>
        <el-table-column prop="xxx" label="对账时间"> </el-table-column>
      </el-table>
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>开票信息</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="xxx" label="业务单号"> </el-table-column>
          <el-table-column prop="xxx" label="业务单号"> </el-table-column>
          <el-table-column prop="xxx" label="发票类型"> </el-table-column>
          <el-table-column prop="xxx" label="发票金额(含税)"> </el-table-column>
          <el-table-column prop="xxx" label="税率"> </el-table-column>
          <el-table-column prop="xxx" label="确认主营"> </el-table-column>
          <el-table-column prop="xxx" label="税额"> </el-table-column>
          <el-table-column prop="xxx" label="收款方"> </el-table-column>
          <el-table-column prop="xxx" label="开票状态"> </el-table-column>
          <el-table-column prop="xxx" label="开票日期"> </el-table-column>
        </el-table>
      </div>
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>付款明细</span>
      </div>
      <div>
        <p class="p-title">
          <span> 服务费对外拆佣 </span>
          <span class="red">
            【应付：2,000.00 已付：2,000.00 未付：0.00】
          </span>
        </p>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="xxx" label="付款单号"> </el-table-column>
          <el-table-column prop="xxx" label="付款金额"> </el-table-column>
          <el-table-column prop="xxx" label="付款状态"> </el-table-column>
          <el-table-column prop="xxx" label="经办人"> </el-table-column>
          <el-table-column prop="xxx" label="收款方类型"> </el-table-column>
          <el-table-column prop="xxx" label="收款方"> </el-table-column>
          <el-table-column prop="xxx" label="付款时间"> </el-table-column>
        </el-table>
        <p class="p-title">
          <span> 代理费对外拆佣-广州番禺雅居乐房地产开发有限公司 </span>
          <span class="red">
            【应付：6,000.00 已付：4,000.00 未付：2,000.00】
          </span>
        </p>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="xxx" label="付款单号"> </el-table-column>
          <el-table-column prop="xxx" label="付款金额"> </el-table-column>
          <el-table-column prop="xxx" label="付款状态"> </el-table-column>
          <el-table-column prop="xxx" label="经办人"> </el-table-column>
          <el-table-column prop="xxx" label="收款方类型"> </el-table-column>
          <el-table-column prop="xxx" label="收款方"> </el-table-column>
          <el-table-column prop="xxx" label="付款时间"> </el-table-column>
        </el-table>
      </div>
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>退款明细</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="xxx" label="待退款项编号"> </el-table-column>
          <el-table-column prop="xxx" label="退款金额"> </el-table-column>
          <el-table-column prop="xxx" label="退款状态"> </el-table-column>
          <el-table-column prop="xxx" label="退款人信息"> </el-table-column>
          <el-table-column prop="xxx" label="生成日期"> </el-table-column>
          <el-table-column prop="xxx" label="退款完成日期"> </el-table-column>
          <el-table-column prop="xxx" label="关联退款申请单编号">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_deal_getDealSumAmount__id } from "../../../../api/deal/index";
@Component({
  components: {},
})
export default class FlowingWater extends Vue {
  tableData: any = [];
  waterList: any = [1, 2, 3, 4, 5, 6, 7, 8];
  info: any = {};
  async created() {
    this.info = await get_deal_getDealSumAmount__id({
      id: this.$route.query.id,
    });
    console.log(this.info);
  }
}
</script>
<style lang="scss" scoped>
.card-header {
  text-align: left;
  font-weight: 600;
  font-size: 18px;
}
.red {
  color: red;
  margin-left: 10px;
}
.p-title {
  font-weight: 600;
  text-align: left;
}
.water-item {
  margin: 10px;
  padding: 10px;
  border: 1px solid #eee;
}
.water-item-1 {
  display: flex;
}
.water-item-1-left {
  width: 80px;
}
.water-item-1-right {
  flex: 1;
  text-align: right;
}
.water-item-2 {
  text-align: left;
  font-weight: 500;
  font-size: 30px;
}
.water-item-3 {
  border-top: 1px solid #ccc;
  margin-top: 10px;
  margin-bottom: 5px;
}
.water-item-4 {
  text-align: left;
}
</style>