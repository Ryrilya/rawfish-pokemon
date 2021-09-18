<template>
  <div class="loader">
    <img class="loader__img" src="@/assets/spinning-mew.gif" alt="loader gif" />
    <h2 class="loader__subtitle">Catching all Pokemon...</h2>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__subtitle {
    margin-top: 2rem;
    color: #efc3d2;
    text-transform: uppercase;
    font-family: "Josefin Sans", sans-serif;
  }
}
</style>