import React from 'react'
import Link from 'umi/link'
import Icon from '@/assets/fonts/iconfont.css'
import InfoStyle from './index.less'

const LandlordInfo = ({ homestay_detail: { landlord_info } }) => {
    const { landlord_id, nickname, face, gender, isVerified } = landlord_info
    return (
        <Link to={`/landlord/${landlord_id}/homestay`} className={InfoStyle.landlord_container}>
            <div className={InfoStyle.landlord_info}>
                <img src={face} alt="face" className={InfoStyle.face} />
                <div className={InfoStyle.nickname}>{nickname}</div>
                <div className={`${InfoStyle.gender} ${Icon.iconfont}`}>
                    {gender === 2 ? <span className={InfoStyle.gril}>&#xe642;</span> : <span className={InfoStyle.boy}>&#xe607;</span>}
                </div>
                <div className={InfoStyle.verified}>
                    {isVerified ? <span className={InfoStyle.real}>已实名认证</span> : <span className={InfoStyle.un}>未实名认证</span> }
                </div>
            </div>
        </Link>
    );
};



export default LandlordInfo;