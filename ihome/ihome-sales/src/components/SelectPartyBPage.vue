<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IhSelectPageBase } from "ihome-common/ui/packages/select-page/index";

import { post_company_getAll } from "@/api/system/index";

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

  optionList: any = [];
  filterText = "";

  async getSelectList() {
    this.optionList = await post_company_getAll({
      name: this.filterText,
    });
  }
}
</script>