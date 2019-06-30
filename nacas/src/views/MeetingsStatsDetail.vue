<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <ProgressComp :propData="loading"></ProgressComp>
        <v-card style="width: 100%;">
          <v-card-title class="pb-0">
            <span class="headline">
              <v-icon color="green">insert_chart</v-icon> {{this.params.YYYYMM}} 통계자료
              <v-btn flat icon color="pink" @click="viewMonth(-1)">
                <v-icon>arrow_back_ios</v-icon>
              </v-btn>
              <v-btn flat icon color="pink" @click="viewMonth(1)">
                <v-icon>arrow_forward_ios</v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-card-text class="pa-0">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4 mb-3>
                    <strong class="cus-title">이달의 벙 목록</strong>
                    <v-layout wrap mt-1>
                      <v-flex xs12 sm12 md12 v-for="(meeting,index) in dates" :key="index">
                        {{$moment(meeting).format('YYYY.MM.DD')}} -
                        <router-link v-if="meetingsMonth[meeting]" :to="{path:`/meeting/${meeting}`}">
                           {{meetingsMonth[meeting].title}}
                        </router-link>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex xs12 sm6 md4 mb-3>
                    <strong class="cus-title">이달의 참석왕</strong>
                    <v-layout wrap mt-1>
                      <v-flex xs6 sm6 md6 v-for="bestMember in bestMembers.slice(0,10)" :key="bestMember.content">
                        <router-link :to="{path:`/statistics/membersParti/${bestMember.member}`}">
                           <span>{{bestMember.name}}</span>
                        </router-link>  
                        <span>: <strong>{{bestMember.count}}</strong>번 </span>
                      </v-flex>
                    </v-layout>
                    <!-- <router-link v-if="firstMeeting" :to="{path:firstMeeting.link}">
                      {{firstMeeting.date}} {{firstMeeting.name}}
                    </router-link>
                    <div v-else>
                      <span>참여한 벙이 없습니다.</span>
                    </div> -->
                  </v-flex>

                  <v-flex xs12 sm6 md4 mb-3>
                    <strong class="cus-title">이달의 카테고리 순위</strong>
                    <v-layout wrap mt-1>
                      <v-flex xs6 sm6 md6 v-for="bestCategory in bestCategories" :key="bestCategory.content">
                        <span>{{bestCategory.name}} : <strong>{{bestCategory.count}}</strong>번 </span>
                      </v-flex>
                    </v-layout>

                    <!-- <router-link v-if="firstMeeting" :to="{path:firstMeeting.link}">
                      {{firstMeeting.date}} {{firstMeeting.name}}
                    </router-link>
                    <div v-else>
                      <span>참여한 벙이 없습니다.</span>
                    </div> -->
                  </v-flex>
                  <v-flex xs12 sm6 md4 mb-3>
                    <strong class="cus-title">이달의 장소</strong>
                    <v-layout wrap mt-1>
                      <v-flex xs6 sm6 md6 v-for="bestPlace in bestPlaces" :key="bestPlace.content">
                        <span>{{bestPlace.name}} : <strong>{{bestPlace.count}}</strong>번 </span>
                      </v-flex>
                    </v-layout>
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
import { PlaceService } from '../service/PlaceService';
import { ContentService } from '../service/ContentService';
import ProgressComp from '../components/ProgressComp.vue';

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
  date:any = this.$moment(new Date).format('YYYY-MM-DD');
  dates:any = [];
  meetingsMonth:any = null;
  pickerDate:any = null;

  contents:any = [];
  places:any = [];
  memberList:any = [];

  bestCategories:Array<any> =[];
  bestPlaces:Array<any> =[];
  bestMembers:Array<any> =[];


  @Watch('params.YYYYMM')
  monthChange(){
    const {YYYYMM} = this.params;
    this.getMeetingsMonth(this.$moment(YYYYMM)['_d']);
  }

  created(){
    const {YYYYMM} = this.params;
    this.getMeetingsMonth(this.$moment(YYYYMM)['_d']);
  }
  reset(){
    this.dates = [];
    this.meetingsMonth = null;
    this.pickerDate = null;
    this.contents = [];
    this.places = [];
    this.memberList = [];
    this.bestCategories =[];
    this.bestPlaces = [];
    this.bestMembers =[];
  }
  getMeetingsMonth(pDate:Date=new Date()){
    this.reset();
    this.loading = true;
    const date:string = this.$moment(pDate).format('YYYYMM');
    MeetingService.getMeetings({
      startAt : `${date}01`,
      endAt : `${date}32`
    })
    .then((res:any)=>{
      if(res.val()){
        res = res.val();
        this.meetingsMonth = res;
      } else {
        this.meetingsMonth = {};
      }
      // this.getMembers();
      this.getContents();
    });
  }

  viewMonth(month){
    const {YYYYMM} = this.params;
    this.$router.push(`/statistics/meetingsStatsDetail/${this.$moment(YYYYMM).add(month, 'months').format('YYYY-MM')}`)
  }

  getContents(){
    ContentService.getContents()
    .then((res:any)=>{
      this.contents = res.val();
      this.getPlaces();
    })
  }

  getPlaces(){
    PlaceService.getPlaces()
    .then((res:any)=>{
      this.places = res.val();
      this.getMembers();
    })
  }


  getMembers(){
    if(this.currentUser){
      MemberService.getMembers()
      .then((snapShot:any)=>{
        this.loading = false;
        if(snapShot){
          this.memberList= snapShot.val();
          this.dates = Object.keys(this.meetingsMonth);
          this.dates.forEach((meetingKey:any)=>{
            const meeting = this.meetingsMonth[meetingKey];

            meeting.contents.forEach(content=>{
              const bestCategory = this.bestCategories.find((item:any)=> item.content === content);
              if(bestCategory){
                bestCategory.count++
              } else {
                this.bestCategories.push({
                  content,
                  count : 1,
                  name : this.contents.find((c:any)=>c.key == content).name
                })
              }
            });

            meeting.members.forEach(member=>{
              const bestMember = this.bestMembers.find((item:any)=> item.member === member);
              if(bestMember){
                bestMember.count++
              } else {
                const m = this.memberList[member];
                if(m){
                  this.bestMembers.push({
                    member,
                    count : 1,
                    name : m['name']
                  })
                }
              }
            });


            const bestPlace = this.bestPlaces.find((item:any)=> item.place === meeting.place);
            if(bestPlace){
              bestPlace.count++
            } else {
              this.bestPlaces.push({
                place : meeting.place,
                count : 1,
                name : this.places.find((c:any)=>c.key == meeting.place).name
              })
            }
          })


          this.bestCategories.sort((a,b)=> b.count - a.count);
          this.bestMembers.sort((a,b)=> b.count - a.count);
          this.bestPlaces.sort((a,b)=> b.count - a.count);

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

.list {
  list-style-type: none;
}
</style>