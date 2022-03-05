<template>
  <div class="back">
    <h1 class="d-flex justify-center">SHAKE!SHAKE!</h1>
    <h1 v-if="timerSec>0" class="d-flex justify-center text-h1">{{timerSec}}</h1>
    <h1 v-if="timerSec<1" class="d-flex justify-center text-h1">振れ！</h1><br>
    <h1 v-if="timerSec<1" class="d-flex justify-center">{{count}}回</h1>
  </div>
</template>

<script>
import { getFirestore, doc, onSnapshot, collection, updateDoc, arrayUnion} from 'firebase/firestore'
export default {
  name: "Shake",
  components: {},
  data() {
    return {
      db:null,
      roomsRef:null,
      member:null,
      counts:null,
      docId:null,
      timerSec:3,
      timerObj:null,
      size:50,
      isShaking:false,
      count:0,
      beta:null,
    }
  },
  created() {
    this.db = getFirestore();
    // Add a new document with a generated id
    this.roomsRef = doc(collection(this.db, "rooms"));
    // later...
    this.docId = this.$route.params.id
    console.log(this.slaveLink);
    const unsub = onSnapshot(doc(this.db, "rooms", this.docId), (doc) => {
      if (doc.data().shops) {
        this.member = doc.data().member
        this.counts = doc.data().counts
        // console.log(this.shops)
      }
      console.log("Current data: ", doc.data());
      console.log(unsub);
      // console.log(this.member.length)
      // console.log(this.counts.length)
      if(this.member && this.counts){
        if(this.member.length == this.counts.length){
          console.log(Math.max(...this.counts))
          console.log(this.count)
          if(this.count == Math.max(...this.counts)){
            this.$store.commit('setWinLose',"WIN")
          }else{
            this.$store.commit('setWinLose',"LOSE")
          }
        }
      }
      if(doc.data().result){
        this.$router.push(`/Result/${this.docId}`)
      }
    });
    this.countDown()
  },
  computed: {
    winLose:function(){
      return this.$store.getters.getWinLose
    }
  },
  watch:{
    winLose(val){
      console.log(val)
      if(val == 'WIN'){
        updateDoc(doc(this.db, "rooms", this.docId), {
          result: arrayUnion(this.$store.state.shopInfo)
        })
      }
    }
  },
  mounted() {
    window.addEventListener('deviceorientation', (e) => {
      this.beta = Math.floor(e.beta)
      if(this.timerSec<1){
        if(Math.floor(e.beta)< -this.size || Math.floor(e.beta)>this.size){
          if(this.isShaking == false){
            this.count++
          }
          this.isShaking = true
        }else{
          this.isShaking = false
        }
      }
    })
  },
  methods: {
    countDown(){
      this.timerObj = setInterval(()=> {
        if(this.timerSec>-5 && this.$store.state.motionPermission){
          this.timerSec--
        }else{
          updateDoc(doc(this.db, "rooms", this.docId), {
              counts: arrayUnion(this.count)
          })
          clearInterval(this.timerObj)
        }
      }, 1000)
    },
  },
};
</script>
