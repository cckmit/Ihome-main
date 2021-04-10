<!--
 * @Description: 下拉搜索选择经纪人 --- 成交录入/编辑
 * @version:
 * @Author: lsj
 * @Date: 2021-04-08 16:25:36
 * @LastEditors: lsj
 * @LastEditTime: 2021-04-10 17:44:28
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";
import {post_channelAgent_getDealChannelAgentList} from "@/api/channel/index";

@Component({
  extends: IhSelectPageBase,
})
export default class IhSelectPageByChannelBroker extends Vue {
  @Prop() proId?: any;
  @Prop({
    default: true,
  })
  switchHidePage?: boolean;
  @Prop({
    default: () => {
      return {
        lable: "name",
        value: "id",
        key: "id",
        disabled: "disabled",
      };
    },
  })
  props?: any;
  @Prop({
    default: true,
  })
  isBlur?: boolean;

  @Watch("proId")
  watchProId(val: any) {
    if (val) this.getSelectList();
  }

  optionList: any = [];
  // 分页信息
  pageInfo: any = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };
  filterText = null;
  searchLoad = false;

  handleMessage() {
    this.$message.warning("请先选择渠道公司");
  }

  async getSelectList() {
    if (this.proId || !this.isBlur) {
      this.searchLoad = true;
      let res = await post_channelAgent_getDealChannelAgentList({
        name: this.filterText,
        channelId: this.proId,
        status: 'Valid',
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum
      });
      this.optionList = res.list;
      this.pageInfo = res;
      this.searchLoad = false;
    }
  }
}
</script>