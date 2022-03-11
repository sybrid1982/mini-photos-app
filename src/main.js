import Vue from 'vue'
import VueRouter from 'vue-router';
import Games from './components/Games.vue'
import Minis from './components/Minis.vue'
import Game from './components/Game.vue'
import Mini from './components/Mini.vue'
import App from './App.vue'
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueMaterial);

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
  render: h => h(App),
}).$mount('#app')
