<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-21 15:16:14
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-21 15:37:40
-->
<template>
  <div>
    <el-collapse class="margin-20">
      <el-collapse-item
        class="margin-20"
        name="1"
        v-for="(item, index) in list"
        :key="index"
      >
        <template slot="title">
          <span class="padding-left-20">
            {{ item.key }}
          </span>
        </template>
        <ul>
          <li
            v-for="(item2, index2) in item.data"
            :key="index2"
            class="text-left margin-left-20"
          >
            <span>{{ item2.code }}</span>
            <span class="text-left padding-left-20">{{ item2.name }}</span>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_dict_getAll } from "../../api/system/index";
@Component({
  components: {},
})
export default class DicList extends Vue {
  list: any = [];
  async created() {
    const res: any = await get_dict_getAll();
    Object.keys(res).forEach((key: any) => {
      const item = res[key];
      let obj: any = {
        key: key,
        data: item,
      };
      this.list.push(obj || []);
    });
  }
}
</script>
<style lang="scss" scoped>
</style>