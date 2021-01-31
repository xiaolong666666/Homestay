import React from 'react'
import { Carousel } from 'antd'
import HomeStyle from './index.less'

const Introduce = ["热情接待租客", "租客参观房间", "租房合同签订", "房屋钥匙交接", "租客搬入房屋", "离房绝不拖欠"];
const carouselFlow = [];

[...new Array(6).keys()].map(item => carouselFlow.push({
    carouselStyle: `item${item}`,
    introduce: Introduce[item]
}))

const Banner = () => {
    return (
        <div className={HomeStyle.banner}>
            <div className={HomeStyle.banner_carousel}>
                <Carousel autoplay dots={false}>
                    {
                        carouselFlow.map(item => (
                            <div
                                key={item.carouselStyle}
                                className={`${HomeStyle.banner_carousel_item} ${HomeStyle[item.carouselStyle]}`}
                            >
                                <div className={HomeStyle.banner_carousel_introduce}>{item.introduce}</div>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
            <div className={HomeStyle.banner_carousel_wrapper} />
            <div className={HomeStyle.banner_main}>
                <h2 className={HomeStyle.banner_title}>找租房 来恬逸</h2>
                <p className={HomeStyle.banner_advantages}>多房源/多主题/多方便/高保障</p>
                <h4 className={HomeStyle.banner_propaganda}>在小岛飞翔</h4>
                <div className={HomeStyle.banner_recommended}>10万套公寓/100万+用户的真心推荐</div>
                <h4 className={HomeStyle.banner_propaganda}>&ldquo;恬逸小岛&rdquo;让您有家的归属</h4>
            </div>
        </div>
    );
};

export default Banner;