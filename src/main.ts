import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import SvgIcon from '@/base/SvgIcon';

import 'virtual:svg-icons-register';

import '@unocss/reset/tailwind.css';

import '@/styles/index.scss';
import 'uno.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

app.component('SvgIcon', SvgIcon);

app.mount('#app');
