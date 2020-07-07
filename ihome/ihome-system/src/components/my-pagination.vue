<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-02 10:48:29
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-02 17:09:10
--> 


<script>
import { Pagination } from "element-ui";
export default {
  name: "MyPagination",
  extends: Pagination, // 指定继承组件
  props: {
    currentPage: {
      type: Number,
      default: 2
    }
  },
  created() {
    console.log("MyPagination");
  }
};
</script>

<style>
</style>