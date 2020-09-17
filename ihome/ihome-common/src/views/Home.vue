<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-17 14:35:52
-->
<template>
  <div>
    <el-table
      :data="tableData"
      style="width:100%"
      height="900"
      :highlight-current-row="false"
      border
    >
      <el-table-column prop="preFileName" label="类型" width="150"></el-table-column>
      <el-table-column prop="accessory" label="附件">
        <template v-slot="{row}">
          <ih-upload :file-list="row.fileList" :size="size" :limit="3"></ih-upload>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
// import { testApi, testPostApi } from "../api/test";
import { Component, Vue } from "vue-property-decorator";
import IhUpload from "@/components/IhUpload.vue";
@Component({
  components: { IhUpload },
})
export default class Home extends Vue {
  private tableData: any = [];
  private fileList: any = [];
  private size = "100px";
  private getImage() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            fileCat: ".pdf",
            fileName: "abc.pdf",
            preFileAdress: "2c92808873be3796017490db113b0616",
            preFileCode: "leixing1",
            preFileName: "类型1",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "4444.jpg",
            preFileAdress: "2c92808873be3796017491182382061d",
            preFileCode: "leixing1",
            preFileName: "类型1",
            partCode: "partCode_first",
          },
          {
            fileCat: ".docx",
            fileName: "word.docx",
            preFileAdress: "2c92808873be3796017490dd40210617",
            preFileCode: "leixing2",
            preFileName: "类型2",
            partCode: "partCode_first",
          },
          {
            fileCat: ".xlsx",
            fileName: "excel.xlsx",
            preFileAdress: "2c92808873be3796017490def23b0618",
            preFileCode: "leixing3",
            preFileName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "1111.jpg",
            preFileAdress: "2c92808873be37960174959f90de0623",
            preFileCode: "leixing3",
            preFileName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "2222.jpg",
            preFileAdress: "2c92808873be3796017495a112fe0624",
            preFileCode: "leixing3",
            preFileName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".pptx",
            fileName: "2222.pptx",
            preFileAdress: "2c92808873be3796017490e10640061a",
            preFileCode: "leixing4",
            preFileName: "类型4",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "4444.jpg",
            preFileAdress: "2c92808873be3796017491182382061d",
            preFileCode: "leixing5",
            preFileName: "类型5",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "3333.jpg",
            preFileAdress: "2c92808873be3796017495fb3297062a",
            preFileCode: "leixing6",
            preFileName: "类型6",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "1111.jpg",
            preFileAdress: "2c92808873be3796017495fc0323062b",
            preFileCode: "leixing7",
            preFileName: "类型7",
            partCode: "partCode_first",
          },
        ]);
      }, 2000);
    });
  }

  created() {
    this.getImage().then((res: any) => {
      let arr: any = [];
      res.forEach((v: any) => {
        const item = arr.find((j: any) => j.preFileCode === v.preFileCode);
        if (!item) {
          arr.push({
            preFileName: v.preFileName,
            preFileCode: v.preFileCode,
            fileList: [
              {
                name: v.fileName,
                url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=${v.preFileAdress}`,
                img_url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=${v.preFileAdress}`,
                preFileName: v.preFileName,
              },
            ],
          });
        } else {
          item.fileList.push({
            name: v.fileName,
            url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=${v.preFileAdress}`,
            img_url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=${v.preFileAdress}`,
            preFileName: v.preFileName,
          });
        }
      });
      this.tableData = arr;
    });
  }
}
</script>
<style lang="scss" scoped>
</style>