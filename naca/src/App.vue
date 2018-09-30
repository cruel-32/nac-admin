<template>
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
              <router-link :to="{name : item.link}" class="menu">{{item.title}}</router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>web</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { Firebase } from './service/Firebase';
import HeaderComp from './components/HeaderComp.vue';
import { Component, Vue} from 'vue-property-decorator';
import Vuetify from 'vuetify'
import HelloWorld from './components/HelloWorld'
import colors from 'vuetify/es5/util/colors'
Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1,
    secondary: colors.red.lighten4,
    accent: colors.indigo.base
  }
})

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [{
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
      ],
      miniVariant: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
