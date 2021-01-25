<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-14 18:40:10
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-23 20:11:12
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
    <el-form ref="form" label-width="80px" @submit.native.prevent>
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
            <IhSelectPageByProject
              disabled
              v-model="queryPageParameters.projectId"
              placeholder="请选择项目名称"
            ></IhSelectPageByProject>
          </el-form-item>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="searchOpen">
          <el-row>
            <el-col :span="8">
              <el-form-item label="立项周期">
                <IhSelectPageByCycle
                  disabled
                  v-model="queryPageParameters.cycleId"
                  placeholder="请选择立项周期"
                ></IhSelectPageByCycle>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="栋座">
                <IhSelectPageByBuild
                  v-model="queryPageParameters.buyUnit"
                  :proId="queryPageParameters.projectId"
                  placeholder="请选择栋座"
                  :disabled="!!data.buyUnit"
                ></IhSelectPageByBuild>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="房号">
                <IhSelectPageByRoom
                  :disabled="!!data.roomId"
                  v-model="queryPageParameters.roomNumberId"
                  :proId="queryPageParameters.projectId"
                  :buildingId="queryPageParameters.buyUnit"
                  placeholder="请选择房号"
                ></IhSelectPageByRoom>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="甲方">
                <IhSelectPageByCompany
                  v-model="queryPageParameters.partyAId"
                  clearable
                  placeholder="请选择甲方"
                  class="width--100"
                ></IhSelectPageByCompany>
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
            <el-button type="primary" @click="handleSearch()">查询</el-button>
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
    <el-table
      ref="table"
      :max-height="350"
      class="ih-table table-dialog"
      :data="resPageInfo.list"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll">
      <el-table-column fixed type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="编号" prop="noticeNo" min-width="210"></el-table-column>
      <el-table-column label="类型" prop="notificationType" min-width="130">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.notificationType, 'NotificationType')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" prop="projectName" min-width="180"></el-table-column>
      <el-table-column label="联动周期" prop="cycleName" min-width="130"></el-table-column>
      <el-table-column label="栋座" prop="buyUnit" min-width="100"></el-table-column>
      <el-table-column label="房号" prop="roomNumberId" min-width="100"></el-table-column>
      <el-table-column label="甲方名称" prop="partyAName" min-width="120"></el-table-column>
      <el-table-column label="区域" prop="area" min-width="120"></el-table-column>
      <el-table-column label="客户名称" prop="ownerName" min-width="150"></el-table-column>
      <el-table-column label="客户电话" prop="ownerMobile" min-width="150"></el-table-column>
      <el-table-column label="状态" prop="notificationStatus" min-width="100">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.notificationStatus, 'NotificationStatus')}}</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="text-right">
      <br />
      <el-pagination
        @size-change="handleSizeChangeMixin"
        @current-change="handleCurrentChangeMixin"
        :current-page.sync="queryPageParameters.pageNum"
        :page-sizes="$root.pageSizes"
        :page-size="queryPageParameters.pageSize"
        :layout="$root.paginationLayout"
        :total="resPageInfo.total"
      ></el-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import { post_notice_deal_list } from "@/api/contract/index";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class SelectNoticeList extends Vue {
    constructor() {
      super();
    }
    private searchOpen = true;
    private dialogVisible = true;
    private selection = [];
    public queryPageParameters: any = {
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
    public resPageInfo: any = {
      total: null,
      list: [],
    };
    @Prop({default: null}) data: any;

    created() {
      console.log('notice data', this.data);
      this.queryPageParameters.cycleId = this.data.termId;
      this.queryPageParameters.projectId = this.data.proId;
      this.queryPageParameters.buyUnit = this.data.buyUnit;
      this.queryPageParameters.roomNumberId = this.data.roomId;
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
      if (this.selection.length === 0) {
        this.$message({
          type: "error",
          message: "请选择优惠告知书",
        });
        return
      }
      this.$emit("finish", this.selection);
    }

    private handleSelectionChange(val: any) {
      this.selection = val;
    }

    private handleSelect(selection: any) {
      if (selection.length > 1) {
        let del_row = selection.shift();
        (this.$refs.table as any).toggleRowSelection(del_row, false);
      }
    }

    private handleSelectAll() {
      (this.$refs.table as any).clearSelection();
    }

    // 查询
    handleSearch() {
      this.queryPageParameters.pageNum = 1;
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
    }

    private reset() {
      Object.assign(this.queryPageParameters, {
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
      });
    }
  }
</script>
<style lang="scss" scoped>
  .col-bottom-20 {
    margin-bottom: 20px;
  }
</style>