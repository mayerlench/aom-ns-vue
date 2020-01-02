<template lang="html">
<GridLayout rows="auto, *" class="nt-drawer__content">
            <StackLayout row="0" class="nt-drawer__header">
                <Image class="nt-drawer__header-image fas t-10" src="~/assets/images/logo.png"></Image>
            </StackLayout>
        
            <ScrollView row="1" class="nt-drawer__body">
                <StackLayout>
                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Home' ? ' -selected': '')" @tap="onNavigationItemTap(Home)">
                        <!-- <Label col="0" text.decode="&#xf015;" class="nt-icon fas"></Label> -->
                        <Label col="1" text="Home" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'AsherYatzar' ? ' -selected': '')" @tap="onNavigationItemTap(AsherYatzar)">
                        <!-- <Label col="0" text.decode="&#xf7d8;" class="nt-icon fas"></Label> -->
                        <Label col="1" text="Asher Yatzar" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'BirkatHamazon' ? ' -selected': '')" @tap="onNavigationItemTap(BirkatHamazon)">
                        <!-- <Label col="0" text.decode="&#xf7ec;" class="nt-icon fas fa-bread-slice"></Label> -->
                        <Label col="1" text="Birkat Hamazon" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'BirkatHamazonShort' ? ' -selected': '')" @tap="onNavigationItemTap(BirkatHamazonShort)">
                        <!-- <Label col="0" text.decode="&#xf005;" class="nt-icon fas"></Label> -->
                        <Label col="1" text="Birkat Hamazon (Short)" class="p-r-10"></Label>
                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </GridLayout>
</template>

<script lang="ts">
import Home from "@/views/Home";
import AsherYatzar from "@/views/AsherYatzar";
import BirkatHamazon from "@/views/BirkatHamazon";
import BirkatHamazonShort from "@/views/BirkatHamazonShort";
import * as utils from "@/shared/utils";
import SelectedPageService from "@/shared/selected-page-service";
import SetAlarm from "@/views/SetAlarm";

export default {
  mounted() {
    SelectedPageService.getInstance().selectedPage$.subscribe(
      selectedPage => (this.selectedPage = selectedPage)
    );
  },
  data() {
    return {
      Home,
      AsherYatzar,
      BirkatHamazon,
      BirkatHamazonShort,
      SetAlarm,
      selectedPage: ""
    };
  },
  components: {
    Home,
    AsherYatzar,
    BirkatHamazon,
    BirkatHamazonShort,
    SetAlarm
  },
  methods: {
    onNavigationItemTap(component) {
      this.$navigateTo(component, {
        clearHistory: true
      });
      utils.closeDrawer();
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
