<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-03-23 10:35:33
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-25 10:21:06
-->
<template>
  <div class="upload-container">
    <template v-if="uploadShow">
      <div
        class="item uploader img-item"
        v-for="(file, i) in fileList"
        :key="i"
      >
        <el-image
          :src="uploadType(file)"
          :style="{ width: size, height: size }"
        >

          <div slot="placeholder">
            <i
              class="image-slot el-icon-loading"
              :style="{ 'line-height': size }"
            ></i>
          </div>
          <div slot="error">
            <i
              class="image-slot el-icon-picture-outline"
              :style="{ 'line-height': size }"
            ></i>
          </div>

        </el-image>
        <slot
          name="extend"
          :data="file"
        />
        <el-tooltip
          effect="light"
          :content="file[fileName]"
          placement="top"
        >
          <div
            class="mask"
            :style="{
            width: size,
            height: Object.keys($scopedSlots).length ? size : ''}"
          >
            <div>
              <span
                v-if="previewPermi"
                @click="preview(file, i)"
              >
                <i
                  class="el-icon-zoom-in"
                  title="预览"
                ></i>
              </span>
              <span
                v-if="loadPermi"
                @click="download(file)"
              >
                <i
                  class="el-icon-download"
                  title="下载"
                ></i>
              </span>
              <span
                v-if="removePermi && !file.exAuto"
                @click="remove(file, i)"
              >
                <i
                  class="el-icon-delete"
                  title="删除"
                ></i>
              </span>
              <span
                class="editButton"
                v-if="editPermi && !file.exAuto"
                @click="edit(file, i)"
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
              <span @click="leftShift(file, i)">
                <i
                  class="el-icon-back"
                  title="左移"
                ></i>
              </span>
              <span @click="rightShift(file, i)">
                <i
                  class="el-icon-right"
                  title="右移"
                ></i>
              </span>
            </div>
          </div>
        </el-tooltip>
      </div>
      <div
        v-if="limitComputed"
        class="item uploader"
        :style="{ width: size, height: size }"
      >
        <i class="el-icon-plus icon"></i>
        <input
          ref="upload"
          type="file"
          :multiple="Multiple"
          :accept="accept"
          @change="uploadChange"
        />
      </div>
    </template>
    <ImageViewer
      v-if="isVisible"
      :url-list="urlList"
      :on-close="() => (isVisible = false)"
      :viewer-msg="fileList"
      :viewer-index="viewerIndex"
    ></ImageViewer>
    <ih-dialog :show="dialogVisible">
      <Cropper
        ref="cropper"
        :img="cropperImg"
        :cropper-name="cropperName"
        @cancel="dialogVisible = false"
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
  @Prop() value!: Array<object>;
  @Prop({
    type: Boolean,
    default: true,
  })
  multiple?: boolean; // 是否支持批量上传
  @Prop({
    type: String,
    default: "",
  })
  accept?: string; // 图片上传类型
  @Prop({
    type: String,
    default: "100px",
  })
  size?: string; // 图片的宽高
  @Prop({
    type: Number,
    default: 10,
  })
  fileSize!: number; // 图片上传大小限制
  @Prop({
    type: Number,
    default: 999,
  })
  limit!: number; // 图片上传数量
  @Prop({
    type: Boolean,
    default: false,
  })
  isServeDel?: boolean; // 移除图片是否垫佣接口
  @Prop({
    type: Boolean,
    default: true,
  })
  previewPermi?: boolean; // 预览按钮开关
  @Prop({
    type: Boolean,
    default: true,
  })
  loadPermi?: boolean; // 下载按钮开关
  @Prop({
    type: Boolean,
    default: true,
  })
  removePermi?: boolean; // 删除按钮开关
  @Prop({
    type: String,
    default: null,
  })
  fileType?: string; // 表格类type附件
  @Prop({
    type: Boolean,
    default: true,
  })
  uploadShow?: boolean; // 控制组件显示隐藏
  @Prop({
    type: String,
    default: "",
  })
  uploadAccept!: string; // 限制上传图片类型
  @Prop({
    type: Function,
  })
  clickViewMsg?: any; // 预览按钮报错信息
  @Prop({
    type: Function,
  })
  clickDownloadMsg?: any; // 下载按钮报错信息
  @Prop({
    type: Boolean,
    default: false,
  })
  isMove?: boolean; // 附件左右移动开关
  @Prop({
    type: Boolean,
    default: false,
  })
  isCrop?: boolean; // 图片裁切开关
  @Prop({
    type: Boolean,
    default: true,
  })
  editPermi?: boolean; // 附件编辑按钮开关
  @Prop({
    type: Object,
    default: () => {
      return {
        fileId: "fileId",
        fileName: "fileName",
      };
    },
  })
  props?: object;

  private fileList: any = [];
  private isVisible: any = false;
  private viewerIndex: any = 0;
  private urlList: any = [];
  private dialogVisible = false;
  private cropperName = "";
  private cropperImg = "";
  private Multiple: any = true;
  private editIndex: any = 0;
  private fileAddOrEdit: any = "";

  @Watch("value", { immediate: true, deep: true })
  handler(val: any) {
    this.fileList = val.map((v: any) => ({
      ...v,
    }));
  }

  @Watch("isCrop", { immediate: true, deep: true })
  cropHandler(val: any) {
    if (val) {
      this.Multiple = false;
    } else {
      this.Multiple = true;
    }
  }

  @Watch("multiple", { immediate: true, deep: true })
  multipleHandler(val: any) {
    if (!this.isCrop) {
      if (val) {
        this.Multiple = true;
      } else {
        this.Multiple = false;
      }
    }
  }

  get limitComputed() {
    if (this.fileList.length < this.limit) {
      return true;
    } else {
      return false;
    }
  }

  get fileName() {
    return (this.props as any).fileName || "fileName";
  }
  get fileId() {
    return (this.props as any).fileId || "fileId";
  }

  uploadType(file: any) {
    let $index = file[this.fileName]?.lastIndexOf(".");
    const type = file[this.fileName]?.substring($index + 1);
    switch (type) {
      case "gif":
      case "jpg":
      case "png":
      case "jpeg":
        return `/sales-api/sales-document-cover/file/browse/${
          file[this.fileId]
        }`;
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

  preview(file: any, index: number) {
    if (file[this.fileId]) {
      this.viewerIndex = index;
      this.urlList = this.fileList.map((v: any) => v.url);
      this.isVisible = true;
    } else {
      this.clickViewMsg();
    }
  }
  async remove(file: any, index: number) {
    if (this.isServeDel) {
      try {
        await get_file_remove__fid(file[this.fileId]);
      } catch (err) {
        console.log(err);
      }
    } else {
      this.fileList.splice(index, 1);
    }
    this.$emit("input", this.fileList);
    this.$emit("newFileList", this.fileList, this.fileType);
  }
  download(file: any) {
    if (file[this.fileId]) {
      window.open(
        `/sales-api/sales-document-cover/file/download/${file[this.fileId]}`
      );
    } else {
      this.clickDownloadMsg();
    }
  }
  async uploadChange({ target }: any) {
    this.fileAddOrEdit = "add";
    if (
      target.files.length > this.limit ||
      target.files.length + this.fileList.length > this.limit
    ) {
      this.$message.warning(`已超出文件上传数量限制, 请重新选择!`);
      return;
    }
    let arr: any = [];
    await target.files.forEach(async (v: any) => {
      try {
        const res = await this.beforeUpload(v);
        arr.push(res);
      } catch (err) {
        console.log(err);
      }
    });
    if (arr.length) {
      if (this.isCrop) {
        this.cropperEdit(arr[0]);
      } else {
        this.uploadRequer(arr);
      }
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
        reject(`文件大小不能超过 ${this.fileSize}MB`);
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
                  resolve(file);
                  break;
                default:
                  this.$message({
                    message: `只能上传图片类型`,
                    type: "warning",
                  });
                  reject(`只能上传图片类型`);
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
              resolve(file);
              break;
            default:
              this.$message({
                message: `只能上传图片, 文档, 表格, pdf, ppt类型`,
                type: "warning",
              });
              reject(`只能上传图片, 文档, 表格, pdf, ppt类型`);
              break;
          }
        }
      }
    });
  }

  async uploadRequer(files: any) {
    let fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }
    try {
      const res: any = await post_file_upload(fd);
      let list = res.map((v: any, i: number) => {
        let obj: any = {};
        obj[this.fileId] = v.fileId;
        obj[this.fileName] = `${v.originalFileName}.${v.originalFileType}`;
        obj.url = `/sales-api/sales-document-cover/file/browse/${v.fileId}`;
        obj.response = [res[i]];
        obj.raw = files[i];
        obj.size = files[i].size;
        if (this.fileType) {
          obj.fileType = this.fileType;
        }
        return obj;
      });
      let lists = this.fileList.concat(list);
      this.$emit("input", lists);
      this.$emit("newFileList", lists, this.fileType);
      this.$message.success("上传成功");
    } catch (err) {
      console.log(err);
    }
  }

  // 右移
  rightShift(file: any, index: number) {
    if (index + 1 < this.fileList.length) {
      let arr = [...this.fileList];
      arr.splice(index, 1);
      arr.splice(index + 1, 0, file);
      this.$emit("input", [...arr]);
    } else {
      this.$message.warning("最后一项不可右移");
    }
  }

  // 左移
  leftShift(file: any, index: number) {
    if (index > 0) {
      let arr = [...this.fileList];
      arr.splice(index, 1);
      arr.splice(index - 1, 0, file);
      this.$emit("input", [...arr]);
    } else {
      this.$message.warning("第一项不可左移");
    }
  }

  cropperEdit(file: any) {
    const $index = file.name.lastIndexOf(".");
    const type = file.name.substring($index + 1);
    switch (type) {
      case "gif":
      case "jpg":
      case "png":
      case "jpeg":
        this.dialogVisible = true;
        this.cropperName = file.name;
        this.$nextTick(() => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.cropperImg = e.target.result;
          };
          reader.readAsDataURL(file);
        });
        break;
      default:
        if (this.fileAddOrEdit === "add") {
          this.uploadRequer([file]);
        } else {
          this.editUploadRequer([file]);
        }
        break;
    }
  }

  // 图片裁剪确定
  cropperFinish(data: any) {
    this.dialogVisible = false;
    this.cropperImg = "";
    if (this.fileAddOrEdit === "add") {
      this.uploadRequer([data]);
    } else {
      this.editUploadRequer([data]);
    }
  }

  // 图片编辑
  edit(file: any, index: number) {
    this.fileAddOrEdit = "edit";
    this.$nextTick(() => {
      (this.$refs.editUpload as any).click();
      this.editIndex = index;
    });
  }

  // 编辑附件确定
  async editUploadChange({ target }: any) {
    if (target.files.length) {
      await this.beforeUpload(target.files[0]);
      if (this.isCrop) {
        this.cropperEdit(target.files[0]);
      } else {
        this.editUploadRequer(target.files);
      }
    }
  }

  async editUploadRequer(files: any) {
    let fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }
    let res: any = await post_file_upload(fd);
    let list = res.map((v: any, i: number) => {
      let obj: any = {};
      obj[this.fileId] = v.fileId;
      obj[this.fileName] = `${v.originalFileName}.${v.originalFileType}`;
      obj.url = `/sales-api/sales-document-cover/file/browse/${v.fileId}`;
      obj.response = [res[i]];
      obj.raw = files[i];
      obj.size = files[i].size;
      if (this.fileType) {
        obj.fileType = this.fileType;
      }
      return obj;
    });
    this.$set(this.fileList, this.editIndex, list[0]);
    this.$emit("newFileList", this.fileList, this.fileType);
    this.$message.success("附件编辑成功");
  }
}
</script>

<style scoped lang="scss">
.upload-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.upload-container .item {
  margin: 5px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.upload-container .uploader {
  border: 1px dashed #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 40px;
  color: #ddd;
  border-radius: 5px;
  cursor: pointer;
}
.upload-container .uploader:hover {
  border-color: #003894;
}
.uploader input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100px;
  opacity: 0;
  cursor: pointer;
}
.upload-container .img-item {
  position: relative;
}
.upload-container .img-item .mask {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s;
  color: #fff;
  font-size: 20px;
  line-height: 1.8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.img-item .mask span + span {
  margin-left: 15px;
}
.upload-container .img-item:hover .mask {
  opacity: 1;
}

.mask {
  .move {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}

.image-slot {
  display: flex;
  justify-content: center;
}

.editButton {
  margin-left: 0 !important;
  display: flex;
  justify-content: center;
}
</style>
<style>
.uploader .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100px;
  height: 100px;
  font-size: 30px;
  color: #ddd;
}
</style>