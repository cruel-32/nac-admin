<template>
  <div class="home">
    통계페이지
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Statistic extends Vue {
  @Prop() account: any;
  @Prop() query: any;
  @Prop() params: any;
}
</script>

<style lang="scss">
</style>