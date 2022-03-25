<template>
  <div class="wrapper">
    <h1>{{ msg }}</h1>
    <a class="btn btn-primary" href="/producto" role="button"><h1>Comparar productos</h1></a>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import {auth} from '../firebase/auth'

export default defineComponent({
  name: 'HelloWorld',

  setup() {
    const msg = ref<string>("¡Bienvenidx a PriceBin!");

    onMounted(() => {
      console.log("Mounted!");
      if (auth.currentUser?.displayName) {
        msg.value = `¡Bienvenidx a, ${auth.currentUser.displayName}!`
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

.wrapper{
  width: 100%;
  padding: 25px;
}

</style>
