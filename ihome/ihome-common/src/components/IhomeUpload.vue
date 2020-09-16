<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-09 16:17:16
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-16 16:08:15
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
            :limit="limit">
            <template  slot="file" slot-scope="{file}">
                <img class="avatar" :style="{'width':size,'height':size}" :src="uploadType(file)" >
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" v-if="previewPermi" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in" title="预览"></i>
                    </span>
                    <span class="el-upload-list__item-delete" v-if="loadPermi" @click="handleDownload(file)">
                        <i class="el-icon-download" title="下载"></i>
                    </span>
                    <span class="el-upload-list__item-delete" v-if="removePermi" @click="handleRemove(file)">
                        <i class="el-icon-delete" title="删除"></i>
                    </span>
                </span>
            </template>
            <i class="el-icon-plus avatar-uploader-icon" :style="{'width':size,'height':size,'line-height':size}"></i>
        </el-upload>
        <el-image-viewer
            class="imageViewer"
            v-if="visible"
            ref="image"
            :url-list="srcList"
            :on-switch="switchHandler"
            :on-close="closeViewer">
        </el-image-viewer>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ElImageViewer from "element-ui/packages/image/src/image-viewer.vue";
import request from '@/ihome-package/util/api/http';
@Component({
  components: {
    ElImageViewer
  },
})
export default class IhomeUpload extends Vue {
    @Prop() private action: any;
    @Prop() private fileList!: Array<object>;
    @Prop({
        type: Number,
        default: 5
    }) limit!: number;
    @Prop({
        type: Boolean,
        default: true
    }) multiple!: boolean;
    @Prop() private params!: any;
    @Prop({
        default: 'http://filesvr.polyihome.test/aist-filesvr-web/webUploader/uploadAll'
    }) uploadUrl!: string
    @Prop({
        type: String,
        default: ''
    }) accept!: string;
    @Prop({
        type: String,
        default: '150px',
    }) size!: string

    private list: any[] = [];
    private srcList: any[] = [];
    private visible: any = false;
    private ivewerArr: any[] = [];
    private previewPermi = true;
    private loadPermi = true;
    private removePermi = true;
    private uploadId!: any;

    @Watch("list", {deep: true})
    getList(list: any) {
        const push = (this.$refs.upload as any).$children[(this.$refs.upload as any).$children.length - 1].$el;
        if (list.length < this.limit) {
            push.style.display = 'inline-block';
        } else {
            push.style.display = 'none';
        }
    }
    @Watch("fileList", {immediate: true,deep: true})
    getFileList(fileList: any) {
        if (fileList.length) {
            fileList.forEach((v: any, index: number) => {
                this.replaceUpload(v, fileList, index);
            })
        }
    }
    created() {
        this.srcList = [];
    }
    httpRequest(req: any) {
        const fd = new FormData();
        fd.append("file", req.file);
        for(let i in this.params) {
            fd.append(i, this.params[i]);
        }
        request.post(this.uploadUrl, fd).then((res: any) => {
            this.uploadId = res.files[0].id;
            this.successHandler(res);
        }).catch(err => {
            this.errorHandler(err);
        });
    }
    successHandler(res: any) {
        this.$message.success('上传成功');
        console.log(res);
    }
    errorHandler(res: any) {
        this.$message.error('上传失败');
        console.log(res);
    }
    onChangeHandler(file: any, fileList: any) {
        this.replaceUpload(file, fileList, fileList.length - 1);
    }
    beforeUpload(file: any) {
        return new Promise((resolve, reject) => {
            const size = file.size / 1024 / 1024 < 10;
            if (!size) {
                this.$alert('文件大小不能超过 10MB!', {
                    type: 'error',
                })
                reject("图片容量过大!");
                return;
            } else {
                resolve();
            }
        })
    }
    uploadType(file: any) {
        const type = file.name.match(/(?<=\.).+/).toString();
        switch(type) {
            case 'gif':
            case 'jpg':
            case 'png':
            case 'jpeg':
                return file.url;
            case 'doc':
            case 'docx':
            case 'docm':
                return require('../../public/word.jpg');
            case 'xls':
            case 'xlsx':
                return require('../../public/excel.png');
            case 'pdf':
                return require('../../public/pdf.jpg');
            case 'ppt':
            case 'potx':
            case 'pptx':
                return require('../../public/ppt.png');
        }
    }
    // 移除图片
    async handleRemove(file: any) {
        await (this.$refs.upload as any).handleRemove(file);
        let index = this.list.findIndex(v => v.uid === file.uid);
        this.$delete(this.list, index);
    }
    // 点击图片预览按钮
    handlePictureCardPreview(file: any) {
        const ivewerArr = [...this.list];
        const index = ivewerArr.findIndex((v: any) => v.uid === file.uid);
        if (index > 0) {
            const delArr = ivewerArr.splice(index, ivewerArr.length - 1);
            ivewerArr.unshift(...delArr);
        }
        this.ivewerArr = [...ivewerArr];
        this.srcList = ivewerArr.map((v: any) => v.img_url);
        this.visible = true;
        this.$nextTick(() => {
            const img = (this.$refs.image as any).$refs.img[0];
            img.style.cursor = 'pointer';
            const that = this;
            img.addEventListener('click', function() { that.clickHandler(file) }, false);
        })
    }
    // 图片下载按钮
    handleDownload(file: any) {
        request.get(file.url, {
            responseType: 'blob',
        }).then((res: any) => {
            if (res) {
                const blob = new Blob([file.url]);
                const href = window.URL.createObjectURL(blob);
                const $a = document.createElement('a');
                $a.href = href;
                $a.download = file.name;
                $a.click();
                $a.remove();
            }
        });
    }
    // 切换预览图触发
    switchHandler(index: number) {
        const viewerMsg = this.ivewerArr[index];
        this.$nextTick(() => {
            const img = (this.$refs.image as any).$refs.img[0];
            img.style.cursor = 'pointer';
            const that = this;
            img.addEventListener('click', function() { that.clickHandler(viewerMsg) }, false);
        })
    }
    // 点击预览图片事件
    clickHandler(file: any) {
        const type = file.name.match(/(?<=\.).+/).toString();
        switch(type) {
            case 'doc':
            case 'docx':
            case 'docm':
            case 'rtf':
            case 'xls':
            case 'xlsx':
            case 'pptx':
            case 'potx':
            case 'ppt':
                window.open(`https://view.officeapps.live.com/op/view.aspx?src=http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=${this.uploadId}`);
                break;
            case 'pdf':
                window.open(file.url);
                break;
        }
    }
    // 关闭预览图触发
    closeViewer() {
        this.visible = false;
    }
    onExceedHandler() {
        this.$message.error('已超出文件上传数量限制,请重新选择!');
    }
    // 上传不同类型图片替换方法
    replaceUpload(file: any, fileList: any, index: number) {
        const type = file.name.match(/(?<=\.).+/).toString();
        switch(type) {
            case 'gif':
            case 'jpg':
            case 'png':
                fileList[index].img_url = file.url;
                break;
            case 'doc':
            case 'docx':
            case 'docm':
                fileList[index].img_url = require('../../public/word.jpg');
                break;
            case 'xls':
            case 'xlsx':
                fileList[index].img_url = require('../../public/excel.png');
                break;
            case 'pdf':
                fileList[index].img_url = require('../../public/pdf.jpg');
                break;
            case 'ppt':
            case 'potx':
            case 'pptx':
                fileList[index].img_url = require('../../public/ppt.png');
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
}
</style>
<style lang="scss">
.avatar-uploader {
    .el-upload-list__item {
        &.is-ready,
        &.is-success{
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