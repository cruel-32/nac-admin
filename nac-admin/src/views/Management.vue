<template>
  <div class="home">
    관리페이지
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Management extends Vue {
  @Prop() account: any;
  @Prop() query: any;
  @Prop() params: any;
}
</script>

<style lang="scss">
</style>