<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton
        ios:visibility="collapsed"
        android.systemIcon="ic_menu_back"
        class="fas"
        @tap="$navigateBack"
      ></NavigationButton>
      <Label class="action-bar-title" text="New Alarm"></Label>
    </ActionBar>
    <ScrollView>
      <StackLayout class="home-panel">
        <Label
          text="Enter a message you would like to see when your alarm rings"
          textWrap="true"
          class="alarmHelpMsg"
        />
        <TextField v-model="message" hint="Alarm Message" class="alarmMessageInput" />
        <TimePicker v-model="selectedTime" />

        <GridLayout columns="*,*,*,*,*,*,*" class="daysContainer">
          <Label text="S" col="0" @tap="onDayTap(1)" :class="{activeDay :days.includes(1)}" />
          <Label text="M" col="1" @tap="onDayTap(2)" :class="{activeDay :days.includes(2)}" />
          <Label text="T" col="2" @tap="onDayTap(3)" :class="{activeDay :days.includes(3)}" />
          <Label text="W" col="3" @tap="onDayTap(4)" :class="{activeDay :days.includes(4)}" />
          <Label text="T" col="4" @tap="onDayTap(5)" :class="{activeDay :days.includes(5)}" />
          <Label text="F" col="5" @tap="onDayTap(6)" :class="{activeDay :days.includes(6)}" />
          <Label text="S" col="6" @tap="onDayTap(7)" :class="{activeDay :days.includes(7)}" />
        </GridLayout>
        <Button text="Set Alarm" @tap="onButtonTap" class="setAlarmBtn -rounded -primary" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import * as utils from "@/shared/utils";
import SelectedPageService from "@/shared/selected-page-service";
import { android as androidApp } from "tns-core-modules/application";

export default {
  data() {
    return {
      message: "",
      selectedTime: new Date(),
      days: []
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("SetAlarm");
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onDayTap(day) {
      if (this.days.includes(day)) this.days = this.days.filter(d => d !== day);
      else this.days = this.days.concat(day);
    },
    onButtonTap() {
      if (!this.message) return alert("Please enter an alarm message");
      
      this.createAlarm();
      this.$navigateBack();
    },
    createAlarm() {
      const Calendar = android.icu.util.Calendar;
      const Intent = android.content.Intent;
      const AlarmClock = android.provider.AlarmClock;
      const ArrayList = java.util.ArrayList;
      const context = androidApp.context;
      var days = new ArrayList<java.lang.Integer>();
      this.days.map(m => days.add(new java.lang.Integer(m)));

      var i = new Intent(AlarmClock.ACTION_SET_ALARM);
      i.putExtra(AlarmClock.EXTRA_SKIP_UI, true);
      i.putExtra(AlarmClock.EXTRA_HOUR, this.selectedTime.getHours());
      i.putExtra(AlarmClock.EXTRA_MINUTES, this.selectedTime.getMinutes());
      i.putExtra(AlarmClock.EXTRA_MESSAGE, this.message);
      i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

      if (!days.isEmpty()) i.putExtra(AlarmClock.EXTRA_DAYS, days);
      context.startActivity(i);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";
.alarmHelpMsg {
  color: rgb(156, 156, 156);
  text-align: center;
  margin-top: 20;
}
.alarmMessageInput {
  margin-top: 30;
}
.daysContainer {
  margin-top: 30;
  text-align: center;
}
.activeDay {
  background-color: rgb(89, 89, 255);
  color: white;
}
.setAlarmBtn {
  margin-top: 50;
}
</style>
