import React from 'react'
import { connect } from 'dva'
import Link from 'umi/link'
import { isHomestayType } from '@/utils/homestay'
import NoticeStyle from './index.less';

const Notice = ({ dataSource, dispatch }) => {
    return (
        dataSource.map(({
            reserve_id,
            user_avatar,
            homestay_id,
            homestay_type,
            homestay_name,
            user_phone,
            reserve_check_time,
            reserve_note,
        }) => (
            <div key={reserve_id} className={NoticeStyle.system_notice_wrapper}>
                <div className={NoticeStyle.system_notice_title}>
                    <img src={user_avatar} alt="租客头像"/>
                    <span>{reserve_check_time}</span>
                </div>
                <p><label>预约房源：</label><Link to={`/homestay/${isHomestayType(homestay_type)}/${homestay_id}`} onClick={() => { dispatch({ type: 'header/dump', payload: { isNoticeFlag: false } })}}>{homestay_name}</Link></p>
                <p><label>联系方式：</label>{user_phone}</p>
                <p><label>备注：</label>{reserve_note || '暂无备注'}</p>
            </div>
            
        ))
    )
}

export default connect()(Notice);