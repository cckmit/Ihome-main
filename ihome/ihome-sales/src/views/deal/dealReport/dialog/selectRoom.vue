<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-01 09:05:15
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-01 10:02:25
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择房号列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="finish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-form ref="form" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="栋座">
            <el-input
              v-model="queryPageParameters.city"
              placeholder="栋座"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">
            <el-input
              v-model="queryPageParameters.city"
              placeholder="房号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户型">
            <el-select
              v-model="queryPageParameters.room"
              clearable
              placeholder="户型"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('BusinessModel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="朝向">
            <el-select
              v-model="queryPageParameters.room"
              clearable
              placeholder="朝向"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('BusinessModel')"
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
          <el-form-item label="">
            <el-button type="primary" @click="getListMixin()">查询</el-button>
            <el-button type="info" @click="reset()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      class="ih-table"
      :data="resPageInfo.list"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="storageNum" label="栋座" min-width="180"></el-table-column>
      <el-table-column prop="channelName" label="房号" min-width="180"></el-table-column>
      <el-table-column prop="province" label="户型" min-width="180"></el-table-column>
      <el-table-column prop="city" label="房型" min-width="180"></el-table-column>
      <el-table-column prop="cityGrade" label="面积" min-width="180"></el-table-column>
      <el-table-column prop="cityGrade" label="朝向" min-width="180"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import {post_channelGrade_getList} from "@/api/channel";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class SelectRoom extends Vue {
    constructor() {
      super();
    }

    @Prop({default: null}) data: any;
    dialogVisible = true;
    resPageInfo: any = {
      total: null,
      list: [],
    };

    queryPageParameters: any = {
      channelGrade: null,
      channelId: null,
      city: null,
      room: null,
      cityGrade: null,
      departmentOrgId: null,
      inputUser: null,
      province: null,
      special: null,
      status: null,
      storageNum: null,
    };

    async finish() {
      this.$emit("finish", true);
    }

    created() {
      // this.getListMixin();
    }

    handleSelectionChange(val: any) {
      console.log(val);
      // this.selectList = val;
    }

    async getListMixin() {
      this.resPageInfo = await post_channelGrade_getList(this.queryPageParameters);
    }
  }
</script>
<style lang="scss" scoped>
  .content-wrapper {
    width: 100%;
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;

    .content-tree-wrapper {
      /*width: 40%;*/
      width: 280px;
      max-height: 500px;
      overflow: auto;
      box-sizing: border-box;
      margin-right: 10px;
    }

    .content-transfer-wrapper {
      /*width: 60%;*/
      flex: 1;
      max-height: 500px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>