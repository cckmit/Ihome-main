<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:21:01
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-01 19:42:17
-->
<template>
  <ih-page>
    <template v-slot:info>
      <div class="text-left">
        <div class="rules">
          <p class="ih-info-title">客户报备规则</p>
          <div style="margin: 6px 0 0 20px">
            <el-button
              class="rulesButton"
              size="small"
              type="success"
              @click="edit()"
            >编辑</el-button>
          </div>
        </div>
        <el-form label-width="120px">
          <el-row>
            <el-col :span="16">
              <el-form-item label="开发商保护期">
                <span class="text-ellipsis">{{ info.developerProtectionPeriod }}
                  <span style="margin-left: 50px">小时</span>
                  <span class="hint">保护期内，已完成认购的客户不能报备</span>
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="是否到访为王">
                <span class="text-ellipsis">{{ info.exVisit? '是' : '否' }}</span>
                <span
                  class="hint"
                  style="margin-left:80px"
                >开启后，无报备保护期，客户界定以到访为准
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="Number(!info.exVisit)">
            <el-col :span="24">
              <el-form-item label="报备有效时间">
                <span class="text-ellipsis">{{ info.filingEffectiveTime }}
                  <span style="margin-left: 50px">小时</span>
                  <span class="hint">系统对报备有效客户的保护时间，超时自动变报备无效</span>
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="客户保护期时间">
                <span class="text-ellipsis">{{ info.customerProtectionPeriod }}
                  <span style="margin-left: 50px">小时</span>
                  <span class="hint">系统对到访有效客户的保护时间，超时自动变到访无效</span>
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="报备说明">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 8 }"
                  maxlength="500"
                  v-model="info.reportDescription"
                  disabled
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="到访说明">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 8 }"
                  maxlength="500"
                  v-model="info.visitDescription"
                  disabled
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="开发商界定规则">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 8 }"
                  maxlength="500"
                  v-model="info.developersRules"
                  disabled
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="rules">
          <p class="ih-info-title">无需在爱家系统报备的渠道</p>
          <div style="margin: 6px 0 0 20px">
            <el-button
              class="rulesButton"
              size="small"
              type="success"
              @click="addChannel"
            >+增加</el-button>
          </div>
        </div>
        <span
          class="hint"
          style="font-size: 14px"
        >(注: 即在下面有配置的渠道公司的 渠道客户是从成交申报开始, 未在下面配置的渠道公司的 渠道客户 默认从 报备开始)</span>
        <el-table
          class="ih-table"
          :data="info.cycleWxbbqdVOS"
          style="width: 100%;margin-top: 20px"
        >
          <el-table-column
            prop="channelCompanyName"
            label="渠道公司"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template v-slot="{ row }">
              <el-button
                size="small"
                type="danger"
                @click="delChannel(row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <ih-dialog :show="dialogVisible">
      <Edit
        :data="editData"
        @cancel="() => (dialogVisible = false)"
        @finish="dialogVisible = false;getInfo()"
      />
    </ih-dialog>
    <ih-dialog :show="businessDialogVisible">
      <Business
        @cancel="() => (businessDialogVisible = false)"
        @finish="(data) => businessFinish(data)"
      />
    </ih-dialog>
  </ih-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Edit from "../dialog/reportedRules-dialog/edit.vue";
import Business from "../dialog/reportedRules-dialog/channelBusiness.vue";
import {
  get_customerReportRule_get__termId,
  post_customerReportRule_addWXBB,
  post_customerReportRule_delWXBB__wxId,
} from "@/api/project/index";
@Component({
  components: { Edit, Business },
})
export default class ReportedRules extends Vue {
  info: any = {};
  dialogVisible = false;
  businessDialogVisible = false;
  editData = {};

  async getInfo() {
    let id = this.$route.query.id;
    this.info = await get_customerReportRule_get__termId({ termId: id });
  }

  async created() {
    this.getInfo();
  }

  edit() {
    this.dialogVisible = true;
    this.editData = { ...this.info };
  }

  addChannel() {
    this.businessDialogVisible = true;
  }
  async businessFinish(data: any) {
    let arr: any = [];
    data.forEach((v: any) => {
      arr.push(v.id);
    });
    await post_customerReportRule_addWXBB({
      channelCompanyId: arr,
      termId: this.$route.query.id,
    });
    this.$message.success("新增成功");
    this.getInfo();
    this.businessDialogVisible = false;
  }
  async delChannel(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_customerReportRule_delWXBB__wxId({
        wxId: row.wxId,
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
}
</script>

<style lang="scss" scoped>
.rules {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}
.hint {
  color: #909399;
  margin-left: 20px;
}
</style>