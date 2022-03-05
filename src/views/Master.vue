<template>
  <div class="back">
    <h1 class="d-flex justify-center">SHAKE!SHAKE!</h1>
    <qriously :value=slaveLink :size="200" class="d-flex justify-center" />
    <!-- <div class="d-flex justify-center py-2">
      <v-btn :href=lineShareLink dark color="#06C755bb">LINEで集める</v-btn>
    </div> -->
    <h2 class="d-flex justify-center">現在{{num}}人</h2>
    <p class="px-5">招待リンク<br>{{slaveLink}}</p>
    <v-btn
      color="#535655"
      @click="toSelect"
      dark
      block
      x-large
    >
      <strong>
        次へ
      </strong>
    </v-btn>
  </div>
</template>

<script>
import { getFirestore, doc, onSnapshot, collection, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import apiKey from '../apiKey.json'
export default {
  name: "Master",
  components: {},
  data() {
    return {
      db:{
          member:[]
      },
      docId:null,
      roomsRef:null,
      slaveLink: null,
      rootLink: "http://shakeshake-76c32.web.app/#/slave/",
      lineShareLink:"https://social-plugins.line.me/lineit/share?url=http://shakeshake-76c32.web.app/#/",
      latitude:null,
      longitude:null,
      nodeId:null,
    }
  },
  created() {
    this.$store.commit('setNodeId', new Date().toString())
    this.getLocation()
    this.addRoom()
  },
  computed: {
    num: function(){
        return this.db.member.length
    }
  },
  methods: {
    setMenu (){
        this.$axios.get('https://cors-yo.herokuapp.com/https://webservice.recruit.co.jp/hotpepper/gourmet/v1/',{
            params:{
                key:apiKey,
                lat:this.latitude,
                lng:this.longitude,
                range:5,
                order:4,
                format:"json",
                count:100
            }
        }).then((response)=>{
            console.log(response.data.results.shop)
            updateDoc(this.roomsRef, {
                shops: arrayUnion(...response.data.results.shop),
                state: 1
            });
        }).catch((error)=>{
            alert('エラーが発生しました')
            console.log('err:',error)
        })
    },
    addRoom () {
        const db = getFirestore()
        // Add a new document with a generated id
        this.roomsRef = doc(collection(db, "rooms"));
        // later...
        console.log(this.roomsRef.id)
        this.docId = this.roomsRef.id
        this.slaveLink = this.rootLink + this.docId
        this.lineShareLink = this.lineShareLink + "slave/" +this.docId
        console.log(this.slaveLink)
        setDoc(this.roomsRef, {
            date: new Date().toString(),
            state: 0,
            shops:null,
            member: arrayUnion(this.$store.state.nodeId),
            counts:null,
            selected:null,
            result:null
        });
        const unsub = onSnapshot(doc(db, "rooms", this.docId), (doc) => {
            if(doc.data().member){
              this.db.member = doc.data().member
            }
            console.log("Current data: ", doc.data());
            console.log(unsub)
        });
    },
    toSelect(){
      this.setMenu()
      this.$router.push(`/select/${this.docId}`)
    },
    getLocation () {
       if (!navigator.geolocation) {
         alert('現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。エリアを入力してください。')
         return
       }

       const options = {
         enableHighAccuracy: false,
         timeout: 5000,
         maximumAge: 0
       }

       navigator.geolocation.getCurrentPosition(this.success, this.error, options)
    },

    success (position) {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      console.log(this.latitude,this.longitude)
    },

    error (error) {
      switch (error.code) {
        case 1: //PERMISSION_DENIED
          alert('位置情報の利用が許可されていません')
          break
        case 2: //POSITION_UNAVAILABLE
          alert('現在位置が取得できませんでした')
          break
        case 3: //TIMEOUT
          alert('タイムアウトになりました')
          break
        default:
          alert('現在位置が取得できませんでした')
          break
      }
    }
  }
};
</script>
