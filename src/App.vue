<template>
<header>
<router-link to="/">Home</router-link> 
  <nav>
    <router-link to="/about">About</router-link> 
    <router-link to="/onboarding">Onboarding</router-link>
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
