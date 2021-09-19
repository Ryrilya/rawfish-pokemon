<template>
  <div class="loader">
    <img class="loader__img" src="@/assets/spinning-mew.gif" alt="mew spinning loader gif" />
    <h2 class="loader__subtitle">
      Catching
      <span class="loader__pokemon-name">{{ pokemonName }}</span>
      ...
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    pokemonName: {
      type: String,
      required: true,
      default: 'all Pokemon',
    }
  },
})
</script>


<style lang="scss" scoped>
@import '../style/utils/mixins';

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__pokemon-name {
    color: hsl(0, 0%, 16%);
  }

  &__subtitle {
    margin-top: 2rem;
    color: hsl(0, 65%, 48%);
    text-transform: capitalize;
    font-family: "Josefin Sans", sans-serif;
    font-size: 2em;

    @include max-mobile-S {
      font-size: 1em;
    }
  }
}
</style>