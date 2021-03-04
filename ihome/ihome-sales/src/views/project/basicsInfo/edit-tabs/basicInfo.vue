<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-03 12:06:53
-->
<template>
  <div>
    <el-form
      ref="form"
      label-width="150px"
      :model="form"
      :rules="rules"
    >
      <el-row>
        <el-col
          :span="8"
          v-if="$route.name === 'projectChildEdit'"
        >
          <el-form-item label="盘编">
            <el-input
              disabled
              v-model="form.proNo"
              placeholder="盘编"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目推广名"
            prop="proName"
          >
            <el-input
              clearable
              maxlength="50"
              v-model="form.proName"
              placeholder="项目推广名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目备案名"
            prop="proRecord"
          >
            <el-input
              clearable
              maxlength="50"
              v-model="form.proRecord"
              placeholder="项目备案名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="开发商名称"
            prop="developerId"
          >
            <IhSelectPageByDeveloper
              v-model="form.developerId"
              :searchName="form.developerName"
            >
            </IhSelectPageByDeveloper>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="市场化项目"
            prop="exMarket"
          >
            <el-select
              v-model="form.exMarket"
              clearable
              class="width--100"
            >
              <el-option
                v-for="item in YesOrNoType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="关联明源"
            prop="exMinyuan"
          >
            <el-select
              v-model="form.exMinyuan"
              clearable
              class="width--100"
              disabled
            >
              <el-option
                v-for="item in YesOrNoType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="明源区域公司">
            <el-input
              v-model="form.companyName"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="省市区"
            prop="provinceOption"
          >
            <IhCascader
              v-model="form.provinceOption"
              :checkStrictly="false"
            ></IhCascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="isShow">
        <el-col :span="8">
          <el-form-item label="爱家父项目推广名">
            <el-input
              clearable
              v-model="form.parentName"
              placeholder="爱家父项目推广名"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="明源楼盘名">
            <el-input
              clearable
              v-model="form.buildingGuidName"
              placeholder="明源楼盘名"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="同步明源房号数据"
            prop="exSyncRoom"
          >
            <el-select
              v-model="form.exSyncRoom"
              clearable
              class="width--100"
            >
              <el-option
                v-for="item in YesOrNoType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item
            label="项目地址"
            prop="proAddr"
          >
            <el-input
              clearable
              maxlength="200"
              v-model="form.proAddr"
              placeholder="项目地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="经纬度"
            prop="jingwei"
          >
            <el-input
              clearable
              v-model="form.jingwei"
              placeholder="经纬度"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="详细地址">
            <el-input
              clearable
              placeholder="请输入地址"
              v-model="form.searchAddr"
              class="input-with-select"
            >
              <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-col :span="16">
            <BaiduMap
              class="bm-view"
              ak="7KCUbHHtMOe3DmrxbAZaLcUf4cKeWchn"
              :scroll-wheel-zoom="true"
              :center="{ lng: center.lng, lat: center.lat }"
              :zoom="zoom"
              @ready="handler"
              @click="getLocationPoint"
            >
              <BmView style="width: 100%; height: 100%; flex: 1"></BmView>
              <BmControl>
                <BmAutoComplete :sugStyle="{ zIndex: 999999 }">
                  <el-input
                    v-model="searchAddr"
                    clearable
                    type="text"
                    placeholder="请输入搜索关键字"
                  />
                </BmAutoComplete>
              </BmControl>
              <BmLocalSearch
                v-if="searchAddr"
                :keyword="searchAddr"
                :auto-viewport="true"
                location=""
                style="display: none"
              ></BmLocalSearch>
            </BaiduMap>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="物业类型"
            class="text-left"
            prop="checkboxEnum"
          >
            <el-checkbox-group v-model="form.checkboxEnum">
              <template v-for="item in checkBoxList">
                <el-checkbox
                  @change="checkBoxChange(item)"
                  :key="JSON.parse(item).code"
                  :label="item"
                >{{
                  JSON.parse(item).name
                }}</el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="form.checkboxEnum.length"
        class="margin-left-60"
      >
        <el-col
          :span="12"
          v-for="item in checkBoxChangeList"
          :key="item.code"
          class="msglist"
        >
          <el-form-item>
            <el-form
              ref="contantForm"
              :model="item.msg"
            >
              <div class="contant">
                <div style="
                    font-weight: bold;
                    margin-left: 20px;
                    text-align: left;
                    font-size: 15px;
                  ">
                  {{ `${item.msg.title}信息` }}
                </div>
                <el-row style="padding-bottom: 10px">
                  <el-col :span="24">
                    <el-form-item
                      label="住宅均价"
                      label-width="90px"
                      class="text-left"
                    >
                      <el-input
                        style="width: 50%"
                        v-model="item.msg.averPrice"
                        placeholder="住宅均价"
                        maxlength="50"
                        v-digits="2"
                      ></el-input>
                      <span style="width: 80px; margin-left: 10px">元/m²</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="物业费"
                      label-width="90px"
                      class="text-left"
                    >
                      <el-input
                        style="width: 50%"
                        v-model="item.msg.propertyCost"
                        placeholder="住宅均价"
                        maxlength="50"
                        v-digits="2"
                      ></el-input>
                      <span style="width: 80px; margin-left: 10px">元/m²/月</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="产权年限"
                      label-width="90px"
                      class="text-left"
                    >
                      <el-select
                        style="width: 50%"
                        v-model="item.msg.propertyAge"
                        clearable
                      >
                        <el-option
                          v-for="item in $root.dictAllList('PropertyAge')"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="楼盘图片"
            prop="name"
          >
            <IhUpload
              :file-list.sync="houseFileList"
              :limit="5"
              :file-size="10"
              size="100px"
              accept="image/*"
              upload-accept="image"
              :loadPermi="false"
              @newFileList="houseFiles"
            >
              <template #extend="{ data }">
                <div class="padding-top-5 font">
                  <el-radio
                    v-model="radio"
                    :label="data.fileId"
                    @change="getRadio"
                  >设为封面图</el-radio>
                </div>
              </template>
            </IhUpload>
            <div style="text-align: left;color: #aaa;margin-top: -10px">图片尺寸：480*480，用于移动端页面展示，封面图用于首页/详情页首张展示</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <p class="ih-info-title">项目周期</p>
        <div class="padding-left-20">
          <el-table
            class="ih-table"
            :data="form.terms"
            style="width: 100%"
          >
            <el-table-column
              prop="termName"
              label="项目周期名称"
            ></el-table-column>
            <el-table-column
              prop="busTypeEnum"
              label="业务类型"
            >
              <template v-slot="{ row }">{{
                $root.dictAllName(row.busTypeEnum, "BusType")
              }}</template>
            </el-table-column>
            <el-table-column
              prop="approvalNo"
              label="呈批文号"
            ></el-table-column>
            <el-table-column
              prop="termStart"
              label="开始时间"
            ></el-table-column>
            <el-table-column
              prop="termEnd"
              label="结束时间"
            ></el-table-column>
            <el-table-column
              prop="auditEnum"
              label="审核状态"
            >
              <template v-slot="{ row }">{{
                $root.dictAllName(row.auditEnum, "Audit")
              }}</template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="120"
              fixed="right"
            >
              <template v-slot="{ row }">
                <el-button
                  size="small"
                  @click="viewCycleData(row)"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <el-row>
        <br />
        <p class="ih-info-title">一手代理公司</p>
        <el-button
          size="small"
          type="success"
          style="
            display: inline-block;
            position: absolute;
            top: 25px;
            left: 145px;
          "
          @click="addFirstAgency"
        >+增加公司</el-button>
        <div class="padding-left-20">
          <el-table
            class="ih-table"
            :data="form.firstAgencyCompanys"
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="一手代理团队名称"
            ></el-table-column>
            <el-table-column
              prop="shortName"
              label="简称"
            ></el-table-column>
            <el-table-column
              prop="province"
              label="省份"
            >
              <template v-slot="{ row }">{{
                $root.getAreaName(row.province)
              }}</template>
            </el-table-column>
            <el-table-column
              prop="city"
              label="城市"
            >
              <template v-slot="{ row }">{{
                $root.getAreaName(row.city)
              }}</template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="120"
              fixed="right"
            >
              <template v-slot="{ $index }">
                <el-button
                  size="small"
                  type="danger"
                  @click="delFirstAgencyCompanys($index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <el-row>
        <p class="ih-info-title">附件信息</p>
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
      </el-row>
    </el-form>
    <div
      class="margin-top-20"
      v-if="$route.name === 'projectChildAdd'"
    >
      <el-button
        type="primary"
        @click="submit('save')"
      >保存</el-button>
      <el-button
        type="success"
        @click="submit('submit')"
      >提交</el-button>
      <el-button @click="$goto({ path: '/projects/list' })">关闭</el-button>
    </div>
    <div
      class="margin-top-20"
      v-if="$route.name === 'projectChildEdit'"
    >
      <el-button
        type="primary"
        :class="{'ih-data-disabled': !secureSave()}"
        v-has="'B.SALES.PROJECT.BASICLIST.ZXMBC'"
        :loading="loadSave"
        @click="submit('save')"
      >保存</el-button>
      <el-button
        type="success"
        :class="{'ih-data-disabled': !submitChange()}"
        v-has="'B.SALES.PROJECT.BASICLIST.ZXMTJ'"
        @click="submit('submit')"
      >提交</el-button>
      <el-button @click="$goto({ path: '/projects/list' })">关闭</el-button>
    </div>
    <ih-dialog :show="dialogVisible">
      <FirstAgencyDialog
        :data="firstData"
        @cancel="() => (dialogVisible = false)"
        @finish="(data) => firstAgencyFinish(data)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  get_project_get__proId,
  post_project_add,
  post_project_update,
  post_project_auditWait,
} from "@/api/project/index";
import FirstAgencyDialog from "../dialog/firstAgency.vue";
import { Form as ElForm } from "element-ui";

