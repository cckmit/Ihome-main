<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-06 10:03:46
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-09 14:41:49
-->
<template>
  <ih-page class="text-left notSale">
    <template #info>
      <div class="title">非渠道合同模板</div>
      <br />
      <el-form
        ref="form"
        label-width="140px"
        :model="info"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同类型">
              <span>非渠道合同</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="是否涉及佣金标准"
              prop="exInvolvedCommiss"
            >
              <el-select
                v-model="info.exInvolvedCommiss"
                disabled
                placeholder="请选择是否涉及佣金标准"
                class="width-350"
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
          <el-col :span="12">
            <el-form-item
              label="佣金类型"
              prop="commissionKind"
            >
              <el-select
                v-model="info.commissionKind"
                disabled
                placeholder="请选择佣金类型"
                class="width-350"
              >
                <el-option
                  v-for="item in $root.dictAllList('CommissionKind')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="合同标题"
              prop="contractTitle"
            >
              <el-input
                v-model="info.contractTitle"
                readonly
                placeholder="请输入内容"
                class="width-350"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称">
              <span>{{info.proName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方公司">
              <span>{{info.partyCompany}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合作时间">
              <el-date-picker
                v-model="info.timeList"
                type="daterange"
                readonly
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="isShow">
          <br />
          <el-table
            class="ih-table partyA-table"
            :data="info.contractMxVOList"
          >
            <el-table-column
              label="物业类型"
              prop="propertyEnum"
            >
              <template v-slot="{ row }">{{
            $root.dictAllName(row.propertyEnum, "Property")
          }}</template>
            </el-table-column>
            <el-table-column
              label="佣金分类"
              prop="costTypeEnum"
            >
              <template v-slot="{ row }">{{
            $root.dictAllName(row.costTypeEnum, "FeeType")
          }}</template>
            </el-table-column>
            <el-table-column
              label="条件"
              prop="standardPay"
            ></el-table-column>
            <el-table-column
              label="派发佣金标准"
              prop="sendContext"
            ></el-table-column>
          </el-table>
          <br />
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="合同电子版"
              required
            >
              <IhUpload
                v-model="fileList"
                size="100px"
                :upload-show="!!fileList.length"
                :limit="fileList.length"
                :editPermi="false"
                :removePermi="false"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center positon">
        <el-button @click="cancel">返 回</el-button>
      </div>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { get_distributContract_getDistri__agencyContrictId } from "@/api/project";
@Component({
  components: {},
})
export default class NotSalesApply extends Vue {
  private info: any = {
    agencyContrictId: null,
    attachTermItemVOS: [],
    contractEndTime: null,
    contractStartTime: null,
    contractTitle: null,
    partyCompany: null,
    partyCompanyId: null,
    partyaAddr: null,
    proId: null,
    proName: null,
    proRecord: null,
    termId: null,
    timeList: [],
    commissionKind: null,
    exInvolvedCommiss: null,
    contractMxVOList: [],
  };
  private fileList: any = [];
  private finishLoading: any = false;
  private isShow: any = false;

  @Watch("info.exInvolvedCommiss", { immediate: true })
  async getIsShow(val: any) {
    if (val === "Yes") {
      this.isShow = true;
    } else {
      this.info.contractMxVOList = [];
      this.isShow = false;
    }
  }

  get agencyContrictId() {
    return this.$route.query.id;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    const res: any = sessionStorage.getItem("addContract");
    const data = await get_distributContract_getDistri__agencyContrictId({
      agencyContrictId: this.agencyContrictId,
    });
    this.info = {
      ...data,
      ...JSON.parse(res),
      timeList: [],
    };
    this.info.timeList = [data.contractStartTime, data.contractEndTime];
    this.fileList = data.attachTermItemVOS.map((v: any) => ({
      fileId: v.fileId,
      fileName: v.fileName,
      type: v.type,
      exAuto: v.exAuto,
    }));
  }

  cancel() {
    this.$router.go(-1);
  }
}
</script>
<style scoped lang="scss">
.notSale {
  position: relative;
}
.title {
  font-size: 18px;
  font-weight: 600;
}
.positon {
  position: absolute;
  bottom: 50px;
  left: calc(50% - 75px);
}
</style>