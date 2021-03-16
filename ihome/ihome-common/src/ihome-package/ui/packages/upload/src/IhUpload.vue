<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-09 16:17:16
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-16 10:08:37
-->
<template>
  <div class="upload">
    <el-upload
      v-if="uploadShow"
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
        <template v-if="!uploadLoadingHander(file)">
          <img
            class="avatar"
            :style="{ width: size, height: size }"
            :src="uploadType(file)"
          />
          <slot
            name="extend"
            :data="file"
          />
          <el-tooltip
            class="item"
            effect="light"
            :content="file.name"
            placement="top"
          >
            <span
              class="el-upload-list__item-actions uploadbutton"
              :style="{
            width: size,
            height: Object.keys($scopedSlots).length ? size : '',
          }"
            >
              <div class="operation">
                <span
                  v-if="previewPermi"
                  @click="handlePictureCardPreview(file)"
                >
                  <i
                    class="el-icon-zoom-in"
                    title="预览"
                  ></i>
                </span>
                <span
                  v-if="loadPermi"
                  @click="handleDownload(file)"
                >
                  <i
                    class="el-icon-download"
                    title="下载"
                  ></i>
                </span>
                <span
                  v-if="removePermi && !file.exAuto"
                  @click="handleRemove(file)"
                >
                  <i
                    class="el-icon-delete"
                    title="删除"
                  ></i>
                </span>
                <span
                  class="editButton"
                  v-if="editPermi && !file.exAuto"
                  @click="handleEdit(file)"
                >
                  <i
                    class="el-icon-edit-outline"
                    title="编辑"
                  ></i>
                </span>
              </div>
              <div
                class="move"
                v-if="isMove"
              >
                <span @click="leftShift(file)">
                  <i
                    class="el-icon-back"
                    title="左移"
                  ></i>
                </span>
                <span @click="rightShift(file)">
                  <i
                    class="el-icon-right"
                    title="右移"
                  ></i>
                </span>
              </div>
            </span>
          </el-tooltip>
        </template>
        <div
          v-else
          class="uploadLoading"
          v-loading="file.uploadLoading"
          element-loading-text="附件上传中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
        </div>
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
    <ih-dialog :show="dialogVisible">
      <Cropper
        ref="cropper"
        :img="cropperImg"
        :cropper-name="cropperName"
        @cancel="cancel"
        @finish="(data) => cropperFinish(data)"
      ></Cropper>
    </ih-dialog>
    <input
      v-show="false"
      ref="editUpload"
      type="file"
      @change="editUploadChange"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ImageViewer from "./image-viewer.vue";
import Cropper from "./cropper.vue";
import {
  post_file_upload,
  get_file_remove__fid,
} from "@/api/sales-document-cover/index";
@Component({
  components: {
    ImageViewer,
    Cropper,
  },
})
export default class IhUpload extends Vue {
  @Prop() private fileList!: Array<object>;
  @Prop({
    type: Number,
    default: 999,
  })
  limit!: number;
  @Prop({
    type: Boolean,
    default: true,
  })
  multiple?: boolean;
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
  isCrop?: boolean;
  @Prop({
    type: Boolean,
    default: true,
  })
  previewPermi?: boolean;
  @Prop({
    type: Boolean,
    default: true,
  })
  loadPermi?: boolean;
  @Prop({
    type: Boolean,
    default: true,
  })
  removePermi?: boolean;
  @Prop({
    type: Boolean,
    default: true,
  })
  editPermi?: boolean;
  @Prop({
    type: Boolean,
    default: false,
  })
  isMove?: boolean;
  @Prop({
    type: Boolean,
    default: false,
  })
  delFileServer?: boolean;
  @Prop({
    type: String,
    default: null,
  })
  fileType?: string;
  @Prop({
    type: Boolean,
    default: true,
  })
  uploadShow?: boolean;
  @Prop({
    type: String,
    default: "",
  })
  uploadAccept!: string;
  @Prop({
    type: Function,
  })
  clickDownloadMsg?: any;
  @Prop({
    type: Function,
  })
  clickViewMsg?: any;

  private list: any[] = [];
  private srcList: any[] = [];
  private visible: any = false;
  private viewerArr: any[] = [];
  private uploadId!: any;
  private viewerIndex!: number;
  private dialogVisible = false;
  private fileUpload: any;
  private cropperName = "";
  private cropperImg = "";
  private changeFileList: any = [];
  private fdData: any = [];
  private checkSet = new Set();
  private editIndex: any = 0;

