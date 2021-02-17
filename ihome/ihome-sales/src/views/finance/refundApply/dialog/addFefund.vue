<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-29 11:04:59
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-17 10:02:23
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
    title="待退款项列表"
    top="5vh"
  >
    <el-form label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="退款款单号">
            <el-input
              v-model="info.refundApplyNO"
              placeholder="请输入退款款单号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户人姓名">
            <el-input
              v-model="info.refundName"
              placeholder="请输入开户人姓名"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <IhSelectPageByProject
              v-model="info.proId"
              clearable
              :props="{
                  value: 'proId',
                  key: 'proId',
                  lable: 'proName',
                }"
            ></IhSelectPageByProject>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="padding-left-100">
      <el-button
        type="primary"
        @click="search()"
      >查询</el-button>
      <el-button
        type="info"
        @click="reset()"
      >重置</el-button>
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
      <template #project>
        <el-table-column
          label="项目名称"
          width="150"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="routeTo(row, 'project')"
            >
              {{ row.projectName }}</el-link>
          </template>
        </el-table-column>
      </template>
      <template #noticeAmount>
        <el-table-column
          label="优惠告知书收款金额"
          width="150"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="routeTo(row, 'notification')"
            >
              {{ row.noticeAmount }}</el-link>
          </template>
        </el-table-column>
      </template>
      <template #returnInfo>
        <el-table-column
          label="退款人信息"
          width="250"
        >
          <template v-slot="{ row }">
            <template v-if="row.refundName && row.refundAccount && row.refundBankName">
              <div
                class="text-ellipsis"
                :title="row.refundName"
              >收款姓名: {{row.refundName}}
              </div>
              <div
                class="text-ellipsis"
                :title="row.refundAccount"
              >收款帐号: {{row.refundAccount}}</div>
              <div
                class="text-ellipsis"
                :title="row.refundBankName"
              >收款开户行: {{row.refundBankName}}</div>
            </template>
            <template v-else>——</template>
          </template>
        </el-table-column>
      </template>
      <template #dealInfo>
        <el-table-column
          label="成交信息"
          width="250"
        >
          <template v-slot="{ row }">
            <template v-if="row.dealCustomerName && row.dealNo && row.dealCompany">
              <div
                class="text-ellipsis"
                :title="row.dealCustomerName"
              >收款姓名: {{row.dealCustomerName}}
              </div>
              <div
                class="text-ellipsis"
                :title="row.dealNo"
              >成交报告编号: <el-link
                  type="primary"
                  @click="routeTo(row, 'deal')"
                >{{row.dealNo}}</el-link>
              </div>
              <div
                class="text-ellipsis"
                :title="row.dealCompany"
              >成交单位: {{row.dealCompany}}
              </div>
            </template>
            <template v-else>——</template>
          </template>
        </el-table-column>
      </template>
      <template #contType>
        <el-table-column
          label="合同类型"
          width="150"
        >
          <template v-slot="{ row }">
            <span>{{row.contType ? $root.dictAllName(row.contType, 'ContType')  : '——'}}</span>
          </template>
        </el-table-column>
      </template>
      <template #serviceInfo>
        <el-table-column
          label="服务费情况"
          width="150"
        >
          <template v-slot="{ row }">
            <div>应收: {{row.receivableAmount ? row.receivableAmount : 0.00}}</div>
            <div>实收: {{row.actualAmount ? row.actualAmount : 0.00}}</div>
            <div>未收: {{row.uncollectedAmount ? row.uncollectedAmount : 0.00}}</div>
          </template>
        </el-table-column>
      </template>
      <template #confirmationTime>
        <el-table-column
          label="业绩确认时间"
          width="150"
        >
          <template v-slot="{ row }">
            <span>{{row.confirmationTime ? row.confirmationTime : '——'}}</span>
          </template>
        </el-table-column>
      </template>
      <template #commission>
        <el-table-column
          label="已付对外拆佣"
          width="150"
        >
          <template v-slot="{ row }">
            <span>{{row.commission ? row.commission : 0.00}}</span>
          </template>
        </el-table-column>
      </template>
      <template #payNo>
        <el-table-column
          label="已结佣付款单号"
          width="150"
        >
          <template v-slot="{ row }">
            <template v-if="row.payVOs.length">
              <template v-for="(item, i) in row.payVOs">
                <span :key="i">
                  <el-link
                    type="primary"
                    @click="routeTo(item, 'payNo')"
                  >
                    {{item}}
                  </el-link>
                  <span v-if="i !== row.payVOs.length - 1">; </span>
                </span>
              </template>
            </template>
            <span v-else>——</span>
          </template>
        </el-table-column>
      </template>
      <template #invoiceNo>
        <el-table-column
          label="发票业务单号"
          width="150"
        >
          <template v-slot="{ row }">
            <el-link
              v-if="row.invoiceNo"
              type="primary"
              @click="routeTo(row, 'invoiceNo')"
            >{{row.invoiceNo}}</el-link>
            <span v-else>——</span>
          </template>
        </el-table-column>
      </template>
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
import { Component, Vue, Prop } from "vue-property-decorator";
import { post_refundItem_getEditList } from "@/api/finance/index";

@Component({})
export default class Obligation extends Vue {
  @Prop({
    default: () => [],
  })
  @Prop()
  data!: any;

  info: any = {
    proId: null,
    refundApplyNO: null,
    refundName: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  hasCheckedData: any = [];
  selection: any = [];
  private dialogVisible = true;
  private pageSize = 10;
  private pageNum = 1;
  private rowKey: any = "id";
  private tableMaxHeight: any = 350;
  private tableColumn = [
    {
      label: "退款项编号",
      prop: "refundNo",
      minWidth: 150,
    },
    {
      slot: "project",
    },
    {
      slot: "noticeAmount",
    },
    {
      label: "本次申请退款金额",
      prop: "amount",
      minWidth: 150,
    },
    {
      slot: "returnInfo",
    },
    {
      slot: "dealInfo",
    },
    {
      slot: "contType",
    },
    {
      slot: "serviceInfo",
    },
    {
      slot: "confirmationTime",
    },
    {
      slot: "commission",
    },
    {
      slot: "payNo",
    },
    {
      slot: "invoiceNo",
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

  routeTo(row: any, where: any) {
    let router: any = null;
    switch (where) {
      case "deal":
        router = this.$router.resolve({
          path: `/dealReport/info`,
          query: {
            id: row.dealCode,
            type: "CODE",
          },
        });
        break;
      case "project":
        router = this.$router.resolve({
          path: `/projects/childInfo`,
          query: {
            id: row.proId,
          },
        });
        break;
      case "notification":
        window.sessionStorage.setItem("businessId", row.businessId);
        router = this.$router.resolve({
          path: `/payment/list`,
        });
        break;
      case "payNo":
        router = this.$router.resolve({
          path: `/payoff/info`,
          query: {
            id: row.payId,
          },
        });
        break;
      case "invoiceNo":
        router = this.$router.resolve({
          path: `/invoice/info`,
          query: {
            id: row.invoiceNo,
          },
        });
        break;
    }
    window.open(router.href, "_blank");
  }

  private reset() {
    Object.assign(this.info, {
      proId: null,
      refundApplyNO: null,
      refundName: null,
    });
  }
  private search() {
    this.pageNum = 1;
    this.getList();
  }

  // 获取选中项 --- 最后需要获取的数据
  private selectionChange(selection: any) {
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
    this.resPageInfo = await post_refundItem_getEditList({
      ...this.info,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      status: "PendingApply",
    });
  }

  created() {
    this.hasCheckedData = this.data.hasCheckedData;
    this.getList();
  }
}
</script>