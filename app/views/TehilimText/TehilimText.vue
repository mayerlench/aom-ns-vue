<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton android.systemIcon="ic_menu_back" class="fas" @tap="$navigateBack"></NavigationButton>
      <Label class="action-bar-title" :text="actionTitle"></Label>
    </ActionBar>
    <ScrollView>
      <FlexboxLayout flexWrap="wrap" alignContent="flex-start" class="container">
        <Label textWrap="true" class="formattedText" :text="text"></Label>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import * as utils from "@/shared/utils";
import { nth } from "ramda";
import SelectedPageService from "@/shared/selected-page-service";
import psalms from "@/assets/prayers/psalms.json";
import gematriya from "gematriya";

export default {
  props: ["chapters", "day", "book"],
  data() {
    return {
      actionTitle:
        this.day + this.book ||
        `Chapter  ${this.chapters[0]} - ${gematriya(this.chapters[0], {
          punctuate: false
        })}`,
      text: psalms.chapters.he[this.chapters[0] - 1].join(" ")
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("TehilimText");
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables
.container {
  background-color: #c9c9c9;
  padding: 20;
  direction: rtl;
}

.formattedText {
  color: rgb(0, 0, 0);
  font-size: 26;
  font-weight: 300;
  direction: rtl;
}
</style>
