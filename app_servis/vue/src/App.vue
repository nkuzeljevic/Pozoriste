<template>
  <div id="app">
      <img alt="Vue logo" src="@/assets/logo.png">
    <nav>
      <router-link to="/">Pozorišta</router-link> |
      <router-link to="/home">Home</router-link> |
    </nav>
    <router-view />
   
  </div>
</template>

<script>
export default {
  name: 'App',
}


</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Gloock&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: black; 
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #b90e0a;
}
</style>
