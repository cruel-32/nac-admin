<template>
  <div class="home">
    모임
    <button @click="historyBack()">뒤로가기</button>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Meetings extends Vue {
  @Prop({default:null}) windowSize: any;
  @Prop({default:null}) currentUser: any;
  @Prop() query: any;
  @Prop() params: any;
  historyBack(){
    window.history.back();
  }
  created(){
    console.log('currentUser : ', this.currentUser);
    console.log('query : ', this.query);
    console.log('params : ', this.params);
  }
}
</script>

<style lang="scss">
</style>