import React from 'react'
import Icon from '@/assets/fonts/iconfont.css'
import InfoStyle from './index.less'

const HomestayOperate = (props) => {
    const { homestay_detail: { like, favorites } } = props
    return (
        <div className={InfoStyle.homestay_operate}>
            <div className={`${InfoStyle.reserve} ${Icon.iconfont}`}>立即预约</div>
            <div className={`${InfoStyle.comment} ${Icon.iconfont}`}>评论</div>
            <div className={`${favorites ? InfoStyle.favorites : InfoStyle.unfavorites} ${Icon.iconfont}`}>收藏</div>
            <div className={`${like ? InfoStyle.liked : InfoStyle.unlike} ${Icon.iconfont}`}>点赞</div>
        </div>
    );
};

export default HomestayOperate;