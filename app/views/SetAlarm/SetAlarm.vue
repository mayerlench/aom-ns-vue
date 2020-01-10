<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton android.systemIcon="ic_menu_back" class="fas" @tap="$navigateBack"></NavigationButton>
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
          <Label
            v-for="d in daysOptions"
            :key="d.value"
            :text="d.text"
            :col="d.value"
            @tap="onDayTap(d.value)"
            :class="{activeDay :days.includes(d.value)}"
            class="day"
          />
        </GridLayout>
        <Button text="Set Alarm" @tap="onButtonTap" class="setAlarmBtn -rounded -primary" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import * as utils from "@/shared/utils";
import SelectedPageService from "@/shared/selected-page-service";
import {
  android as androidApp,
  iOSApplication
} from "tns-core-modules/application";
import { isIOS } from "tns-core-modules/platform";

export default {
  data() {
    return {
      message: "",
      selectedTime: new Date(),
      daysOptions: [
        { text: "S", value: 0 },
        { text: "M", value: 1 },
        { text: "T", value: 2 },
        { text: "W", value: 3 },
        { text: "T", value: 4 },
        { text: "F", value: 5 },
        { text: "S", value: 6 }
      ],
      days: [],
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
      if (isIOS) {
        const eventStore = new EKEventStore();
        
        const self = this;
        eventStore.requestAccessToEntityTypeCompletion(
          EKEntityType.Event,
          (result, error) => {
            if (result == true) {
              const event = new EKEvent();
              const alarm = new EKAlarm();
              const recurrenceRule = new EKRecurrenceRule({
                daysOfTheMonth: null,
                monthsOfTheYear: null,
                weeksOfTheYear: null,
                daysOfTheYear: null,
                setPositions: null,
                end: null,
                recurrenceWithFrequency: null,
                interval: null,
                daysOfTheWeek: NSArray.arrayWithArray(self.days)
              });

              alarm.setValueForKey(self.message, "title");
              alarm.setValueForKey(0, "type");
              alarm.setValueForKey("Marimba", "soundName");
              event.title = "Ain Od Melvado: " + self.message;
              event.addAlarm(alarm);
              event.addRecurrenceRule(recurrenceRule);
              event.startDate = new Date();
              event
              try {
                eventStore.saveEventSpanError(event, EKSpan.ThisEvent);
              } catch (e) {
                alert(`Error saving event: ${e.message}`);
              }
            } else {
              alert(
                "Access to calendar was rejected. To set alarms you must go to settings to allow reminders"
              )
            }
          }
        )
        return
      }

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
  background-color: #c5f924;
  color: black;
}
.day {
  height: 100px;
  width: 175px;
  margin: 2;
  font-size: 15;
}
.setAlarmBtn {
  margin-top: 50;
}
</style>
