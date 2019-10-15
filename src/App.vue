<template>
  <div id="app">
    <header-element />

    <content>
      <router-view />
    </content>

    <footer-element />
  </div>
</template>

<script>
import HeaderElement from "@/components/Header/HeaderElement";
import FooterElement from "@/components/Footer/FooterElement";

export default {
  components: {
    HeaderElement,
    FooterElement
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

content {
  display: flex;
  max-width: 1110px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  justify-content: center;
  min-height: 100vh;
}

#app {
  overflow-x: hidden;
}
</style>
