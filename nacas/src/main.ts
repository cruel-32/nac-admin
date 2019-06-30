import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

declare module 'vue/types/vue' {
  interface Vue {
    $moment: any
  }
}
Vue.use(require('vue-moment'));
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
