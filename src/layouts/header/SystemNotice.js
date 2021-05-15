import React from 'react'
import Link from 'umi/link'
import NoticeStyle from './index.less';

const Notice = ({ dataSource }) => {
    return (
        dataSource.map(({
            notice_id,
            title,
            time,
            content,
            link,
        }) => (
            <Link to={link} key={notice_id} className={NoticeStyle.notice_wrapper}>
                <div className={NoticeStyle.notice_title}><span>{title}</span><span>{time}</span></div>
                <div className={NoticeStyle.notice_content} style={{ WebkitBoxOrient: "vertical" }}>{content}</div>
            </Link>
        ))
    )
}

export default Notice;