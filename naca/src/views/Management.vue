<template>
  <div class="home">
    관리페이지
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Management extends Vue {
  @Prop() windowSize: any;
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