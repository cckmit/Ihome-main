<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-10-29 13:53:20
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-13 14:36:16
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
        :empty-text="emptyText"
        :data="resPageInfo.list">
        <el-table-column prop="branchCompany" label="分公司" min-width="120"></el-table-column>
        <el-table-column prop="contType" label="合同类型" min-width="120"></el-table-column>
        <el-table-column prop="propertyTypeStr" label="物业类型" min-width="120"></el-table-column>
        <el-table-column prop="modelName" label="业务模式" min-width="120"></el-table-column>
        <el-table-column prop="isMarketProject" label="是否市场化项目" min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.isMarketProject">{{scope.row.isMarketProject === 'Yes' ? '是' : '否'}}</div>
            <div v-else></div>
          </template>
        </el-table-column>
        <el-table-column prop="isSame" label="分销同步总包" min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.isSame">{{scope.row.isSame === 'Yes' ? '是' : '否'}}</div>
            <div v-else></div>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注说明" min-width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-link
              class="margin-right-10"
              type="primary"
              @click.native.prevent="info(scope)"
            >查看
            </el-link>
            <el-dropdown trigger="click" style="margin-left: 15px">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="edit(scope)"
                >编辑
                </el-dropdown-item>
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
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  import {
    post_achieveScaleScheme_getList,
    post_achieveScaleScheme_delete__id,
  } from "@/api/deal";

  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class AchieveScaleSchemeList extends Vue {
    queryPageParameters: any = {
      modelName: null
    };

    resPageInfo: any = {
      total: null,
      list: [{}],
    };
    companyId: any = null; // 分公司id

    async created() {
      // console.log('物业类型', (this as any).$root.dictAllList('PropertyEnum'));
      this.companyId = this.$route.query.id;
      if (this.companyId) {
        await this.getListMixin();
      }
    }

    // 获取分公司业绩比例方案列表
    async getListMixin() {
      let self = this;
      if (!self.companyId) return;
      let contTypeList = (self as any).$root.dictAllList('ContType'); // 合同类型
      let propertyEnumList = (self as any).$root.dictAllList('PropertyEnum'); // 物业类型
      let businessModelList = (self as any).$root.dictAllList('BusinessModel'); // 业务类型
      self.queryPageParameters.branchCompanyId = self.companyId; // 分公司id
      self.resPageInfo = await post_achieveScaleScheme_getList(self.queryPageParameters);
      if (self.resPageInfo.list && self.resPageInfo.list.length > 0) {
        self.resPageInfo.list.forEach((listItem: any) => {
          // 合同类型
          if (listItem.contType) {
            let typeArr = listItem.contType.split(',');
            let nameType: any = [];
            if (typeArr.length > 0) {
              typeArr.forEach((typeItem: any) => {
                if (contTypeList && contTypeList.length > 0) {
                  contTypeList.forEach((list: any) => {
                    if (list.code === typeItem.replace(" ", "")) {
                      nameType.push(list.name);
                    }
                  })
                }
              })
            }
            if (nameType.length > 0) {
              listItem.contType = nameType.join(',');
            } else {
              listItem.contType = "";
            }
          }
          // 物业类型
          if (listItem.propertyTypeStr) {
            let typeArr = listItem.contType.split(',');
            let propertyNameType: any = [];
            if (typeArr.length > 0) {
              typeArr.forEach((typeItem: any) => {
                if (propertyEnumList && propertyEnumList.length > 0) {
                  propertyEnumList.forEach((propertyItem: any) => {
                    if (typeItem === propertyItem.code) {
                      propertyNameType.push(propertyItem.name);
                    }
                  })
                }
              })
            }
            if (propertyNameType.length > 0) {
              listItem.propertyTypeStr = propertyNameType.join(',');
            } else {
              listItem.propertyTypeStr = "";
            }
          }
          // 业务模式
          if (listItem.modelName) {
            let typeArr = listItem.contType.split(',');
            let businessNameType: any = [];
            if (typeArr.length > 0) {
              typeArr.forEach((typeItem: any) => {
                if (businessModelList && businessModelList.length > 0) {
                  businessModelList.forEach((businessItem: any) => {
                    if (typeItem === businessItem.code) {
                      businessNameType.push(businessItem.name);
                    }
                  })
                }
              })
            }
            if (businessNameType.length > 0) {
              listItem.modelName = businessNameType.join(',');
            } else {
              listItem.modelName = "";
            }
          }
        })
      }
    }

    // 分公司业绩比例方案详情-查看
    async info(scope: any) {
      this.$router.push({
        path: "/achieveScaleScheme/info",
        query: {id: scope.row.id},
      });
    }

    // 删除
    async remove(scope: any) {
      try {
        await this.$confirm("是否确定删除?", "提示");
        await post_achieveScaleScheme_delete__id({id: scope.row.id});
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        await this.getListMixin();
      } catch (error) {
        console.log(error);
      }
    }

    // 重置
    reset() {
      this.queryPageParameters = {
        modelName: null,
        pageNum: 1,
        pageSize: this.queryPageParameters.pageSize,
      };
    }

    // 新增
    async add() {
      this.$router.push({
        path: "/achieveScaleScheme/add",
        query: {
          companyId: this.companyId
        },
      });
    }

    // 编辑
    async edit(scope: any) {
      this.$router.push({
        path: "/achieveScaleScheme/add",
        query: {
          id: scope.row.id,
          companyId: this.companyId
        },
      });
    }
  }
</script>
<style lang="scss" scoped>
</style>
