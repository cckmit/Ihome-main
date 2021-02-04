<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:21:01
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-04 16:20:26
-->
<template>
  <div>
    <div class="text-left">
      <p class="ih-info-title">客户报备规则</p>
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
            <el-form-item label="报备类型">
              <span class="text-ellipsis">{{ $root.dictAllName(info.reportTypeEnum, 'ReportType') }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="到访为王">
              <span class="text-ellipsis">{{ info.exVisit? '开启' : '关闭' }}</span>
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
      <p class="ih-info-title">无需在爱家系统报备的渠道</p>
      <span
        class="hint"
        style="font-size: 14px"
      >(注: 即在下面有配置的渠道公司的 渠道客户是从成交申报开始, 未在下面配置的渠道公司的 渠道客户 默认从 报备开始)</span>
      <el-table
        class="ih-table"
        :data="info.cycleWxbbqdVOS"
        style="margin-top: 20px"
      >
        <el-table-column
          prop="channelCompanyName"
          label="渠道公司"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_his_customerReportRule_get__termId } from "@/api/project/index";
@Component({
  components: {},
})
export default class ReportedRules extends Vue {
  info: any = {};

  async getInfo() {
    let id = this.$route.query.id;
    this.info = await get_his_customerReportRule_get__termId({ termId: id });
  }

  async created() {
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
.hint {
  color: #909399;
  margin-left: 20px;
}
</style>