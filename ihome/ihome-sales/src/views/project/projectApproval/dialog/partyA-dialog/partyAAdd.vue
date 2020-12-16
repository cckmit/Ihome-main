<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-01 14:49:06
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-16 17:11:21
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="700px"
    class="dialog text-left"
    title="甲方合同信息"
  >
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="100px"
      class="demo-form"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="合同标题"
            prop="title"
          >
            <el-input
              v-model="form.title"
              placeholder="合同标题"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="甲方"
            prop="partyA"
          >
            <el-select
              multiple
              v-model="form.partyA"
              placeholder="甲方"
              clearable
              class="width--100"
            >
              <el-option
                v-for="item in partyAOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="乙方"
            prop="partyBId"
          >
            <el-select
              v-model="form.partyBId"
              clearable
              placeholder="乙方"
              class="width--100"
            >
              <el-option
                v-for="item in partyBOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合作项目">
            <el-input
              placeholder="请选择合作项目"
              v-model="form.cooperationProjectsName"
              class="input-with-select"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合作时间">
            <el-date-picker
              style="width:100%;"
              v-model="form.cooperationTime"
              type="date"
              align="left"
              placeholder="年/月/日"
              :picker-options="$root.pickerOptions"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="合同跟进人"
            prop="tesHhandlerId"
          >
            <IhSelectPageUser
              v-model="form.tesHhandlerId"
              clearable
              value-key="id"
            >
              <!-- 自定义模板使用 v-slot返回来的data：当前每条的数据；index：每一条数据的下标 -->
              <template v-slot="{ data }">
                <span style="float: left">{{ data.name }}</span>
                <span style="
                      margin-left: 20px;
                      float: right;
                      color: #8492a6;
                      font-size: 13px;
                    ">{{ data.account }}</span>
              </template>
            </IhSelectPageUser>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="成交确认人">
            <el-input
              v-model="form.confirmer"
              placeholder="成交确认人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式">
            <el-input
              v-model="form.confirmerContact"
              placeholder="成交确认人联系方式"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="甲方合同附件">
            <IhUpload
              :file-list="partyFileList"
              size="100px"
              @newFileList="partyNewFileList"
            ></IhUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="盖章版归档">
            <IhUpload
              :file-list="stampFileList"
              size="100px"
              @newFileList="stampNewFileList"
            ></IhUpload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >提 交</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { post_company_listAll } from "@/api/developer/index";
import { post_company_getAll } from "@/api/system/index";

@Component({
  components: {},
})
export default class PartyAAdd extends Vue {
  dialogVisible = true;
  partyFileList: any = [];
  stampFileList: any = [];
  form: any = {
    title: null,
    partyA: [],
    partyBId: null,
    cooperationProjectsName: null,
    cooperationTime: null,
    handlerId: null,
    tesHhandlerId: null,
    confirmer: null,
    confirmerContact: null,
  };
  partyAOptions: any = [];
  partyBOptions: any = [];
  partyList: any = [];
  stampList: any = [];
  rules: any = {
    title: [
      {
        required: true,
        message: "请填写合同标题",
        trigger: "change",
      },
    ],
    partyA: [
      {
        required: true,
        message: "请选择甲方",
        trigger: "change",
      },
    ],
    partyBId: [
      {
        required: true,
        message: "请选择乙方",
        trigger: "change",
      },
    ],
    tesHhandlerId: [
      {
        required: true,
        message: "请选择合同跟进人",
        trigger: "change",
      },
    ],
  };

  partyNewFileList(data: any) {
    this.partyList = [];
    data.forEach((v: any) => {
      this.partyList.push({
        attachmentSuffix: v.name,
        fileNo: v.response[0].fileId,
        type: "ContractAnnex",
      });
    });
  }

  stampNewFileList(data: any) {
    this.stampList = [];
    data.forEach((v: any) => {
      this.stampList.push({
        attachmentSuffix: v.name,
        fileNo: v.response[0].fileId,
        type: "ArchiveAnnex",
      });
    });
  }

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.form.handlerId = this.form.tesHhandlerId.id;
      let arr: any = [];
      arr = this.form.partyA.map((v: any) => ({
        userId: v,
      }));
      this.$emit("finish", {
        ...this.form,
        partyA: arr,
        originalList: this.partyList.concat(this.stampList),
      });
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  async getPartyA() {
    this.partyAOptions = await post_company_listAll({ name: "" });
  }

  async getPartyB() {
    this.partyBOptions = await post_company_getAll({ name: "" });
  }

  created() {
    this.getPartyA();
    this.getPartyB();
    this.form.tesHhandlerId = {
      name: (this.$root as any).userInfo.name,
      id: (this.$root as any).userInfo.id,
    };
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px 0 20px;
  }
}
</style>