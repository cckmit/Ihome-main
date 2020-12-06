<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { post_company_getAll } from "@/api/system/index";
import { IhSelectPageBase } from "ihome-common/ui/packages/select-page/index";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectByBroker extends Vue {
  @Prop({
    default: false,
  })
  multiple?: boolean;
  @Prop({
    default: true,
  })
  switchHidePage?: boolean;
  @Prop({
    default: null,
  })
  id?: string;

  optionList: any = [];
  filterText = "";
  async getSelectList() {
    this.optionList = await post_company_getAll({
      id: this.id,
      name: this.filterText,
    });
  }
}
</script>