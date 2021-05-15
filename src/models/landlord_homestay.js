import axios from 'axios'

export default {

    namespace: 'landlord_homestay',

    state: {
        Landlord: {},
        HomestaySource: [],
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

        // 获取房东信息及房源
        *'fetch_homestay'({ payload: { landlord_id } }, { call, put }) {
            const { data: { Landlord, HomestaySource } } = yield call(axios.get, `/api/landlord_homestay?landlord_id=${landlord_id}`)
            yield put({
                type: 'dump',
                payload: {
                    Landlord,
                    HomestaySource,
                },
            })
        },
    },
}