import React, { Component, Fragment } from 'react';
import { Tabs, Pagination, Comment, Avatar, Form, Button, Input } from 'antd'
import { connect } from 'dva'
import Icon from '@/assets/fonts/iconfont.css'
import InfoStyle from './index.less'

const { TabPane } = Tabs
const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <Fragment>
        <Form.Item>
            <TextArea
                rows={4}
                placeholder="欢迎留下您的评论，让我们做得更好！让您拥有更舒适的体验！"
                onChange={onChange}
                value={value}
            />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                发表评论
                </Button>
        </Form.Item>
    </Fragment>
)

class CommentComponent extends Component {

    state = {
        value: ''
    }

    onPageChange = (current) => {
        const { dispatch } = this.props
        dispatch({ type: 'homestay_detail/dump_comment_current', current })
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit = () => {
        // const { dispatch } = this.props
        // dispatch({ type: 'homestay_detail/dump_comment_current', current })
        // 发送评论
    }

    render() {
        const { homestay_detail: { comment, current, pageSize, total } } = this.props
        const submitting = this.props.loading.global
        const { value } = this.state
        return (
            <Tabs>
                <TabPane tab={<div className={`${InfoStyle.comment} ${Icon.iconfont}`}>{`评论(${total})`}</div>} key="commit">
                    <div className={InfoStyle.comment_container}>
                        {
                            comment.filter((item, index) => index >= 5*(current-1) && index <= 5*current-1).map((item, index) => (
                                <section key={`comment${index}`}>
                                    <img title={item.nickName} alt="" className={InfoStyle.user_face} src={item.face} />
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
                                        </div>}
                                    </div>
                                </section>
                            ))
                        }
                        <Pagination current={current} pageSize={pageSize} total={total} onChange={this.onPageChange} />
                        <Comment
                            className={InfoStyle.comment_wrapper}
                            avatar={
                                <Avatar
                                    className={InfoStyle.comment_avatar}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="用户"
                                />
                            }
                            content={
                                <Editor
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            }
                        />
                    </div>
                </TabPane>
            </Tabs>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading
    }
}

export default connect(mapStateToProps)(CommentComponent);