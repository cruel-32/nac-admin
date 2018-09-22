<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="hello">
      <h4>아이디</h4>
      <input type="text"></input>
      <h4>패스워드</h4>
      <input type="password"></input>
      <div>
        <button @click="setData()">가입하기</button>
      </div>
    </div>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener">typescript</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha" target="_blank" rel="noopener">unit-mocha</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch" target="_blank" rel="noopener">e2e-nightwatch</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>


<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import firebase from 'firebase';

// @Component
// export default class HelloWorld extends Vue {
//   @Prop() private msg!: string;
//   message: string = 'Hello!'
//   SignUp(): void {
//     window.alert(this.message)
//   }
// }

  const HelloWorld = Vue.extend({
    data(){
      return {
        msg: 'Fucking'
      }
    },
    methods:{
      // `this` 때문에 리턴 타입에 어노테이션이 필요합니다.
      SignUp():string {
        return this.msg + ' world'
      },
      setData():void {
        this.msg = this.SignUp();
      }
    }
  });
  export default HelloWorld;

// var config = {
//   apiKey: "AIzaSyBgwBKKnFovKtJJPUKwenS-AgQ59zwuhuk",
//   authDomain: "nac-admin.firebaseapp.com",
//   databaseURL: "https://nac-admin.firebaseio.com",
//   projectId: "nac-admin",
//   storageBucket: "nac-admin.appspot.com",
//   messagingSenderId: "858334622417"
// };
// firebase.initializeApp(config)
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>