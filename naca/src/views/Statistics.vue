<template>
  <div class="home">
    <h1>통계페이지</h1>
    <p>목표 개발 시작시간 : 데이터베이스가 어느 정도 쌓이는 시점에 스타트</p>

    <h2>Todo List</h2>
    <ol>
      <li>1.월별,연별 모임 횟수 통계</li>
      <li>2.모임 카테고리 횟수 통계</li>
      <li>3.모임 카테고리별 참여 인원 통계</li>
      <li>4.모임 지역별 통계</li>
      <li>5.모임 지역별 참여 인원 통계</li>
      <li>6.나이대별 분포도 및 평균연령 통계
      <li>7.개인별 참여시 가장 많이 같이 오는 사람 및 본 적이 없는 사람 집계</li>
    </ol>
    등등... 구상기획중...
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Statistics extends Vue {
  @Prop() currentUser: any;
  @Prop() query: any;
  @Prop() params: any;

  created(){
    console.log('currentUser : ', this.currentUser);
    console.log('query : ', this.query);
    console.log('params : ', this.params);
  }
}
</script>

<style lang="scss">
</style>