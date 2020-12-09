<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-24 10:49:12
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-07 17:01:53
-->
<!--
 * @Description: 数据字典列表
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-21 15:16:14
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-07 15:27:22
-->
<template>
  <IhPage ref="ihPage">
    <template #container>
      <el-row>
        <el-col :span="8" class="dict-list-left">
          <el-row type="flex" justify="space-between" class="search-box">
            <el-col :span="6" class="text-left">
              <el-button
                type="success"
                size="small"
                class="add-button"
                @click="handleAddDicType()"
                >添加</el-button
              >
            </el-col>
            <el-col :span="18">
              <el-input
                placeholder="编码、名称"
                v-model="dicTypeSearch"
                clearable
                size="small"
                @keyup.enter.native="getAllByType(dicTypeSearch)"
              >
                <el-button
                  slot="append"
                  style="width: 50px"
                  icon="el-icon-search"
                  @click="getAllByType(dicTypeSearch)"
                ></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="padding-top-10">
            <ul
              class="dict-type-list text-left"
              :style="{ maxHeight: pageHeight }"
            >
              <template v-for="(item, index) in dictTypeList">
                <li
                  :key="item.id"
                  :class="{ active: activeIndex === index }"
                  @click.stop="handleActive(index)"
                >
                  <div class="dict-type-title" :title="item.name">
                    {{ `${item.code}·${item.name}` }}
                  </div>
                  <div class="setting">
                    <el-link type="primary" @click.stop="handleCopy(item)"
                      >复制code</el-link
                    >
                    <el-link
                      type="primary"
                      class="margin-left-10"
                      @click.stop="handleEditDicType(item)"
                      >修改</el-link
                    >
                    <el-link
                      type="danger"
                      class="margin-left-10"
                      @click.stop="removeDicType(item, index)"
                      >删除</el-link
                    >
                  </div>
                </li>
              </template>
            </ul>
          </el-row>
        </el-col>
        <el-col :span="16" class="padding-left-10">
          <el-row>
            <el-col :span="4" class="text-left">
              <el-button type="success" @click="handleAddDic()"
                >添加字典项</el-button
              >
            </el-col>
            <el-col :span="20" class="text-right">
              <el-input
                class="width-250"
                placeholder="编码、名称或者标签"
                v-model="dictSearch"
                clearable
                @keyup.enter.native="searchDictBykey(dictSearch)"
              ></el-input>
              <el-button
                class="margin-left-10"
                type="primary"
                @click="searchDictBykey(dictSearch)"
                >查询</el-button
              >
            </el-col>
          </el-row>
          <el-row>
            <br />
            <el-table class="ih-table" :data="dictList" :height="pageHeight">
              <el-table-column
                type="index"
                width="55px"
                align="center"
                label="序号"
                fixed
              ></el-table-column>
              <el-table-column
                label="名称"
                prop="name"
                min-width="155"
                fixed
              ></el-table-column>
              <el-table-column
                label="编码"
                prop="code"
                min-width="135"
              ></el-table-column>
              <el-table-column
                label="类型code"
                prop="type"
                min-width="175"
              ></el-table-column>

              <el-table-column label="子类型" prop="subType"></el-table-column>
              <el-table-column label="标签" prop="tag"></el-table-column>
              <el-table-column
                label="顺序"
                prop="seq"
                width="80"
              ></el-table-column>
              <el-table-column label="状态" prop="valid" width="80">
                <template v-slot="{ row }">
                  {{ $root.dictAllName(row.valid, "ValidType") }}
                </template>
              </el-table-column>
              <el-table-column
                label="修改时间"
                prop="updateTime"
                width="155"
              ></el-table-column>
              <el-table-column label="操作" fixed="right" width="120">
                <template v-slot="{ row, $index }">
                  <el-link
                    class="margin-right-10"
                    type="primary"
                    @click="handleEditDic(row)"
                    >修改</el-link
                  >
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      更多
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        @click.native.prevent="removeDict(row, $index)"
                        >删除</el-dropdown-item
                      >
                      <el-dropdown-item
                        @click.native.prevent="switchDict(row, false)"
                        >停用</el-dropdown-item
                      >
                      <el-dropdown-item
                        @click.native.prevent="switchDict(row, true)"
                        >启用</el-dropdown-item
                      >
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
    <IhDialog :show="dictTypeVisible" desc="字典类型">
      <DictType
        :isAdd="isAdd"
        :data="itemData"
        @cancel="() => (dictTypeVisible = false)"
        @finish="
          () => {
            dictTypeVisible = false;
            getAllByType();
          }
        "
      />
    </IhDialog>
    <!-- 字典项dialog -->
    <IhDialog :show="dictItemVisible" desc="字典项">
      <DictItem
        :isAdd="isAdd"
        :data="itemData"
        :select="selectDicType"
        @cancel="() => (dictItemVisible = false)"
        @finish="
          () => {
            dictItemVisible = false;
            getDictAll();
          }
        "
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  post_dict_getAllDictType,
  post_dict_deleteDictType__id,
  post_dict_close__id,
  post_dict_open__id,
  post_dict_delete__id,
  post_dict_getAllDictItemByType,
} from "../../api/system/index";

import DictType from "./dialog/dictType.vue";
import DictItem from "./dialog/dictItem.vue";

