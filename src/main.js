import App from './App.vue'
import Routes from './routes'
import Vue from 'vue'
import VueRouter from 'vue-router'
import './firebase';
import {firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes
})


Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
}).$mount('#app')
