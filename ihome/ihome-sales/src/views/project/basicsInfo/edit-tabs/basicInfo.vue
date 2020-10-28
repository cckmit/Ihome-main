<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-28 15:29:13
-->
<template>
  <div>
    <el-form ref="form" label-width="130px" :model="form" :rules="rules">
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
          <el-form-item label="是否市场化项目" prop="exMarket">
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
          <el-form-item label="是否关联明源" prop="exMinyuan">
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
      <el-row>
        <el-col :span="8">
          <el-form-item label="省市区" prop="provinceOption">
            <IhCascader
              v-model="form.provinceOption"
              :checkStrictly="false"
            ></IhCascader>
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
          <el-form-item label="明源楼盘名">
            <el-input
              clearable
              v-model="form.minyuanName"
              placeholder="明源楼盘名"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
        <el-col :span="8">
          <el-form-item label="项目地址" prop="proAddr">
            <el-input
              clearable
              maxlength="200"
              v-model="form.proAddr"
              placeholder="项目地址"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开发商名称" prop="developerName">
            <el-select
              v-model="form.developerName"
              clearable
              filterable
              class="width--100"
              placeholder="开发商名称"
              @change="developerChange"
            >
              <el-option
                v-for="item in developerOptions"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
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
          <el-form-item label-width="30px">
            <el-input
              placeholder="请输入地址"
              v-model="form.searchAddr"
              class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          ><el-col :span="16">
            <div style="height: 200px">我是地图</div>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="物业类型" class="text-left">
            <el-checkbox-group v-model="form.checkboxEnum">
              <template v-for="item in checkBoxList">
                <el-checkbox :key="item.code" :label="item">{{
                  item.name
                }}</el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.checkboxEnum.length">
        <el-col
          :span="12"
          v-for="(item, i) in form.checkboxEnum"
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
                          v-for="item in ageOptions"
                          :key="item.code"
                          :label="item.value"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="装修级别"
                      label-width="90px"
                      class="text-left"
                      prop="renovatLevelEnum"
                    >
                      <el-radio-group v-model="item.msg.renovatLevelEnum">
                        <el-radio label="Rough">毛坯</el-radio>
                        <el-radio label="HardBound">精装修</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="包含栋座"
                      label-width="90px"
                      class="text-left"
                    >
                      <el-tag
                        :key="tag"
                        v-for="tag in item.msg.buildingNames"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag, i)"
                      >
                        {{ tag }}
                      </el-tag>
                      <el-input
                        class="input-new-tag"
                        v-if="item.msg.inputVisible"
                        v-model="item.msg.inputValue"
                        ref="saveTagInput"
                        size="small"
                        placeholder="输入栋座"
                        @keyup.enter.native="handleInputConfirm(i)"
                        @blur="handleInputConfirm(i)"
                      >
                      </el-input>
                      <el-button v-else size="small" @click="showInput(i)"
                        >+ 栋座</el-button
                      >
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
              :file-list="houseFileList"
              :limit="5"
              :file-size="10"
              size="100px"
              accept="image/*"
              @queryList="houseFiles"
            >
              <template #extend="{ data }">
                <div class="padding-top-5 font">
                  <el-radio v-model="radio" :label="data" @change="getRadio"
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
      <el-button type="primary" @click="add">保存</el-button>
      <el-button @click="$goto({ path: '/projects/list' })">关闭</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_company_listAll } from "@/api/developer/index";
import { get_project_get__proId } from "@/api/project/index";

@Component({
  components: {},
})
export default class BasicInfo extends Vue {
  searchOpen = true;

  form: any = {
    proNo: null,
    exMarket: null,
    exMinyuan: 0,
    province: null,
    city: null,
    district: null,
    minyuanName: null,
    proRecord: null,
    proAddr: null,
    developerId: null,
    developerName: null,
    lng: null, // 经度
    lat: null, // 纬度
    jingwei: null, // 经纬度
    searchAddr: null,
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
    renovatLevelEnum: "Rough",
    buildingNames: [],
    inputValue: null,
    propertyCost: null,
    propertyId: null,
  };
  contantList: any = [];

