import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue3 from 'bootstrap-vue-3'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import Chart from 'primevue/chart';
import PrimeVue from 'primevue/config';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
createApp(App).use(FontAwesomeIcon)
.use(router).use(VueSweetalert2).use(PrimeVue).use(BootstrapVue3).use(store).mount("#app");


