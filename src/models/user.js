import axios from 'axios'

export default {

    namespace: 'user',

    state: {
        isLoginFlag: localStorage.getItem('token') != null, // 控制是否登录状态
        // isLoginFlag: localStorage['user'] ? true : false,
        // user: localStorage['user'] ? JSON.parse(localStorage['user']) : null // 存储用户信息
        user: {
            user_type: 'landlord',
        },
        isUserTips: false, // 控制鼠标划入用户头像提示框是否显示
    },

    reducers: {
        'onLine'(state, action) {
            return {
                ...state,
                isLoginFlag: true,
                user: action.user
            }
        },
        'logOut'(state, action) {
            localStorage.removeItem('token')
            return {
                ...state,
                isLoginFlag: false,
                // user: null
            }
        },
        'userTips'(state, action) {
            return {
                ...state,
                isUserTips: action.isUserTips
            }
        }
    },

    effects: {

        // 注册
        *'user_sign_up'({ payload }, { call, put }) {
            return yield call(axios.post, "/api/sign_up", {...payload})
        },

        // 登录
        *'user_sign_in'({ payload }, { call, put }) {
            const { data: { code, message, user, token } } = yield call(axios.post, "/api/sign_in", payload)
            if (code) {
                yield put({ type: 'onLine', user })
                localStorage.setItem('token', token)
            }
            return { code, message }
        },

        // 退出登录
        *'user_sign_out'({ payload }, { call, put }) {
            // yield call(axios.get, "/api/sign_out")
            yield put({ type: 'logOut' })
        },
    },
}