<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-13 16:35:12
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-20 09:54:34
-->
<template>
  <IhPage>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span class="title">数据批量导入</span>
      </div>
      <div class="upload-title">
        <el-steps
          :active="active"
          process-status="process"
          align-center
        >
          <el-step
            title="上传文件"
            description="根据模板修改后上传"
          ></el-step>
          <el-step
            title="执行导入"
            description="数据导入至服务器"
          ></el-step>
          <el-step
            title="导入成功"
            description="完成数据批量导入"
          ></el-step>
        </el-steps>
      </div>
      <div v-show="progress === 'start'">
        <div>
          <div class="download">
            <div class="download-icon">
              <i class="el-icon-download">
              </i>
            </div>
            <div class="download-msg">
              <div class="download-msg-title">填写导入结佣额度的信息</div>
              <div class="download-msg-child">请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除。</div>
              <div>
                <el-link
                  type="primary"
                  @click="download"
                >下载模板</el-link>
              </div>
            </div>
          </div>
          <div class="download">
            <div class="download-icon">
              <i class="el-icon-upload2">
              </i>
            </div>
            <div class="download-msg">
              <div class="download-msg-title">上传填好的渠道结佣额度表</div>
              <div class="download-msg-child">文件后缀名必须为xls 或xlsx （即Excel格式），文件大小不得大于10M。</div>
              <div :class="{ 'uploadDemo': submitList.length }">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  action="/sales-api/sales-document-cover/file/upload"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :before-upload="beforeUpload"
                  :file-list.sync="fileList"
                  name="files"
                  :headers="headers"
                >
                  <el-link
                    class="uploadbutton"
                    v-show="!submitList.length"
                    type="primary"
                    slot="trigger"
                  >上传文件</el-link>
                </el-upload>
              </div>
            </div>
          </div>
        </div>
        <div class="button">
          <el-button
            type="primary"
            @click="nextPage"
          >下一步</el-button>
        </div>
      </div>
      <div v-show="progress === 'loading'">
        <div class="progress">
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="percentage"
          ></el-progress>
        </div>
        <div class="hint">
          正在导入数据，请勿关闭或刷新页面
        </div>
      </div>
      <div v-show="progress === 'success'">
        <div class="margin-top-40">
          <i
            class="el-icon-success"
            style="font-size: 50px;color:#19BE6B"
          ></i>
          <div class="success-title">数据导入完成</div>
          <div class="success-number">
            {{`成功导入数量${successTotal}条`}}
          </div>
          <div class="margin-top-10">
            <el-button
              type="primary"
              @click="goBack"
            >返回</el-button>
          </div>
        </div>
      </div>
      <div v-show="progress === 'error'">
        <div class="download">
          <div class="download-icon">
            <i class="el-icon-warning">
            </i>
          </div>
          <div class="download-msg">
            <div class="download-msg-error">正常数量条数: <span style="color: #19BE6B">{{`${successTotal}条`}}</span></div>
            <div class="download-msg-error">异常数量条数: <span style="color: #F56C6C">{{`${errorTotal}条`}}</span></div>
          </div>
        </div>
        <div class="error">
          <div class="error-title"> 异常提示：</div>
          <template v-for="(item, i) in errorMsg">
            <div
              :key="i"
              class="margin-top-10"
            >{{item}}</div>
          </template>
        </div>
        <div class="margin-top-20">
          <el-button
            type="primary"
            @click="goBack"
          >重新上传</el-button>
        </div>
      </div>
    </el-card>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getToken } from "ihome-common/util/cookies";
import axios from "axios";
@Component({
  components: {},
})
export default class Import extends Vue {
  private fileList: any = [];
  private submitList: any = [];
  private headers: any = {
    Authorization: `bearer ${getToken()}`,
  };
  private progress: any = "start";
  private percentage: any = 0;
  private timer: any = null;
  private active: any = 1;
  private successTotal: any = 0;
  private errorTotal: any = 0;
  private errorMsg: any = [];

  download() {
    const token: any = getToken();
    axios({
      method: "GET",
      url: `/sales-api/payoff/file/download/quota/stencil`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "渠道结佣额度模板.xlsx";
      $a.click();
      $a.remove();
    });
  }

