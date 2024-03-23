import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue';
import CIcon from '@coreui/icons-vue'
import {iconsSet as icons} from '@/assets/icons'
import 'ant-design-vue/dist/reset.css';

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .provide('icons', icons)
  .component('CIcon', CIcon)
  .mount('#app')
