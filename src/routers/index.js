import Vue from 'vue'
import Router from 'vue-router'
import cinemaRouter from './cinema/index'
import movieRouter from './movie/index'
import mineRouter from './mine'
Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL
    base:"miaomiao",
  routes: [
      cinemaRouter,
      movieRouter,
      mineRouter,
      {
          path: '/*',
          redirect: '/movie'
      }
  ]
})
