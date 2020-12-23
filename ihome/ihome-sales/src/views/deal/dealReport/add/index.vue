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
  </div>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import EntryDealInfo from "@/views/deal/dealReport/add/entryDealInfo.vue"; // 案场岗 - 录入成交信息
  import EntryAchieveAllot from "@/views/deal/dealReport/add/entryAchieveAllot.vue";  // 文员岗 - 录入成交信息
  import SelectProjectCycle from "@/views/deal/dealReport/dialog/selectProjectCycle.vue";
  import {
    post_buModelContType_getList,
    post_buModelContType_subList
  } from "@/api/deal";

  @Component({
    components: {
      EntryDealInfo,
      EntryAchieveAllot,
      SelectProjectCycle
    }
  })
  export default class DealReportEntry extends Vue {
    private currentComponent: any = null;
    private currentBtnType: any = null;

    dialogAddProjectCycle: any = false; // 选择项目周期弹窗标识

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
