<template>
  <div class="hello">
    <h1>UserInfo 컴포넌트</h1>
    <h2>{{ userInfo? userInfo.email : 'Logout'}}</h2>
    <div class="user" v-if="userInfo">
        <button @click="getUserData()">데이터가져오기</button>
        <button @click="signOut()">로그아웃</button>
      </div>
      <div class="user" v-if="!userInfo">
        <button @click="signInGoogle()">구글아이디로 로그인하기</button>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
@Component
export default class UserComp extends Vue {
  @Prop() userInfo:any;

  msg:string = '성공';
  created(){
    console.log('this.msg : ', this.msg);
  }

  @Emit('getUserData') getUserData(){}
  @Emit('signInGoogle') signInGoogle(){}
  @Emit('signOut') signOut(){}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>