import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import Dialog from 'element-ui'

import router from './router'
import store from './store';

import './themes/theme-black/index.css';

Vue.use(ElementUI);
Vue.use(Dialog);

Vue.config.productionTip = false;

new Vue({
  store: store,
  router: router,
  render: h => h(App),
  components: { App },
}).$mount('#app')
