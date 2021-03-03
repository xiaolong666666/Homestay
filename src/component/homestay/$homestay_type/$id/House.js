import React from 'react'
import InfoStyle from './index.less'

const House = (props) => {
    const { homestay_detail: { landlord_info: { nickname }, landlord_house } } = props
    return (
        <div className={InfoStyle.house_container}>
            <h4><span className={InfoStyle.nickname}>{nickname}</span>的其他房源</h4>
            {
                landlord_house.map((item, index) => (
                    <div key={`key${index}`} className={InfoStyle.house_wrapper}>
                        <img src={item.pic} alt="" />
                        <div className={InfoStyle.price}>{item.price}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default House;