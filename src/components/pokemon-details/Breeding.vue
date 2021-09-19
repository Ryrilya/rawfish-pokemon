<template>
  <div class="breeding data-list">
    <h3 class="data-list__title">Breeding</h3>

    <div class="data-list__info">
      <h4 class="data-list__info-title">Egg Groups</h4>

      <span class="breeding__egg-groups">
        <span
          class="breeding__egg-group"
          v-for="(group, index) in eggGroups"
          :key="index"
        >
          {{ group }}
          <span v-if="index !== eggGroups.length - 1">, </span>
        </span>
      </span>
    </div>

    <div class="data-list__info">
      <h4 class="data-list__info-title">Gender</h4>

      <div class="breeding__gender">
        <span class="breeding__male">{{ gender.male }}% ♂</span>
        <span class="breeding__female">{{ gender.female }}% ♀</span>
      </div>
    </div>

    <div class="data-list__info">
      <h4 class="data-list__info-title">Hatching Steps</h4>
      
      <span class="breeding__hatching-steps">{{ hatchingSteps }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Pokemon } from '@/models/Pokemon';
import { PokemonSpecies } from '@/models/PokemonSpecies';
import { defineComponent, onMounted, ref, reactive, computed } from 'vue';

interface Gender {
  male: number;
  female: number;
}

export default defineComponent({
  props: {
    pokemon: {
      type: Object,
      required: true,
    }
  },
  setup(props){
    const pokemon = props.pokemon as Pokemon;
    const eggGroups = ref<string[]>([]);
    const hatchingSteps = ref<number>(0);
    const gender = reactive<Gender>({
      male: 0,
      female: 0
    });

    let species: PokemonSpecies;

    onMounted(async () => {
      await getSpecies();

      eggGroups.value = getEggGroups();
      hatchingSteps.value = 255 * (species.hatch_counter + 1);
      getGender();
    })

    async function getSpecies() {
      const data = await fetch(pokemon.species.url);
      species = await data.json() as PokemonSpecies;
    }

    const getEggGroups = () => species.egg_groups.map(eggGroup => eggGroup.name.replace('-', ' '));
    const getGender = () => {
      gender.female = (species.gender_rate / 8) * 100;
      gender.male = 100 - gender.female;
    }

    return {
      eggGroups,
      gender,
      hatchingSteps
    };
  },
});
</script>

<style lang="scss" scoped>
.breeding {
  &__egg-group {
    text-transform: capitalize;
  }

  &__male {
    color: hsl(240, 100%, 63%);
    margin-right: 1rem;
  }

  &__female {
    color: hsl(350, 100%, 70%);
  }

  &__hatching-steps {
    display: flex;
    align-items: center;
  }
}
</style>