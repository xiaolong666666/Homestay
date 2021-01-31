export default {

    namespace: 'public',

    state: {
        showBackTop: false,
    },

    reducers: {
        'dump_showBackTop'(state, action) {
            return {
                ...state,
                showBackTop: action.showBackTop,
            }
        },
    },

    effects: {
        // *'fetchHomestay'({ payload }, { call, put }) {
        //     const { data: { homestayDataSource } } = yield call(axios.get, "/api/homestay")
        //     yield put({
        //         type: 'dump_homestay',
        //         homestayDataSource,
        //     });
        // },
    },
}