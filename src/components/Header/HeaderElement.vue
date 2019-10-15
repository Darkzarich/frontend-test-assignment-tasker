<template>
  <header>
    <router-link to="/">Tasks list</router-link>
  </header>
</template>

<style lang="scss">
@import "@/styles/colors.scss";

header {
  position: fixed;
  height: 40px;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  background: $header;
  font-family: sans-serif;
  a {
    color: white;
    font-weight: bold;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px solid white;
    }
  }
}
</style>
