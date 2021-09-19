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
    component: PokemonList,
    meta: {
      title: 'Rawfish Pokédex | Pokemon List'
    }
  },
  {
    path: '/pokemon-details/:name',
    name: 'PokemonDetails',
    component: PokemonDetails,
    props: true,
    meta: {
      title: 'Rawfish Pokédex | Pokemon Details'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string; // Change tab title
  next();
});

export default router
