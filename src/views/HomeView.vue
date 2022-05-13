<template>
<div class="container">
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg" class="logo">
    <WelcomePage />
  </div>
</div>
  
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import WelcomePage from '@/components/WelcomePage.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    WelcomePage,
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