  rules: any = {
    exMarket: [
      { required: true, message: "请选择是否市场化项目", trigger: "blur" },
    ],
    exMinyuan: [
      { required: true, message: "请选择是否关联明源", trigger: "blur" },
    ],
    provinceOption: [
      { required: true, message: "请选择省市区", trigger: "blur" },
    ],
    proName: [{ required: true, message: "请填写项目推广名", trigger: "blur" }],
    proRecord: [
      { required: true, message: "请填写项目备案名", trigger: "blur" },
    ],
    proAddr: [{ required: true, message: "请填写项目地址", trigger: "blur" }],
    developerName: [
      { required: true, message: "请填写开发商名称", trigger: "blur" },
    ],
    jingwei: [{ required: true, message: "请填写经纬度", trigger: "blur" }],
  };
  contantRules: any = {
    propertyAge: [
      { required: true, message: "请选择产权年限", trigger: "blur" },
    ],
    renovatLevelEnum: [
      { required: true, message: "请选择装修级别", trigger: "blur" },
    ],
  };
  buildingNames: any = [];
  inputVisible = false;
  ageOptions: any = [
    {
      code: 30,
      value: 30,
    },
    {
      code: 40,
      value: 40,
    },
    {
      code: 50,
      value: 50,
    },
    {
      code: 60,
      value: 60,
    },
    {
      code: 70,
      value: 70,
    },
    {
      code: 0,
      value: "永久",
    },
  ];
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
  radio = {};
  houseList: any = [];
  accFileList: any = [];

  private get projectId() {
    return this.$route.query.id;
  }

  private get checkBoxList() {
    let list = (this.$root as any).dictAllList("PropertyEnum");
    let arr: any = [];
    list.forEach((v: any) => {
      let item = this.contantList.find((j: any) => v.code === j.propertyEnum);
      if (!item) {
        arr.push({
          ...v,
          msg: {
            title: v.name,
            averPrice: null,
            propertyAge: null,
            renovatLevelEnum: "Rough",
            buildingNames: [],
            propertyCost: null,
            inputVisible: false,
            inputValue: null,
            propertyEnum: v.code,
          },
        });
      } else {
        arr.push({
          ...v,
          msg: item,
        });
      }
    });
    return arr;
  }

  async created() {
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
        buildingNames: v.buildingNames.map((j: any) => j.buildingName),
      }));
      this.form.jingwei = data.lat + "," + data.lng;
      this.contantList.forEach((v: any) => {
        this.form.checkboxEnum.push({
          ...(this.$root as any).dictAllItem(v.propertyEnum, "PropertyEnum"),
          msg: v,
        });
      });
      this.houseFileList = this.form.proPics.map((v: any) => ({
        name: v.attachAddr,
        fileId: v.attachId,
        exIndex: v.exIndex,
        proAttachEnum: "ProPic",
      }));
      this.radio = this.houseFileList.filter(
        (item: any) => item.exIndex === 1
      )[0];
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
        if (data.fileId === v.attachId) {
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
        if (data.fileId === v.fileId) {
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

  developerChange(val: any) {
    this.form.developerId = val.value;
    this.form.developerName = val.label;
  }

  handleClose(tag: any, i: number) {
    this.form.checkboxEnum[i].msg.buildingNames.splice(
      this.form.checkboxEnum[i].msg.buildingNames.indexOf(tag),
      1
    );
  }

  showInput(i: number) {
    this.form.checkboxEnum[i].msg.inputVisible = true;
    this.$nextTick(() => {
      (this.$refs.saveTagInput as any)[0].$refs.input.focus();
    });
  }
  // 添加物业类型的栋座
  handleInputConfirm(i: number) {
    let inputValue = this.form.checkboxEnum[i].msg.inputValue;
    if (inputValue) {
      let val = inputValue + "栋";
      if (this.form.checkboxEnum[i].msg.buildingNames.includes(val)) {
        this.$message.warning("栋座已存在,请重新填写");
        return;
      } else {
        this.form.checkboxEnum[i].msg.buildingNames.push(`${inputValue}栋`);
      }
    }
    this.form.checkboxEnum[i].msg.inputVisible = false;
    this.form.checkboxEnum[i].msg.inputValue = "";
  }

  // 处理楼房图片
  houseFiles(data: any) {
    this.houseList = data.map((v: any) => ({
      attachAddr: v.name,
      attachId: v.fileId,
      proAttachEnum: "ProPic",
      exIndex: null, // 是否设为主页
    }));
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
  add() {
    let obj = { ...this.form };
    obj.province = this.form.provinceOption[0];
    obj.city = this.form.provinceOption[1];
    obj.district = this.form.provinceOption[2];
    obj.propertyArgs = this.form.checkboxEnum.map((v: any) => ({
      ...v.msg,
      buildingNames: v.msg.buildingNames.map((j: any) => ({
        buildingName: j,
      })),
    }));
    obj.proId = this.projectId;
    if (this.houseList.length) {
      obj.proPics = this.houseList;
    } else {
      obj.proPics = this.houseFileList.map((v: any) => ({
        attachAddr: v.name,
        attachId: v.fileId,
        exIndex: v.exIndex,
        proAttachEnum: v.proAttachEnum,
      }));
    }
    console.log(obj);
    // this.$message.success("保存成功");
    // this.$goto({ path: "/projects/list" });
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

.el-tag {
  margin-right: 10px;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}

.msglist {
  /deep/ .el-form-item__content {
    margin-left: 80px !important;
  }
}

.font {
  /deep/ .el-radio__label {
    font-size: 12px;
  }
}
</style>