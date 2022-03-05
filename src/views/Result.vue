<template>
  <div class="back">
    <h1 class="d-flex justify-center">SHAKE!SHAKE!</h1>
    <h1 class="d-flex justify-center">{{this.$store.state.winLose}}</h1>
    <div v-if="result">
      <v-card tile color="#fff" elevation=0 class="pt-4">
        <v-img
          :src="result[0].photo.pc.l"
          height="30vh"
          contain
        ></v-img>
        <v-card-title class="text-h4 font-weight-black d-flex justify-center" style="color:#535655;">
          {{result[0].name}}
        </v-card-title>
        <v-divider class="mx-4" color=#F4961C></v-divider>
        <v-card-text>
          <div class=" mx-4 text-body-2" style="color:#535655;">
            <strong>アクセス：</strong><br>
              <div class="ml-3">
              {{result[0].access}}<br>
              住所：{{result[0].address}}</div><br>
            <strong>営業時間：</strong><br>
              <div class="ml-3">
              {{result[0].open}}
              </div><br>
            <a :href="result[0].urls.pc" style="color:#F4961C;">
              <strong>詳細はこちら</strong><br>
            </a>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <v-btn
          block
          x-large
          height="10vh"
          color="#535655"
          style="color:#F4961C;"
          to="/"
      >
      <strong>トップに戻る

      </strong>
    </v-btn>
  </div>
</template>

<script>
import { getFirestore, doc, onSnapshot} from 'firebase/firestore'
export default {
  name: "Result",
  components: {},
  data() {
    return {
      result:null,
    }
  },
  created() {
    this.db = getFirestore();
    const unsub = onSnapshot(doc(this.db, "rooms", this.$route.params.id), (doc) => {
      this.result = doc.data().result
      // console.log(this.shops)
      console.log("Current data: ", doc.data());
      console.log(unsub);
      console.log(doc.data().result)
    });
  },
};
</script>
