<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-01 11:34:52
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-21 19:47:57
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="700px"
    class="dialog text-left"
    title="栋座归属信息"
  >
    <template v-for="(item, i) in form">
      <div :key="i">
        <div class="titleButton">
          <p class="ih-info-title">{{item.companyName + '关联栋座'}}</p>
          <div class="buttons">
            <el-button
              v-if="item.isShow"
              type="primary"
              size="mini"
              @click="setAll(item, 'all')"
            >全选</el-button>
            <el-button
              v-else
              type="primary"
              size="mini"
              @click="setAll(item, 'no')"
            >反选</el-button>
          </div>
        </div>
        <div style="margin-left: 20px">
          <el-checkbox-group
            v-model="item.buildingIds"
            size="small"
          >
            <el-checkbox
              class="checkBox"
              v-for="(list, i) in info"
              :label="list.buildingId"
              :key="i"
              border
            >{{list.buildingName}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </template>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        :loading="finishLoading"
        @click="finish()"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import {
  post_partyAContract_getBuilding__termId,
  post_partyAContract_addPartyABuildings,
} from "@/api/project/index.ts";

@Component({
  components: {},
})
export default class PartyABuding extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  info: any = [];
  finishLoading: any = false;
  form: any = [
    {
      companyId: null,
      companyName: null,
      buildingIds: [],
    },
  ];

  @Watch("form", { immediate: true, deep: true })
  buildingWatch(val: any) {
    if (val.length) {
      val.forEach((v: any) => {
        if (v.buildingIds.length === this.info.length) {
          v.isShow = false;
        } else {
          v.isShow = true;
        }
      });
    }
  }

  cancel() {
    this.$emit("cancel", false);
  }
  async finish() {
    let pass: any = true;
    this.form.forEach((v: any) => {
      if (!v.buildingIds.length) {
        this.$message.warning("请关联栋座信息");
        pass = false;
      }
    });
    if (pass) {
      this.finishLoading = true;
      this.form = this.form.map((v: any) => ({
        companyId: v.companyId,
        companyName: v.companyName,
        buildingIds: v.buildingIds,
      }));
      let obj: any = {};
      obj.partyAInfoVOS = [...this.form];
      obj.termId = this.$route.query.id;
      try {
        await post_partyAContract_addPartyABuildings(obj);
        this.finishLoading = false;
        this.$emit("finish");
      } catch (err) {
        console.log(err);
        this.finishLoading = false;
      }
    }
  }

  setAll(data: any, type: any) {
    const index = this.form.findIndex(
      (v: any) => v.companyId === data.companyId
    );
    const arr = this.info.map((v: any) => v.buildingId);
    this.$set(this.form, index, {
      companyId: data.companyId,
      companyName: data.companyName,
      buildingIds: type === "all" ? arr : [],
    });
  }

  async getInfo() {
    this.info = await post_partyAContract_getBuilding__termId({
      termId: this.$route.query.id,
    });
  }

  async created() {
    await this.getInfo();
    this.form = [...this.data];
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  /deep/ .el-dialog {
    margin-top: 8vh !important;
  }
}
.checkBox {
  margin: 0 0 10px 10px;
}

.titleButton {
  display: flex;
  .buttons {
    margin: 5px 0 0 10px;
  }
}
</style>