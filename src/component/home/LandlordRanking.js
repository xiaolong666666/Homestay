import React, { Fragment } from 'react'
import { Rate } from 'antd'
import Avatar0 from '@/assets/imgs/landlord/landlord_avatar0.jpg'
import Avatar1 from '@/assets/imgs/landlord/landlord_avatar1.jpg'
import Avatar2 from '@/assets/imgs/landlord/landlord_avatar2.jpg'
import Avatar3 from '@/assets/imgs/landlord/landlord_avatar3.jpg'
import Avatar4 from '@/assets/imgs/landlord/landlord_avatar4.jpg'
import Icon from '@/assets/fonts/iconfont.css'
import HomeStyle from './index.less'

let landlordMessage = [
    {
        nickname: '小龙',
        favorableRate: 80,
        totalCount: 100,
        avatar: Avatar0
    },
    {
        nickname: '小龙',
        favorableRate: 60,
        totalCount: 100,
        avatar: Avatar1
    },
    {
        nickname: '小娟',
        favorableRate: 50,
        totalCount: 100,
        avatar: Avatar2
    },
    {
        nickname: '小鹏',
        favorableRate: 50,
        totalCount: 100,
        avatar: Avatar3
    },
    {
        nickname: '小铭',
        favorableRate: 50,
        totalCount: 100,
        avatar: Avatar4
    }
]

landlordMessage = landlordMessage.map((item, index) => {
    if (index <= 2) {
        item.avatarStyle = `landlord_avatar_wrapper${index}`
        item.rankStyle = `rank${index}`
    } else {
        item.avatarStyle = 'landlord_avatar_wrapper'
    }
    return item
})

const LandlordRanking = () => {
    return (
        <Fragment>
            <div className={HomeStyle.frame_title_rank}>房东排名</div>
            <ul className={HomeStyle.landlord_ranking}>
                {
                    landlordMessage.map((item, index) => <li key={`key${index}`}>
                        <div className={`${HomeStyle[item.avatarStyle]} ${Icon.iconfont}`}>
                            <img src={item.avatar} className={HomeStyle.landlord_avatar} alt={item.nickname}/>
                        </div>
                        <div className={HomeStyle.landlord_info}>
                            <div className={HomeStyle.info_nickname}>{item.nickname}</div>
                            <Rate allowHalf disabled defaultValue={(item.favorableRate / item.totalCount) * 5} count={5} />
                        </div>
                        <div className={`${HomeStyle.landlord_rank} ${HomeStyle[item.rankStyle]}`}>{index+1}</div>
                    </li>)
                }
            </ul>
        </Fragment>
    );
};

export default LandlordRanking;