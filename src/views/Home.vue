<template>
  <div class="home">
    <input type="search" placeholder="Bulbasaur" />
    <button type="button">Search</button>
    <br>

    <div class="loader" v-if="isLoading">Loading...</div>
    <div class="pokemon-cards" v-else>
      <div class="pokemon-card" v-for="pokemon in pokedex" :key="pokemon">
        {{ pokemon.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

import { IAPIResponse, ISource } from '@/models/APIResponse';
import { IPokemon } from '@/models/IPokemon';


export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore();
    const isLoading = ref<boolean>(false);
    const nextUrl = ref<string>('');
    const previousUrl = ref<string>('');
    const pokedex = computed<IPokemon[]>(() => store.state.pokemon || []);
    
    onMounted(async () => {
      isLoading.value = true;

      const response = await store.dispatch('getAllPokemon') as IAPIResponse;
      nextUrl.value = response.next;
      previousUrl.value = response.previous;

      loadPokemon(response.results);
      isLoading.value = false;
    });

    async function loadPokemon(data: ISource[]) {

      // Fetch each pokemon data using its url
      const pokemon = await Promise.all(data.map(async _pokemon => await fetchPkmnData(_pokemon.url))) as IPokemon[];

      await store.commit('updatePokemon', pokemon);
      console.dir(store.state.pokemon);
    }

    async function fetchPkmnData(url: string) {
      const res = await fetch(url);
      return await res.json();
    }

    return {
      isLoading,
      pokedex,
      // goToNextPage,
      // goToPreviousPage,
    };
  }
});
</script>

<style lang="scss" scoped>
.pokemon-cards {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 1rem;
}
</style>
