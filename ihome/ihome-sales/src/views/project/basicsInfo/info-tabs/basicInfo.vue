<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-29 09:27:24
-->
<template>
  <div>
    <el-form
      ref="form"
      label-width="130px"
      :model="form"
      class="text-left"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="盘编"
            :title="form.proNo"
          >
            <span class="text-ellipsis">{{form.proNo}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目推广名"
            :title="form.proName"
          >
            <span class="text-ellipsis">{{ form.proName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目备案名"
            :title="form.proRecord"
          >
            <span class="text-ellipsis">{{ form.proRecord }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="开发商名称"
            :title="form.developerName"
          >
            <span class="word-break">{{ form.developerName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="市场化项目">
            <span class="text-ellipsis">{{ filterExMarket(form.exMarket) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关联明源">
            <span class="text-ellipsis">{{ filterExMarket(form.exMinyuan) }}</span>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="form.exMinyuan"
        >
          <el-form-item label="明源区域公司">
            <span class="text-ellipsis">{{ form.companyName }}</span>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="isShow"
        >
          <el-form-item
            label="爱家父项目推广名"
            :title="form.parentName"
          >
            <span class="text-ellipsis">{{ form.parentName }}</span>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="isShow"
        >
          <el-form-item
            label="明源楼盘名"
            :title="form.buildingGuidName"
          >
            <span class="text-ellipsis">{{ form.buildingGuidName }}</span>
          </el-form-item>
        </el-col>
        <!-- <el-col
          :span="8"
          v-if="isShow"
        >
          <el-form-item label="同步明源房号数据">
            <span class="text-ellipsis">{{ filterExMarket(form.exSyncRoom) }}</span>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="省份">
            <span class="text-ellipsis">{{ $root.getAreaName(form.province) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市">
            <span class="text-ellipsis">{{ $root.getAreaName(form.city) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政区">
            <span class="text-ellipsis">{{ $root.getAreaName(form.district) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="项目地址"
            :title="form.proAddr"
          >
            <span class="word-break">{{ form.proAddr }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="经纬度"
            :title="form.jingwei"
          >
            <span class="text-ellipsis">{{ form.jingwei }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            label="详细地址"
            :title="form.searchAddr"
          >
            <span class="word-break">{{ form.searchAddr }}</span>
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
            >
              <BmView style="width: 100%; height: 100%; flex: 1"></BmView>
              <BmLocalSearch
                v-if="form.searchAddr"
                :keyword="form.searchAddr"
                :auto-viewport="true"
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
          >
            <el-checkbox-group
              v-model="form.checkboxEnum"
              disabled
            >
              <template v-for="item in checkBoxList">
                <el-checkbox
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
      <el-row v-if="form.checkboxEnum.length">
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
                      <span>{{ item.msg.averPrice }}</span>
                      <span style="width: 80px; margin-left: 10px">元/m²</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="物业费"
                      label-width="90px"
                      class="text-left"
                    >
                      <span>{{ item.msg.propertyCost }}</span>
                      <span style="width: 80px; margin-left: 10px">元/m²/月</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="产权年限"
                      label-width="90px"
                      class="text-left"
                    >
                      <span>{{
                        $root.dictAllName(
                          item.msg.propertyAge,
                          "PropertyAge"
                        )
                      }}</span>
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
          <el-form-item label="楼盘图片">
            <IhUpload
              v-model="houseFileList"
              :limit="houseFileList.length"
              :file-size="10"
              size="100px"
              accept="image/*"
              :removePermi="false"
              :editPermi="false"
              :upload-show="!!houseFileList.length"
            >
              <template #extend="{ data }">
                <div class="padding-top-5 font">
                  <el-radio
                    v-model="radio"
                    :label="data.fileId"
                    disabled
                  >设为封面图
                  </el-radio>
                </div>
              </template>
            </IhUpload>
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
          </el-table>
        </div>
      </el-row>
      <el-row>
        <br />
        <p class="ih-info-title">一手代理公司</p>
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
                  v-model="row.fileList"
                  :file-size="10"
                  :file-type="row.code"
                  :limit="row.fileList.length"
                  :upload-show="!!row.fileList.length"
                  size="100px"
                  :removePermi="false"
                  :editPermi="false"
                ></IhUpload>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </el-form>
    <div
      class="margin-top-20"
      v-if="$route.name === 'projectChildAudit'"
    >
      <p class="ih-info-title">审核意见</p>
      <el-input
        class="padding-left-20"
        style="box-sizing: border-box"
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="remark"
      >
      </el-input>
      <div class="margin-top-20">
        <el-button
          @click="auditPass()"
          type="success"
        >通过</el-button>
        <el-button
          @click="auditReject()"
          type="danger"
        >驳回</el-button>
      </div>
    </div>
    <div
      v-if="$route.name === 'projectChildRecall'"
      class="margin-top-20"
    >
      <el-button
        @click="recall()"
        type="danger"
      >撤回</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  get_project_get__proId,
  post_project_audit,
  post_project_reject,
  post_project_cancel__proId,
} from "@/api/project/index";
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView.vue";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch.vue";

@Component({
  components: { BaiduMap, BmView, BmLocalSearch },
})
export default class InfoBasicInfo extends Vue {
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
    companyName: null,
  };
  remark = "";
  contantList: any = [];
  fileListType: any = [];
  checkBoxChangeList: any = [];
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
  radio = {};
  houseList: any = [];
  accFileList: any = [];
  center: any = { lng: 113.379331, lat: 23.109411 };
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

  async created() {
    this.getInfo();
  }
  private filterExMarket(type: any) {
    const item = this.YesOrNoType.find((v: any) => v.code === type)?.name;
    return item;
  }

  async getInfo() {
    if (this.projectId) {
      const data = await get_project_get__proId({
        proId: this.projectId,
      });
      this.form = { ...this.form, ...data };
      this.contantList = data.propertyArgs.map((v: any) => ({
        ...v,
        title: (this.$root as any).dictAllName(v.propertyEnum, "Property"),
      }));
      if (data.lat && data.lng) {
        this.form.jingwei = data.lat + "," + data.lng;
      }
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
      this.houseFileList = this.form.proPics.map((v: any) => ({
        fileName: v.fileName,
        fileId: v.fileId,
        exIndex: v.exIndex,
        proAttachEnum: "ProPic",
      }));
      this.radio = this.houseFileList.filter(
        (item: any) => item.exIndex === 1
      )[0]?.fileId;
      this.getFileListType(data.attachPics);
      window.sessionStorage.setItem("proName", this.form.proName);
    }
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("ProAttach");
    this.fileListType = list.map((v: any) => {
      return {
        ...v,
        fileList: data.filter((j: any) => j.type === v.code),
      };
    });
  }

  handler({ BMap }: any) {
    this.BMap = BMap;
    this.zoom = 15;
  }

  async recall() {
    try {
      await post_project_cancel__proId({
        proId: this.form.proId,
      });
      this.$message.success("撤回成功!");
      this.$goto({ path: "/projects/list" });
    } catch (err) {
      console.log(err);
    }
  }

  async auditPass() {
    if (this.remark) {
      let obj: any = {};
      obj.proId = this.projectId;
      obj.auditOption = this.remark;
      await post_project_audit(obj);
      this.$message.success("审核成功");
      this.$goto({ path: "/projects/list" });
    } else {
      this.$message({
        type: "warning",
        message: "请填写审核意见",
      });
    }
  }

  async auditReject() {
    if (this.remark) {
      let obj: any = {};
      obj.proId = this.projectId;
      obj.rejectOption = this.remark;
      await post_project_reject(obj);
      this.$message.success("驳回成功");
      this.$goto({ path: "/projects/list" });
    } else {
      this.$message({
        type: "warning",
        message: "请填写审核意见",
      });
    }
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
  padding: 5px;
  line-height: 0;
  /deep/ .el-radio__label {
    font-size: 12px;
  }
}

.bm-view {
  width: 100%;
  height: 400px;
}

.text-ellipsis {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.word-break {
  word-break: break-all;
}
.line-height {
  line-height: 20px !important;
}
</style>