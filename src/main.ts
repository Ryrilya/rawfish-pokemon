import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faArrowLeft, faEgg, faLevelUpAlt, faCompactDisc, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import Loader from '@/components/Loader.vue';

library.add(faArrowRight);
library.add(faArrowLeft);
library.add(faEgg);
library.add(faLevelUpAlt);
library.add(faCompactDisc);
library.add(faLongArrowAltRight);

createApp(App)
  .use(store)
  .use(router)
  .component('fa', FontAwesomeIcon)
  .component('loader', Loader)
  .mount('#app')
