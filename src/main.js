import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import '@/assets/tailwind.css'

Vue.config.productionTip = false

Vue.use(Notifications)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
