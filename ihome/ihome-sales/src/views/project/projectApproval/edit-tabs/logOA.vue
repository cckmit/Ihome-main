<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:29:09
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-26 16:14:40
-->
<template>
  <div>
    <p class="ih-info-title">立项信息快照</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.termHisVOS"
        style="width: 100%"
      >
        <el-table-column
          prop="snapshotEnum"
          label="类型"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.snapshotEnum, "Snapshot")
          }}</template>
        </el-table-column>
        <el-table-column
          label="发起人"
          prop="startMan"
        >
        </el-table-column>
        <el-table-column
          label="终审通过时间"
          prop="auditTime"
        >
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
              @click="view(row)"
            >查看快照</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <br />
    <div class="logOA">
      <p class="ih-info-title">立项操作日志</p>
      <div class="logOAButton">
        <el-button
          size="small"
          type="primary"
          @click="queryLog"
        >查询OA审核日志</el-button>
        <el-button
          size="small"
          type="primary"
          @click="queryCurrent"
        >查询OA当前待办人</el-button>
      </div>
    </div>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.termLogVOS"
        style="width: 100%"
      >
        <el-table-column
          prop="node"
          label="操作"
        ></el-table-column>
        <el-table-column
          label="操作人"
          prop="operatorMan"
        >
        </el-table-column>
        <el-table-column
          label="岗位"
          prop="station"
        >
        </el-table-column>
        <el-table-column
          label="操作时间"
          prop="operatorTime"
        >
        </el-table-column>
        <el-table-column
          label="处理结果"
          prop="dealRes"
        >
        </el-table-column>
        <el-table-column
          label="系统"
          prop="operatorType"
        >
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_logAndOA_get__termId,
  post_logAndOA_getTermLog__termId,
  get_logAndOA_getOALog__termId,
} from "@/api/project/index.ts";
@Component({
  components: {},
})
export default class LogOA extends Vue {
  info: any = {
    termHisVOS: [],
    termLogVOS: [],
  };

  get termId() {
    return this.$route.query.id;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    if (this.termId) {
      const item = await get_logAndOA_get__termId({
        termId: this.termId,
      });
      console.log(item);
      this.info = { ...item };
    }
  }

  async queryLog() {
    const res = await post_logAndOA_getTermLog__termId({
      termId: this.termId,
    });
    if (res.length) {
      this.info.termLogVOS = res;
    }
  }

  async queryCurrent() {
    let res: any = await get_logAndOA_getOALog__termId({
      termId: this.termId,
    });
    this.$alert(res, "当前待办人", {
      confirmButtonText: "确定",
    });
  }

  view(data: any) {
    let router = this.$router.resolve({
      path: `/projectApproval/history`,
      query: {
        id: data.termId,
      },
    });
    window.open(router.href, "_blank");
  }
}
</script>
<style lang="scss" scoped>
.logOA {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  .logOAButton {
    margin: 5px 0 0 20px;
  }
  .operator {
    margin-left: 20px;
  }
}
</style>