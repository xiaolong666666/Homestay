export default {

    namespace: 'user',

    state: {
        isLoginFlag: true, // 控制是否登录状态
        // isLoginFlag: localStorage['user'] ? true : false,
        // user: localStorage['user'] ? JSON.parse(localStorage['user']) : null // 存储用户信息
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
            // localStorage.removeItem('user')
            return {
                ...state,
                isLoginFlag: false,
                user: null
            }
        },
        'userTips'(state, action) {
            return {
                ...state,
                isUserTips: action.isUserTips
            }
        }
    }
}