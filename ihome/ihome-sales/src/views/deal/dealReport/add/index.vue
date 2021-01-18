<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-23 08:40:30
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-23 09:20:30
-->
<template>
  <div class="deal-add-page-wrapper">
    <component
      ref="child"
      :getContTypeList="getContTypeList"
      :getRefineModelList="getRefineModelList"
      :goAnchor="goAnchor"
      :previewContNo="previewContNo"
      v-bind:is="currentComponent"></component>
    <ih-dialog :show="dialogAddProjectCycle" desc="选择项目周期列表">
      <SelectProjectCycle
        @cancel="() => (dialogAddProjectCycle = false)"
        @finish="
            (data) => {
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddAgency" desc="选择渠道公司列表">
      <AgentCompanyList
        :data="selectableChannelInfo.selectableChannelIds"
        @cancel="() => (dialogAddAgency = false)"
        @finish="
            (data) => {
              finishAddAgency(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddBroker" desc="选择经纪人列表">
      <AddBroker
        :data="channelId"
        @cancel="() => (dialogAddBroker = false)"
        @finish="
            (data) => {
              finishAddBroker(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddNotice" desc="选择优惠告知书列表">
      <SelectNoticeList
        :data="baseInfoByTerm"
        @cancel="() => (dialogAddNotice = false)"
        @finish="
            (data) => {
              finishAddNotice(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddCustomer" desc="选择客户列表">
      <AddCustomer
        @cancel="() => (dialogAddCustomer = false)"
        @finish="
            (data) => {
              finishAddCustomer(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddReceivePackage" desc="选择收派套餐标准">
      <SelectReceivePackage
        :data="receivePackageData"
        @cancel="() => (dialogAddReceivePackage = false)"
        @finish="
            (data) => {
              finishAddReceivePackage(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogViewInfo" desc="来访/成交信息">
      <DealInfo
        @cancel="() => (dialogViewInfo = false)"
        @finish="
            () => {
              dialogViewInfo = false;
            }
          "
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import EntryDealInfo from "@/views/deal/dealReport/add/entryDealInfo.vue"; // 案场岗 - 录入成交信息
  import EntryAchieveAllot from "@/views/deal/dealReport/add/entryAchieveAllot.vue";  // 文员岗 - 录入成交信息
  import SelectProjectCycle from "@/views/deal/dealReport/dialog/selectProjectCycle.vue";
  import AgentCompanyList from "@/views/deal/dealReport/dialog/agentCompanyList.vue";
  import AddBroker from "@/views/deal/dealReport/dialog/addBroker.vue";
  import SelectNoticeList from "@/views/deal/dealReport/dialog/selectNoticeList.vue";
  import AddCustomer from "@/views/deal/dealReport/dialog/addCustomer.vue";
  import SelectReceivePackage from "@/views/deal/dealReport/dialog/selectReceivePackage.vue";
  import DealInfo from "@/views/deal/dealReport/dialog/dealInfo.vue";
  import {
    post_buModelContType_getList,
    post_buModelContType_subList,
    post_pageData_initDistribution // 选择渠道商后带出分销协议
  } from "@/api/deal";
  import {
    post_notice_deal_details__noticeId // 选择优惠告知书后获取关联的优惠告知书
  } from "@/api/contract";

  @Component({
    components: {
      EntryDealInfo,
      EntryAchieveAllot,
      SelectProjectCycle,
      AgentCompanyList,
      AddBroker,
      SelectNoticeList,
      AddCustomer,
      SelectReceivePackage,
      DealInfo
    }
  })
  export default class DealReportEntry extends Vue {
    private currentComponent: any = null;
    private currentBtnType: any = null;

    dialogAddProjectCycle: any = false; // 选择项目周期弹窗标识
    dialogAddAgency: any = false; // 选择渠道公司弹窗标识
    selectableChannelInfo: any = {
      selectableChannelIds: [],
      isMultipleNotice: false,
      cycleId: null
    }; // 可选渠道商id列表
    dialogAddBroker: any = false; // 选择经纪人弹窗标识
    channelId: any = null; // 渠道商ID
    dialogAddNotice: any = false; // 选择优惠告知书弹窗标识
    baseInfoByTerm: any = null; // 项目周期数据 - 初始化优惠告知书需要
    dialogAddCustomer: any = false; // 选择客户弹窗标识
    dialogAddReceivePackage: any = false; // 选择收派套餐弹窗标识
    receivePackageData: any = {
      type: '', // 费用类型
      idList: [] // 可选的收派套餐ids
    }; // 收派套餐data数据
    dialogViewInfo: any = false; // 来访/成交信息弹窗标识

    async created() {
      this.currentBtnType = this.$route.query.btnType;
      // 通过按钮类型来加载不同的页面
      if (this.currentBtnType === 'add') {
        // 新增 --- 文员岗 - 录入成交信息
        this.currentComponent = EntryAchieveAllot;
      } else if (this.currentBtnType === 'declare') {
        // 业绩申报 --- 案场岗 - 录入成交信息
        this.currentComponent = EntryDealInfo;
      }
    }

    // 获取细分业务模式的值
    getRefineModel(value: any = '') {
      let returnValue = '';
      switch(value){
        case 'TotalBagModel' :
          // 总包
          returnValue = 'All';
          break;
        case 'DistriModel' :
          // 分销
          returnValue = 'District';
          break;
        case 'TotalBagDistriModel' :
          // 总包+分销
          returnValue = '';
          break;
        default:
          returnValue = '';
          break;
      }
      return returnValue;
    }

    // 选择项目周期
    selectProject() {
      this.dialogAddProjectCycle = true;
    }

    // 确定选择项目周期
    async finishAddProjectCycle(data: any) {
      // console.log('data', data);
      if (data && data.length > 0) {
        await (this as any).$refs.child.finishAddProjectCycle(data);
      }
      this.dialogAddProjectCycle = false;
    }

    // 选择渠道公司
    selectAgency(info: any = {}) {
      if (info.selectableChannelIds && info.selectableChannelIds.length) {
        this.dialogAddAgency = true;
        this.selectableChannelInfo = info;
      } else {
        this.selectableChannelInfo.selectableChannelIds = [];
        this.selectableChannelInfo.isMultipleNotice = false;
        this.selectableChannelInfo.cycleId = null;
        this.$message.error('暂无可选的渠道商信息');
      }
    }

    // 确定选择渠道公司
    async finishAddAgency(data: any) {
      // console.log('data', data);
      let postData: any = {
        agencyData: [], // 渠道商信息
        contNoList: [] // 分销协议列表
      }
      if (data && data.length > 0) {
        let objData: any = {
          channelId: data[0].channelId, // 渠道商公司ID
          cycleId: this.selectableChannelInfo.cycleId // 周期ID
        }
        const info: any = await post_pageData_initDistribution(objData);
        postData.agencyData = data;
        postData.contNoList = info.contracts;
        await (this as any).$refs.child.finishAddAgency(postData);
      }
      this.dialogAddAgency = false;
    }

    // 选择经纪人
    selectBroker(data: any = null) {
      if (data) {
        this.channelId = data;
      } else {
        this.channelId = null;
      }
      this.dialogAddBroker = true;
    }

    // 确定选择经纪人
    async finishAddBroker(data: any) {
      // console.log('data', data);
      if (data && data.length > 0) {
        await (this as any).$refs.child.finishAddBroker(data);
      }
      this.dialogAddBroker = false;
    }

    // 添加优惠告知书
    handleAddNotice(data: any) {
      this.baseInfoByTerm = data;
      this.dialogAddNotice = !this.dialogAddNotice;
    }

    // 确定选择优惠告知书
    async finishAddNotice(data: any) {
      if (data && data.length > 0) {
        let postData: any = {
          noticeId: data[0].id
        }
        let noticeInfo: any = await post_notice_deal_details__noticeId(postData);
        if (noticeInfo.dealNotices && noticeInfo.dealNotices.length) {
          noticeInfo.dealNotices.forEach((item: any) => {
            item.noticeId = item.id;
            item.addType = "manual";
          });
        }
        if (noticeInfo.customerConvertResponse && noticeInfo.customerConvertResponse.length) {
          noticeInfo.customerConvertResponse.forEach((item: any, index: any) => {
            if (index === 0) {
              item.isCustomer = "Yes";
            } else {
              item.isCustomer = "No";
            }
            item.addId = item.id; // 手动添加的时候保存id --- 为了回显收派金额
          });
        }
        await (this as any).$refs.child.finishAddNotice(noticeInfo);
        this.dialogAddNotice = false;
      }
    }

    // 预览-优惠告知书
    previewNotice(scope: any) {
      window.open(
        `/sales-api/sales-document-cover/file/browse/${scope.row.templateId}`
      );
    }

    // 添加客户
    handleAddCustomer() {
      this.dialogAddCustomer = !this.dialogAddCustomer;
    }

    // 确定选择客户
    async finishAddCustomer(data: any) {
      if (data.length === 0) return
      await (this as any).$refs.child.finishAddCustomer(data);
    }

    // 选择收派套餐
    selectPackage(data: any = {}) {
      if (!data.feeType) return;
      if (data.hasRecord) {
        // 分销模式
        if (!data.contNo) {
          this.$message.error('请先选择分销协议编号！');
          return;
        }
      } else {
        // 非分销模式
        // 合同类型contType + 物业类型propertyType + 细分业务类型refineModel + 立项周期cycleId，这几个条件必须满足
        let tips: any = [];
        if (!data.termId) {
          tips.push('项目周期');
        }
        if (!data.subdivide) {
          tips.push('细分业务模式');
        }
        if (!data.property) {
          tips.push('物业类型');
        }
        if (!data.contType) {
          tips.push('合同类型');
        }
        if (tips.length) {
          this.$message.error(`请先选择${tips.join('，')}`);
          return;
        }
      }
      this.receivePackageData = data;
      this.dialogAddReceivePackage = !this.dialogAddReceivePackage;
    }

    // 判断收派金额信息是否有收派套餐
    hasReceivePackage(data: any = []) {
      let flag: any = false; // 默认无
      if (data && data.length) {
        flag = data.some((item: any) => {
          return (item.showData && item.showData.length > 0);
        });
      }
      return flag;
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
                let total = (prev * 1 * 100 + curr * 1 * 100) / 100;
                return total;
              } else {
                return ((prev * 1 * 100) / 100);
              }
            }, 0);
            sums[index] = Math.round(sums[index] * 100) / 100; // 解决精度缺失问题
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 确定选择收派套餐
    async finishAddReceivePackage(data: any) {
      if (data.length === 0) return;
      await (this as any).$refs.child.finishAddReceivePackage(data);
      this.dialogAddReceivePackage = !this.dialogAddReceivePackage;
    }

    /*
    * 校验收派金额信息模块
    * 自动---是否都有收派套餐
    * 手动---除了其他渠道费用外是否都大于等于0
    * params: data: Array --- 需要判断的收派金额数组
    * params: way: string --- 计算方式---auto:自动；Manual:手动
    * */
    validReceiveData(data: any = [], way: any = "Auto") {
      if (data.length === 0) return false;
      let flag: any = true;
      if (way === 'Auto') {
        // 自动
        flag = data.every((item: any) => {
          return (item.showData && item.showData.length > 0);
        });
      } else {
        // 手动
        data.forEach((item: any) => {
          if ([null, undefined, ""].includes(item.receiveAmount)) {
            flag = false;
          }
          if ([null, undefined, ""].includes(item.commAmount)) {
            flag = false;
          }
          if ([null, undefined, ""].includes(item.rewardAmount)) {
            flag = false;
          }
          if ([null, undefined, ""].includes(item.totalPackageAmount)) {
            flag = false;
          }
          if ([null, undefined, ""].includes(item.distributionAmount)) {
            flag = false;
          }
        })
      }
      return flag;
    }

    // 初始化收派金额信息，置为0
    initReceiveVOS(data: any = []) {
      if (data && data.length > 0) {
        data.forEach((item: any) => {
          this.$set(item, 'showData', []);
          item.receiveAmount = item.receiveAmount ? item.receiveAmount : 0;
          item.commAmount = item.commAmount ? item.commAmount : 0;
          item.rewardAmount = item.rewardAmount ? item.rewardAmount : 0;
          item.totalPackageAmount = item.totalPackageAmount ? item.totalPackageAmount : 0;
          item.distributionAmount = item.distributionAmount ? item.distributionAmount : 0;
          item.otherChannelFees = item.otherChannelFees ? item.otherChannelFees : 0;
        })
      }
      return data;
    }

    // 查看来访/成交确认信息
    handleViewDealInfo() {
      this.dialogViewInfo = !this.dialogViewInfo;
    }

    // 根据业务模式获取合同类型选项
    async getContTypeList(code: any) {
      if (!code) return [];
      let ContType: any = (this as any).$root.dictAllList('ContType');
      let list: any = await post_buModelContType_getList({modelCode: code});
      let contTypeList: any = []; // 初始化
      if (list && list.length > 0 && ContType && ContType.length > 0) {
        if (list[0].contTypeList && list[0].contTypeList.length > 0) {
          list[0].contTypeList.forEach((list: any) => {
            ContType.forEach((item: any) => {
              if (list === item.code) {
                contTypeList.push(item);
              }
            });
          });
        }
      }
      return contTypeList;
    }

    // 根据业务模式获取细分业务模式选项
    async getRefineModelList(code: any) {
      if (!code) return [];
      let Subdivide: any = (this as any).$root.dictAllList('Subdivide'); // 细分业务类型字典
      let list: any = await post_buModelContType_subList({modelCode: code});
      let refineModelList: any = [];
      if (list && list.length > 0 && Subdivide && Subdivide.length > 0) {
        list.forEach((list: any) => {
          Subdivide.forEach((item: any) => {
            if (list === item.code) {
              refineModelList.push(item);
            }
          });
        });
      }
      return refineModelList;
    }

    // 预览分销协议
    previewContNo(contractNo: any) {
      if (!contractNo) {
        this.$message.error('请先选择需要预览的分销协议');
      } else {
        // 预览
        let router = this.$router.resolve({
          path: `/distribution/info`,
          query: {
            contractNo: contractNo
          },
        });
        window.open(router.href, "_blank");
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
  }
</script>
<style lang="scss" scoped>
  .deal-add-page-wrapper {
    width: 100%;
    box-sizing: border-box;
  }
</style>