import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
} from "vue-baidu-map";

@Component({
  components: {
    FirstAgencyDialog,
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
  },
})
export default class EditBasicInfo extends Vue {
  loadSave = false;
  form: any = {
    auditEnum: null,
    proNo: null,
    proName: null,
    proRecord: null,
    developerId: null,
    exMarket: null,
    exMinyuan: 0,
    parentId: null,
    buildingGuidName: null,
    exSyncRoom: null,
    province: null,
    city: null,
    district: null,
    proAddr: null,
    companyName: null,
    lng: null, // 经度
    lat: null, // 纬度
    jingwei: null, // 经纬度
    searchAddr: "",
    propertyArgs: [], // 物业类型
    attachPics: [], // 附件信息
    proPics: [], // 楼盘图片
    firstAgencyCompanys: [], //一手代理商列表
    terms: [], // 项目周期列表
    checkboxEnum: [], // 物业类型勾选
    provinceOption: [],
  };
  firstData: any = {};

  fileListType: any = [];
  submitFile: any = {};

  contantForm: any = {
    averPrice: null,
    propertyAge: null,
    propertyCost: null,
    propertyId: null,
  };
  contantList: any = [];

  rules: any = {
    exMarket: [
      { required: true, message: "请选择市场化项目", trigger: "change" },
    ],
    exMinyuan: [
      { required: true, message: "请选择关联明源", trigger: "change" },
    ],
    provinceOption: [
      { required: true, message: "请选择省市区", trigger: "change" },
    ],
    proName: [
      { required: true, message: "请填写项目推广名", trigger: "change" },
    ],
    proRecord: [
      { required: true, message: "请填写项目备案名", trigger: "change" },
    ],
    proAddr: [{ required: true, message: "请填写项目地址", trigger: "change" }],
    developerId: [
      { required: true, message: "请填写开发商名称", trigger: "change" },
    ],
    jingwei: [{ required: true, message: "请填写经纬度", trigger: "change" }],
    exSyncRoom: [
      {
        required: true,
        message: "请选择同步明源房号数据",
        trigger: "change",
      },
    ],
    checkboxEnum: [
      {
        required: true,
        message: "请选择物业类型",
        trigger: "change",
      },
    ],
  };
  YesOrNoType: any = [
    {
      code: 0,
      name: "否",
    },
    {
      code: 1,
      name: "是",
    },
  ];
  houseFileList: any = [];
  radio = "";
  houseList: any = [];
  dialogVisible = false;
  checkBoxChangeList: any = [];
  center: any = { lng: 0, lat: 0 };
  zoom = 3;
  BMap: any = {};
  searchAddr = "";
  isShow = true;
  oldInfo: any = {};
  oldSubmitFile: any = {};
  secureSave() {
    const Adopt = this.form.auditEnum === "Adopt";
    const RHeadBusinessManagement = this.$roleTool.RHeadBusinessManagement();
    const RBusinessManagement = this.$roleTool.RBusinessManagement();
    const RFrontLineClerk = this.$roleTool.RFrontLineClerk();
    return (
      (Adopt &&
        (RHeadBusinessManagement || RBusinessManagement || RFrontLineClerk)) ||
      RFrontLineClerk
    );
  }
  submitChange() {
    const Draft = this.form.auditEnum === "Draft";
    const Reject = this.form.auditEnum === "Reject";
    return Draft || Reject;
  }

