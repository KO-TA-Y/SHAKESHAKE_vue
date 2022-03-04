<template>
  <div class="back">
    <h1>SHAKE!SHAKE!</h1>
    <h1 v-show="timerSec>0">{{timerSec}}</h1>
    <h1 v-show="timerSec==0">振れ！！</h1>
  </div>
</template>

<script>
export default {
  name: "Shake",
  components: {},
  data() {
    return {
      timerSec:3,
      timerObj:null,
    }
  },
  created() {
    this.countDown()
  },
  methods: {
    countDown(){
      this.timerObj = setInterval(()=> {
        if(this.timerSec>0){
          this.timerSec--
        }else{
          clearInterval(this.timerObj)
        }
      }, 1000)
    }
  },
};
</script>
