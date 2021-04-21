<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-06 09:59:47
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-17 10:30:27
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
        :rules="rules"
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
                clearable
                placeholder="请选择是否涉及佣金标准"
                style="max-width: 350px; width: 100%"
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
                clearable
                placeholder="请选择佣金类型"
                style="max-width: 350px; width: 100%"
                @change="info.contractMxVOList = []"
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
                placeholder="请输入内容"
                clearable
                style="max-width: 350px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标题备注">
              <el-input
                v-model="info.titleOrRemark"
                placeholder="请输入标题备注"
                clearable
                style="max-width: 350px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                style="max-width: 350px; width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="isShow">
          <div class="text-right padding-right-10">
            <el-button
              type="success"
              @click="add()"
            >增加</el-button>
          </div>
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
            row.propertyEnum ? $root.dictAllName(row.propertyEnum, "Property") : '-'
          }}</template>
            </el-table-column>
            <el-table-column
              label="佣金分类"
              prop="costTypeEnum"
            >
              <template v-slot="{ row }">{{
            row.costTypeEnum ? $root.dictAllName(row.costTypeEnum, "FeeType") : '-'
          }}</template>
            </el-table-column>
            <el-table-column
              label="条件"
              prop="standardPay"
            >
              <template v-slot="{ row }">{{ row.standardPay ? row.standardPay : '-' }}</template>
            </el-table-column>
            <el-table-column
              label="派发佣金标准"
              prop="sendContext"
            >
              <template v-slot="{ row }">{{ row.sendContext ? row.sendContext : '-' }}</template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
              align="center"
            >
              <template v-slot="{ $index }">
                <el-button
                  type="danger"
                  size="small"
                  @click="del($index)"
                >删除</el-button>
              </template>
            </el-table-column>
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
                @newFileList="newFileList"
                accept=".pdf, .doc, .docx, .docm"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <ih-dialog :show="setmealDialogVisible">
        <SetMealDialog
          :searchdata="setMealDialogData"
          @cancel="() => (setmealDialogVisible = false)"
          @finish="(data) => setMealFinish(data)"
        />
      </ih-dialog>
      <div class="text-center positon">
        <el-button
          type="success"
          @click="finish()"
          :loading="finishLoading"
        >提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { get_company_get__id } from "@/api/system";
