<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-27 11:52:41
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-26 17:43:24
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
                v-for="item in $root.dictAllList('YesOrNoType')"
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
                v-for="item in $root.dictAllList('YesOrNoType')"
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
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              class="width--100"
              placeholder="开发商名称"
              :loading="loading"
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
          <el-form-item label="经纬度" prop="name">
            <el-input
              clearable
              v-model="form.name"
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
            <el-checkbox-group
              v-model="form.propertyArgs"
              @change="tenementChange"
            >
              <template v-for="item in $root.dictAllList('PropertyEnum')">
                <el-checkbox :key="item.id" :label="item.name"></el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.propertyArgs.length">
        <el-col
          :span="12"
          v-for="(item, i) in contantList"
          :key="item.id"
          class="msglist"
        >
          <el-form-item>
            <el-form ref="contantForm" :model="item" :rules="contantRules">
              <div class="contant">
                <div
                  style="
                    font-weight: bold;
                    margin-left: 20px;
                    text-align: left;
                    font-size: 15px;
                  "
                >
                  {{ `${item.title}信息` }}
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
                        v-model.number="item.averPrice"
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
                        v-model.number="item.propertyCost"
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
                        v-model="item.propertyAge"
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
                      <el-radio-group v-model="item.renovatLevelEnum">
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
                        v-for="tag in item.buildingNames"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag, i)"
                      >
                        {{ tag }}
                      </el-tag>
                      <el-input
                        class="input-new-tag"
                        v-if="item.inputVisible"
                        v-model="item.inputValue"
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
        <el-col :span="8">
          <el-form-item label="楼盘图片" prop="name">
            <IhUpload
              :file-list="fileList"
              :limit="5"
              :file-size="10"
              accept="image/*"
            >
              <template #extend="{ data }">
                <el-radio v-model="radio" :label="data">设为封面图</el-radio>
              </template>
            </IhUpload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table class="ih-table" :data="Info" style="width: 100%">
      <el-table-column prop="operation" label="操作11"></el-table-column>
      <el-table-column prop="operator" label="处理人"></el-table-column>
      <el-table-column prop="operateTime" label="处理时间"></el-table-column>
      <el-table-column prop="operateResult" label="处理结果"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_company_listAll } from "../../../api/developer/index";

@Component({
  components: {},
})
export default class BasicInfo extends Vue {
  searchOpen = true;

  form: any = {
    proNo: null,
    exMarket: null,
    exMinyuan: "No",
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
    searchAddr: null,
    propertyArgs: [],
    attachPics: [], // 附件信息和图片

    provinceOption: [],
  };

  contantForm: any = {
    averPrice: null,
    propertyAge: null,
    renovatLevelEnum: "Rough",
    buildingNames: [],
    inputValue: null,
    propertyCost: null,
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
  loading = false;

  Info: any = [];

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

  developerOptions: any = [];
  fileList: any = [];

  async created() {
    this.getInfo();
  }

  async getInfo() {
    // this.Info = await get_companyLog_getAll__companyId({
    //   companyId: this.developerId,
    // });
  }

  remoteMethod(query: any) {
    if (query !== "" && query.length >= 2) {
      this.loading = true;
      setTimeout(async () => {
        this.loading = false;
        let list = await post_company_listAll({
          name: query,
        });
        let arr = list.map((v: any) => ({
          label: v.name,
          value: v.id,
        }));
        this.developerOptions = arr.filter((item: any) => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      }, 200);
    } else {
      this.developerOptions = [];
    }
  }

  developerChange(val: any) {
    this.form.developerId = val.value;
    this.form.developerName = val.label;
  }

  tenementChange(val: any) {
    this.contantList = val.map((v: any) => ({
      title: v,
      averPrice: null,
      propertyAge: null,
      renovatLevelEnum: "Rough",
      buildingNames: [],
      propertyCost: null,
      inputVisible: false,
      inputValue: null,
    }));
  }

  handleClose(tag: any, i: number) {
    this.contantList[i].buildingNames.splice(
      this.contantList[i].buildingNames.indexOf(tag),
      1
    );
  }

  showInput(i: number) {
    this.contantList[i].inputVisible = true;
    this.$nextTick(() => {
      (this.$refs.saveTagInput as any)[0].$refs.input.focus();
    });
  }

  handleInputConfirm(i: number) {
    let inputValue = this.contantList[i].inputValue;
    if (inputValue) {
      let val = inputValue + "栋";
      if (this.contantList[i].buildingNames.includes(val)) {
        this.$message.warning("栋座已存在,请重新填写");
        return;
      } else {
        this.contantList[i].buildingNames.push(`${inputValue}栋`);
      }
    }
    this.contantList[i].inputVisible = false;
    this.contantList[i].inputValue = "";
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
</style>