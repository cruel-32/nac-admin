<template>
  <div class="home">
    통계페이지
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Statistics extends Vue {
  @Prop() currentUser: any;
  @Prop() query: any;
  @Prop() params: any;

  created(){
    console.log('currentUser : ', this.currentUser);
    console.log('query : ', this.query);
    console.log('params : ', this.params);
  }
}
</script>

<style lang="scss">
</style>