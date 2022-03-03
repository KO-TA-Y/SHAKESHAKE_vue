<template>
  <div class="back">
    <h1>SHAKE!SHAKE!</h1>
    <h2>選択して待機</h2>
    <v-row>
      <v-col v-for="n in 5" :key="n" cols="12">
        <v-btn color="#535655" outlined> はじめる </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Select",
  components: {},
  data() {
    return {
      num: 0,
    };
  },
};
</script>
