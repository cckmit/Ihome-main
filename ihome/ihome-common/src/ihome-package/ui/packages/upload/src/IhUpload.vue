<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-09 16:17:16
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-26 17:57:54
-->
<template>
  <div class="upload">
    <el-upload
      class="avatar-uploader"
      ref="upload"
      list-type="picture-card"
      :file-list="fileList"
      action="#"
      :accept="accept"
      :on-success="successHandler"
      :on-error="errorHandler"
      :on-change="onChangeHandler"
      :on-exceed="onExceedHandler"
      :http-request="httpRequest"
      :before-upload="beforeUpload"
      :multiple="multiple"
      :limit="limit"
      :auto-upload="false"
    >
      <template #file="{ file }">
        <img
          class="avatar"
          :style="{ width: size, height: size }"
          :src="uploadType(file)"
        />
        <slot name="extend" :data="file" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            v-if="previewPermi"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" title="预览"></i>
          </span>
          <span
            class="el-upload-list__item-delete"
            v-if="loadPermi"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" title="下载"></i>
          </span>
          <span
            class="el-upload-list__item-delete"
            v-if="removePermi"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" title="删除"></i>
          </span>
        </span>
      </template>
      <i
        class="el-icon-plus avatar-uploader-icon"
        :style="{ width: size, height: size, 'line-height': size }"
      ></i>
    </el-upload>
    <image-viewer
      v-if="visible"
      ref="image"
      :url-list="srcList"
      :on-switch="switchHandler"
      :on-close="closeViewer"
      :viewer-msg="viewerArr"
      :viewer-index="viewerIndex"
    ></image-viewer>
    <ih-dialog :show="dialogVisible" desc="联系人信息">
      <Cropper
        ref="cropper"
        :img="cropperImg"
        :cropper-name="cropperName"
        @cancel="cropperCancel()"
        @finish="(data) => cropperFinish(data)"
      ></Cropper>
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ImageViewer from "./image-viewer.vue";
import Cropper from "./cropper.vue";
import { post_file_upload } from "@/api/sales-document-cover/index";
@Component({
  components: {
    ImageViewer,
    Cropper,
  },
})
export default class IhUpload extends Vue {
  @Prop() private action: any;
  @Prop() private fileList!: Array<object>;
  @Prop({
    type: Number,
    default: 5,
  })
  limit!: number;
  @Prop({
    type: Boolean,
    default: true,
  })
  multiple!: boolean;
  @Prop({
    type: String,
    default: "",
  })
  accept!: string;
  @Prop({
    type: String,
    default: "150px",
  })
  size!: string;
  @Prop({
    type: Number,
    default: 10,
  })
  fileSize!: number;
  @Prop({
    type: Boolean,
    default: false,
  })
  isCrop!: boolean;

  private list: any[] = [];
  private srcList: any[] = [];
  private visible: any = false;
  private viewerArr: any[] = [];
  private previewPermi = true;
  private loadPermi = true;
  private removePermi = true;
  private uploadId!: any;
  private viewerIndex!: number;
  private dialogVisible = false;
  private fileUpload: any;
  private cropperName = "";
  private cropperImg = "";
  private changeFileList: any = [];

