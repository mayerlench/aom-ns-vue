<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
      -->
      <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
      <!-- 
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
      -->
      <ActionItem
        icon="res://menu"
        android:visibility="collapsed"
        @tap="onDrawerButtonTap"
        ios.position="left"
      ></ActionItem>
      <Label class="action-bar-title" text="Asher Yatzar"></Label>
    </ActionBar>
    <ScrollView>
      <StackLayout class="container">
        <Label
          textWrap="true"
          class="formattedTextHebrew"
          v-for="(text, i) in text.hebrew"
          v-bind:key="i"
        >
          <FormattedString>
            <Span :text="getFirstWord(text)" class="fas t-20" />
            <Span :text="text.substring(getFirstWord(text).length) + '\n\n'" class="t-20" />
          </FormattedString>
        </Label>
        <Label
          textWrap="true"
          class="formattedText"
          v-for="(text, i) in text.english"
          v-bind:key="i"
        >
          <FormattedString>
            <Span :text="getFirstWord(text)" class="fas t-18" />
            <Span :text="text.substring(getFirstWord(text).length) + '\n\n'" class="t-20" />
          </FormattedString>
        </Label>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import * as utils from "@/shared/utils";
import SelectedPageService from "@/shared/selected-page-service";
import prayerText from "@/assets/prayers/asherYatzar.json";

export default {
  data() {
    return {
      text: prayerText
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("AsherYatzar");
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
.formattedTextHebrew{
  color: black;
  text-align: left;
}
.formattedTextEnglish{
  color: black;
  text-align: left;
}
</style>
