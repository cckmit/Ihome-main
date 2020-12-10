<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:29:09
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-10 10:36:17
-->
<template>
  <div>
    <p class="ih-info-title">立项信息快照</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.snapshotVOS"
        style="width: 100%"
      >
        <el-table-column
          prop="snapshotEnum"
          label="类型"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.snapshotEnum, "SnapshotEnum")
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
    <p class="ih-info-title">立项操作日志</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.termLogVOS"
        style="width: 100%"
      >
        <el-table-column
          prop="operatorType"
          label="操作"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.operatorType, "OperatorType")
          }}</template>
        </el-table-column>
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
        <el-table-column label="系统">
        </el-table-column>
        <el-table-column
          label="备注"
          align="remark"
        >
        </el-table-column>
      </el-table>
    </div>

    <br />
    <p class="ih-info-title">OA附言信息</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.oafyVOS"
        style="width: 100%"
      >
        <el-table-column
          prop="sponsor"
          label="OA附言发起人"
        >
        </el-table-column>
        <el-table-column
          label="OA附言内容"
          prop="oaContent"
        >
        </el-table-column>
        <el-table-column
          label="OA附言时间"
          prop="oaTime"
        >
        </el-table-column>
        <el-table-column
          label="OA附言附件"
          align="center"
        >
          <template v-slot="{ row }">
            <IhUpload
              size="100px"
              :fileList="row.fileList"
              :limit="row.fileList.length"
              :removePermi="false"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_logAndOA_get__termId } from "@/api/project/index.ts";
@Component({
  components: {},
})
export default class SetMeal extends Vue {
  info: any = [];

  created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.$route.query.id;
    if (id) {
      const item = await get_logAndOA_get__termId({
        termId: id,
      });
      let arr: any = [];
      arr = item.oafyVOS.map((v: any) => ({
        ...v,
        fileList: [
          {
            name: v.picAddrs,
            fileId: v.picAddrs,
          },
        ],
      }));
      this.info = { ...arr, oafyVOS: arr };
    }
  }
}
</script>
<style lang="scss" scoped>
</style>