<template>
  <div class="back">
    <h1>SHAKE!SHAKE!</h1>
    <qriously :value=slaveLink :size="200" />
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
import { getFirestore, doc, onSnapshot, collection, setDoc, arrayUnion} from 'firebase/firestore'
export default {
  name: "Master",
  components: {},
  data() {
    return {
      db:{
          member:[]
      },
      docId:null,
      slaveLink: null,
      rootLink: "http://localhost:8080/#/slave/",
    }
  },
  created() {
    this.addRoom()
  },
  computed: {
    num: function(){
        return this.db.member.length
    }
  },
  methods: {
    addRoom () {
        const db = getFirestore()
        // Add a new document with a generated id
        const newCityRef = doc(collection(db, "rooms"));
        // later...
        console.log(newCityRef.id)
        this.docId = newCityRef.id
        this.slaveLink = this.rootLink + this.docId
        console.log(this.slaveLink)
        setDoc(newCityRef, {
            date: new Date().toString(),
            member: arrayUnion(new Date().toString())
        });
        const unsub = onSnapshot(doc(db, "rooms", this.docId), (doc) => {
            this.db = doc.data()
            console.log("Current data: ", doc.data());
            console.log(unsub)
        });
    }
  }
};
</script>
