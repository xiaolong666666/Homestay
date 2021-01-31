import React from 'react';
import { Tabs, Pagination } from 'antd'
import { connect } from 'dva'
import Icon from '@/assets/fonts/iconfont.css'
import InfoStyle from './index.less'

const { TabPane } = Tabs



const Comment = (props) => {
    const { homestay_detail: { comment, current, pageSize, total } } = props

    const onPageChange = (current) => {
        const { dispatch } = props
        dispatch({ type: 'homestay_detail/dump_comment_current', current })
    }

    return (
        <Tabs>
            <TabPane tab={<div className={`${InfoStyle.comment} ${Icon.iconfont}`}>{`评论(${total})`}</div>} key="commit">
                <div className={InfoStyle.comment_container}>
                    {
                        comment.filter((item, index) => index >= 5 * (current - 1) && index <= 5 * current - 1).map((item, index) => (
                            <section key={`comment${index}`}>
                                <img title="可爱又迷人的佳" alt="" className={InfoStyle.user_face} src={item.face} />
                                <div className={InfoStyle.comment_message}>
                                    <h5>
                                        <span className={InfoStyle.user_nickname}>{item.nickName}</span>
                                        入住时间：<time>{item.time}</time>
                                    </h5>
                                    <p>{item.content}</p>
                                    {item.reply && <div className={InfoStyle.reply_box}>
                                        <div className={InfoStyle.arrow_top} />
                                        <h5>房东回复:</h5>
                                        <p>{item.reply}</p>
                                    </div> }
                                </div>
                            </section>
                        ))
                    }
                    <Pagination current={current} pageSize={pageSize} total={total} onChange={onPageChange} />
                </div>
            </TabPane>
        </Tabs>
    );
};

export default connect()(Comment);