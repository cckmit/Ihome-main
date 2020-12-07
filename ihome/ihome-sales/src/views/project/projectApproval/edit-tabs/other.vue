<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:28:28
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-07 17:32:52
-->
<template>
  <div>
    <p class="ih-info-title">收款信息</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info"
        style="width: 100%"
      >
        <el-table-column
          prop="packageName"
          label="收款方"
        ></el-table-column>
        <el-table-column
          label="收款方账号"
          prop="xxxxx"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.baseCostEnum, "BaseCostEnum")
          }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="select(row)"
            >选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />
    <p class="ih-info-title">成交归属组织</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info"
        style="width: 100%"
      >
        <el-table-column
          prop="packageName"
          label="末级组织"
        ></el-table-column>
        <el-table-column
          label="分公司"
          prop="xxxx"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.baseCostEnum, "BaseCostEnum")
          }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="select(row)"
            >选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />
    <div>
      <p class="ih-info-title">特殊业绩比例方案</p>
      <div class="special">
        <div>是否使用特殊业绩比例方案</div>
        <div class="special-icon">
          <el-tooltip
            class="item"
            effect="dark"
            placement="bottom-start"
          >
            <div slot="content">业绩比例方案指我司内部员工业绩的分配方案，
              选择特殊业绩方案后本周期将不<br />使用分公司统一
              的业绩方案进行员工业绩分配，如需使用分公司
              统一业绩方案此<br />处不要进行配置</div>
            <i class="el-icon-question" />
          </el-tooltip>
        </div>
        <div>
          <el-input
            placeholder="特殊业绩方案"
            v-model="special"
            class="input-with-select margin-left-10"
            style="width: 90%"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="specialClick"
            ></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <br />
    <div>
      <p class="ih-info-title">其他渠道费配置</p>
      <div class="special">
        <div>允许临时穿底</div>
        <div class="special-icon">
          <el-tooltip
            class="item"
            effect="dark"
            placement="bottom-start"
          >
            <div slot="content">开启后，当该项目周期提交成交报告其他
              渠道费用不足时，可先透支预提交（其<br />他渠道费用允许为负数）
            </div>
            <i class="el-icon-question" />
          </el-tooltip>
        </div>
        <div class="margin-left-20">
          <el-switch
            v-model="otherChannel"
            active-color="#ef9d39"
            inactive-color="#7b7b7b"
          >
          </el-switch>
        </div>
      </div>
      <br />
      <div class="special">
        <div>允许跨项目使用</div>
        <div class="special-icon">
          <el-tooltip
            class="item"
            effect="dark"
            placement="bottom-start"
          >
            <div slot="content">开启后，下面列表允许新增其他项目的周期，
              本周期可使用其他项目周期的其他<br />使用分公司统一渠道费用</div>
            <i class="el-icon-question" />
          </el-tooltip>
        </div>
        <div class="margin-left-20">
          <el-switch
            v-model="allow"
            active-color="#ef9d39"
            inactive-color="#7b7b7b"
          >
          </el-switch>
        </div>
      </div>
      <br />
      <div>
        <div class="top">
          <div class="title">允许共享其他渠道费周期列表</div>
          <div class="right-button">
            <div style="width: 40px">筛选</div>
            <el-select
              style="width: 40%"
              v-model="info.propertyEnum"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in $root.dictAllList('PropertyEnum')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <el-button
              type="success"
              size="small"
              @click="add"
            >+新增允许周期</el-button>
          </div>
        </div>
      </div>
      <br />
      <el-table
        class="ih-table"
        :data="info"
        style="width: 100%"
      >
        <el-table-column
          prop="packageName"
          label="周期名称"
        ></el-table-column>
        <el-table-column
          label="分公司"
          prop="所属项目"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.baseCostEnum, "BaseCostEnum")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="packageName"
          label="已用其他渠道费金额"
        ></el-table-column>
        <el-table-column
          prop="packageName"
          label="状态"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="info"
              @click="select(row)"
            >禁用</el-button>
            <el-button
              size="small"
              type="success"
              @click="select(row)"
            >启用</el-button>
            <el-button
              size="small"
              type="danger"
              @click="select(row)"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ih-dialog :show="dialogVisible">
      <Edit
        :data="editData"
        @cancel="() => (dialogVisible = false)"
        @finish="(data) => addFinish(data)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Edit from "../dialog/setMeal-dialog/edit.vue";
import { post_collectandsend_getAllByTerm } from "@/api/project/index.ts";
@Component({
  components: {
    Edit,
  },
})
export default class Other extends Vue {
  dialogVisible = false;
  info: any = [];
  editData: any = {};
  special = "";
  otherChannel = false;
  allow = false;

  created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.$route.query.id;
    if (id) {
      this.info = await post_collectandsend_getAllByTerm({
        termId: id,
      });
      this.info = [{}];
    }
  }

  select(row: any) {
    this.dialogVisible = true;
    this.editData.id = row.packageId;
  }

  specialClick() {
    console.log();
  }

  add() {
    console.log();
  }
}
</script>
<style lang="scss" scoped>
.special {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
  &-icon {
    margin-left: 10px;
  }
}
.el-icon-question {
  font-size: 20px;
  color: #ef9d39;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  .title {
    font-size: 15px;
    text-align: center;
  }
  .right-button {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>