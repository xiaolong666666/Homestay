import React from 'react';
import TenantEntrance from './TenantEntrance'
import LandlordRanking from './LandlordRanking'
import HomeStyle from './index.less'

const Main = () => {
    return (
        <div className={HomeStyle.main}>
            <div className={HomeStyle.main_left}>
                left
            </div>
            <div className={HomeStyle.main_right}>
                <div className={HomeStyle.frame}>
                    <TenantEntrance />
                </div>
                <div className={HomeStyle.frame}>
                    <LandlordRanking />
                </div>
            </div>
        </div>
    );
};

export default Main;