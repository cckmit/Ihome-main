<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:20:24
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-09 20:04:27
-->
<template>
  <div>
    <div class="partyA">
      <p class="ih-info-title">甲方合同信息</p>
      <div class="partyButton">
        <el-button
          size="small"
          type="success"
          @click="addSystemParty"
        >从系统中选取合同</el-button>
        <el-button
          size="small"
          type="success"
          @click="addParty"
        >新增录入合同</el-button>
      </div>
    </div>
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
        ></el-table-column>
        <el-table-column
          prop="handlerName"
          label="合同跟进人"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="danger"
              @click="delPartyA(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />
    <div class="partyA">
      <p class="ih-info-title">栋座归属信息</p>
      <div class="partyButton">
        <el-button
          size="small"
          type="success"
          @click="editParty"
        >修改
        </el-button>
      </div>
    </div>
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
      <br />
      <el-form
        :model="info"
        label-width="140px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户成交以及确认">
              <div class="editParty">
                <el-input
                  show-word-limit
                  type="textarea"
                  disabled
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  placeholder="请输入客户成交以及确认"
                  v-model="info.partyAOaVO.customerConfirm"
                >
                </el-input>
                <i
                  class="el-icon-edit-outline tubiao"
                  @click="customerDialog"
                ></i>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="违约责任">
              <div class="editParty">
                <el-input
                  show-word-limit
                  type="textarea"
                  disabled
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  placeholder="请输入违约责任"
                  v-model="info.partyAOaVO.responsibiltity"
                >
                </el-input>
                <i
                  class="el-icon-edit-outline tubiao"
                  @click="responsibiltityDialog"
                ></i>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <ih-dialog :show="dialogVisible">
      <PartyAList
        @cancel="() => (dialogVisible = false)"
        @finish="(data) => systemAddFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="editDialogVisible">
      <PartyADialog
        :data="editData"
        @cancel="() => (editDialogVisible = false)"
        @finish="(data) => editFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="budingEditDialogVisible">
      <PartyABuding
        :data="budingEditData"
        @cancel="() => (budingEditDialogVisible = false)"
        @finish="(data) => budingEditFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="addDialogVisible">
      <PartyAAdd
        @cancel="() => (addDialogVisible = false)"
        @finish="(data) => addFinish(data)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PartyAList from "../dialog/partyA-dialog/partyAList.vue";
import PartyADialog from "../dialog/partyA-dialog/partyADialog.vue";
import PartyABuding from "../dialog/partyA-dialog/partyABuding.vue";
import PartyAAdd from "../dialog/partyA-dialog/partyAAdd.vue";
import { post_contract_create } from "@/api/contract/index.ts";
import {
  get_partyAContract_get__termId,
  post_partyAContract_add,
  post_partyAContract_saveOaRemark,
  post_partyAContract_del,
  post_partyAContract_addPartyABuildings,
} from "@/api/project/index.ts";
@Component({
  components: {
    PartyAList,
    PartyADialog,
    PartyABuding,
    PartyAAdd,
  },
})
export default class PartyA extends Vue {
  dialogVisible = false;
  editDialogVisible = false;
  budingEditDialogVisible = false;
  addDialogVisible = false;
  info: any = {
    partyAContractInfos: [],
    partyAInfoMesgVOS: [],
    partyAOaVO: {
      customerConfirm: null,
      responsibiltity: null,
    },
  };
  editData: any = {};
  editType: any = "";
  budingEditData: any = [];

  created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.$route.query.id;
    if (id) {
      this.info = await get_partyAContract_get__termId({
        termId: id,
      });
    }
  }

  async delPartyA(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      let partyAIds = row.partyList.map((v: any) => v.userId);
      await post_partyAContract_del({
        termId: this.$route.query.id,
        contractId: row.id,
        partyAIds: partyAIds,
      });
      this.$message({
        type: "success",
        message: "删除成功!",
      });
      this.getInfo();
    } catch (error) {
      console.log(error);
    }
  }

  addSystemParty() {
    this.dialogVisible = true;
  }
  async systemAddFinish(data: any) {
    const ids: any = [];
    data.forEach((v: any) => {
      ids.push(v.id);
    });
    await post_partyAContract_add({
      partyAContractVOS: ids,
      termId: this.$route.query.id,
    });
    this.$message.success("新增成功");
    this.getInfo();
    this.dialogVisible = false;
  }

  addParty() {
    this.addDialogVisible = true;
  }

  async addFinish(data: any) {
    data.projectsId = window.sessionStorage.getItem("proId");
    data.cycleId = this.$route.query.id;
    await post_contract_create(data);
    this.$message.success("录入成功");
    this.getInfo();
    this.addDialogVisible = false;
  }

  editParty() {
    this.budingEditData = this.info.partyAInfoMesgVOS.map((v: any) => ({
      companyId: v.companyId,
      companyName: v.companyName,
      buildingIds: v.buildingVos.map((j: any) => j.buildingId),
    }));
    this.budingEditDialogVisible = true;
  }

  async budingEditFinish(data: any) {
    console.log(data);
    let obj: any = {};
    obj.partyAInfoVOS = data;
    obj.termId = this.$route.query.id;
    await post_partyAContract_addPartyABuildings(obj);
    this.$message.success("关联成功");
    this.getInfo();
    this.budingEditDialogVisible = false;
  }

  customerDialog() {
    this.editType = "customer";
    this.editData.title = "客户成交以及确认";
    this.editData.value = this.info.partyAOaVO.customerConfirm;
    this.editDialogVisible = true;
  }

  responsibiltityDialog() {
    this.editType = "reposon";
    this.editData.title = "违约责任";
    this.editData.value = this.info.partyAOaVO.responsibiltity;
    this.editDialogVisible = true;
  }

  async editFinish(data: any) {
    let type: any = null;
    if (this.editType === "customer") type = 1;
    else type = 2;
    await post_partyAContract_saveOaRemark({
      partyAOaId: this.info.partyAOaVO.partyAOaId,
      remark: data,
      type: type,
    });
    this.$message.success("保存成功");
    this.getInfo();
    this.editDialogVisible = false;
  }
}
</script>
<style lang="scss" scoped>
.partyA {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}
.partyButton {
  margin: 5px 0 0 20px;
}
.editParty {
  position: relative;
  .tubiao {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>