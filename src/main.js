// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iview from 'iview'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'
import '../static/style.css'

Vue.use(iview)

Vue.config.productionTip = false

var v = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})