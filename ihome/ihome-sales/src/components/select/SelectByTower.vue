<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { post_company_getAll } from "@/api/system/index";
import { IhSelectPageBase } from "ihome-common/ui/packages/select-page/index";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectByTower extends Vue {
  @Prop({
    default: false,
  })
  multiple?: boolean;
  @Prop({
    default: true,
  })
  switchHidePage?: boolean;

  optionList: any = [];
  filterText = "";
  async getSelectList() {
    this.optionList = await post_company_getAll({
      name: this.filterText,
    });
  }
}
</script>