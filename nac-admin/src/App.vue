<template>
  <div id="app">
    <headerComp
      :account="account"
      v-on:setAccount="setAccount"
    ></headerComp>
    <router-view :account="account"/>

    <v-app>
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
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        app
        :clipped-left="clipped"
      >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>web</v-icon>
        </v-btn>
        <v-btn icon @click.stop="fixed = !fixed">
          <v-icon>web</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <HelloWorld/>
      </v-content>
      <v-navigation-drawer
        temporary
        :right="right"
        v-model="rightDrawer"
        fixed
        app
      >
        <v-list>
          <v-list-tile @click="right = !right">
            <v-list-tile-action>
              <v-icon>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-footer :fixed="fixed" app>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Firebase } from './service/Firebase';
import { Component, Prop, Vue, Model } from 'vue-property-decorator';

//component
import HeaderComp from './components/HeaderComp.vue';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HeaderComp,HelloWorld
  }
})
export default class App extends Vue {
  account:any=null;
  clipped:boolean = false;
  drawer:boolean = true;
  fixed:boolean = false;
  items:any = [{
    icon: 'bubble_chart',
    title: 'Inspire'
  }];
  miniVariant:boolean = false;
  right:boolean = true;
  rightDrawer:boolean = false;
  title:string = 'Vuetify.js';
  setAccount(acc:any){
    this.account = acc;
  }
}
</script>

<style lang="scss">
</style>
