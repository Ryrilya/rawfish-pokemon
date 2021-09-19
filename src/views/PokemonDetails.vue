<template>
  <main class="pokemon-details">
    <loader v-if="isLoading" :pokemon-name="tmpPkmnName"></loader>

    <header class="pokemon-details__header" v-if="pokemon && !isLoading">
      <h1 class="page-title">{{ pokemon.name }}</h1>
      <small class="pokemon-details__genus">{{ genus }}</small>
    </header>

    <section class="pokemon-details__details" v-if="pokemon && !isLoading">
      <div class="pokemon-details__sprite-container">
        <div class="pokemon-details__sprite-background">
          <img
            class="pokemon-details__sprite"
            :src="pokemonArtworkUrl"
            :alt="pokemon.name + 'sprite'"
          />
        </div>
      </div>

      <div class="pokemon-details__data">
        <PokedexData :pokemon="pokemon"></PokedexData>
        <Breeding :pokemon="pokemon"></Breeding>
      </div>
    </section>

    <Stats :stats="pokemon.stats" v-if="pokemon && !isLoading"></Stats>

    <EvolutionLine
      :species="species"
      v-if="pokemon && !isLoading"
    ></EvolutionLine>

    <!-- Moves -->
    <section class="pokemon-details__moves" v-if="pokemon && !isLoading">
      <h3 class="pokemon-details__title underline-border">Moves</h3>

      <div class="pokemon-details__moves-table-container">
        <MovesTable
          v-if="
            moves.filter(
              (move) =>
                move.version_group_details[0].move_learn_method.name ===
                'level-up'
            ).length > 0
          "
          :moves="
            moves.filter(
              (move) =>
                move.version_group_details[0].move_learn_method.name ===
                'level-up'
            )
          "
          table-lable="Learnt by Level Up"
          variant="level-up"
        ></MovesTable>
        <MovesTable
          v-if="
            moves.filter(
              (move) =>
                move.version_group_details[0].move_learn_method.name === 'egg'
            ).length > 0
          "
          :moves="
            moves.filter(
              (move) =>
                move.version_group_details[0].move_learn_method.name === 'egg'
            )
          "
          table-lable="Egg Moves"
        ></MovesTable>
        <MovesTable
          v-if="
            moves.filter(
              (move) =>
                move.version_group_details[0].move_learn_method.name === 'tutor'
            ).length > 0
          "
          :moves="
            moves.filter(
              (move) =>
                move.version_group_details[0].move_learn_method.name === 'tutor'
            )
          "
          table-lable="Learnt by Tutor"
        ></MovesTable>
        <MovesTable
          v-if="
            moves.filter(
              (move) =>
                move.version_group_details[0].move_learn_method.name ===
                'machine'
            ).length > 0
          "
          :moves="
            moves.filter(
              (move) =>
                move.version_group_details[0].move_learn_method.name ===
                'machine'
            )
          "
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
    const tmpPkmnName = ref<string>('');
    const language = "en";
    const pokemonArtworkUrl = ref<string>('');
    const pokemon = ref<Pokemon>();
    const species = ref<PokemonSpecies>();
    const genus = ref<string>('');
    const moves = ref<MoveSource[]>([]);

    let loaderTimeout = 1500;

    onMounted(async () => {
      isLoading.value = true;
      tmpPkmnName.value = route.params.name.toString();

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
      tmpPkmnName,
      pokemonArtworkUrl,
      species,
      genus,
      moves
    };
  },
});
</script>

<style lang="scss">
@import "../style/utils/mixins";

.pokemon-details {
  height: 100%;
  position: relative;

  @include min-laptop {
    padding: 0 4rem 4rem 4rem;
  }

  @include max-tablet {
    padding: 0 3rem 4rem 3rem;
  }

  &__data {
    width: 100%;

    @include max-tablet {
      margin-top: 4rem;
    }
  }

  &__title {
    font-size: 1.8em;
    color: hsl(0, 0%, 16%);
    margin-top: 4rem;
    margin-bottom: 2rem;
    font-family: "Josefin Sans", sans-serif;

    @include min-laptop-L {
      font-size: 3em;
    }

    @include max-tablet {
      font-size: 2.5em;
    }

    @include max-mobile-L {
      font-size: 2.3em;
    }

    @include max-mobile-L {
      font-size: 2em;
    }
  }

  &__header {
    margin: 5rem 0;
    display: flex;
    flex-direction: column;

    @include max-mobile-L {
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .page-title {
      margin-top: 0;
    }

    .pokemon-details__genus {
      font-family: "Josefin Sans", sans-serif;
      color: #999;

      @include min-laptop-L {
        font-size: 1.5em;
      }

      @include max-laptop {
        font-size: 1.3em;
      }
    }
  }

  &__details {
    width: 100%;
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    .pokemon-details__sprite-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .pokemon-details__sprite-background {
        position: relative;
        height: 0;
        background-color: #f2f2f2;
        border-radius: 50%;

        .pokemon-details__sprite {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
      }
    }

    @include min-laptop-L {
      margin: 3rem 0;

      .pokemon-details__sprite-background {
        width: 60%;
        padding-bottom: 60%;
      }
    }

    @include max-laptop-L {
      padding: 3rem;
      gap: 10rem;

      .pokemon-details__sprite-background {
        width: 100%;
        padding-bottom: 100%;
      }
    }

    @include min-laptop {
      gap: 5rem;
    }

    @include max-laptop {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .pokemon-details__sprite-background {
        width: 60%;
        padding-bottom: 60%;
      }
    }

    @include max-tablet {
      padding: 0;
      gap: 0;
    }

    @include max-mobile-L {
      .pokemon-details__sprite-background {
        width: 80%;
        padding-bottom: 80%;
      }
    }
  }

  &__moves {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 5rem;
  }

  &__moves-table-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    row-gap: 3rem;

    @media only screen and (max-width: 1200px) {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>