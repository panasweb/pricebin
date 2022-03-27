<template>
<div class="container">
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg" class="logo">
    <HelloWorld />
  </div>
</div>
  
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
});
</script>

<style scoped>
.logo{
  width: 80%;
  margin-top: 5%;
  align-self: center;
}

.home{
  display: flex;
  flex-direction: column;
}
</style>
