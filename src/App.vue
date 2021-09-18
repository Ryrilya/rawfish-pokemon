<template>
  <header class="main-header">
    <router-link to="/" class="main-header__link">
      <h2 class="main-header__brand">Rawfish Pokédex</h2>
    </router-link>
  </header>
  <router-view class="app__router-view" />
  <footer class="app__main-footer">
    Project issued by <a href="https://rawfish.com" class="app__main-footer-link">Rawfish</a> for testing purposes. 2021
  </footer>
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
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  font-family: "Roboto", sans-serif;
}

.app__router-view {
  width: 100vw;
  min-height: 100%;
}

.main-header {
  background-color: #2a2a2a;
  padding: 2rem 5rem;

  &__link {
    color: white;
    text-decoration: none;
  }

  &__brand {
    font-size: 1.8em;
    color: white;
    cursor: pointer;
    font-family: "Josefin Sans", sans-serif;
  }
}

.page-title {
  margin-top: 2rem;
  font-size: 4em;
  text-transform: capitalize;
  font-family: "Josefin Sans", sans-serif;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  min-width: 10em;
  padding: 0.8rem 1rem;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;

  &--primary {
    background-color: hsl(19, 85%, 56%);
    color: white;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.app__type-pill {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  max-width: 6rem;

  padding: 0.25rem 1rem;
  border-radius: 0.5rem;
  text-transform: capitalize;

  &-icon {
    width: 1em;
    height: 1em;
  }

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
    color: white;
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

.underline-border {
  position: relative;
  line-height: 1.6em;

  &::after {
    content: "";
    width: 100%;
    max-width: 150px;
    height: 0.25rem;
    background-color: hsl(19, 85%, 56%);
    border-radius: 0.5rem;

    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
