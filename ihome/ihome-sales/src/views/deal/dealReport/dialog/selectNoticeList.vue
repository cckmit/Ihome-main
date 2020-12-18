<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-14 18:40:10
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-14 19:20:30
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择优惠告知书列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1100px"
    style="text-align: left"
    class="dialog">
    <el-form ref="form" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="编号">
            <el-input
              v-model="queryPageParameters.noticeNo"
              placeholder="请输入编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型">
            <el-select
              v-model="queryPageParameters.notificationTypes"
              placeholder="请选择类型"
              clearable
              class="width--100">
              <el-option
                v-for="i in $root.dictAllList('NotificationType')"
                :key="i.code"
                :label="i.name"
                :value="i.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <SelectPageByProject
              v-model="queryPageParameters.projectId"
              placeholder="请选择联动项目"
            ></SelectPageByProject>
          </el-form-item>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="searchOpen">
          <el-row>
            <el-col :span="8">
              <el-form-item label="立项周期">
                <SelectPageByCycle
                  v-model="queryPageParameters.cycleId"
                  placeholder="请选择立项周期"
                ></SelectPageByCycle>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="栋座">
                <SelectPageByBuild
                  v-model="queryPageParameters.buyUnit"
                  :proId="queryPageParameters.projectId"
                  placeholder="请选择栋座"
                ></SelectPageByBuild>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="房号">
                <SelectPageByRoom
                  v-model="queryPageParameters.roomNumberId"
                  :proId="queryPageParameters.projectId"
                  :buildingId="queryPageParameters.buyUnit"
                  placeholder="请选择房号"
                ></SelectPageByRoom>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="甲方">
                <el-select
                  v-model="queryPageParameters.partyAId"
                  clearable
                  placeholder="请选择甲方"
                  class="width--100">
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区域">
                <el-input
                  v-model="queryPageParameters.area"
                  clearable
                  placeholder="请输入区域"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                <el-select
                  v-model="queryPageParameters.notificationStatuses"
                  clearable
                  placeholder="请选择状态"
                  class="width--100">
                  <el-option
                    v-for="item in $root.dictAllList('NotificationStatus')"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户">
                <el-input
                  v-model="queryPageParameters.ownerName"
                  placeholder="请输入客户"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户电话">
                <el-input
                  v-model="queryPageParameters.ownerMobile"
                  placeholder="请输入客户电话"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
      <el-row>
        <el-col>
          <el-form-item label="">
            <el-button type="primary" @click="getListMixin()">查询</el-button>
            <el-button type="info" @click="reset()">重置</el-button>
            <el-link
              type="primary"
              class="float-right margin-right-40"
              @click="openToggle()"
            >{{searchOpen?'收起':'展开'}}</el-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <IhTableCheckBox
      :isSingle="true"
      :isSelection="false"
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
  import SelectPageByProject from "@/components/SelectPageByProject.vue";
  import SelectPageByCycle from "@/components/SelectPageByCycle.vue";
  import SelectPageByBuild from "@/components/SelectPageByBuild.vue";
  import SelectPageByRoom from "@/components/selectPageByRoom.vue";

  import { post_notice_deal_list } from "@/api/contract/index";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {
      SelectPageByProject,
      SelectPageByCycle,
      SelectPageByBuild,
      SelectPageByRoom
    },
    mixins: [PaginationMixin],
  })
  export default class SelectNoticeList extends Vue {
    constructor() {
      super();
    }

    private rowKey: any = 'id'; // 选择项的标识
    private tableMaxHeight: any = 350;
    private tableColumn = [
      {
        prop: "noticeNo",
        label: "编号",
        align: "left",
        minWidth: 210,
      },
      {
        prop: "notificationTypeByName",
        label: "类型",
        align: "left",
        minWidth: 130,
      },
      {
        prop: "projectName",
        label: "项目名称",
        align: "left",
        minWidth: 180,
      },
      {
        prop: "cycleName",
        label: "联动周期",
        align: "left",
        minWidth: 130,
      },
      {
        prop: "buyUnit",
        label: "栋座",
        align: "left",
        minWidth: 100,
      },
      {
        prop: "roomNumberId",
        label: "房号",
        align: "left",
        minWidth: 100,
      },
      {
        prop: "partyAName",
        label: "甲方名称",
        align: "left",
        minWidth: 120,
      },
      {
        prop: "area",
        label: "区域",
        align: "left",
        minWidth: 120,
      },
      {
        prop: "ownerName",
        label: "客户名称",
        align: "left",
        minWidth: 150,
      },
      {
        prop: "ownerMobile",
        label: "客户电话",
        align: "left",
        minWidth: 150,
      },
      {
        prop: "notificationStatusByName",
        label: "状态",
        align: "left",
        minWidth: 100,
      }
    ];
    private pageSize = 10;
    private currentPage = 1;
    private searchOpen = true;

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
      noticeNo: null, // 编号
      notificationTypes: null, // 类型 array
      projectId: null, // 项目名称
      cycleId: null, // 项目周期
      buyUnit: null, // 栋座
      roomNumberId: null, // 房号
      partyAId: null, // 甲方
      area: null, // 区域
      notificationStatuses: null, // 状态 array
      ownerName: null, // 客户
      ownerMobile: null // 客户电话
    };
    currentSelection: any = []; // 当前选择的项

    created() {
      console.log('notice data', this.data);
      this.queryPageParameters.cycleId = this.data.termId;
      this.queryPageParameters.projectId = this.data.proId;
      this.getListMixin();
    }

    private openToggle(): void {
      this.searchOpen = !this.searchOpen;
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
          message: "请选择优惠告知书",
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
      let postData: any = {
        ...this.queryPageParameters,
        notificationTypes: this.queryPageParameters.notificationTypes ? [this.queryPageParameters.notificationTypes] : [],
        notificationStatuses: this.queryPageParameters.notificationStatuses ? [this.queryPageParameters.notificationStatuses] : [],
      }
      const infoList = await post_notice_deal_list(postData);
      if (infoList.list.length > 0) {
        infoList.list.forEach((item: any) => {
          item.checked = false;
          // 修改显示 ChannelGradeStatus
          if (item.notificationType) {
            item.notificationTypeByName = (this as any).$root.dictAllName(item.notificationType, 'NotificationType');
          }
          if (item.notificationStatus) {
            item.notificationStatusByName = (this as any).$root.dictAllName(item.notificationStatus, 'NotificationStatus');
          }
          // 客户姓名
          if (item.ownerList && item.ownerList.length > 0) {
            let nameList: any = [];
            let mobileList: any = [];
            item.ownerList.forEach((list: any) => {
              if (list.ownerName) {
                nameList.push(list.ownerName);
              }
              if (list.ownerMobile) {
                mobileList.push(list.ownerMobile);
              }
            })
            item.ownerName = nameList.join('，')
            item.ownerMobile = mobileList.join('，')
          } else {
            item.ownerName = '';
            item.ownerMobile = '';
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

    // 重置
    reset() {
      this.queryPageParameters = {
        area: null,
        cycleId: null,
        notificationStatuses: null,
        noticeNo: null,
        ownerMobile: null,
        ownerName: null,
        partyAId: null,
        projectId: null,
        roomNumberId: null,
        notificationTypes: null,
        buyUnit: null,
        pageNum: 1,
        pageSize: this.queryPageParameters.pageSize
      }
    }
  }
</script>
<style lang="scss" scoped>
  .col-bottom-20 {
    margin-bottom: 20px;
  }
</style>