<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2021-04-01 19:12:01
 * @LastEditors: lsj
 * @LastEditTime: 2021-04-09 11:57:33
-->
<template>
  <IhPage>
    <div class="upload-header">
      <div class="title-wrapper">
        <div class="deal-code">成交报告编号：{{infoFrom.dealCode}}</div>
        <div class="deal-cycle">【{{infoFrom.dealOrg}}】</div>
      </div>
      <div class="form-wrapper">
        <div class="text-left">
          <el-form @submit.native.prevent label-width="90px">
            <el-form-item label="录入人">{{infoFrom.entryPerson}}</el-form-item>
            <el-form-item label="录入日期">{{infoFrom.entryDate ? getDateStr(infoFrom.entryDate) : '-'}}</el-form-item>
          </el-form>
        </div>
        <div class="text-left">
          <el-form @submit.native.prevent label-width="100px">
            <el-form-item label="业绩分配人">{{infoFrom.alloter}}</el-form-item>
            <el-form-item label="业绩分配日期">{{infoFrom.allotDate ? getDateStr(infoFrom.allotDate) : '-'}}</el-form-item>
          </el-form>
        </div>
        <div class="text-right">
          <div>状态</div>
          <div class="text-size">{{$root.dictAllName(infoFrom.status, 'DealStatus')}}</div>
        </div>
        <div class="text-right">
          <div>计算方式</div>
          <div class="text-size">{{$root.dictAllName(infoFrom.calculation, 'DealCalculateWay')}}</div>
        </div>
        <div class="text-right">
          <div>数据标志</div>
          <div class="text-size">{{$root.dictAllName(infoFrom.dataSign, 'DealDataFlag')}}</div>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <p class="ih-info-title margin-left-0">附件信息</p>
      <el-table
        class="ih-table"
        :data="uploadList">
        <el-table-column prop="name" label="类型" width="200"></el-table-column>
        <el-table-column prop="fileName" label="附件" min-width="300">
          <template slot-scope="scope">
            <IhUpload
              @newFileList="getNewFile"
              size="100px"
              :limit="scope.row.code === 'ContractInfo' ? scope.row.fileList.length : 100"
              :file-size="10"
              :editPermi="false"
              v-model="scope.row.fileList"
              :file-type="scope.row.code"
            ></IhUpload>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btn-fixed">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </div>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_deal_get__id,
  post_deal_addDocs
} from "@/api/deal";

@Component({
  components: {},
})
export default class UploadAttachment extends Vue {
  uploadList: any = [];
  dealId: any = null;
  infoFrom: any = {}

  async created() {
    console.log(123);
    this.dealId = this.$route.query.id;
    if (this.dealId) {
      await this.init(); // 基础数据
    }
  }

  // 初始化数据
  async init() {
    this.infoFrom = await get_deal_get__id({id: this.dealId});
    // 初始化附件
    this.uploadList = this.initDocumentList(this.infoFrom.documentList);
  }

  // 获取日期年月日
  getDateStr(value: any = '') {
    if (value) {
      return value.substring(0, 10);
    }
  }

  // 构建附件信息
  initDocumentList(list: any = []) {
    let fileList: any = (this as any).$root.dictAllList('DealFileType'); // 附件类型
    // 附件类型增加key
    if (fileList.length > 0) {
      fileList.forEach((vo: any) => {
        this.$set(vo, 'fileList', []);
        // vo.fileList = []; // 存放新上传的数据
        if (list && list.length > 0) {
          list.forEach((item: any) => {
            if (vo.code === item.fileType) {
              vo.fileList.push(
                {
                  ...item,
                  name: item.fileName,
                  exAuto: true // 是否可以删除
                }
              );
            }
          });
        }
      });
    }
    return fileList;
  }

  // 取消
  handleCancel() {
    this.$goto({
      path: "/dealReport/list",
    });
  }

  // 提交
  async handleSubmit() {
    console.log(this.uploadList);
    let tempList: any = [];
    if (this.uploadList && this.uploadList.length) {
      this.uploadList.forEach((list: any) => {
        if (list.fileList && list.fileList.length) {
          list.fileList.forEach((item: any) => {
            if (!item.exAuto) {
              tempList.push(
                {
                  fileId: item.fileId,
                  fileName: item.fileName,
                  fileType: list.code
                }
              )
            }
          });
        }
      });
    }
    if (!tempList.length) {
      this.$message.warning('没有新增附件，无需提交');
      return;
    }
    let postData = {
      dealId: this.dealId,
      documentAddVOS: tempList
    }
    let info = await post_deal_addDocs(postData);
    console.log(info);
    this.$message.success("修改成功");
    this.$goto({
      path: "/dealReport/list",
    });
  }

  // 上传图片/文件
  getNewFile(data: any, type?: any) {
    console.log(data);
    // console.log(type);
    if (this.uploadList && this.uploadList.length > 0) {
      this.uploadList.forEach((vo: any) => {
        if (vo.code === type) {
          if (data && data.length) {
            vo.fileList = data;
          }
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-header {
  width: 100%;

  .title-wrapper {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    align-items: center;

    div {
      flex: 1;
      font-size: 20px;
      font-weight: bold;
    }

    .deal-code {
      text-align: left;
    }

    .deal-cycle {
      text-align: right;
    }
  }

  .form-wrapper {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    align-items: center;

    /deep/.el-form-item {
      margin-bottom: 0px !important;
    }

    div {
      flex: 1;
    }

    .text-size {
      font-size: 21px;
      font-weight: bold;
    }
  }
}

.table-wrapper {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 30px;

  .margin-left-0 {
    margin-left: 0px !important;
  }
}

.btn-fixed {
  width: calc(100% - 220px);
  position: fixed;
  right: 0px;
  bottom: 0px;
  box-sizing: border-box;
  padding: 20px 33px;
  text-align: right;
  background-color: #fff;
}
</style>