export default {

    namespace: 'header',

    state: {
        isMobileFlag: false,
        isNoticeFlag: false,
    },

    reducers: {
        'isMobileBox'(state, action) {
            return {
                ...state,
                isMobileFlag: action.isMobileFlag,
            }
        },
        'isNoticeBox'(state, action) {
            return {
                ...state,
                isNoticeFlag: action.isNoticeFlag,
            }
        },
    }
}