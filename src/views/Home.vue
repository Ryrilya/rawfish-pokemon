<template>
  <main class="home">
    <h2 class="home__page-title">Pokemon List</h2>

    <div class="loader" v-if="isLoading">
      <img
        class="loader__img"
        src="@/assets/spinning-mew.gif"
        alt="loader gif"
      />
      <h2 class="loader__subtitle">Catching all Pokemon...</h2>
    </div>

    <section class="home__main-content" v-show="!isLoading">
      <div class="home__pagination">
        <button
          class="btn btn--primary"
          type="button"
          @click="changePage(false)"
          :disabled="!prevPageUrl"
        >
          <fa icon="arrow-left"></fa>
          Previous
        </button>
        <button
          class="btn btn--primary"
          type="button"
          @click="changePage"
          :disabled="!nextPageUrl"
        >
          Next
          <fa icon="arrow-right"></fa>
        </button>
      </div>

      <div class="home__pokemon-cards">
        <PokemonCard
          v-for="pokemon in pokedex"
          :key="pokemon.id"
          :pokemon="pokemon"
        ></PokemonCard>
      </div>

      <div class="home__pagination">
        <button
          class="btn btn--primary"
          type="button"
          @click="changePage(false)"
          :disabled="!prevPageUrl"
        >
          <fa icon="arrow-left"></fa>
          Previous
        </button>
        <button
          class="btn btn--primary"
          type="button"
          @click="changePage"
          :disabled="!nextPageUrl"
        >
          Next
          <fa icon="arrow-right"></fa>
        </button>
      </div>
    </section>
  </main>
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
    const pokedex = computed<IPokemon[]>(() => store.state.pokemon || []);
    const nextPageUrl = ref<string | null>(null);
    const prevPageUrl = ref<string | null>(null);

    let loaderTimeout = 3000;
    let response: IAPIResponse;

    onMounted(async () => {
      isLoading.value = true;

      response = await store.dispatch('getAllPokemon') as IAPIResponse;
      nextPageUrl.value = response.next;
      prevPageUrl.value = response.previous;

      loadPokemon(response.results);
      setTimeout(() => {
        isLoading.value = false;
        loaderTimeout /= 2; // half cuts the fake time needed to load the page
      }, loaderTimeout);
    });

    /**  Gets pokemon data and save it in store under *pokemon* variable */
    async function loadPokemon(data: ISource[]) {
      // Fetch each pokemon data using its url
      const pokemon = await Promise.all(data.map(async _pokemon => await fetchPkmnData(_pokemon.url))) as IPokemon[];

      await store.commit('updatePokemon', pokemon);
    }

    async function fetchPkmnData(url: string) {
      const res = await fetch(url);
      return await res.json();
    }

    /** Called whenever the user clicks "Next" or "Previous" buttons. It returns the next X pokèmon */
    async function changePage(next = true) {
      isLoading.value = true;

      response = await store.dispatch('getAllPokemon', next ? response.next : response.previous) as IAPIResponse;
      nextPageUrl.value = response.next;
      prevPageUrl.value = response.previous;

      loadPokemon(response.results);
      setTimeout(() => isLoading.value = false, loaderTimeout);
    }

    return {
      isLoading,
      pokedex,
      changePage,
      nextPageUrl,
      prevPageUrl,
    };
  }
});
</script>

<style lang="scss" scoped>
.home {
  padding: 2rem 5rem;

  &__page-title {
    font-size: 2em;
  }

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
      color: #efc3d2;
      text-transform: uppercase;
      font-family: "Josefin Sans", sans-serif;
    }
  }

  &__main-content {
    .home__pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 2rem 0;
    }

    .home__pokemon-cards {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      column-gap: 1rem;
      row-gap: 3rem;
    }
  }
}
</style>
