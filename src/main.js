// Imports 

import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import { MotionPlugin } from '@vueuse/motion'


// Delarations

const app = createApp(App);

app.mount('#app')
app.use(PrimeVue);
app.use(MotionPlugin);
app.directive('motion-slide-bottom');

