import store from "../store";
import { login } from "@/api/modules/base"
// 静默登录
export async function baseLogin() {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await uni.login({
                provider: 'weixin', //使用微信登录
                scopes: "auth_base",
            })
            let {
                data
            } = await login({
                js_code: res.code
            })
            store.commit("app/set", {
                key: "token",
                value: data.token
            })
            resolve
        } catch (e) {
            reject(e);
            console.log(e, 'error');
        }
    })

}