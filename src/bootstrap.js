import axios from "axios";

window.axios = axios;

// Set axios default endpoint
window.axios.defaults.baseURL = window._shared.endpoint;

// Set axios default configs
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';