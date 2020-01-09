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
      <Label class="action-bar-title" text="Choose Chapter"></Label>
    </ActionBar>
    <Tabs selectedIndex="0">
      <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
      <TabStrip>
        <TabStripItem tabTextFontSize="25">
          <Label text="Chapter" class="fs-20 text-center"></Label>
        </TabStripItem>
        <TabStripItem class="special">
          <Label text="Book" class="fs-20 text-center"></Label>
        </TabStripItem>
        <TabStripItem class="special">
          <Label text="30 Day Cycle" class="fs-20 text-center"></Label>
        </TabStripItem>
      </TabStrip>

      <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
      <TabContentItem>
        <ListView for="c in chapters" @itemTap="chapterTap" style="height:1250px">
          <v-template>
            <FlexboxLayout flexDirection="row">
              <Label :text="`Chapter ${c}`" class="t-15" />
              <Label :text="gematriya(c, {punctuate: false})" class="t-15 hebrew-chapter-text" />
            </FlexboxLayout>
          </v-template>
        </ListView>
      </TabContentItem>
      <TabContentItem>
        <GridLayout>
         
        </GridLayout>
      </TabContentItem>
      <TabContentItem>
        <GridLayout>
          <Label text="Search Page" class="tab text-center"></Label>
        </GridLayout>
      </TabContentItem>
    </Tabs>
  </Page>
</template>

<script lang="ts">
import * as utils from "@/shared/utils";
import SelectedPageService from "@/shared/selected-page-service";
import prayerText from "@/assets/prayers/asherYatzar.json";
import { range, splitEvery } from "ramda";
import gematriya from "gematriya";

export default {
  data() {
    return {
      items: [
        {
          title: "1",
          footer: "10",
          headerText: "First",
          footerText: "4",
          blah: [
            {
              image: "~/images/a9ff17db85f8136619feb0d5a200c0e4.png",
              text: "Stop"
            },
            {
              text: "Drop",
              image:
                "http://static.srcdn.com/wp-content/uploads/Superman-fighting-Goku.jpg"
            }
          ]
        }
      ],
      gematriya,
      chapters: range(1, 151),
      books: [
        range(1, 42),
        range(42, 73),
        range(73, 90),
        range(90, 107),
        range(107, 151)
      ],
      thirtyDayCycle: [
        range(1, 10),
        range(10, 18),
        range(18, 23),
        range(23, 29),
        range(29, 35),
        range(35, 39),
        range(39, 44),
        range(44, 49),
        range(49, 55),
        range(55, 60),
        range(60, 66),
        range(66, 69),
        range(69, 72),
        range(72, 77),
        range(77, 79),
        range(79, 83),
        range(83, 88),
        range(88, 90),
        range(90, 97),
        range(97, 104),
        range(104, 106),
        range(106, 108),
        range(108, 113),
        range(113, 119),
        range(119, 120),
        range(119, 120),
        range(120, 135),
        range(135, 140),
        range(140, 145),
        range(145, 151)
      ]
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("TehilimList");
  },
  methods: {
    chapterTap: function(c) {
      alert("tapped " + c.item);
    },
    getFirstWord: text => text.split(" ")[0],

    onDrawerButtonTap() {
      utils.showDrawer();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";
.hebrew-chapter-text {
  justify-content: flex-end;
}
.activeChapter {
  background-color: #c5f924;
  color: black;
}
.chapter {
  color: black;
  height: 100px;
  width: 175px;
  margin: 2;
  font-size: 15;
}
.chapterContainer {
  margin-top: 30;
  text-align: center;
}

.fs-20 {
  font-size: 16px;
}
.container {
  background-color: #d5d5d5;
  padding: 15;
}
.content {
  padding: 15;
}
.itemHeaderText {
  font-family: Roboto;
  height: auto;
  color: #333;
  font-size: 23;
  font-weight: 300;
}
</style>
