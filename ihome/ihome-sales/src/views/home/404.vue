<template>
  <IhPage>
    <div style="margin-top: 150px">
      <img
        src="../../assets/404.png"
        alt=""
      />
    </div>
    <div class="text-center margin-top-40">
      <el-button
        round
        type="info"
        @click="$router.push('/')"
      >返回首页</el-button>
    </div>
    <!-- <p>
      {{ source }}
    </p> -->
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Error404 extends Vue {
  source: any = null;
  created() {
    let source: any = this.$route.query.source;
    this.source = decodeURIComponent(source);
  }
}
</script>
<style lang="scss" scoped>
</style>
