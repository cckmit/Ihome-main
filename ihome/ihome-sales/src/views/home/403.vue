<template>
  <IhPage>
    <div style="margin-top: 150px">
      <img src="../../assets/403.png" alt="" />
    </div>
    <div>
      <p v-if="source">页面：{{ source }}</p>
      <p v-if="api">接口：{{ api }}</p>
    </div>
    <div class="text-center margin-top-40">
      <el-button round type="info" @click="$router.push('/')"
        >返回首页</el-button
      >
    </div>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Error403 extends Vue {
  source: any = null;
  api: any = null;
  created() {
    let source: any = this.$route.query.source;
    this.source = decodeURIComponent(source);
    let api: any = this.$route.query.api;
    this.api = decodeURIComponent(api);
  }
}
</script>
<style lang="scss" scoped>
</style>
