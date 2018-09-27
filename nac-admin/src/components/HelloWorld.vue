<template>
  <div class="hello">
    <h2>{{ userInfo? userInfo.email : 'Logout'}}</h2>
    <!-- <div class="hello">
      <div class="user" v-if="userInfo">
        <button @click="getData()">데이터가져오기</button>
        <button @click="signout()">로그아웃</button>
      </div>
      <div class="user" v-if="!userInfo">
        <button @click="signInGoogle()">구글아이디로 로그인하기</button>
      </div>
      <div class="add">
        등록
        <input type='text' v-model="name"/>
        <input type='text' v-model="address"/>
        <button @click="setData()">데이터등록</button>
      </div>
    </div> -->
    <!-- <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener">typescript</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha" target="_blank" rel="noopener">unit-mocha</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch" target="_blank" rel="noopener">e2e-nightwatch</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  </div>
</template>


<script lang="ts">
  import { Component, Prop, Vue, Model } from 'vue-property-decorator';
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
  //   // URL you want to redirect back to. The domain (www.example.com) for this
  //   // URL must be whitelisted in the Firebase Console.
  //   url: 'https://nac-admin.firebaseio.com/finishSignUp',
  //   // This must be true.
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

  @Component
  export default class HelloWorld extends Vue {
    // @Model('change', { type: Boolean }) checked!: boolean;
    name: string = '';
    address: string = '';
    userInfo:any = '';
    // userInfo:any = firebase.auth().currentUser;

    // created(){
    //   auth.onAuthStateChanged(user => {
    //     if(user){
    //       console.log('user.providerData[0] : ', user.providerData[0]);
    //     }
    //     if(!this.userInfo) {
    //       this.userInfo = user;
    //     }
    //   });
    // };
    // signInGoogle():void {
    //   firebase.auth().signInWithPopup(googleAuthProvider).then((res)=>{
    //     console.log('signInGoogle res : ', res);
    //   },(error)=>{
    //     console.log('signInGoogle error : ', error);
    //   })
    // }
    // signout():void {
    //   firebase.auth().signOut().then((res)=>{
    //     console.log('signout res : ', res);
    //     this.userInfo = firebase.auth().currentUser;
    //   }, (error)=>{
    //     console.error('Sign Out Error', error);
    //   });
    // }
    // setData():void {
    //   console.log('setData this.name : ', this.name);
    //   console.log('setData this.address : ', this.address);
    //   if(this.userInfo){
    //     firebase.database().ref('members/uid-cshee8508/').update({
    //       name: this.name,
    //       address: this.address,
    //     },(error)=>{
    //       if(error){
    //         console.log('setData error : ', error);
    //       } else {
    //         console.log('setData success');
    //       }
    //     });
    //   }
    // }
    // getData():void {
    //   let ref = database.ref('members/chltmdgml');
    //   console.log('getData ref : ', ref);
    //   ref.on('value', (data) => {
    //     if(data){
    //       console.log('getData data : ', data.val());
    //     }
    //   });
    // }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>