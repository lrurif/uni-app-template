import Vue from 'vue'
import "./app.config.js"
import App from './App'
import api from "@/api"
Vue.prototype.$api = api;
import store from './store/index.js';
// 导入路由拦截
import {router,RouterMount} from '@/router/index.js'
Vue.use(router)
Vue.config.productionTip = false
// 导入样式文件
import "@/assets/css/index.scss";
App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
// #ifdef H5
RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
