import axios from 'axios'
import router from 'umi/router'
import { reserveSource, systemSource } from '@/constant/notice'
import { isUserRole } from '@/utils/user'

export default {

    namespace: 'user',

    state: {
        isLoginFlag: localStorage.getItem('token') != null, // 控制是否登录状态
        isUserTips: false, // 控制鼠标划入用户头像提示框是否显示
        user: { user_id: localStorage.getItem('user_id') }, // 用户信息
        reserveSource, // 房源预约
        systemSource, // 系统通知
        homestay: [], // 我的房源
        homestay_detail: {}, // 特定房源的详情信息
        homestay_like: [],  // 我的点赞房源
        homestay_favorites: [], // 我的收藏房源
        homestay_reserve: [], // 我的预约房源
        homestay_appraisal: [], // 我的房源评价
    },

    reducers: {
        'dump'(state, { payload }) {
            return {
                ...state,
                ...payload,
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
                    type: 'dump',
                    payload: {
                        isLoginFlag: true,
                        user: {
                            ...user,
                            user_role: isUserRole(user_role),
                        },
                    }
                })
            } else {
                localStorage.removeItem('token')
                localStorage.removeItem('user_id')
                yield put({
                    type: 'dump',
                    payload: {
                        isLoginFlag: false,
                        user: {},
                    },
                })
                router.push('/sign_in')
            }
        },

        // 查询通知中房源预约
        *'user_system_inform'({ payload }, { call, put }) {
            const token = localStorage.getItem('token')
            axios.defaults.headers.Authorization = token
            const { data: { informSource: reserveSource } } = yield call(axios.post, "/api/user/system_inform")
            yield put({
                type: 'dump',
                payload: {
                    reserveSource
                }
            })
        },

        // 修改个人信息
        *'user_modify_personal_information'({ payload }, { call, put }) {
            const { data: { code, message, user } } = yield call(axios.post, "/api/user/modify_personal_information", payload)
            if (code) {
                const { user_role } = user
                yield put({
                    type: 'dump',
                    payload: {
                        isLoginFlag: true,
                        user: {
                            ...user,
                            user_role: isUserRole(user_role),
                        },
                    }
                })
            }
            return { code, message }
        },

        // 查询房源
        *'fetch_homestay'({ payload }, { call, put }) {
            const { data: { homestay } } = yield call(axios.post, "/api/user/homestay")
            yield put({
                type: 'dump',
                payload: {
                    homestay
                },
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
                type: 'dump',
                payload: {
                    homestay_detail,
                },
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
                type: 'dump',
                payload: {
                    homestay_like,
                },
            })
        },

        // 查询我的收藏房源
        *'fetch_homestay_favorites'({ payload }, { call, put }) {
            const { data: { homestay_favorites } } = yield call(axios.post, "/api/user/homestay_favorites")
            yield put({
                type: 'dump',
                payload: {
                    homestay_favorites,
                },
            })
        },

        // 查询我的预约房源
        *'fetch_homestay_reserve'({ payload }, { call, put }) {
            const { data: { homestay_reserve } } = yield call(axios.post, "/api/user/homestay_reserve")
            yield put({
                type: 'dump',
                payload: {
                    homestay_reserve,
                },
            })
        },

        // 取消我的预约房源
        *'reserve_delete'({ payload }, { call }){
            const token = localStorage.getItem('token')
            axios.defaults.headers.Authorization = token
            return yield call(axios.get, `/api/user/homestay/reserve/delete?reserve_id=${payload}`)
        },

        // 查询我的房源评价
        *'fetch_homestay_appraisal'({ payload }, { call, put }) {
            const { data: { homestay_appraisal } } = yield call(axios.post, "/api/user/homestay_appraisal")
            yield put({
                type: 'dump',
                payload: {
                    homestay_appraisal,
                },
            })
        },

        // 删除房源评价
        *'comment_delete'({ payload }, { call, put }) {
            const token = localStorage.getItem('token')
            axios.defaults.headers.Authorization = token
            return yield call(axios.get, `/api/user/homestay/comment/delete?comment_id=${payload}`)
        },
    },
}