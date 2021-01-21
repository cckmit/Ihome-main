<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-10 15:17:30
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-10 16:20:10
-->
<template>
  <ih-page class="text-left">
    <div class="supp-deal-wrapper">
      <el-steps :active="currentActiveIndex" align-center finish-status="success">
        <el-step
          v-for="(item, index) in currentStepsList"
          :key="index"
          :title="item.title"
          :description="item.description"></el-step>
      </el-steps>
      <div>
        <keep-alive>
          <component
            ref="child"
            :pageData="pageData"
            @up="handleStepUp"
            @next="handleStepNext"
            @preview="handlePreview"
            @back="handleBack"
            v-bind:is="currentComponent"></component>
        </keep-alive>
      </div>
      <div v-if="currentActiveIndex === 2 || (currentActiveIndex === 1 && type === 'ChangeInternalAchieveInf')" class="btn">
        <el-button type="primary">保存</el-button>
        <el-button type="success">提交</el-button>
        <el-button @click="handleStepNext('up')">返回</el-button>
      </div>
    </div>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import BasePage from "@/views/deal/dealReport/steps/basePage.vue";
  import NoticePage from "@/views/deal/dealReport/steps/noticePage.vue";
  import PreviewPage from "@/views/deal/dealReport/steps/previewPage.vue";

  @Component({
    components: {BasePage, NoticePage, PreviewPage},
  })
  export default class SuppDeal extends Vue {
    id: any = null; // 成交报告id
    type: any = null; // 补充成交类型
    currentStepsList: any = [];
    baseInfoStepsList: any = [
      {
        id: 0,
        title: '成交基础信息变更',
        description: '修改成交基础信息',
        component: BasePage
      },
      {
        id: 1,
        title: '告知书补充发起',
        description: '配置补充发起告知书',
        component: NoticePage
      },
      {
        id: 2,
        title: '预览变更成交基础信息页',
        description: '预览变更信息页面',
        component: PreviewPage
      },
      {
        id: 3,
        title: '完成',
        description: '信息保存/提交成功',
        component: ''
      }
    ]; // 变更基础信息
    achieveStepsList: any = [
      {
        id: 0,
        title: '成交业绩信息变更',
        description: '修改业绩信息',
        component: BasePage
      },
      {
        id: 1,
        title: '告知书补充发起',
        description: '配置补充发起告知书',
        component: NoticePage
      },
      {
        id: 2,
        title: '预览变更成交业绩页',
        description: '预览变更信息页面',
        component: PreviewPage
      },
      {
        id: 3,
        title: '完成',
        description: '信息保存/提交成功',
        component: ''
      }
    ]; // 变更业绩信息
    checkOutStepsList: any = [
      {
        id: 0,
        title: '成交信息变更',
        description: '修改成交信息',
        component: BasePage
      },
      {
        id: 1,
        title: '告知书补充发起',
        description: '配置补充发起告知书',
        component: NoticePage
      },
      {
        id: 2,
        title: '预览变更成交信息页',
        description: '预览变更信息页面',
        component: PreviewPage
      },
      {
        id: 3,
        title: '完成',
        description: '信息保存/提交成功',
        component: ''
      }
    ]; // 退房
    staffStepsList: any = [
      {
        id: 0,
        title: '内部员工业绩变更',
        description: '修改员工业绩',
        component: BasePage
      },
      {
        id: 1,
        title: '预览变更员工业绩页',
        description: '预览变更业绩页面',
        component: PreviewPage
      },
      {
        id: 2,
        title: '完成',
        description: '信息保存/提交成功',
        component: ''
      }
    ]; // 内部员工业绩变更
    currentActiveIndex: any = 0;
    currentComponent: any = BasePage; // 需要展示的页面
    pageData: any = null; // 页面数据

    @Watch("currentActiveIndex")
    currentActiveIndexChange(newValue: any) {
      // console.log('newValue', newValue);
      // console.log('oldValue', oldValue);
      if (this.currentStepsList.length > 0) {
        this.currentStepsList.forEach((list: any) => {
          if (list.id === newValue) {
            this.currentComponent = list.component;
          }
        })
      }
    }

    async created() {
      this.type = this.$route.query.type; // 补充成交类型
      // console.log('this.type ', this.type);
      if (this.type) {
        // 初始化步骤
        this.currentActiveIndex = 0;
        // 初始化步骤条
        switch(this.type){
          case 'ChangeBasicInf' :
            // 变更基础信息
            this.currentStepsList = (this as any).$tool.deepClone(this.baseInfoStepsList);
            break;
          case 'ChangeAchieveInf' :
            // 变更业绩信息
            this.currentStepsList = (this as any).$tool.deepClone(this.achieveStepsList);
            break;
          case 'RetreatRoom' :
            // 退房
            this.currentStepsList = (this as any).$tool.deepClone(this.checkOutStepsList);
            break;
          case 'ChangeInternalAchieveInf' :
            // 内部员工业绩变更
            this.currentStepsList = (this as any).$tool.deepClone(this.staffStepsList);
            break;
        }
      }
    }

    // 下一步
    handleStepNext(type: any, data: any = null) {
      if (type === 'next') {
        // 下一步
        this.currentActiveIndex = this.currentActiveIndex + 1;
      } else {
        // 上一步
        if (this.currentActiveIndex === 0) return;
        this.currentActiveIndex = this.currentActiveIndex - 1;
      }
      if (data) {
        this.pageData = data; // 保存页面数据
      }
    }

    // 子组件触发上一步方法
    handleStepUp() {
      // 上一步
      this.currentActiveIndex = this.currentActiveIndex - 1;
    }

    // 子组件触发预览变更方法
    handlePreview() {
      // 下一步
      this.currentActiveIndex = this.currentActiveIndex + 1;
    }

    // 回到列表页
    handleBack() {
      console.log('handleBack');
      this.$router.push({
        path: "/dealReport/list"
      });
    }
  }
</script>
<style lang="scss" scoped>
  .supp-deal-wrapper {
    width: 100%;

    /deep/.el-step__head.is-process {
      color: #409EFF;
      border-color: #409EFF;
    }

    /deep/.is-process .el-step__icon {
      color: #ffffff;
      background-color: #409EFF;
    }

    .btn {
      text-align: center;
    }
  }
</style>
