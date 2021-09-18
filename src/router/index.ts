import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import PokemonList from '../views/PokemonList.vue';
import PokemonDetails from '../views/PokemonDetails.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/pokemon-list'
  },
  {
    path: '/pokemon-list',
    name: 'PokemonList',
    component: PokemonList
  },
  {
    path: '/pokemon-details/:name',
    name: 'PokemonDetails',
    component: PokemonDetails,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
