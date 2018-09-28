<template>
  <div class="home">
    home
    <router-link to="/management">Management</router-link>
    <router-link to="/stat">Statistics</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
}
</script>

<style lang="scss">
.home {
  
}
</style>