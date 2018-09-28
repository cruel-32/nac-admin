<template>
  <div class="home">
    멤버페이지
    <button @click="signOut()">Prop 테스트</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MemberView extends Vue {
}
</script>

<style lang="scss">
</style>