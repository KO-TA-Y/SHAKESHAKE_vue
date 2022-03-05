<template>
  <div class="back">
    <h1>SHAKE!SHAKE!</h1>
    <h2 v-show="!selected">選択して待機</h2>
    <h2 v-if="selected">選択中：{{shops[selected-1].genre.name}}</h2>
    <v-row>
      <v-col v-for="n in 5" :key="n" cols="12" >
        <v-btn @click="select(n)" block x-large color="#535655" outlined v-if="shops !=null">{{shops[n-1].genre.name}}</v-btn>
      </v-col>
      <v-col cols="12" >
        <v-btn
            block
            x-large
            height="10vh"
            color="#535655"
            style="color:#F4961C;position:absolute;bottom:0;"
            v-if="shops !=null"
            :disabled="canPlay!=1"
            @click ="toShake()"
        >
        <strong>はじめる</strong>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getFirestore, doc, onSnapshot, collection, updateDoc, arrayUnion} from 'firebase/firestore'
export default {
  name: "Select",
  components: {},
  data() {
    return {
      db:null,
      num: 0,
      roomsRef:null,
      shops:null,
      selected:null,
      member:null,
      selectNum:null
    };
  },
  computed: {
    canPlay(){
        if(this.selectNum && this.member){
            if(this.selectNum.length == this.member.length){
                return 1
            }else{
                return 0
            }
        }
        return 0
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
        if(!this.shops){
          this.shops = this.randomSelect(doc.data().shops, 5)
        }
        this.member = doc.data().member
        this.selectNum = doc.data().selected
        // console.log(this.shops)
      }
      console.log("Current data: ", doc.data());
      console.log(unsub);
    });
  },
  methods: {
    select(n){
        this.$store.commit('setShop',this.shops[n-1])
        if(!this.selected){
          this.deviceMotionRequest()
          updateDoc(doc(this.db, "rooms", this.docId), {
              selected: arrayUnion(this.$store.state.nodeId)
          })
        }
        this.selected = n
    },
    toShake(){
        updateDoc(doc(this.db, "rooms", this.docId), {
            state:2
        })
        this.$router.push(`/shake/${this.docId}`)
    },
    randomSelect(array, num){
        let newArray = [];
        while(newArray.length < num && array.length > 0)
        {
            // 配列からランダムな要素を選ぶ
            const rand = Math.floor(Math.random() * array.length);
            // 選んだ要素を別の配列に登録する
            newArray.push(array[rand]);
            // もとの配列からは削除する
            array.splice(rand, 1);
        }
        return newArray;
    },
    deviceMotionRequest () {
      if (DeviceMotionEvent && typeof DeviceOrientationEvent.requestPermission() === 'function') {
        console.log('iOS (13+) Safari');
        DeviceMotionEvent.requestPermission().then(response => {
          alert(response);
          if (response === 'granted') {
            this.$store.commit('setPermission',true)
            console.log('許可ブラウザ');
          } else {
            this.$store.commit('setPermission',false)
            alert('パーミッションエラー: 加速度取得不可');
          }
        })
      } else {
        this.$store.commit('setPermission',true)
        console.log('標準ブラウザ');
      }
    }
  },
};
</script>
