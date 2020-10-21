<template>
  <div>
    <IhSelectPage
      v-model="testInput"
      clearable
      :props="{
        lable: 'name',
        value: 'id',
        key: 'id',
      }"
      :promiseFun="handleFun"
    >
      <!-- <template v-slot="{ data, index }">
        <span style="float: left">{{ data.name }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ index }}</span>
      </template> -->
    </IhSelectPage>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { post_user_getList } from "@/api/system/index";

@Component({})
export default class SelectPageDemo extends Vue {
  testInput = "";

  handleFun(req: any) {
    return post_user_getList(req);
  }
}
</script>
