<template>
  <v-card height="56px" flat>
    <v-speed-dial
      bottom
      left
      fixed
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <v-btn
        slot="activator"
        color="amber darken-2"
        dark
        fab
        @click="$router.go(-1)"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </v-speed-dial>

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
        @click="showSnackbar('info','퀵메뉴 : 신규멤버를 생성합니다')"
        :to="{name : 'memberCreate', query :{
          'joinDate' : this.joinDate
        }}"
      >
        <v-icon>person_add</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        color="indigo"
        @click="showSnackbar('info','퀵메뉴 : 오늘 날짜로 모임을 생성합니다')"
        :to="{path : `/meeting/${this.joinDate}`}"
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

      <v-btn dark flat :to="{name : 'statistics'}">
        <span>statistics</span>
        <v-icon>insert_chart</v-icon>
      </v-btn>
      
    </v-bottom-nav>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
;

@Component({})
export default class FooterComp extends Vue {
  @Prop() windowSize: any;
  @Prop() currentUser: any;
  @Emit('showSnackbar') showSnackbar(color:string,text:string){}
  
  pageNum:number = 4;
  fab:boolean = false;
  joinDate:any = parseInt(this.$moment(new Date()).format('YYYYMMDD'));

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