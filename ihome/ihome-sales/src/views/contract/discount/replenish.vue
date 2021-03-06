<!--
 * @Description: 优惠告知书补充
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-03 09:07:09
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-06 11:34:26
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
                clearable
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
    { view: "SceneOne", label: "换房不涉及优惠折扣变更", value: 0 },
    { view: "SceneTwo", label: "服务费部分减免", value: 1 },
    { view: "SceneThree", label: "服务费全部减免", value: 2 },
    { view: "SceneFour", label: "服务费增加", value: 3 },
    { view: "SceneFour", label: "服务费金额不变, 优惠方式变更", value: 4 },
    { view: "SceneFour", label: "购房客户更名", value: 5 },
    { view: "SceneFour", label: "告知书信息填写错误", value: 6 },
    { view: "SceneThree", label: "退房退款", value: 7 },
    { view: "SceneFive", label: "退房不退款", value: 8 },
  ];
  private info: any = {};

  private async submit(data: any) {
    console.log(data);
    let list = data.map((i: any) => ({
      ...i,
      noticeId: this.$route.query.id,
    }));
    try {
      await post_notice_supplemental_agreement(list);
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
      this.currView = this.option[val].view;
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
  }
}
</script>
