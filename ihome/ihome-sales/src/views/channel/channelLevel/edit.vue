<!--
 * @Description: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-15 16:02:03
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-23 18:06:45
-->
<template>
  <IhPage>
    <template v-slot:form>
      <div class="text-left">
        <p class="ih-info-title">基础信息</p>
        <el-form
          ref="form"
          :model="resPageInfo"
          :rules="rules"
          label-width="120px"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="渠道商" align="left" prop="channelId">
                <div style="display: flex; justify-contant: flex-start">
                  <el-select
                    :disabled="$route.name === 'channelLevlChange'"
                    v-model="resPageInfo.channelId"
                    clearable
                    class="width--100"
                    placeholder="请选择渠道商"
                  >
                    <el-option
                      v-for="item in channelOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  <el-link
                    style="margin-left: 10px; text-align: center; width: 50px"
                    :href="`/web-sales/channels/info?id=${resPageInfo.channelId}`"
                    type="primary"
                    target="_blank"
                    >详情</el-link
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="渠道等级" prop="channelGrade">
                <el-select
                  v-model="resPageInfo.channelGrade"
                  clearable
                  placeholder="渠道等级"
                  class="width--100"
                  @change="getTableData"
                >
                  <el-option
                    v-for="item in $root.dictAllList('ChannelLevel')"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="渠道类型" align="left">
                <span>{{
                  $root.dictAllName(resPageInfo.channelType, "ChannelType")
                }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="业务开展省市" prop="provinceOption">
                <IhCascader
                  :level="2"
                  :checkStrictly="false"
                  @change="getTableData"
                  v-model="resPageInfo.provinceOption"
                  clearable
                  placeholder="请选择"
                  class="width--100"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市等级" align="left">
                <span>{{
                  $root.dictAllName(resPageInfo.cityGrade, "CityLevel")
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否特批入库" prop="special">
                <el-select
                  v-model="resPageInfo.special"
                  clearable
                  placeholder="特批入库"
                  class="width--100"
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
            <el-col :span="8">
              <el-form-item label="入库编号" align="left">
                <el-input
                  clearable
                  v-model="resPageInfo.storageNum"
                  placeholder="系统自动创建"
                  disabled
                  maxlength="32"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="事业部" align="left">
                <el-select
                  class="width--100"
                  v-model="resPageInfo.departmentOrgId"
                  clearable
                  placeholder="请选择事业部"
                >
                  <el-option
                    v-for="item in departmentOrgIdOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <p class="ih-info-title">
          评级信息
          <span style="font-size: 15px; margin-left: 10px"
            >以下标准任填一项</span
          >
          <el-link
            class="margin-left-15"
            href="/web-sales/gradeStandard/list"
            type="success"
            target="_blank"
            >查看所有标准</el-link
          >
          <!-- <el-link
            style="margin-left: 15px; font-size: 15px"
            @click="copy"
            type="primary"
            >复制评级信息</el-link
          > -->
        </p>
        <br />
        <el-form ref="dynamicValidateForm" class="padding-left-20">
          <el-table
            class="ih-table"
            :data="resPageInfo.channelGradeItems"
            style="width: 100%"
          >
            <el-table-column prop="cityGrade" label="城市等级">
              <template v-slot="{ row }">{{
                $root.dictAllName(row.cityGrade, "CityLevel")
              }}</template>
            </el-table-column>
            <el-table-column prop="channelGrade" label="渠道等级">
              <template v-slot="{ row }">{{
                $root.dictAllName(row.channelGrade, "ChannelLevel")
              }}</template>
            </el-table-column>
            <el-table-column prop="gradeItem" label="评级项"></el-table-column>
            <el-table-column prop="inputValue" label="录入信息">
              <template v-slot="{ row }">
                <el-form-item>
                  <el-input clearable v-model="row.inputValue"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              prop="gradeStandard"
              label="评级标准"
            ></el-table-column>
          </el-table>
        </el-form>
        <br />
        <p class="ih-info-title">
          附件信息
          <el-link
            class="margin-left-15"
            href="http://zxgk.court.gov.cn/zhzxgk/"
            type="success"
            target="_blank"
            >综合查询被执行人</el-link
          >
        </p>
        <div class="padding-left-20">
          <el-table
            class="ih-table"
            :data="resPageInfo.channelGradeAttachments"
            style="width: 100%"
          >
            <el-table-column prop="type" label="类型" width="200">
              <template v-slot="{ row }">{{
                $root.displayName("accessoryTpye", row.type)
              }}</template>
            </el-table-column>
            <el-table-column prop="fileId" label="附件">
              <IhUpload size="100px" :fileList="fileList" />
            </el-table-column>
          </el-table>
        </div>
        <div v-if="$route.name === 'channelLevelChange'" class="text-left">
          <br />
          <p class="ih-info-title">变更原因</p>
          <el-input
            class="padding-left-20"
            style="box-sizing: border-box"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="请输入内容"
            v-model="changeReason"
          >
          </el-input>
        </div>
        <div class="margin-top-30 text-center">
          <el-button @click="pass('1')" type="primary">保存</el-button>
          <el-button @click="pass('2')" type="primary">提交</el-button>
        </div>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//引入请求数据的api
import {
  get_channelGrade_get__id,
  get_channel_getAll,
  get_channelCityLevel_get__cityCode,
  post_channelGrade_add,
  post_channelGradeChange_add,
  post_channelGrade_edit,
  post_channelGradeStandard_getAllByCityCodeAndChannelGrade,
} from "../../../api/channel/index";

import { Form as ElForm } from "element-ui";
@Component({
  components: {},
})
export default class ChannelRates extends Vue {
  private get Id() {
    return this.$route.query.id;
  }
  private fileList = [];
  private changeReason = "";
  channelOptions: any = [];

  resPageInfo: any = {
    channelId: "",
    channelGrade: "",
    channelType: "Platform",
    province: "",
    city: "",
    cityGrade: "",
    departmentOrgId: "1234",
    special: "",
    storageNum: "",
    channelGradeItems: [],
    channelGradeAttachments: [],
    provinceOption: [],
  };

  departmentOrgIdOptions: any = [
    {
      name: "人事部",
      id: "111",
    },
    {
      name: "产品研发部",
      id: "222",
    },
    {
      name: "技术部",
      id: "333",
    },
  ];

  private rules: any = {
    channelId: [{ required: true, message: "请选择渠道商", trigger: "blur" }],
    channelGrade: [
      { required: true, message: "请选择渠道等级", trigger: "blur" },
    ],
    provinceOption: [
      { required: true, message: "请选择业务开展省市", trigger: "blur" },
    ],
    special: [{ required: true, message: "请选择特批入库", trigger: "blur" }],
  };

  async created() {
    this.getInfo();
  }

  // 获取渠道商
  async getChannelAll() {
    this.channelOptions = await get_channel_getAll();
  }

  async getInfo() {
    this.getChannelAll();
    let id = this.$route.query.id;
    if (id) {
      this.resPageInfo = await get_channelGrade_get__id({ id: id });
      // this.provinceOption = [this.resPageInfo.province, this.resPageInfo.city];
      this.resPageInfo.provinceOption = [
        this.resPageInfo.province,
        this.resPageInfo.city,
      ];
    }
  }
  // 获取评级信息数据
  async getTableData(val: any) {
    if (val instanceof Array) {
      const { cityGrade } = await get_channelCityLevel_get__cityCode({
        cityCode: val[1],
      });
      this.resPageInfo.cityGrade = cityGrade;
      this.resPageInfo.province = val[0];
      this.resPageInfo.city = val[1];
    }
    if (
      this.resPageInfo.channelGrade &&
      this.resPageInfo.provinceOption.length
    ) {
      let obj: any = {};
      obj.channelGrade = this.resPageInfo.channelGrade;
      obj.cityCode = this.resPageInfo.provinceOption[1];
      let res = await post_channelGradeStandard_getAllByCityCodeAndChannelGrade(
        obj
      );
      this.resPageInfo.channelGradeItems = res.map((v: any) => ({
        ...v,
        inputValue: "",
        standardId: v.id,
      }));
    }
  }

  pass(val: any) {
    (this.$refs["form"] as ElForm).validate(async (v: any) => {
      if (v) {
        this.resPageInfo.operateType = val;
        switch (this.$route.name) {
          case "channelLevelEdit":
            this.resPageInfo.id = this.Id;
            await post_channelGrade_edit(this.resPageInfo);
            break;
          case "channelLevelChange":
            if (this.changeReason) {
              this.resPageInfo.oldGradeId = this.Id;
              this.resPageInfo.channelGradeItemChanges = [
                ...this.resPageInfo.channelGradeItems,
              ];
              this.resPageInfo.channelGradeAttachmentChanges = [
                ...this.resPageInfo.channelGradeAttachments,
              ];
              this.resPageInfo.changeReason = this.changeReason;
              await post_channelGradeChange_add(this.resPageInfo);
            } else {
              this.$message.warning("请填写变更原因");
              return;
            }
            break;
          case "channelLevelAdd":
            await post_channelGrade_add(this.resPageInfo);
            break;
        }
        this.$message({
          type: "success",
          message: val === "1" ? "保存成功" : "提交成功",
        });
        this.$goto({ path: "/levelChange/list" });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.text-ellipsis {
  justify-content: flex-start;
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.msg-title {
  text-align: left;
  margin-left: 25px;
}
</style>