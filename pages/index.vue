<template>
  <div class="center">
    <br>
    <h1 class="text-white ">{{TITLE}} | AFFILIATE</h1>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
    data: () => ({
    TITLE: process.env.TITLE,
  }),
}
</script>

<style>
.center {
   margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
