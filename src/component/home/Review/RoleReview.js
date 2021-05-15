import React, { Fragment, useState, memo } from 'react'
import roleReviewStyle from './index.less'

const RoleReview = ({ title, dataSource }) => {
    const [key, setKey] = useState(0)
    return (
        <Fragment>
            <div className={roleReviewStyle.role_review}>
                <div className={roleReviewStyle.role_header}>{title}</div>
                <div className={roleReviewStyle.role_content}>
                    <img src={dataSource[key]['face']} alt="face" />
                    <div className={roleReviewStyle.nickname}>{dataSource[key]['nickname']}</div>
                    <div className={roleReviewStyle.date}>{dataSource[key]['review_date']}</div>
                    <div className={roleReviewStyle.content}>{dataSource[key]['review_content']}</div>
                </div>
            </div>
            <ul className={roleReviewStyle.cmt_ul}>
                {
                    dataSource.map((item, index) => (
                        <li key={`index${index}`} className={key === index ? roleReviewStyle.cmt_current : ''} onMouseMove={() => setKey(index)}/>
                    ))
                }
            </ul>
        </Fragment>
    );
};

export default memo(RoleReview)