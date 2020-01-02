<template lang="html">
       <Page class="page">
            <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Prayers & Reminders"></Label>
        </ActionBar>

        <GridLayout class="page__content">
            <Label class="page__content-icon far" text.decode="&#xf1ea;"></Label>
            <Label class="page__content-placeholder" :text="message"></Label>
        </GridLayout>
        <StackLayout class="bg-image">
            <shadowed-label 
                class="text-white headerText"
                textShadow="2 2 3 rgb(0, 0, 100)"
                fontSize="50" 
                textWrap="true" 
                text="אין עוד מלבדו" 
            />
            <shadowed-label 
                class="text-white headerText" 
                textShadow="2 2 3 rgb(0, 0, 100)"
                fontSize="50"
                textWrap="true" 
                text="THERE IS NONE BUT HIM" 
            /> 
            <shadowed-label 
                class="text-white leiluNishmas" 
                textShadow="2 2 3 rgb(0, 0, 100)" 
                fontSize="30"
                textWrap="true" 
                text="לעילוי נשמת רוחמה חיה פרומא בת דוב פנחס" 
            />
           <Button @tap="$navigateTo(SetAlarm)" text="Set Alarm" class="alarmBtn -rounded-sm"></Button>
        </StackLayout>
        </Page>
</template>

<script lang="ts">
import * as utils from "@/shared/utils";
import SelectedPageService from "@/shared/selected-page-service";
import SetAlarm from "@/views/SetAlarm";

export default {
  data() {
    return {
      SetAlarm
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
  },
  methods: {
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
.headerText {
    margin-top: 40;
}

.bg-image {
  background-size: cover;
  background-image: url("~/assets/images/bg.png");
  background-position: center;
}

.text-white {
  text-align: center;
  color: white;
  font-weight: 500;
}

.leiluNishmas {
  margin-top: 25%;
}

.alarmBtn {
  color: white;
  margin-top: 50px;
  background-color: rgb(58, 57, 57);
  width: 350px;
  border-radius: 20;
}

// Custom styles
</style>
