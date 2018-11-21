<template>
  <v-card>
    <ProgressComp :propData="loading"></ProgressComp>
    <v-card-title>
      <h1 class="headline"><v-icon color="green">insert_chart</v-icon>{{member ? member.name : ''}}님의 통계자료</h1>
    </v-card-title>
    <div>
      <div>최근 나온 벙 : </div>
      <div>벙 나온 횟수 : </div>
      <div>가장 많이 참여한 벙 : </div>
      <div>가장 많이 본 사람 : </div>
      <div>가장 적게 본 사람 : </div>
    </div>
  </v-card>
</template>


<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import { MemberService } from '../service/MemberService';
import { MeetingService } from '../service/MeetingService';
import ProgressComp from '../components/ProgressComp.vue';
import Meeting from './Meetings.vue';

@Component({
  components : {
    ProgressComp
  }
})
export default class MembersParti extends Vue {
  @Prop() windowSize: any;
  @Prop() currentUser: any;
  @Prop() query: any;
  @Prop() params: any;
  @Emit('showSnackbar') showSnackbar(color:string,text:string){}
  @Watch('currentUser')
  changedUser(){
    if(this.currentUser && !this.member){
      this.getAllInfo(this.params.key);
    }
  }
  loading:boolean = false;
  member:any = null;
  created(){
    if(this.currentUser){
      this.getAllInfo(this.params.key);
    }
  }
  getAllInfo(key:any){
    console.log('key : ', key);
    MemberService.getMembers({}).then((membersSnapShot:any)=>{
      const membersObj = membersSnapShot.val();
      const memberKeys = Object.keys(membersObj);
      const memberKey = memberKeys.find((memberKey:any)=>{
        return memberKey === key;
      }) || key;
      const member = membersObj[memberKey];
      this.member = member;
      console.log('membersObj : ', membersObj);
      console.log('member : ', member);
      MeetingService.getMeetings({}).then((meetingsSnapShot:any)=>{
        const meetings = meetingsSnapShot.val();
        console.log('meetings : ', meetings);
        
      }).catch((err:any)=>{
        this.showSnackbar('error','모임 정보를 불러올 수 없습니다');
      })
    }).catch((err:any)=>{
      console.log("err : ", err);
      this.showSnackbar('error','회원 정보를 불러올 수 없습니다');
    });
  }
}
</script>

<style lang="scss">
</style>