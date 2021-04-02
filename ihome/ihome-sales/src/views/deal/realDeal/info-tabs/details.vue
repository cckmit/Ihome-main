<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>成交信息</span>
      </div>
      <p class="p-title">项目信息</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">
            <span>项目周期</span>
            <span class="red">[总包+分销][非代销][非市场化]</span>
          </div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">栋座房号</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
      </el-row>

      <p class="p-title">房产信息</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">物业类型</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">栋座房号</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">建筑面积</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">户型</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">房产证/预售合同编号</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
      </el-row>
      <p class="line"></p>
      <p class="p-title">房产信息</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">合同类型</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">成交阶段</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">签约类型</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">认购价格</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">认购日期</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">签约价格</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">签约日期</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">备案情况</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">现场销售</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">房款回笼比例</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
      </el-row>

      <p class="p-title">拆佣公司</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">一手代理公司</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">一手代理合同</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
      </el-row>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">
            <span>渠道公司</span>
            <span class="red">[总包+分销][非代销][非市场化]</span>
          </div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">经纪人</div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">
            <span>渠道分销合同</span>
            <span class="red">[不垫佣]</span>
          </div>
          <div class="line-item-bottom">xxxx</div>
        </el-col>
      </el-row>
      <p class="line"></p>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>优惠告知书</span>
      </div>
      <div class="file-list">
        <div
          class="file-item-border"
          v-for="(item, index) in fileList"
          :key="index"
        >
          <div class="file-item">
            <div class="file-item-1">
              <div class="file-item-1-left">优惠告知书</div>
              <div class="file-item-1-right">客户待签署</div>
            </div>
            <div class="file-item-1">编号：xxxxxxxxx{{ item }}</div>
            <div class="file-item-1">
              <div class="file-item-1-left special">特殊</div>
              <div class="file-item-1-right">
                <el-link type="primary">预览</el-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>客户信息</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="xxx" label="客户编号" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="客户名称" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="证件类型" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="证件编号" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="邮箱"> </el-table-column>
        </el-table>
      </div>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>收派信息</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="xxx" label="类型" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="甲方/客户" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="应收金额" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="派发佣金金额" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="派发内场金额"> </el-table-column>
          <el-table-column prop="xxx" label="总包业绩金额"> </el-table-column>
          <el-table-column prop="xxx" label="分销业绩金额"> </el-table-column>
        </el-table>
      </div>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>拆佣信息</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="xxx" label="拆佣对象" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="收款方" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="费用类型" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="费用来源" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="金额"> </el-table-column>
          <el-table-column prop="xxx" label="备注"> </el-table-column>
        </el-table>
      </div>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>平台费用信息</span>
      </div>
      <div>
        <p class="p-title">总包费用</p>
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="">
              <p>管理岗分配业绩</p>
              <el-table :data="tableData" style="width: 600">
                <el-table-column prop="date" label="管理岗" width="200">
                </el-table-column>
                <el-table-column prop="name" label="分配金额" width="200">
                </el-table-column>
                <el-table-column prop="address" label="金额比例" width="200">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="xxx" label="角色类型" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="角色业绩上限" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="角色人" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="角色人业绩" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="角色人业绩比例"> </el-table-column>
          <el-table-column prop="xxx" label="拆佣金额"> </el-table-column>
          <el-table-column prop="xxx" label="拆佣比例"> </el-table-column>
          <el-table-column prop="xxx" label="店组"> </el-table-column>
        </el-table>

        <p class="p-title">分销费用</p>
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="">
              <p>管理岗分配业绩</p>
              <el-table :data="tableData" style="width: 600">
                <el-table-column prop="date" label="管理岗" width="200">
                </el-table-column>
                <el-table-column prop="name" label="分配金额" width="200">
                </el-table-column>
                <el-table-column prop="address" label="金额比例" width="200">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="xxx" label="角色类型" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="角色业绩上限" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="角色人" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="角色人业绩" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="角色人业绩比例"> </el-table-column>
          <el-table-column prop="xxx" label="拆佣金额"> </el-table-column>
          <el-table-column prop="xxx" label="拆佣比例"> </el-table-column>
          <el-table-column prop="xxx" label="店组"> </el-table-column>
        </el-table>
      </div>
    </el-card>

    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>附件信息</span>
      </div>
      <div>附件信息</div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class RealDealDetails extends Vue {
  tableData: any = [];
  tableData2: any = [{}];
  fileList: any = [1, 2, 3, 4, 5, 6, 7, 8];
}
</script>
<style lang="scss" scoped>
.card-header {
  text-align: left;
  font-weight: 600;
  font-size: 18px;
}
.p-title {
  font-weight: 600;
  text-align: left;
}
.line-item {
  text-align: left;
  padding-bottom: 15px;
}
.line-item-bottom {
  font-weight: 600;
}
.line {
  border-top: 1px solid #eee;
}

.red {
  color: red;
  margin-left: 10px;
}
.file-list {
  text-align: left;
}
.file-item-border {
  padding: 8px;
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
}
.file-item {
  padding: 10px;
  border: 1px solid #eee;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  overflow: hidden;
}

.file-item-1 {
  display: flex;
  position: relative;
}
.file-item-1-left {
  width: 80px;
  text-align: left;
}
.file-item-1-right {
  flex: 1;
  text-align: right;
}
.special {
  width: 80px;
  height: 28px;
  text-align: center;
  display: inline-block;
  background: red;
  color: #fff;
  transform: rotate(45deg);
  position: absolute;
  left: -41px;
  bottom: -13px;
  font-size: 12px;
}
</style>