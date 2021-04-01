import axios from 'axios'

export default {

    namespace: 'homestay',

    state: {
        homestayDataSource: [
            {
                "id": 40051,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40052,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40053,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40054,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40055,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40056,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40057,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40058,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40059,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40060,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40061,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40062,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40063,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40064,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40065,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40066,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40067,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40068,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40069,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40070,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40071,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40072,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40073,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40074,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40075,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40076,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40077,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40078,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40079,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            },
            {
                "id": 40080,
                "propagandaPicture": "https://img.yitianyishu.com/room/coupon/96da43637a36a4cc43b3354c923f6c8a-1000_660.jpg",
                "pirce": 1800,
                "homestayName": "河北科技师范学院附近的设计师公寓",
                "homestayRecommend": "距离河北科技师范学院500米",
                "landlordAvatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2976071900,1479559332&fm=26&gp=0.jpg"
            }
        ]
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