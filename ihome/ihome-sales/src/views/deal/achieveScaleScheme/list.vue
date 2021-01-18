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
      <p class="ih-info-title">{{branchCompanyName}}业绩比例管理</p>
      <el-form ref="form" label-width="110px" @submit.native.prevent>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务模式">
              <el-select
              v-model="queryPageParameters.modelCode"
              clearable
              placeholder="请选择业务模式"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('BusinessModel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同类型">
              <el-select
                v-model="queryPageParameters.contType"
                clearable
                placeholder="请选择合同类型"
                class="width--100">
                <el-option
                  v-for="item in $root.dictAllList('ContType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物业类型">
              <el-select
                v-model="queryPageParameters.property"
                clearable
                multiple
                collapse-tags
                placeholder="请选择物业类型"
                class="width--100">
                <el-option
                  v-for="item in $root.dictAllList('Property')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否市场化项目">
              <el-select
                v-model="queryPageParameters.isMarketProject"
                clearable
                placeholder="请选择是否市场化项目"
                class="width--100">
                <el-option label="是" value="Yes"></el-option>
                <el-option label="否" value="No"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分销与总包一致">
              <el-select
                v-model="queryPageParameters.isSame"
                clearable
                placeholder="请选择分销与总包一致"
                class="width--100">
                <el-option label="是" value="Yes"></el-option>
                <el-option label="否" value="No"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否特殊方案">
              <el-select
                v-model="queryPageParameters.isSpecial"
                clearable
                placeholder="请选择是否特殊方案"
                class="width--100">
                <el-option label="是" value="Yes"></el-option>
                <el-option label="否" value="No"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row class="margin-left-10">
        <el-button type="primary" @click="getListMixin()">查询</el-button>
        <el-button
          v-has="'B.SALES.DEAL.ACHIEVELIST.ADD'"
          type="success" @click="add()">添加</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
      </el-row>
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
        <el-table-column prop="modelCode" label="业务模式" min-width="120"></el-table-column>
        <el-table-column prop="isMarketProject" label="是否市场化项目" min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.isMarketProject">{{scope.row.isMarketProject === 'Yes' ? '是' : '否'}}</div>
            <div v-else></div>
          </template>
        </el-table-column>
        <el-table-column prop="isSpecial" label="是否特殊方案" min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.isSpecial">{{scope.row.isSpecial === 'Yes' ? '是' : '否'}}</div>
            <div v-else></div>
          </template>
        </el-table-column>
        <el-table-column prop="isSame" label="分销与总包一致" min-width="120">
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
                <el-dropdown-item
                  v-has="'B.SALES.DEAL.ACHIEVELIST.UPDATE'"
                  @click.native.prevent="edit(scope)"
                >修改
                </el-dropdown-item>
                <el-dropdown-item
                  v-has="'B.SALES.DEAL.ACHIEVELIST.DELETE'"
                  @click.native.prevent="remove(scope)"
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
    branchCompanyName: any = null; // 分公司名称
    queryPageParameters: any = {
      modelCode: null,
      contType: null,
      property: null,
      isMarketProject: null,
      isSame: null,
      isSpecial: null
    };

    resPageInfo: any = {
      total: null,
      list: [],
    };
    companyId: any = null; // 分公司id

    async created() {
      // console.log('物业类型', (this as any).$root.dictAllList('Property'));
      this.companyId = localStorage.getItem('companyId');
      if (this.companyId) {
        await this.getListMixin();
      }
    }

    // 获取分公司业绩比例方案列表
    async getListMixin() {
      let self = this;
      if (!self.companyId) return;
      let contTypeList = (self as any).$root.dictAllList('ContType'); // 合同类型
      let propertyList = (self as any).$root.dictAllList('Property'); // 物业类型
      let businessModelList = (self as any).$root.dictAllList('BusinessModel'); // 业务类型
      self.queryPageParameters.branchCompanyId = self.companyId; // 分公司id
      self.resPageInfo = await post_achieveScaleScheme_getList(self.queryPageParameters);
      if (self.resPageInfo.list && self.resPageInfo.list.length > 0) {
        this.branchCompanyName = self.resPageInfo.list[0].branchCompany;
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
              listItem.contType = nameType.join('，');
            } else {
              listItem.contType = "";
            }
          }
          // 物业类型
          if (listItem.propertyTypeStr) {
            let typeArr = listItem.propertyTypeStr.split(',');
            let propertyNameType: any = [];
            if (typeArr.length > 0) {
              typeArr.forEach((typeItem: any) => {
                if (propertyList && propertyList.length > 0) {
                  propertyList.forEach((propertyItem: any) => {
                    if (typeItem === propertyItem.code) {
                      propertyNameType.push(propertyItem.name);
                    }
                  })
                }
              })
            }
            if (propertyNameType.length > 0) {
              listItem.propertyTypeStr = propertyNameType.join('，');
            } else {
              listItem.propertyTypeStr = "";
            }
          }
          // 业务模式
          if (listItem.modelCode) {
            if (businessModelList && businessModelList.length > 0) {
              businessModelList.forEach((businessItem: any) => {
                if (listItem.modelCode === businessItem.code) {
                  listItem.modelCode = businessItem.name;
                }
              })
            } else {
              listItem.modelCode = "";
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
        modelCode: null,
        contType: null,
        achievePropertyTypeList: null,
        isMarketProject: null,
        isSame: null,
        isSpecial: null,
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
