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
      <Label class="action-bar-title" text="Set Alarm"></Label>
    </ActionBar>
    <ScrollView>
        <Button class="-primary" @tap="createAlarm" text="Set Alarm"></Button>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import * as utils from "@/shared/utils";
import SelectedPageService from "@/shared/selected-page-service";

export default {
  data() {
    return {};
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("SetAlarm");
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    createAlarm() {
      const Intent = android.content.Intent;
      const AlarmClock = android.provider.AlarmClock;
      var i = new Intent(AlarmClock.ACTION_SET_ALARM);
      i.putExtra(AlarmClock.EXTRA_SKIP_UI, true);
      i.putExtra(AlarmClock.EXTRA_HOUR, 18);
      i.putExtra(AlarmClock.EXTRA_MINUTES, 58);
      i.putExtra(AlarmClock.EXTRA_MESSAGE, "HELLLO");
    //  i.putExtra(AlarmClock.EXTRA_DAYS, days);
      i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";
</style>