  handleSuccess(response: any, file: any) {
    this.submitList = [
      {
        raw: file.raw,
      },
    ];
    console.log(this.submitList);
  }

  handleRemove() {
    this.submitList = [];
  }
  // previewHandler(file: any) {
  //   if (file.response) {
  //     window.open(
  //       `/sales-api/sales-document-cover/file/download/${file.response.data[0].fileId}`
  //     );
  //   }
  // }

  beforeUpload(file: any) {
    return new Promise((resolve, reject) => {
      const size = file.size / 1024 / 1024 < 10;
      const type = file?.name?.match(/(?<=\.).+/)?.toString();
      if (!size) {
        this.$message({
          message: `文件大小不能超过10MB`,
          type: "warning",
        });
        reject();
        return;
      } else {
        switch (type) {
          case "xls":
          case "xlsx":
            resolve();
            break;
          default:
            this.$message({
              message: `文件后缀名必须为xls 或xlsx （即Excel格式）`,
              type: "warning",
            });
            reject();
            break;
        }
      }
    });
  }

  nextPage() {
    if (this.submitList.length) {
      this.timer = setInterval(this.updatePercentage, 50);
      this.progress = "loading";
      this.active = 2;
    } else {
      this.$message.warning("请先上传文件");
    }
  }

  updatePercentage() {
    this.percentage += 2;
    if (this.percentage > 99.9) {
      this.percentage = 99.9;
      clearInterval(this.timer);
      this.timer = null;
      this.uploadMsg();
    }
  }

  async uploadMsg() {
    try {
      const fd = new FormData();
      fd.append("file", this.submitList[0].raw);
      const token: any = getToken();
      axios({
        method: "POST",
        url: `/sales-api/payoff/payApply/quota`,
        xsrfHeaderName: "Authorization",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        data: fd,
      })
        .then((res: any) => {
          this.percentage = 100;
          if (res.data.data.status) {
            this.progress = "success";
            this.active = 3;
          } else {
            this.progress = "error";
            this.errorMsg = res.data.data.msg;
          }
          this.fileList = [];
          this.successTotal = res.data.data.success;
          this.errorTotal = res.data.data.error;
        })
        .catch(() => {
          this.$message.error("模板格式错误,请重新上传");
          this.goBack();
        });
    } catch (err) {
      this.$message.error("模板格式错误,请重新上传");
      this.goBack();
    }
  }

  goBack() {
    this.active = 1;
    this.percentage = 0;
    this.fileList = [];
    this.submitList = [];
    this.progress = "start";
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  border-radius: 10px;
  /deep/ .el-card__header {
    background-color: #f1f1f1;
  }
}
.clearfix {
  text-align: left;
  .title {
    font-weight: bold;
  }
}

.upload-title {
  /deep/ .el-step__description {
    color: #ccc;
  }
}

.error {
  width: 80%;
  margin: auto;
  background-color: #f5f5f5;
  border: 1px solid #f1f1f1;
  margin-top: 30px;
  padding: 20px;
  text-align: left;
  box-sizing: border-box;

  &-title {
    font-weight: 400;
  }
}

.download {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #f1f1f1;
  margin-top: 40px;

  &-icon {
    width: 100px;
    height: 100px;
    background-color: #f5f5f5;
  }

  .el-icon-download,
  .el-icon-warning,
  .el-icon-upload2 {
    font-size: 50px;
    line-height: 100px;
    color: #cccccc;
  }

  &-msg {
    padding: 10px;
    text-align: left;
    div + div {
      padding-top: 5px;
    }
    &-title {
      font-weight: bold;
    }
    &-error {
      font-weight: 400;
    }
    &-child {
      color: #999;
      font-size: 14px;
    }
  }
}

.uploadbutton {
  height: auto;
}

.uploadDemo {
  height: 30px;
  /deep/ .el-upload--text {
    display: none;
  }
  /deep/ .el-upload-list__item {
    margin: 0;
  }
}

.progress {
  width: 80%;
  margin: auto;
  margin-top: 40px;
}

.hint {
  margin-top: 30px;
  color: #999;
}

.button {
  margin-top: 40px;
}

.success-title {
  font-weight: bold;
  margin-top: 10px;
}

.success-number {
  font-size: 14px;
  margin-top: 10px;
  color: #999;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>