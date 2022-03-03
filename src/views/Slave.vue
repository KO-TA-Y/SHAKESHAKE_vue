<template>
  <div class="back">
    <h1>SHAKE!SHAKE!</h1>
    <h2>現在{{num}}人</h2>
    <h2>ホストが開始するまでお待ちください</h2>
  </div>
</template>

<script>
import { getFirestore, doc, onSnapshot, updateDoc, arrayUnion} from "firebase/firestore";
export default {
  name: 'Slave',
  components: {
  },
  data() {
      return {
          db:{
              member:[]
          }
      }
  },
  computed: {
    num: function(){
        return this.db.member.length
    }
  },
  created() {
    const db = getFirestore()
    const newCityRef = doc(db, "rooms", this.$route.params.id);
    console.log(newCityRef)
    // later...
    const unsub = onSnapshot(doc(db, "rooms", this.$route.params.id), (doc) => {
    this.db = doc.data()
    console.log("Current data: ", doc.data());
    console.log(unsub)
    });
    updateDoc(newCityRef, {
        member: arrayUnion(new Date().toString())
    });
  },
}
</script>

