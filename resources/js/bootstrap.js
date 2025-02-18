import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

//axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.baseURL = import.meta.env.APP_URL;

window.axios = axios;
