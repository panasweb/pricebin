<template>
    <div v-if="login">
        <LogIn @redirect="redirect"/>
    </div>
    <div v-else>
        <SignUp @redirect="redirect"/>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import SignUp from './SignUpView.vue'
import LogIn from './LogInView.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    SignUp,
    LogIn,
  },
  setup() {
      const router = useRouter();
      const login = ref<boolean>(false);

      function redirect() {
          router.push({name: 'home', replace:true})
      }

      return {login, redirect}
  }
});
</script>
<style>

</style>