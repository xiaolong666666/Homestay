import React from 'react'
import { Link } from 'umi'
import { isHomestayType } from '@/utils/homestay'
import InfoStyle from './index.less'

const House = (props) => {
    const { homestay_detail: { landlord_info: { nickname }, landlord_house } } = props
    return (
        <div className={InfoStyle.house_container}>
            <h4><span className={InfoStyle.nickname}>{nickname}</span>的其他房源</h4>
            {
                landlord_house
                .filter((item, index) => (index >= 0 && index < 6))
                .map(({ homestay_id, homestay_type, homestay_picture, homestay_price }) => (
                    <Link to={`/homestay/${isHomestayType(homestay_type)}/${homestay_id}`} key={homestay_id} className={InfoStyle.house_wrapper}>
                        <img src={homestay_picture} alt="" />
                        <div className={InfoStyle.price}>{`￥${homestay_price}`}</div>
                    </Link>
                ))
            }
        </div>
    );
};

export default House;