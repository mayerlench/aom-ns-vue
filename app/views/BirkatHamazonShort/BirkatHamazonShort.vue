<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
      <ActionItem
        icon="res://menu"
        android:visibility="collapsed"
        @tap="onDrawerButtonTap"
        ios.position="left"
      ></ActionItem>
      <Label class="action-bar-title" text="Birkat Hamazon (Short)"></Label>
    </ActionBar>
    <ScrollView>
      <StackLayout class="container">
        <Label
          textWrap="true"
          class="formattedText"
          v-for="(text, i) in text.hebrewShort"
          v-bind:key="i"
        >
          <FormattedString>
            <Span :text="getFirstWord(text)" class="fas t-20" />
            <Span :text="text.substring(getFirstWord(text).length) + '\n'" class="t-20" />
          </FormattedString>
        </Label>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import * as utils from "@/shared/utils";
import SelectedPageService from "@/shared/selected-page-service";
import prayerText from "@/assets/prayers/birkatHamazon.json";

export default {
  data() {
    return {
      text: prayerText
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("BirkatHamazonShort");
  },
  methods: {
    getFirstWord: text => text.split(" ")[0],

    onDrawerButtonTap() {
      utils.showDrawer();
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables
.container {
  background-color: #d5d5d5;
  padding: 15;
}
.itemHeaderText {
  font-family: Roboto;
  height: auto;
  color: #333;
  font-size: 23;
  font-weight: 300;
}
.formattedText {
  color: black;
  text-align: right;
}
</style>