  @Watch("list", { deep: true })
  getList(list: any) {
    const push = (this.$refs.upload as any).$children[
      (this.$refs.upload as any).$children.length - 1
    ].$el;
    if (list.length < this.limit) {
      push.style.display = "inline-block";
    } else {
      push.style.display = "none";
    }
  }
  @Watch("fileList", { immediate: true, deep: true })
  getFileList(fileList: any) {
    if (fileList.length) {
      fileList.forEach((v: any, index: number) => {
        v.url = `/sales-api/sales-document-cover/file/browse/${v.fileId}`;
        v.img_url = `/sales-api/sales-document-cover/file/browse/${v.fileId}`;
        this.replaceUpload(v, fileList, index, v.fileId);
      });
    }
  }
  created() {
    this.srcList = [];
  }
  // 自定义请求
  async httpRequest(req: any) {
    const fd = new FormData();
    if (this.fileUpload) {
      fd.append("files", this.fileUpload);
    } else {
      fd.append("files", req.file);
    }
    return await post_file_upload(fd);
  }
  successHandler(response: any, file: any, fileList: any) {
    this.replaceUpload(file, fileList, fileList.length - 1, response[0].fileId);
    this.$message.success("上传成功");
  }
  errorHandler() {
    this.$message.error("上传失败");
  }
  onChangeHandler(file: any, fileList: any) {
    this.changeFileList = fileList;
    if (this.isCrop && file.status === "ready") {
      const type = file.name.match(/(?<=\.).+/).toString();
      switch (type) {
        case "gif":
        case "jpg":
        case "png":
        case "jpeg":
          this.cropperName = file.name;
          this.$nextTick(() => {
            this.cropperImg = file.url;
            this.dialogVisible = true;
          });
          break;
        default:
          (this.$refs.upload as any).submit();
          break;
      }
    } else {
      (this.$refs.upload as any).submit();
    }
  }
  beforeUpload(file: any) {
    return new Promise((resolve, reject) => {
      const size = file.size / 1024 / 1024 < this.fileSize;
      if (!size) {
        this.$message({
          message: `文件大小不能超过 ${this.fileSize}MB`,
          type: "error",
        });
        reject("文件容量过大!");
        return;
      } else {
        resolve();
      }
    });
  }
  // 显示列表的图片URL
  uploadType(file: any) {
    const type = file.name.match(/(?<=\.).+/).toString();
    switch (type) {
      case "gif":
      case "jpg":
      case "png":
      case "jpeg":
        return file.img_url;
      case "doc":
      case "docx":
      case "docm":
        return require("../../../img/word.jpg");
      case "xls":
      case "xlsx":
        return require("../../../img/excel.png");
      case "pdf":
        return require("../../../img/pdf.jpg");
      case "ppt":
      case "potx":
      case "pptx":
        return require("../../../img/ppt.png");
    }
  }
  // 移除图片
  async handleRemove(file: any) {
    await (this.$refs.upload as any).handleRemove(file);
    let index = this.list.findIndex((v) => v.uid === file.uid);
    this.$delete(this.list, index);
  }
  // 点击图片预览按钮
  handlePictureCardPreview(file: any) {
    const viewerArr = [...this.list];
    const index = viewerArr.findIndex((v: any) => v.uid === file.uid);
    if (index > 0) {
      const delArr = viewerArr.splice(index, viewerArr.length - 1);
      viewerArr.unshift(...delArr);
    }
    this.viewerArr = viewerArr.map((v: any) => ({
      ...v,
      preFileName: this.list[0]?.preFileName,
    }));
    this.viewerIndex = index;
    this.srcList = viewerArr.map((v: any) => v.img_url);
    this.visible = true;
  }
  // 图片下载按钮
  handleDownload(file: any) {
    window.open(file.img_url);
  }
  // 切换预览图触发
  switchHandler(index: number) {
    console.log(index);
  }
  // 关闭预览图触发
  closeViewer() {
    this.visible = false;
  }
  onExceedHandler() {
    this.$message.error("已超出文件上传数量限制,请重新选择!");
  }
  // 上传不同类型图片替换方法
  replaceUpload(file: any, fileList: any, index: number, fileId: number) {
    const type = file.name.match(/(?<=\.).+/).toString();
    switch (type) {
      case "gif":
      case "jpg":
      case "png":
        fileList[
          index
        ].img_url = `/sales-api/sales-document-cover/file/browse/${fileId}`;
        break;
      case "doc":
      case "docx":
      case "docm":
        fileList[index].img_url = require("../../../img/word.jpg");
        break;
      case "xls":
      case "xlsx":
        fileList[index].img_url = require("../../../img/excel.png");
        break;
      case "pdf":
        fileList[index].img_url = require("../../../img/pdf.jpg");
        break;
      case "ppt":
      case "potx":
      case "pptx":
        fileList[index].img_url = require("../../../img/ppt.png");
        break;
    }
    this.list = [...fileList];
  }
  cropperFinish(data: any) {
    this.dialogVisible = false;
    this.fileUpload = data;
    this.cropperImg = "";
    (this.$refs.upload as any).submit();
  }
  cropperCancel() {
    this.dialogVisible = false;
    this.changeFileList.pop();
    this.list = this.changeFileList;
  }
}
</script>
<style lang="scss" scoped>
.upload {
  display: flex;
  justify-content: flex-start;
}
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
}
.avatar {
  vertical-align: middle;
  min-width: 100px;
  min-height: 100px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
  vertical-align: middle;
}
</style>
<style lang="scss">
.avatar-uploader {
  .el-upload-list__item {
    &.is-ready,
    &.is-success {
      width: auto;
      height: auto;
      min-width: 100px;
      min-height: 100px;
    }
  }
  .el-upload--picture-card {
    width: auto;
    height: auto;
    line-height: 100px;
    min-width: 100px;
    min-height: 100px;
  }
}
</style>