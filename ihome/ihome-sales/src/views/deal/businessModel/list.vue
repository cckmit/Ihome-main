<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-10-29 13:53:20
 * @LastEditors: lsj
 * @LastEditTime: 2020-10-30 14:34:50
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
        :empty-text="emptyText">
        <el-table-column prop="modelCode" label="业务模式" min-width="120">
          <template slot-scope="scope">
            <div>{{$root.dictAllName(scope.row.modelCode, 'BusinessModel')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="contType" label="合同类型" min-width="240"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-link
              class="margin-right-10"
              type="primary"
              @click.native.prevent="edit(scope)"
            >编辑
            </el-link>
            <el-link
              style="color: #f66"
              type="primary"
              @click.native.prevent="remove(scope)"
            >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination v-if="false">
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
        :data="modelCode"
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
    post_buModelContType_getList,
    post_buModelContType_delete
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
      total: null,
      list: [],
    };
    dialogAddModel: any = false;
    modelCode: any = false;

    async created() {
      // console.log('业务模式', (this as any).$root.dictAllList('BusinessModel'));
      await this.getListMixin();
    }

    // 获取业务模式列表
    async getListMixin() {
      this.resPageInfo.list = await post_buModelContType_getList(this.queryPageParameters);
      if (this.resPageInfo.list && this.resPageInfo.list.length > 0) {
        this.resPageInfo.list.forEach((listItem: any) => {
          // 合同类型
          if (listItem.contTypeList.length > 0) {
            let nameType: any = [];
            listItem.contTypeList.forEach((typeItem: any) => {
              let name = (this as any).$root.dictAllName(typeItem, 'ContType')
              nameType.push(name);
            })
            if (nameType.length > 0) {
              listItem.contType = nameType.join('，');
            } else {
              listItem.contType = "";
            }
          }
        })
      }
    }

    // 删除
    async remove(scope: any) {
      try {
        await this.$confirm("是否确定删除?", "提示");
        await post_buModelContType_delete({modelCode: scope.row.modelCode});
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
      this.modelCode = null;
      this.dialogAddModel = true;
    }

    // 编辑
    async edit(scope: any) {
      this.modelCode = scope.row.modelCode;
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
