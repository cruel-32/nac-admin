<template>
  <v-app v-resize="onResize">
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
              <router-link :to="{name : item.link}" class="menu">{{item.title}}</router-link>
          </v-list-tile-content>
          
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app :clipped-left="clipped" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link :to="{name : 'home'}">
        <v-icon v-html="'home'"></v-icon>
      </router-link>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-list-title-sub-title>Login</v-list-title-sub-title> -->
      
      <HeaderComp :account="account" :windowSize="windowSize" v-on:setAccount="setAccount"></HeaderComp>
    </v-toolbar>


    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>

  </v-app>
</template>


<script lang="ts">
import { Firebase } from './service/Firebase';
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import Vuetify from 'vuetify'
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
})

//component
import HeaderComp from './components/HeaderComp.vue';
import HelloWorld from './components/HelloWorld.vue';


@Component({
  components: {
    HeaderComp,HelloWorld
  }
})
export default class App extends Vue {
  windowSize:any = {
    x : 0,
    y : 0
  };
  account:any=null;
  clipped:boolean = true;
  drawer:boolean = false;
  fixed:boolean = false;
  items:any = [{
    icon: 'bubble_chart',
    title: '모임생성',
    link:"meetings"
  },{
    icon: 'bubble_chart',
    title: '회원등록',
    link:"register"
  },{
    icon: 'bubble_chart',
    title: '회원관리',
    link:"management"
  },{
    icon: 'bubble_chart',
    title: '통계보기',
    link:"statistics"
  }
  ];
  miniVariant:boolean = false;
  right:boolean = true;
  rightDrawer:boolean = false;
  title:string = '술없모 관리자';
  mounted(){
    this.onResize();
  }
  setAccount(acc:any){
    this.account = acc;
  }
  onResize(){
    this.windowSize = { x: window.innerWidth, y: window.innerHeight }
  }
}
</script>
<style>
.application a {
  text-decoration: none;
}
</style>