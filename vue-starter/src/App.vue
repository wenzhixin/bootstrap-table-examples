<template>
  <div id="app">
    <img
      src="./assets/logo.png"
      width="64"
      height="64"
    >
    <HelloTable />
  </div>
</template>

<script setup>
import HelloTable from './components/HelloTable.vue'
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
