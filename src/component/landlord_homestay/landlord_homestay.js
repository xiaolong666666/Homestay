import React from 'react'
import Link from 'umi/link'
import { isHomestayType } from '@/utils/homestay'
import HomestayStyle from './index.less'

const landlord_homestay = ({ landlord, homestaySource }) => {
    const { user_avatar } = landlord
    return (
        <div className={HomestayStyle.main_wrapper}>
            {
                homestaySource.map(({
                    homestay_id,
                    homestay_type,
                    homestay_picture,
                    homestay_price,
                    homestay_name,
                    homestay_recommend
                }) => (<Link
                    to={`/homestay/${isHomestayType(homestay_type)}/${homestay_id}`}
                    key={homestay_id}
                    className={HomestayStyle.homestay_wrapper}>
                    <div className={HomestayStyle.homestay_pic}><img src={homestay_picture[0]} alt="" /></div>
                    <div className={HomestayStyle.homestay_price_wrapper} />
                    <div className={HomestayStyle.homestay_price}>{`￥${homestay_price}`}</div>
                    <div className={HomestayStyle.homestay_landlord}>
                        <div className={HomestayStyle.homestay_location}>
                            <h3 title={HomestayStyle.homestayName}>{homestay_name}</h3>
                            <p title={HomestayStyle.homestayRecommend}>{homestay_recommend}</p>
                        </div>
                        <div className={HomestayStyle.landlord_avatar}><img src={user_avatar} alt="房东头像" /></div>
                    </div>
                </Link>))
            }
        </div>
    );
};

export default landlord_homestay;