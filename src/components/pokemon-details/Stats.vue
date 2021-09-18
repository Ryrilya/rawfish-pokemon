<template>
  <div cass="stats" id="stats">
    <h3 class="data-list__title">Base Stats</h3>

    <div class="stats__card-container">
      <div
        class="stats__card"
        v-for="statData in stats"
        :key="statData.stat.name"
      >
        <div class="stats__card-name">
          {{ statData.stat.name.replace("special", "spc.").replace("-", " ") }}
        </div>
        <div :class="['stats__card-value', `stats__card-value--${statData.stat.name}`]">
          {{ statData.base_stat }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    stats: {
      type: Object,
      required: true,
    }
  },
});
</script>

<style lang="scss" scoped>
#stats {
  height: 100%;

  grid-column: 1 / 3;
  grid-row: 2;
}

.stats {
  &__card-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 2rem;
  }

  &__card {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    border-radius: 0.5rem;

    &-name {
      font-size: 100%;
      font-weight: 500;
      text-transform: capitalize;
      color: hsl(0, 0%, 60%);
    }

    &-value {
      font-size: 150%;
      font-weight: 900;

      &--hp {
        color: hsl(0, 100%, 67%);
      }

      &--attack {
        color: hsl(25, 86%, 72%);
      }

      &--defense {
        color: hsl(48, 93%, 73%);
      }

      &--special-attack {
        color: hsl(222, 81%, 79%);
      }

      &--special-defense {
        color: hsl(100, 52%, 71%);
      }

      &--speed {
        color: hsl(342, 91%, 78%);
      }
    }
  }
}
</style>