<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-23 15:24:35
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
        prop="fileTypeName"
        label="类型"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="accessory"
        label="附件"
      >
        <template v-slot="{ row }">
          <IhUpload
            :isCrop="isCrop"
            v-model="row.fileList"
            :size="size"
            :limit="limit"
            :file-type="row.fileType"
            :file-size="fileSize"
            isMove
            :multiple="multiple"
            @newFileList="queryNew"
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
  private isCrop = false; // 上传前是否开启图片裁剪(只针对于图片上传)
  private size = "100px"; // 上传框的长宽为100px
  private limit = 5; // 上传文件的个数
  private fileSize = 10; // 限制上传文件大小为10M
  private isMove = true; // 是否开启左右切换功能
  private multiple = true; // 是否开启多上传功能(与图片裁剪互斥)
  private getImage() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            fileCat: ".pdf",
            fileName: "abc.pdf",
            fileId: "5fa40529282f22000106af99",
            fileType: "leixing1",
            fileTypeName: "类型1",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "4444.jpg",
            fileId: "5fa40580282f22000106af9f",
            fileType: "leixing1",
            fileTypeName: "类型1",
            partCode: "partCode_first",
          },
          {
            fileCat: ".docx",
            fileName: "word.docx",
            fileId: "60500845f5956b000618edd9",
            fileType: "leixing2",
            fileTypeName: "类型2",
            partCode: "partCode_first",
          },
          {
            fileCat: ".xlsx",
            fileName: "excel.xlsx",
            fileId: "5fa405a2282f22000106afa1",
            fileType: "leixing3",
            fileTypeName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "1111.jpg",
            fileId: "5faa567a282f22000106b005",
            fileType: "leixing3",
            fileTypeName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "2222.jpg",
            fileId: "5faa5628282f22000106b003",
            fileType: "leixing3",
            fileTypeName: "类型3",
            partCode: "partCode_first",
          },
          {
            fileCat: ".pptx",
            fileName: "2222.pptx",
            fileId: "5fa405b3282f22000106afa3",
            fileType: "leixing4",
            fileTypeName: "类型4",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "4444.jpg",
            fileId: "5fa405c5282f22000106afa5",
            fileType: "leixing5",
            fileTypeName: "类型5",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "3333.jpg",
            fileId: "5fa405de282f22000106afa7",
            fileType: "leixing6",
            fileTypeName: "类型6",
            partCode: "partCode_first",
          },
          {
            fileCat: ".jpg",
            fileName: "1111.jpg",
            fileId: "5fa41029282f22000106afaf",
            fileType: "leixing7",
            fileTypeName: "类型7",
            partCode: "partCode_first",
          },
        ]);
      }, 1000);
    });
  }

  created() {
    this.getImage().then((res: any) => {
      let arr: any = [];
      res.forEach((v: any) => {
        const item = arr.find((j: any) => j.fileType === v.fileType);
        if (!item) {
          arr.push({
            fileType: v.fileType,
            fileTypeName: v.fileTypeName,
            fileList: [
              {
                fileName: v.fileName,
                fileType: v.fileType,
                fileId: v.fileId,
              },
            ],
          });
        } else {
          item.fileList.push({
            fileName: v.fileName,
            fileType: v.fileType,
            fileId: v.fileId,
          });
        }
      });
      this.tableData = [...arr];
      console.log(arr);
    });
  }
  queryNew(val: any, type: any) {
    console.log(val, type);
  }
}
</script>
<style lang="scss" scoped>
</style>