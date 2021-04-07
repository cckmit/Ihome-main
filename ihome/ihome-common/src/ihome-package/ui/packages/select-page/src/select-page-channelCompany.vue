<!--
 * @Description: 下拉选择渠道公司 - 成交模块
 * @version: 
 * @Author: lsj
 * @Date: 2021-04-07 15:50:20
 * @LastEditors: lsj
 * @LastEditTime: 2021-04-07 16:50:20
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import IhSelectPageBase from "./select-page-base.vue";
import { post_company_getPage } from "@/api/system/index"; // 内部公司
import { post_channel_getListByName } from "@/api/channel/index"; // 外部公司

@Component({
  extends: IhSelectPageBase,
})
export default class IhSelectPageByChannelCompany extends Vue {
  @Prop() proId?: any; // 渠道公司类型
  @Prop() orgId?: any; // 事业部ID
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
  watchCompanyType(val: any) {
    console.log(val);
    if (val) this.getSelectList();
  }

  optionList: any = [];
  filterText = "";
  searchLoad = false;
  // 分页信息
  pageInfo: any = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };

  handleMessage() {
    if (!this.proId) {
      this.$message.warning("请先选择渠道公司类型");
      return;
    }
  }

  async getSelectList() {
    if (this.proId || !this.isBlur) {
      this.searchLoad = true;
      let res: any = null;
      if (this.proId === 'InfieldCompany') {
        // 内部渠道公司
        res = await post_company_getPage({
          pageSize: this.pageInfo.pageSize,
          pageNum: this.pageInfo.pageNum,
          name: this.filterText,
        });
      } else if (this.proId === 'ChannelCompany') {
        // 外部渠道公司
        res = await post_channel_getListByName({
          pageSize: this.pageInfo.pageSize,
          pageNum: this.pageInfo.pageNum,
          name: this.filterText,
          departmentOrgId: this.orgId
        });
      }
      this.optionList = res.list;
      this.pageInfo = res;
      console.log(this.optionList);
      this.searchLoad = false;
    }
  }
}
</script>
