<template>
  <div class="home">
    관리페이지
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Management extends Vue {
  @Prop({default:{x:0,y:0}}) windowSize: any;
  @Prop({default:null}) currentUser: any;
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