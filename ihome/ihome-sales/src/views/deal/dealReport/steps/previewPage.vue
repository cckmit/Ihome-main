<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 13:20:35
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-11 11:40:30
-->
<template>
  <ih-page class="text-left">
    <p id="anchor-1" class="ih-info-title">成交信息</p>
    <el-form
      :model="infoForm"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="成交报告编号">{{infoForm.dealCode}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目周期">{{infoForm.projectCycle}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务模式">
            {{$root.dictAllName(infoForm.modelName, 'BusinessModel')}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型">
            {{$root.dictAllName(infoForm.contType, 'ContType')}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道商">{{infoForm.projectCycle}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="细分业务模式">
            {{!!infoForm.refineModel ? infoForm.refineModel === 'All' ? '总包' : '分销' : ''}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="一手代理团队">{{infoForm.oneAgentTeam}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否市场化项目">
            {{!!infoForm.isMarketProject ? infoForm.isMarketProject === 'Yes' ? '是' : '否' : ''}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交组织">{{infoForm.dealOrgId}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备案情况">
            {{!!infoForm.recordState ? infoForm.recordState === 'Has' ? '有' : '无' : ''}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="明源房款回笼比例">{{infoForm.returnRatio}}%</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数据标志">
            {{$root.dictAllName(infoForm.dataSign, 'DealDataFlag')}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分销协议编号">{{infoForm.channelLevel}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否垫佣">
            {{!!infoForm.isMat ? infoForm.isMat === 'Yes' ? '是' : '否' : ''}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否代销">
            {{!!infoForm.isConsign ? infoForm.isConsign === 'Yes' ? '是' : '否' : ''}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约类型">
            {{$root.dictAllName(infoForm.signType, 'SignUp')}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认购价格">{{infoForm.subscribePrice}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认购日期">{{infoForm.subscribeDate}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约价格">{{infoForm.signPrice}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约日期">{{infoForm.signDate}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入日期">{{infoForm.isSame}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入人">{{infoForm.entryDate}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交阶段">
            {{$root.dictAllName(infoForm.stage, 'DealStage')}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交状态">
            {{$root.dictAllName(infoForm.status, 'DealStatus')}}
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="备注">{{infoForm.remarks}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现场销售">{{infoForm.allotDate}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业绩分配人">{{infoForm.alloter}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业绩分配日期">{{infoForm.allotDate}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计算方式">{{infoForm.remarks}}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p id="anchor-2" class="ih-info-title">房产信息</p>
    <el-form
      :model="infoForm"
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="物业类型">
            {{$root.dictAllName(infoForm.house.propertyType, 'PropertyEnum')}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="栋座">{{infoForm.house.buildingName}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">{{infoForm.house.roomNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房产证/预售合同编号">{{infoForm.house.propertyNo}}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="房产证地址">{{infoForm.house.address}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑面积">{{infoForm.house.area}}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="户型">
            <div class="home-type-wrapper">
              <div>{{infoForm.house.room}}室</div>
              <div>{{infoForm.house.hall}}厅</div>
              <div>{{infoForm.house.kitchen}}厨</div>
              <div>{{infoForm.house.toilet}}卫</div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p id="anchor-3" class="ih-info-title">优惠告知书信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.offerNoticeList">
          <el-table-column prop="offerNoticeName" label="名称" min-width="120"></el-table-column>
          <el-table-column prop="offerNoticeCode" label="优惠告知书编号" min-width="120"></el-table-column>
          <el-table-column prop="offerNoticeStatus" label="优惠告知书状态" min-width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="preview(scope)"
              >预览
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-4" class="ih-info-title">客户信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.customerList">
          <el-table-column prop="customerNo" label="客户编号" min-width="120"></el-table-column>
          <el-table-column prop="customerType" label="客户类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.customerType, 'CustType')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="customerName" label="客户名称" min-width="120"></el-table-column>
          <el-table-column prop="customerPhone" label="手机号码" min-width="120"></el-table-column>
          <el-table-column prop="cardType" label="证件类型" min-width="150">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="cardNo" label="证件编号" min-width="150"></el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="150"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-5" class="ih-info-title">渠道信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.agencyList">
          <el-table-column prop="agencyName" label="渠道公司名称" min-width="120"></el-table-column>
          <el-table-column prop="channelLevel" label="渠道等级" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.channelLevel, 'ChannelLevel')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="broker" label="经纪人" min-width="120"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-6" class="ih-info-title">收派金额</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getReceiveSummaries"
          :data="infoForm.receiveList">
          <el-table-column prop="type" label="类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.type, 'FeeType')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120"></el-table-column>
          <el-table-column prop="packageId" label="收派套餐" min-width="120"></el-table-column>
          <el-table-column prop="receiveAmount" label="应收金额" min-width="120"></el-table-column>
          <el-table-column prop="commAmount" label="派发佣金金额" min-width="150"></el-table-column>
          <el-table-column prop="rewardAmount" label="派发内场奖励金额" min-width="150"></el-table-column>
          <el-table-column prop="totalPackageAmount" label="总包业绩金额" min-width="150"></el-table-column>
          <el-table-column prop="distributionAmount" label="分销业绩金额" min-width="150"></el-table-column>
          <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="padding-left: 20px; margin-top: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.receiveAchieveList">
          <el-table-column prop="receiveAmount" label="本单应收" min-width="120"></el-table-column>
          <el-table-column prop="achieveAmount" label="本单业绩" min-width="120"></el-table-column>
          <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-7" class="ih-info-title">对外拆佣</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getCommissionSummaries"
          :data="infoForm.channelCommList">
          <el-table-column prop="target" label="拆佣对象" min-width="120"></el-table-column>
          <el-table-column prop="payee" label="拆佣名称" min-width="120"></el-table-column>
          <el-table-column prop="feeType" label="费用类型" min-width="120"></el-table-column>
          <el-table-column prop="feeType" label="费用来源(客户/甲方)" min-width="120"></el-table-column>
          <el-table-column prop="amount" label="金额" min-width="150"></el-table-column>
          <el-table-column prop="remarks" label="备注" min-width="150"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-8" class="ih-info-title">平台费用</p>
    <p class="ih-type-wrapper">总包</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getAchieveSummaries"
          :data="infoForm.achieveTotalBagList">
          <el-table-column prop="roleType" label="角色类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.roleType, 'DealRole')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="120"></el-table-column>
          <el-table-column prop="corporateAchieve" label="公司业绩" min-width="120"></el-table-column>
          <el-table-column prop="corporateAchieveRatio" label="角色业绩比例（%）" min-width="120"></el-table-column>
          <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
          <el-table-column prop="commFeesRatio" label="拆佣比例（%）" min-width="150"></el-table-column>
          <el-table-column prop="rolerName" label="角色人" min-width="150"></el-table-column>
          <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
          <el-table-column prop="type" label="管理岗" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.commFees}}%</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p class="ih-type-wrapper">分销</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getAchieveSummaries"
          :data="infoForm.achieveDistriList">
          <el-table-column prop="roleType" label="角色类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.roleType, 'DealRole')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="120"></el-table-column>
          <el-table-column prop="corporateAchieve" label="公司业绩" min-width="120"></el-table-column>
          <el-table-column prop="corporateAchieveRatio" label="角色业绩比例（%）" min-width="120"></el-table-column>
          <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
          <el-table-column prop="commFeesRatio" label="拆佣比例（%）" min-width="150"></el-table-column>
          <el-table-column prop="rolerName" label="角色人" min-width="150"></el-table-column>
          <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
          <el-table-column prop="type" label="管理岗" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.commFees}}%</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-9" class="ih-info-title">上传附件</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.documentList">
          <el-table-column prop="fileType" label="类型" min-width="120"></el-table-column>
          <el-table-column prop="fileName" label="附件" min-width="120"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="nav-box">
      <div @click="goAnchor(item.id)" v-for="item in navList" :key="item.id" class="nav-item">{{item.name}}</div>
    </div>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {get_deal_get__id} from "@/api/deal";

  @Component({
    components: {},
  })
  export default class PreviewPage extends Vue {
    infoForm: any = {
      dealCode: null,
      house: {}, // 房产信息
      offerNoticeList: [], // 优惠告知书
      customerList: [], // 客户信息
      agencyList: [], // 渠道信息
      receiveList: [], // 收派金额
      receiveAchieveList: [], // 应收业绩 - 收派信息下
      channelCommList: [], // 对外拆佣信息
      achieveList: [], // 平台费用 - 包含总包和分销
      achieveTotalBagList: [], // 平台费用 - 总包 - 前端拆分
      achieveDistriList: [], // 平台费用 - 分销 - 前端拆分
      documentList: [], // 附件信息
      processRecordList: [] // 审核信息
    };
    dealId: any = null;
    navList: any = [
      {
        id: 1,
        name: '成交信息'
      },
      {
        id: 2,
        name: '房产信息'
      },
      {
        id: 3,
        name: '优惠告知书信息'
      },
      {
        id: 4,
        name: '客户信息'
      },
      {
        id: 5,
        name: '渠道信息'
      },
      {
        id: 6,
        name: '收派金额'
      },
      {
        id: 7,
        name: '对外拆佣'
      },
      {
        id: 8,
        name: '平台费用'
      },
      {
        id: 9,
        name: '上传附件'
      }
    ]; // 锚点列表

    created() {
      this.dealId = this.$route.query.id;
      if (this.dealId) {
        this.init();
      }
    }

    // 初始化数据
    async init() {
      this.infoForm = await get_deal_get__id({id: this.dealId});
      // console.log(this.infoForm);
      // 平台费用 - 拆分总包和分销数据
      if (this.infoForm.achieveList.length > 0) {
        this.infoForm.achieveTotalBagList = [];
        this.infoForm.achieveDistriList = [];
        this.infoForm.achieveList.forEach((list: any) => {
          if (list.type === 'TotalBag') {
            this.infoForm.achieveTotalBagList.push(list);
          } else if (list.type === 'Distri') {
            this.infoForm.achieveDistriList.push(list);
          }
        })
      }
    }

    // 跳转到指定索引的元素
    goAnchor(id: any) {
      this.$nextTick(() => {
        // 获取目标的 offsetTop
        let selector = `#anchor-${id}`;
        let dom = document.querySelector(selector) as any;
        const targetOffsetTop = dom ? dom.offsetTop - 60 : 0;
        // console.log('targetOffsetTop:', targetOffsetTop);
        // 获取当前 offsetTop
        let mainDom =  document.querySelector('.el-main') as any;
        let scrollTop = mainDom ? mainDom.scrollTop : 0;
        // console.log('scrollTop:', scrollTop);
        // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
        const STEP = 50;
        // 定义往下滑函数
        function smoothDown() {
          // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
          if (scrollTop < targetOffsetTop) {
            // 如果和目标相差距离大于等于 STEP 就跳 STEP
            // 否则直接跳到目标点，目标是为了防止跳过了。
            if (targetOffsetTop - scrollTop >= STEP) {
              scrollTop += STEP;
            } else {
              scrollTop = targetOffsetTop;
            }
            mainDom.scrollTop = scrollTop;
            // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
            window.requestAnimationFrame(smoothDown);
          }
        }
        // 定义往上滑函数
        function smoothUp() {
          if (scrollTop > targetOffsetTop) {
            if (scrollTop - targetOffsetTop >= STEP) {
              scrollTop -= STEP;
            } else {
              scrollTop = targetOffsetTop;
            }
            mainDom.scrollTop = scrollTop;
            window.requestAnimationFrame(smoothUp);
          }
        }
        // 判断是往下滑还是往上滑
        if (scrollTop > targetOffsetTop) {
          // 往上滑
          smoothUp();
        } else {
          // 往下滑
          smoothDown();
        }
      })
    }

    // 计算收派金额总计
    getReceiveSummaries(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计金额';
          return;
        }
        if (![0, 1, 2].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 计算对外拆佣合计
    getCommissionSummaries(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if ([4].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 计算平台费用-总包/分销合计
    getAchieveSummaries(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if ([1, 2, 3, 4, 5].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 预览
    preview(scope: any) {
      console.log('预览scope', scope);
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

  .ih-type-wrapper {
    margin-right: 20px;
    box-sizing: border-box;
    border-left: 5px solid #F90;
    padding-left: 5px;
    color: #f90;
    margin-left: 40px;
  }

  .nav-box {
    position: fixed;
    right: 20px;
    top: 30%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #ffffff;
    color: #ffffff;
    background-color: #2B4558;
    z-index: 200;

    .nav-item {
      height: 45px;
      line-height: 45px;
      text-align: center;
      box-sizing: border-box;
      padding: 0px 20px;
      cursor: pointer;

      &:not(:last-child) {
        border-bottom: 1px solid #ffffff;
      }
    }
  }
</style>
