<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <ProgressComp :propData="meetingsMonth"></ProgressComp>
        <v-btn flat icon Outline fixed left color="black" style="z-index:2; left: 2px; top: 60px;" @click="historyBack()">
          <v-icon>undo</v-icon>
        </v-btn>
        <v-card class="pt-3 pa-3">
          <h1 class="headline">
            <v-icon color="#009688">date_range</v-icon>
            이달의 모임(벙) 목록
          </h1>
          <p class="pt-2 caption">
            *모임을 생성 혹은 수정,삭제하고나 하는 날짜를 클릭하세요<br/>
            *이미 모임이 있는 날은 초록색으로 마킹되어 있습니다<br/>
          </p>
          <!-- v-model="dates" -->
          <v-date-picker
            full-width
            v-model="date"
            ref="picker"
            event-color="green lighten-1"
            :reactive="true"
            :events="checkMeetingDay"
            :picker-date.sync="pickerDate"
            locale="ko"
          ></v-date-picker>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { MeetingService } from '../service/MeetingService';
import ProgressComp from '../components/ProgressComp.vue';

@Component({
  components : {
    ProgressComp
  }
})
export default class Meeting extends Vue {
  @Prop() currentUser: any;
  @Prop() windowSize: any;
  @Prop() query: any;
  @Prop() params: any;
  @Emit('showSnackbar') showSnackbar(color:string,text:string){}

  @Watch('pickerDate')
  dateChanged(val:any,val2:any){
    if(val.length > 4){
      this.getMeetingsMonth(this.$moment(val)._d);
    }
  }
    
  @Watch('date')
  pickDay(pick:any,prev:any){
    const today:any = this.$moment(new Date()).format('DD');
    const pickDay = pick.split('-')[2];

    if(pick.length == 10
        && (pickDay != prev.split('-')[2])
        && (pickDay != today)
      )
    {
      const meetingAndKey = this.findMeetingAndKeyByDateNumber(parseInt(this.$moment(pick).format('YYYYMMDD')));
      const path = `/meeting/${meetingAndKey.key ? meetingAndKey.key :'create'}`
      if(this.currentUser){
        this.$router.push({
          path,
          query : {
            'date' : meetingAndKey.meeting.date
          }
        })
      } else {
        this.showSnackbar('error','로그인이 필요합니다');
      }
    }
  }
  date:any = '';//this.$moment(new Date).format('YYYY-MM-DD');
  dates:any = null;
  meetingsMonth:any = null;
  pickerDate:any = null;

  historyBack(){
    this.$router.go(-1);
  }

  getMeetingsMonth(pDate:Date=new Date()){
    const date:string = this.$moment(pDate).format('YYYYMM');
    const that = this;
    this.dates = [];  
    MeetingService.getMeetings({
      startAt : parseInt(`${date}01`),
      endAt : parseInt(`${date}32`)
    })
    .then((res:any)=>{
      if(res){
        this.meetingsMonth = res;
        this.dates = Object.keys(res).map((key:any)=>{
          return that.$moment(res[key].date.toString()).format('YYYY-MM-DD')
        })
      } else {
        this.meetingsMonth = {};
      }
    });
  }
  checkMeetingDay(event:any){
    return this.dates ? 
      this.dates.find((date:any)=>{
        return date == event;
      })
      : false
  }
  findMeetingAndKeyByDateNumber(date:number){
    let meeting,key;
    for(let meetingKey in this.meetingsMonth){
      if(this.meetingsMonth[meetingKey]['date'] === date){
        meeting = this.meetingsMonth[meetingKey];
        key = meetingKey;
        break
      } else {
        continue;
      }
    }
    if(!meeting){
      meeting = {
        date
      }
    }
    return {
      meeting,
      key
    }
  }
}
</script>

<style scoped lang="scss">
.v-card {
  box-shadow:none;
}
.v-btn--right {
    right: 26px;
}
</style>