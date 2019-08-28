import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import store from './store/index'
import axios from 'axios'
Vue.prototype.axios = axios;

Vue.config.productionTip = false
//全局过滤器
Vue.filter("setWH",(url,arg) =>{
  return url.replace(/w\.h/,arg);
});
Vue.filter("formatCard",(key) => {
        let cards = [
            {key: allowRefund,value: '改签'},
            {key: endorse,value: '退'},
            {key: sell,value: '折扣卡'},
            {key: snack,value: '小吃'}
        ];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].key === key) {
                return cards[i].value;
            }
            return "";
        }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
