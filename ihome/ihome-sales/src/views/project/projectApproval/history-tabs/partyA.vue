<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:20:24
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-09 15:57:29
-->
<template>
  <div>
    <p class="ih-info-title">甲方合同信息</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.partyAContractInfos"
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="合同标题"
        ></el-table-column>
        <el-table-column label="甲方">
          <template v-slot="{ row }">
            <template v-for="(item, i) in row.partyList">
              <span :key="i">
                <span>{{item.userName}}</span>
                <span v-if="i !== row.partyList.length - 1">、</span>
              </span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="partyName"
          label="乙方"
        >
        </el-table-column>
        <el-table-column
          prop="cooperationTime"
          label="执行时间"
        >
          <template v-slot="{ row }">
            {{ row.cooperationTime && row.cooperationEnd ? `${row.cooperationTime} ~ ${row.cooperationEnd}` : '' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="handlerName"
          label="合同跟进人"
        ></el-table-column>
      </el-table>
    </div>
    <br />
    <div v-if="!(info.partyAInfoMesgVOS.length === 0 || info.partyAInfoMesgVOS.length === 1)">
      <p class="ih-info-title">栋座归属信息</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.partyAInfoMesgVOS"
          style="width: 100%"
        >
          <el-table-column
            prop="companyName"
            label="甲方名称"
          ></el-table-column>
          <el-table-column label="项目栋座">
            <template v-slot="{ row }">
              <template v-for="(item, i) in row.buildingVos">
                <span :key="i">
                  <span>{{item.buildingName}}</span>
                  <span v-if="i !== row.buildingVos.length - 1">、</span>
                </span>

              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <br />
    <el-form
      :model="info"
      label-width="140px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户成交以及确认">
            <el-input
              show-word-limit
              type="textarea"
              disabled
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入客户成交以及确认"
              v-model="info.partyAOaVO.customerConfirm"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="违约责任">
            <el-input
              show-word-limit
              type="textarea"
              disabled
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入违约责任"
              v-model="info.partyAOaVO.responsibiltity"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_his_partyAContract_get__termId } from "@/api/project/index.ts";
@Component({
  components: {},
})
export default class PartyA extends Vue {
  info: any = {
    partyAContractInfos: [],
    partyAInfoMesgVOS: [],
    partyAOaVO: {
      customerConfirm: null,
      responsibiltity: null,
    },
  };

  created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.$route.query.id;
    if (id) {
      this.info = await get_his_partyAContract_get__termId({
        termId: id,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>