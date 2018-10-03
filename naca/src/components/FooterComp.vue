<template>
  <v-card height="56px" flat>
    <v-bottom-nav
      :active.sync="pageNum"
      :value="true"
      fixed
      shift
      :color="pageColor"
    >
      <v-btn dark flat :to="{name : 'register'}">
        <span>Register</span>
        <v-icon>person_add</v-icon>
      </v-btn>

      <v-btn dark flat :to="{name : 'meetings'}">
        <span>Meetings</span>
        <v-icon>date_range</v-icon>
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
  pageNum:number = 4;
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
</style>