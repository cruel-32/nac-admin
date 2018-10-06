<template>
  <div class="home-wrap">
    <div class="cell">
      <div class="my-card" v-for="item in items">
        <button class="cust-btn" @click="goPage(item.link)">
          <v-icon :color="item.color">{{item.icon}}</v-icon>
          <span class="title d-block">{{item.text}}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  items:any = [
    {text:"모임관리", link:"/meeting", icon:"date_range", color:"amber" },
    {text:"회원등록", link:"/register", icon:"person_add", color:"amber" },
    {text:"회원관리", link:"/management", icon:"people", color:"amber" },
    {text:"통계보기", link:"/statistic", icon:"insert_chart", color:"amber" },
  ];
  goPage(link:string){
    this.$router.push(link);
  }
}
</script>

<style scoped lang="scss">
.home-wrap {
  background: #fff !important;
  display:table;
  table-layout:fixed;
  width:100%;
  height: calc(100% - 100px);
  .cell {
    display:table-cell;
    text-align:center;
    vertical-align:middle;
    .my-card {
      display:inline-block;
      width: 48%;
      margin: 1% 1% 3% 1%;
      .cust-btn {
        width:100%;
        height:100%;
        text-align:center;
        .v-icon {
          font-size:9rem;
        }
      } 
      .title {
        color:#666;
        font-family: 'Noto Sans KR', sans-serif !important;
      }
    }
  }
}
</style>