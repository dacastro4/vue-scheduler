window._ = require('lodash');

import Vue from 'vue'
import Scheduler from './Scheduler.vue'
import App from './App.vue'
import './assets/app.scss'

Vue.component('scheduler', Scheduler);

new Vue({
    el: '#app',
    render: h => h(App)
})

// export default Scheduler;