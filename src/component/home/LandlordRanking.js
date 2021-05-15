import React, { Fragment, useEffect } from 'react'
import { Rate } from 'antd'
import Link from 'umi/link'
import Icon from '@/assets/fonts/iconfont.css'
import HomeStyle from './index.less'

const LandlordRanking = ({
    dispatch,
    public: { landlordRankSource }
}) => {

    useEffect(() => {
        dispatch({ type: 'public/fetch_landlord_ranking' })
    }, [dispatch])

    landlordRankSource = landlordRankSource.map((item, index) => {
        if (index <= 2) {
            item.avatarStyle = `landlord_avatar_wrapper${index}`
            item.rankStyle = `rank${index}`
        } else {
            item.avatarStyle = 'landlord_avatar_wrapper'
        }
        return item
    })
    
    return (
        <Fragment>
            <div className={HomeStyle.frame_title_class}>房东排名</div>
            <ul className={HomeStyle.landlord_ranking}>
                {
                    landlordRankSource.map((item, index) => (<Link key={item.user_id} to={`/landlord/${item.user_id}/homestay`} className={HomeStyle.landlord_ranking_item}>
                        <div className={`${HomeStyle[item.avatarStyle]} ${Icon.iconfont}`}>
                            <img src={item.user_avatar} className={HomeStyle.landlord_avatar} alt={item.nickname}/>
                        </div>
                        <div className={HomeStyle.landlord_info}>
                            <div className={HomeStyle.info_nickname}>{item.nickname}</div>
                            <Rate allowHalf disabled defaultValue={(item.like_count / item.totalCount) * 5} count={5} />
                        </div>
                        <div className={`${HomeStyle.landlord_rank} ${HomeStyle[item.rankStyle]}`}>{index+1}</div>
                    </Link>))
                }
            </ul>
        </Fragment>
    );
};

export default LandlordRanking;