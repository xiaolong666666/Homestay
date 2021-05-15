import React from 'react'
import Icon from '@/assets/fonts/iconfont.css'
import InfoStyle from './index.less'

const landlord_info = ({ landlord }) => {
    const { user_avatar, user_nickname, user_gender, isReal } = landlord
    return (
        <div className={InfoStyle.landlord_info}>
            <img src={user_avatar} className={InfoStyle.landlord_avatar} alt="房东头像"/>
            <div className={InfoStyle.landlord_info_title}>
                <div className={InfoStyle.landlord_nickname}>{user_nickname}</div>
                <div className={`${InfoStyle.gender} ${Icon.iconfont}`}>
                    {user_gender === 2 ? <span className={InfoStyle.gril}>&#xe642;</span> : <span className={InfoStyle.boy}>&#xe607;</span>}
                </div>
            </div>
            <div className={InfoStyle.verified}>
                {isReal ? <span className={InfoStyle.real}>已实名认证</span> : <span className={InfoStyle.un}>未实名认证</span>}
            </div>
        </div>
    );
};

export default landlord_info;