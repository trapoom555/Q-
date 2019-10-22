<template>

  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@font-face {
    font-family: 'Noto Sans Thai Cound';
    src: url('./assets/NotoSansThaiUI-Regular.woff2');
}

#app {
  font-size:10px;
  font-family: 'Noto Sans Thai Cound', sans-serif;
  text-align: center;
  margin-top: 0px;
  padding-top: 0px;
  overflow: hidden;
}
a {
  text-decoration: none;
}
html, body {
  font-family: 'Noto Sans Thai Cound', sans-serif;
  margin: 0px;
  padding: 0px;
}
</style>
