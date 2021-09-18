<template>
  <div class="pokedex-data data-list">
    <h3 class="data-list__title">Pokédex Data</h3>

    <div class="data-list__info">
      <h4 class="data-list__info-title">Pokèdex Num.</h4>
      {{ pokedexNum }}
    </div>

    <div class="data-list__info">
      <h4 class="data-list__info-title">Types</h4>

      <div class="pokedex-data__types">
        <span
          :class="['app__type-pill', `app__type-pill--${type}`]"
          v-for="type in types"
          :key="type"
        >
          {{ type }}
          <img class="app__type-pill-icon" :src="loadTypeImg(type)" :alt="`${type} icon`">
        </span>
      </div>
    </div>

    <div class="data-list__info">
      <h4 class="data-list__info-title">Height</h4>
      {{ height }} m
    </div>

    <div class="data-list__info">
      <h4 class="data-list__info-title">Weight</h4>
      {{ weight }} kg
    </div>

    <div class="data-list__info">
      <h4 class="data-list__info-title">Abilities</h4>

      <ol class="pokedex-data__abilities">
        <li
          :class="[
            'data-list__ability',
            abilitySlot.is_hidden ? 'data-list__ability--hidden' : '',
          ]"
          v-for="abilitySlot in abilities"
          :key="abilitySlot.ability.name"
        >
          {{ abilitySlot.ability.name.replace("-", " ") }}
          <span v-if="abilitySlot.is_hidden">(Hidden)</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject } from 'vue';

import { Pokemon, Ability } from '@/models/Pokemon';

export default defineComponent({
  props: {
    pokemon: {
      type: Object,
      required: true,
    }
  },
  setup(props){
    const pokemon = props.pokemon as Pokemon;

    const pokedexNum = ref<number>(pokemon.id);
    const height = ref<number>(pokemon.height / 10);
    const weight = ref<number>(pokemon.weight / 10);
    const abilities = ref<Ability[]>(pokemon.abilities);
    const types = computed<string[]>(() => pokemon.types.map(typeSlot => typeSlot.type.name));
    
    const typeIconsFolder = inject<(path: string) => string>('typeIconsFolder');
    const loadTypeImg = (type: string) => typeIconsFolder ? typeIconsFolder(`./${type}.svg`) : '';

    return {
      pokedexNum,
      types,
      height,
      weight,
      abilities,
      loadTypeImg,
    };
  },
});
</script>

<style lang="scss">
.data-list {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 1.5rem;
    font-family: 'Josefin Sans', sans-serif;
    color: hsl(0, 0%, 16%);
    margin-bottom: 0.5rem;
  }

  &__info {
    display: grid;
    grid-template-columns: 30% auto;
    gap: 2rem;

    font-size: 1.2darem;
    padding: 0.5rem 0;


    &-title {
      color: hsl(0, 0%, 45%);
      display: flex;
      align-items: center;
    }
  }
}

.pokedex-data {
  &__types {
    display: flex;
    align-items: center;
    gap: .5rem;
  }

  &__abilities {
    list-style-type: none;

    .data-list__ability {
      margin-bottom: 0.25rem;
      text-transform: capitalize;

      &--hidden {
        font-size: 0.8em;
      }
    }
  }
}
</style>