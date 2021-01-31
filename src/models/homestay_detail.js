import axios from 'axios'

export default {

    namespace: 'homestay_detail',

    state: {
        picDataSource: [],
        like: false,
        favorites: false,
        comment: [],
        landlord_info: {
            nickname: 'gril呵呵',
            face: 'https://image.xiaozhustatic1.com/21/5,20,0,41,64,329,329,6c09f465.jpg',
            gender: 1,
            isVerified: true,
        },
        current: 2,
        pageSize: 5,
        total: 0,
    },

    reducers: {
        'dump_homestay_detail'(state, action) {
            return {
                ...state,
                picDataSource: action.picDataSource,
                like: action.like,
                favorites: action.favorites,
                comment: action.comment,
                total: action.comment.length,
                landlord_info: action.landlord_info,
            }
        },
        'dump_comment_current'(state, action) {
            return {
                ...state,
                current: action.current
            }
        }
    },

    effects: {
        *'fetchHomestayDetail'({ payload }, { call, put }) {
            const { data: { picDataSource, like, favorites, comment, landlord_info } } = yield call(axios.get, "/api/homestay/detail")
            yield put({
                type: 'dump_homestay_detail',
                picDataSource,
                like,
                favorites,
                comment,
                landlord_info,
            });
        },
    },
}