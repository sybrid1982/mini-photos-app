import Vue from 'vue'
import VueRouter from 'vue-router';
import Games from './components/Games.vue'
import Minis from './components/Minis.vue'
import Game from './components/Game.vue'
import Mini from './components/Mini.vue'
import App from './App.vue'
import 'vue-material/dist/vue-material.css'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Minis },
  { path: '/games', component: Games },
  { path: '/games/:id', component: Game},
  { path: '/mini/:id', component: Mini}
]

const router = new VueRouter({
  routes
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
