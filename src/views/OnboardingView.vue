<template>
    <div v-if="login">
        <LogIn/>
    </div>
    <div v-else>
        <SignUp/>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import SignUp from '../components/SignUp.vue';
import LogIn from '../components/LogIn.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    SignUp,
    LogIn,
  },
  setup() {
      const login = ref<boolean>(false);

      return {login}
  }
});
</script>
<style>
body {
    margin: 0;
    background: #eee;
}
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
</style>