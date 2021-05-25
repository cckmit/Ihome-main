<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2021-05-24 17:20:02
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-24 20:02:11
-->
<template>
  <ih-page class="text-left margin-bottom-30">
    <el-row class="ih-info-line">
      <el-col :span="12" class="text-left">
        <h3>成交报告编号：{{ postData.dealCode }}</h3>
      </el-col>
      <el-col :span="12" class="text-right">
        <h3>【{{ postData.dealOrg }}】</h3>
      </el-col>
    </el-row>
    <div class="deal-info-title">
      <div>
        <div>录入人：{{postData.entryPerson }}</div>
        <div>录入日期：{{postData.createTime ? postData.createTime.substring(0, 10) : '-'}}</div>
      </div>
      <div>
        <div>业绩分配人：{{postData.alloter }}</div>
        <div>业绩分配日期：{{postData.allotDate ? postData.allotDate.substring(0, 10) : '-'}}</div>
      </div>
      <div>
        <div>业绩确认日期：{{postData.alloter }}</div>
      </div>
      <div class="status-wrapper">
        <div>状态</div>
        <div class="status">
          <IhStatusComponent
            :status="postData.status"
            :status-obj="{
                warning: 'Draft',
                success: 'ReviewPassed'
            }">
            <div>{{ $root.dictAllName(postData.status, "DealStatus") }}</div>
          </IhStatusComponent>
        </div>
      </div>
      <div class="status-wrapper">
        <div>计算方式</div>
        <div class="status">
          <IhStatusComponent
            :status="postData.calculation"
            :status-obj="{
                warning: 'Manual',
                success: 'Auto'
            }">
            <div>{{ $root.dictAllName(postData.calculation, "DealCalculateWay") }}</div>
          </IhStatusComponent>
        </div>
      </div>
      <div class="status-wrapper">
        <div>数据标志</div>
        <div class="status">
          <IhStatusComponent
            :status="postData.dataSign"
            :status-obj="{
                warning: 'NoMingYuan',
                success: 'WholeMingYuan'
            }">
            <div>{{ $root.dictAllName(postData.dataSign, "DealDataFlag") }}</div>
          </IhStatusComponent>
        </div>
      </div>
    </div>
    <br />
    <div v-for="(item, index) in componentList" :key="index">
      <component
        :key="index"
        v-if="item.isShowList.includes(currentType) && (!item.charge || item.charge !== postData.charge)"
        :infoForm="postData"
        v-bind:is="item.componentName"></component>
    </div>

    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>审核意见</span>
        <div class="">
          <el-button type="primary" @click="handleViewReviewDetail">查看审核详情</el-button>
          <el-button type="primary" @click="handleViewInfoDetail">查看原成交详情</el-button>
        </div>
      </div>
      <el-form
        :model="postData"
        :rules="rules"
        ref="ruleForm"
        label-width="20px"
        class="demo-ruleForm">
        <el-row class="audit-info">
          <el-col>
            <el-form-item label="" :prop="failBtn ? 'postRemarks' : 'empty'">
              <el-input
                type="textarea"
                :rows="6"
                :maxlength="500"
                show-word-limit
                v-model="postData.postRemarks"
                placeholder="请输入审核意见"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <br />

    <div class="btn-wrapper">
      <el-button :loading="btnLoading" @click="handleBack()">取消</el-button>
      <el-button :loading="btnLoading" type="danger" @click="handleFail()">驳回</el-button>
      <el-button :loading="btnLoading" type="success" @click="handlePass()">通过</el-button>
    </div>
    <ih-dialog :show="dialogReviewDeal" desc="成交审核操作记录信息">
      <ReviewDetailsDialog
        :data="reviewData"
        @cancel="() => (dialogReviewDeal = false)"
        @finish="() => {dialogReviewDeal = false}"
      />
    </ih-dialog>
    <ih-dialog :show="dialogSelectDate" desc="审核业绩确认时间">
      <ReviewDate
        :data="reviewData"
        :loading="btnLoading"
        @cancel="() => (dialogSelectDate = false)"
        @finish="
            (data) => {
              finishSelectDate(data);
            }
          "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ReviewDetailsDialog from "@/views/deal/dealReport/dialog/reviewDetailsDialog.vue";
  import ReviewDate from "@/views/deal/dealReport/dialog/reviewDate.vue";
  import {
    get_deal_get__id, // 根据ID查询成交详情
    post_processRecord_rejectDeal, // 驳回
    post_processRecord_reviewDeal, // 通过
  } from "@/api/deal";
  import {
    post_notice_customer_information // 根据成交id获取优惠告知书
  } from "@/api/contract";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {ReviewDate, ReviewDetailsDialog},
  })
  export default class ReviewDealInfo extends Vue {
    private btnLoading = false;

    private componentList: any = [
      {
        isShowList: ['mainDeal', 'baseDeal'], // 展示组件的逻辑列表
        componentName: () => import('./info-components/baseInfo.vue'), // 成交信息
      },
      {
        charge: 'Agent', // 纯代理费不显示优惠告知书信息
        isShowList: ['mainDeal', 'baseDeal'],
        componentName: () => import('./info-components/noticeInfo.vue'), // 优惠告知书信息
      },
      {
        isShowList: ['mainDeal', 'baseDeal'],
        componentName: () => import('./info-components/customerInfo.vue'), // 客户信息
      },
      {
        isShowList: ['mainDeal'],
        componentName: () => import('./info-components/receiveInfo.vue'), // 收派信息
      },
      {
        isShowList: ['ChangeAchieveInf', 'RetreatRoom'],
        componentName: () => import('./info-components/channelCommInfo.vue'), // 拆佣信息
      },
      {
        isShowList: ['mainDeal', 'achieveDeal'],
        componentName: () => import('./info-components/achieveInfo.vue'), // 平台费用信息
      },
      {
        isShowList: ['mainDeal', 'baseDeal'],
        componentName: () => import('./info-components/documentInfo.vue'), // 附件信息
      }
    ]; // 详情的各个模块

    postData: any = {
      contractKind: null,
      charge: null, // 收费类型 --- 用于是否展示优惠告知书：纯代理费不展示优惠告知书
      parentId: null,
      dealCode: null,
      dealOrgName: null,
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
      documentLists: [], // 附件信息
      processRecordList: [], // 审核信息
      postRemarks: null,
      status: null, // 成交报告的状态
    };
    rules: any = {
      postRemarks: [
        {required: true, message: "驳回的时候审核意见不能为空", trigger: "change"},
      ],
      empty: []
    }
    id: any = null; // 成交id
    currentType: any = null; // 改变成交信息的类型
    dialogReviewDeal: any = false; // 成交审核记录弹窗标识
    dialogSelectDate: any = false; // 选择业绩确认时间
    selectData: any = null; // 业绩时间
    reviewData: any = null; // 审核详情
    failBtn: any = false; // 点击通过/驳回按钮

    async created() {
      this.id = this.$route.query.id;
      this.currentType = this.$route.query.type;
      // console.log('currentType', this.currentType);
      if (this.id) {
        await this.init();
      }
    }

    // 初始化数据
    async init() {
      let info: any = await get_deal_get__id({id: this.id});
      // this.postData = (this as any).$tool.deepClone(info || {});
      this.postData = {
        ...this.postData,
        ...info
      };
      // 初始化优惠告知书信息
      if (info && info.charge !== 'Agent') {
        await this.getInformation(info?.id, info?.parentId, info?.cycleId);
      }
    }

    // 根据成交id获取优惠告知书列表
    async getInformation(id: any = '', parentId: any = '', cycleId: any = '') {
      if (!id || !parentId || !cycleId) return;
      if (id !== parentId) {
        const idList: any = await post_notice_customer_information({dealId: id, cycleId: cycleId});
        const parentIdList: any = await post_notice_customer_information({dealId: parentId, cycleId: cycleId});
        console.log('有补充成交');
        this.postData.offerNoticeList = [...idList, ...parentIdList];
      } else {
        const list: any = await post_notice_customer_information({dealId: this.id, cycleId: cycleId});
        console.log('无补充成交');
        if (list && list.length > 0) {
          this.postData.offerNoticeList = list;
        } else {
          this.postData.offerNoticeList = [];
        }
      }
    }

    // 查看审核记录
    handleViewReviewDetail() {
      this.dialogReviewDeal = true;
      this.reviewData = this.postData.processRecordList;
    }

    // 查看原成交详情
    handleViewInfoDetail() {
      console.log(this.postData.parentId);
      window.open(`/web-sales/dealReport/info?id=${this.postData.parentId}&type=ID`);
    }

    // 通过
    async handlePass() {
      // console.log('通过');
      this.failBtn = false;
      // 判断成交报告的状态
      if (this.postData.status === 'BranchBusinessManageUnreview') {
        // 最后一个节点审核通过时，需要选择业绩确认时间
        this.dialogSelectDate = true;
      } else {
        this.selectData = null;
        await this.submitPass();
      }
    }

    // 确定业绩时间
    async finishSelectDate(data: any) {
      this.selectData = data;
      // console.log(this.selectData);
      await this.submitPass();
    }

    async submitPass() {
      try {
        this.btnLoading = true;
        let postData: any = {
          dealId: this.id,
          remark: this.postData.postRemarks,
          achieveConfirmTime: this.selectData
        }
        await post_processRecord_reviewDeal(postData);
        this.dialogSelectDate = false;
        this.btnLoading = false;
        this.$goto({
          path: "/dealReport/list",
        });
      } catch (error) {
        console.log(error);
        this.btnLoading = false;
      }
    }

    // 驳回
    handleFail() {
      this.failBtn = true;
      this.$nextTick(() => {
        (this.$refs["ruleForm"] as ElForm).validate(this.submitFail);
      });
    }

    @NoRepeatHttp()
    async submitFail(valid: any) {
      if (valid) {
        try {
          this.btnLoading = true;
          let postData: any = {
            dealId: this.id,
            remark: this.postData.postRemarks
          }
          await post_processRecord_rejectDeal(postData);
          this.btnLoading = false;
          this.$goto({
            path: "/dealReport/list",
          });
        } catch (error) {
          console.log(error);
          this.btnLoading = false;
        }
      }
    }

    // 返回
    async handleBack() {
      this.$goto({
        path: "/dealReport/list",
      });
    }
  }
