<template>
  <div class="home">
    모임
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Meetings extends Vue {
  @Prop() account: any;
  @Prop() query: any;
  @Prop() params: any;
}
</script>

<style lang="scss">
</style>