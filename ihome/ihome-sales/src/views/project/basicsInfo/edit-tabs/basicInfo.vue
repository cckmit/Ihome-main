<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-10 16:28:08
-->
<template>
  <div>
    <el-form ref="form" label-width="150px" :model="form" :rules="rules">
      <el-row>
        <el-col :span="8">
          <el-form-item label="盘编">
            <el-input
              clearable
              maxlength="64"
              v-model="form.proNo"
              placeholder="盘编"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目推广名" prop="proName">
            <el-input
              clearable
              maxlength="50"
              v-model="form.proName"
              placeholder="项目推广名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目备案名" prop="proRecord">
            <el-input
              clearable
              maxlength="50"
              v-model="form.proRecord"
              placeholder="项目备案名"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开发商名称" prop="developerId">
            <el-select
              v-model="form.developerId"
              clearable
              filterable
              class="width--100"
              placeholder="开发商名称"
            >
              <el-option
                v-for="item in developerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="市场化项目" prop="exMarket">
            <el-select v-model="form.exMarket" clearable class="width--100">
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
          <el-form-item label="关联明源" prop="exMinyuan">
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
          <el-form-item label="同步明源房号数据" prop="exSyncRoom">
            <el-select v-model="form.exSyncRoom" clearable class="width--100">
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
        <el-col :span="8">
          <el-form-item label="省市区" prop="provinceOption">
            <IhCascader
              v-model="form.provinceOption"
              :checkStrictly="false"
            ></IhCascader>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="项目地址" prop="proAddr">
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
          <el-form-item label="经纬度" prop="jingwei">
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
        <el-form-item
          ><el-col :span="16">
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
                style="display: none"
              ></BmLocalSearch>
            </BaiduMap>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="物业类型" class="text-left">
            <el-checkbox-group
              v-model="form.checkboxEnum"
              @change="checkboxChangeHandler"
            >
              <template v-for="item in checkBoxList">
                <el-checkbox :key="JSON.parse(item).code" :label="item">{{
                  JSON.parse(item).name
                }}</el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.checkboxEnum.length" class="margin-left-60">
        <el-col
          :span="12"
          v-for="item in checkBoxChangeList"
          :key="item.code"
          class="msglist"
        >
          <el-form-item>
            <el-form ref="contantForm" :model="item.msg" :rules="contantRules">
              <div class="contant">
                <div
                  style="
                    font-weight: bold;
                    margin-left: 20px;
                    text-align: left;
                    font-size: 15px;
                  "
                >
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
                        v-model.number="item.msg.averPrice"
                        placeholder="住宅均价"
                        maxlength="50"
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
                        v-model.number="item.msg.propertyCost"
                        placeholder="住宅均价"
                        maxlength="50"
                      ></el-input>
                      <span style="width: 80px; margin-left: 10px"
                        >元/m²/月</span
                      >
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="产权年限"
                      label-width="90px"
                      class="text-left"
                      prop="propertyAge"
                    >
                      <el-select
                        style="width: 50%"
                        v-model="item.msg.propertyAge"
                        clearable
                      >
                        <el-option
                          v-for="item in $root.dictAllList('PropertyAgeEnum')"
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
          <el-form-item label="楼盘图片" prop="name">
            <IhUpload
              :file-list.sync="houseFileList"
              :limit="5"
              :file-size="10"
              size="100px"
              accept="image/*"
              :loadPermi="false"
              @newFileList="houseFiles"
            >
              <template #extend="{ data }">
                <div class="padding-top-5 font">
                  <el-radio
                    v-model="radio"
                    :label="data.fileId"
                    @change="getRadio"
                    >设为封面图</el-radio
                  >
                </div>
              </template>
            </IhUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <p class="ih-info-title">项目周期</p>
        <div class="padding-left-20">
          <el-table class="ih-table" :data="form.terms" style="width: 100%">
            <el-table-column
              prop="termName"
              label="项目周期名称"
            ></el-table-column>
            <el-table-column prop="busTypeEnum" label="业务类型">
              <template v-slot="{ row }">{{
                $root.dictAllName(row.busTypeEnum, "BusTypeEnum")
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
            <el-table-column prop="termEnd" label="结束时间"></el-table-column>
            <el-table-column prop="auditEnum" label="审核状态">
              <template v-slot="{ row }">{{
                $root.dictAllName(row.auditEnum, "AuditEnum")
              }}</template>
            </el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
              <template>
                <el-button size="small" @click="viewCycleData">查看</el-button>
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
          >+增加公司</el-button
        >
        <div class="padding-left-20">
          <el-table
            class="ih-table"
            :data="form.firstAgencyCompanys"
            style="width: 100%"
          >
            <el-table-column
              prop="agencyName"
              label="一手代理团队名称"
            ></el-table-column>
            <el-table-column prop="simpleName" label="简称"></el-table-column>
            <el-table-column prop="province" label="省份">
              <template v-slot="{ row }">{{
                $root.getAreaName(row.province)
              }}</template>
            </el-table-column>
            <el-table-column prop="city" label="城市">
              <template v-slot="{ row }">{{
                $root.getAreaName(row.city)
              }}</template>
            </el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
              <template v-slot="{ $index }">
                <el-button size="small" @click="delFirstAgencyCompanys($index)"
                  >删除</el-button
                >
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
            :data="form.attachPics"
            style="width: 100%"
          >
            <el-table-column prop="proAttachEnum" label="类型">
              <template v-slot="{ row }">{{
                $root.dictAllName(row.proAttachEnum, "ProAttachEnum")
              }}</template>
            </el-table-column>
            <el-table-column label="附件">
              <IhUpload :file-list="accFileList" size="100px"></IhUpload>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </el-form>
    <div class="margin-top-20">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="$goto({ path: '/projects/list' })">关闭</el-button>
    </div>
    <ih-dialog :show="dialogVisible">
      <FirstAgencyDialog
        @cancel="() => (dialogVisible = false)"
        @finish="(data) => firstAgencyFinish(data)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { post_company_listAll } from "@/api/developer/index";
import {
  get_project_get__proId,
  post_project_add,
  post_project_update,
} from "@/api/project/index";
import FirstAgencyDialog from "../dialog/firstAgency.vue";

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
  form: any = {
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

  contantForm: any = {
    averPrice: null,
    propertyAge: null,
    propertyCost: null,
    propertyId: null,
  };
  contantList: any = [];

  rules: any = {
    exMarket: [
      { required: true, message: "请选择市场化项目", trigger: "blur" },
    ],
    exMinyuan: [{ required: true, message: "请选择关联明源", trigger: "blur" }],
    provinceOption: [
      { required: true, message: "请选择省市区", trigger: "blur" },
    ],
    proName: [{ required: true, message: "请填写项目推广名", trigger: "blur" }],
    proRecord: [
      { required: true, message: "请填写项目备案名", trigger: "blur" },
    ],
    proAddr: [{ required: true, message: "请填写项目地址", trigger: "blur" }],
    developerId: [
      { required: true, message: "请填写开发商名称", trigger: "blur" },
    ],
    jingwei: [{ required: true, message: "请填写经纬度", trigger: "blur" }],
    exSyncRoom: [
      {
        required: true,
        message: "请选择同步明源房号数据",
        trigger: "blur",
      },
    ],
  };
  contantRules: any = {
    propertyAge: [
      { required: true, message: "请选择产权年限", trigger: "blur" },
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
  developerOptions: any = [];
  houseFileList: any = [];
  radio = "";
  houseList: any = [];
  accFileList: any = [];
  dialogVisible = false;
  checkBoxChangeList: any = [];
  center: any = { lng: 0, lat: 0 };
  zoom = 3;
  BMap: any = {};
  searchAddr = "";
  isShow = true;

  @Watch("form.exMinyuan", { immediate: true, deep: true })
  isShowList(v: any) {
    if (!v) this.isShow = false;
    else this.isShow = true;
  }

  private get projectId() {
    return this.$route.query.id;
  }

  private get checkBoxList() {
    let list = (this.$root as any).dictAllList("PropertyEnum");
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
    this.getDeveloper();
  }

  async getInfo() {
    if (this.projectId) {
      const data = await get_project_get__proId({
        proId: this.projectId,
      });
      this.form = { ...this.form, ...data };
      this.form.provinceOption = [data.province, data.city, data.district];
      this.contantList = data.propertyArgs.map((v: any) => ({
        ...v,
        title: (this.$root as any).dictAllName(v.propertyEnum, "PropertyEnum"),
      }));
      this.form.jingwei = data.lat + "," + data.lng;
      let arr: any = [];
      this.contantList.forEach((v: any) => {
        arr.push(
          JSON.stringify({
            ...(this.$root as any).dictAllItem(v.propertyEnum, "PropertyEnum"),
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
      this.houseFileList = this.form.proPics.map((v: any) => ({
        name: v.attachName,
        fileId: v.attachAddr,
        exIndex: v.exIndex,
        proAttachEnum: "ProPic",
      }));
      this.radio = this.houseFileList.filter(
        (item: any) => item.exIndex === 1
      )[0]?.fileId;
    }
  }

  async getDeveloper() {
    const item = await post_company_listAll({
      name: "",
    });
    this.developerOptions = item.map((v: any) => ({
      label: v.name,
      value: v.id,
    }));
  }

  getRadio(data: any) {
    if (this.houseList.length) {
      this.houseList = this.houseList.map((v: any) => {
        if (data === v.attachAddr) {
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

  checkboxChangeHandler(val: any) {
    const item = val.map((v: any) => JSON.parse(v));
    this.checkBoxChangeList = item;
  }

  // 处理楼房图片
  houseFiles(data: any) {
    console.log(data);
    this.houseList = data.map((v: any) => ({
      attachAddr: v.fileId,
      attachName: v.name,
      attachId: null,
      proAttachEnum: "ProPic",
      exIndex: v.exIndex, // 是否设为主页
    }));
    // let arr = data.map((v: any) => ({
    //   attachAddr: v.fileId,
    //   attachName: v.name,
    //   attachId: v.null,
    //   proAttachEnum: "ProPic",
    //   exIndex: null, // 是否设为主页
    // }));
    // arr.forEach((v: any, i: number) => {
    //   this.$set(this.houseFileList, i, arr[i]);
    // });
  }

  viewCycleData() {
    console.log(111);
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
    this.dialogVisible = true;
  }

  firstAgencyFinish(data: any) {
    if (this.form.firstAgencyCompanys.length) {
      let arr: any = data.concat(this.form.firstAgencyCompanys);
      const res = new Map();
      this.form.firstAgencyCompanys = arr.filter(
        (v: any) => !res.has(v.agencyId) && res.set(v.agencyId, 1)
      );
    } else {
      this.form.firstAgencyCompanys = data;
    }
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
    let geoCoder = new this.BMap.Geocoder();
    geoCoder.getPoint(this.searchAddr, (point: any) => {
      this.form.jingwei = `${point?.lng},${point?.lat}`;
    });
    geoCoder.getLocation(e.point, (res: any) => {
      this.form.searchAddr = res?.address;
    });
  }

  async save() {
    let obj = { ...this.form };
    obj.province = this.form.provinceOption[0];
    obj.city = this.form.provinceOption[1];
    obj.district = this.form.provinceOption[2];
    obj.provinceName = (this.$root as any).getAreaName(
      this.form.provinceOption[0]
    );
    obj.cityName = (this.$root as any).getAreaName(this.form.provinceOption[1]);
    obj.districtName = (this.$root as any).getAreaName(
      this.form.provinceOption[2]
    );
    obj.lng = this.form.jingwei.split(",")[0];
    obj.lat = this.form.jingwei.split(",")[1];
    obj.searchAddr = this.form.searchAddr;
    obj.propertyArgs = this.checkBoxChangeList.map((v: any) => ({
      ...v.msg,
    }));
    if (this.houseList.length) {
      obj.proPics = this.houseList;
    } else {
      obj.proPics = this.houseFileList.map((v: any) => ({
        attachName: v.name,
        attachAddr: v.fileId,
        attachId: null,
        exIndex: v.exIndex,
        proAttachEnum: v.proAttachEnum,
      }));
    }
    if (this.$route.name === "projectChildAdd") {
      await post_project_add(obj);
    } else {
      obj.proId = this.projectId;
      await post_project_update(obj);
    }
    this.houseList = [];
    this.$message.success("保存成功");
    this.$goto({ path: "/projects/list" });
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