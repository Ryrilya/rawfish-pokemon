import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowRight);
library.add(faArrowLeft);

createApp(App)
  .use(store)
  .use(router)
  .component('fa', FontAwesomeIcon)
  .mount('#app')
