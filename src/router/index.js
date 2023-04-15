import {RouterMount,createRouter} from 'uni-simple-router';
import { baseLogin } from "@/utils/permission.js"
import store from '../store';
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach(async (to, from, next) => {
    if(!store.state.app.token) {
        await baseLogin();
    }
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
	router,
	RouterMount
}