<template>

  <div id="app">
  <!-- <Home/> -->
  <!-- <QueueGlance/> -->
  <router-link to = "Home">Home</router-link>
  <router-view></router-view>
  </div>
</template>

<script>
// import Home from './pages/Home.vue'
// import QueueGlance from './pages/QueueGlance.vue'
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
html ,body {
  font-family: 'Roboto Condensed', sans-serif;
}
#app {
  font-size:10px;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
