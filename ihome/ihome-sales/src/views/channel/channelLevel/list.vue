<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-30 17:49:55
-->
<template>
  <IhPage label-width="100px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="渠道商名称">
              <el-select
                v-model="queryPageParameters.channelId"
                clearable
                placeholder="渠道商名称"
                class="width--100"
              >
                <el-option
                  v-for="item in channelOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道等级">
              <el-select
                v-model="queryPageParameters.channelGrade"
                clearable
                placeholder="渠道等级"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelLevel')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市等级">
              <el-select
                v-model="queryPageParameters.cityGrade"
                clearable
                placeholder="城市等级"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('CityLevel')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务开展省市">
              <IhCascader
                :level="2"
                v-model="provinceOption"
                clearable
                placeholder="请选择"
                class="width--100"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-select
                v-model="queryPageParameters.departmentOrgId"
                clearable
                placeholder="事业部"
                class="width--100"
              >
                <el-option
                  v-for="item in departmentOrgIdOptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
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
                  v-for="item in $root.dictAllList('ChannelGradeStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
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
          </el-col>
          <el-col :span="8">
            <el-form-item label="特批入库">
              <el-select
                v-model="queryPageParameters.special"
                clearable
                placeholder="特批入库"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('YesOrNoType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库编号">
              <el-input
                clearable
                v-model="queryPageParameters.storageNum"
                placeholder="入库编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row class="el-row">
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          @click="empty()"
        >重置</el-button>
        <el-button
          type="success"
          @click="add()"
        >添加</el-button>
        <el-button @click="update()">变更录入人</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :default-sort="{ prop: 'id', order: 'descending' }"
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
          prop="storageNum"
          label="入库编号"
          width="180"
        ></el-table-column>
        <el-table-column
          fixed
          prop="channelId"
          label="渠道商名称"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="province"
          label="业务开展省份"
          width="120"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.province)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="city"
          label="业务开展城市"
          width="120"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.city)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="cityGrade"
          label="城市等级"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.cityGrade, "CityLevel")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="channelGrade"
          label="渠道等级"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.channelGrade, "ChannelLevel")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="special"
          label="特批入库"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.special, "YesOrNoType")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="事业部"
        ></el-table-column>
        <el-table-column
          prop="inputUserName"
          label="录入人"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="125"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.status, "ChannelGradeStatus")
          }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="routerTo(row, 'info')"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              style="margin-left: 15px"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native.prevent="routerTo(row, 'edit')"
                  :disabled="row.status !== 'DRAFT'"
                >修改</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="remove(row)"
                  :disabled="row.status !== 'DRAFT'"
                >删除</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="routerTo(row, 'recall')">撤回</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="routerTo(row, 'audit')"
                  :disabled="row.status === 'DRAFT'"
                >审核</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="returnStatus(row)"
                  :disabled="row.status === 'DRAFT'"
                >退回起草</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="routerTo(row, 'change')">变更信息</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-pagination
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>

    <ih-dialog
      :show="dialogVisible"
      desc="变更录入人"
    >
      <UpdateUser
        :data="selection"
        @cancel="() => (dialogVisible = false)"
        @finish="
          (data) => {
            dialogVisible = false;
            getListMixin();
          }
        "
      />
    </ih-dialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  post_channelGrade_getList,
  get_channel_getAll,
  post_channelGrade_delete__id,
  post_channelGrade_backToDraft__id,
} from "../../../api/channel/index";
import PaginationMixin from "../../../mixins/pagination";
import UpdateUser from "./dialog/updateUser.vue";
// import { city } from "../../../util/enums/dic";
@Component({
  components: { UpdateUser },
  mixins: [PaginationMixin],
})
export default class UserList extends Vue {
  queryPageParameters: any = {
    channelId: null,
    channelGrade: null,
    cityGrade: null,
    province: null,
    city: null,
    departmentOrgId: null,
    status: null,
    inputUser: null,
    special: null,
    storageNum: null,
  };
  provinceOption: any = [];
  selection: any = [];
  dialogVisible = false;

  channelOptions: any = [];
  departmentOrgIdOptions: any = [
    {
      name: "人事部",
      id: "111",
    },
    {
      name: "产品研发部",
      id: "222",
    },
    {
      name: "技术部",
      id: "333",
    },
  ];

  inputUserOptions: any = [
    {
      name: "项目经理",
      id: "111",
    },
    {
      name: "产品经理",
      id: "222",
    },
    {
      name: "前端开发",
      id: "333",
    },
    {
      name: "java开发",
      id: "444",
    },
    {
      name: "测试",
      id: "555",
    },
  ];

  resPageInfo: any = {
    total: null,
    list: [],
  };

  search() {
    this.queryPageParameters.province = this.provinceOption[0];
    this.queryPageParameters.city = this.provinceOption[1];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  empty() {
    Object.assign(this.queryPageParameters, {
      channelId: null,
      channelGrade: null,
      cityGrade: null,
      province: null,
      city: null,
      departmentOrgId: null,
      status: null,
      inputUser: null,
      special: null,
      storageNum: null,
    });
    this.provinceOption = [];
  }

  // 添加
  add() {
    this.$router.push("/channelLevel/add");
  }

  update() {
    if (this.selection.length) this.dialogVisible = true;
    else this.$message.warning("请先勾选表格数据");
  }

  routerTo(row: any, where: string) {
    this.$router.push({
      path: `/channelLevel/${where}`,
      query: {
        id: row.id,
      },
    });
  }

  // 删除
  async remove(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_channelGrade_delete__id({ id: row.id });
      this.$message({
        type: "success",
        message: "删除成功!",
      });
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }

  // 退回起草
  async returnStatus(row: any) {
    await post_channelGrade_backToDraft__id({ id: row.id });
    this.$message({
      type: "success",
      message: "退回起草成功!",
    });
    this.getListMixin();
  }

  created() {
    this.getListMixin();
    this.getChannelAll();
  }

  // 获取渠道商
  async getChannelAll() {
    this.channelOptions = await get_channel_getAll();
  }

  //获取数据
  async getListMixin() {
    this.resPageInfo = await post_channelGrade_getList(
      this.queryPageParameters
    );
  }

  handleSelectionChange(val: any) {
    this.selection = val.map((v: any) => ({
      name: v.channelName,
      channelId: v.channelId,
      id: v.id,
    }));
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.line {
  border-left: solid;
  color: #4cccec;
  padding-left: 7px;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
