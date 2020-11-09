<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-21 15:16:14
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-09 15:39:08
-->
<template>
  <IhPage ref="ihPage">
    <template #container>
      <el-row>
        <el-col
          :span="6"
          class="dict-list-left"
        >
          <el-row>
            <el-col
              :span="8"
              class="text-left"
            >
              <el-button
                type="success"
                @click="dictTypeVisible = true"
              >添加</el-button>
            </el-col>
            <el-col :span="16">
              <el-input
                placeholder="请输入内容"
                class="input-with-select"
              >
                <el-button
                  slot="append"
                  style="width: 50px;"
                  icon="el-icon-search"
                ></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="padding-top-10">
            <ul
              class="dict-type-list text-left"
              :style="{ 'maxHeight': pageHeight }"
            >
              <li
                v-for="(item, i) in list"
                :key="i"
              >
                <div>1111</div>
                <div class="setting">
                  <el-link type="primary">修改</el-link>
                  <el-link
                    type="danger"
                    class="margin-left-10"
                  >删除</el-link>
                </div>
              </li>
            </ul>
          </el-row>
        </el-col>
        <el-col
          :span="18"
          class="padding-left-10"
        >
          <el-row>
            <el-col
              :span="2"
              class="text-left"
            >
              <el-button
                type="success"
                @click="dictItemVisible = true"
              >添加字典项</el-button>
            </el-col>
            <el-col
              :span="22"
              class="text-right"
            >
              <el-input
                style="width:300px;"
                placeholder="编码、名称或者标签"
                class="input-with-select"
              ></el-input>
              <el-button
                class="margin-left-10"
                type="primary"
              >查询</el-button>
            </el-col>
          </el-row>
          <el-row>
            <br />
            <el-table>
              <el-table-column
                type="index"
                width="55px"
                align="center"
                label="序号"
                fixed
              ></el-table-column>
              <el-table-column label="名称"></el-table-column>
              <el-table-column label="编码"></el-table-column>
              <el-table-column label="类型"></el-table-column>
              <el-table-column label="子类型"></el-table-column>
              <el-table-column label="标签"></el-table-column>
              <el-table-column label="顺序"></el-table-column>
              <el-table-column label="状态"></el-table-column>
              <el-table-column label="修改时间"></el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                width="100"
              >
                <template>
                  <el-link
                    class="margin-right-10"
                    type="primary"
                  >修改</el-link>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      更多
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>删除</el-dropdown-item>
                      <el-dropdown-item>停用</el-dropdown-item>
                      <el-dropdown-item>启用</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-col>
      </el-row>
    </template>
    <!-- 字典类型dialog -->
    <IhDialog
      :show="dictTypeVisible"
      desc="字典类型"
    >
      <DictType
        :isAdd="isAdd"
        @cancel="() => (dictTypeVisible = false)"
      />
    </IhDialog>
    <!-- 字典项dialog -->
    <IhDialog
      :show="dictItemVisible"
      desc="字典项"
    >
      <DictItem @cancel="() => (dictItemVisible = false)" />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_dict_getAll } from "../../api/system/index";

import DictType from "./dialog/dictType.vue";
import DictItem from "./dialog/dictItem.vue";

@Component({
  components: { DictType, DictItem },
})
export default class DicList extends Vue {
  list: any = [];
  isAdd = true;
  private dictTypeVisible = false;
  private dictItemVisible = false;

  private get pageHeight() {
    let h =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      (90 + 90) +
      "px";
    return h;
  }

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
.dict-list-left {
  border-right: 1px solid #e6e6e6;
  padding-right: 10px;
  overflow: auto;
}
.dict-type-list {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: auto;
}
.dict-type-list li {
  display: flex;
  padding: 4px 6px;
  line-height: 24px;
}
.dict-type-list li:hover {
  div:nth-child(2) {
    display: flex;
  }
}
.dict-type-list li div:nth-child(2) {
  display: none;
  justify-content: flex-end;
  flex: 1;
}
</style>