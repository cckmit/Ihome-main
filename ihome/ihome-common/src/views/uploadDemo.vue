<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-21 17:14:27
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
  private fileSize = 1; // 限制上传文件大小为1M
  private getImage() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            fileCat: ".pdf",
            fileName: "abc.pdf",
            preFileAdress: 344,
            preFileCode: "leixing1",
            preFileName: "类型1",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "4444.jpg",
            preFileAdress: 345,
            preFileCode: "leixing1",
            preFileName: "类型1",
            partCode: "partCode_first",
          },
          {
            fileCat: ".docx",
            fileName: "word.docx",
            preFileAdress: 346,
            preFileCode: "leixing2",
            preFileName: "类型2",
            partCode: "partCode_first",
          },
          {
            fileCat: ".xlsx",
            fileName: "excel.xlsx",
            preFileAdress: 347,
            preFileCode: "leixing3",
            preFileName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "1111.jpg",
            preFileAdress: 348,
            preFileCode: "leixing3",
            preFileName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "2222.jpg",
            preFileAdress: 349,
            preFileCode: "leixing3",
            preFileName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".pptx",
            fileName: "2222.pptx",
            preFileAdress: 350,
            preFileCode: "leixing4",
            preFileName: "类型4",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "4444.jpg",
            preFileAdress: 351,
            preFileCode: "leixing5",
            preFileName: "类型5",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "3333.jpg",
            preFileAdress: 352,
            preFileCode: "leixing6",
            preFileName: "类型6",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "1111.jpg",
            preFileAdress: 353,
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