  @Watch("list", { deep: true })
  getList(list: any) {
    let push = (this.$refs.upload as any)?.$children[
      (this.$refs.upload as any)?.$children?.length - 1
    ]?.$el;
    if (push) {
      if (list.length < this.limit) {
        push.style.display = "inline-block";
      } else {
        push.style.display = "none";
      }
    }
  }
  @Watch("fileList", { immediate: true, deep: true })
  getFileList(fileList: any) {
    if (fileList.length) {
      fileList.forEach((v: any, index: number) => {
        v.url = `/sales-api/sales-document-cover/file/browse/${v.fileId}`;
        this.replaceUpload(v, fileList, index, v.fileId);
      });
    }
  }

  created() {
    this.srcList = [];
  }
  // 自定义请求
  async httpRequest(req: any) {
    if (!this.checkSet.has(req.file.uid)) {
      this.checkSet.add(req.file.uid);
      const fd = new FormData();
      if (this.fileUpload) {
        fd.append("files", this.fileUpload);
      } else {
        fd.append("files", req.file);
      }
      return await post_file_upload(fd);
    }
  }

  beforeUpload(file: any) {
    return new Promise((resolve: any, reject: any) => {
      const size = file.size / 1024 / 1024 < this.fileSize;
      const $index = file?.name?.lastIndexOf(".");
      const type = file?.name?.substring($index + 1);
      if (!size) {
        this.$message({
          message: `文件大小不能超过 ${this.fileSize}MB`,
          type: "warning",
        });
        reject();
        return;
      } else {
        if (this.uploadAccept) {
          switch (this.uploadAccept) {
            case "image":
              switch (type) {
                case "gif":
                case "jpg":
                case "png":
                case "jpeg":
                  resolve();
                  break;
                default:
                  this.$message({
                    message: `只能上传图片类型`,
                    type: "warning",
                  });
                  reject();
                  break;
              }
              break;
          }
        } else {
          switch (type) {
            case "gif":
            case "jpg":
            case "png":
            case "jpeg":
            case "doc":
            case "docx":
            case "docm":
            case "xls":
            case "xlsx":
            case "pdf":
            case "ppt":
            case "potx":
            case "pptx":
              resolve();
              break;
            default:
              this.$message({
                message: `只能上传图片, 文档, 表格, pdf, ppt类型`,
                type: "warning",
              });
              reject();
              break;
          }
        }
      }
    });
  }

  successHandler(response: any, file: any, fileList: any) {
    if (response) {
      fileList.forEach((v: any, index: number) => {
        if (v?.response?.length) {
          this.replaceUpload(v, fileList, index, v.response[0].fileId);
        } else {
          this.replaceUpload(v, fileList, index, v.fileId);
        }
      });
      this.$emit("newFileList", fileList, this.fileType);
    }
  }
  errorHandler(file: any) {
    this.$message.error("上传失败");
    const index = this.changeFileList.findIndex((v: any) => v.uid === file.uid);
    this.$set(this.changeFileList, index, { ...file, uploadLoading: false });
  }

  onChangeHandler(file: any, fileList: any) {
    if (!this.checkSet.has(file.uid)) {
      this.changeFileList = fileList;
      const index = this.changeFileList.findIndex(
        (v: any) => v.uid === file.uid
      );
      if (file.status === "ready") {
        this.$set(this.changeFileList, index, { ...file, uploadLoading: true });
        if (this.isCrop) {
          const $index = file?.name?.lastIndexOf(".");
          const type = file?.name?.substring($index + 1);
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
      } else {
        (this.$refs.upload as any).submit();
      }
    }
  }
  // 显示列表的图片URL
  uploadType(file: any) {
    let $index = file?.name?.lastIndexOf(".");
    const type = file?.name?.substring($index + 1);
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
      default:
        return require("../../../img/file.jpg");
    }
  }
  // 移除图片
  async handleRemove(file: any) {
    if (this.delFileServer) await get_file_remove__fid({ fid: file.fileId });
    await (this.$refs.upload as any).handleRemove(file);
    let index = this.list.findIndex((v) => v.uid === file.uid);
    this.$delete(this.list, index);
    this.$emit("newFileList", this.list, this.fileType);
  }
  // 点击图片预览按钮
  handlePictureCardPreview(file: any) {
    if (file.fileId) {
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
    } else {
      this.clickViewMsg();
    }
  }
  // 图片下载按钮
  async handleDownload(file: any) {
    if (file.fileId) {
      window.open(
        `/sales-api/sales-document-cover/file/download/${file.fileId}`
      );
    } else {
      this.clickDownloadMsg();
    }
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
    const $index = file?.name?.lastIndexOf(".");
    const type = file?.name?.substring($index + 1);
    switch (type) {
      case "gif":
      case "jpg":
      case "png":
      case "jpeg":
        this.$set(
          fileList[index],
          "img_url",
          `/sales-api/sales-document-cover/file/browse/${fileId}`
        );
        break;
      case "doc":
      case "docx":
      case "docm":
        this.$set(fileList[index], "img_url", require("../../../img/word.jpg"));
        break;
      case "xls":
      case "xlsx":
        this.$set(
          fileList[index],
          "img_url",
          require("../../../img/excel.png")
        );
        break;
      case "pdf":
        this.$set(fileList[index], "img_url", require("../../../img/pdf.jpg"));
        break;
      case "ppt":
      case "potx":
      case "pptx":
        this.$set(fileList[index], "img_url", require("../../../img/ppt.png"));
        break;
      default:
        this.$set(fileList[index], "img_url", require("../../../img/file.jpg"));
    }
    this.$set(fileList[index], "fileId", fileId);
    this.$set(fileList[index], "type", this.fileType);
    this.$set(fileList[index], "uploadLoading", false);
    this.list = [...fileList];
  }

