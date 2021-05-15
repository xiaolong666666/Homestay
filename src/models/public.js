import axios from 'axios'

export default {

    namespace: 'public',

    state: {
        showBackTop: false,
        reviewSource: [
            {
                title: "房客点评",
                dataSource: [
                    {
                        face: "http://localhost:3000/images/default.jpg",
                        nickname: "伯纳乌的天空",
                        date: "2019.11",
                        content: "一直听说成都民宿蛮多的，和枯燥无味的酒店房间相比会更有家的味道，于是就想体验一下，没想到，太温暖了。周边虽然繁华却也很安静，交通也非常方便。房主是个非常有耐心的成都妹子，人也很漂亮，健谈，来住的朋友都可以和她摆龙门阵的，也可以找她推荐附近好吃的。洗衣机、厨房厨具碗筷等等，都是准备好的，随时都可以使用。说到房子，面积真的蛮大的，有两个卫生间和两个阳台，超级棒的！等下次回成都还来住!!!<br>一直听说成都民宿蛮多的，和枯燥无味的酒店房间相比会更有家的味道，于是就想体验一下，没想到，太温暖了。周边虽然繁华却也很安静，交通也非常方便。房主是个非常有耐心的成都妹子，人也很漂亮，健谈，来住的朋友都可以和她摆龙门阵的，也可以找她推荐附近好吃的。洗衣机、厨房厨具碗筷等等，都是准备好的，随时都可以使用。说到房子，面积真的蛮大的，有两个卫生间和两个阳台，超级棒的！等下次回成都还来住!!!",
                    },
                    {
                        face: "http://localhost:3000/images/default.jpg",
                        nickname: "一纸小兔几丶",
                        date: "2019.12",
                        content: "房东小姐姐很贴心，怕我找不着地方，入住前就给了自己做的方位图。房子在别墅区，邻居阿姨都在种花种草，一猫一狗一花一草，真是让人羡慕的生活了。房间很有古风的感觉，很多精致的摆件，还有古筝！我不会弹，邀请小姐姐弹了一首，超好听的！还有一只超级乖的狗狗，喜欢撸狗的我真的开心到爆！小姐姐还带我们去了附近的三江学院吃小吃，打卡了抖音超火的月亮馍，正好小姐姐的妈妈也在，阿姨跟我们很聊得来，度过了很温馨的一天。",
                    },
                    {
                        face: "http://localhost:3000/images/default.jpg",
                        nickname: "天空",
                        date: "2019.13",
                        content: "来桂林旅行，但是酒店里面全是旅行团，就选的民宿，没想到真的特别好！！！就在市中心里面，楼下全是吃的，下午有本地米粉、螺蛳粉，晚上好多烧烤啊！民宿可以做饭还有洗衣机洗衣液，要什么有什么。床超大，整个房间粉粉的，还有个小吧台，吧台上还有很多可爱的小玩偶，还有星空灯，超级少女心！简直就是年轻人想象中的空间。房东小姐姐人也好，有什么问题都可以问她。这个房间反正就是，除了我妈不在以外就和家里没啥区别了。",
                    },
                    {
                        face: "http://localhost:3000/images/default.jpg",
                        nickname: "hello",
                        date: "2019.14",
                        content: "选择丽江，因为这里有蓝天白云、雪山古镇、小桥流水、石板路，红灯笼，花衣长裙，还有无尽的花海。选择正确的丽江客栈，更是影响着整个旅行的心情，在这里住了五晚，我感受到了暖暖的人情味，真的有宾至如归的感觉，客人来或走，老板都亲自接送拉行李。每天大厅里都是来自各个地方的年轻人一起喝茶聊天，午后在院子里晒太阳，坐在摇椅上喝咖啡！我愿意就这样呆在客栈里，静静享受这美好的时光。",
                    },
                    {
                        face: "http://localhost:3000/images/default.jpg",
                        nickname: "hi",
                        date: "2019.15",
                        content: "“民宿” 二字，虽然平常，却总令人神往！我把目标定为一个叫原颂若宿的民宿，“原”意为回归本质，“颂”象征诗和远方，这不就是我一直想要的生活吗？这里给人眼前一亮的是服务人员都是年轻的小伙伴，青春洋溢有朝气。房间设计很时尚，还很宽敞。本来预定的大床房，在已经办理了入住手续的情况下还帮我换了一间双床房，非常贴心了！星空不问赶路人，岁月不负有心人！祝愿你们越来越好，让来海南的小伙伴们都有一个美好的体验！",
                    },
                ],
            },
            {
                title: "房东日记",
                dataSource: [
                    {
                        face: "http://localhost:3000/images/default.jpg",
                        nickname: "伯纳乌的天空",
                        date: "2019.11",
                        content: "从长沙来的朋友们预订了整栋房子，一大家子，有和蔼可亲的老人，年轻气盛的小姐姐小哥哥，彬彬有礼的大哥大姐，幸福感爆棚！入住前我们把房子都进行了杀虫处理，避免有蚊虫；提前准备了欢迎水果等等，期间也沟通顺畅，虽然中间的热水器出了点小问题，及时解决后也得到了理解。老人非常幽默，和蔼，心善！两晚时间，短暂相处让我体会到其家庭的和睦与幸福！",
                    },
                    {
                        face: "http://localhost:3000/images/default.jpg",
                        nickname: "伯纳乌的天空",
                        date: "2019.11",
                        content: "今天被一位昵称叫清风的客人感动到了，走到了接机地点才打电话让我们开车过去，办入住前也都拿好了身份证。离店后的评论是：第二次入住了，多的也不知道说啥。这种评价虽简单，却透出彼此的熟悉感，让各自心里挺温暖的。我爱民宿，也爱我的每位客人，希望彼此都能成为对方记忆中的一小部分，也感谢那些熟客，在我们工作繁忙时，还主动帮我们引导其他第一次来的客人，教他们刷电梯卡，拿旅游地图帮他们指引路线。",
                    },
                    {
                        face: "http://localhost:3000/images/default.jpg",
                        nickname: "伯纳乌的天空",
                        date: "2019.11",
                        content: "我的第一位房客是上海来的小姑娘，带着父母还有小宝宝。带她们来到房间，进去的瞬间她们真的好开心。她们一起来了6个人，定的是套二房间我觉得是住不下，正好自己家三居室还空着一套就给她们住了，所以进房间一个劲说谢谢我。客人住了3天，退房后我进房间确实是意外了，房间住的特别的干净整洁，一尘不染，更意外的是她回到单位把我的民宿告诉了同事，之后她们来玩都会在小猪上预订我家的房子。有时候所有等待和付出都是值得的。",
                    },
                    {
                        face: "http://localhost:3000/images/default.jpg",
                        nickname: "伯纳乌的天空",
                        date: "2019.11",
                        content: "因为热爱旅游，接触到分享住宿。每读到一个个用心的点评，都特别的感动和欣慰，什么样的付出都是值得的。又一期小猪超棒房东，珍惜每一次获得，过去的日子里谢谢你们的认可，更感谢小猪给予我们相遇的机会。陈阿姨家4年多，有收到特别真诚一路背过来的小礼物，沉甸甸的家乡味，有走时收拾的一尘不染的家，有再次来家的老客，也有辗转推荐的新朋友，感恩有你们！",
                    },
                    {
                        face: "http://localhost:3000/images/default.jpg",
                        nickname: "伯纳乌的天空",
                        date: "2019.11",
                        content: "Jaden是地道的福建人，资深国企雇员，从事旅游行业多年｡热忱的接待每一次到访的房客，同时给房客们提供详细周到的旅行攻略和建议，还可以为他们定制私人旅行计划，为房客们的出行体验添砖加瓦｡爱旅行，爱生活，希望每天把生活过成诗。会调鸡尾酒､咖啡 爱摄影､阅读､音乐，愿背上包，从此开始探寻诗和远方……",
                    },
                ],
            }
        ],
        landlordRankSource: [],
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

        *'fetch_review'({ payload }, { call, put }) {
            const { data: { reviewSource } } = yield call(axios.get, "/api/review/fetch_review")
            yield put({
                type: 'dump',
                payload: {
                    reviewSource,
                }
            })
        },

        *'publish_review'({ payload }, { call, put }) {
            return yield call(axios.post, "/api/review/publish_review", payload)
        },

        *'fetch_landlord_ranking'({ payload }, { call, put }) {
            const { data: { landlordRankSource } } = yield call(axios.get, "/api/landlord_ranking")
            yield put({
                type: 'dump',
                payload: {
                    landlordRankSource,
                }
            })
        }
    },
}