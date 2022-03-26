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
  <div class="container">
    <router-view/>
  </div>
</template>

<style>
@import './App.css';


form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
}
input, select {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}
input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
}
.submit {
    text-align: center;
}
</style>
