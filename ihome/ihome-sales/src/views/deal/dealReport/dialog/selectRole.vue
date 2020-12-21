<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-19 16:40:50
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择角色列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-form ref="form" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="组织名称">
            <el-input
              v-model="queryPageParameters.city"
              placeholder="组织名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户姓名">
            <el-input
              v-model="queryPageParameters.city"
              placeholder="用户姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登录名">
            <el-input
              v-model="queryPageParameters.city"
              placeholder="登录名"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" @click="getListMixin()">查询</el-button>
            <el-button type="info" @click="reset()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="content-wrapper">
      <div class="content-tree-wrapper">
        <el-tree
          :data="treeData"
          :props="treeDefaultProps"
          accordion
          @node-click="handleTreeNodeClick">
        </el-tree>
      </div>
      <div class="content-transfer-wrapper">
        <el-transfer
          v-model="transferValue"
          :titles="['待选用户', '已选用户']"
          :data="transferData">
        </el-transfer>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import {post_channelGrade_getList} from "@/api/channel";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class SelectRole extends Vue {
    constructor() {
      super();
    }

    @Prop({default: null}) data: any;
    dialogVisible = true;
    resPageInfo: any = {
      total: null,
      list: [],
    };

    queryPageParameters: any = {
      channelGrade: null,
      channelId: null,
      city: null,
      cityGrade: null,
      departmentOrgId: null,
      inputUser: null,
      province: null,
      special: null,
      status: null,
      storageNum: null,
    };

    treeData: any = [
      {
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      },
      {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }];
    treeDefaultProps: any = {
      children: 'children',
      label: 'label'
    };
    transferData: any = [
      {
        key: 1,
        label: `备选项1`
      },
      {
        key: 2,
        label: `备选项2`
      },
      {
        key: 3,
        label: `备选项3`
      },
      {
        key: 4,
        label: `备选项4`
      }
    ];
    transferValue: any = [];

    async finish() {
      this.$emit("finish", true);
    }

    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    created() {
      // this.getListMixin();
    }

    handleTreeNodeClick(data: any) {
      console.log(data);
    }

    async getListMixin() {
      this.resPageInfo = await post_channelGrade_getList(this.queryPageParameters);
    }
  }
</script>
<style lang="scss" scoped>
  .content-wrapper {
    width: 100%;
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;

    .content-tree-wrapper {
      /*width: 40%;*/
      width: 280px;
      max-height: 500px;
      overflow: auto;
      box-sizing: border-box;
      margin-right: 10px;
    }

    .content-transfer-wrapper {
      /*width: 60%;*/
      flex: 1;
      max-height: 500px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>