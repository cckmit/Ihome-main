<!--
 * @Description: 渠道商列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-19 14:08:05
-->
<template>
  <IhPage label-width="90px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="90px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司名称">
              <el-input
                v-model="queryPageParameters.name"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="信用代码"
              class="formItem"
            >
              <el-input
                v-model="queryPageParameters.creditCode"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.status"
                clearable
                placeholder="状态"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
<!--          <el-col :span="8">-->
<!--            <el-form-item label="简称">-->
<!--              <el-input-->
<!--                v-model="queryPageParameters.shortName"-->
<!--                placeholder="简称"-->
<!--              ></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省市区">
              <IhCascader v-model="provinceList"></IhCascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="跟进人">
              <IhSelectPageUser
                v-model="queryPageParameters.followUserId"
                clearable
              >
                <template v-slot="{ data }">
                  <span style="float: left">{{ data.name }}</span>
                  <span style="
                      margin-left: 20px;
                      float: right;
                      color: #8492a6;
                      font-size: 13px;
                    ">{{ data.account }}</span>
                </template>
              </IhSelectPageUser>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="渠道录入人">
              <IhSelectPageUser
                v-model="queryPageParameters.inputUser"
                clearable
              >
                <template v-slot="{ data }">
                  <span style="float: left">{{ data.name }}</span>
                  <span style="
                      margin-left: 20px;
                      float: right;
                      color: #8492a6;
                      font-size: 13px;
                    ">{{ data.account }}</span>
                </template>
              </IhSelectPageUser>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="success"
          @click="$router.push('/channelBusiness/add')"
          v-has="'B.SALES.CHANNEL.BASELIST.ADD'"
        >添加</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
        <el-button
          @click="changeFollower()"
          v-has="'B.SALES.CHANNEL.BASELIST.UPDATEFOLLOWER'"
        >变更跟进人</el-button>
        <!-- <el-button @click="changeInputPerson()">变更录入人</el-button> -->
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        @selection-change="handleSelectionChange"
        :empty-text="emptyText"
      >
        <el-table-column
          fixed
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="公司名称"
          min-width="200"
        ></el-table-column>
        <el-table-column
          fixed
          prop="creditCode"
          label="信用代码"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="province"
          label="省市区"
          width="300">
          <template v-slot="{ row }">
            {{ $root.getAreaName(row.province) }}/{{ $root.getAreaName(row.city) }}/{{ $root.getAreaName(row.county) }}
          </template>
        </el-table-column>
