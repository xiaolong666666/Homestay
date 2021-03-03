import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import PicShow from './PicShow'
import HomestayOperate from './HomestayOperate'
import Comment from './CommentComponent'
import LandlordInfo from './LandlordInfo'
import House from './/house'
import InfoStyle from './index.less'
class Info extends Component {
    render() {
        const { homestay_detail: { landlord_house } } = this.props
        return (
            <div className={InfoStyle.info}>
                <div className={InfoStyle.info_left}>
                    <PicShow {...this.props}/>
                    <HomestayOperate {...this.props} />
                    <Comment {...this.props} />
                </div>
                <div className={InfoStyle.info_right}>
                    <LandlordInfo {...this.props}/>
                    {!isEmpty(landlord_house) && <House {...this.props}/>}
                </div>
            </div>
        );
    }
}

export default Info;