import React from 'react'
import Icon from '@/assets/fonts/iconfont.css'
import InfoStyle from './index.less'

const LandlordInfo = ({ homestay_detail: { landlord_info } }) => {
    const { nickname, face, gender, isVerified } = landlord_info
    return (
        <div className={InfoStyle.landlord_container}>
            <div className={InfoStyle.landlord_info}>
                <img src={face} alt="face" className={InfoStyle.face} />
                <div className={InfoStyle.nickname}>{nickname}</div>
                <div className={`${InfoStyle.gender} ${Icon.iconfont}`}>
                    {!!gender ? <span className={InfoStyle.gril}>&#xe642;</span> : <span className={InfoStyle.boy}>&#xe607;</span>}
                </div>
                <div className={InfoStyle.verified}>
                    {isVerified ? <span className={InfoStyle.real}>已实名认证</span> : <span className={InfoStyle.un}>未实名认证</span> }
                </div>
            </div>
        </div>
    );
};



export default LandlordInfo;