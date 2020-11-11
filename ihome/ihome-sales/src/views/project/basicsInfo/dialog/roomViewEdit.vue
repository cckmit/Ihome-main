<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 18:39:23
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-11 11:37:10
-->
<template>
  <div>
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body
      :before-close="cancel"
      width="700px"
      class="dialog text-left"
      :title="data.roomViewType === 'add' ? '添加房号' : '编辑房号'"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="16">
            <el-form-item label="当前栋座：">
              <el-input
                v-model="form.buildingName"
                placeholder="当前栋座"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="data.roomViewType !== 'edit'">
          <el-col :span="24">
            <el-form-item label="添加方式：">
              <div style="
                  display: flex;
                  justify-contant: flex-start;
                  align-items: center;
                  line-height: auto;
                ">
                <el-radio-group
                  v-model="form.exSimple"
                  @change="$refs.form.clearValidate()"
                >
                  <el-radio :label="1">单个添加</el-radio>
                  <el-radio :label="2">批量添加</el-radio>
                </el-radio-group>
                <span
                  style="padding: 0 16px; font-size: 12px; cursor: pointer"
                  @mouseover="isShow = true"
                  @mouseout="isShow = false"
                >示例说明</span>
              </div>
              <div
                class="explain"
                v-if="isShow"
              >
                <span class="explain-item">房号格式为: 【101】</span>
                <span class="explain-item">
                  房号规则为: 从【8】到【13】层的【1】号房则生成出以下房号：
                </span>
                <span class="explain-item">801 901 1001 1101 1201 1301</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.exSimple === 1">
          <el-col :span="16">
            <el-form-item
              label="房号："
              prop="roomNo"
            >
              <el-input
                v-model="form.roomNo"
                placeholder="房号"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.exSimple === 2">
          <el-col :span="16">
            <el-form-item
              label="房号格式："
              prop="roomPattern"
            >
              <el-input
                v-model="form.roomPattern"
                placeholder="房号格式"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.exSimple === 2">
          <el-col :span="16">
            <el-form-item label="房号规则：">
              <div style="display: flex; justify-contant: flex-start">
                <span style="padding: 0 8px">从</span>
                <el-form-item prop="form">
                  <el-input
                    v-model.number="form.form"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
                <span style="padding: 0 8px">到</span>
                <el-form-item prop="to">
                  <el-input
                    v-model.number="form.to"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
                <span style="padding: 0 0 0 8px">层</span>
                <span style="padding: 0 8px 0 0">的</span>
                <el-form-item prop="num">
                  <el-input
                    v-model.number="form.num"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
                <span style="padding: 0 0 0 8px">房</span>
                <span>号</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="房屋户型："
              prop="houseTypeId"
            >
              <el-select
                style="width: 100%"
                v-model="form.houseTypeId"
                clearable
                placeholder="房屋户型"
                @change="houseTypeChange"
              >
                <el-option
                  v-for="item in houseTypeOptions"
                  :key="item.houseTypeId"
                  :label="item.houseName"
                  :value="item.houseTypeId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="14"
            class="col-router"
          >
            <el-link @click="addHouseType">没有找到适合的户型?点击去添加户型</el-link>
          </el-col>
        </el-row>
        <el-row v-if="houseInfo">
          <el-col :span="10">
            <el-form-item
              label="户型面积："
              prop="space"
            >
              <div style="display: flex; justify-contant: flex-start">
                <el-input
                  disabled
                  v-model.number="form.space"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                ></el-input>
                <span style="width: 30px; margin-left: 10px">m²</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="houseInfo">
          <el-col :span="24">
            <el-form-item label="户型：">
              <div style="display: flex; justify-contant: flex-start">
                <el-select
                  v-model="form.room"
                  clearable
                  disabled
                > </el-select>
                <span style="padding: 0 8px">室</span>
                <el-select
                  v-model="form.hall"
                  clearable
                  disabled
                > </el-select>
                <span style="padding: 0 8px">厅</span>
                <el-select
                  v-model="form.kitchen"
                  clearable
                  disabled
                >
                </el-select>
                <span style="padding: 0 8px">厨</span>
                <el-select
                  v-model="form.toilet"
                  clearable
                  disabled
                >
                </el-select>
                <span style="padding: 0 8px">卫</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.exSimple === 1 && houseInfo">
          <el-col :span="24">
            <el-form-item label="朝向：">
              <el-select
                v-model="form.positionEnum"
                clearable
                disabled
              >
                <el-option
                  v-for="item in $root.dictAllList('PositionEnum')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel()">返 回</el-button>
        <el-button
          type="primary"
          @click="finish()"
        >保 存</el-button>
      </span>
    </el-dialog>
    <ih-dialog
      :show="houseDialogVisible"
      desc="编辑"
    >
      <HouseTypeEdit
        :data="editData"
        @cancel="() => (houseDialogVisible = false)"
        @finish="(data) => houseFinish(data)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  get_houseType_getItemsByProperty__proId,
  post_houseType_add,
} from "@/api/project/index";
import HouseTypeEdit from "./houseTypeEdit.vue";
@Component({
  components: { HouseTypeEdit },
})
export default class RoomViewEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  houseDialogVisible = false;
  editData: any = {};
  private isShow = false;
  houseInfo = false;

  form: any = {
    buildingName: null,
    exSimple: 1,
    roomNo: null,
    roomPattern: null,
    form: null,
    to: null,
    num: null,
    houseTypeId: null,

    space: null,
    room: null,
    hall: null,
    kitchen: null,
    toilet: null,
    positionEnum: null,
  };
  rules: any = {
    roomNo: [{ required: true, message: "请输入房号", trigger: "change" }],
    roomPattern: [
      { required: true, message: "请输入房号格式", trigger: "change" },
    ],
    form: [{ required: true, message: "请输入内容", trigger: "change" }],
    to: [{ required: true, message: "请输入内容", trigger: "change" }],
    num: [{ required: true, message: "请输入内容", trigger: "change" }],
    houseTypeId: [
      { required: true, message: "请选择房屋户型", trigger: "change" },
    ],
  };
  houseTypeOptions: any = [];
  private get proId() {
    return this.$route.query.id;
  }

  @Watch("form.houseTypeId")
  isHouseInfo(v: any) {
    if (v) this.houseInfo = true;
    else this.houseInfo = false;
  }

  cancel() {
    this.$emit("cancel", false);
  }

  addHouseType() {
    this.editData = {};
    this.houseDialogVisible = true;
  }

  houseTypeChange(v: any) {
    if (v) {
      const item = this.houseTypeOptions.find((j: any) => j.houseTypeId === v);
      this.form.space = item.space;
      this.form.room = item.room;
      this.form.hall = item.hall;
      this.form.kitchen = item.kitchen;
      this.form.toilet = item.toilet;
      this.form.positionEnum = item.positionEnum;
    }
  }

  async houseFinish(data: any) {
    let obj: any = {};
    obj = { ...data };
    obj.picAddr = data.fileList[0].fileId;
    obj.proId = this.proId;
    await post_houseType_add(obj);
    this.$message.success("保存成功");
    this.houseDialogVisible = false;
    this.getInfo();
  }

  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.$emit("finish", this.form);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async getInfo() {
    this.houseTypeOptions = await get_houseType_getItemsByProperty__proId({
      proId: this.$route.query.id,
    });
  }
  async created() {
    this.form = { ...this.data, exSimple: 1 };
    this.getInfo();
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss" >
.ih-dialog {
  .el-form-item__content {
    margin-right: 40px;
  }
  .el-input,
  .el-select {
    width: 100%;
  }
}
.col-router {
  display: flex;
  align-items: flex-end;
  height: 40px;
  .el-link {
    display: inline-block;
    margin-left: 20px;
  }
}

.explain {
  width: 250px;
  height: 70px;
  position: absolute;
  right: 20px;
  top: -26px;
  background-color: #fff;
  z-index: 9999;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  font-size: 12px;
  padding: 10px;
}
.explain-item {
  display: block;
  line-height: initial;
}
</style>