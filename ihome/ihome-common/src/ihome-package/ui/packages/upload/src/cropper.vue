<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-21 14:17:48
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-05 16:38:23
-->
<template>
  <el-dialog
    v-dialogDrag
    title="图片剪裁"
    :visible.sync="dialogVisible"
    append-to-body
    :before-close="cancel"
    :close-on-click-modal="false"
  >
    <div class="cropper-content">
      <div class="cropper" style="text-align: center">
        <VueCropper
          ref="vueCropper"
          :img="img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
        />
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="finish">确认</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { VueCropper } from "vue-cropper";
@Component({
  components: {
    VueCropper,
  },
})
export default class Cropper extends Vue {
  @Prop() img!: any;
  @Prop() cropperName!: any;
  @Prop({
    type: Boolean,
    default: false,
  })
  isCompress!: boolean; // 是否压缩
  @Prop({
    type: Number,
    default: 0.8,
  })
  compress!: number; // 压缩率
  private dialogVisible = true;

  private option = {
    img: "", // 裁剪图片的地址
    info: true, // 裁剪框的大小信息
    outputSize: 0.8, // 裁剪生成图片的质量
    outputType: "jpeg", // 裁剪生成图片的格式
    canScale: true, // 图片是否允许滚轮缩放
    autoCrop: true, // 是否默认生成截图框
    autoCropWidth: 500, // 默认生成截图框宽度
    autoCropHeight: 300, // 默认生成截图框高度
    fixedBox: false, // 固定截图框大小 不允许改变
    fixed: false, // 是否开启截图框宽高固定比例
    fixedNumber: [5, 3], // 截图框的宽高比例
    full: true, // 是否输出原图比例的截图
    canMoveBox: true, // 截图框能否拖动
    original: false, // 上传图片按照原始比例渲染
    centerBox: true, // 截图框是否被限制在图片里面
    infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  };

  cancel() {
    this.$emit("cancel");
  }

  finish() {
    (this.$refs.vueCropper as any).getCropData((data: any) => {
      if (this.isCompress) {
        let img = new Image();
        img.src = data;
        img.onload = () => {
          let _data = this.onImgCompression(img);
          const file = this.convertBase64UrlToBlob(_data);
          this.$emit("finish", file);
        };
      } else {
        const file = this.convertBase64UrlToBlob(data);
        this.$emit("finish", file);
      }
    });
  }

  // 将base64的图片转换为file文件;
  convertBase64UrlToBlob(urlData: any) {
    let bytes = window.atob(urlData.split(",")[1]);
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: "image/jpeg" });
    return new File([blob], `${this.cropperName}.png`, {
      type: "image/jpeg",
    });
  }
  // 压缩图片
  onImgCompression(img: any) {
    let canvas = document.createElement("canvas");
    let ctx: any = canvas.getContext("2d");
    let width = img.width;
    let height = img.height;
    canvas.width = width;
    canvas.height = height;
    // 铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, width, height);
    //进行压缩
    return canvas.toDataURL("image/jpeg", this.compress);
  }
}
</script>
<style lang="scss" scoped>
.cropper-content {
  .cropper {
    width: auto;
    height: 500px;
  }
}
</style>