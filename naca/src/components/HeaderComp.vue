<template>
  <div class="hello">
    <div class="user login" v-if="account && windowSize.x > 640">
      <v-avatar
        :tile="false"
        :size="28"
        color="grey lighten-4"
      ><img :src="account.photoURL" alt="avatar">
      </v-avatar>
      &nbsp;-&nbsp;
      <button @click="signOut()">Logout</button>
    </div>
    <div class="user" v-if="!account">
      <v-btn icon>
        <v-icon @click="signInGoogle()">account_circle</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Firebase } from '../service/Firebase';

@Component
export default class HeaderComp extends Vue {
  @Prop() windowSize: any;
  @Prop() account: any;
  @Emit('setAccount') setAccount(user:any){}
  created(){
    Firebase.auth.onAuthStateChanged((user:any)=>{
      if(user){
        this.setAccount(user.providerData ? user.providerData[0] : user);
      } else {
        this.setAccount(null);
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>