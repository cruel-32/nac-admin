<template>
  <div class="home">
    멤버페이지
    <button @click="signOut()">Prop 테스트</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MemberApi } from '../service/MemberApi';
import { Member } from '../model/member.model';

@Component
export default class MemberView extends Vue {
  @Prop() account:any;
  memberApi:any = MemberApi();
  created(){
    console.log("this.account : ", this.account);
  }
  signOut(){
    // this.memberApi.signOut().then(()=>{
    //   console.log('로그아웃');
    // });
    console.log('Prop : ', this.account);
  }
}
</script>

<style lang="scss">
</style>