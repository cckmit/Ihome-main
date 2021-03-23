<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-03-23 10:35:33
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-23 16:15:30
-->
<template>
  <div class="upload-container">
    <template v-if="fileList.length">
      <div
        class="item uploader img-item"
        v-for="(file, i) in fileList"
        :key="i"
      >
        <el-image
          :src="file | filterImgUrl"
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
        <el-tooltip
          effect="light"
          :content="file.fileName"
          placement="top"
        >
          <div class="mask">
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
            </div>
          </div>
        </el-tooltip>
      </div>
    </template>
    <div
      class="item uploader"
      :style="{ width: size, height: size }"
    >
      <i class="el-icon-plus icon"></i>
      <input
        ref="imageUploader"
        type="file"
        :multiple="multiple"
        :accept="accept"
        @change="beforeUpload"
      />
    </div>
    <ImageViewer
      v-if="isVisible"
      :url-list="urlList"
      :on-close="() => (isVisible = false)"
      :viewer-msg="viewerArr"
      :viewer-index="viewerIndex"
    ></ImageViewer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { uploadType } from "./uploadMethod";
import ImageViewer from "./image-viewer.vue";
import {
  post_file_upload,
  get_file_remove__fid,
} from "@/api/sales-document-cover/index";
@Component({
  components: {
    ImageViewer,
  },
  filters: {
    filterImgUrl(val: any) {
      return uploadType(val);
    },
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
  accept!: string; // 图片上传类型
  @Prop({
    type: String,
    default: "100px",
  })
  size!: string; // 图片的宽高
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
  props?: object; // 初始化默认属性
  private fileList: any = [];
  private isVisible: any = false;
  private viewerIndex: any = 0;
  private viewerArr: any = [];
  private urlList: any = [];
  @Watch("value", { immediate: true, deep: true })
  handler(val: any) {
    this.fileList = val.map((v: any) => ({
      ...v,
    }));
  }
  preview(file: any, index: number) {
    if (file.fileId) {
      this.viewerIndex = index;
      this.viewerArr = this.fileList.map((v: any) => ({
        ...v,
        preFileName: this.fileList[0]?.fileType,
      }));
      this.urlList = this.fileList.map(
        (v: any) => `/sales-api/sales-document-cover/file/browse/${v.fileId}`
      );
      this.isVisible = true;
    } else {
      this.clickViewMsg();
    }
  }
  async remove(file: any, index: number) {
    if (this.isServeDel) {
      try {
        await get_file_remove__fid(file.fileId);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.fileList.splice(index, 1);
    }
    this.$emit("input", this.fileList);
    this.$emit("newFileList", this.fileList, this.fileType);
  }
  download(file: any) {
    if (file.fileId) {
      window.open(
        `/sales-api/sales-document-cover/file/download/${file.fileId}`
      );
    } else {
      this.clickDownloadMsg();
    }
  }
  beforeUpload({ target }: any) {
    console.log(target.files);
    if (
      target.files.length > this.limit ||
      target.files.length + this.fileList.length > this.limit
    ) {
      this.$message.warning(`最多只能上传${this.limit}张图片`);
      return;
    }

    this.uploadRequer(target.files);
  }
  async uploadRequer(files: any) {
    let fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }
    const res: any = await post_file_upload(fd);
    let list = res.map((v: any) => {
      let obj: any = {};
      obj.fileId = v.fileId;
      obj.fileName = `${v.originalFileName}.${v.originalFileType}`;
      if (this.fileType) {
        obj.fileType = this.fileType;
      }
      return obj;
    });
    let lists = this.fileList.concat(list);
    this.$emit("input", lists);
    this.$emit("newFileList", lists, this.fileType);
  }
}
</script>

<style scoped>
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
.image-slot {
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