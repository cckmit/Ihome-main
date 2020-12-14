<!--
 * @Descripttion: 左右可移动大小的布局容器
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-09 16:53:59
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-14 11:12:38
-->
<template>
  <div class="column">
        <div class="column-left" :style="{ 'height':minHeight}">
            <div class="resize-bar" :style="{ 'width':leftWidth+'px'}" ></div>
            <div class="resize-line"></div>
            <div class="resize-save">
                <slot name="left"/>
            </div>
        </div>
        <div class="column-right" :style="{ 'height':minHeight}">
             <slot name="right"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue ,Prop} from "vue-property-decorator";
@Component({
  components: {}
})
export default class LeftRightContainer extends Vue {
  
     @Prop({
        type: Number,
        default:600,
    })
    leftHeight: any;
     @Prop({
        type: Number,
        default:200,
    })
    leftWidth: any;
    get minHeight(){
         
        return this.leftHeight+100+'px';
    }
}
</script>
<style lang="scss" scoped>
.column {
            overflow: hidden;
        }
 
        .column-left {
             
            // background-color: #fff;
            position: relative;
            float: left;
        }
 
        .column-right {
            
            padding: 16px;
            // background-color: #eee;
            box-sizing: border-box;
            overflow: hidden;
        }
 
        .resize-save {
            position: absolute;
            top: 0;
            right: 5px;
            bottom: 0;
            left: 0;
            padding: 16px;
            overflow-x: hidden;
        }
 
        .resize-bar {
            // width: 400px;
            height: inherit;
            resize: horizontal;
            cursor: ew-resize;
            opacity: 0;
            overflow: scroll;
        }
 
        /* 拖拽线 */
        .resize-line {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            // border-right: 2px solid #eee;
            border-left: 1px solid #ccc;
            pointer-events: none;
        }
 
        .resize-bar:hover~.resize-line,
        .resize-bar:active~.resize-line {
            border-left: 1px dashed skyblue;
        }
 
        .resize-bar::-webkit-scrollbar {
            width: 200px;
            height: inherit;
        }
 
        /* Firefox只有下面一小块区域可以拉伸 */
        @supports (-moz-user-select: none) {
 
            .resize-bar:hover~.resize-line,
            .resize-bar:active~.resize-line {
                border-left: 1px solid #bbb;
            }
 
            .resize-bar:hover~.resize-line::after,
            .resize-bar:active~.resize-line::after {
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                bottom: 0;
                right: -8px;
                // background: url(./resize.svg);
                background-size: 100% 100%;
            }
        }
</style>