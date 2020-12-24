<!--
 * @Description: 选择POS机
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-23 11:50:23
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-24 17:09:29
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
    title="选择POS机列表"
    top="5vh"
  >
    <el-form label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="序列号">
            <el-input
              v-model="queryPageParameters.serialNo"
              placeholder="请输入序列号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账户名称">
            <el-input
              v-model="queryPageParameters.accountName"
              placeholder="请输入账户名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select
              v-model="queryPageParameters.status"
              placeholder="请选择状态"
              clearable
              disabled
              class="width--100"
            >
              <el-option
                v-for="(i, n) in $root.dictAllList('PosTerminalStatus')"
                :key="n"
                :label="i.name"
                :value="i.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商户号">
            <el-input
              v-model="queryPageParameters.merchantNo"
              placeholder="请输入商户号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="终端号">
            <el-input
              v-model="queryPageParameters.terminalNo"
              placeholder="请输入终端号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账号">
            <el-input
              v-model="queryPageParameters.terminalNo"
              placeholder="请输入账号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="padding-left-80">
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
    ></IhTableCheckBox>
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
import { Component, Vue, Prop } from "vue-property-decorator";
import { post_posTerminal_getList } from "../../../../api/finance/index";

@Component({})
export default class SelectPOS extends Vue {
  @Prop({
    default: () => [],
  })
  hasCheckedData!: any;
  @Prop() params!: any;

  queryPageParameters: any = {
    serialNo: null,
    accountName: null,
    status: null,
    merchantNo: null,
    terminalNo: null,
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
      label: "账户名称",
      minWidth: 250,
    },
    {
      prop: "accountNo",
      label: "账号",
      minWidth: 200,
    },
    {
      prop: "productModel",
      label: "产品型号",
      minWidth: 155,
    },
    {
      prop: "serialNo",
      label: "序列号",
      minWidth: 160,
    },
    {
      prop: "holderName",
      label: "当前保管人",
      minWidth: 120,
    },
    {
      prop: "status",
      label: "状态",
      minWidth: 120,
    },
    {
      prop: "departmentName",
      label: "所在事业部",
      minWidth: 170,
    },
    {
      prop: "groupName",
      label: "所在店组",
    },
    {
      prop: "proName",
      label: "联动项目",
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
  private pageChange(index: number) {
    this.pageNum = index;
    this.getList();
  }
  private sizeChange(val: any) {
    this.pageSize = val;
  }
  private async getList() {
    this.resPageInfo = await post_posTerminal_getList({
      ...this.queryPageParameters,
      ...this.params,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  created() {
    this.queryPageParameters.status = this.params.status;
    this.getList();
  }
}
</script>
