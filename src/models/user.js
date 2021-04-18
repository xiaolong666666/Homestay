import axios from 'axios'
import router from 'umi/router'
import { isUserRole } from '@/utils/user'

export default {

    namespace: 'user',

    state: {
        isLoginFlag: localStorage.getItem('token') != null, // 控制是否登录状态
        isUserTips: false, // 控制鼠标划入用户头像提示框是否显示
        user: { user_id: localStorage.getItem('user_id') },
        homestay: [], // 我的房源
        homestay_detail: {}, // 特定房源的详情信息
        homestay_like: [],  // 我的点赞房源
        homestay_favorites: [], // 我的收藏房源
        homestay_appraisal: [], // 我的房源评价
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
            localStorage.removeItem('user_id')
            router.push('/sign_in')
            return {
                ...state,
                isLoginFlag: false,
                user: {}
            }
        },

        // 获取房源信息
        'homestay'(state, action) {
            return {
                ...state,
                homestay: action.homestay
            }
        },

        // 获取房源详情信息
        'homestay_detail'(state, action) {
            return {
                ...state,
                homestay_detail: action.homestay_detail
            }
        },

        // 获取我的点赞房源
        'homestay_like'(state, action) {
            return {
                ...state,
                homestay_like: action.homestay_like
            }
        },

        // 获取我的收藏房源
        'homestay_favorites'(state, action) {
            return {
                ...state,
                homestay_favorites: action.homestay_favorites
            }
        },

        // 获取我的房源评价
        'homestay_appraisal'(state, action) {
            return {
                ...state,
                homestay_appraisal: action.homestay_appraisal
            }
        },
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
                const { user_id, user_role } = user
                localStorage.setItem('user_id', user_id)
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

        // 查询房源
        *'fetch_homestay'({ payload }, { call, put }) {
            const { data: { homestay } } = yield call(axios.post, "/api/user/homestay")
            yield put({
                type: 'homestay',
                homestay
            })
        },

        // 发布房源
        *'homestay_issue'({ payload }, { call }) {
            const token = localStorage.getItem('token')
            axios.defaults.headers.Authorization = token
            return yield call(axios.post, "/api/user/homestay/issue", payload)
        },

        // 获取房源详情信息
        *'homestay_detail_fetch'({ payload }, { call, put }) {
            const token = localStorage.getItem('token')
            axios.defaults.headers.Authorization = token
            const { data: { homestay_detail } } = yield call(axios.get, `/api/user/homestay/detail?homestay_id=${payload}`)
            yield put({
                type: 'homestay_detail',
                homestay_detail
            })
        },

        // 编辑房源
        *'homestay_modify'({ payload }, { call }) {
            const token = localStorage.getItem('token')
            axios.defaults.headers.Authorization = token
            return yield call(axios.post, "/api/user/homestay/modify", payload)
        },

        // 删除房源
        *'homestay_delete'({ payload }, { call }) {
            const token = localStorage.getItem('token')
            axios.defaults.headers.Authorization = token
            return yield call(axios.get, `/api/user/homestay/delete?homestay_id=${payload}`)
        },

        // 查询我的点赞房源
        *'fetch_homestay_like'({ payload }, { call, put }) {
            const { data: { homestay_like } } = yield call(axios.post, "/api/user/homestay_like")
            yield put({
                type: 'homestay_like',
                homestay_like,
            })
        },

        // 查询我的收藏房源
        *'fetch_homestay_favorites'({ payload }, { call, put }) {
            const { data: { homestay_favorites } } = yield call(axios.post, "/api/user/homestay_favorites")
            yield put({
                type: 'homestay_favorites',
                homestay_favorites,
            })
        },

        // 查询我的房源评价
        *'fetch_homestay_appraisal'({ payload }, { call, put }) {
            const { data: { homestay_appraisal } } = yield call(axios.post, "/api/user/homestay_appraisal")
            yield put({
                type: 'homestay_appraisal',
                homestay_appraisal,
            })
        },

        // 删除房源评价
        *'comment_delete'({ payload }, { call, put }) {
            const token = localStorage.getItem('token')
            axios.defaults.headers.Authorization = token
            return yield call(axios.get, `/api/user/homestay/comment/delete?comment_id=${payload}`)
        }
    },
}