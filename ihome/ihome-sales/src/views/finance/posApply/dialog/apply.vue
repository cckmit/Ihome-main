<!--
 * @Description: 申领POS机事项
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-23 09:57:33
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-24 14:48:18
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    :title="`POS机申领事项${isAdd ? '录入':'修改'}`"
    class="text-left"
    top="5vh"
  >
    <div>
      <p class="ih-info-title">POS申请事项信息</p>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-row>
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
                :value="$root.userInfo.name"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事业部"
              prop="departmentId"
            >
              <IhSelectPageDivision v-model="form.departmentId"></IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联动项目"
              prop="proId"
            >
              <el-input
                v-model="form.proId"
                placeholder="请选择项目"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
        <el-table class="ih-table width--100">
          <el-table-column
            label="账户名称"
            fixed
          ></el-table-column>
          <el-table-column label="账号"></el-table-column>
          <el-table-column label="产品型号"></el-table-column>
          <el-table-column label="序列号"></el-table-column>
          <el-table-column label="状态"></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
          ></el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">备注</p>
      <div class="padding-left-20">
        <el-input
          type="textarea"
          placeholder="请填写备注信息"
          :rows="5"
        ></el-input>
      </div>
    </div>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary">保 存</el-button>
    </template>
    <IhDialog :show="selectVisible">
      <SelectPos
        :query="query"
        @cancel="() => (selectVisible = false)"
        @finish="(list) => {
          selectVisible = false
          form.posTerminalIds = list
        }"
      />
    </IhDialog>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SelectPos from "./selectPOS.vue";

@Component({
  components: { SelectPos },
})
export default class ApplyDialog extends Vue {
  @Prop({ default: true }) isAdd!: boolean;
  @Prop() type!: any;

  private selectVisible = false;
  private dialogVisible = true;
  private form: any = {
    applyUser: null,
    departmentId: null,
    groupId: null,
    itemType: null,
    posTerminalIds: [],
    proId: null,
  };
  private rules: any = {};
  private query: any = null;

  cancel(): void {
    this.$emit("cancel", false);
  }
  private handleChangeByGroup(val: any) {
    console.log(val);
  }
  private handleAddPos() {
    console.log(this.type);

    switch (this.type) {
      case "Use":
        // 领用
        this.query = {
          status: "CentralStock",
        };
        this.selectVisible = true;
        break;

      default:
        break;
    }
  }

  created() {
    if (this.isAdd) {
      this.form.itemType = this.type;
      this.form.applyUser = (this.$root as any).userInfo.id;
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
