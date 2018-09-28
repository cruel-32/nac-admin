<template>
  <div id="app">
    <HeaderComp
      :account="account"
      v-on:signInGoogle="signInGoogle"
      v-on:signOut="signOut"
    ></HeaderComp>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Firebase } from './service/Firebase';
import { Component, Prop, Vue, Model } from 'vue-property-decorator';

//component
import HeaderComp from './components/HeaderComp.vue';

@Component({
  components: {
    HeaderComp
  }
})
export default class App extends Vue {
  firebase:any = new Firebase();
  account:any = this.firebase.auth.currentUser;
  constructor(){
    super();
    console.log('this ::::: ', this.account);
    this.firebase.auth.onAuthStateChanged((user:any)=>{
      console.log('onAuthStateChanged user ::::: ', user);
      if (user) {
        this.account = user;
      } else {
        this.account = this.firebase.auth.currentUser;
      }
    });
  };
  signInGoogle():void {
    console.log('signInGoogle ::::: ', this.account);
    this.firebase.auth.signInWithPopup(this.firebase.googleAuthProvider).then((res:any)=>{
      console.log('signInWithPopup ::::: ', this.account);
    })
  };
  signOut():void {
    console.log('signOut ::::: ', this.account);
    this.firebase.auth.signOut().then((res:any)=>{
    console.log('signOut ::::: ', this.account);
    });
  };
}
</script>

<style lang="scss">
</style>
