<!--
 * @Description: 添加回款
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-16 09:23:25
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-19 11:05:34
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="750px"
    :title="title"
    class="text-left return-add"
  >
    <div>
      <div>请录入申请单号(<span style="color: red;">{{data.applyNo}}</span>)的回款流水编号及金额及金额</div>
      <el-table
        style="width:100%;"
        :data="form.receiveList"
      >
        <el-table-column label="流水编号">
          <template v-slot="{ row }">
            <div v-if="!row.isEdit">{{row.receiveNo}}</div>
            <div v-else>
              <el-input
                v-model="row.receiveNo"
                placeholder="流水编号"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="回款金额">
          <template v-slot="{ row }">
            <div v-if="!row.isEdit">{{row.receiveMoney}}</div>
            <div v-else>
              <el-input
                v-model="row.receiveMoney"
                v-digits="2"
                placeholder="回款金额"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="回款日期">
          <template v-slot="{ row }">
            <div v-if="!row.isEdit">{{row.receDate}}</div>
            <div v-else>
              <el-date-picker
                v-model="row.receDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="90"
          fixed="right"
        >
          <template v-slot="{ row, $index }">
            <el-link
              type="success"
              v-if="row.isEdit"
              @click="handleEdit(row)"
            >保存</el-link>
            <el-link
              v-else
              @click="row.isEdit = true"
            >编辑</el-link>
            <el-link
              type="danger"
              class="margin-left-10"
              @click="handleRemove($index)"
            >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-button
        class="width--100"
        type="success"
        icon="el-icon-circle-plus"
        @click="handleAdd()"
      >添加</el-button>
      <!-- <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-row
          v-for="(i, n) in form.receiveList"
          :key="n"
        >
          <el-col :span="12">
            <el-form-item
              label="流水编号"
              :prop="`receiveList.${n}.receiveNo`"
              :rules="[
                {required: true, message: '请输入流水编号', trigger: 'change'}
              ]"
            >
              <el-input
                v-model="i.receiveNo"
                placeholder="请输入回款流水编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="金额"
              class="code-item padding-right-20"
              :prop="`receiveList.${n}.receiveMoney`"
              :rules="[
                {required: true, message: '请输入金额', trigger: 'change'}
              ]"
            >
              <el-input
                v-model="i.receiveMoney"
                placeholder="请输入回款金额"
                v-digits="2"
              ></el-input>
              <i
                :class="['icon', {'el-icon-circle-plus-outline': n === 0}]"
                @click="handleAdd()"
              ></i>
              <i
                :class="['icon', {'el-icon-circle-close': n !== 0}]"
                @click="handleRemove(n)"
              ></i>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form> -->
    </div>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="submit()"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import {
  post_receConfirmDetail_addBatch,
  get_receConfirmDetail_getListByApplyId__applyId,
} from "../../../../api/apply/index";

@Component({})
export default class AddRetPayment extends Vue {
  @Prop() data!: any;
  @Prop({ default: "添加回款" }) title?: string;

  private dialogVisible = true;
  private totalMoney = 0;
  private form: any = {
    applyId: null,
    receiveList: [
      {
        receiveMoney: 0,
        receiveNo: null,
        receDate: null,
        isEdit: false,
      },
    ],
  };
  private rules: any = {};
  private pickerOptions: any = {
    disabledDate(time: any) {
      return time.getTime() > Date.now() - 8.64e6;
    },
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  private handleAdd() {
    this.form.receiveList.push({
      receiveNo: null,
      receiveMoney: 0,
      receDate: null,
      isEdit: true,
    });
  }
  private handleEdit(row: any) {
    if (!row.receiveNo || !row.receiveMoney || !row.receDate) {
      this.$message.warning("保存数据不能为空");
      return;
    }
    row.isEdit = false;
  }
  private handleRemove(index: number) {
    this.form.receiveList.splice(index, 1);
  }
  @NoRepeatHttp()
  async submit() {
    // if (valid) {
    let isEdit = this.form.receiveList.some((i: any) => i.isEdit);
    if (isEdit) {
      this.$message.warning("请先保存数据");
      return;
    }
    let sumArr = this.form.receiveList.map((v: any) =>
      parseFloat(v.receiveMoney || 0)
    );
    let sum = this.$math.addArr(sumArr);
    if (sum > this.totalMoney) {
      this.$message.warning("金额总数不能大于应回款金额");
      return;
    }
    try {
      await post_receConfirmDetail_addBatch({
        addReceList: [this.form],
      });
      this.$emit("finish");
      this.$message.success("添加成功");
    } catch (error) {
      console.log(error);
    }
    // } else {
    //   return false;
    // }
  }
  async getApplyById(applyId: any) {
    try {
      let res: any = await get_receConfirmDetail_getListByApplyId__applyId({
        applyId,
      });
      if (res.length) {
        this.form.receiveList = res.map((i: any) => ({
          receiveMoney: i.receiveMoney,
          receiveNo: i.receiveNo,
          receDate: i.receDate,
          isEdit: false,
        }));
      } else {
        this.form.receiveList[0].receiveMoney = this.data.shuoldReceMoney;
        this.form.receiveList[0].isEdit = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  created() {
    this.form.applyId = this.data.id;
    this.getApplyById(this.data.id);
    this.totalMoney = this.data.shuoldReceMoney;
  }
}
</script>

<style lang="scss" scoped>
.return-add {
  .code-item {
    position: relative;
  }
  .icon {
    position: absolute;
    font-size: 25px;
    top: 8px;
    right: -30px;
    cursor: pointer;
  }
}
</style>