@Component({
  components: { DictType, DictItem },
})
export default class DicList extends Vue {
  list: any = [];
  isAdd = true;
  itemData: any = {};
  private activeIndex: any = null;
  private dictTypeVisible = false;
  private dictItemVisible = false;
  private dictTypeList: any = [];
  private selectDicType: any = [];
  private dicTypeSearch: any = null;
  private dictList: any = [];
  private dictSearch: any = null;

  @Watch("dicTypeSearch")
  dicTypeSearchWatch(val: any) {
    if (!val.length) this.getAllByType(val);
  }
  @Watch("dictSearch")
  dictSearchWatch(val: any) {
    if (!val.length) this.searchDictBykey();
  }

  private get pageHeight() {
    let h =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      (90 + 90) +
      "px";
    return h;
  }

  /**
   * @description: 查询指定字典类型的所有字典项
   * @param {any} key
   */
  private async searchDictBykey(): Promise<void> {
    this.getDictAll();
  }
  /**
   * @description: 删除字典项
   * @param {any} row
   * @param {number} index
   */
  private removeDict(row: any, index: number): void {
    this.$confirm("是否确定删除该字典项?", "提示")
      .then(async () => {
        await post_dict_delete__id({ id: row.id });
        this.dictList.splice(index, 1);
        this.$message.success("删除成功");
      })
      .catch(() => console.log("取消"));
  }
  /**
   * @description: 启用、停用字典项
   * @param {any} row
   * @param {boolean} type
   */
  private switchDict(row: any, type: boolean): void {
    this.$confirm(`是否确定${type ? "启用" : "停用"}该字典项?`, "提示")
      .then(async () => {
        type
          ? await post_dict_open__id({ id: row.id })
          : await post_dict_close__id({ id: row.id });
        this.getDictAll();
        this.$message.success(`${type ? "启用" : "停用"}成功`);
      })
      .catch(async () => console.log("取消"));
  }
  /**
   * @description: 编辑字典项弹窗
   * @param {any} row
   */
  private handleEditDic(row: any): void {
    this.isAdd = false;
    this.itemData = row;
    this.dictItemVisible = true;
  }
  /**
   * @description: 新增字典项弹窗
   */
  private handleAddDic(): void {
    if (this.activeIndex !== null) {
      this.itemData.type = this.dictTypeList[this.activeIndex].code;
    }

    this.isAdd = true;
    this.dictItemVisible = true;
  }
  /**
   * @description: 删除字典类型
   * @param {any} item
   * @param {number} index 当前下标
   */
  private removeDicType(item: any, index: number): void {
    this.$confirm("是否确定删除该字典类型?", "提示")
      .then(async () => {
        await post_dict_deleteDictType__id({ id: item.id });
        this.dictTypeList.splice(index, 1);
        this.$message.success("删除成功");
      })
      .catch(async () => console.log("取消"));
  }
  /**
   * @description: 查询指定类型的所有字典项
   * @param {number} index
   */
  private handleActive(index: number): void {
    this.activeIndex = index;
    this.getDictAll();
  }
  /**
   * @description: 新增字典类型弹窗
   */
  private handleAddDicType(): void {
    this.isAdd = true;
    this.dictTypeVisible = true;
  }
  /**
   * @description: 编辑字典类型弹窗
   * @param {any} item
   */
  private handleEditDicType(item: any): void {
    this.isAdd = false;
    this.itemData = item;
    this.dictTypeVisible = true;
  }
  /**
   * @description: 获取字典类型
   * @param {any} key
   */
  private async getAllByType(key?: any): Promise<void> {
    this.activeIndex = null;
    let res = await post_dict_getAllDictType({ key: key });
    if (key) {
      this.dictTypeList = res;
    } else {
      this.dictTypeList = res;
      this.selectDicType = res;
    }
  }
  /**
   * @description: 获取当前选中的字典类型对应的所有字典项
   */
  private async getDictAll(): Promise<void> {
    let dictType = null;
    if (this.activeIndex !== null) {
      dictType = this.dictTypeList[this.activeIndex].code;
    }

    this.dictList = await post_dict_getAllDictItemByType({
      type: dictType,
      key: this.dictSearch,
      valid: null,
    });
  }
  /**
   * @description: 复制code
   * @param {any} item
   */
  private handleCopy(item: any) {
    this.$tool.coptText(item.code, () => {
      this.$message.success(`[${item.code}]复制成功`);
    });
  }

  async created() {
    await this.getAllByType();
    this.getDictAll();
  }
}
</script>

<style lang="scss" scoped>
$active: #ef9d39;
.dict-list-left {
  border-right: 1px solid #e6e6e6;
  padding-right: 10px;
  padding-bottom: 10px;
  overflow: auto;
  .search-box {
    align-items: center;
  }
}
.dict-type-list {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: auto;
  font-size: 14px;
  li {
    display: flex;
    position: relative;
    padding: 4px 6px;
    line-height: 24px;
    cursor: pointer;
    &.active {
      background-color: rgba($color: $active, $alpha: 0.2);
      // .setting {
      //   background-color: rgba($color: $active, $alpha: 0.6);
      // }
    }
    .setting {
      position: absolute;
      padding: 0 4px;
      background-color: #fff;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .dict-type-title {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
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