import {
  post_distributContract_addNoChannel,
  post_distributContract_updateNoChannel,
  get_distributContract_getDistri__agencyContrictId,
  post_distributContract_getCheckCollectByCondition,
} from "@/api/project";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import SetMealDialog from "../../setMealDialog.vue";
@Component({
  components: { SetMealDialog },
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
    titleOrRemark: null,
  };
  private rules: any = {
    contractTitle: [
      {
        required: true,
        message: "请填写合同标题",
        trigger: "change",
      },
    ],
    commissionKind: [
      {
        required: true,
        message: "请选择佣金类型",
        trigger: "change",
      },
    ],
    exInvolvedCommiss: [
      {
        required: true,
        message: "请选择是否涉及佣金标准",
        trigger: "change",
      },
    ],
  };
  private fileList: any = [];
  private finishLoading: any = false;
  private isShow: any = false;
  queryObj: any = {};
  setmealDialogVisible: any = false;
  setMealDialogData: any = {};

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
    if (this.agencyContrictId) {
      const data = await get_distributContract_getDistri__agencyContrictId({
        agencyContrictId: this.agencyContrictId,
      });
      this.info = {
        ...data,
        ...JSON.parse(res),
        timeList: [],
      };
      if (data.contractStartTime && data.contractEndTime) {
        this.info.timeList = [data.contractStartTime, data.contractEndTime];
      }
      this.fileList = data.attachTermItemVOS.map((v: any) => ({
        fileId: v.fileId,
        fileName: v.fileName,
        type: v.type,
        exAuto: v.exAuto,
      }));
    } else {
      Object.assign(this.info, JSON.parse(res));
      if (this.info.preferentialPartyAId) {
        const item = await get_company_get__id({
          id: this.info.preferentialPartyAId,
        });
        this.info.partyCompany = item?.name;
        this.info.partyCompanyId = item?.id;
        this.info.partyaAddr = item?.address;
      }
    }
  }

  newFileList(data: any) {
    this.info.attachTermItemVOS = data.map((v: any) => ({
      fileId: v.fileId,
      fileName: v.fileName,
      type: "IntermediaryDistribut",
    }));
  }

  add() {
    this.setMealDialogData.channelEnum = this.info.channelEnum;
    this.setMealDialogData.padCommissionEnum = this.info.padCommissionEnum;
    this.setMealDialogData.id = this.info.termId;
    this.setMealDialogData.contractKind = "NoChannel";
    this.setmealDialogVisible = true;
  }

  async del(index: number) {
    try {
      this.info.contractMxVOList.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async setMealFinish(data: any) {
    if (data.length) {
      let arr: any = [];
      arr = data.map((v: any) => v.packageMxId);
      this.queryObj.packMxIds = [
        ...new Set(
          arr.concat(this.info.contractMxVOList.map((v: any) => v.conditionId))
        ),
      ];
      this.queryObj.termId = this.info.termId;
      this.queryObj.channelEnum = this.info.channelEnum;
      this.queryObj.padCommissionEnum = this.info.padCommissionEnum;
      this.queryObj.contractKind = "NoChannel";
      this.queryObj.commissionKind = this.info.commissionKind;
      if (this.isShow) {
        this.queryObj.designatedAgencyId = this.info.designatedAgencyId;
        this.queryObj.designatedAgency = this.info.designatedAgency;
        this.queryObj.companyKind = this.info.companyKind;
      }
      const item = await post_distributContract_getCheckCollectByCondition(
        this.queryObj
      );
      this.info.contractMxVOList = item;
      this.$message.success("新增成功");
      this.setmealDialogVisible = false;
    } else {
      this.$message.warning("请勾选详细收派标准信息");
    }
  }

  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }

  @NoRepeatHttp()
  async submit(v: any) {
    if (v) {
      let obj: any = {};
      obj = { ...this.info };
      let flag = this.info.timeList && this.info.timeList.length;
      obj.contractStartTime = flag ? this.info.timeList[0] : null;
      obj.contractEndTime = flag ? this.info.timeList[1] : null;
      delete obj.timeList;
      delete obj.padCommissionEnum;
      delete obj.preferentialPartyAId;
      console.log(obj);
      if (!this.info.attachTermItemVOS.length) {
        this.$message.warning("请上传合同电子版附件");
        return false;
      }
      if (!this.agencyContrictId) {
        try {
          this.finishLoading = true;
          await post_distributContract_addNoChannel(obj);
          this.$message.success("模板添加成功");
          this.finishLoading = false;
          window.sessionStorage.setItem("tabStatus", "Notification");
          this.$router.go(-1);
        } catch (err) {
          this.finishLoading = false;
          console.log(err);
        }
      } else {
        if (this.$route.name === "copyNotChannelApply") {
          try {
            this.finishLoading = true;
            await post_distributContract_addNoChannel(obj);
            this.$message.success("模板复制成功");
            this.finishLoading = false;
            window.sessionStorage.setItem("tabStatus", "Notification");
            this.$router.go(-1);
          } catch (err) {
            this.finishLoading = false;
            console.log(err);
          }
        } else if (this.$route.name === "notChannelApply") {
          try {
            this.finishLoading = true;
            await post_distributContract_updateNoChannel(obj);
            this.$message.success("模板编辑成功");
            this.finishLoading = false;
            window.sessionStorage.setItem("tabStatus", "Notification");
            this.$router.go(-1);
          } catch (err) {
            this.finishLoading = false;
            console.log(err);
          }
        }
      }
    } else {
      setTimeout(() => {
        let isError: any = document.getElementsByClassName("is-error");
        if (isError != null) {
          isError[0].querySelector("input").focus();
        }
      }, 100);
      return false;
    }
  }

  cancel() {
    window.sessionStorage.setItem("tabStatus", "Notification");
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