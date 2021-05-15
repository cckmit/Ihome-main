<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: zyc
 * @LastEditTime: 2021-05-15 09:45:27
-->
<template>
  <IhPage label-width="110px">
    <template v-slot:form>
      <el-form ref="form" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <!-- <IhSelectPageByProject
                v-model="queryPageParameters.proId"
                clearable
                :props="{
                  value: 'proId',
                  key: 'proId',
                  lable: 'proName'
                }"
              ></IhSelectPageByProject> -->
              <el-input
                clearable
                v-model="queryPageParameters.proName"
                placeholder="推广名/备案名/明源楼盘名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目审核状态">
              <el-select
                v-model="queryPageParameters.auditEnum"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ProAudit')"
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
                v-model="queryPageParameters.exMarket"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in YesOrNoType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联明源">
              <el-select
                v-model="queryPageParameters.exMinyuan"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in YesOrNoType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="父/子项目">
              <el-select
                v-model="queryPageParameters.exParent"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in ParOrChild"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="明源区域公司">
              <el-input
                clearable
                v-model="queryPageParameters.companyName"
                placeholder="模糊搜索"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目盘编">
              <el-input
                clearable
                v-model="queryPageParameters.proNo"
                placeholder="模糊搜索"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="省市区">
              <IhCascader
                v-model="provinceOption"
                clearable
                placeholder="请选择"
                class="width--100"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row class="el-row">
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button
          type="success"
          @click="add()"
          v-has="'B.SALES.PROJECT.BASICLIST.ADD'"
          >添加</el-button
        >
        <el-button type="info" @click="reset()">重置</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :empty-text="emptyText"
      >
        <el-table-column
          fixed
          prop="proNo"
          label="盘编"
          width="150"
        ></el-table-column>
        <el-table-column fixed label="项目名称" min-width="250">
          <template v-slot="{ row }">
            <div>{{ `推广名: ${row.proName}` }}</div>
            <div>{{ `备案名: ${row.proRecord ? row.proRecord : "-"}` }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="exMarket" width="150">
          <template #header>
            <div>市场化项目</div>
            <div>关联明源</div>
          </template>
          <template v-slot="{ row }">
            <div>{{ row.exMarket ? "是" : "否" }}</div>
            <div>{{ row.exMinyuan ? "是" : "否" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="明源信息" min-width="200">
          <template v-slot="{ row }">
            <div>{{ `父/子：${row.exParent ? "父项目" : "子项目"}` }}</div>
            <div>{{ `楼盘名：${row.myName ? row.myName : "-"}` }}</div>
            <div>
              {{ `区域公司：${row.companyName ? row.companyName : "-"}` }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="省市区" width="150">
          <template v-slot="{ row }">
            <div>{{ $root.getAreaName(row.province) }}</div>
            <div>{{ $root.getAreaName(row.city) }}</div>
            <div>{{ $root.getAreaName(row.district) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="proAddr" label="项目地址" width="300">
        </el-table-column>
        <el-table-column prop="auditEnum" label="项目审核状态" width="120">
          <template v-slot="{ row }">{{
            $root.dictAllName(row.auditEnum, "ProAudit")
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="routerTo(row, 'info')"
              >详情</el-link
            >
            <el-dropdown trigger="click" style="margin-left: 15px">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native.prevent="edit(row)"
                  v-has="'B.SALES.PROJECT.BASICLIST.UPDATE'"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native.prevent="routerTo(row, 'audit')"
                  :class="{ 'ih-data-disabled': !auditChange(row) }"
                  v-has="'B.SALES.PROJECT.BASICLIST.VERIFY'"
                  >审核</el-dropdown-item
                >
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': !editChange(row) }"
                  @click.native.prevent="yeguanEdit(row)"
                  v-has="'B.SALES.PROJECT.BASICLIST.YGUPDATE'"
                  >业管修改</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="changeSon(row)"
                  >变更子项目关联</el-dropdown-item
                >
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': !delChange(row) }"
                  @click.native.prevent="remove(row)"
                  v-has="'B.SALES.PROJECT.BASICLIST.DELETE'"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': !recallChange(row) }"
                  @click.native.prevent="recall(row)"
                  v-has="'B.SALES.PROJECT.BASICLIST.RECALL'"
                  >撤回</el-dropdown-item
                >
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
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  post_project_getList,
  post_project_del__proId,
} from "@/api/project/index";
import PaginationMixin from "@/mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class ProjectList extends Vue {
  queryPageParameters: any = {
    proName: null,
    auditEnum: null,
    exMarket: null,
    exMinyuan: null,
    exParent: null,
    companyName: null,
    proNo: null,
    proId: null,
    province: null,
    city: null,
    district: null,
  };
  provinceOption: any = [];
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  YesOrNoType = [
    {
      code: 1,
      name: "是",
    },
    {
      code: 0,
      name: "否",
    },
  ];

  ParOrChild = [
    {
      code: 1,
      name: "父项目",
    },
    {
      code: 0,
      name: "子项目",
    },
  ];

  editChange(row: any) {
    const Adopt = row.auditEnum === "Adopt";
    return Adopt;
  }

  delChange(row: any) {
    const Draft = row.auditEnum === "Draft"; // 草稿
    const Reject = row.auditEnum === "Reject"; // 驳回
    return Draft || Reject;
  }

  auditChange(row: any) {
    const Conduct = row.auditEnum === "Conduct"; // 审核中
    const RBusinessManagement = this.$roleTool.RBusinessManagement();
    const RHeadBusinessManagement = this.$roleTool.RHeadBusinessManagement();
    return (RBusinessManagement || RHeadBusinessManagement) && Conduct;
  }

  recallChange(row: any) {
    const Conduct = row.auditEnum === "Conduct";
    return Conduct;
  }

  get emptyText() {
    return this.resPageInfo.total === null
      ? "正在加载数据..."
      : "请点击查询加载数据";
  }

  search() {
    this.queryPageParameters.province = this.provinceOption[0];
    this.queryPageParameters.city = this.provinceOption[1];
    this.queryPageParameters.district = this.provinceOption[2];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  reset() {
    Object.assign(this.queryPageParameters, {
      proName: null,
      auditEnum: null,
      exMarket: null,
      exMinyuan: null,
      exParent: null,
      companyName: null,
      proNo: null,
      proId: null,
      province: null,
      city: null,
      district: null,
    });
    this.provinceOption = [];
  }

  // 添加
  add() {
    this.$router.push("/projects/childAdd");
  }

  edit(row: any) {
    window.sessionStorage.setItem("editType", "edit");
    if (row.exMinyuan) {
      if (!row.parentId) {
        this.$router.push({
          path: `/projects/parentEdit`,
          query: {
            id: row.proId,
            type: "edit",
          },
        });
      } else {
        this.$router.push({
          path: `/projects/childEdit`,
          query: {
            id: row.proId,
          },
        });
      }
    } else {
      this.$router.push({
        path: `/projects/childEdit`,
        query: {
          id: row.proId,
        },
      });
    }
  }
  yeguanEdit(row: any) {
    window.sessionStorage.setItem("editType", "yeguanEdit");
    if (row.exMinyuan) {
      if (!row.parentId) {
        this.$router.push({
          path: `/projects/parentEdit`,
          query: {
            id: row.proId,
            type: "yeguanEdit",
          },
        });
      } else {
        this.$router.push({
          path: `/projects/childEdit`,
          query: {
            id: row.proId,
          },
        });
      }
    } else {
      this.$router.push({
        path: `/projects/childEdit`,
        query: {
          id: row.proId,
        },
      });
    }
  }

  routerTo(row: any, type: string) {
    let where: any = "";
    switch (type) {
      case "info":
        if (row.exMinyuan) {
          if (!row.parentId) {
            where = "parentInfo";
          } else {
            where = "childInfo";
          }
        } else {
          where = "childInfo";
        }
        break;
      case "edit":
        if (row.exMinyuan) {
          if (!row.parentId) {
            where = "parentEdit";
          } else {
            where = "childEdit";
          }
        } else {
          where = "childEdit";
        }
        window.sessionStorage.setItem("editType", "edit");
        break;
      case "audit":
        if (row.exMinyuan) {
          if (!row.parentId) {
            where = "parentAudit";
          } else {
            where = "childAudit";
          }
        } else {
          where = "childAudit";
        }
        break;
      case "yeguanEdit":
        if (row.exMinyuan) {
          if (!row.parentId) {
            where = "parentEdit";
          } else {
            where = "childEdit";
          }
        } else {
          where = "childEdit";
        }
        window.sessionStorage.setItem("editType", "yeguanEdit");
        break;
    }
    this.$router.push({
      path: `/projects/${where}`,
      query: {
        id: row.proId,
      },
    });
  }
  changeSon(row: any) {
    this.$router.push({
      path: `/projects/parentEdit`,
      query: {
        id: row.proId,
        type: "cahngeSon",
      },
    });
  }

  // 删除
  async remove(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_project_del__proId({ proId: row.proId });
      this.$message({
        type: "success",
        message: "删除成功!",
      });
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }

  async recall(row: any) {
    this.$router.push({
      path: row.exParent ? `/projects/parentRecall` : `/projects/childRecall`,
      query: {
        id: row.proId,
      },
    });
  }

  created() {
    this.getListMixin();
  }

  //获取数据
  async getListMixin() {
    this.resPageInfo = await post_project_getList(this.queryPageParameters);
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