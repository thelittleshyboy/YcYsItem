<template>
  <div id="app">
      movie
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log(this.$route)
  },
  computed: {
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