  // 图片裁剪确定
  cropperFinish(data: any) {
    this.dialogVisible = false;
    this.fileUpload = data;
    this.cropperImg = "";
    (this.$refs.upload as any).submit();
  }

  cancel() {
    this.dialogVisible = false;
    this.changeFileList.pop();
    this.list = this.changeFileList;
  }

  // 右移
  rightShift(file: any) {
    let index = this.list.findIndex((v: any) => v.fileId === file.fileId);
    if (index + 1 < this.list.length) {
      let arr = [...this.list];
      arr.splice(index, 1);
      arr.splice(index + 1, 0, file);
      this.$emit("update:fileList", [...arr]);
    } else {
      this.$message.warning("最后一项不可右移");
    }
  }
  // 左移
  leftShift(file: any) {
    let index = this.list.findIndex((v: any) => v.fileId === file.fileId);
    if (index > 0) {
      let arr = [...this.list];
      arr.splice(index, 1);
      arr.splice(index - 1, 0, file);
      this.$emit("update:fileList", [...arr]);
    } else {
      this.$message.warning("第一项不可左移");
    }
  }
  // 上传中
  uploadLoadingHander(file: any) {
    const item = this.changeFileList.find((v: any) => v.uid === file.uid);
    if (item) {
      return item.uploadLoading;
    }
  }
  // 图片编辑
  handleEdit(file: any) {
    this.$nextTick(() => {
      (this.$refs.editUpload as any).click();
      this.editIndex = this.list.findIndex(
        (v: any) => v.fileId === file.fileId
      );
      console.log(this.editIndex, "图片编辑");
    });
  }

  // 编辑附件确定
  async editUploadChange({ target }: any) {
    this.beforeUpload(target.files[0]).then(() => {
      this.uploadRequer(target.files);
    });
  }

  // 编辑上传
  async uploadRequer(files: any) {
    let fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }
    let res: any = await post_file_upload(fd);
    this.$set(this.list, this.editIndex, {
      ...this.list[this.editIndex],
      fileId: res[0].fileId,
      name: `${res[0].originalFileName}.${res[0].originalFileType}`,
      url: `/sales-api/sales-document-cover/file/browse/${res[0].fileId}`,
    });
    this.replaceUpload(
      this.list[this.editIndex],
      this.list,
      this.editIndex,
      res[0].fileId
    );
    this.$emit("update:fileList", [...this.list]);
  }
}
</script>
<style lang="scss" scoped>
.upload {
  display: flex;
  justify-content: flex-start;
  line-height: normal;
  /deep/ .el-upload--picture-card {
    margin-bottom: 10px;
  }
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

.uploadbutton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .move,
  .operation {
    width: 100%;
    .editButton {
      margin-left: 0;
    }
  }
  .move {
    margin-top: -8px !important;
    display: flex !important;
    justify-content: space-around !important;
    margin-left: 0 !important;
  }
}

.el-upload-list--picture-card .el-upload-list__item-actions::after {
  height: 0;
}

.uploadLoading {
  /deep/ .el-loading-spinner {
    margin-top: 10px;
    font-size: 28px;
  }
}
</style>