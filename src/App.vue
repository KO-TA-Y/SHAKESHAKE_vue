<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
.back{
  width:100vw;
  height:100vh;
  color: #535655;
  background: #F4961C;
}
</style>