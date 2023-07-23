<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light container">
      <router-link class="navbar-brand" to="/">Navbar</router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{name : 'Home'}">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/todos">Todos</router-link>
        </li>
      </ul>
    </nav>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>