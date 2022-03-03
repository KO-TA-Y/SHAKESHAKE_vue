<template>
  <div class="back">
    <h1>SHAKE!SHAKE!</h1>
    <h2>{{timer}}</h2>
    <h1>振れ！！</h1>
  </div>
</template>

<script>
export default {
  name: "Shake",
  components: {},
  data() {
    return {
      timer:0,
    }
  },
};
</script>
