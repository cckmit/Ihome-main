<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-26 18:06:46
-->
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="900"
      :highlight-current-row="false"
      border
    >
      <el-table-column
        prop="preFileName"
        label="类型"
        width="150"
      ></el-table-column>
      <el-table-column prop="accessory" label="附件">
        <template v-slot="{ row }">
          <IhUpload
            :isCrop="isCrop"
            :file-list="row.fileList"
            :size="size"
            :limit="limit"
            :file-size="fileSize"
          ></IhUpload>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
// import { testApi, testPostApi } from "../api/test";
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class UploadDemo extends Vue {
  private tableData: any = [];
  private fileList: any = [];
  private isCrop = true; // 上传前是否开启图片裁剪(只针对于图片上传)
  private size = "100px"; // 上传框的长宽为100px
  private limit = 3; // 上传文件的个数
  private fileSize = 10; // 限制上传文件大小为1M
  private getImage() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            fileCat: ".pdf",
            fileName: "abc.pdf",
            preFileAdress: 495,
            preFileCode: "leixing1",
            preFileName: "类型1",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "4444.jpg",
            preFileAdress: 496,
            preFileCode: "leixing1",
            preFileName: "类型1",
            partCode: "partCode_first",
          },
          {
            fileCat: ".docx",
            fileName: "word.docx",
            preFileAdress: 497,
            preFileCode: "leixing2",
            preFileName: "类型2",
            partCode: "partCode_first",
          },
          {
            fileCat: ".xlsx",
            fileName: "excel.xlsx",
            preFileAdress: 498,
            preFileCode: "leixing3",
            preFileName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "1111.jpg",
            preFileAdress: 499,
            preFileCode: "leixing3",
            preFileName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "2222.jpg",
            preFileAdress: 500,
            preFileCode: "leixing3",
            preFileName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".pptx",
            fileName: "2222.pptx",
            preFileAdress: 501,
            preFileCode: "leixing4",
            preFileName: "类型4",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "4444.jpg",
            preFileAdress: 502,
            preFileCode: "leixing5",
            preFileName: "类型5",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "3333.jpg",
            preFileAdress: 503,
            preFileCode: "leixing6",
            preFileName: "类型6",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "1111.jpg",
            preFileAdress: 504,
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
                preFileName: v.preFileName,
                fileId: v.preFileAdress,
              },
            ],
          });
        } else {
          item.fileList.push({
            name: v.fileName,
            preFileName: v.preFileName,
            fileId: v.preFileAdress,
          });
        }
      });
      this.tableData = [...arr];
    });
  }
}
</script>
<style lang="scss" scoped>
</style>