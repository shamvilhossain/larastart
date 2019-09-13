
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import Vue from 'vue'
window.Vue = require('vue');
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [
    { path: '/profile', component: require('./components/Profile.vue') },
    { path: '/users', component: require('./components/Users.vue') },
    { path: '/dashboard', component: require('./components/Dashboard.vue') }
  ]

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const router = new VueRouter({
    routes, // short for `routes: routes`
    mode:'history'
  })

const app = new Vue({
    el: '#app',
    router
});
