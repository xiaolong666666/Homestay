import React, { memo } from 'react'
import RoleReview from './RoleReview'
import reviewStyle from './index.less'

const Review = ({ public: { reviewSource } }) => (
    <div className={reviewStyle.review_wrapper}>
        <div className={reviewStyle.header_wrapper}>
            <h2>世间所有的相遇都是久别重逢</h2>
            <h4>房客和房东都在彼此感动着</h4>
        </div>
        <div className={reviewStyle.content_wrapper}>
            {
                reviewSource.map(item => (
                    <div key={item.title} className={reviewStyle.main}>
                        <RoleReview {...item} />
                    </div>
                ))
            }
        </div>
    </div>
)

export default memo(Review)