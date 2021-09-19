<template>
  <section class="evolution-line">
    <h3 class="pokemon-details__title underline-border">Evolutions</h3>

    <div class="evolution-line__line">
      <div class="evolution-line__ring" v-for="ring in evoRings" :key="ring.id">
        <!-- Arrow -->
        <div class="evolution-line__next-step" v-if="ring.hasNext">
          <fa icon="long-arrow-alt-right"></fa>

          <!-- Trigger Even here -->
        </div>

        <div class="evolution-line__ring-details">
          <!-- Artwork -->
          <div class="evolution-line__pokemon-artwork-container">
            <img class="evolution-line__pokemon-artwork" :src="ring.artwork" :alt="`${ring.name} artwork`">
          </div>

          <!-- Details -->
          <h4 class="evolution-line__pokemon-name">{{ ring.name }}</h4>
          <small class="evolution-line__pokemon-id">#{{ ring.id }}</small>
          <div class="evolution-line__types">
            <div :class="['evolution-line__type', 'app__type-pill', `app__type-pill--${type}`]" v-for="type in ring.types" :key="type">
              {{ type }}
              <img class="evolution-line__type-icon app__type-pill-icon" :src="loadTypeImg(type)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { EvolutionChain } from '@/models/EvolutionChain';
import { Pokemon } from '@/models/Pokemon';
import { PokemonSpecies } from '@/models/PokemonSpecies';
import { defineComponent, onMounted, inject, ref } from 'vue';
import { useStore } from 'vuex';

interface Ring {
  id: number;
  name: string;
  types: string[],
  artwork: string,
  hasNext: boolean;
}

export default defineComponent({
  props: {
    species: {
      type: Object,
      required: true,
    },
  },
  setup(props){
    const store = useStore();
    const species = props.species as PokemonSpecies;
    const typeIconsFolder = inject<(path: string) => string>('typeIconsFolder');
    const evoRings = ref<Ring[]>([]);

    onMounted(async () => {
      const evoLine = await getEvoLine(species.evolution_chain.url) as EvolutionChain;
      evoRings.value = await calcEvoRingsData(evoLine);
    });

    async function getEvoLine(url: string) {
      const data = await fetch(url);
      return await data.json() as EvolutionChain;
    }
    async function calcEvoRingsData(evoLine: EvolutionChain) {
      let currentRing = evoLine.chain;
      let numOfEvos = currentRing.evolves_to.length;
      let rings: Ring[] = [];

      do {
        const ringPokemon = await store.dispatch("getPokemonByName", currentRing.species.name) as Pokemon;
        const hasNext = !(currentRing.evolves_to.length === 0);
        
        rings.push({
          id: ringPokemon.id,
          name: ringPokemon.name,
          types: ringPokemon.types.map(slot => slot.type.name),
          artwork: ringPokemon.sprites.other['official-artwork'].front_default,
          hasNext,
        });

        //? If the number of evolution of the current pokemon is > 1, then the next currentRing
        //? will be that one which has the same name as the pokemon in the details page
        //? es. Details page of Sylveon (https://.../pokemon-list/sylveon)
        //?     eevee --> sylveon
        if (numOfEvos > 1)
          currentRing = currentRing.evolves_to.filter(evo => evo.species.name === species.name)[0];
        else 
          currentRing = currentRing.evolves_to[0];

        numOfEvos = currentRing ? currentRing.evolves_to.length : 0;
      } while(currentRing);

      return rings;
    }
    const loadTypeImg = (type: string) => typeIconsFolder ? typeIconsFolder(`./${type}.svg`) : '';

    return {
      evoRings,
      loadTypeImg,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../../style/utils/mixins';

.evolution-line {
  &__line {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;

    @include min-laptop {
      gap: 0;
    }

    @include max-tablet {
      display: flex;
      flex-direction: column;
    }
  }

  &__ring {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    @include max-tablet {
      flex-direction: column-reverse;
      margin-top: 0;
    }
  }

  &__ring-details,
  &__next-step {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__next-step {
    gap: .5rem;
    font-size: 3em;
    color: hsl(0, 0%, 16%);

    @include min-laptop {
      font-size: 2em;
    }

    @include max-tablet {
      margin-top: 2rem;
      gap: 0;
      transform: rotate(90deg);
    }
  }

  &__method {
    white-space: nowrap;
  }

  &__pokemon-artwork-container {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    margin-bottom: 1rem;
  }

  &__pokemon-artwork {
    width: 50%;
  }

  &__pokemon-name,
  &__pokemon-id {
    margin-bottom: .5rem;
  }

  &__pokemon-name {
    text-transform: capitalize;
  }

  &__types {
    display: flex;
    align-items: center;
    gap: .5rem;
  }
}
</style>