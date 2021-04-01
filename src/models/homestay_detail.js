import axios from 'axios'

export default {

    namespace: 'homestay_detail',

    state: {
        picDataSource: [
            "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
            "https://img.yitianyishu.com/room/coupon/fabe2e4fe95e34b40554b12e3316a219-1000_660.jpg",
            "https://img.yitianyishu.com/room/coupon/3d0be79aa30b563ec0f293ff8a4b1f57-1000_660.jpg",
            "https://img.yitianyishu.com/room/coupon/7e5dc09bf6a9dee1b52ebad330813b11-1000_660.jpg",
            "https://img.yitianyishu.com/room/coupon/75aa5025f408bcbd07bf32033c6cec2b-1000_660.jpg",
            "https://img.yitianyishu.com/room/coupon/ec41104c3992bd2f913f96a6dc2d7ea7-1000_660.jpg",
            "https://img.yitianyishu.com/room/coupon/c2588112c760e7eb15480e17ff8e4d8f-1000_660.jpg",
            "https://img.yitianyishu.com/room/coupon/7e5dc09bf6a9dee1b52ebad330813b11-1000_660.jpg",
        ],
        like: false,
        favorites: false,
        comment: [
            {
                "face": "https://image.xiaozhustatic2.com/22/5,17,0,64,2335,260,260,3aad8464.jpg",
                "nickName": "可爱又迷人的佳",
                "time": "2020年07月",
                "content": "满满的日式感！很不错的一次入住体验，拍照也很棒",
                "reply": "感恩遇见哦"
            },
            {
                "face": "https://image.xiaozhustatic2.com/22/5,17,0,64,2335,260,260,3aad8464.jpg",
                "nickName": "可爱又迷人的佳",
                "time": "2020年07月",
                "content": "满满的日式感！很不错的一次入住体验，拍照也很棒",
                "reply": "感恩遇见哦"
            },
            {
                "face": "https://image.xiaozhustatic2.com/22/5,17,0,64,2335,260,260,3aad8464.jpg",
                "nickName": "可爱又迷人的佳",
                "time": "2020年07月",
                "content": "满满的日式感！很不错的一次入住体验，拍照也很棒",
                "reply": "感恩遇见哦"
            },
            {
                "face": "https://image.xiaozhustatic2.com/22/5,17,0,64,2335,260,260,3aad8464.jpg",
                "nickName": "可爱又迷人的佳",
                "time": "2020年07月",
                "content": "满满的日式感！很不错的一次入住体验，拍照也很棒",
                "reply": "感恩遇见哦"
            },
            {
                "face": "https://image.xiaozhustatic2.com/22/5,17,0,64,2335,260,260,3aad8464.jpg",
                "nickName": "可爱又迷人的佳",
                "time": "2020年07月",
                "content": "满满的日式感！很不错的一次入住体验，拍照也很棒",
                "reply": "感恩遇见哦"
            },
            {
                "face": "https://image.xiaozhustatic2.com/22/5,17,0,64,2335,260,260,3aad8464.jpg",
                "nickName": "小龙",
                "time": "2020年04月",
                "content": "满满的日式感！很不错的一次入住体验，拍照也很棒",
                "reply": "欢迎再来哈"
            },
            {
                "face": "https://image.xiaozhustatic2.com/22/5,17,0,64,2335,260,260,3aad8464.jpg",
                "nickName": "可爱又迷人的佳",
                "time": "2020年07月",
                "content": "满满的日式感！很不错的一次入住体验，拍照也很棒",
                "reply": "感恩遇见哦"
            },
            {
                "face": "https://image.xiaozhustatic2.com/22/5,17,0,64,2335,260,260,3aad8464.jpg",
                "nickName": "可爱又迷人的佳",
                "time": "2020年07月",
                "content": "满满的日式感！很不错的一次入住体验，拍照也很棒",
                "reply": "感恩遇见哦"
            }
        ],
        current: 2,
        pageSize: 5,
        total: 0,
        landlord_info: {
            nickname: 'gril呵呵',
            face: 'https://image.xiaozhustatic1.com/21/5,20,0,41,64,329,329,6c09f465.jpg',
            gender: 1,
            isVerified: true,
        },
        landlord_house: [
            {
                pic: "https://z1.muscache.cn/im/pictures/f7e0027c-741f-48ea-ae64-747d15307dee.jpg?aki_policy=xx_large",
                price: '1820'
            },
            {
                pic: "https://z1.muscache.cn/im/pictures/f7e0027c-741f-48ea-ae64-747d15307dee.jpg?aki_policy=xx_large",
                price: '1820'
            },
            {
                pic: "https://z1.muscache.cn/im/pictures/f7e0027c-741f-48ea-ae64-747d15307dee.jpg?aki_policy=xx_large",
                price: '1820'
            }
        ],
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