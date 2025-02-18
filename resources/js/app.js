import './bootstrap';
//import 'flowbite';

import { createApp, onMounted, onBeforeMount } from "vue";
import { createPinia } from 'pinia';

//Component import
import AppComponent from './App.vue';

//import roure, store
import router from "./router/index.js";
import { useAuthStore } from '@/store/auth';

//sweetaler
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Add a response interceptor
window.axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const authStore = useAuthStore();

    if (error.response && [401, 419].includes(error.response.status)) {
        authStore.logout();

        if (router.currentRoute.value.name !== "login"
            //&& router.currentRoute.value.meta?.middleware
            //&& router.currentRoute.value.meta.middleware == "auth"
        ) {
            router.push({name: "login"});
            //router.push({path: "/login"});
        }
    }

    return Promise.reject(error);
});

//define the app
const app = createApp({});

const pinia = createPinia();

//define as component
app.component("app-component", AppComponent);

//use package 
app.use(pinia);
app.use(router);

app.use(VueSweetalert2);

app.mount("#app");