</script>
<style lang="scss" scoped>
.deal-info-title {
  //width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 15px 0px 20px;

  &>div {
    flex: 3;
    &>div {
      box-sizing: border-box;
      margin-bottom: 8px;
    }
  }

  .status-wrapper {
    text-align: right;
    flex: 1;

    .status {
      //font-size: 16px;
      font-weight: 700;

      /deep/.ih-status-dot {
        justify-content: flex-end;
      }
    }
  }
}

/deep/ .ih-info-line {
  padding: 0 10px 10px 10px;
}
/deep/ .el-card__header {
  background: #f9f9f9;
}

.btn-wrapper {
  //width: 100%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  text-align: right;
  padding-right: 20px;
  margin: 0 20px;
  //text-align: center;
  box-sizing: border-box;
  //margin-top: 20px;
  z-index: 10;
}
</style>
<style lang="scss">
.font-weight-600 {
  font-weight: 600;
  font-size: 15px;
}
.card-header {
  text-align: left;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  &>div {
    flex: 1;
    text-align: right;
  }
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
  width: 25%;
  box-sizing: border-box;
}

.file-item {
  padding: 10px;
  border: 1px solid #eee;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.file-item-border :hover {
  .floating-layer {
    display: block;
  }
}
.floating-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgba($color: #000000, $alpha: 0.5);
  left: 0px;
  top: 0px;
  z-index: 10;
  display: none;
}
.file-pre {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-pre-btn {
  color: #fff;
  text-decoration: none;
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
.Invalidation {
}
.WaitBeSigned {
  color: #f56c6c;
}
.BecomeEffective {
  color: #19be6b;
}
</style>
