<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { post_company_getAll } from "@/api/system/index";
import { IhSelectPageBase } from "../../ihome-package/ui/packages/select-page/index";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByOther extends Vue {
  @Prop({
    default: true,
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