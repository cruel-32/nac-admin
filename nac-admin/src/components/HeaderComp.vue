<template>
  <div class="hello">
    <h1 class="title">
      <router-link to="/">NACA</router-link>
    </h1>
    <h2>{{ account ? account.email : 'Logout'}}</h2>
    <div class="user" v-if="account">
      <button @click="signOut()">로그아웃</button>
    </div>
    <div class="user" v-if="!account">
      <button @click="signInGoogle()">구글아이디로 로그인하기</button>
    </div>
    <div id="nav">
      <router-link :to="{ name: 'home', params: { account: account } }">Home</router-link> |
      <router-link :to="{ name: 'management', params: { account: account } }">Management</router-link> |
      <router-link :to="{ name: 'statistics', params: { account: account } }">Statistics</router-link> |
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class HeaderComp extends Vue {
  @Prop() account:any;
  @Emit('signInGoogle') signInGoogle(){}
  @Emit('signOut') signOut(){}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>