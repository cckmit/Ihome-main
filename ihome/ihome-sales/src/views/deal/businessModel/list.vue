<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-10-29 13:53:20
 * @LastEditors: lsj
 * @LastEditTime: 2020-10-30 13:53:20
-->
<template>
  <ih-page label-width="100px">
    <template v-slot:form>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="2" class="text-left">
            <el-button type="success" @click="add()">新增</el-button>
          </el-col>
          <el-col :span="22" class="text-right">
            <el-select
              v-model="queryPageParameters.modelName"
              clearable
              placeholder="请选择业务模式">
              <el-option
                v-for="item in $root.dictAllList('BusinessModel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <el-button type="primary" class="margin-left-20" @click="getListMixin()">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:table>
      <br/>
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
      >
        <el-table-column
          prop="modelName"
          label="业务模式"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="contType"
          label="合同类型"
          min-width="240"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-link
              class="margin-right-10"
              type="primary"
              @click.native.prevent="edit(scope)"
            >编辑
            </el-link>
            <el-dropdown trigger="click" style="margin-left: 15px">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="remove(scope)"
                >删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
      <br/>
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
    <ih-dialog :show="dialogAddModel" desc="新增/修改业务模式">
      <AddModelDialog
        :data="modelId"
        @cancel="() => (dialogAddModel = false)"
        @finish="
            () => {
              dialogAddModel = false;
              finishAddModel();
            }
          "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import AddModelDialog from "./dialog/addModelDialog.vue";

  import {
    post_businessModel_getList,
    post_businessModel_delete__id
  } from "@/api/deal";

  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {AddModelDialog},
    mixins: [PaginationMixin],
  })
  export default class BusinessModelList extends Vue {
    queryPageParameters: any = {
      modelName: null
    };

    resPageInfo: any = {
      total: 0,
      list: [],
    };
    dialogAddModel: any = false;
    modelId: any = false;

    async created() {
      // console.log('业务模式', (this as any).$root.dictAllList('BusinessModel'));
      await this.getListMixin();
    }

    // 获取业务模式列表
    async getListMixin() {
      this.resPageInfo = await post_businessModel_getList(this.queryPageParameters);
      if (this.resPageInfo.list && this.resPageInfo.list.length > 0) {
        this.resPageInfo.list.forEach((listItem: any) => {
          // 业务模式
          if (listItem.modelName) {
            switch (listItem.modelName) {
              case "TotalBagModel":
                listItem.modelName = "总包模式";
                break;
              case "DistriModel":
                listItem.modelName = "分销模式";
                break;
              case "TotalBagDistriModel":
                listItem.modelName = "总包+分销模式";
                break;
              case "UnderwritingModel":
                listItem.modelName = "承销";
                break;
              default:
                listItem.modelName = "其他";
            }
          }
          // 合同类型
          if (listItem.contType) {
            let typeArr = listItem.contType.split(',');
            let nameType: any = [];
            if (typeArr.length > 0) {
              typeArr.forEach((typeItem: any) => {
                switch (typeItem.replace(" ", "")) {
                  case "DistriDeal":
                    nameType.push("分销成交");
                    break;
                  case "NaturalVisitDeal":
                    nameType.push("自然来访成交");
                    break;
                  case "SelfChannelDeal":
                    nameType.push("自渠成交");
                    break;
                  case "SelfDeal":
                    nameType.push("自行成交");
                    break;
                  default:
                    nameType.push("其他");
                }
              })
            }
            if (nameType.length > 0) {
              listItem.contType = nameType.join(',')
            } else {
              listItem.contType = ""
            }
          }
        })
      }
    }

    // 删除
    async remove(scope: any) {
      try {
        await this.$confirm("是否确定删除?", "提示");
        await post_businessModel_delete__id({id: scope.row.id});
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        await this.getListMixin();
      } catch (error) {
        console.log(error);
      }
    }

    // 新增
    async add() {
      this.modelId = null;
      this.dialogAddModel = true;
    }

    // 编辑
    async edit(scope: any) {
      this.modelId = scope.row.id;
      this.dialogAddModel = true;
    }

    // 保存新增/编辑
    async finishAddModel(data: any) {
      console.log('data', data);
      await this.getListMixin();
    }
  }
</script>
<style lang="scss" scoped>
</style>
