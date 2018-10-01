<template>
  <v-app v-resize="onResize">
    <SideComp
      :currentUser="currentUser"
      :windowSize="windowSize"
      v-on:signInGoogle="signInGoogle"
      v-on:signOut="signOut"
      ref="sideComp"
    >
    </SideComp>
    <HeaderComp
      :currentUser="currentUser"
      :windowSize="windowSize"
      v-on:signInGoogle="signInGoogle"  
      v-on:signOut="signOut"  
    >
    </HeaderComp>
    <v-content>
      <router-view
      :currentUser="currentUser"
      >
      </router-view>
    </v-content>
    <FooterComp
      :currentUser="currentUser"
      :windowSize="windowSize"
    >
    </FooterComp>
  </v-app>
</template>

<script lang="ts">
import { Firebase } from './service/Firebase';
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import Vuetify from 'vuetify';
Vue.use(Vuetify, {
  theme: {
    primary: "#FF6D00",
    secondary: "#e57373",
    accent: "#9c27b0",
    error: "#D50000",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50"
  }
});

import moment from 'moment';
import VueMomentJS from "vue-momentjs";
Vue.use(VueMomentJS, moment);

//component
import HeaderComp from './components/HeaderComp.vue';
import FooterComp from './components/FooterComp.vue';
import SideComp from './components/SideComp.vue';

@Component({
  components: {
    HeaderComp,FooterComp,SideComp,
  }
})
export default class App extends Vue {
  windowSize:any = {
    x : 0,
    y : 0
  };
  currentUser:any=null;
  drawer:boolean = false;
  mounted(){
    this.onResize();
  }
  onResize(){
    this.windowSize = { x: window.innerWidth, y: window.innerHeight }
  }
  setCurrentUser(acc:any){
    this.currentUser = acc;
  }
  created(){
    Firebase.auth.onAuthStateChanged((user:any)=>{
      if(user){
        this.setCurrentUser(user);
        // user.providerData ? user.providerData[0] : user);
      } else {
        this.setCurrentUser(null);
      }
    });
  }
  signInGoogle():void {
    Firebase.auth.signInWithPopup(Firebase.googleAuthProvider).then((res:any)=>{
      console.log('signInWithPopup ::::: ', res);
    })
  }
  signOut():void {
    Firebase.auth.signOut().then((user:any)=>{
      console.log('signOut ::::: ', user);
    });
  }
  goPage(link:string):void {
    this.$router.push(link);
  }
}
</script>
<style>
.application {
  font-family: 'Roboto', 'Noto Sans KR', sans-serif !important;
}
</style>