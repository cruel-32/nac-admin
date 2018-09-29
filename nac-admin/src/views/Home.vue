<template>
  <div class="home">
    <router-link to="/meetings" tag="div" class="menu">
       <a>모임생성</a>
    </router-link>
    <router-link to="/register" tag="div" class="menu">
       <a>회원등록</a>
    </router-link>
    <router-link to="/management" tag="div" class="menu">
       <a>회원관리</a>
    </router-link>
    <router-link to="/statistics" tag="div" class="menu">
       <a>통계보기</a>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
}
</script>

<style lang="scss">
.home {
  
}
</style>