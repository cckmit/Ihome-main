<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-07 10:29:38
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-07 10:35:09
-->
<template>
  <IhPage></IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";

@Component({
  mixins: [PaginationMixin],
})
export default class ApplyRecList extends Vue {}
</script>
