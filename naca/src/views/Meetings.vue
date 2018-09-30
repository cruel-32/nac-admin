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
  @Prop() account: any;
  @Prop() query: any;
  @Prop() params: any;
  historyBack(){
    window.history.back();
  }
}
</script>

<style lang="scss">
</style>