<!--        <el-table-column
          prop="province"
          label="省份"
          width="200"
        >
          <template v-slot="{ row }">
            {{ $root.getAreaName(row.province) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          width="200"
        >
          <template v-slot="{ row }">
            {{ $root.getAreaName(row.city) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="county"
          label="行政区"
          width="200"
        >
          <template v-slot="{ row }">
            {{ $root.getAreaName(row.county) }}
          </template>
        </el-table-column>-->
        <!-- <el-table-column
          prop="inputUser"
          label="录入人"
          width="150"
        ></el-table-column> -->
        <el-table-column
          prop="status"
          label="状态"
          width="160"
        >
          <template v-slot="{ row }">
            <div class="ih-status-dot">
              <span class="dot" :class="getStatusDot(row.status)"></span>
              <span>{{ $root.dictAllName(row.status, 'ChannelStatus') }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="followUserName"
          label="跟进人"
          width="160"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="handleToPage(row, 'info')"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'edit')"
                  :class="{ 'ih-data-disabled': !editChange(row) }"
                  v-has="'B.SALES.CHANNEL.BASELIST.UPDATE'"
                >修改</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="remove(row)"
                  :class="{ 'ih-data-disabled': !editChange(row) }"
                  v-has="'B.SALES.CHANNEL.BASELIST.DELETE'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'confirm')"
                  :class="{ 'ih-data-disabled': !confirmChange(row) }"
                  v-has="'B.SALES.CHANNEL.BASELIST.CONFIRM'"
                >确认</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="backDraft(row, 'revoke')"
                  :class="{'ih-data-disabled': row.status !== 'Confirmed'}"
                  v-has="'B.SALES.CHANNEL.BASELIST.REVOKEDRAFT'"
                >退回起草</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="updateInfo(row)"
                  :class="{ 'ih-data-disabled': !passChange(row) }"
                  v-has="'B.SALES.CHANNEL.BASELIST.UPDATEINFO'"
                >变更信息</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, 'agent')"
                  :class="{ 'ih-data-disabled': !agentChange(row) }"
                  v-has="'B.SALES.CHANNEL.BASELIST.MAINTAINAGENT'"
                >维护渠道经纪人</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleGoAdd(row)"
                  v-has="'B.SALES.CHANNEL.LEVELLIST.ADD'"
                  :class="{ 'ih-data-disabled': !['Confirmed', 'PASS', 'Changing'].includes(row.status) }"
                >添加等级</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
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
    </template>
    <!-- dialog -->
    <IhDialog
      :show="dialogVisible"
      desc="变更录入人"
    >
      <UpdateUser
        :data="selectionData"
        :isInput="isInput"
        @cancel="() => (dialogVisible = false)"
        @finish="
          (data) => {
            dialogVisible = false;
            getListMixin();
          }
        "
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// 引入api
import {
  post_channel_getList,
  post_channel_delete__id,
  post_channel_backToDraft__id,
  get_channelChange_changeCheck__oldChannelId,
} from "@/api/channel/index";
import UpdateUser from "./dialog/updateUser.vue";

import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: { UpdateUser },
  mixins: [PaginationMixin],
})
export default class List extends Vue {
  queryPageParameters: any = {
    name: null,
    creditCode: null,
    shortName: null,
    provinces: null,
    county: null,
    city: null,
    inputUser: null,
    status: null,
    followUserId: null,
  };
  dialogVisible = false;
  resPageInfo: any = {
    total: null,
    list: [],
  };
  selectionData = [];
  isInput = true;
  private provinceList: any = [];

  // 获取颜色
  getStatusDot(status: any = '') {
    if (status === 'DRAFT') {
      return 'warning';
    } else if (status === 'PASS') {
      return 'success';
    } else {
      return 'primary';
    }
  }

  editChange(row: any) {
    const status = row.status === "DRAFT";
    const dangqian = (this.$root as any).userInfo.id === row.followUserId;
    return status && dangqian;
  }

  confirmChange(row: any) {
    const status = row.status === "ToBeConfirmed";
    const dangqian = (this.$root as any).userInfo.id === row.followUserId;
    return status && dangqian;
  }

  passChange(row: any) {
    const status = row.status === "PASS";
    const dangqian = (this.$root as any).userInfo.id === row.followUserId;
    return status && dangqian;
  }

  agentChange(row: any) {
    const DRAFT = row.status === "DRAFT";
    const ToBeConfirmed = row.status === "ToBeConfirmed";
    const dangqian = (this.$root as any).userInfo.id === row.followUserId;
    return (!DRAFT || !ToBeConfirmed) && dangqian;
  }

  async updateInfo(row: any) {
    let flag = true;
    try {
      flag = await get_channelChange_changeCheck__oldChannelId({
        oldChannelId: row.id,
      });
    } catch (error) {
      console.log(error);
    }
    if (!flag) {
      this.handleToPage(row, "change");
    } else {
      this.$message.warning("渠道变更中, 请不要提交重复变更");
    }
  }
  search() {
    this.queryPageParameters.provinces = this.provinceList[0];
    this.queryPageParameters.city = this.provinceList[1];
    this.queryPageParameters.county = this.provinceList[2];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  reset() {
    Object.assign(this.queryPageParameters, {
      name: null,
      creditCode: null,
      shortName: null,
      provinces: null,
      county: null,
      city: null,
      inputUser: null,
      status: null,
      followUserId: null,
    });
    this.provinceList = [];
  }
  changeFollower() {
    if (!this.selectionData.length) {
      this.$message.warning("请先勾选表格数据");
      return;
    }
    this.dialogVisible = true;
    this.isInput = false;
  }
  changeInputPerson() {
    if (!this.selectionData.length) {
      this.$message.warning("请先勾选表格数据");
      return;
    }
    this.dialogVisible = true;
    this.isInput = true;
  }
  private handleGoAdd(row: any) {
    sessionStorage.setItem(
      "channelData",
      JSON.stringify({ name: row.name, id: row.id })
    );
    this.$router.push("/channelLevel/add");
  }
  /**
   * @description: 退回起草
   * @param {any} row
   */
  private backDraft(row: any): void {
    this.$confirm("此操作将该渠道商撤回起草, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await post_channel_backToDraft__id({ id: row.id });
        this.getListMixin();
        this.$message.success("撤回起草成功");
      })
      .catch(async () => {
        console.log("取消");
      });
  }
  /**
   * @description: 删除当前 -- 只有草稿状态能删除
   * @param {any} row
   */
  private async remove(row: any): Promise<void> {
    this.$confirm("此操作将删除该渠商, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await post_channel_delete__id({ id: row.id });
        // 删除list最后一条数据 返回前一页面
        if (this.resPageInfo.list.length === 1) {
          this.queryPageParameters.pageNum === 1
            ? (this.queryPageParameters.pageNum = 1)
            : this.queryPageParameters.pageNum--;
        }
        this.getListMixin();
        this.$message.success("删除成功");
      })
      .catch(async () => {
        console.log("取消");
      });
  }
  /**
   * @description: 跳转页面
   * @param {any} row
   * @param {string} type 页面page
   */
  private handleToPage(row: any, type: string): void {
    this.$router.push({
      path: type,
      query: { id: row.id },
    });
  }
  //获取数据
  async getListMixin() {
    this.resPageInfo = await post_channel_getList(this.queryPageParameters);
  }
  handleSelectionChange(val: any) {
    this.selectionData = val;
  }

  created() {
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>