  @Watch("form.exMinyuan", { immediate: true, deep: true })
  isShowList(v: any) {
    if (!v) this.isShow = false;
    else this.isShow = true;
  }

  @Watch("form", { immediate: true, deep: true })
  infoChange(val: any) {
    let isCut: any = true;
    if (JSON.stringify(val) !== JSON.stringify(this.oldInfo)) {
      isCut = false;
    }
    this.$emit("cutOther", isCut);
  }

  @Watch("submitFile", { immediate: true, deep: true })
  fileListTypeChange(val: any) {
    let isCut: any = true;
    if (JSON.stringify(val) !== JSON.stringify(this.oldSubmitFile)) {
      isCut = false;
    }
    this.$emit("cutOther", isCut);
  }

  private get projectId() {
    return this.$route.query.id;
  }

  private get checkBoxList() {
    let list = (this.$root as any).dictAllList("Property");
    let arr: any = [];
    list.forEach((v: any) => {
      let item = this.contantList.find((j: any) => v.code === j.propertyEnum);
      if (!item) {
        arr.push(
          JSON.stringify({
            ...v,
            msg: {
              title: v.name,
              averPrice: null,
              propertyAge: null,
              propertyCost: null,
              propertyEnum: v.code,
            },
          })
        );
      } else {
        arr.push(
          JSON.stringify({
            ...v,
            msg: {
              ...item,
            },
          })
        );
      }
    });
    return arr;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    if (this.projectId) {
      const data = await get_project_get__proId({
        proId: this.projectId,
      });
      this.form = { ...this.form, ...data };
      window.sessionStorage.setItem(
        "projectExMinyuan",
        data.exMinyuan.toString()
      );
      window.sessionStorage.setItem("proName", this.form.proName);
      this.form.provinceOption = [data.province, data.city, data.district];
      this.contantList = data.propertyArgs.map((v: any) => ({
        ...v,
        title: (this.$root as any).dictAllName(v.propertyEnum, "Property"),
      }));
      this.form.jingwei = data.lat + "," + data.lng;
      let arr: any = [];
      this.contantList.forEach((v: any) => {
        arr.push(
          JSON.stringify({
            ...(this.$root as any).dictAllItem(v.propertyEnum, "Property"),
            msg: {
              ...v,
            },
          })
        );
      });
      this.form.checkboxEnum = arr;
      arr.forEach((v: any) => {
        this.checkBoxChangeList.push(JSON.parse(v));
      });
      this.houseList = this.form.proPics.map((v: any) => ({
        name: v.fileName,
        fileId: v.fileId,
        exIndex: v.exIndex,
        proAttachEnum: "ProPic",
      }));
      this.houseFileList = this.form.proPics.map((v: any) => ({
        name: v.fileName,
        fileId: v.fileId,
        exIndex: v.exIndex,
        proAttachEnum: "ProPic",
      }));
      this.radio = this.houseFileList.filter(
        (item: any) => item.exIndex === 1
      )[0]?.fileId;
      this.getFileListType(data.attachPics);
      this.oldInfo = { ...this.form };
    } else {
      this.getFileListType([]);
    }
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("ProAttach");
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
    this.oldSubmitFile = this.submitFile;
  }

