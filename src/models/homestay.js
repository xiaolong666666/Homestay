import axios from 'axios'
import { isEmpty }from 'lodash'
import { message } from 'antd'

export default {

    namespace: 'homestay',

    state: {
        homestayDataSource: [],
        count: 1,
    },

    reducers: {
        'dump'(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        'concat'(state, { homestayDataSource, count }) {
            return {
                ...state,
                homestayDataSource: state.homestayDataSource.concat(homestayDataSource),
                count,
            }
        },
    },

    effects: {
        *'fetchHomestay'({ payload }, { call, put }) {
            const { data: { homestayDataSource, count } } = yield call(axios.post, "/api/homestay", { ...payload })
            if (!isEmpty(homestayDataSource)) {
                if (count > 1) {
                    yield put({
                        type: 'concat',
                        homestayDataSource,
                        count,
                    })
                } else {
                    yield put({
                        type: 'dump',
                        payload: {
                            homestayDataSource,
                        }
                    })
                }
            } else {
                message.warn('暂无更多此类型房源，敬请期待!')
            }
        },
    },
}