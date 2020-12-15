<!--
 * @Description: 
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-15 16:02:03
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-15 08:47:39
-->
<template>
  <IhPage>
    <template v-slot:info>
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
              <el-form-item
                label="渠道商"
                align="left"
                prop="channelId"
              >
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
                  >详情</el-link>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="渠道等级"
                prop="channelGrade"
              >
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
              <el-form-item
                label="渠道类型"
                align="left"
              >
                <span>{{
                  $root.dictAllName(resPageInfo.channelType, "ChannelType")
                }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="业务开展省市"
                prop="provinceOption"
              >
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
              <el-form-item
                label="城市等级"
                align="left"
              >
                <span v-if="resPageInfo.cityGrade">{{
                  $root.dictAllName(resPageInfo.cityGrade, "CityLevel")
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="是否特批入库"
                prop="special"
              >
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
              <el-form-item
                label="入库编号"
                align="left"
              >
                <el-input
                  v-model="resPageInfo.storageNum"
                  placeholder="系统自动创建"
                  disabled
                  maxlength="32"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="事业部"
                align="left"
              >
                <IhSelectPageDivision v-model="resPageInfo.departmentOrgId"></IhSelectPageDivision>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <p class="ih-info-title">
          评级信息
          <span style="font-size: 15px; margin-left: 10px">以下标准任填一项</span>
          <el-link
            style="margin-left: 15px;"
            href="/web-sales/channelRatings/list"
            type="success"
            target="_blank"
          >查看所有标准</el-link>
        </p>
        <el-form ref="dynamicValidateForm">
          <div class="padding-left-20">
            <el-table
              class="ih-table"
              :data="resPageInfo.channelGradeItemChanges"
              style="width: 100%"
            >
              <el-table-column
                prop="cityGrade"
                label="城市等级"
              >
                <template v-slot="{ row }">{{
                  $root.dictAllName(row.cityGrade, "CityLevel")
                }}</template>
              </el-table-column>
              <el-table-column
                prop="channelGrade"
                label="渠道等级"
              >
                <template v-slot="{ row }">{{
                  $root.dictAllName(row.channelGrade, "ChannelLevel")
                }}</template>
              </el-table-column>
              <el-table-column
                prop="gradeItem"
                label="评级项"
              ></el-table-column>
              <el-table-column
                prop="inputValue"
                label="录入信息"
              >
                <template v-slot="{ row }">
                  <el-form-item>
                    <el-input v-model="row.inputValue"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="gradeStandard"
                label="评级标准"
              ></el-table-column>
            </el-table>
          </div>
        </el-form>
        <br />
        <p class="ih-info-title">
          附件信息
          <el-link
            style="margin-left: 15px;"
            href="http://zxgk.court.gov.cn/zhzxgk/"
            type="success"
            target="_blank"
          >综合查询被执行人</el-link>
        </p>
        <div class="padding-left-20">
          <el-table
            class="ih-table"
            :data="fileListType"
            style="width: 100%"
          >
            <el-table-column
              prop="type"
              width="180"
              label="类型"
              align="center"
            >
              <template v-slot="{ row }">
                <div><span
                    style="color: red"
                    v-if="row.subType"
                  >*</span>{{row.name}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="附件">
              <template v-slot="{ row }">
                <IhUpload
                  :file-list.sync="row.fileList"
                  :file-size="10"
                  :file-type="row.code"
                  size="100px"
                  @newFileList="queryNew"
                ></IhUpload>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="text-left">
          <p class="ih-info-title">变更原因</p>
          <div class="padding-left-20">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="请输入内容"
              v-model="changeReason"
            >
            </el-input>
          </div>
        </div>
        <div class="text-center">
          <el-button
            class="margin-top-30"
            @click="pass('1')"
            type="primary"
          >保存</el-button>
          <el-button
            class="margin-top-30"
            @click="pass('2')"
            type="primary"
          >提交</el-button>
        </div>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//引入请求数据的api
import {
  get_channelGradeChange_get__id,
  get_channel_getAll,
  get_channelCityLevel_get__cityCode,
  post_channelGradeStandard_getAllByCityCodeAndChannelGrade,
  post_channelGradeChange_edit,
} from "../../../api/channel/index";

import { Form as ElForm } from "element-ui";
@Component({
  components: {},
})
export default class ChannelRates extends Vue {
  private get Id() {
    return this.$route.query.id;
  }
  private changeReason = "";
  channelOptions: any = [];
  fileListType: any = [];
  submitFile: any = {};

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

  private rules: any = {
    channelId: [{ required: true, message: "请选择渠道商", trigger: "change" }],
    channelGrade: [
      { required: true, message: "请选择渠道等级", trigger: "change" },
    ],
    provinceOption: [
      { required: true, message: "请选择业务开展省市", trigger: "change" },
    ],
    special: [{ required: true, message: "请选择特批入库", trigger: "change" }],
  };

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
        if (this.changeReason) {
          this.resPageInfo.oldGradeId = this.Id;
          // this.resPageInfo.channelGradeItemChanges = this.resPageInfo.channelGradeItems;
          // this.resPageInfo.channelGradeAttachmentChanges = this.resPageInfo.channelGradeAttachments;
          this.resPageInfo.changeReason = this.changeReason;
          // 校验提示
          let arr: any = [];
          Object.values(this.submitFile).forEach((v: any) => {
            if (v.length) {
              arr = arr.concat(v);
            }
          });
          // 以下操作仅仅是为了校验必上传项
          let submitList: any = this.fileListType.map((v: any) => {
            return {
              ...v,
              fileList: arr
                .filter((j: any) => j.type === v.code)
                .map((h: any) => ({
                  ...h,
                  name: h.fileName,
                })),
            };
          });
          let isSubmit = true;
          let msgList: any = [];
          submitList.forEach((v: any) => {
            if (v.subType && !v.fileList.length) {
              msgList.push(v.name);
              isSubmit = false;
            }
          });
          if (isSubmit) {
            this.resPageInfo.channelGradeAttachmentChanges = arr.map(
              (v: any) => ({
                fileId: v.fileId,
                fileName: v.name,
                type: v.type,
              })
            );
          } else {
            this.$message({
              type: "warning",
              message: `${msgList.join(",")}项,请上传附件`,
            });
            return;
          }
          await post_channelGradeChange_edit(this.resPageInfo);
          this.$goto({ path: "/channelLevelChange/list" });
        } else {
          this.$message.warning("请填写变更原因");
        }
        this.$message({
          type: "success",
          message: val === "1" ? "保存成功" : "提交成功",
        });
      }
    });
  }
  // 获取渠道商
  async getChannelAll() {
    this.channelOptions = await get_channel_getAll();
  }

  async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      this.resPageInfo = await get_channelGradeChange_get__id({ id: id });
      // this.provinceOption = [this.resPageInfo.province, this.resPageInfo.city];
      this.resPageInfo.provinceOption = [
        this.resPageInfo.province,
        this.resPageInfo.city,
      ];
      this.changeReason = this.resPageInfo.changeReason;
      this.getFileListType(this.resPageInfo.channelGradeAttachmentChanges);
    } else {
      this.getFileListType([]);
    }
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("ChannelGradeAttachment");
    this.fileListType = list.map((v: any) => {
      return {
        ...v,
        fileList: data
          .filter((j: any) => j.type === v.code)
          .map((h: any) => ({
            ...h,
            name: h.fileName,
          })),
      };
    });
    let obj: any = {};
    this.fileListType.forEach((h: any) => {
      obj[h.code] = h.fileList;
    });
    this.submitFile = { ...obj };
  }

  queryNew(data: any, type?: any) {
    let obj: any = {};
    obj[type] = data;
    this.submitFile = { ...this.submitFile, ...obj };
  }

  async created() {
    this.getInfo();
    this.getChannelAll();
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