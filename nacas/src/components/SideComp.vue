<template>
  <v-navigation-drawer
    persistent
    temporary
    :mini-variant="miniVariant"
    :clipped="true"
    v-model="drawer"
    enable-resize-watcher
    fixed
    app
    dark
  > 
    <v-btn icon @click="toggleDrawer()">
      <v-icon x-large>clear</v-icon>
    </v-btn>
    <v-card-title dark class="pt-3 pb-3 d-flex">
      <div v-if="currentUser" style="text-align:center;">
        <img class="draw-user" :src="currentUser.providerData[0].photoURL" alt="avatar">
        <span class="d-block title" style="color:#fff;">{{currentUser.displayName}}</span>
        <span class="d-block caption" style="color:#fff;">{{currentUser.email}}</span>
        <v-btn @click="signOut()" color="info">NACA에서 로그아웃</v-btn>
      </div>
      <div v-if="!currentUser" class="pt-4 pb-3" style="text-align:center;">
        <div>
          <v-icon x-large>account_circle</v-icon>
        </div>
        <!-- <v-btn @click="signInGoogle()" color="info">구글 아이디로 회원가입</v-btn> -->
        <v-btn @click="signInGoogle()" color="info">구글 아이디로 로그인</v-btn>
      </div>
    </v-card-title>

    <v-layout row>
      <v-flex>
        <v-card>
          <v-list two-line subheader>
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              avatar
              @click="goPage(item.link)"
            >
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component({})
export default class SideComp extends Vue {
  @Prop() windowSize: any;
  @Prop() currentUser: any;
  @Emit('signInGoogle') signInGoogle(){}
  @Emit('signOut') signOut(){}
  // @Emit('showSnackbar') showSnackbar(){}

  drawer:boolean = false;
  miniVariant:boolean = false;
  items:any = [
    { icon: 'date_range', iconClass: 'amber lighten-1 white--text', title: '모임관리', subtitle: '모임 생성,삭제 출석관리', link:"meetings"},
    { icon: 'people', iconClass: 'amber lighten-1 white--text', title: '회원관리', subtitle: '회원 신규,수정,삭제 관리', link:"members"},
    { icon: 'insert_chart', iconClass: 'amber lighten-1 white--text', title: '통계보기', subtitle: '여러가지 통계 보기', link:"statistics"}
  ];
  toggleDrawer(){
    this.drawer = !this.drawer;
  }
  goPage(link:string){
    this.$router.push(link);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.draw-user {
  display:block;
  width:80px;
  margin:10px auto;
}
</style>