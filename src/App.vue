<template>
  <header class="main-header">
    <router-link to="/" class="main-header__link">
      <h2 class="main-header__brand">Rawfish Pokédex</h2>
    </router-link>
  </header>
  <router-view class="app__router-view" />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'

export default defineComponent({
  setup() {
    provide('typeIconsFolder', require.context('@/assets/types-icons', false));
  },
})
</script>


<style lang="scss">
@import './style/main.scss';
</style>
