import axios from 'axios'
import router from 'umi/router'
import { isUserRole } from '@/utils/user'

export default {

    namespace: 'user',

    state: {
        isLoginFlag: localStorage.getItem('token') != null, // 控制是否登录状态
        user: {},
        isUserTips: false, // 控制鼠标划入用户头像提示框是否显示
        homestay: [],
    },

    reducers: {
        // 在线
        'onLine'(state, action) {
            return {
                ...state,
                isLoginFlag: true,
                user: action.user
            }
        },
        // 用户操作框
        'userTips'(state, action) {
            return {
                ...state,
                isUserTips: action.isUserTips
            }
        },
        // 注销
        'logOut'(state, action) {
            localStorage.removeItem('token')
            return {
                ...state,
                isLoginFlag: false,
                user: {}
            }
        },
        // 获取房屋
        'homestay'(state, action) {
            return {
                ...state,
                homestay: action.homestay
            }
        }

    },

    effects: {

        // 注册
        *'user_sign_up'({ payload }, { call, put }) {
            return yield call(axios.post, "/api/user/sign_up", {...payload})
        },

        // 登录
        *'user_sign_in'({ payload }, { call, put }) {
            const { data: { code, message, token } } = yield call(axios.post, "/api/user/sign_in", payload)
            code && localStorage.setItem('token', token)
            yield put({ type: 'user_sign_check' })
            return { code, message }
        },

        // 验证是否登录状态
        *'user_sign_check'({ payload }, { call, put }) {
            const token = localStorage.getItem('token')
            axios.defaults.headers.Authorization = token
            const { data: { code, user } } = yield call(axios.post, "/api/user/sign_check")
            if (code) {
                const { user_role } = user
                yield put({
                    type: 'onLine',
                    user: {
                        ...user,
                        user_role: isUserRole(user_role),
                    }
                })
            } else {
                localStorage.removeItem('token')
                router.push('/sign_in')
            }
        },

        // 修改个人信息
        *'user_modify_personal_information'({ payload }, { call, put }) {
            const { data: { code, message, user } } = yield call(axios.post, "/api/user/modify_personal_information", payload)
            if (code) {
                const { user_role } = user
                yield put({
                    type: 'onLine',
                    user: {
                        ...user,
                        user_role: isUserRole(user_role),
                    }
                })
            }
            return { code, message }
        },

        // 查询房屋
        *'fetch_homestay'({ payload }, { call, put }) {
            const { data: { homestay } } = yield call(axios.post, "/api/user/homestay")
            yield put({
                type: 'homestay',
                homestay
            })
        }
    },
}