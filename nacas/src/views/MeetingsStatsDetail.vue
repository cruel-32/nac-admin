<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <ProgressComp :propData="loading"></ProgressComp>
        <v-card style="width: 100%;">
          <v-card-title class="pb-0">
            <span class="headline">
              <v-icon color="green">insert_chart</v-icon> {{this.params.YYYYMM}} 통계자료
            </span>
          </v-card-title>
          <v-card-text class="pa-0">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <strong class="cus-title">카테고리 순위</strong>
                    <!-- <router-link v-if="firstMeeting" :to="{path:firstMeeting.link}">
                      {{firstMeeting.date}} {{firstMeeting.name}}
                    </router-link>
                    <div v-else>
                      <span>참여한 벙이 없습니다.</span>
                    </div> -->
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { MeetingService } from '../service/MeetingService';
import { MemberService } from '../service/MemberService';
import ProgressComp from '../components/ProgressComp.vue';
import moment from 'moment';

@Component({
  components : {
    ProgressComp
  }
})
export default class MeetingsStats extends Vue {
  @Prop() currentUser: any;
  @Prop() query: any;
  @Prop() params: any;
  @Emit('showSnackbar') showSnackbar(color:string,text:string){}

  loading:boolean = false;
  date:any = moment(new Date).format('YYYY-MM-DD');
  dates:any = null;
  meetingsMonth:any = null;
  pickerDate:any = null;

  created(){
    console.log('params : ', this.params);
    const {YYYYMM} = this.params;
    this.getMeetingsMonth(moment(YYYYMM)['_d']);
  }

  changePickMonth(){
    console.log('changePickMonth')
  }

  getMeetingsMonth(pDate:Date=new Date()){
    this.loading = true;
    const date:string = moment(pDate).format('YYYYMM');
    this.dates = [];  
    MeetingService.getMeetings({
      startAt : `${date}01`,
      endAt : `${date}32`
    })
    .then((res:any)=>{
      if(res.val()){
        res = res.val();
        this.meetingsMonth = res;
        this.dates = Object.keys(res).map((key:any)=>{
          return moment(key.toString()).format('YYYY-MM-DD')
        })
        console.log('this.dates : ', this.dates);
      } else {
        this.meetingsMonth = {};
      }
      this.getMembers();
    });
  }
  getMembers(){
    if(this.currentUser){
      MemberService.getMembers()
      .then((snapShot:any)=>{
        this.loading = false;
        if(snapShot){
          let memberList= snapShot.val();
          console.log('memberList : ', memberList);
        }
      });
    } else {
      this.showSnackbar('error','로그인이 필요합니다');
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