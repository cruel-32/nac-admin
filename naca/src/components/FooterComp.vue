<template>
  <v-card height="56px" flat>

    <v-speed-dial
      v-model="fab"
      bottom
      right
      fixed
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <v-btn
        v-model="fab"
        slot="activator"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        color="green"
        @click="showSnackbar('info','오늘 날짜로 빠르게 신규멤버를 생성합니다')"
        :to="{name : 'meetingCreate', query :{
          'date' : parseInt($moment(new Date()).format('YYYYMMDD'))
        }}"
      >
        <v-icon>person_add</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        color="indigo"
        @click="showSnackbar('info','오늘 날짜로 빠르게 모임을 생성합니다')"
        :to="{name : 'meetingCreate', query :{
          'date' : parseInt($moment(new Date()).format('YYYYMMDD'))
        }}"
      >
        <v-icon>add_alarm</v-icon>
      </v-btn>
    </v-speed-dial>


    <v-bottom-nav
      :active.sync="pageNum"
      :value="true"
      fixed
      shift
      :color="pageColor"
    >
      <v-btn dark flat :to="{name : 'meetings'}">
        <span>Meetings</span>
        <v-icon>date_range</v-icon>
      </v-btn>

      <v-btn dark flat :to="{name : 'members'}">
        <span>Members</span>
        <v-icon>people</v-icon>
      </v-btn>

      <v-btn dark flat :to="{name : 'account'}">
        <span>My Account</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
      
    </v-bottom-nav>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component({})
export default class FooterComp extends Vue {
  @Prop() windowSize: any;
  @Prop() currentUser: any;
  @Emit('showSnackbar') showSnackbar(color:string,text:string){}
  
  pageNum:number = 4;
  fab:boolean = false;

  get pageColor() {
    switch (this.pageNum) {
      case 0 : return 'blue-grey'
      case 1 : return 'teal'
      case 2 : return 'brown'
      default : return '#666666'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-speed-dial--fixed {
  z-index: 5;
}
.v-speed-dial--bottom:not(.v-speed-dial--absolute) {
  bottom: 36px;
}
</style>