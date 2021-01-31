import axios from 'axios'

export default {

    namespace: 'homestay',

    state: {
        homestayDataSource: []
    },

    reducers: {
        'dump_homestay'(state, action) {
            return {
                ...state,
                homestayDataSource: state.homestayDataSource.concat(action.homestayDataSource),
            }
        },
    },

    effects: {
        *'fetchHomestay'({ payload }, { call, put }) {
            const { data: { homestayDataSource } } = yield call(axios.get, "/api/homestay")
            yield put({
                type: 'dump_homestay',
                homestayDataSource,
            });
        },
    },
}