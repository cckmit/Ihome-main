<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-29 16:35:32
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-23 15:41:57
--> 
<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-29 16:35:32
 * @LastEditors: zyc
 * @LastEditTime: 2020-09-29 15:18:06
--> 
<template>
  <div id="app" class="root">
    <keep-alive>
      <router-view
        class="router-view keep-alive"
        v-if="$route.meta.keepAlive"
      ></router-view>
    </keep-alive>
    <router-view
      class="router-view"
      v-if="!$route.meta.keepAlive"
    ></router-view>
    <!-- <router-view /> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style lang="scss" scoped>
.root {
  padding: 20px;
}
</style>