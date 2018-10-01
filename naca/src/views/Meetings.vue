<template>
  <div class="meetings">
    <v-btn flat icon Outline color="black" @click="historyBack()">
      <v-icon>undo</v-icon>
    </v-btn>
    <v-card class="pa-3">
      <div class="subheading">이달의 벙 목록</div>
      <v-date-picker full-width v-model="dates" :reactive="true"></v-date-picker>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { MeetingService } from '../service/MeetingService';
import { Meeting }  from '../model/meeting.model';

@Component
export default class Meetings extends Vue {
  @Prop() currentUser: any;
  @Prop() windowSize: any;
  @Prop() query: any;
  @Prop() params: any;
  @Watch('currentUser')
  changeCurrentUser() {
    this.getDates();
  }

  dates:any = null;
  today:Date =new Date;
  meeting:Meeting = new Meeting;

  historyBack(){
    this.$router.go(-1);
  }
  getDates(date:any=this.$moment(new Date).format('YYYY')){
    if(this.currentUser){
      MeetingService.getIdToken(this.currentUser).then((auth:any)=>{
        // console.log('auth : ', auth);
        MeetingService.getMeetings({
          'startAt' : `${date}`,
          auth,
        }).then(res=>{
          console.log("res : ", res);
        })
      });
    }
  }
}
</script>

<style lang="scss">
</style>