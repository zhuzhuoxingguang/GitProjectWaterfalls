<template>
  <div id="app">
    <Waterfalls/>
  </div>
</template>

<script>
import Waterfalls from './components/Waterfalls'

export default {
  name: 'App',
  components: {
    Waterfalls
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
