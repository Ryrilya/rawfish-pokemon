<template>
  <main class="pokemon-details" v-if="pokemon && !isLoading">
    <loader v-if="isLoading"></loader>

    <header class="pokemon-details__header" >
      <div class="pokemon-details__name-number">
        <h2 class="page-title">
          {{ pokemon.name }}
        </h2>
      </div>

      <h4 class="pokemon-details__genus">{{ genus }}</h4>
    </header>

    <section class="pokemon-details__details">
      <div class="pokemon-details__sprite-container">
        <img
          class="pokemon-details__sprite"
          :src="pokemonArtworkUrl"
          :alt="pokemon.name + 'sprite'"
        />
      </div>

      <div class="pokemon-details__data">
        <PokedexData :pokemon="pokemon"></PokedexData>
        <Breeding :pokemon="pokemon"></Breeding>
        <Stats :stats="pokemon.stats"></Stats>
      </div>
    </section>

    <EvolutionLine :species="species"></EvolutionLine>

    <!-- Moves -->
    <section class="pokemon-details__moves">
      <h3 class="pokemon-details__title underline-border">Moves</h3>

      <div class="pokemon-details__moves-table-container">
        <MovesTable 
          v-if="moves.filter(move => move.version_group_details[0].move_learn_method.name === 'level-up').length > 0"
          :moves="moves.filter(move => move.version_group_details[0].move_learn_method.name === 'level-up')" 
          table-lable="Learnt by Level Up" 
          variant="level-up"></MovesTable>
        <MovesTable 
          v-if="moves.filter(move => move.version_group_details[0].move_learn_method.name === 'egg').length > 0"
          :moves="moves.filter(move => move.version_group_details[0].move_learn_method.name === 'egg')" 
          table-lable="Egg Moves"
        ></MovesTable>
        <MovesTable 
          v-if="moves.filter(move => move.version_group_details[0].move_learn_method.name === 'tutor').length > 0"
          :moves="moves.filter(move => move.version_group_details[0].move_learn_method.name === 'tutor')" 
          table-lable="Learnt by Tutor"
        ></MovesTable>
        <MovesTable 
          v-if="moves.filter(move => move.version_group_details[0].move_learn_method.name === 'machine').length > 0"
          :moves="moves.filter(move => move.version_group_details[0].move_learn_method.name === 'machine')" 
          table-lable="Learnt by TM" 
          variant="tm"
        ></MovesTable>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import PokedexData from '@/components/pokemon-details/PokedexData.vue';
import Breeding from '@/components/pokemon-details/Breeding.vue';
import Stats from '@/components/pokemon-details/Stats.vue';
import EvolutionLine from '@/components/pokemon-details/EvolutionLine.vue';
import MovesTable from '@/components/pokemon-details/MovesTable.vue';

import { MoveSource, Pokemon } from '@/models/Pokemon';
import { PokemonSpecies } from '@/models/PokemonSpecies';

export default defineComponent({
  components: {
    PokedexData,
    Breeding,
    Stats,
    EvolutionLine,
    MovesTable,
  },
  setup(){
    const route = useRoute();
    const store = useStore();
    const isLoading = ref<boolean>(false);
    const language = "en";
    const pokemonArtworkUrl = ref<string>('');
    const pokemon = ref<Pokemon>();
    const species = ref<PokemonSpecies>();
    const genus = ref<string>('');
    const moves = ref<MoveSource[]>([]);

    let loaderTimeout = 1500;

    onMounted(async () => {
      isLoading.value = true;
      const allPokemon = store.state.pokemon as Pokemon[];

      // Check if store's pokemon is empty
      if (allPokemon.length !== 0) 
        pokemon.value = allPokemon.filter(p => p.name === route.params.name)[0];  // retrieve the specific pokemon from the list

      // If the list is empty or the wanted pokemon is not there, retrieve it by GET call
      if (pokemon.value === undefined)     
        pokemon.value = await store.dispatch('getPokemonByName', route.params.name);

      // Moves
      if(!pokemon.value) return;
      moves.value = pokemon.value.moves as MoveSource[];

      await getSpecies();
      getArtwork();

      if (!species.value) return;
      genus.value = species.value.genera.filter(g => g.language.name == language)[0].genus;

      setTimeout(() => isLoading.value = false, loaderTimeout);
    });

    function getArtwork() {
      if (!pokemon.value) return;

      // Get the official artwork
      const officialArtwork = pokemon.value.sprites.other['official-artwork'].front_default;

      // if it doesn't exists get the front_default sprite
      if(officialArtwork === '' || officialArtwork === undefined)
        pokemonArtworkUrl.value = pokemon.value.sprites.front_default;

      pokemonArtworkUrl.value = officialArtwork;
    }
    async function getSpecies() {
      if (!pokemon.value) return;

      const data = await fetch(pokemon.value.species.url);
      species.value = await data.json() as PokemonSpecies;
    }

    return {
      pokemon,
      isLoading,
      pokemonArtworkUrl,
      species,
      genus,
      moves
    };
  },
});
</script>

<style lang="scss">
.pokemon-details {
  padding: 2rem 5rem;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  &__data {
    width: 80%;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    row-gap: 0;
  }

  &__title {
    font-size: 1.8em;
    color: hsl(0, 0%, 16%);
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-family: "Josefin Sans", sans-serif;
  }

  &__header {
    margin-top: 2rem;

    .pokemon-details__name-number {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 2rem;

      .pokemon-details__number {
        font-size: 2em;
        color: #999;
      }
    }

    .pokemon-details__genus {
      color: #999;
    }
  }

  &__details {
    width: 100%;
    display: grid;
    grid-template-columns: 25% auto;
    gap: 5rem;
    margin-top: 3rem;

    .pokemon-details__sprite-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f2f2f2;
      border-radius: 50%;

      .pokemon-details__sprite {
        width: 100%;
      }
    }

    .pokemon-details__text {
      font-size: 1.2rem;
    }
  }

  &__moves {
    display: flex;
    flex-direction: column;
    padding-bottom: 5rem;
  }

  &__moves-table-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10rem;
    row-gap: 3rem;
  }
}
</style>