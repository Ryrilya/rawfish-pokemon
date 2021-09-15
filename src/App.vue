<template>
  <header class="main-header">
    <router-link to="/" class="main-header__link">
      <h1 class="main-header__brand">Rawfish Pokédex</h1>
    </router-link>
  </header>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: "Josefin Sans", sans-serif;
}

.main-header {
  background-color: #2a2a2a;
  padding: 2rem 5rem;

  &__link {
    color: white;
    text-decoration: none;
  }

  &__brand {
    font-size: 3em;
    color: white;
    cursor: pointer;
  }
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;

  min-width: 10em;
  padding: .8rem 1rem;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: .5rem;

  &--primary {
    background-color: hsl(19, 85%, 56%);
    color: white;

    &:disabled {
      opacity: .5;
      cursor: not-allowed;
    }
  }
}
</style>
