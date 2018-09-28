<template>
  <div class="home">
    <router-link to="/management">Management</router-link>
    <router-link to="/stat">Statistics</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  @Prop() account:any;
  created(){
    console.log("this.account : ", this.account);
  }
}
</script>

<style lang="scss">
.home {
  
}
</style>