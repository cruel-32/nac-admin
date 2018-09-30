<template>
  <div id="app">
    <headerComp
      :account="account"
      v-on:setAccount="setAccount"
    ></headerComp>
    <router-view :account="account"/>
  </div>
</template>

<script lang="ts">
import { Firebase } from './service/Firebase';
import { Component, Prop, Vue, Model } from 'vue-property-decorator';

//component
import headerComp from './components/HeaderComp.vue';

@Component({
  components: {
    HeaderComp
  }
})
export default class App extends Vue {
  account:any=null;
  setAccount(acc:any){
    this.account = acc;
  }
}
</script>

<style lang="scss">
</style>
