import ajax from 'uni-ajax'
import store from '@/store'

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '资源不存在',
    410: '请求的资源已被永久删除',
    500: '服务器发生错误，请联系管理员',
    502: '网关错误，请联系管理员',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
    10530: '系统开小差了，请稍后重试',
    10400: '请求错误',
    10401: '未认证',
    10403: '未授权',
    10500: '服务器错误',
    10502: '网关错误',
    10504: '网关超时',
    10531: '系统异常，请联系管理员处理',
    10501: '未知业务错误',
}

/**
 * 获取当前网络状态
 * @returns {Promise<unknown>}
 */
const networkStatus = () => {
    return new Promise((r, j) => {
        uni.getNetworkType({
            success(res) {
                r(res.networkType)
            },
        })
    })
}

/**
 * 创建请求实例
 * @type {AjaxInstance}
 */
const instance = ajax.create({
    baseURL: uni.config.baseUrl,
    loading: true, // 加载状态
    noToast: false, // 是否显示错误提示
})

/**
 * 请求拦截针对post请求加密
 */
instance.interceptors.request.use(
    async (request) => {
        const { loading = false } = request
        request.header = Object.assign(request.header, { token: store.state.app.token }) // 动态的token

        const network = await networkStatus()
        // 判断是否存在网络
        if (network === 'none') {
            uni.showModal({
                title: '没有网络',
                content: '请检查您的网络是否正确连接',
            })
            return Promise.reject({
                request,
                errMsg: 'request:fail intercepted',
            })
        }
        if (loading) {
            uni.showLoading({ title: '加载中...' })
        }
        return request
    },
    (error) => {
        return Promise.reject(error)
    },
)

/**
 * 响应拦截器针对post进行解密
 */
instance.interceptors.response.use(
    (response) => {
        const { noToast, loading } = response.config
        let data = undefined
        if (loading) {
            uni.hideLoading()
        }
        data = { ...response.data }

        // 如果请求失败
        if (data.code != 0) {
            if (!noToast) {
                uni.showToast({ title: data.message || codeMessage[data.code] || '未知原因', icon: 'none' })
            }
            return Promise.reject(data)
        }
        return data.data
    },
    (error) => {
        const { statusCode, errMsg } = error
        uni.hideLoading()
        uni.showToast({ title: errMsg || codeMessage[statusCode] || '未知原因', icon: 'none' })
        return Promise.reject(error)
    },
)

export default instance
