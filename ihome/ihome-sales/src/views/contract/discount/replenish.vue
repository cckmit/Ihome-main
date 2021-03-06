<!--
 * @Description: 优惠告知书补充
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-03 09:07:09
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-06 17:35:49
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <el-form
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="告知书补充场景">
              <el-select
                v-model="type"
                placeholder="请选择告知书补充场景"
                @change="handleChange"
                class="width--100"
              >
                <el-option
                  v-for="(i, n) in option"
                  :key="n"
                  :value="i.value"
                  :label="i.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider />
      <component
        :is="currView"
        :data="info"
        @finish="submit"
      ></component>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SceneOne from "./tabs/scene-one.vue";
import SceneTwo from "./tabs/scene-two.vue";
import SceneThree from "./tabs/scene-three.vue";
import SceneFour from "./tabs/scene-four.vue";
import SceneFive from "./tabs/scene-five.vue";
import {
  get_notice_detail__id,
  post_notice_supplemental_agreement,
} from "@/api/contract/index";

@Component({
  components: { SceneOne, SceneTwo, SceneThree, SceneFour, SceneFive },
})
export default class Replenish extends Vue {
  private type: any = null;
  private currView: any = "";
  private option: any = [
    { view: "SceneOne", label: "换房不涉及优惠折扣变更", value: "One" },
    { view: "SceneTwo", label: "服务费部分减免", value: "Two" },
    { view: "SceneThree", label: "服务费全部减免", value: "Three" },
    { view: "SceneFour", label: "服务费增加", value: "Four" },
    {
      view: "SceneFour",
      label: "服务费金额不变, 优惠方式变更",
      value: "Fives",
    },
    { view: "SceneFour", label: "购房客户更名", value: "Six" },
    { view: "SceneFour", label: "告知书信息填写错误", value: "Seven" },
    { view: "SceneThree", label: "退房退款", value: "Eight" },
    { view: "SceneFive", label: "退房不退款", value: "Nine" },
  ];
  private info: any = {};

  private async submit(data: any) {
    console.log(data);
    let list = data.map((i: any) => ({
      ...i,
      noticeId: this.$route.query.id,
    }));
    try {
      await post_notice_supplemental_agreement({
        noticeListCreateRequestList: list,
        supplementaryScene: this.type,
      });
      this.$message.success("发起补充协议成功");
      this.$goto({
        path: "/discount/list",
      });
    } catch (error) {
      console.log(error);
    }
  }
  private handleChange(val: any): void {
    if (val !== "") {
      let data = this.option.find((i: any) => i.value === val);
      this.currView = data.view;
    }
  }
  private async getInfo(): Promise<void> {
    let id = this.$route.query.id;
    if (id) {
      try {
        this.info = await get_notice_detail__id({ id: id });
      } catch (error) {
        console.log(error);
      }
    }
  }

  created() {
    this.getInfo();
    console.log((this.$root as any).dictAllList("SupplementaryScene"));
    // this.option = (this.$root as any).dictAllList("SupplementaryScene").map((i: any, n: number) => {
    //   if (i.code )
    // })
  }
}
</script>
