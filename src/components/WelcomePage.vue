<template>
  <div class="wrapper">
    <h1 class="animate__animated animate__fadeInUp">{{ msg }}</h1>
    <router-link :to="'/products'">
      <button class="btn btn-primary btn-lg animate__animated animate__fadeInUpBig animate__delay-1s">Compara productos &rarr;</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { auth } from '../services/auth'

export default defineComponent({
  name: 'WelcomePage',

  setup() {
    const msg = ref<string>("¡Bienvenidx a PriceBin!");

    onMounted(() => {
      if (auth.currentUser?.displayName) {
        msg.value = `¡Bienvenidx, ${auth.currentUser.displayName}!`
      }
    })

    return {
      msg
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 100%;
}

.btn.btn-primary {
  margin: 20px;
}
</style>
