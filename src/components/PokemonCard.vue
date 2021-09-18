<template>
  <div class="pokemon-card">
    <router-link
      class="pokemon-card__sprite-container"
      :to="{ name: 'PokemonDetails', params: { name: pokemon.name } }"
    >
      <img
        class="pokemon-card__sprite"
        :src="pokemon.sprites.front_default"
        :alt="pokemon.name + ' sprite'"
      />
    </router-link>

    <div class="pokemon-card__header">
      <h3 class="pokemon-card__name">{{ pokemon.name }}</h3>
      <small class="pokemon-card__number">#{{ pokemon.id }}</small>
    </div>

    <p class="pokemon-card__ability">
      Ability:
      <span class="pokemon-card__ability-name">{{
        pokemon.abilities[0].ability.name
      }}</span>
    </p>

    <div class="pokemon-card__types">
      <span
        :class="['app__type-pill', `app__type-pill--${slot.type.name}`]"
        v-for="slot in pokemon.types"
        :key="slot"
      >
        {{ slot.type.name }}
        <img class="app__type-pill-icon" :src="loadTypeImg(slot.type.name)" :alt="`${slot.type.name} icon`">
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  setup(){
    const typeIconsFolder = inject<(path: string) => string>('typeIconsFolder');
    const loadTypeImg = (type: string) => typeIconsFolder ? typeIconsFolder(`./${type}.svg`) : '';

    return {
      loadTypeImg,
    };
  },
});
</script>

<style lang="scss" scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: unset;

  &__sprite-container {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    background-color: #f2f2f2;
    border-radius: 0.5rem;
    padding: 2rem;
    cursor: pointer;
    transition: transform 0.15s linear;
    

    &:hover {
      transform: translateY(-0.5em);
    }

    .pokemon-card__sprite {
      width: 60%;
    }
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;

    .pokemon-card__name {
      font-size: 1.5em;
      text-transform: capitalize;
      font-family: "Josefin Sans", sans-serif;
    }

    .pokemon-card__number {
      font-size: 1em;
      color: #999;
    }
  }

  &__ability {
    font-weight: 600;

    &-name {
      font-style: italic;
      font-weight: normal;
    }
  }

  &__types {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-weight: 400;
    margin-top: 1rem;
  }
}
</style>