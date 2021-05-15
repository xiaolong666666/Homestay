import React, { memo } from 'react'
import Review from './Review'
import TenantEntrance from './TenantEntrance'
import LandlordRanking from './LandlordRanking'
import HomeStyle from './index.less'

const Main = props => {
    return (
        <div className={HomeStyle.main}>
            <div className={HomeStyle.main_left}>
                <Review { ...props }/>
            </div>
            <div className={HomeStyle.main_right}>
                <div className={HomeStyle.frame}>
                    <TenantEntrance />
                </div>
                <div className={HomeStyle.frame}>
                    <LandlordRanking {...props} />
                </div>
            </div>
        </div>
    );
};

export default memo(Main)