<template>
  <v-app
    v-resize="onResize"
    app
  >
    <SideComp
      :currentUser="currentUser"
      :windowSize="windowSize"
      v-on:signInGoogle="signInGoogle"
      v-on:signOut="signOut"
      v-on:showSnackbar="showSnackbar"
      ref="sideComp"
    >
    </SideComp>
    <HeaderComp
      :currentUser="currentUser"
      :windowSize="windowSize"
      v-on:signInGoogle="signInGoogle"  
      v-on:signOut="signOut"
      v-on:showSnackbar="showSnackbar"
    >
    </HeaderComp>
    <v-content class="pb-5">
      <router-view v-scroll="onScroll"
      :currentUser="currentUser"
      v-on:showSnackbar="showSnackbar"
      >
      </router-view>
    </v-content>
    <FooterComp
      :currentUser="currentUser"
      :windowSize="windowSize"
      v-on:showSnackbar="showSnackbar"
    >
    </FooterComp>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :multi-line="true"
      :timeout="3000"
    >
      {{ snackbarText }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { DefaultApi } from './service/DefaultApi';
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
  snackbar:boolean = false;
  snackbarColor:string = 'success';
  snackbarText:string = '성공했습니다.'

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
        },
        name: {
          required : (field:any) => `회원 ${field} 을 적으세요`,
          max: (field:any,count:number) => `${field}필드는 ${count} 자를 초과할 수 없습니다`
        },
        address: {
          required : (field:any) => `회원 ${field} 을 적으세요`,
          max: (field:any,count:number) => `${field}필드는 ${count} 자를 초과할 수 없습니다`
        },
        job: {
          required : (field:any) => `회원 ${field} 을 적으세요`,
          max: (field:any,count:number) => `${field}필드는 ${count} 자를 초과할 수 없습니다`
        },
      }
    });
  }
  onResize(){
    this.windowSize = { x: window.innerWidth, y: window.innerHeight }
  }
  setCurrentUser(acc:any){
    this.currentUser = acc;
  }
  created(){
    DefaultApi.Firebase.auth.onAuthStateChanged((user:any)=>{
      if(user){
        this.setCurrentUser(user);
        // user.providerData ? user.providerData[0] : user);
      } else {
        this.setCurrentUser(null);
      }
    });
  }
  signInGoogle():void {
    DefaultApi.Firebase.auth.signInWithPopup(DefaultApi.Firebase.googleAuthProvider).then((res:any)=>{
      this.showSnackbar('info',`어서오세요 ${res.user.displayName}님`);
    })
  }
  signOut():void {
    DefaultApi.Firebase.auth.signOut().then((user:any)=>{
      this.showSnackbar('info',`로그아웃 했습니다.`);
    });
  }
  goPage(link:string):void {
    this.$router.push(link);
  }
  onScroll(){
    
  }
  showSnackbar(color:string,text:string){
    this.snackbar = true;
    this.snackbarColor = color;
    this.snackbarText = text;
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