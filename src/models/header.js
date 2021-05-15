export default {

    namespace: 'header',

    state: {
        isMobileFlag: false,
        isNoticeFlag: false,
    },

    reducers: {
        'dump'(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    }
}