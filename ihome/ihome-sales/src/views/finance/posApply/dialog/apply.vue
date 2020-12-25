<!--
 * @Description: 申领POS机事项
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-23 09:57:33
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-25 17:21:32
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    :title="`POS机申请事项${isAdd ? '录入':'修改'} - ${$root.dictAllName(type, 'PosItemType')}`"
    class="text-left"
    top="5vh"
  >
    <div>
      <p class="ih-info-title">POS申请事项信息</p>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div style="overflow: hidden;">
          <el-col :span="8">
            <el-form-item
              label="事项类别"
              prop="itemType"
            >
              <el-select
                v-model="form.itemType"
                class="width--100"
                disabled
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('PosItemType')"
                  :key="n"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="申请人"
              prop="applyUser"
            >
              <el-input
                :value="applyUserName"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            v-if="type === 'Apply' || type === 'Move' || type === 'GiveBack'"
          >
            <el-form-item
              label="店组"
              prop="groupId"
            >
              <IhSelectPageOrg
                v-model="form.groupId"
                @change="handleChangeByGroup"
              ></IhSelectPageOrg>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事业部"
              prop="departmentId"
            >
              <IhSelectPageDivision
                v-model="form.departmentId"
                :disabled="type === 'Apply' || type === 'Move' || type === 'GiveBack'"
              ></IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            v-if="type === 'Apply' || type === 'Move'"
          >
            <el-form-item
              label="联动项目"
              prop="proId"
            >
              <IhSelectPageByProject v-model="form.proId"></IhSelectPageByProject>
            </el-form-item>
          </el-col>
        </div>
      </el-form>
      <p class="ih-info-title">
        <span>POS机列表</span>
        <el-button
          type="primary"
          class="add"
          size="small"
          @click="handleAddPos()"
        >添加</el-button>
      </p>
      <div class="padding-left-20">
        <br />
        <el-table
          class="ih-table width--100"
          :data="posTerminal"
        >
          <el-table-column
            label="账户名称"
            fixed
            prop="accountName"
          ></el-table-column>
          <el-table-column
            label="账号"
            prop="accountNo"
          ></el-table-column>
          <el-table-column
            label="产品型号"
            prop="productModel"
          ></el-table-column>
          <el-table-column
            label="序列号"
            prop="serialNo"
          ></el-table-column>
          <el-table-column
            label="状态"
            width="120"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.status, 'PosTerminalStatus')}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="80"
          >
            <template v-slot="{ $index }">
              <el-link
                type="danger"
                @click="remove($index)"
              >移除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">备注</p>
      <div class="padding-left-20">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请填写备注信息"
          :rows="5"
          maxlength="256"
          show-word-limit
        ></el-input>
      </div>
    </div>
    <template #footer>
      <el-button
        type="success"
        @click="submit(0)"
      >保 存</el-button>
      <el-button
        type="primary"
        @click="submit(1)"
      >提 交</el-button>
    </template>
    <IhDialog :show="selectVisible">
      <SelectPos
        :hasCheckedData="form.posTerminalIds"
        :params="params"
        @cancel="() => (selectVisible = false)"
        @finish="(list) => {
          selectVisible = false
          posTerminal = list
        }"
      />
    </IhDialog>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import SelectPos from "./selectPOS.vue";
import { get_org_getLevelTree__id } from "../../../../api/system/index";
import {
  post_posApplyItem_posApply,
  get_posApplyItem_get__id,
} from "../../../../api/finance/index";

@Component({
  components: { SelectPos },
})
export default class ApplyDialog extends Vue {
  @Prop({ default: true }) isAdd!: boolean;
  @Prop() type!: any;
  @Prop() itemId?: any;

  private selectVisible = false;
  private dialogVisible = true;
  private applyUserName: any = null;
  private posTerminal: any = [];
  private form: any = {
    applyUser: null,
    departmentId: null,
    groupId: null,
    itemType: null,
    posTerminalIds: [],
    proId: null,
    remark: null,
  };
  private rules: any = {
    itemType: [
      { required: true, message: "事项类别不能为空", trigger: "change" },
    ],
    applyUser: [
      { required: true, message: "申请人不能为空", trigger: "change" },
    ],
    departmentId: [
      { required: true, message: "事业部不能为空", trigger: "change" },
    ],
    groupId: [
      {
        required:
          this.type === "Apply" ||
          this.type === "Move" ||
          this.type === "GiveBack",
        message: "店组不能为空",
        trigger: "change",
      },
    ],
    proId: [
      {
        required: this.type === "Apply" || this.type === "Move",
        message: "项目不能为空",
        trigger: "change",
      },
    ],
  };
  private params: any = null;

  cancel(): void {
    this.$emit("cancel", false);
  }
  @NoRepeatHttp()
  submit(type: number) {
    (this.$refs["ruleForm"] as ElForm).validate(async (val) => {
      if (val) {
        try {
          await post_posApplyItem_posApply({
            ...this.form,
            posTerminalIds: this.posTerminal.map((i: any) => i.id),
            type,
          });
          this.$message.success("操作成功");
          this.$emit("finish");
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
      }
    });
  }
  private async handleChangeByGroup(val: any) {
    console.log(val);
    if (
      this.type === "Apply" ||
      this.type === "Move" ||
      this.type === "GiveBack"
    ) {
      const { departmentId } = await get_org_getLevelTree__id({ id: val });
      this.form.departmentId = departmentId;
    }
  }
  private remove(index: number) {
    this.posTerminal.splice(index, 1);
  }
  private handleAddPos() {
    switch (this.type) {
      case "Use":
        // 领用
        this.params = {
          status: "CentralStock",
        };
        this.selectVisible = true;
        break;
      case "Apply":
        // 申领
        if (!this.form.departmentId) {
          this.$message.warning("请先选择店组");
          return;
        }
        this.params = {
          status: "BranchStock",
          departmentId: this.form.departmentId,
        };
        this.selectVisible = true;
        break;
      case "Move":
        // 调用
        if (!this.form.departmentId) {
          this.$message.warning("请先选择店组");
          return;
        }
        this.params = {
          status: "Using",
          departmentId: this.form.departmentId,
        };
        this.selectVisible = true;
        break;
      case "GiveBack":
        // 归还
        if (!this.form.departmentId) {
          this.$message.warning("请先选择店组");
          return;
        }
        this.params = {
          groupId: this.form.groupId,
          holder: this.form.applyUser,
          status: "Using",
        };
        this.selectVisible = true;
        break;
      case "Return":
        // 退还
        if (!this.form.departmentId) {
          this.$message.warning("请选择事业部");
          return;
        }
        this.params = {
          departmentId: this.form.departmentId,
          status: "BranchStock",
        };
        this.selectVisible = true;
        break;
      default:
        break;
    }
  }

  async created() {
    if (this.isAdd) {
      this.form.itemType = this.type;
      this.form.applyUser = (this.$root as any).userInfo.id;
      this.applyUserName = (this.$root as any).userInfo.name;
    } else {
      let res = await get_posApplyItem_get__id({ id: this.itemId });
      console.log(res);
      Object.assign(this.form, res);
      this.posTerminal = res.posTerminals;
    }
  }
}
</script>

<style lang="scss" scoped>
.ih-info-title {
  position: relative;
  .add {
    position: absolute;
    top: 0px;
    left: 120px;
    transform: translate(0, -30%);
  }
}
</style>
