<template>
  <IhPage>
    <div style="margin-top: 150px">
      <img
        src="../../assets/403.png"
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
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Error403 extends Vue {}
</script>
<style lang="scss" scoped>
</style>
