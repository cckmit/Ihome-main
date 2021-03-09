<template>
  <div>
    <p>Error404找不到页面</p>
    <p>
      {{ source }}
    </p>
  </div>
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
