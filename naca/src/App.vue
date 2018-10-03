<template>
  <v-app v-resize="onResize" app
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
  >
    {{swipeDirection}}
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

import VeeValidate, { Validator } from 'vee-validate';
Vue.use(VeeValidate);

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
  swipeDirection:any = '';
  mounted(){
    this.onResize();

    this.$validator.localize('en', {
      custom : {
        title: {
          required : (field:any) => `모임 ${field}을 적으세요`,
          max: (field:any,count:number) => `${field}필드는 ${count} 자를 초과할 수 없습니다`
        },
        place: {
          required : (field:any) => `모임 ${field}를 선택하세요`,
        },
        contents: {
          required : (field:any) => `모임 ${field}를 선택하세요`,
          min : (field:any, count:number) => `모임 ${field}를 1개 이상 선택하세요`
        },
        date : {
          required : (field:any) => `모임 ${field}를 선택하세요`
        }
      }
    });
  }
  swipe (direction) {
    this.swipeDirection = direction
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
<style lang="scss">
div.application {
  font-family: 'Roboto', 'Noto Sans KR', sans-serif !important;
  &.theme--light {
    background:#fff;
  }
}

</style>