<!--
 * @Description: 附件信息
 * @version:
 * @Author: lsj
 * @Date: 2021-05-18 11:20:11
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-18 14:36:22
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>附件信息</span>
        <!--        <span>-->
        <!--          <el-button style="float: right; padding: 3px 0" type="text"-->
        <!--            >查看来访/成交信息</el-button>-->
        <!--        </span>-->
      </div>
      <div>
        <el-row>
          <el-col>
            <el-table class="ih-table" :data="documentList">
              <el-table-column prop="fileType" label="类型" width="200">
                <template slot-scope="scope">
                  <div>
                    {{ $root.dictAllName(scope.row.code, "DealFileType") }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="fileName" label="附件" min-width="300">
                <template slot-scope="scope">
                  <IhUpload
                    :removePermi="false"
                    size="100px"
                    :editPermi="false"
                    :limit="scope.row.fileList.length"
                    v-model="scope.row.fileList"
                    :file-type="scope.row.code"
                    :upload-show="!!scope.row.fileList.length"
                  ></IhUpload>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br />
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class DocumentInfo extends Vue {
    @Prop() infoForm?: any;

    get documentList() {
      let fileList: any = (this as any).$root.dictAllList('DealFileType'); // 附件类型
      if (fileList.length > 0) {
        fileList.forEach((vo: any) => {
          this.$set(vo, 'fileList', []);
          if(this.infoForm && this.infoForm.documentList && this.infoForm.documentList.length) {
            this.infoForm.documentList.forEach((item: any) => {
              if (vo.code === item.fileType) {
                vo.fileList.push(
                  {
                    ...item,
                    name: item.fileName,
                    exAuto: true // 是否可以删除
                  }
                );
              }
            });
          }
        });
      }
      return fileList;
    }

    async created() {
      console.log('DocumentInfo');
    }
  }
</script>
<style lang="scss" scoped>
</style>
