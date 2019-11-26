<template>
  <div id="app">
    <h3>欢迎您：</h3>{{user}}
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log(this.$route)
  },
  computed: {
    user() {
      return localStorage.getItem('user') ? localStorage.getItem('user') : null
    }
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