  queryNew(data: any, type?: any) {
    let obj: any = {};
    obj[type] = data;
    this.submitFile = { ...this.submitFile, ...obj };
  }

  getRadio(data: any) {
    if (this.houseList.length) {
      this.houseList = this.houseList.map((v: any) => {
        if (data === v.fileId) {
          return {
            ...v,
            exIndex: 1,
          };
        } else {
          return {
            ...v,
            exIndex: 0,
          };
        }
      });
    } else {
      this.houseFileList = this.houseFileList.map((v: any) => {
        if (data === v.fileId) {
          return {
            ...v,
            exIndex: 1,
          };
        } else {
          return {
            ...v,
            exIndex: 0,
          };
        }
      });
    }
  }

  checkBoxChange(val: any) {
    const item = JSON.parse(val);
    const same = this.checkBoxChangeList.find((v: any) => v.code === item.code);
    if (same) {
      this.checkBoxChangeList = this.checkBoxChangeList.filter(
        (v: any) => v.code !== same.code
      );
    } else {
      this.checkBoxChangeList.push(item);
    }
  }

  // 处理楼房图片
  houseFiles(data: any) {
    if (!data.length) {
      this.houseList = [];
    } else {
      if (this.houseFileList.length) {
        this.houseList = data.map((v: any) => ({
          fileId: v.fileId,
          fileName: v.name,
          proAttachEnum: "ProPic",
          exIndex: v.exIndex ? v.exIndex : 0, // 是否设为主页
        }));
      } else {
        this.houseList = data.map((v: any) => ({
          fileId: v.fileId,
          fileName: v.name,
          proAttachEnum: "ProPic",
          exIndex: 1, // 是否设为主页
        }));
        this.radio = this.houseList.filter(
          (item: any) => item.exIndex === 1
        )[0]?.fileId;
      }
    }
  }

