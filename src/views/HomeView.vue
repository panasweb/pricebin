<template>
<div class="container">
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg" class="logo animate__animated animate__tada animate__delay-3s">
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
  margin-top: 5%;
  align-self: center;
}

.home{
  display: flex;
  flex-direction: column;
}
</style>
