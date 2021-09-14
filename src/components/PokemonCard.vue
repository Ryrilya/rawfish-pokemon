<template>
  <div class="pokemon-card"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: false,
    },
  },
  setup(){
    return {};
  },
});
</script>

<style lang="scss" scoped>

</style>