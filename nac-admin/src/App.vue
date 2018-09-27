<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">Statistics</router-link> |
      <router-link to="/about">Admin</router-link>
    </div>
    <UserComp
      :userInfo="userInfo"
      v-on:signInGoogle="signInGoogle"
      v-on:signOut="signOut"
      v-on:getUserData="getUserData"
    ></UserComp>
    <router-view/>
  </div>
</template>

<script lang="ts">
// firebase 셋팅
// import firebase from 'firebase';
// import firebaseui from 'firebaseui';
// const config = {
//   apiKey: 'AIzaSyBgwBKKnFovKtJJPUKwenS-AgQ59zwuhuk',
//   authDomain: 'nac-admin.firebaseapp.com',
//   databaseURL: 'https://nac-admin.firebaseio.com',
//   projectId: 'nac-admin',
//   storageBucket: 'nac-admin.appspot.com',
//   messagingSenderId: '858334622417',
// };
// firebase.initializeApp(config);
// const database = firebase.database();
// const auth = firebase.auth();
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// const actionCodeSettings = {
//   url: 'https://nac-admin.firebaseio.com/finishSignUp',
//   handleCodeInApp: true,
//   iOS: {
//     bundleId: 'com.nac-admin.firebaseio.ios'
//   },
//   android: {
//     packageName: 'com.nac-admin.firebaseio.android',
//     installApp: true,
//     minimumVersion: '12'
//   }
// };
// firebase 셋팅끝

// import Firebase from './service/firebase.vue';
// const Firebase = require('./service/firebase');
import { F } from './service/Firebase';
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import UserComp from './components/UserComp.vue';

console.log('F : ', F);

@Component({
  components: {
    UserComp
  }
})
export default class App extends Vue {
  userInfo:any = ''//firebase.auth().currentUser;
  created(){
    F.init();
    F.auth.onAuthStateChanged((user:any) => {
      console.log('created user : ', user);
      if(user){
        console.log('user.providerData[0] : ', user.providerData[0]);
      }
      if(!this.userInfo) {
        this.userInfo = user;
      }
    });
  };
  signInGoogle():void {
    F.firebase.auth().signInWithPopup(F.googleAuthProvider).then((res:any)=>{
      console.log('signInGoogle res : ', res);
    },(error:any)=>{
      console.log('signInGoogle error : ', error);
    })
  };
  signOut():void {
    F.firebase.auth().signOut().then((res:any)=>{
      console.log('signOut res : ', res);
      this.userInfo = F.firebase.auth().currentUser;
    }, (error:any)=>{
      console.error('signOut Error', error);
    });
  };
  getUserData():void {
    let ref = F.database.ref('members/chltmdgml');
    console.log('getData ref : ', ref);
    ref.on('value', (data:any) => {
      if(data){
        console.log('getData data : ', data.val());
      }
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
