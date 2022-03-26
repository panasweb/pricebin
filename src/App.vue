<template>
<header>

  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img class="nav-link logo" src="./assets/Logo-Mini.svg" alt="Price Bin Logo">
      </router-link> 
        <div class="nav-elements">
          <router-link to="/about" class="nav-link">Ver Productos</router-link> 
          <router-link to="/login" class="nav-link">Login</router-link> 
          <router-link to="/register" class="nav-link cta">Unete a PriceBin</router-link>
        </div>
    </div>
  </nav>
</header>
    <router-view/>
  
</template>

<style>
@import './styles/App.css';
</style>
