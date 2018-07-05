// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import "./assets/css/reset.css"
import "../static/js/adaptive-version2"
window['adaptive'].desinWidth = 750;
// body 字体大小 会将body字体大小设置为 baseFont / 100 + 'rem'  750的设计图一般设置为28,640的设计图一般设置为24
window['adaptive'].baseFont = 26;

window['adaptive'].init();
/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})