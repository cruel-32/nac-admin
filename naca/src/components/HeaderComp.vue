<template>
  <v-toolbar app :clipped-left="true" dark>
    <!-- <v-btn flat icon Outline @click="historyBack()" >
      <v-icon>arrow_back_ios</v-icon>
    </v-btn> -->
    <v-toolbar-side-icon @click.stop="toggleSideCompDrawer()"></v-toolbar-side-icon>
    <router-link :to="{name : 'home'}">
      <v-icon v-html="'home'"></v-icon>
    </router-link>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-list-title-sub-title>Login</v-list-title-sub-title> -->
    <div class="user login" v-if="currentUser">
      <v-avatar
        :tile="false"
        :size="24"
        color="grey lighten-4"
      >
        <v-btn icon :to="{name : 'account'}">
          <img :src="currentUser.providerData[0].photoURL" :alt="currentUser.email">
        </v-btn>
      </v-avatar>
      <v-btn class="logout hidden-xs-only" @click="signOut">로그아웃</v-btn>
    </div>
    <div class="user" v-if="!currentUser">
      <v-btn icon>
        <v-icon @click="signInGoogle()">account_circle</v-icon>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Firebase } from '../service/Firebase';

@Component
export default class HeaderComp extends Vue {
  @Prop() windowSize: any;
  @Prop() currentUser: any;
  @Emit('signInGoogle') signInGoogle(user:any){}
  @Emit('signOut') signOut(user:any){}
  @Emit('showSnackbar') showSnackbar(color:string,text:string){}

  title:string = 'NACA System';
  // historyBack(){
  //   this.$router.go(-1);
  // }
  toggleSideCompDrawer(){
    if(this.$parent.$parent.$refs['sideComp']){
      this.$parent.$parent.$refs['sideComp']['drawer'] = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>