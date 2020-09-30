<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-09 16:17:16
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-30 15:19:07
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
    >
      <template #file="{ file }">
        <img
          class="avatar"
          :style="{ width: size, height: size }"
          :src="uploadType(file)"
        />
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
    <ih-image-viewer
      v-if="visible"
      ref="image"
      :url-list="srcList"
      :on-switch="switchHandler"
      :on-close="closeViewer"
      :viewer-msg="viewerArr"
      :viewer-index="viewerIndex"
    ></ih-image-viewer>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import IhImageViewer from "./IhImageViewer.vue";
// import request from "@/ihome-package/util/api/http";
import request from "../../../../util/api/http";
@Component({
  components: {
    IhImageViewer,
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
  @Prop() private params!: any;
  @Prop({
    default:
      "http://filesvr.polyihome.test/aist-filesvr-web/webUploader/uploadAll",
  })
  uploadUrl!: string;
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

  private list: any[] = [];
  private srcList: any[] = [];
  private visible: any = false;
  private viewerArr: any[] = [];
  private previewPermi = true;
  private loadPermi = true;
  private removePermi = true;
  private uploadId!: any;
  private viewerIndex!: number;

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
        this.replaceUpload(v, fileList, index);
      });
    }
  }
  created() {
    this.srcList = [];
  }
  httpRequest(req: any) {
    const fd = new FormData();
    fd.append("file", req.file);
    for (let i in this.params) {
      fd.append(i, this.params[i]);
    }
    request
      .post(this.uploadUrl, fd)
      .then((res: any) => {
        this.uploadId = res.files[0].id;
        this.successHandler(res);
      })
      .catch((err: any) => {
        this.errorHandler(err);
      });
  }
  successHandler(res: any) {
    this.$message.success("上传成功");
    console.log(res);
  }
  errorHandler(res: any) {
    this.$message.error("上传失败");
    console.log(res);
  }
  onChangeHandler(file: any, fileList: any) {
    this.replaceUpload(file, fileList, fileList.length - 1);
  }
  beforeUpload(file: any) {
    return new Promise((resolve, reject) => {
      const size = file.size / 1024 / 1024 < 10;
      if (!size) {
        this.$alert("文件大小不能超过 10MB!", {
          type: "error",
        });
        reject("图片容量过大!");
        return;
      } else {
        resolve();
      }
    });
  }
  uploadType(file: any) {
    const type = file.name.match(/(?<=\.).+/).toString();
    switch (type) {
      case "gif":
      case "jpg":
      case "png":
      case "jpeg":
        return file.url;
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
      preFileName: this.list[0].preFileName,
    }));
    this.viewerIndex = index;
    this.srcList = viewerArr.map((v: any) => v.img_url);
    this.visible = true;
  }
  // 图片下载按钮
  handleDownload(file: any) {
    request
      .get(file.url, {
        responseType: "blob",
      })
      .then((res: any) => {
        if (res) {
          const blob = new Blob([file.url]);
          const href = window.URL.createObjectURL(blob);
          const $a = document.createElement("a");
          $a.href = href;
          $a.download = file.name;
          $a.click();
          $a.remove();
        }
      });
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
  replaceUpload(file: any, fileList: any, index: number) {
    const type = file.name.match(/(?<=\.).+/).toString();
    switch (type) {
      case "gif":
      case "jpg":
      case "png":
        fileList[index].img_url = file.url;
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