import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueQriously from 'vue-qriously'
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios = axios

// compatを追加する
import { initializeApp } from "firebase/app";
// TODO: Replace the following with your app's Firebase project configuration
import { firebaseConfig } from './firebase-config.js';
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
Vue.use(VueQriously)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