  viewCycleData(data: any) {
    const item = this.$router.resolve({
      path: `/projectApproval/info`,
      query: {
        id: data.termId,
      },
    });
    window.open(item.href, "_blank");
  }
  async delFirstAgencyCompanys(index: number) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      this.form.firstAgencyCompanys.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
  addFirstAgency() {
    this.firstData.hasCheckedData = this.form.firstAgencyCompanys;
    this.dialogVisible = true;
  }

  firstAgencyFinish(data: any) {
    this.form.firstAgencyCompanys = data;
    this.dialogVisible = false;
  }

  handler({ BMap }: any) {
    this.BMap = BMap;
    this.zoom = 12;
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition((r: any) => {
      this.center.lng = r.longitude;
      this.center.lat = r.latitude;
    });
  }

  getLocationPoint(e: any) {
    this.center.lng = e.point.lng;
    this.center.lat = e.point.lat;
    this.form.jingwei = `${e.point?.lng},${e.point?.lat}`;
    this.zoom = 15;
    let geoCoder = new this.BMap.Geocoder();
    // geoCoder.getPoint(this.searchAddr, (point: any) => {
    //   this.form.jingwei = `${point?.lng},${point?.lat}`;
    // });
    geoCoder.getLocation(e.point, (res: any) => {
      this.form.searchAddr = res?.address;
    });
  }

  async submit(submittype: any) {
    (this.$refs["form"] as ElForm).validate(async (v: any) => {
      if (v) {
        let obj = { ...this.form };
        obj.province = this.form.provinceOption[0];
        obj.city = this.form.provinceOption[1];
        obj.district = this.form.provinceOption[2];
        obj.provinceName = (this.$root as any).getAreaName(
          this.form.provinceOption[0]
        );
        obj.cityName = (this.$root as any).getAreaName(
          this.form.provinceOption[1]
        );
        obj.districtName = (this.$root as any).getAreaName(
          this.form.provinceOption[2]
        );
        obj.lng = this.form.jingwei.split(",")[0];
        obj.lat = this.form.jingwei.split(",")[1];
        obj.searchAddr = this.form.searchAddr;
        obj.propertyArgs = this.checkBoxChangeList.map((v: any) => ({
          ...v.msg,
        }));
        obj.proPics = this.houseList.map((v: any) => ({
          fileId: v.fileId,
          fileName: v.name ? v.name : v.fileName,
          proAttachEnum: "ProPic",
          exIndex: v.exIndex,
        }));
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
          obj.attachPics = arr.map((v: any) => ({
            fileId: v.fileId,
            fileName: v.name,
            type: v.type,
          }));
        } else {
          this.$message({
            type: "warning",
            message: `${msgList.join(",")}项,请上传附件`,
          });
          return;
        }

        if (this.$route.name === "projectChildAdd") {
          let res: any = await post_project_add(obj);
          if (res.proId) {
            this.$message.success("保存成功");
            this.$emit("cutOther", true);
            this.$router.replace({
              path: "/projects/ChildEdit?id=" + res.proId,
            });
          }
        } else {
          obj.proId = this.projectId;
          if (submittype === "save") {
            this.loadSave = true;
            try {
              await post_project_update(obj);
              this.$message.success("保存成功");
              this.$emit("cutOther", true);
              this.houseList = [];
              this.loadSave = false;
            } catch (error) {
              this.loadSave = false;
            }
          } else if (submittype === "submit") {
            await post_project_auditWait(obj);
            this.houseList = [];
            this.$message.success("提交成功");
            this.$goto({ path: "/projects/list" });
          }
        }
        //   obj.proId = this.projectId;
        //   if (submittype === "save") {
        //       await post_project_update(obj);
        //   } else if (submittype === "submit") {
        //     await post_project_auditWait(obj);
        //   }
        // }
        // this.houseList = [];
        // this.$message.success("提交成功");
        // this.$goto({ path: "/projects/list" });
      } else {
        setTimeout(() => {
          let isError: any = document.getElementsByClassName("is-error");
          if (isError != null) {
            isError[0].querySelector("input").focus();
          }
        }, 100);
        return false;
      }
    });
  }
}
</script>
<style lang="scss">
.contant {
  height: 100%;
  border: 1px dashed #d9d9d9;
  /deep/ .el-col {
    margin-top: 10px;
  }
}

.msglist {
  /deep/ .el-form-item__content {
    margin-left: 80px !important;
  }
}

.font {
  padding: 0 5px;
  /deep/ .el-radio__label {
    font-size: 12px;
  }
}

.bm-view {
  width: 100%;
  height: 400px;
}
</style>