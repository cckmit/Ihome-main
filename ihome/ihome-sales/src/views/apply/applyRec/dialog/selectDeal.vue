<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-07 19:02:24
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-07 20:04:40
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="85%"
    title="待请款列表"
    top="5vh"
  >
    <el-form label-width="130px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="成交报告编号">
            <el-input
              v-model="queryPageParameters.serialNo"
              placeholder="请输入成交报告编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input
              v-model="queryPageParameters.serialNo"
              placeholder="请输入成交报告编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="周期名称">
            <el-input
              v-model="queryPageParameters.serialNo"
              placeholder="请输入周期名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型">
            <el-input
              v-model="queryPageParameters.serialNo"
              placeholder="请选择合同类型"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否达到请款条件">
            <el-input v-model="queryPageParameters.serialNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业绩确认时间">
            <el-input v-model="queryPageParameters.serialNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="padding-left: 130px;">
      <el-button type="primary">查询</el-button>
      <el-button type="info">重置</el-button>
    </div>
    <br />
    <IhTableCheckBox
      :data="resPageInfo.list"
      :hasCheckedData="hasCheckedData"
      :rowKey="rowKey"
      :column="tableColumn"
      :maxHeight="tableMaxHeight"
      @selection-change="selectionChange"
      :pageSize="pageSize"
      :pageCurrent="pageNum"
      :pageTotal="resPageInfo.total"
      @page-change="pageChange"
      @size-change="sizeChange"
    >
    </IhTableCheckBox>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_deal_getList } from "../../../../api/apply/index";

@Component({})
export default class SelectDeal extends Vue {
  queryPageParameters: any = {
    serialNo: null,
    accountName: null,
    status: null,
    merchantNo: null,
    terminalNo: null,
    accountNo: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  selection: any = [];
  private dialogVisible = true;
  private pageSize = 10;
  private pageNum = 1;
  private rowKey: any = "id";
  private tableMaxHeight: any = 350;
  private tableColumn = [
    {
      prop: "accountName",
      label: "成交报告编号",
      minWidth: 250,
    },
  ];

  private cancel(): void {
    this.$emit("cancel", false);
  }
  private finish(): void {
    if (this.selection.length) {
      this.$emit("finish", this.selection);
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }
  // 获取选中项 --- 最后需要获取的数据
  private selectionChange(selection: any) {
    console.log(selection, "selectionChange");
    this.selection = selection;
  }
  private pageChange(val: number) {
    this.pageNum = val;
    this.getList();
  }
  private sizeChange(val: any) {
    this.pageSize = val;
    this.getList();
  }
  private async getList() {
    this.resPageInfo = await post_deal_getList({
      ...this.queryPageParameters,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  created() {
    this.getList();
  }
}
</script>

