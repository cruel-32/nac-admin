<template>
  <div class="home">
    관리페이지
    <button @click="test()">Prop 테스트</button>
    <h2>{{ account ? 'Management '+account.email : 'Management Logout'}}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Management extends Vue {
  @Prop() account: any;
  @Prop() query: any;
  @Prop() params: any;
  test(){
    console.log("account : ", this.account);
    console.log("query : ", this.query);
    console.log("params : ", this.params);
    console.log("this : ", this);
  }
}
</script>

<style lang="scss">
</style>