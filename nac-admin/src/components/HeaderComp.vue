<template>
  <div class="hello">
    <h1 class="title">
      <router-link to="/">NACA</router-link>
    </h1>
    <h2>{{ account ? account.email : 'Logout'}}</h2>
    <div class="user" v-if="account">
      <button @click="signOut()">로그아웃</button>
    </div>
    <div class="user" v-if="!account">
      <button @click="signInGoogle()">구글아이디로 로그인하기</button>
    </div>
    <div id="nav">
      <router-link :to="{name : 'home', params:{testst:'testst'}, query:{tester:'testerAAA'}}">Home</router-link> |
      <router-link :to="{name : 'management', params:{testst:'testst'}, query:{tester:'testerAAA'}}">Management</router-link> |
      <router-link :to="{name : 'statistics', params:{testst:'testst'}, query:{tester:'testerAAA'}}">Statistics</router-link> |
    </div>
    <div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Firebase } from '../service/Firebase';

@Component
export default class headerComp extends Vue {
  @Prop() account: any;
  @Emit('setAccount') setAccount(user:any){};
  created(){
    Firebase.auth.onAuthStateChanged((user:any)=>{
      this.setAccount(user);
    });
  };
  mounted(){
    console.log('3 mounted this.account : ', this.account);
  };
  signInGoogle():void {
    Firebase.auth.signInWithPopup(Firebase.googleAuthProvider).then((res:any)=>{
      console.log('4 signInWithPopup ::::: ', this.account);
    })
  };
  signOut():void {
    Firebase.auth.signOut().then((user:any)=>{
      console.log('5 signOut ::::: ', this.account);
    });
  };

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>