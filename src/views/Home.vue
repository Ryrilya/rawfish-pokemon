<template>
  <div class="home">
    <input type="search" placeholder="Bulbasaur" />
    <button type="button">Search</button>
    
    <div class="loader" v-if="isLoading">
      <img class="loader__img" src="@/assets/spinning-mew.gif" alt="loader gif">
      <h2 class="loader__subtitle">Catching all Pokemon...</h2>
    </div>
    <div class="pokemon-cards" v-else>
      <PokemonCard
        v-for="pokemon in pokedex"
        :key="pokemon.id"
        :pokemon="pokemon"
      ></PokemonCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

import { IAPIResponse, ISource } from '@/models/APIResponse';
import { IPokemon } from '@/models/IPokemon';
import PokemonCard from '@/components/PokemonCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    PokemonCard,
  },
  setup() {
    const store = useStore();
    const isLoading = ref<boolean>(false);
    const nextUrl = ref<string>('');
    const previousUrl = ref<string>('');
    const pokedex = computed<IPokemon[]>(() => store.state.pokemon || []);
    const loaderTimeout = 3000;

    onMounted(async () => {
      isLoading.value = true;

      const response = await store.dispatch('getAllPokemon') as IAPIResponse;
      nextUrl.value = response.next;
      previousUrl.value = response.previous;

      loadPokemon(response.results);
      setTimeout(() => isLoading.value = false, loaderTimeout);
    });

    async function loadPokemon(data: ISource[]) {

      // Fetch each pokemon data using its url
      const pokemon = await Promise.all(data.map(async _pokemon => await fetchPkmnData(_pokemon.url))) as IPokemon[];

      await store.commit('updatePokemon', pokemon);
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
.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__subtitle {
    margin-top: 2rem;
    color: #EFC3D2;
    text-transform: uppercase;
    font-family: "Josefin Sans", sans-serif;
  }
}

.pokemon-cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 3rem;
  margin: 5rem;
}
</style>
