<template>
  <div class="pokemon-card">
    <div class="pokemon-card__sprite-container">
      <img
        class="pokemon-card__sprite"
        :src="pokemon.sprites.front_default"
        :alt="pokemon.name + ' sprite'"
      />
    </div>

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
        :class="['pokemon-card__type', `pokemon-card__type--${slot.type.name}`]"
        v-for="slot in pokemon.types"
        :key="slot"
      >
        {{ slot.type.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  setup(){
    return {};
  },
});
</script>

<style lang="scss" scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

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

    .pokemon-card__type {
      padding: 0.25rem 1rem;
      background-color: #eee;
      border-radius: 0.5rem;

      &--normal {
        background-color: #a4acaf;
        color: white;
      }

      &--fire {
        background-color: #fd7d24;
        color: white;
      }

      &--water {
        background-color: #4592c4;
        color: white;
      }

      &--grass {
        background-color: #9bcc50;
        color: white;
      }

      &--psychic {
        background-color: #f366b9;
        color: white;
      }

      &--fairy {
        background-color: #fdb9e9;
        color: white;
      }

      &--ice {
        background-color: #51c4e7;
        color: #2a2a2a;
      }

      &--poison {
        background-color: #b97fc9;
        color: white;
      }

      &--ground {
        background-color: #f7de3f;
        color: #2a2a2a;
      }

      &--fighting {
        background-color: #d56723;
        color: white;
      }

      &--electric {
        background-color: #eed535;
        color: #2a2a2a;
      }

      &--dark {
        background-color: #707070;
        color: white;
      }

      &--bug {
        background-color: #729f3f;
        color: white;
      }

      &--rock {
        background-color: #a38c21;
        color: white;
      }

      &--flying {
        background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);
        color: white;
      }

      &--ghost {
        background-color: #7b62a3;
        color: white;
      }

      &--steel {
        background-color: #9eb7b8;
        color: white;
      }

      &--dragon {
        background: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%);
        color: white;
      }
    }
  }
}
</style>