<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-13 16:35:41
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-14 10:47:14
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
          :active="2"
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
    </el-card>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_payApply_quota } from "@/api/payoff";
@Component({
  components: {},
})
export default class Import extends Vue {
  private percentage: any = 0;
  private timer: any = null;
  mounted() {
    this.timer = setInterval(this.updatePercentage, 50);
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
      let data: any = sessionStorage.getItem("importData");
      let arr: any = JSON.parse(data);
      const fd = new FormData();
      fd.append("file", arr[0]);
      await get_payApply_quota(fd);
      this.percentage = 100;
      this.$router.push("/import/success");
    } catch (err) {
      console.log(err);
      // this.$router.push("/import/error");
    }
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

.progress {
  width: 80%;
  margin: auto;
  margin-top: 40px;
}

.hint {
  margin-top: 30px;
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