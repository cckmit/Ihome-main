<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-09 17:28:20
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择客户列表"
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
          <el-form-item label="客户姓名">
            <el-input
              v-model="queryPageParameters.custName"
              placeholder="客户姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户类型">
            <el-input
              v-model="queryPageParameters.custType"
              placeholder="客户类型"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户编号">
            <el-input
              v-model="queryPageParameters.custCode"
              placeholder="客户编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">
            <el-input
              v-model="queryPageParameters.custTel"
              placeholder="手机号码"
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
    <IhTableCheckBox
      :isSingle="true"
      :valueKey="rowKey"
      :data="resPageInfo.list"
      :hasCheckedData="hasCheckedData"
      :rowKey="rowKey"
      :column="tableColumn"
      :maxHeight="tableMaxHeight"
      @selection-change="selectionChange"
      :pageSize="pageSize"
      :pageCurrent="currentPage"
      :pageTotal="resPageInfo.total"
      @page-change="pageChange"
      @size-change="sizeChange">
    </IhTableCheckBox>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import {post_customer_getCustList} from "@/api/customer";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class AddCustomer extends Vue {
    constructor() {
      super();
    }

    private rowKey: any = 'id'; // 选择项的标识
    private tableMaxHeight: any = 350;
    private tableColumn = [
      {
        prop: "custCode",
        label: "客户编号",
        align: "left",
        minWidth: 250,
      },
      {
        prop: "custName",
        label: "客户姓名",
        align: "left",
        minWidth: 110,
      },
      {
        prop: "custTypeByName",
        label: "客户类型",
        align: "left",
        minWidth: 110,
      },
      {
        prop: "custTel",
        label: "手机号码",
        align: "left",
        minWidth: 160,
      },
      {
        prop: "cardTypeByName",
        label: "证件类型",
        align: "left",
        minWidth: 120,
      },
      {
        prop: "certificateNumber",
        label: "证件号码",
        align: "left",
        minWidth: 180,
      }
    ];
    private pageSize = 10;
    private currentPage = 1;

    @Prop({default: null}) data: any;
    @Prop({
      default: ()=>[]
    })
    hasCheckedData!: any;
    dialogVisible = true;
    resPageInfo: any = {
      total: null,
      list: [],
    };

    queryPageParameters: any = {
      custName: null,
      custType: null,
      custCode: null,
      custTel: null
    };
    currentSelection: any = []; // 当前选择的项

    created() {
      this.getListMixin();
    }

    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    async finish() {
      if (this.currentSelection.length === 0) {
        this.$message({
          type: "error",
          message: "请选择渠道商",
        });
        return
      }
      this.$emit("finish", this.currentSelection);
    }

    // 获取选中项 --- 最后需要获取的数据
    private selectionChange(selection: any) {
      console.log(selection, "selectionChange");
      this.currentSelection = selection;
    }

    private pageChange(index: number) {
      this.currentPage = index;
      this.queryPageParameters.pageNum = index;
      this.getListMixin();
    }

    private sizeChange(val: any) {
      this.currentPage = 1;
      this.pageSize = val;
      this.queryPageParameters.pageNum = 1;
      this.queryPageParameters.pageSize = val;
      this.getListMixin();
    }

    async getListMixin() {
      const infoList = await post_customer_getCustList(this.queryPageParameters);
      // 原始数据处理
      if (infoList.list.length > 0) {
        infoList.list.forEach((item: any) => {
          item.checked = false; // 勾选标志
          // 客户类型
          if (item.custType) {
            item.custTypeByName = (this as any).$root.dictAllName(item.custType, 'CustType');
          }
          // 证件类型
          if (item.cardType) {
            item.cardTypeByName = (this as any).$root.dictAllName(item.cardType, 'CardType');
          }
        })
      }
      this.resPageInfo = JSON.parse(JSON.stringify(infoList));
      // 勾选回显
      if (this.resPageInfo.list.length > 0 && this.hasCheckedData.length > 0) {
        this.hasCheckedData.forEach((data: any) => {
          this.resPageInfo.list.forEach((list: any) => {
            if (list[this.rowKey] === data[this.rowKey]) {
              list.checked = true;
              this.currentSelection = [...list];
            }
          })
        })
      }
    }

    reset() {
      this.queryPageParameters = {
        custName: null,
        custType: null,
        custCode: null,
        custTel: null,
        pageNum: 1,
        pageSize: this.queryPageParameters.pageSize
      };
    }
  }
</script>
<style lang="scss" scoped>
</style>