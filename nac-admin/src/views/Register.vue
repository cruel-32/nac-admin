<template>
  <div class="home">
    등록하기
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Register extends Vue {
  @Prop() account: any;
  @Prop() query: any;
  @Prop() params: any;
}
</script>

<style lang="scss">
</style>