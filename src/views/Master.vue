<template>
  <div class="back">
    <h1>SHAKE!SHAKE!</h1>
    <qriously value="http://abehiroshi.la.coocan.jp/" :size="200" />
    <h2>現在{{num}}人</h2>
    <v-btn
      color="#535655"
      outlined
    >
      はじめる
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Master",
  components: {},
  data() {
    return {
      num:0,
    }
  },
};
</script>
